import { Paper } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { NavBar } from '../navBar/navBar.component';

export const Layout = () => {
  return (
    <>
      <NavBar />
      <Paper
        elevation={2}
        sx={{
          padding: '1em',
          margin: '0.5em',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Outlet />
      </Paper>
    </>
  );
};
