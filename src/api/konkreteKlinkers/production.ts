import axiosInstance from '@/utils/axios';

export const fetchProductionByDate = async (date: string) => {
    try {
        const response = await axiosInstance.get(`/konkreteKlinkers/production?date=${date}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};
export const storeProductionAction = async (data: any) => {
    try {
        const response = await axiosInstance.post(`/konkreteKlinkers/production/action`, data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};
export const storeDownTimeData = async (data: any) => {
    try {
        const response = await axiosInstance.post(`/konkreteKlinkers/production/downtime`, data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

export const fetchProductionLogsByProduct = async (productId: string, jobOrder: string) => {
    try {
        const response = await axiosInstance.get(`/konkreteKlinkers/production/log?product_id=${productId}&job_order=${jobOrder}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

export const fetchDowntimeLogsByProduct = async (productId: string, jobOrder: string) => {
    try {
        const response = await axiosInstance.get(`/konkreteKlinkers/production/downtime?product_id=${productId}&job_order=${jobOrder}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};
export const fetchUpdatedReportByProduct = async (productId: string, jobOrder: string) => {
    try {
        const response = await axiosInstance.get(`/konkreteKlinkers/updated-production?product_id=${productId}&job_order=${jobOrder}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};
