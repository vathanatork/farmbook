import React, { useRef, useState, useEffect} from "react";
import {Link, useNavigate } from "react-router-dom";

import {
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { BaseURL } from "../../utils/BaseURL";
import { useAdminDelete, useListAdmin } from "../../hooks/useAdmin";
import { ResetPasswordForm } from "../../components/ui/form/ResetPasswordForm";
import {
  Card,
  CardHeader,
  Typography,
  Alert,
  Button,
  CardBody,
  CardFooter,
  ButtonGroup,
} from "@material-tailwind/react";
import { CMDeleteAlert } from "../../components/reuse/form/CMDeleteAlert";

const TABLE_HEAD = ["ID", "Name", "Email", "Role", "Action"];

const AdminList = () => {
  const navigate = useNavigate();
  const cardHeader = useRef(null);
  const [cardHeaderHeight, setCardHeaderHeight] = useState();
  const [admin, setAdmin] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [totalPage, setTotalPage] = useState();
  const [url, setUrl] = useState(`${BaseURL}/admin-user`);
  const [links, setLinks] = useState();
  const [deleteID, setDeleteID] = useState(null);
  const [alert, setAlert] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [resetID, setResetID] = useState();
  const [alertMessage, setAlertMessage] = useState();
  const [open,setOpen] = useState(false);
  const [id, setId] = useState(null);
  // hull height
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

  //get admin list
  const {
    data: adminData,
    isSuccess: adminIsSuccess,
    refetch: adminRefetch,
  } = useListAdmin(url);

  //refatch List of Pending
  const handleRefetchAdmin = (f) => {
    setUrl(f);
  };

  useEffect(() => {
    adminRefetch();
  }, [url]);

  //onSuccess
  useEffect(() => {
    if (adminIsSuccess) {
      console.log(adminData?.data?.data);
      if (adminData?.data?.data) {
        setAdmin(adminData.data.data.list);
        setCurrentPage(adminData.data.data.paginate.meta.current_page);
        setTotalPage(adminData.data.data.paginate.meta.last_page);
        setLinks(adminData.data.data.paginate.links);
      }
    }
  }, [adminIsSuccess, adminData]);

  //hande delete
  const {
    data: deleteData,
    refetch: deleteRefetch,
    isSuccess: deleteIsSuccess,
  } = useAdminDelete(`admin-user/${deleteID}`);

  const handleDelete = (id) => {
    setDeleteID(id);
  };

  useEffect(() => {
    if (deleteID) {
      deleteRefetch();
      adminRefetch();
      if(deleteIsSuccess){
        setOpen(false);
        setAlert(true);
        setInterval(() => {
          setAlert(false);
        }, 4000);
      }
    }

    if(deleteIsSuccess && deleteData.data.code == 200 && deleteData.data.message == "OK") {
      adminRefetch();
      setOpen(false);
      setAlertMessage("successfully delete");
      setAlert(true);
      setInterval(() => {
        setAlert(false);
      }, 4000);
    }

  }, [deleteID, adminRefetch, deleteIsSuccess]);

  //open reset password dialog
  const openResetPassword = (id = 0, name = "") => {
    setOpenDialog((prev) => !prev);
    setResetID([id, name]);
  };

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
              Admin list
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Link to="/admin/add">
              <Button className="flex items-center gap-3" size="sm">
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" />
                Add New Admin
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
            {admin?.map(({ id, name, email, admin_role }, index) => {
              const isLast = index === admin.length - 1;
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
                      {index === null
                        ? "N/A"
                        : (currentPage - 1) * 10 + (index + 1)}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {name === null ? "N/A" : name}
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
                      {email}
                    </Typography>
                  </td>

                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {admin_role?.name === null ? "N/A" : admin_role?.name.charAt(0).toUpperCase() + admin_role?.name.slice(1)}
                    </Typography>
                  </td>

                  <td
                    className={`${classes} text-center flex justify-center items-center`}
                  >
                    <ButtonGroup size="sm" variant="outlined">
                      <Button onClick={() => navigate(`/admin/detail/${id}`)}>
                        View
                      </Button>
                      <Button onClick={() => navigate(`/admin/edit/${id}`)}>
                        Edit
                      </Button>
                      <Button onClick={()=>deleteOnClick(id)}>
                        Delete
                      </Button>
                      <Button onClick={() => openResetPassword(id, name)}>
                        reset password
                      </Button>
                    </ButtonGroup>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 pb-0 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page {currentPage} of {totalPage}
        </Typography>
        <div className="flex gap-2">
          <Button
            onClick={
              links && links.prev !== null
                ? () => handleRefetchAdmin(links.prev)
                : () => {}
            }
            variant="outlined"
            size="sm"
            disabled={links && links.prev === null}
          >
            Previous
          </Button>
          <Button
            onClick={
              links && links.next !== null
                ? () => handleRefetchAdmin(links.next)
                : () => {}
            }
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
        
      {alert == true && (
        <Alert
          variant="outlined"
          className="w-[300px] absolute left-0 bottom-0 ml-3 bg-white font-medium text-black"
          animate={{
            mount: { x: 0, opacity: 1 },
            unmount: { x: "-100%", opacity: 0 },
          }}
        >
          <span>{alertMessage ? alertMessage : ""}</span>
        </Alert>
      )}

      <ResetPasswordForm
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

export default AdminList;
