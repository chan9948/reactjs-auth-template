import { Formik, FormikHelpers, FormikProps, useFormik } from 'formik';
import { SigninDto } from '../../dtos/auth/signin.dto';
import * as Yup from 'yup';
import { Button, FormControl, FormHelperText, TextField } from '@mui/material';
import { authService } from '../../services/auth.service';
import { useState } from 'react';
import { useAuthContext } from '../../contexts/auth.context';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../constants/routePath.constant';
import { useSnackbar } from 'notistack';

export const LoginPage = () => {
  const navigate = useNavigate();
  const authContext = useAuthContext();
  const snackbar = useSnackbar();

  const initialValues: SigninDto = {
    username: '',
    password: '',
  };

  const onSubmit = async (
    value: SigninDto,
    // helpers: FormikHelpers<SigninDto>,
  ) => {
    if (await authContext?.login(value)) {
      navigate(ROUTE_PATH.MAIN);
    }
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('username cannot be empty'),
    password: Yup.string().required('password cannot be empty'),
  });

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema: validationSchema,
  });

  return (
    <>
      {authContext?.checkIsLogin() && <Navigate to={ROUTE_PATH.MAIN} />}
      <form onSubmit={formik.handleSubmit}>
        <FormControl
          error={formik.submitCount > 0}
          aria-describedby="errorMessage"
          style={{ gap: '0.5em' }}
        >
          <TextField
            id={'username'}
            value={formik.values.username}
            onChange={formik.handleChange}
            variant="standard"
            type="text"
            label="username"
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            id={'password'}
            value={formik.values.password}
            onChange={formik.handleChange}
            variant="standard"
            type="password"
            label="password"
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button variant="contained" type="submit">
            Login
          </Button>
          {formik.submitCount > 0 && (
            <FormHelperText
              id="errorMessage"
              sx={{ textAlign: 'center' }}
            >{`Login Failed (${formik.submitCount})`}</FormHelperText>
          )}
        </FormControl>
      </form>
    </>
  );
};
