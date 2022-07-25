import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, ProtectedRoute } from './contexts/auth.context';
import { ROUTE_PATH } from './constants/routePath.constant';
import { Layout } from './components/layout/layout.component';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { LoginPage } from './pages/login/login.page';
import { MainPage } from './pages/main/main.page';
import { httpHelper } from './helper/http.helper';
import { useEffect } from 'react';
import { CategoryPage } from './pages/category/category.page';

function App() {
  const snackbar = useSnackbar();

  useEffect(() => {
    httpHelper.setResponseInterceptors(snackbar);
  }, [snackbar]);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate replace to={ROUTE_PATH.LOGIN} />} />
          <Route path={ROUTE_PATH.LOGIN} element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route path={ROUTE_PATH.MAIN} element={<MainPage />} />
            <Route path={ROUTE_PATH.CATEGORY} element={<CategoryPage />} />
            <Route path={ROUTE_PATH.PRODUCT} element={<div>PRODUCT</div>} />
            <Route path={ROUTE_PATH.ORDER} element={<div>ORDER</div>} />
          </Route>
          <Route
            path="*"
            element={<Navigate replace to={ROUTE_PATH.LOGIN} />}
          />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
