import {useNavigate} from 'react-router-dom'

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export const CMAlert = ({open,handler,location}) => {

  const navigate = useNavigate();
  
  return (
    <Dialog
      open={open}
      handler={handler}
      size="xs"
      dismiss={true}
    >
      <DialogHeader className="flex justify-center font-medium" >Successful</DialogHeader>
      <DialogBody  className="flex justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-24 h-24 text-green-600"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </DialogBody>
      <DialogFooter className="flex justify-center gap-1 items-center">
        <Button
          onClick={()=>navigate(location)}
          className="mr-1"
        >
          <span>BACK</span>
        </Button>
        <Button variant="gradient" color="green" onClick={handler}>
          <span>ADD MORE</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};
