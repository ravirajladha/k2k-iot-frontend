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
export const updateWorkOrderData = async (workOrderId: string, data: any) => {
  try {
    const response = await axiosInstance.put(`/konkreteKlinkers/workorders/${workOrderId}`, data);
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

export const fetchPlantsByProduct = async (productId: string) => {
  try {
    const response = await axiosInstance.get(`/konkreteKlinkers/workorders-getPlant?materialcode=${productId}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const fetchWorkOrderById = async (workOrderId: string) => {
    try {
      const response = await axiosInstance.get(`/konkreteKlinkers/workorders/${workOrderId}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };
