import axiosInstance from "@/utils/axios";


export const fetchDispatchData = async () => {
    const response = await axiosInstance.get('/konkreteKlinkers/dispatch');
    return response.data.data;
  };

  export const storeDispatchData = async (data: any) => {
    try {
      const response = await axiosInstance.post('/konkreteKlinkers/dispatch/create', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const updateDispatchData = async (data: any) => {
    try {
      const response = await axiosInstance.post('/konkreteKlinkers/dispatch/create', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const scanQrIds = async (qrId: string) => {
    try {
        const response = await axiosInstance.get(`/konkreteKlinkers/dispatch/qrscan?id=${qrId}`);
        console.log("response",response.data.data);

        return response.data.data;
    } catch (error) {
        throw error;
    }
};
  export const fetchDispatchById = async (id: string) => {
    try {
      const response = await axiosInstance.get(`/konkreteKlinkers/dispatch/${id}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };
