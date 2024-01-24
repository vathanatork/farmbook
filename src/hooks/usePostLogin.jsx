import { useQuery } from 'react-query'
import  axios  from 'axios'
import { BaseURL } from '../utils/BaseURL'

export const fetchdata = async(email,password) => {
    return axios({
        method: 'post',
        url: `${BaseURL}/auth/login`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded', // Correct content type for form data
          },
        data: {
        email: email,  
        password: password,
        },
    });
}

export const usePostLogin = (email,password,onSuccess,onError) => {
    return useQuery(
        'User-login', 
        ()=>fetchdata(email, password),
        {
            cacheTime : 50000,
            staleTime : 50000,
            refetchOnMount : false,
            refetchOnWindowFocus : false,
            //refetchInterval : 2000, continues refecting every 2 seconds
            //refetchIntervalBackground: true, continues refecting every 2 seconds even window lose fucus,
            onSuccess,
            onError,
            //select: (data) =>{return data?.data},
            enabled: false , //don't fetch when component is mounted
        }
    )
   
}