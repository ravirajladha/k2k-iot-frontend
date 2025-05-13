import axiosInstance from "@/utils/axios";


export const fetchJobOrderData = async () => {
  const response = await axiosInstance.get('/konkreteKlinkers/joborders');
  return response.data.data;
};

export const storeJobOrderData = async (data: any) => {
  try {
    const response = await axiosInstance.post('/konkreteKlinkers/joborder/create', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchMachinesByProductId = async (materialCode: string) => {
  try {
    const response = await axiosInstance.get(`/konkreteKlinkers/joborder-getMachine?material_code=${materialCode}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
export const fetchJobOrderById = async (jobOrderId: string) => {
  try {
    const response = await axiosInstance.get(`/konkreteKlinkers/joborders/${jobOrderId}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
