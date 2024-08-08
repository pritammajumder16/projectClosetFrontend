import { Component, OnInit, ViewChild } from '@angular/core';
import { BackendServiceService } from '../../../../services/backend-service.service';
import { FilterDrawersComponent } from '../filter-drawers/filter-drawers.component';
import { SideFilterComponent } from '../side-filter/side-filter.component';
import { Router } from '@angular/router';
import { IFilters } from '../../../../../models/filters';
import { ICategory } from '../../../../../models/category';
import { IProduct } from '../../../../../models/product';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public length: number = 0;
  public pageIndex = 1;
  public pageSize = 12;
  public productList: IProduct[] = [];
  public categoryList: ICategory[] = [];
  public fileUri: string = '';
  public allData: { [key: string]: string } = {};
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
    const obj: { [key: string]: string } = {
      pageIndex: String(this.pageIndex),
      pageSize: String(this.pageSize),
    };
    if (filter?.categoryFilter) {
      obj['categoryFilter'] = JSON.stringify(filter.categoryFilter);
    }
    if (filter?.priceFilterS1) {
      obj['priceFilterS1'] = String(filter.priceFilterS1);
    }
    if (filter?.priceFilterS2) {
      obj['priceFilterS2'] = String(filter.priceFilterS2);
    }
    if (filter?.searchText) {
      obj['searchText'] = filter.searchText;
    }
    if (filter?.sizeFilter) {
      obj['sizeFilter'] = JSON.stringify(filter.sizeFilter);
    }

    this.allData = { ...obj };
    console.log(this.allData);
    this.sideChild?.getAllData(this.allData);
    this.drawerChild?.getAllData(this.allData);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = await this._backendService
      .makeGetApiCall('unvfd/fetchProducts', obj)
      .toPromise();
    if (res.success) {
      this.productList = res.data?.products;
      console.log(this.productList);
      this.length = res.data?.count;
      console.log('inhere');
      this.drawerChild.changeCount(this.length);
      this.sideChild.changeCount(this.length);
    }
  }
  async getCategoryList() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  filterChangeTrigger(event: IFilters) {
    console.log(event);
    this.getProductList(event);
  }
  routeToProduct(product: IProduct) {
    this._router.navigate(['/product'], {
      queryParams: { productId: product.productId },
    });
  }
  onPageChange(event: PageEvent) {
    console.log(event);
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex + 1;
    this.getProductList();
  }
}
