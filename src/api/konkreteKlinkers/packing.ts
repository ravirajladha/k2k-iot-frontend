import axiosInstance from '@/utils/axios';

export const getBundleSizeByProduct = async (productId: string) => {
    try {
        const response = await axiosInstance.get(`/konkreteKlinkers/packing/bundlesize?product_id=${productId}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

export const createPackingBundles = async (data: any) => {
    try {
        const response = await axiosInstance.post('/konkreteKlinkers/packing', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createPacking = async (data: any) => {
    try {
        const response = await axiosInstance.post('/konkreteKlinkers/packing/create', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchPackingData = async () => {
    try {
        const response = await axiosInstance.get('/konkreteKlinkers/packing');
        return response.data.data;
    } catch (error) {
        throw error;
    }
};
export const fetchPackingById = async (workOrderId: string, productId: string) => {
    try {
        const response = await axiosInstance.get(`/konkreteKlinkers/packing/get?work_order_id=${workOrderId}&product_id=${productId}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};
