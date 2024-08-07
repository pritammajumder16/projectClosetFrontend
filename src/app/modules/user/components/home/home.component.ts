import { Component, ViewChild } from '@angular/core';
import { BackendServiceService } from '../../../../services/backend-service.service';
import { FilterDrawersComponent } from '../filter-drawers/filter-drawers.component';
import { SideFilterComponent } from '../side-filter/side-filter.component';
import { Router } from '@angular/router';
import { IFilters } from '../../../../../models/filters';
import { ICategory } from '../../../../../models/category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public length: number = 0;
  public pageIndex = 1;
  public pageSize = 10;
  public productList: any[] = [];
  public categoryList: ICategory[] = [];
  public fileUri: string = '';
  public allData: any = {};
  public showSideFilter: boolean = false;
  @ViewChild(FilterDrawersComponent) drawerChild!: FilterDrawersComponent;
  @ViewChild(SideFilterComponent) sideChild!: SideFilterComponent;
  constructor(
    private _backendService: BackendServiceService,
    private _router: Router
  ) {}
  async ngOnInit() {
    this.fileUri = this._backendService.fileURI;
    await this.getCategoryList();
    this.showSideFilter = true;
    await this.getProductList();
  }
  async getProductList(filter?: IFilters) {
    const obj = {
      priceFilterS2: '',
      priceFilterS1: '',
      sizeFilter: '',
      categoryFilter: '',
      searchText: '',
      pageIndex: String(this.pageIndex),
      pageSize: String(this.pageSize),
    };
    if (filter) {
      obj.priceFilterS2 = String(filter.priceFilterS2);
      obj.priceFilterS1 = String(filter.priceFilterS1);
      obj.sizeFilter = JSON.stringify(filter.sizeFilter);
      obj.categoryFilter = JSON.stringify(filter.categoryFilter);
      obj.searchText = filter.searchText;
    }

    this.allData = { ...obj };
    console.log(this.allData);
    this.sideChild?.getAllData(this.allData);
    this.drawerChild?.getAllData(this.allData);
    const res: any = await this._backendService
      .makeGetApiCall('unvfd/fetchProducts', obj)
      .toPromise();
    if (res.success) {
      this.productList = res.data?.products;
      this.length = res.data?.count;
      console.log('inhere');
      this.drawerChild.changeCount(this.length);
      this.sideChild.changeCount(this.length);
    }
  }
  async getCategoryList() {
    const res: any = await this._backendService
      .makeGetApiCall('unvfd/categoryList')
      .toPromise();
    if (res.success) {
      this.categoryList = res.data;
    }
  }
  getPrice(price: number | string) {
    return parseFloat(parseFloat(String(price)).toFixed(2));
  }
  filterChangeTrigger(event: any) {
    console.log(event);
    this.getProductList(event);
  }
  routeToProduct(product: any) {
    this._router.navigate(['/product'], {
      queryParams: { productId: product.productId },
    });
  }
}
