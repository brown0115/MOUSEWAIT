import axios, { AxiosResponse } from 'axios';
import { FetchCatLoungesType } from '../redux/lounges/slice';
import { Lounge } from '../redux/lounges/types';
import { GET_BASE_URL } from '../constants/apiEndpoints';
export const getCatLoungesApi = async ({
  landid,
  currentPage,
}: FetchCatLoungesType) => {
  const responseBody = (response: AxiosResponse) => response.data;

  let sorvalue = null;

  const apiEndpoint =
    GET_BASE_URL + `/backend/api/v1/home/` + landid + `?page=${currentPage}`;

  if (landid == 3) {
    localStorage.setItem('pagename', 'LoungeLand');
  } else {
    let myurl = window.location.href
      .substring(window.location.href.lastIndexOf(landid + '/') + 1)
      .replace(/([/~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\? ])+/g, ' ');
    localStorage.setItem('pagename', myurl);
  }

  const { data } = await axios
    .get<Lounge[]>(`${apiEndpoint}`)
    .then(responseBody);
  return data.data;
};
