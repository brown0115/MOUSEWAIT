import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { useNavigate, useParams } from 'react-router-dom';

import { Placeholder } from '../components/Placeholder';
import { LoungeHeader } from '../components/LoungeHeader';
import { LoungeBox } from '../components/LoungeBox';
import { LoungeList } from '../components/LoungeList';
import { MobileLoungeHeader } from '../components/MobileLoungeHeader';
import { fetchBestViewd } from '../redux/lounges/slice';
import { selectLounges } from '../redux/lounges/selectors';
import { usersSelector } from '../redux/users/selectors';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';

import stickerImage from '../assets/img/stickers.jpg';

import { postLounge } from '../redux/lounges/slice';

type FormData = {
  chat_msg: string;
};

type SearchData = {
  searchValue: string;
};

const BestViewed = () => {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const { search, type } = useParams();

  const { items, status } = useSelector(selectLounges);

  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const { isLoggedIn } = useSelector(usersSelector);

  let sortType: any = null;
  let UserId: any = null;
  let currentPage: any = null;

  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(fetchBestViewd({ sortType, UserId, currentPage, type }));
  }, []);

  function converDate(datevalue: any) {
    const date = new Date(datevalue);
    const formattedDate = date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    return formattedDate;
  }

  function converTime(datevalue: any) {
    const date = new Date(datevalue);
    const formattedDate = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    });
    return formattedDate;
  }

  return (
    <>
      <div className='mid-main'>
        <div className='container'>
          <div className='mid-sec'>
            <LoungeHeader />
            <MobileLoungeHeader />
            <div className='mid-card-sec'>
              {status === 'error' ? (
                <div className='content__error-info'>
                  <h2>Error</h2>
                  <p>Please try to open the page later.</p>
                </div>
              ) : (
                <div className='content__items'>
                  {/* */}
                  {status === 'loading'
                    ? [...new Array(9)]?.map((_, index) => (
                        <Placeholder key={index} />
                      ))
                    : items?.map((obj) => <LoungeList obj={obj} />)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BestViewed;
