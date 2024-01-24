import { useParams} from "react-router-dom";
import { useCAODetail } from "../../hooks/cao/useCAOer";
import { useState,useEffect } from "react";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
} from "@material-tailwind/react";

const CaoDetail = () => {
    const {id} = useParams();
    const [cao,setCao] = useState();

    const {data,isSuccess} = useCAODetail(`/cao-user/${id}`);

    useEffect(()=>{
        if(isSuccess){
            setCao(data?.data?.data.raw)
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

                    {/* colunm one */}
                    <CardBody className="w-full flex flex-col gap-2 rounded-xl border shadow-md ">
                        <Typography variant="h5" color='black' className="mb-2"> 
                            Persional Info
                        </Typography>

                        <div className="flex justify-between">
                            <Typography>
                                Fist Name
                            </Typography>
                            <Typography>
                                {cao?.first_name === null ? "N/A" : cao?.first_name}
                            </Typography>
                        </div>

                        <div className="flex justify-between">
                            <Typography>
                                Last Name
                            </Typography>
                            <Typography>
                                {cao?.last_name === null ? "null" : cao?.last_name}
                            </Typography>
                        </div>

                        <div className="flex justify-between">
                            <Typography>
                                Date of Birth
                            </Typography>
                            <Typography>
                                {cao?.birthday === null ? "N/A" : cao?.birthday}
                            </Typography>
                        </div>

                        <div className="flex justify-between">
                            <Typography>
                                ID Number
                            </Typography>
                            <Typography>
                                {cao?.id_number === null ? "N/A" : cao?.id_number}
                            </Typography>
                        </div>

                        <div className="flex justify-between">
                            <Typography>
                                Phone Number
                            </Typography>
                            <Typography>
                                {cao?.phone_number === null ? "null" : cao?.phone_number}
                            </Typography>
                        </div>

                        <div className="flex justify-between">
                            <Typography>
                                Email
                            </Typography>
                            <Typography>
                                {cao?.email === null ? "N/A" : cao?.email}
                            </Typography>
                        </div>

                        <div className="flex justify-between">
                            <Typography>
                                Level ID
                            </Typography>
                            <Typography>
                                {cao?.level_id === null ? "N/A" : cao?.level_id}
                            </Typography>
                        </div>
                    </CardBody>

                    <div className="w-full flex flex-col gap-6">
                         {/* colunm two */}
                        <CardBody className="w-full flex flex-col gap-2 rounded-xl border shadow-md ">
                            <Typography variant="h5" color='black' className="mb-2"> 
                                Work Place
                            </Typography>

                            <div className="flex justify-between">
                                <Typography>
                                    Province
                                </Typography>
                                <Typography>
                                    {cao?.detail.province.name === null ? "N/A" : cao?.detail.province.name}
                                </Typography>
                            </div>

                            <div className="flex justify-between">
                                <Typography>
                                    District
                                </Typography>
                                <Typography>
                                    {cao?.detail.district.name === null ? "N/A" : cao?.detail.district.name}
                                </Typography>
                            </div>

                            <div className="flex justify-between">
                                <Typography>
                                    Commune
                                </Typography>
                                <Typography>
                                    {cao?.detail.commune.name === null ? "N/A" : cao?.detail.commune.name}
                                </Typography>
                            </div>

                            <div className="flex justify-between">
                                <Typography>
                                    Village
                                </Typography>
                                <Typography>
                                    {cao?.detail.village.name === null ? "N/A" : cao?.detail.village.name}
                                </Typography>
                            </div>

                        </CardBody>

                        {/* colunm three */}
                        <CardBody className="w-full flex flex-col gap-2 rounded-xl border shadow-md">
                            <Typography variant="h5" color='black' className="mb-2"> 
                                Status
                            </Typography>

                            <div className="flex justify-between">
                                <Typography>
                                    Account Status
                                </Typography>
                                <Typography>
                                    {cao?.status === null ? "N/A" : cao?.status}
                                </Typography>
                            </div>

                            <div className="flex justify-between">
                                <Typography>
                                    Approved At
                                </Typography>
                                <Typography>
                                    {cao?.approve_at === null ? "N/A" : cao?.approve_at}
                                </Typography>
                            </div>

                            <div className="flex justify-between">
                                <Typography>
                                    Approve Type
                                </Typography>
                                <Typography>
                                    {cao?.approve_type === null ? "N/A" : cao?.approve_type}
                                </Typography>
                            </div>

                        </CardBody>

                        
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export default CaoDetail