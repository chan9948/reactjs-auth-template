import { AbstractEntityType, IdType } from './common.type';

export type User = AbstractEntityType & {
  name: string;
  username: string;
  jwt: string;
};
