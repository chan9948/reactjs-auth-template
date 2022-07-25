import {
  AddOutlined,
  DeleteOutline,
  ExpandMoreOutlined,
} from '@mui/icons-material';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Card,
  Collapse,
  Grid,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useCallback, useEffect, useState } from 'react';
import { ActionBar } from '../../components/actionBar/actionBar.component';
import { ItemGrid } from '../../components/itemGrid/itemGrip.component';
import { useFetchData } from '../../hooks/fetchData.hook';
import { categoryService } from '../../services/category.service';
import { Category } from '../../types/category.type';
import { IdType } from '../../types/common.type';

export const CategoryPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchData = useCallback(async () => {
    const categoriesData = (await categoryService.findAllCategories()).data;
    console.log(categoriesData);

    if (categoriesData) {
      setCategories(categoriesData);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      {/* <ActionBar
        actionBtns={[
          {
            icon: <AddOutlined />,
            text: 'add category',
            color: 'success',
            onClick: () => {
              console.log('add');
            },
          },
          {
            icon: <DeleteOutline />,
            text: 'delete category',
            color: 'error',
            onClick: () => {
              console.log('delete');
            },
          },
        ]}
      /> */}
      {isLoading ? (
        'loading'
      ) : (
        <ItemGrid
          items={categories.map((category: Category) => (
            <CategoryItem category={category} />
          ))}
        />
      )}
    </>
  );
};

export type CategoryItemProps = {
  category: Category;
};

export const CategoryItem = (props: CategoryItemProps) => {
  const hasSubCategory = props.category.children.length > 0;
  return (
    <Card>
      <div>
        <Typography variant="h3">{props.category.code}</Typography>
        <div>{props.category.name}</div>
      </div>
    </Card>
  );
};
