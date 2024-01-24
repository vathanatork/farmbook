import { useQuery } from 'react-query'
import { axiosClient } from '../../utils/axiosClient'
import { axiosNoBaseURL } from '../../utils/axiosNoBaseURl'
import { BaseURL } from '../../utils/BaseURL'

export const useSupplierList = () => {
    return useQuery(
        'supplier-list',
        ()=>axiosClient('/supplier')
    );
};

export const useSupplierShow = (id) => {
    return useQuery(
        'supplier-show',
        () => axiosClient(`/supplier/${id}`)
    );
};

export const useSupplierEdit = (id) => {
    return useQuery(
        
    )
}