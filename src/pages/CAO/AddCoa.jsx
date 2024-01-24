import { UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Radio,
  Checkbox,
} from "@material-tailwind/react";

import { validateRules } from "../../validation/rule/validateRules";
import { useForm, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect, useState } from "react";
import { CmSelect } from "../../components/reuse/form/CmSelect";
import { Error } from "../../components/reuse/validate/Error";
import { CMAlert } from "../../components/reuse/form/CMAlert";

import {
  useVillage,
  useCommune,
  useDistrict,
  useProvince,
} from "../../hooks/useCreate";

import { useCAOAdd } from "../../hooks/cao/useCAOer";
import { useFormartFormData } from "../../hooks/cao/useFormartFormData";
import { useBase64Image } from "../../hooks/uploadImage/useBase64Image";
import { CaoUserStatus } from "../../constants/cao/CaoUserStatus";

const AddCoa = () => {

  const [province, setProvice] = useState([]);
  const [district, setDistrict] = useState([]);
  const [commune, setCommune] = useState([]);
  const [village, setVillage] = useState([]);
  const [provinceID, setProvinceId] = useState();
  const [districtID, setDistrictId] = useState();
  const [communeID, setCommuneId] = useState();
  const [formData, setFormData] = useState();
  const [errorMessage, setErrorMessage] = useState([]);
  const [open, setOpen] = useState(false);
  const [imageBase64, setImageBase64] = useState("");

  const form = useForm({
    defaultValues:{
      name: '',
      email: '',
      first_name: '',
      last_name: '',
      phone_number: '',
      birthday: '',
      id_number: '',
      address: null,
      status: CaoUserStatus.APPROVED,
      is_active: false,
      approve_at: null,
      approve_type: null,
      approve_step: null,
      password: '1234',
      level_id: null,
      adr_province_id: '',
      adr_district_id: '',
      adr_commune_id: '',
      adr_village_id: '',
      nid_file: null,
      gender: 'male',
    }
  });
  console.log(validateRules?.phone_number)
  const { register, control, handleSubmit, reset ,formState: { errors },setValue} = form;
  //success
  const handler = () =>{
    setOpen((prev) => { return !prev});
  }

  //handle submit
  const {
    data: createData,
    isSuccess: createIsSuccess,
    refetch: createRefetch,
  } = useCAOAdd(formData);

  const onSubmit = (data) => {
    const formartedData = useFormartFormData(data, imageBase64);
    setFormData(formartedData);
  };

  useEffect(() => {
    if (formData) {
      createRefetch();
    }
  }, [createRefetch, formData]);

  useEffect(() => {
    if (createData?.data?.message) {
      setErrorMessage(createData.data.message);
    }
    if (createData?.data?.code == 200 && formData) {
      reset();
      setFormData();
      setOpen(true);  
    }
  }, [createIsSuccess, formData, createData]);

  //list province
  const { data: provinceData, isSuccess: provinceIsSuccess } = useProvince("/adr/province");

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
    setValue('adr_district_id', '');
    setValue('adr_commune_id', '');
    setValue('adr_village_id', '');
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
    setValue('adr_commune_id', '');
    setValue('adr_village_id', '');
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
    setValue('adr_village_id', '');
    villageRefetch();
  }, [villageRefetch, communeID]);

  useEffect(() => {
    if (villageIsSuccess) {
      setVillage(villagedata?.data?.data?.villages);
    }
  }, [villageIsSuccess, villagedata]);

  //handle upload image
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await useBase64Image(file);
    setImageBase64(base64);
  };

  return (
    <Card className="h-full w-full ">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* start card header */}
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                CREATE NEW CAO
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
                First Name
              </Typography>
              <div>
                <Input
                  label="First Name"
                  required
                  {...register("first_name")}
                />
                <Error
                  error={
                    errorMessage?.first_name ? errorMessage.first_name : ""
                  }
                />
              </div>

              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-2 font-medium"
              >
                Last Name
              </Typography>
              <div>
                <Input label="Last Name" required {...register("last_name")} />
                <Error
                  error={errorMessage?.last_name ? errorMessage.last_name : ""}
                />
              </div>

              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-2 font-medium"
              >
                Phone Number
              </Typography>
              <div>
                <Input
                  type="number"
                  label="Phone Number"
                  required
                  maxLength={10}
                  {...register("phone_number",{
                    pattern: {
                      value: validateRules.phone_number,
                      message: 'invalid phone number',
                    },
                  })}
                />
                <Error
                  error={
                    errorMessage?.phone_number ? errorMessage.phone_number : errors?.phone_number?.message 
                  }
                />
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
                  label="Email"
                  required
                  {...register("email")}
                />
                <Error error={errorMessage?.email ? errorMessage.email : ""} />
              </div>

              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-2 font-medium"
              >
                Password
              </Typography>
              <div>
                <Input
                  type="password"
                  label="Password"
                  required
                  {...register("password")}
                />
                <Error
                  error={errorMessage?.password ? errorMessage.password : ""}
                />
              </div>
            </div>

            <div className="w-full flex flex-col gap-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-2 font-medium"
              >
                Photo
              </Typography>
              <div>
                <Input
                  type="file"
                  required
                  onChange={(e) => {
                    uploadImage(e);
                  }}
                />
                <Error
                  error={errorMessage?.nid_url ? errorMessage.nid_url : ""}
                />
              </div>

              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-2 font-medium"
              >
                ID Card
              </Typography>
              <div>
                <Input
                  type="number"
                  label="ID Card"
                  maxLength={9}
                  required
                  {...register("id_number",{
                    pattern: {
                      value: validateRules.id_card,
                      message: 'invalid id card',
                    },
                  })}
                />
                <Error
                  error={errorMessage?.id_number ? errorMessage.id_number : errors?.id_number?.message}
                />
              </div>

              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-2 font-medium"
              >
                Date of Birth
              </Typography>
              <div>
                <Input
                  type="date"
                  label="Date of Birth"
                  required
                  {...register("birthday")}
                />
                <Error
                  error={errorMessage?.birthday ? errorMessage.birthday : ""}
                />
              </div>

              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-2 font-medium"
              >
                Work Place
              </Typography>
              <div className="flex gap-1 ">
                <div>
                  <Controller
                    name="adr_province_id"
                    control={control}
                    defaultValue=""
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
                    rules={{ validate: value => /^\d+$/.test(value) }}
                  />
                  <Error
                    error={
                      errors.adr_province_id
                        ? "The province name is Required"
                        : ""
                    }
                  />
                </div>

                <div>
                  <Controller
                    name="adr_district_id"
                    control={control}
                    defaultValue=""
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
                    rules={{ validate: value => /^\d+$/.test(value) }}
                  />
                  <Error
                    error={
                      errors.adr_district_id
                        ? "The district name is Required"
                        : ""
                    }
                  />
                </div>

                <div>
                  <Controller
                    name="adr_commune_id"
                    control={control}
                    defaultValue=""
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
                    rules={{ validate: value => /^\d+$/.test(value) }}
                  />
                  <Error
                    error={
                      errors.adr_commune_id
                        ? "The commune name is Required"
                        : ""
                    }
                  />
                </div>

                <div>
                  <Controller
                    name="adr_village_id"
                    control={control}
                    defaultValue=""
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
                    rules={{ validate: value => /^\d+$/.test(value) }}
                  />
                  <Error
                    error={
                      errors.adr_village_id
                        ? "The village name is Required"
                        : ""
                    }
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col gap-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="-mb-2 font-medium"
                  >
                    Address
                  </Typography>
                  <Input label="Address" {...register("address")} />
                </div>
                {/* <div className="flex flex-col gap-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="-mb-2 font-medium"
                  >
                    Status
                  </Typography>
                  <div className="flex gap-4">
                    <Radio
                      name="status"
                      color="green"
                      label="Pending"
                      value={CaoUserStatus.PENDING}
                      ripple={true}
                      {...register("status")}
                    />
                    <Radio
                      name="status"
                      color="green"
                      label="Approve"
                      value={CaoUserStatus.APPROVED}
                      ripple={false}
                      {...register("status")}
                    />
                  </div>
                </div> */}

                <div className="flex flex-col gap-4 ml-5">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="-mb-2 font-medium"
                  >
                    Gender <span className="text-red-500">*</span>
                  </Typography>
                  <div className="flex gap-4">
                    <Radio
                      name="gender"
                      color="blue"
                      label="Male"
                      value="Male"
                      ripple={true}
                      required
                      {...register("gender")}
                    />
                    <Radio
                      name="gender"
                      color="blue"
                      label="Female"
                      value="Female"
                      ripple={false}
                      required
                      {...register("gender")}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4 ml-5">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="-mb-2 font-medium"
                  >
                    Active
                  </Typography>
                  <Checkbox
                    defaultChecked={false}
                    name="is_active"
                    color="blue"
                    label="Active"
                    value="true"
                    ripple={true}
                    {...register("is_active")}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 ">
            <Button
              type="submit"
              className="flex items-center gap-3"
              size="sm"
            >
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Submit
            </Button>
          </div>

        </CardBody>    

        {/* <DevTool control={control}/> */}
      </form>

      <CMAlert open={open} handler={handler} location="/cao"/>
    </Card>
  );
};

export default AddCoa;
