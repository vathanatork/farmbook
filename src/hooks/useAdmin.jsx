import { useQuery } from 'react-query'
import { axiosClient } from '../utils/axiosClient'
import { axiosNoBaseURL } from '../utils/axiosNoBaseURl'

export const useListAdmin = (URL) =>{
    return useQuery(
      'Listing-admin',
      ()=>axiosNoBaseURL(URL),
      {
        refetchOnWindowFocus : false,
      }
      
    )
}

export const useAdminDetail = (url) => {
  return useQuery(
    'adminDetail',
     ()=>axiosClient(url),
     {
        refetchOnMount : true,
     }
  )
  
}

export const useAdminDelete = (url) => {
  return useQuery(
      'adminDelete',
        ()=>axiosClient({
          method: 'delete',
          url: url,
        }),
        {
          cacheTime:0,
          staleTime:0,
          enabled: false ,
        }
      )
}


