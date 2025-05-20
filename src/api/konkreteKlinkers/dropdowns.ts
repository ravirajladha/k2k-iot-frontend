import axiosInstance from '@/utils/axios';

export const fetchJobOrderDropdown = async () => {
    try {
        const response = await axiosInstance.get('/dropdown/joborders');
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

export const getProductByWorkOrder = async (workOrderId: string) => {
    try {
        const response = await axiosInstance.get(`/dropdown/products?work_order_id=${workOrderId}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};
