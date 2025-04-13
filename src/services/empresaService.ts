import api from '../api/api';

export const getEmpresas = async () => {
  const response = await api.get('/empresas');
  return response.data;
};
