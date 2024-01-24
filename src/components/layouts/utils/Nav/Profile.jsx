import React, {useState} from "react";
import { useAuth } from "../../../../auth/auth";
import { Navigate,Link,useNavigate } from "react-router-dom";
import khFlag from "/src/assets/images/kh-flag.jpg";
import enFlag from "/src/assets/images/en-flag.jpg"
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Avatar,
  List,
  Typography,
  ListItemPrefix,
  ListItem,
  ListItemSuffix,
  IconButton,
} from "@material-tailwind/react";

const Profile = () => {
  const navigate = useNavigate();
  const [user, SetUser] = useState(
    JSON.parse(sessionStorage.getItem("user_data"))
  );

  const auth = useAuth();

  if (!user) {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("user_data");
    auth.setAccessToken(null);
    console.log("No user");
    return <Navigate to="/login" />;
  }
  
  if(auth.isLogout){
    navigate('/login');
  };

  return (
    <>
      <Popover placement="top-end">
        <PopoverHandler>
          <IconButton variant="outlined" >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </div>
          </IconButton>
        </PopoverHandler>
        <PopoverContent className="mt-[20px] w-[300px]">
          <List>
            <ListItem
              ripple={false}
              className="!bg-white hover:!bg-white focus:!bg-white active:!bg-white"
            >
              {/* <ListItemPrefix>
                <Avatar
                  variant="rounded"
                  alt="candice"
                  src="https://docs.material-tailwind.com/img/face-1.jpg"
                />
              </ListItemPrefix> */}
              <div>
                <Typography variant="h5" color="blue-gray">
                  {user.name}
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal"
                >
                  {user.email}
                </Typography>
              </div>
            </ListItem>
            <hr />
            <Link to='/profile'> 
              <ListItem className="hover:text-blue-500 hover:bg-blue-gray-50">
                My Profile
              </ListItem>
            </Link>
            <ListItem className="hover:text-blue-500 hover:bg-blue-gray-50">
              Mode
            </ListItem>
            <ListItem className="p-0 hover:text-blue-500 hover:bg-blue-gray-50">
              <Popover placement="left">
                <PopoverHandler>
                  <ListItem className="hover:text-blue-500 hover:bg-blue-gray-50">
                    Languages
                    <ListItemSuffix className="flex gap-2">
                      <Typography
                        variant="small"
                        color="blue"
                        className="font-bold"
                      >
                        Khmer
                      </Typography>
                      <div>
                        <Avatar
                          src="/public/assets/images/kh-flag.jpg"
                          alt="Khmer"
                          variant="rounded"
                          size="xs"
                        />
                      </div>
                    </ListItemSuffix>
                  </ListItem>
                </PopoverHandler>
                <PopoverContent>
                  <ListItem className="py-1.5 px-3 text-sm font-normal text-blue-gray-700 hover:text-blue-500 hover:bg-gray-50 focus:bg-gray-50 focus:text-blue-500">
                    <ListItemPrefix>
                      <div>
                        <Avatar
                          src={khFlag}
                          alt="Khmer"
                          variant="rounded"
                          size="xs"
                          className="w-[20px] h-[20px]"
                        />
                      </div>
                    </ListItemPrefix>
                    Khmer
                  </ListItem>
                  <ListItem className="py-1.5 px-3 text-sm font-normal text-blue-gray-700 hover:text-blue-500 hover:bg-gray-50 focus:bg-gray-50 focus:text-blue-500">
                    <ListItemPrefix>
                      <div>
                        <Avatar
                          src={enFlag}
                          alt="English"
                          variant="rounded"
                          size="xs"
                          className="w-[20px] h-[20px]"
                        />
                      </div>
                    </ListItemPrefix>
                    English
                  </ListItem>
                </PopoverContent>
              </Popover>
            </ListItem>
            <ListItem 
              onClick={()=>auth.logout()}
              className="hover:text-blue-500 hover:bg-blue-gray-50">
              Log out
            </ListItem>
          </List>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default React.memo(Profile);
