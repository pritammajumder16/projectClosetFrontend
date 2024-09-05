export interface IProduct {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reviews: any[];
  rating: number;
  productId: number;
  __v: number;
  createdBy: string;
  creationTime: string;
  description: string;
  price: number;
  productImages: string[];
  productName: string;
  size: string[];
  categoryId: number;
  categoryName: string;
  updatedBy: string;
}
