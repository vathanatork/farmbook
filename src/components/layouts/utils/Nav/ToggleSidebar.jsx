import React from "react";
import {IconButton } from "@material-tailwind/react";
import { BurgerIcon } from "../../../../icons/BurgerIcon";
const ToggleSidebar = ({openSidebar,setOpenSidebar}) => {
  return (
    <IconButton 
      color='white'
      className="inline-flex items-center p-2 text-sm rounded-lg lg:hidden"
      onClick={()=>setOpenSidebar(!openSidebar)}
    >
      <BurgerIcon />
    </IconButton>
  );
};

export default ToggleSidebar;
