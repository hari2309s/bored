import { API_BASE_URL } from '../../constants';

export interface IActivity {
  key: string;
  activity: string;
  accessibility: number;
  type: string;
  participants: number;
  price: number;
  link?: string;
}

export const getActivity = async () => {
  return await fetch(`${API_BASE_URL}/activity`)
    .then((response) => response.json())
    .catch((error) => {
      return Promise.reject(error);
    });
};
