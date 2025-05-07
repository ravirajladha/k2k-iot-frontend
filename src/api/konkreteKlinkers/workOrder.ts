import axiosInstance from "@/utils/axios";


export const fetchWorkOrderData = async () => {
  const response = await axiosInstance.get('/konkreteKlinkers/workorders');
  return response.data.data;
};

export const storeWorkOrderData = async (data: any) => {
  try {
    const response = await axiosInstance.post('/konkreteKlinkers/workorder/create', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchProjectsByClientId = async (clientId: string) => {
  try {
    const response = await axiosInstance.get(`/konkreteKlinkers/workorders-getProject?clientId=${clientId}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
