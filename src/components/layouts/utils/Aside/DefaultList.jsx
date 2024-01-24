import { Link } from "react-router-dom";
import {
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";

const DefaultList = ({header,icon,link}) => {
  return (
    <Link to={link}>
      <ListItem
        className="text-black"
      >
        <ListItemPrefix>
          {icon}
        </ListItemPrefix>
        {header}
      </ListItem>
    </Link>
  )
}

export default DefaultList