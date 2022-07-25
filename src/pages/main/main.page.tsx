import { Button } from '@mui/material';
import { useCallback } from 'react';
import { useAuthContext } from '../../contexts/auth.context';

export const MainPage = () => {
  const authContext = useAuthContext();

  const logout = useCallback(() => {
    authContext?.logout();
  }, [authContext]);

  return (
    <>
      <Button onClick={logout} variant="contained" fullWidth color="error">
        Logout
      </Button>
    </>
  );
};
