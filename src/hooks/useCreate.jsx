import { useQuery } from 'react-query'
import { axiosClient } from '../utils/axiosClient'
import { axiosNoBaseURL } from '../utils/axiosNoBaseURl'
import { BaseURL } from '../utils/BaseURL'

export const useRoleList = (url) =>{
    return useQuery(
      'Listing-admin-role',
      ()=>axiosClient(url),
      {
        refetchOnWindowFocus : false,
      }
      
    )
}

export const useProvince = (url) =>{
  return useQuery(
    'Listing-province',
    ()=>axiosClient(url),
    {
      refetchOnWindowFocus : false,
    }
    
  )
}

export const useDistrict = (url, enable = false) =>{
  return useQuery(
    'Listing-district',
    ()=>axiosClient(url),
    {
      refetchOnWindowFocus : false,
      enabled: enable
    }
    
  )
}

export const useCommune = (url, enable = false) =>{
  return useQuery(
    'Listing-commune',
    ()=>axiosClient(url),
    {
      refetchOnWindowFocus : false,
      enabled: enable
    }
    
  )
}

export const useVillage = (url, enable=false) =>{
  return useQuery(
    'Listing-village',
    ()=>axiosClient(url),
    {
      refetchOnWindowFocus : false,
      enabled: enable
    }
    
  )
}


export const postData = async(data) => {
  return axiosNoBaseURL({
      method: 'post',
      url: `${BaseURL}/admin-user`,
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'Content-Type: application/json', // Correct content type for form data
        },
      data: data,
  });
}

export const useAdminCreate = (data) => {
  return useQuery(
    'adminCreate', 
    ()=>postData(data),
    {
        cacheTime : 50000,
        staleTime : 50000,
        refetchOnMount : false,
        refetchOnWindowFocus : false,
        enabled: false ,
    }
)
}
