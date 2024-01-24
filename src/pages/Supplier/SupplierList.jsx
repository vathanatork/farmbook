import React, { useRef, useState, useEffect} from "react";
import {Link, useNavigate } from "react-router-dom";

import {UserPlusIcon} from "@heroicons/react/24/solid";
import { BaseURL } from "../../utils/BaseURL";
import { useAdminDelete, useListAdmin } from "../../hooks/useAdmin";
import { ResetPasswordForm } from "../../components/ui/form/ResetPasswordForm";
import image from "/src/assets/images/user.jpg";

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

const TABLE_HEAD = ["ID","Image","business Name","phone Number","address", "Action"];

const SupplierList = () => {
    const navigate = useNavigate();
    const cardHeader = useRef(null);
    const [cardHeaderHeight, setCardHeaderHeight] = useState();
    const [supplier,setSupplier] = useState(null);

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
              Supplier list
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Link to="/admin/add">
              <Button className="flex items-center gap-3" size="sm">
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" />
                Add New Supplier
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
            {supplier?.map(({ id,profile_url,business_name, phone_number,address }, index) => {
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
                        <Avatar
                          variant="rounded"
                          icon={profile_url === null ? <UserIcon/> : null}
                          src={profile_url !== null ? profile_url : image}
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
                            {business_name === null ? "N/A" : business_name}
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
                        {phone_number === null ? "N/A" : phone_number}
                        </Typography>
                    </td>

                    <td className={classes}>
                        <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        >
                        {address === null ? "N/A" : address}
                        </Typography>
                    </td>

                    <td
                        className={`${classes} text-center flex justify-center items-center`}
                    >
                        <ButtonGroup size="sm" variant="outlined">
                        <Button>
                            View
                        </Button>
                        <Button>
                            Edit
                        </Button>
                        <Button >
                            Delete
                        </Button>
                        <Button>
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
          Page 
        </Typography>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            size="sm"
          >
            Previous
          </Button>
          <Button   
            variant="outlined"
            size="sm"
          >
            Next
          </Button>
        </div>
      </CardFooter>     
    </Card>
  )
}

export default SupplierList