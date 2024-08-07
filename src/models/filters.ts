export interface IFilters {
  priceFilterS2: number;
  priceFilterS1: number;
  sizeFilter: ISizeFilter;
  categoryFilter: ICategoryFilter;
  searchText: string;
}
export interface ISizeFilter {
  [key: string]: boolean;
}
export interface ICategoryFilter {
  [key: string]: boolean;
}
