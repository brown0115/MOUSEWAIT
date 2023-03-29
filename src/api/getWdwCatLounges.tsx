import axios, { AxiosResponse } from 'axios';
import { FetchCatLoungesTypeWdw } from '../redux/lounges/slice';
import { Lounge } from '../redux/lounges/types';
import { GET_BASE_URL } from '../constants/apiEndpoints';
export const getCatLoungesWdwApi = async ({
  landid,
  currentPage,
}: FetchCatLoungesTypeWdw) => {
  const responseBody = (response: AxiosResponse) => response.data;

  let sorvalue = null;

  let myurl = window.location.href
    .substring(window.location.href.lastIndexOf(landid + '/') + 1)
    .replace(/([/~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\? ])+/g, ' ');
  localStorage.setItem('pagename', myurl);

  const apiEndpoint =
    GET_BASE_URL +
    `/backend/api/v1/disneyworldHome/` +
    landid +
    `?page=${currentPage}`;

  const { data } = await axios
    .get<Lounge[]>(`${apiEndpoint}`)
    .then(responseBody);
  return data.data;
};
