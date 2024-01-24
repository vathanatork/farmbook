import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useListPendingCAO ,useApproved} from "../../hooks/cao/useCAOer";
import { BaseURL } from "../../utils/BaseURL";

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
  Avatar,
  Alert
} from "@material-tailwind/react";


const TABLE_HEAD = ["No","Profile","Name","Phone Number", "DOB" ,"Gender","Action"];

const PendingCAO = () => {

  const cardHeader = useRef(null);
  const [cardHeaderHeight, setCardHeaderHeight] = useState();
  const [pendingCAO,setPendingCAO] = useState();
  const [currentPage,setCurrentPage] = useState();
  const [totalPage,setTotalPage] = useState();
  const [url,setUrl] = useState(`${BaseURL}/cao-user/pending`);
  const [links,setLinks] = useState();
  const [approveId,setApproveID] = useState();
  const [alert,setAlert] = useState(false);

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

  // fatch List of Pending CAOer
  const {data,isSuccess,refetch:refetchUser} = useListPendingCAO(url);

  //refatch List of Pending
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
        setPendingCAO(data.data.data.user_pending);
        setCurrentPage(data.data.data.paginate.meta.current_page);
        setTotalPage(data.data.data.paginate.meta.last_page);
        setLinks(data.data.data.paginate.links);
      }
    }
  },[isSuccess,data])

  //handle approved
  const onSuccessApprove = () =>{
    refetchUser();
    setAlert(true);
    setTimeout(()=>{
      setAlert(false);
    },3000);
  }

  const {data:dataApprovere,refetch:refetchApprove,isSuccess:isSuccessApprove} = useApproved(approveId,onSuccessApprove);

  const handleApprove = (id) =>{
    setApproveID(id);
  }

  useEffect(() =>{
    if (approveId) {
      refetchApprove();
    }
  },[approveId])

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
              Pending CAO list
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
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
            {pendingCAO?.map(
              ({id,full_name,first_name,last_name,dob,phone_number,gender,nid_url}, index) => {
                const isLast = index === pendingCAO.length - 1;
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
                          icon={nid_url === null ? <UserIcon/> : null}
                          src={nid_url !== null ? nid_url : '/public/assets/images/user.jpg'}
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
                            {full_name === null ? 'N/A' : full_name} {first_name === null ? 'N/A' : first_name} {last_name === null ? 'N/A' : last_name} 
                          </Typography>
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
                          className="font-normal"
                        >
                          {dob === null ? 'N/A' : dob}
                        </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className={`font-normal ${gender==='Female' ? "text-red-500" : "text-green-500"}`}
                      >
                        {gender === null ? 'N/A' : gender}
                      </Typography>
                    </td>
                    <td className={`${classes} text-center`}>
                        <Button
                          onClick={()=>handleApprove(id)}
                          size="sm"
                          >
                          Approve
                        </Button>
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
          <span>{dataApprovere?.data?.message}</span>
        </Alert>
      }

    </Card>
  );
};

export default PendingCAO;
