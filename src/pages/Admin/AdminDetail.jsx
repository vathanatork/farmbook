import { Link ,useParams} from "react-router-dom";
import { UserPlusIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { useAdminDetail } from "../../hooks/useAdmin";

import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Select,
  Option,
  Radio,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";


const AdminDetail = () => {
    const [admin,setAdmin] = useState();
    const { id } = useParams();

    const {data,isSuccess} = useAdminDetail(`/admin-user/${id}`);

    useEffect(()=>{
        if(isSuccess){
            setAdmin(data?.data?.data.raw)
        }
    },[isSuccess,data])
    
    return (
    <Card className="h-full w-full pb-5" shadow={false} >
      {/* start card header */}
      <CardHeader
        // ref={cardHeader}
        floated={false}
        shadow={false}
        className="rounded-none p-0 mx-0"
      >
        <div className="mb-4 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="black">
              CAO Detail
            </Typography>
            </div>
        </div>
      </CardHeader>
      {/* card body */}
      <CardBody className="m-0 p-0">
        <div className="w-full flex flex-col md:flex-row gap-6 justify-around">
            <CardBody className="w-full flex flex-col gap-2 rounded-xl border shadow-md ">
                <Typography variant="h5" color='black' className="mb-2"> 
                    Persional Info
                </Typography>
                <div className="flex justify-between">
                    <Typography>
                        Name
                    </Typography>
                    <Typography>
                        {admin?.name}
                    </Typography>
                </div>
                <div className="flex justify-between">
                    <Typography>
                        Email
                    </Typography>
                    <Typography>
                        {admin?.email}
                    </Typography>
                </div>
                <div className="flex justify-between">
                    <Typography>
                        Role
                    </Typography>
                    <Typography>
                        {admin?.admin_role.name}
                    </Typography>
                </div>
                <div className="flex justify-between">
                    <Typography>
                        Role status
                    </Typography>
                    <Typography>
                        {admin?.admin_role.is_active ? "Active" : "Disabled"}
                    </Typography>
                </div>
                <div className="flex justify-between">
                    <Typography>
                        Create at
                    </Typography>
                    <Typography>
                        {admin?.created_at}
                    </Typography>
                </div>
            </CardBody>
            <div className="w-full flex flex-col gap-6">
                <CardBody className="w-full flex flex-col gap-2 rounded-xl border shadow-md ">
                    <Typography variant="h5" color='black' className="mb-2"> 
                        Work Place
                    </Typography>
                    <div className="flex justify-between">
                        <Typography>
                            Province
                        </Typography>
                        <Typography>
                            {admin?.province_name}
                        </Typography>
                    </div>
                    <div className="flex justify-between">
                        <Typography>
                            District
                        </Typography>
                        <Typography>
                            {admin?.district_name}
                        </Typography>
                    </div>
                    <div className="flex justify-between">
                        <Typography>
                            Commune
                        </Typography>
                        <Typography>
                            {admin?.commune_name}
                        </Typography>
                    </div>
                    <div className="flex justify-between">
                        <Typography>
                            Village
                        </Typography>
                        <Typography>
                            {admin?.village_name}
                        </Typography>
                    </div>
                </CardBody>
                <CardBody className="w-full flex flex-col gap-2 rounded-xl border shadow-md">
                    <Typography variant="h5" color='black' className="mb-2"> 
                        Status
                    </Typography>
                    <div className="flex justify-between">
                        <Typography>
                            Account Status
                        </Typography>
                        <Typography>
                            Active
                        </Typography>
                    </div>
                    <div className="flex justify-between">
                        <Typography>
                            Approved At
                        </Typography>
                        <Typography>
                            N/A
                        </Typography>
                    </div>
                    <div className="flex justify-between">
                        <Typography>
                            Approve Type
                        </Typography>
                        <Typography>
                            N/A
                        </Typography>
                    </div>
                </CardBody>
            </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default AdminDetail