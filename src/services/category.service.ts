import { ResponseDto } from '../dtos/response.dto';
import { httpHelper } from '../helper/http.helper';
import { Category } from '../types/category.type';

const findAllCategories = async (): Promise<ResponseDto<Category[]>> => {
  const response = await httpHelper.get<ResponseDto<Category[]>>(
    httpHelper.constructPath('/category/all'),
  );
  return response.data;
};

export const categoryService = {
  findAllCategories,
};
