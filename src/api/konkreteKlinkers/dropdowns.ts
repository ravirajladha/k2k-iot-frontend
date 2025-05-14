import axiosInstance from '@/utils/axios';

export const fetchJobOrderDropdown = async () => {
    try {
        const response = await axiosInstance.get('/dropdown/joborders');
        return response.data.data;
    } catch (error) {
        throw error;
    }
};
