import { api } from '../utils/axios';

export const login = async (data: any) => {
    try {
        const response = await api.post('users/login', data);
        console.log('Response from the auth.ts', response.data);
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error in login', error.message);
            throw new Error(error.message);
        }
        if (typeof error === 'object' && error !== null && 'response' in error) {
            const apiError = error as { response: { data: any } };
            console.error('Error in login', apiError.response.data);
            throw apiError.response.data;
        }
        throw new Error('Unown error ocurred during login');
    }
};

export const logout = async () => {
  try{
    const response = await api.post('users/logout');
    return response.data;

  }catch(error){
    if(error instanceof Error){
      console.error("error in logout:", error.message);
    }

    if (typeof error === 'object' && error !==null && 'response' in error ){
      const apiError = error as {response: {data:any}};
      console.error ("error in logout", apiError.response.data);
      throw apiError.response.data;

    }
    throw new Error("Unknown error ocurred during logout");
  }
};