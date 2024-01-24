import React, { useEffect ,useState} from "react";
import { useCurrentInfo } from "../hooks/admin/useCurrentInfo";

import {
  Card,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

const DetailProfile = () => {

  const [admin,setAdmin] = useState();
  const {data,isSuccess} = useCurrentInfo();

  useEffect(()=>{
    if (isSuccess ){
      setAdmin(data.data.data.admin);
    }
  },[isSuccess,data])
  
  return (
    <>
      <Card className="p-3 rounded-none shadow-sm drop-shadow-none border-2	">
        <CardBody className="flex flex-col gap-4">
            <div className="flex justify-between">
                <Typography variant="h5" className="text-gray-900 py-2">
                    Profile
                </Typography>
                <Button color='blue' size='sm'>កែប្រែ</Button>
            </div>
            <hr className="my-2 border-blue-gray-100" />

          <div className="flex justify-between">
            <Typography>Name</Typography>
            <Typography className="text-gray-900">{admin?.name == null ? "N/A" : admin?.name}</Typography>
          </div>

          <div className="flex justify-between">
            <Typography>Email</Typography>
            <Typography className="text-gray-900">{admin?.email == null ? "N/A" : admin?.email}</Typography>
          </div>

          <div className="flex justify-between">
            <Typography>Province</Typography>
            <Typography className="text-gray-900">{admin?.province_name == null ? "N/A" : admin?.province_name}</Typography>
          </div>

          <div className="flex justify-between">
            <Typography>District</Typography>
            <Typography className="text-gray-900">
              {admin?.district_name == null ? "N/A" : admin?.district_name}
            </Typography>
          </div>

          <div className="flex justify-between">
            <Typography>Commune</Typography>
            <Typography className="text-gray-900">{admin?.commune_name == null ? "N/A" : admin?.commune_name}</Typography>
          </div>

          <div className="flex justify-between">
            <Typography>Village</Typography>
            <Typography className="text-gray-900">
              {admin?.village_name == null ? "N/A" : admin?.village_name}
            </Typography>
          </div>

          <div className="flex justify-between">
            <Typography>Role</Typography>
            <Typography className="text-gray-900">
              {admin?.admin_role?.name == null ? "N/A" : admin?.admin_role?.name}
            </Typography>
          </div>
          
        </CardBody>
      </Card>
    </>
  );
};

export default DetailProfile;
