import { useState ,useEffect, useRef} from "react";
import { useTranslation } from "react-i18next";
import DropDownList from "./utils/Aside/DropDownList";
import DefaultList from "./utils/Aside/DefaultList";

import {
  List,
} from "@material-tailwind/react";

import {
  PresentationChartBarIcon,
  UserCircleIcon,
  HomeIcon,
  ShoppingBagIcon
} from "@heroicons/react/24/solid";

const Aside = ({openSidebar}) => {

  const { t } = useTranslation();
  const [open, setOpen] = useState(0);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  useEffect(() => {
      const sidebar = document.getElementById('sidebar');

      if (openSidebar) {
        sidebar.classList.remove('-translate-x-full');
        sidebar.classList.add('translate-x-0');
      } else {
        sidebar.classList.remove('translate-x-0');
        sidebar.classList.add('-translate-x-full');
      }
    
  }, [openSidebar]);

  return (
   <aside
      id="sidebar"
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full  bg-white border-r border-gray-200 lg:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
    >  
        <List>
          <DefaultList 
            header="Dashboard" 
            icon={<HomeIcon className="h-5 w-5 text-black" />}
            link='/'
          />
          <DropDownList 
            numId={2} 
            open={open} 
            handleOpen={handleOpen}
            header="Statistics"
            icon={<PresentationChartBarIcon className="h-5 w-5 text-black"/>}
            child={usersList}
          />
          <DefaultList 
            header="Admin List" 
            icon={<UserCircleIcon className="h-5 w-5 text-black" />}
            link='/admin'
          />
          <DefaultList 
            header="CAO List" 
            icon={<UserCircleIcon className="h-5 w-5 text-black" />}
            link='/cao'
          />
          <DefaultList 
            header="CAO Pending List" 
            icon={<UserCircleIcon className="h-5 w-5 text-black" />}
            link='/cao/pending'
          />
          <DefaultList 
            header="Supplier List" 
            icon={<UserCircleIcon className="h-5 w-5 text-black" />}
            link='/supplier'
          />
        
          <hr className="my-2 border-blue-gray-50" />

          <DefaultList 
            header="Profile" 
            icon={<UserCircleIcon className="h-5 w-5 text-black" />}
            link='/profile'
          />

          <DefaultList 
            header="Market Demand" 
            icon={<ShoppingBagIcon className="h-5 w-5 text-black" />}
            link='/'
          />
          
        </List>
      
    </aside> 
  );
};

export default Aside;


const usersList = [
  {title : "Analog",link: '/'},
  {title : "Analytics",link: '/'}
];



