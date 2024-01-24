import { useQuery } from 'react-query'
import { axiosClient } from '../../utils/axiosClient'


export const useCurrentInfo = () => {
    return useQuery(
        'admin Current Information',
        ()=>axiosClient(`/info`),
        {
            refetchOnWindowFocus : false, 
        }
    )
}
