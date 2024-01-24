import { useQuery } from 'react-query'
import { axiosClient } from '../../utils/axiosClient'


export const useImportExcel = (data) => {
    return useQuery(
        'CAO-import-excel',
        ()=>axiosClient({
        url:`/cao-user/import-excel`,
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
        },
        data:data
        }),
        {
          refetchOnMount : false,
          refetchOnWindowFocus : false,
          enabled: false
        })
}
