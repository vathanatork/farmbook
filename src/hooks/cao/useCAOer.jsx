import { useQuery } from 'react-query'
import { axiosClient } from '../../utils/axiosClient'
import { axiosNoBaseURL } from '../../utils/axiosNoBaseURl'

import { BaseURL } from '../../utils/BaseURL'
export const useListPendingCAO = (URL) =>{
    return useQuery(
      'pending-CAO',
      ()=>axiosNoBaseURL(URL),
      {
        refetchOnWindowFocus : false,
      }
    )
}

export const useApproved = (id,onSuccessApprove) => {
  return useQuery(
    'CAO-pending-approved',
    ()=>axiosClient({
    url:`/cao-user/approve/${id}`,
    method:'PUT'
    }),
    {
      refetchOnMount : false,
      refetchOnWindowFocus : false,
      onSuccess:onSuccessApprove,
      enabled: false
    })
}

export const useCAO = (URL) =>{
  return useQuery(
    'CAO-List',
    ()=>axiosNoBaseURL(URL)
  )
}

export const useCAODelete = (URL) =>{
  return useQuery(
    'CAO-Delete',
    ()=>axiosClient({
      method: 'delete',
      url: URL,
    }),
    {
      cacheTime : 0,
      staleTime : 0,
      refetchOnMount : false,
      refetchOnWindowFocus : false,
      enabled: false ,
    }
  )
}

export const useCAODetail = (URL) =>{
  return useQuery(
    'CAO-Detail',
    () => axiosClient(URL),
    {
      refetchOnMount : true,
      refetchOnWindowFocus : false,
    }
  )
}


export const useResetPassword = (URL,data) => {
  return useQuery(
    'CAO-Delete',
    ()=>axiosClient({
      method: 'PUT',
      url: URL,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'Content-Type: application/json', 
      },
      data: data,
    }),
    {
      enabled: false ,
    }
  )
}

export const postData = async(data) => {
  return axiosNoBaseURL({
      method:'post',
      url: `${BaseURL}/cao-user`,
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'Content-Type: application/json', // Correct content type for form data
        },
      data: data,
  });
}

export const useCAOAdd = (data) => {
  return useQuery(
    'Add_Cao',
    () => postData(data),
    {
        cacheTime : 50000,
        staleTime : 50000,
        refetchOnMount : false,
        refetchOnWindowFocus : false,
        enabled: false
    }
  )
} 


export const putData = async(id,data) => {
  return axiosNoBaseURL({
      method:'put',
      url: `${BaseURL}/cao-user/${id}`,
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'Content-Type: application/json', 
        },
      data: data,
  });
}

export const useCAOEdit = (id,data) => {
  return useQuery(
    'Add_Edit',
    () => putData(id,data),
    {
        cacheTime : 50000,
        staleTime : 50000,
        refetchOnMount : false,
        refetchOnWindowFocus : false,
        enabled: false
    }
  )
}

export const useCAOUpdateStatus = (id,data) => {
  return useQuery(
    'CAO-update-status',
    ()=>axiosClient({
    url:`/cao-user/status/${id}`,
    method:'PUT',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'Content-Type: application/json',
    },
    data:{
      'is_active': data
    }
    }),
    {
      cacheTime : 0,
      staleTime : 0,
      refetchOnMount : false,
      refetchOnWindowFocus : false,
      enabled: false
    })
}