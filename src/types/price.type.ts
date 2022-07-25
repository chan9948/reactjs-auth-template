import { AbstractEntityType } from './common.type';
import { Product } from './product.type';

export type Price = AbstractEntityType & {
  unitPrice: number;

  // ownedByProduct: Product
};
