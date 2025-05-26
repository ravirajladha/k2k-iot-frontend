import axiosInstance from '@/utils/axios';

export const fetchInventoryData = async () => {
    try {
        const response = await axiosInstance.get('/konkreteKlinkers/inventories');
        return response.data.data;
    } catch (error) {
        throw error;
    }
};
export const fetchInventoryDataByProduct = async (productId: string) => {
    try {
        const response = await axiosInstance.get(`/konkreteKlinkers/inventory/product?product_id=${productId}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};
