import axiosInstance from '@/utils/axios';

export const fetchInventoryData = async () => {
    try {
        const response = await axiosInstance.get('/konkreteKlinkers/inventories');
        return response.data.data;
    } catch (error) {
        throw error;
    }
};
