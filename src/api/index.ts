import { API_BASE_URL } from '../../constants';

export enum ActivytType {
  EDUCATION = 'education',
  RECREATIONAL = 'recreational',
  SOCIAL = 'social',
  DIY = 'diy',
  CHARITY = 'charity',
  COOKING = 'cooking',
  RELAXATION = 'relaxation',
  MUSIC = 'music',
  BUSYWORK = 'busywork',
}

export interface IActivity {
  key: string;
  activity: string;
  accessibility: number;
  type: ActivytType;
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
