import { IProduct } from './product';

export interface IOrder {
  orderId: string;
  products: IProduct[];
  totalAmount: number;
  createdBy: string;
  status: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  shippingAddress: { [key: string]: any };
  creationTime?: number;
  updatedBy?: string;
  updatationTime?: number;
}
