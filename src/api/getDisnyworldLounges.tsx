import axios, { AxiosResponse } from 'axios';
import { FetchLoungesType } from '../redux/lounges/slice';
import { Lounge } from '../redux/lounges/types';
import { GET_BASE_URL } from '../constants/apiEndpoints';
export const getDisnyworldLoungesApi = async ({
  sortType,
  LoungeId,
  currentPage,
  searchValue,
  shortByTime,
}: FetchLoungesType) => {
  const responseBody = (response: AxiosResponse) => response.data;
  localStorage.setItem('pagename', 'Disneyworld Lounge');
  let sorvalue = null;
  const token = localStorage.getItem('token');
  let sortByTime = shortByTime == 'true' ? `&sortordefault=ww` : '';
  const apiEndpoint =
    GET_BASE_URL +
    `/backend/api/v1/disneyworldHome?page=${currentPage}` +
    sortByTime;

  if (searchValue != null) {
    const { data } = await axios
      .get<Lounge[]>(`${apiEndpoint}/search/post/${searchValue}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then(responseBody);
    return data.data;
  } else {
    const { data } = await axios
      .get<Lounge[]>(`${apiEndpoint}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then(responseBody);

    return data.data;
  }
};
