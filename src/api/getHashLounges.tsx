import axios, { AxiosResponse } from 'axios';
import { FetchHashLoungesType } from '../redux/lounges/slice';
import { Lounge } from '../redux/lounges/types';
import { GET_BASE_URL } from '../constants/apiEndpoints';
export const getHashLoungesApi = async ({
  sortType,
  LoungeId,
  currentPage,
  tagValue,
  shortByTime,
}: FetchHashLoungesType) => {
  tagValue = tagValue.replace('#', '');
  const responseBody = (response: AxiosResponse) => response.data;
  localStorage.setItem('pagename', 'My Hash');
  let sorvalue = null;

  let sortByTime = shortByTime == 'true' ? `?sortordefault=ww` : '';
  const apiEndpoint = GET_BASE_URL + '/backend/api/v1/hash' + sortByTime;

  const { data } = await axios
    .get<Lounge[]>(`${apiEndpoint}?hash=${tagValue}`)
    .then(responseBody);
  return data;
};
