import axiosInstance from "@/utils/axios";


export const fetchProjectData = async () => {
  const response = await axiosInstance.get('/konkreteKlinkers/helpers/projects');
  return response.data.data;
};

export const storeProjectData = async (data: any) => {
  try {
    const response = await axiosInstance.post('/konkreteKlinkers/helpers/projects', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProjectData = async (projectId: string, data: any) => {
    try {
      const response = await axiosInstance.put(`/konkreteKlinkers/helpers/projects/${projectId}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const fetchProjectById = async (projectId: string) => {
    try {
      const response = await axiosInstance.get(`/konkreteKlinkers/helpers/projects/${projectId}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };
