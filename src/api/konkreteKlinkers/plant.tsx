import axiosInstance from "@/utils/axios";


export const fetchPlantData = async () => {
  const response = await axiosInstance.get('/konkreteKlinkers/helpers/plants');
  return response.data.data;
};

export const storePlantData = async (data: any) => {
  try {
    const response = await axiosInstance.post('/konkreteKlinkers/helpers/plant', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePlantData = async (plantId: string, data: any) => {
    try {
      const response = await axiosInstance.put(`/konkreteKlinkers/helpers/plants/${plantId}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const fetchPlantById = async (plantId: string) => {
    try {
      const response = await axiosInstance.get(`/konkreteKlinkers/helpers/plants/${plantId}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };
