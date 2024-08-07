/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { constants } from '../../../../../constants/constants';
import { ICategory } from '../../../../../models/category';
import {
  ICategoryFilter,
  IFilters,
  ISizeFilter,
} from '../../../../../models/filters';

@Component({
  selector: 'app-side-filter',
  templateUrl: './side-filter.component.html',
  styleUrl: './side-filter.component.scss',
})
export class SideFilterComponent implements OnInit {
  disabled = false;
  max = 10000;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  public searchText: string = '';
  public value1 = 0;
  public value2 = this.max;
  @Input() categories: ICategory[] | undefined;

  @Input() allData: { [key: string]: string } = {};

  @Input() fromFilterBtn: boolean = false;
  @Output() filterChangeTrigger: EventEmitter<IFilters> = new EventEmitter();
  @Input() productCount: number = 0;
  public sizeArray: string[] = constants.sizes;
  public selectedCategories: ICategoryFilter = {};
  public selectedSizes: ISizeFilter = {};
  public showCount: number = 0;
  public randArr = [];
  ngOnInit() {
    this.showCount = this.productCount;
    this.sizeArray.forEach((size: string) => {
      this.selectedSizes[size] = false;
    });
    this.categories?.forEach((category: ICategory) => {
      this.selectedCategories[category.categoryId] = false;
    });
    this.getAllData(this.allData);
  }
  getAllData(allData: { [key: string]: string }) {
    if (allData?.['priceFilterS1']) {
      this.value1 = Number(allData['priceFilterS1']);
    }
    console.log(this.value1, allData);

    if (allData?.['priceFilterS2']) {
      this.value2 = Number(allData['priceFilterS2']);
    }

    if (allData?.['categoryFilter']) {
      this.selectedCategories = JSON.parse(allData['categoryFilter']);
    }

    if (allData?.['sizeFilter']) {
      this.selectedSizes = JSON.parse(allData['sizeFilter']);
    }

    if (allData?.['searchText']) {
      this.searchText = allData['searchText'];
    }
    console.log('allDataa', this.allData);
  }
  searchClick(
    event: { preventDefault: () => void; stopPropagation: () => void },
    data: string,
    type: string
  ) {
    event.preventDefault();
    event.stopPropagation();
    this.filterChange(data, type);
  }
  filterChange(
    _data: string | number | ISizeFilter | ICategoryFilter,
    _type: string
  ) {
    console.log({
      priceFilterS2: this.value2,
      priceFilterS1: this.value1,
      categoryFilter: this.selectedCategories,
      sizeFilter: this.selectedSizes,
      searchText: this.searchText,
    });
    this.filterChangeTrigger.emit({
      priceFilterS2: this.value2,
      priceFilterS1: this.value1,
      categoryFilter: this.selectedCategories,
      sizeFilter: this.selectedSizes,
      searchText: this.searchText,
    });
  }
  changeCount(count: number) {
    this.showCount = count;
  }
}
