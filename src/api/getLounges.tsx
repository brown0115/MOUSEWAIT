import axios, { AxiosResponse } from 'axios';
import { FetchLoungesType } from '../redux/lounges/slice';
import { Lounge } from '../redux/lounges/types';
import { GET_BASE_URL } from '../constants/apiEndpoints';
export const getAllLoungesApi = async ({
  sortType,
  LoungeId,
  currentPage,
  searchValue,
  shortByTime,
}: FetchLoungesType) => {
  const responseBody = (response: AxiosResponse) => response.data;

  let sorvalue = null;
  // let apiEndpoint = "https://mousewait.xyz/mousewaitnew/backend/api/v1/home";

  // if(shortByTime=='true'){
  //   alert('dfdsfsdad');
  //   sorvalue='ww'
  //    apiEndpoint = "https://mousewait.xyz/mousewaitnew/backend/api/v1/home?sortordefault="+sorvalue;

  // }
  // else{

  // }
  /*   var parts = window.location.href.split('/mousewaitnew/');
  var lastSegment = parts.pop() || parts.pop();
  console.log(lastSegment); */
  localStorage.setItem('pagename', 'Disneyland Lounge');
  const token = localStorage.getItem('token');

  let sortByTime = shortByTime == 'true' ? `&sortordefault=ww` : '';
  const apiEndpoint =
    GET_BASE_URL + `/backend/api/v1/home?page=${currentPage}` + sortByTime;

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
