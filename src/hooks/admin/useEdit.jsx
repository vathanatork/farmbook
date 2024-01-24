import { useQuery } from 'react-query'
import { axiosClient } from '../../utils/axiosClient'
import { axiosNoBaseURL } from '../../utils/axiosNoBaseURl'
import { BaseURL } from '../../utils/BaseURL'



export const useAdminView = (id) =>{
    return useQuery(
        'adminView',
        ()=>axiosClient(`/admin-user/${id}`),
        {
            refetchOnWindowFocus : false, 
        }

    )
}

export const postData = async(data,id) => {
    return axiosNoBaseURL({
        method: 'put',
        url: `${BaseURL}/admin-user/${id}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'Content-Type: application/json', 
          },
        data: data,
    });
  }

export const useAdminEdit = (data,id) => {
    return useQuery(
      'adminEdit', 
      ()=>postData(data,id),
      {
          cacheTime : 50000,
          staleTime : 50000,
          refetchOnMount : false,
          refetchOnWindowFocus : false,
          //refetchInterval : 2000, continues refecting every 2 seconds
          //refetchIntervalBackground: true, continues refecting every 2 seconds even window lose fucus,
          // onSuccess,
          // onError,
          //select: (data) =>{return data?.data},
          enabled: false , //don't fetch when component is mounted
      }
  )
  }