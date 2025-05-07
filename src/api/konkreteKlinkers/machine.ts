import axiosInstance from '@/utils/axios';

export const fetchMachineData = async () => {
    const response = await axiosInstance.get('/konkreteKlinkers/helpers/machines');
    return response.data.data;
};

export const storeMachineData = async (data: any) => {
    try {
        const response = await axiosInstance.post('/konkreteKlinkers/helpers/machine', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateMachineData = async (machineId: string, data: any) => {
    try {
        const response = await axiosInstance.put(`/konkreteKlinkers/helpers/machines/${machineId}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchMachineById = async (machineId: string) => {
    try {
        const response = await axiosInstance.get(`/konkreteKlinkers/helpers/machines/${machineId}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};
