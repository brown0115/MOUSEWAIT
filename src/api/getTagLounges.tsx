import axios, { AxiosResponse } from 'axios';
import { FetchTagLoungesType } from '../redux/lounges/slice';
import { Lounge } from '../redux/lounges/types';
import { GET_BASE_URL } from '../constants/apiEndpoints';
export const getTagLoungesApi = async ({
  sortType,
  LoungeId,
  currentPage,
  tagValue,
  shortByTime,
}: FetchTagLoungesType) => {
  const responseBody = (response: AxiosResponse) => response.data;

  let sorvalue = null;

  let sortByTime = shortByTime == 'true' ? `?sortordefault=ww` : '';
  const apiEndpoint = GET_BASE_URL + '/backend/api/v1/tag' + sortByTime;

  const { data } = await axios
    .get<Lounge[]>(`${apiEndpoint}?tags_name=${tagValue}`)
    .then(responseBody);
  return data;
};
