import axiosInstance from "@/utils/axios";


export const fetchQcData = async () => {
  const response = await axiosInstance.get('/konkreteKlinkers/qc-check');
  return response.data.data;
};

export const storeQcData = async (data: any) => {
  try {
    const response = await axiosInstance.post('/konkreteKlinkers/qc-check', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchProductByJobOrder = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/konkreteKlinkers/qc-check/products?id=${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const fetchQcById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/konkreteKlinkers/qc-check/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
