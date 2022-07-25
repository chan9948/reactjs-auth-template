import { Grid } from '@mui/material';
import { ReactNode } from 'react';

export type ItemGridProps = { items: ReactNode[] };
export type ItemGridItemProps = { item: ReactNode };

export const ItemGrid = (props: ItemGridProps) => {
  return (
    <Grid container direction="row" spacing={1}>
      {props.items.map((item, index) => (
        <ItemGridItem key={index} item={item} />
      ))}
    </Grid>
  );
};

export const ItemGridItem = (props: ItemGridItemProps) => {
  return (
    <Grid item xs={12} sm={6} md={3}>
      {props.item}
    </Grid>
  );
};
