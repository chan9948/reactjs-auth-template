import { Button, ButtonGroup, SvgIconProps } from '@mui/material';
import { ReactElement } from 'react';

export type ActionBarProps = {
  actionBtns: ActionBarBtnProps[];
};

export type ActionBarBtnProps = {
  icon: ReactElement<SvgIconProps>;
  text: string;
  color:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning';
  onClick: () => void;
};

export const ActionBar = (props: ActionBarProps) => {
  const btns = props.actionBtns;

  return (
    <>
      <ButtonGroup sx={{ justifyContent: 'flex-end' }}>
        {btns.map((btn) => (
          <ActionBarBtn {...btn} />
        ))}
      </ButtonGroup>
    </>
  );
};

export const ActionBarBtn = (props: ActionBarBtnProps) => {
  return (
    <Button
      color={props.color}
      variant="contained"
      startIcon={props.icon}
      onClick={props.onClick}
    >
      {props.text}
    </Button>
  );
};
