import React from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

const DropDownList = ({numId,header,icon,open,handleOpen,child}) => {

  return (
    <Accordion
      open={open === numId }
      icon={
        <ChevronDownIcon
          strokeWidth={2.5}
          className={`mx-auto h-4 w-4 transition-transform ${
            open === numId ? "rotate-180" : ""
          }`}
        />
      }
    >
      <ListItem className="p-0" selected={open === numId}>
        <AccordionHeader
          onClick={() => handleOpen(numId)}
          className="border-b-0 p-3"
        >
          <ListItemPrefix>
            {icon}
          </ListItemPrefix>
          <Typography color="blue-gray" className="mr-auto font-normal">
            {header}
          </Typography>
        </AccordionHeader>
      </ListItem>
      <AccordionBody className="py-1">
        <List className="p-0">
          {
            child.map((item,index)=>{
              return (
                <Link to={item.link} key={index} >
                  <ListItem >
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    {item.title}
                  </ListItem>
                </Link>
              );  
            })
          }
        </List>
      </AccordionBody>
    </Accordion>
  );
};

export default DropDownList;
