import instanceAxios from './instanceAxios';

export const fetchCreatePost = async (data: FormData) => {
  return await instanceAxios.post(`/api/products`, data);
};
