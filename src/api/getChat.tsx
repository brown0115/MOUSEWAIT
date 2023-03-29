import axios, { AxiosResponse } from 'axios';
import { chatSend } from '../redux/users/slice';
import { User } from '../redux/users/types';
import { GET_BASE_URL } from '../constants/apiEndpoints';
export const getChatApi = async ({
 user_message
}: User) => {
  const responseBody = (response: AxiosResponse) => response.data;

  let sorvalue = null;
 
 
  const apiEndpoint = 'http://tahaanwar01.pythonanywhere.com/disney_chat?user_message=is';

  const { data } = await axios
  .get<User[]>(`${apiEndpoint}`, {
   
    headers: {
      Authorization: `mousewait_123&_chatdisney%#85 `,
      'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
    },
   
  })
 
  .then(responseBody);

    return data;
  
};
