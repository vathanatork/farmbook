import React from 'react'
import ToggleSidebar from './utils/Nav/ToggleSidebar'
import Logo from './utils/Nav/Logo'
import Profile from './utils/Nav/Profile'
import Lang from '../ui/Lang'


const Nav = ({setOpenSidebar,openSidebar}) => {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-start rtl:justify-end">
                    <ToggleSidebar setOpenSidebar={setOpenSidebar} openSidebar={openSidebar}/>
                    <Logo/>
                </div>
                <div className="flex items-center">
                    <div className="flex gap-5 items-center ms-3">
                        <Lang/>
                        <Profile/>
                    </div>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Nav