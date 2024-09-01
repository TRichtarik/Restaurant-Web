import axios from 'axios';

export const fetchManagerData = async () => {
  const response = await axios.get('', { withCredentials: true });
  return response.data;
};