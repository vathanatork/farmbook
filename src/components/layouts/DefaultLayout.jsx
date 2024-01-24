import {useState} from 'react'
import {Outlet} from 'react-router-dom'
import { Navigate ,useLocation} from 'react-router-dom'
import { useAuth } from '../../auth/auth'

import Nav from './Nav'
import Aside from './Aside'

const DefaultLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false)
  const location = useLocation();
  const auth = useAuth();
    
  if (!auth.isAuth()) {
      return <Navigate to='/login' state={{path:location.pathname}}/>
  }

  return (
    <>
      <Nav setOpenSidebar={setOpenSidebar} openSidebar={openSidebar}/>
      <Aside openSidebar={openSidebar}/>
      <div className="p-4 lg:ml-64">
          <div className="relative overflow-x-auto ">
              <div className='mt-14'>
                <Outlet/>
              </div>
          </div>
      </div>
    </>
  )
}

export default DefaultLayout