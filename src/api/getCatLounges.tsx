import axios, { AxiosResponse } from 'axios';
import { FetchCatLoungesType } from '../redux/lounges/slice';
import { Lounge } from '../redux/lounges/types';
import { GET_BASE_URL } from '../constants/apiEndpoints';
export const getCatLoungesApi = async ({
  landid,
  sortType,
  LoungeId,
  currentPage,
  searchValue,
  shortByTime,
}: FetchCatLoungesType) => {
  const responseBody = (response: AxiosResponse) => response.data;
  const token = localStorage.getItem('token');
  let sorvalue = null;
  let sortByTime =
    shortByTime == 'true'
      ? `?page=${currentPage}&sortordefault=ww`
      : `?page=${currentPage}`;
  const apiEndpoint = GET_BASE_URL + `/backend/api/v1/home/` + landid;

  if (searchValue != null) {
    const { data } = await axios
      .get<Lounge[]>(`${apiEndpoint}/search/post/${searchValue}${sortByTime}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then(responseBody);
    return data;
  } else {
    if (landid == 3) {
      localStorage.setItem('pagename', 'LoungeLand');
    } else {
      let myurl = window.location.href
        .substring(window.location.href.lastIndexOf(landid + '/') + 1)
        .replace(/([/~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\? ])+/g, ' ');
      localStorage.setItem('pagename', myurl);
    }

    const { data } = await axios
      .get<Lounge[]>(`${apiEndpoint}${sortByTime}`)
      .then(responseBody);
    return data;
  }
};
