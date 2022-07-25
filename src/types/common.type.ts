import { User } from './user.type';

export type IdType = string;

export type AbstractEntityType = {
  id: IdType;
  createdDate: Date;
  updatedDate: Date;
  // deletedDate: Date;
};
