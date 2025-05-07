import axiosInstance from "@/utils/axios";


export const fetchClientData = async () => {
  const response = await axiosInstance.get('/konkreteKlinkers/helpers/clients');
  return response.data.data;
};
// export const storeClientData = async (data: { name: string; address: string }) => {
//   const response = await axiosInstance.post('/konkreteKlinkers/helpers/clients', data);
//   return response.data.data;
// };
export const storeClientData = async (data: any) => {
  try {
    const response = await axiosInstance.post('/konkreteKlinkers/helpers/clients', data);
    return response.data;
  } catch (error) {
    throw error; // Let the calling component handle the error
  }
};

export const updateClientData = async (clientId: string, data: any) => {
  try {
    const response = await axiosInstance.put(`/konkreteKlinkers/helpers/clients/${clientId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getClientById = async (clientId: string) => {
  try {
    const response = await axiosInstance.get(`/konkreteKlinkers/helpers/clients/${clientId}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
