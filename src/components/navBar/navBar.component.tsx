import {
  CardTravel,
  Home,
  HomeMax,
  HomeOutlined,
  ImportContacts,
  ImportContactsOutlined,
  List,
  LoginOutlined,
  MenuOutlined,
  ProductionQuantityLimits,
  ShoppingCart,
  ShoppingCartOutlined,
  Storage,
  Storefront,
  SvgIconComponent,
  Warehouse,
  WarehouseOutlined,
} from '@mui/icons-material';
import {
  AppBar,
  Button,
  colors,
  Hidden,
  IconButton,
  SvgIconProps,
  Toolbar,
  Typography,
} from '@mui/material';
import { Box, Container } from '@mui/system';
import { ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../constants/routePath.constant';
import { useAuthContext } from '../../contexts/auth.context';

export const NavBar = () => {
  const authContext = useAuthContext();
  return (
    <AppBar
      sx={{
        backgroundColor: '#123456',
        top: { xs: 'auto', md: 0 },
        bottom: { xs: 0, md: 'auto' },
        position: { xs: 'fixed', md: 'sticky' },
      }}
    >
      <Container maxWidth="xl">
        <Toolbar variant="dense" disableGutters>
          <Storefront
            sx={{
              display: {
                xs: authContext?.checkIsLogin() ? 'none' : 'flex',
                md: 'flex',
              },
              mr: 1,
            }}
          />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: {
                xs: authContext?.checkIsLogin() ? 'none' : 'flex',
                md: 'flex',
              },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              userSelect: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              gap: '.5em',
              justifyContent: { xs: 'space-evenly', md: 'flex-end' },
            }}
          >
            {[
              {
                title: 'main',
                icon: <HomeOutlined />,
                isRequireAuth: true,
                path: ROUTE_PATH.MAIN,
              },
              {
                title: 'category',
                icon: <ImportContactsOutlined />,
                isRequireAuth: true,
                path: ROUTE_PATH.CATEGORY,
              },
              {
                title: 'product',
                icon: <WarehouseOutlined />,
                isRequireAuth: true,
                path: ROUTE_PATH.PRODUCT,
              },
              {
                title: 'order',
                icon: <ShoppingCartOutlined />,
                isRequireAuth: true,
                path: ROUTE_PATH.ORDER,
              },
            ]
              .filter(
                (page: any) =>
                  authContext?.checkIsLogin() === page.isRequireAuth,
              )
              .map((page: any) => (
                <NavBarItem
                  key={page.title}
                  icon={page.icon}
                  text={page.title}
                  path={page.path}
                />
              ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

type NavBarItemProps = {
  icon: ReactElement<SvgIconProps>;
  text: string;
  path: ROUTE_PATH;
};

const NavBarItem = (props: NavBarItemProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Button
        variant="text"
        onClick={() => {
          navigate(props.path);
        }}
        disabled={location.pathname === props.path}
        style={{
          opacity: location.pathname === props.path ? 1 : 0.35,
          color: 'inherit',
        }}
        size="large"
        color="inherit"
        startIcon={props.icon}
      >
        <Hidden smDown>{props.text}</Hidden>
      </Button>
    </div>
  );
};
