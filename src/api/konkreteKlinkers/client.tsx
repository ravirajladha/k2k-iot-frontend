import axiosInstance from "@/utils/axios";


export const fetchClientData = async () => {
  const response = await axiosInstance.get('/konkreteKlinkers/helpers/clients');
  return response.data.data;
};
// export const storeClientData = async (data: { name: string; address: string }) => {
//   const response = await axiosInstance.post('/konkreteKlinkers/helpers/clients', data);
//   return response.data.data;
// };
export const storeClientData = async (data: { name: string; address: string }) => {
  try {
    const response = await axiosInstance.post('/konkreteKlinkers/helpers/clients', data);
    return response.data;
  } catch (error) {
    throw error; // Let the calling component handle the error
  }
};
