import axiosInstance from '@/utils/axios';

export const fetchProductionByDate = async (date: string) => {
    try {
        const response = await axiosInstance.get(`/konkreteKlinkers/production?date=${date}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};
