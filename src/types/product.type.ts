import { CoreCategoryType } from 'prettier';
import { Category } from './category.type';
import { AbstractEntityType } from './common.type';
import { Price } from './price.type';

export type Product = AbstractEntityType & {
  name: string;

  description: string;

  unit: string;

  quantity: number;

  code: string;

  category: Category;

  prices: Price[];
};
