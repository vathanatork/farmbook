import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";

import { useState,useEffect } from "react";
import { Error } from "../../reuse/validate/Error";
import { useForm } from 'react-hook-form'
import { useResetPassword } from "../../../hooks/cao/useCAOer";
  
  export const ResetPasswordFormCao = ({open,handleOpen,resetID,setOpenDialog,setAlert,setAlertMessage}) => {
  
    const [formData, setFormData] = useState();
    const [errorMessage, setErrorMessage] = useState([]);
  
    const form = useForm();
    const {register,control,handleSubmit,reset} = form;
    const { data:editData , isSuccess:editIsSuccess, refetch:editRefetch } = useResetPassword(`/cao-user/password/${resetID?.[0]}`,formData);
  
    const onSubmit = (data) => {
      const filteredFormData = Object.fromEntries(
          Object.entries(data).filter(([key, value]) => value !== "")
      );
      setFormData(filteredFormData);
    };
  
    useEffect(() => {
      if (formData) {
        editRefetch();
      }
    }, [editRefetch, formData]);
  
    useEffect(()=>{
      if(editData?.data?.message) {
        setErrorMessage(editData.data.message);
      }
      if(editData?.data?.code === 200 && formData){
        setAlertMessage("successfully reset password");
        setOpenDialog(false);
        setAlert(true);
        reset();
        setFormData();
        setInterval(()=>{
          setAlert(false)
        },4000)
      }
    },[editIsSuccess,editData,setOpenDialog])
  
  
    return (
      <>
          <Dialog
            size="xs"
            open={open}
            handler={handleOpen}
            className="bg-transparent shadow-none"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
            <Card className="mx-auto w-full max-w-[24rem]">
              <CardBody className="flex flex-col gap-4">
                <Typography variant="h4" className="text-center" color="blue-gray">
                  Reset Password 
                </Typography>
                <Typography
                  className="mb-3 font-normal text-center"
                  variant="paragraph"
                  color="gray"
                >
                  For admin's {resetID?.[1]}.
                </Typography>
                <Typography className="-mb-2" variant="h6">
                  Password
                </Typography>
                <div>
                  <Input label="password" type="password" size="lg" {...register('password')}/>
                  <Error error={errorMessage?.password?.[0] ? errorMessage.password[0] : ''} />
                </div>
  
                <Typography className="-mb-2" variant="h6">
                  Confirm Password
                </Typography>
                <div>
                  <Input type="password" label="confirm password" size="lg" {...register('password_confirmation')}/>
                  <Error error={errorMessage?.password?.[1] ? errorMessage.password[1] : ''} />
                </div>
              </CardBody>
              <CardFooter className="pt-0">
                <Button type="submit" variant="gradient" fullWidth>
                  Reset 
                </Button>
              </CardFooter>  
            </Card>
            </form>
          </Dialog>
      </>
    );
  }