import { AbstractEntityType } from './common.type';
import { Product } from './product.type';

export type Category = AbstractEntityType & {
  name: string;

  description: string;

  code: string;

  children: Category[];

  parent: Category;

  products: Product[];
};
