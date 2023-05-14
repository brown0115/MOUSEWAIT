import axios, { AxiosResponse } from 'axios';
import { FetchLoungesType } from '../redux/lounges/slice';
import { Lounge } from '../redux/lounges/types';
import { GET_BASE_URL, LOCAL_BASE_URL } from '../constants/apiEndpoints';
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

  // console.log('currentpage', currentPage);
  // if(currentPage == 3)
  //   localStorage.setItem('pagename', 'lounge.land');
  // else if(currentPage == 4)
  //   localStorage.setItem('pagename', 'CLUB333');
  // else
  //   localStorage.setItem('pagename', 'Disneyland Talk');
  
  const token = localStorage.getItem('token');

  let sortByTime =
    shortByTime == 'true'
      ? `?page=${currentPage}&sortordefault=ww`
      : `?page=${currentPage}`;

  // remove endpoint
  const apiEndpoint = GET_BASE_URL + `/backend/api/v1/home`;

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
    const { data } = await axios
      .get<Lounge[]>(`${apiEndpoint}${sortByTime}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then(responseBody);

    return data;
  }
};
