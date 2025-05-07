import axiosInstance from '@/utils/axios';

export const fetchProductData = async () => {
    try {
        const response = await axiosInstance.get('/konkreteKlinkers/helpers/products');
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

export const storeProductData = async (data: any) => {
    try {
        const response = await axiosInstance.post('/konkreteKlinkers/helpers/products', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateProductData = async (productId: string, data: any) => {
    try {
        const response = await axiosInstance.put(`/konkreteKlinkers/helpers/products/${productId}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchProductById = async (productId: string) => {
    try {
        const response = await axiosInstance.get(`/konkreteKlinkers/helpers/products/${productId}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};
