import {Outlet} from 'react-router-dom'
import { Navigate ,useLocation} from 'react-router-dom'
import { useAuth } from '../../auth/auth';

const GuestLayout = () => {
  const location = useLocation();
  const auth = useAuth();
    
  if (!auth.isGuest()) {
      return <Navigate to='/' state={{path:location.pathname}}/>
  }

  return (
    <>
      <Outlet/>
    </>
  )
}

export default GuestLayout