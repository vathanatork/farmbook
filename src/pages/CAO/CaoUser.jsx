import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate} from "react-router-dom";
import { useCAO, useCAODelete, useCAOUpdateStatus} from "../../hooks/cao/useCAOer";
import { BaseURL } from "../../utils/BaseURL";
import { ResetPasswordFormCao } from "../../components/ui/form/ResetPasswordCao";
import { CMDeleteAlert } from "../../components/reuse/form/CMDeleteAlert";
import image from "/src/assets/images/user.jpg"
import {
  UserPlusIcon,
  UserIcon
} from "@heroicons/react/24/solid";

import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Switch,
  Avatar,
  ButtonGroup,
  Alert,
  Input
} from "@material-tailwind/react";
import { useImportExcel } from "../../hooks/cao/useImportExcel";



const TABLE_HEAD = ["No","Profile","Name","Phone Number", "Status", "Gender","Active","Action"];

const CaoUser = () => {
  const navigate = useNavigate();
  const cardHeader = useRef(null);
  const [cardHeaderHeight, setCardHeaderHeight] = useState();
  const [CAO,setCAO] = useState();
  const [currentPage,setCurrentPage] = useState();
  const [totalPage,setTotalPage] = useState();
  const [url,setUrl] = useState(`${BaseURL}/cao-user`);
  const [links,setLinks] = useState();
  const [alert,setAlert] = useState(false);
  const [alertMessage,setAlertMessage] = useState(null);
  const [deleteID,setDeleteID] = useState(null);
  const [openDialog,setOpenDialog] = useState(false);
  const [resetID,setResetID] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [id, setId] = useState(null);
  const [open,setOpen] = useState(false);

  useEffect(() => {
    if (cardHeader.current) {
      const height = cardHeader.current.offsetHeight;
      setCardHeaderHeight(height);
    }
  }, [cardHeader]);

  const cardBodyStyle = {
    overflowY: "scroll",
    height: cardHeaderHeight
      ? `calc(100vh - ${cardHeaderHeight}px - 180px)`
      : "100%",
    padding: "0",
  };

  const deleteOnClick = (newId) => {
    setOpen((prev) => !prev)
    setId(newId);
  }

  //handler
  const openHandler = () => {
    setOpen((prev) => !prev)
  }

  // fatch List 
  const {data,isSuccess,refetch:refetchUser} = useCAO(url);

  //refatch List 
  const handleRefetchUser = (f) =>{
    setUrl(f);
  }
  
  useEffect(()=>{
    refetchUser();
  },[url])

  //onSuccess
  useEffect(() => {
    if(isSuccess) {
      if(data?.data?.data){
        setCAO(data.data.data.list);
        setCurrentPage(data.data.data.paginate.meta.current_page);
        setTotalPage(data.data.data.paginate.meta.last_page);
        setLinks(data.data.data.paginate.links);
      }
    }
  },[isSuccess,data])

  //handle delete 
  const {data:deleteData,refetch:deleteRefetch,isSuccess:deleteIsSuccess} = useCAODelete(`cao-user/${deleteID}`)

  const handleDelete = (id) => {
    setDeleteID(id);
  }

  useEffect(()=>{
    if(deleteID !== null){
      deleteRefetch()
      refetchUser()
      if(deleteIsSuccess){
        setOpen(false);
        setAlert(true)
        setInterval(()=>{
          setAlert(false)
        },4000)
      }
      setDeleteID(null);
    }

    if(deleteIsSuccess){
      setOpen(false);
      refetchUser()
    }

    if(deleteIsSuccess && deleteData.data.code == 200 && deleteID !== null){
      refetchUser();
      setOpen(false);
      setAlertMessage(deleteData.data.code == 200 && "successfully delete" );
      setAlert(true)
      setInterval(()=>{
        setAlert(false)
      },4000)
    }
    setDeleteID(null);

  },[deleteID,refetchUser,deleteIsSuccess])

  //open reset password dialog
  const openResetPassword = (id = 0,first_name = " ") => {
    setOpenDialog((prev) => !prev)
    setResetID([id,first_name]);
  }

  //hanlde switch and update status
  const [switchValue, setSwitchValue] = useState(true);
  const [statusID, setStatusID] = useState(null);

  const handleSwitchChange = (id,e) => {
    setStatusID(id);
    setSwitchValue(e.target.checked);
  };

  const {data:statusData,isSuccess:statusIsSuccess,refetch:statusRefetch} = useCAOUpdateStatus(statusID,switchValue);
  
  useEffect(()=>{
    if(statusID !== null){
      statusRefetch();
    }
    if(statusIsSuccess && statusData.data.code == 406){
      refetchUser()
      setAlertMessage("some error occurred");
      setAlert(true)
      setInterval(()=>{
        setAlert(false)
      },4000)
    }
    if(statusIsSuccess && statusData.data.code == 200){
      refetchUser()
      setAlertMessage("updated status successfully");
      setAlert(true)
      setInterval(()=>{
        setAlert(false)
      },3000)
    }
    setStatusID(null);
  },[statusRefetch,statusIsSuccess,switchValue,statusID])

  //handle import file
  const {data: uploadData ,refetch:uploadRefetch, isSuccess:uploadIsSuccess} = useImportExcel(selectedFile);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const f = new FormData();
      f.append('file',file);
      setSelectedFile(f);
    }
  }

  useEffect(()=>{
    if(selectedFile){
      uploadRefetch();
    }
    if(uploadIsSuccess && uploadData.data.code == 406){
      setAlertMessage(uploadData?.data?.message?.file?.[0]);
      setAlert(true)
      setInterval(()=>{
        setAlert(false)
      },4000)
    }
    if(uploadIsSuccess && uploadData.data.code == 200){
      setAlertMessage("successfully  imported");
      setAlert(true)
      setInterval(()=>{
        setAlert(false)
      },4000)
    }
  },[selectedFile,uploadRefetch,uploadIsSuccess])

  return (
    <Card className="h-full w-full ">
      {/* start card header */}
      <CardHeader
        ref={cardHeader}
        floated={false}
        shadow={false}
        className="rounded-none"
      >
        <div className="mb-4 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              CAO list
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <div className="relative w-[78px] h-[33.6px]">
              <Button 
                variant="outlined"
                size="sm"
                className="w-[78px] h-[33.6px]"
              >
                Import
              </Button>
              <div  className="top-0 left-0 z-30 absolute w-[78px] h-[33.6px] opacity-0 cursor-pointer ">
                <input type="file" className="w-[78px] h-[33.6px] cursor-pointer" onChange={handleFileChange}/>
              </div>
            </div>
            
            <Link to="/cao/addCoa">
              <Button className="flex items-center gap-3" size="sm">
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add New CAO
              </Button>
            </Link>
          </div>
        </div>
      </CardHeader>

      {/* start card body */}
      <CardBody style={cardBodyStyle} className="overflow-scroll  px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          {/* table head */}
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className={`font-normal ${
                      head == "Action" ? "text-center" : ""
                    } leading-none opacity-70`}
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          {/* table body */}
          <tbody>
            {CAO?.map(
              ({id,first_name,last_name,email,phone_number,status,is_active,detail}, index) => {
                const isLast = index === CAO.length - 1;
                const classes = isLast
                  ? "p-4 "
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={index}>
                    <td className={classes}>
                    <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {index === null ? 'N/A' : (currentPage-1)*10+(index+1)} 
                          </Typography>
                    </td>
                    <td className={classes}>
                        <Avatar
                          variant="rounded"
                          icon={detail.nid_url === null ? <UserIcon/> : null}
                          src={detail.nid_url !== null ? detail.nid_url : image}
                          alt="image"
                          size="sm"
                        />
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">

                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {first_name === null ? 'N/A' : first_name}  {last_name === null ? 'N/A' : last_name}
                          </Typography>
                          {/* <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {email === null ? 'N/A' : email}
                          </Typography> */}
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {phone_number === null ? 'N/A' : phone_number}
                        </Typography>
                    </td>
                    <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className={`font-normal ${status =='pending' ? "text-red-500" : "text-green-500"}`}
                          
                        >
                          {status === null ? 'N/A' : status}
                        </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className={`font-norma`}
                      >
                        {detail.gender === null ? 'N/A' : detail.gender.charAt(0).toUpperCase() + detail.gender.slice(1)}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Switch 
                        color="green" 
                        defaultChecked={is_active == true} 
                        onChange={()=>handleSwitchChange(id,event)}
                      />
                    </td>
                    <td className={`${classes} text-center flex justify-center items-center`}>
                    <ButtonGroup size="sm"
                        variant="outlined"
                      >
                        <Button onClick={()=>navigate(`/cao/detail/${id}`)}>
                          View
                        </Button>
                        <Button onClick={()=>navigate(`/cao/edit/${id}`)}>
                          Edit
                        </Button>
                        <Button
                          onClick={()=>deleteOnClick(id)}
                        >
                          Delete
                        </Button> 
                        <Button onClick={()=>openResetPassword(id,first_name)}>reset password</Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 pb-0 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page {currentPage} of {totalPage}
        </Typography>
        <div className="flex gap-2">
          <Button 
            onClick={links && links.prev !== null ? () => handleRefetchUser(links.prev) : () => {}}
            variant="outlined" 
            size="sm"
            disabled={links && links.prev === null}
            >
            Previous
          </Button>
          <Button 
            onClick={links && links.next !== null ? () => handleRefetchUser(links.next) : () => {}}
            variant="outlined" 
            size="sm"
            disabled={links && links.next === null}
          >
            Next
          </Button>
        </div>
      </CardFooter>

      <CMDeleteAlert
        open={open} 
        openHandler={openHandler}
        handleDelete={handleDelete}
        id={id}
      />

      {
        alert == true &&
        <Alert
          variant="outlined"
          className="w-[300px] absolute left-0 bottom-0 ml-3 bg-white font-medium text-black"
          animate={{
            mount: { x: 0, opacity: 1 },
            unmount: { x: '-100%', opacity: 0 },
          }}
        >
          <span>{alertMessage ? alertMessage : ""}</span>
        </Alert>
      }

      <ResetPasswordFormCao 
        open={openDialog} 
        resetID={resetID} 
        handleOpen={openResetPassword} 
        setOpenDialog={setOpenDialog} 
        setAlert={setAlert} 
        setAlertMessage={setAlertMessage} 
      />

    </Card>
    
  );
};

export default CaoUser;
