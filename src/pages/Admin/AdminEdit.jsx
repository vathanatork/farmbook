import { UserPlusIcon} from "@heroicons/react/24/solid";
import { useForm, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect, useState } from "react";
import { CmSelect } from "../../components/reuse/form/CmSelect";
import { Error } from "../../components/reuse/validate/Error";
import { useParams ,useNavigate} from 'react-router-dom'
import { CMBackAlert } from "../../components/reuse/form/CMBackAlert";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Alert
} from "@material-tailwind/react";

import {
  useVillage,
  useCommune,
  useDistrict,
  useProvince,
  useRoleList,
  useAdminCreate,
} from "../../hooks/useCreate";
import { useAdminEdit, useAdminView } from "../../hooks/admin/useEdit";

const AdminEdit = () => {
  const navigate = useNavigate();
  const [_loadData,setLoadData] = useState();
  const [role, setRole] = useState([]);
  const [province, setProvice] = useState([]);
  const [district, setDistrict] = useState([]);
  const [commune, setCommune] = useState([]);
  const [village, setVillage] = useState([]);
  const [provinceID, setProvinceId] = useState();
  const [districtID, setDistrictId] = useState();
  const [communeID, setCommuneId] = useState();
  const [formData, setFormData] = useState();
  const [errorMessage, setErrorMessage] = useState([]);
  const [open,setOpen] = useState(false);
  const {id} = useParams();

  const form = useForm();
  const { register, control, handleSubmit, reset } = form;

  //handle submit
  const { data:editData , isSuccess:editIsSuccess, refetch: editRefetch } = useAdminEdit(formData,id);

  const onSubmit = (data) => {
    const filteredFormData = Object.fromEntries(
        Object.entries(data).filter(([key, value]) => value !== "")
    );
    setFormData(filteredFormData);
  };

  useEffect(() => {
    if (formData !== null) {
      editRefetch();
    }
  }, [editRefetch, formData]);

  useEffect(()=>{
    if(editData?.data?.message) {
      setErrorMessage(editData.data.message);
    }

    if(editData?.data?.code == 200 && formData){
      reset();
      setFormData();
      setOpen(true);
    }

    return () =>{
      clearInterval();
    } 
  },[editIsSuccess,editData])

  // Load data for edit
  const {data:loadData,isSuccess:loadIsSuccess} = useAdminView(id);
  useEffect(()=>{
    if(loadData){
        setLoadData(loadData.data.data.raw);
        console.log(loadData.data.data.raw);
    }
  },[loadData,loadIsSuccess]);

  //list role
  const { data: roleData, isSuccess: roleIsSuccess } = useRoleList(
    "/admin-user/roleLists"
  );

  useEffect(() => {
    if (roleIsSuccess) {
      setRole(roleData.data.data.adminRoles);
    }
  }, [roleData, roleIsSuccess]);

  //list province
  const { data: provinceData, isSuccess: provinceIsSuccess } =
    useProvince("/adr/province");
  useEffect(() => {
    if (provinceIsSuccess) {
      setProvice(provinceData.data.data.provinces);
    }
  }, [provinceData, provinceIsSuccess]);

  //list district
  const {
    data: districtdata,
    isSuccess: districtIsSuccess,
    refetch: districtRefetch,
  } = useDistrict(`/adr/district/${provinceID}`);
  useEffect(() => {
    districtRefetch();
  }, [districtRefetch, provinceID]);
  useEffect(() => {
    if (districtIsSuccess) {
      setDistrict(districtdata.data.data.districts);
    }
  }, [districtIsSuccess, districtdata]);

  //list commune
  const {
    data: communedata,
    isSuccess: communeIsSuccess,
    refetch: communeRefetch,
  } = useCommune(`/adr/commune/${districtID}`);
  useEffect(() => {
    communeRefetch();
  }, [communeRefetch, districtID]);
  useEffect(() => {
    if (communeIsSuccess) {
      setCommune(communedata.data.data.communes);
    }
  }, [communeIsSuccess, communedata]);
  // //list village
  const {
    data: villagedata,
    isSuccess: villageIsSuccess,
    refetch: villageRefetch,
  } = useVillage(`/adr/village/${communeID}`);
  useEffect(() => {
    villageRefetch();
  }, [villageRefetch, communeID]);
  useEffect(() => {
    if (villageIsSuccess) {
      setVillage(villagedata?.data?.data?.villages);
    }
  }, [villageIsSuccess, villagedata]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="h-full w-full ">
        {/* start card header */}
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                EDIT ADMIN
              </Typography>
            </div>
          </div>
        </CardHeader>

        <CardBody>
          <div className="w-full flex gap-6 justify-around">
            <div className="w-full flex flex-col gap-4 max-w-96">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-2 font-medium"
              >
                Name
              </Typography>
              <div>
                <Input label={_loadData?.name} {...register("name")} />
                <Error error={errorMessage?.name ? errorMessage.name : ''} />
              </div>

              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-2 font-medium"
              >
                Email
              </Typography>
              <div>
                <Input
                  type="email"
                  label={_loadData?.email}
                  {...register("email")}
                />
                <Error error={errorMessage?.email ? errorMessage.email : ''} />
              </div>

              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-2 font-medium"
              >
                Role
              </Typography>

              <div>
                <Controller
                  name="role_id"
                  control={control}
                  render={({ field }) => (
                    <CmSelect
                      field={field}
                      label="Role Name"
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      options={role}
                      defaultValue={field.value}
                    />
                  )}
                />
                <Error error={errorMessage?.role_id ? 'The role name is Required' : ''} />
              </div>

            </div>

            <div className="w-full flex flex-col gap-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-2 font-medium"
              >
                Address
              </Typography>

              <div>
                <Controller
                  name="adr_province_id"
                  control={control}
                  render={({ field }) => (
                    <CmSelect
                      field={field}
                      onChange={(e) => {
                        field.onChange(e);
                        setProvinceId(e.target.value);
                      }}
                      label="Province Name"
                      options={province}
                      defaultValue={field.value}
                    />
                  )}
                />
                <Error error={errorMessage?.adr_province_id ? 'The province name is Required' : ''} />
              </div>     

              <div>
                <Controller
                  name="adr_district_id"
                  control={control}
                  render={({ field }) => (
                    <CmSelect
                      field={field}
                      onChange={(e) => {
                        field.onChange(e);
                        setDistrictId(e.target.value);
                      }}
                      label="district Name"
                      options={district}
                      defaultValue={field.value}
                    />
                  )}
                />
                <Error error={errorMessage?.adr_district_id ? 'The district name is Required' : ''} />
              </div>
              
              <div>
                <Controller
                  name="adr_commune_id"
                  control={control}
                  render={({ field }) => (
                    <CmSelect
                      field={field}
                      onChange={(e) => {
                        field.onChange(e);
                        setCommuneId(e.target.value);
                      }}
                      label="Commune Name"
                      options={commune}
                      defaultValue={field.value}
                    />
                  )}
                />
                <Error error={errorMessage?.adr_commune_id ? 'The commune name is Required' : ''} />
              </div>
              
              <div>
                <Controller
                  name="adr_village_id"
                  control={control}
                  render={({ field }) => (
                    <CmSelect
                      field={field}
                      label="Village Name"
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      options={village}
                      defaultValue={field.value}
                    />
                  )}
                />
                <Error error={errorMessage?.adr_village_id ? 'The village name is Required' : ''} />
              </div>
              
            </div>
          </div>
          <div className="flex mt-6">
              <Button
                type="submit"
                className="flex items-center gap-3"
                size="sm"
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" />Submit
              </Button>
          </div>
        </CardBody>
      
        <CMBackAlert open={open} location="/admin"/>
      </Card>
    </form>
  );
};

export default AdminEdit;
