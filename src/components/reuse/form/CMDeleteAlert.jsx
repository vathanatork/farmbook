import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography
} from "@material-tailwind/react";

export const CMDeleteAlert = ({ open,openHandler,handleDelete,id}) => {
  return (
    <Dialog
      open={open}
      handler={openHandler}
      size="xs"
      dismiss={true}
    >
      <DialogHeader className="flex justify-center font-medium">
          <Typography variant="h5" color="blue-gray">
            Your Attention is Required!
          </Typography>
      </DialogHeader>
      <DialogBody divider className="flex flex-col justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-24 h-24 text-red-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>
        <Typography className="text-center text-red-600 font-normal">
            Do you want to delete this Account?
        </Typography>
      </DialogBody>
      <DialogFooter className="flex justify-center gap-1 items-center">
        <Button
          onClick={openHandler}
          className="mr-1"
        >
          <span>CANCEL</span>
        </Button>
        <Button variant="gradient" color="red" onClick={()=>handleDelete(id)}>
          <span>DELETE</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};
