import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { useNavigate, useParams } from 'react-router-dom';

import { Placeholder } from '../components/Placeholder';
import { LoungeHeader } from '../components/LoungeHeader';
import { LoungeBox } from '../components/LoungeBox';
import { LoungeList } from '../components/LoungeList';
import { MobileLoungeHeader } from '../components/MobileLoungeHeader';
import {
  fetchCatLounges,
  fetchLounges,
  fetchStickyLounge,
} from '../redux/lounges/slice';
import { selectLounges } from '../redux/lounges/selectors';
import { usersSelector } from '../redux/users/selectors';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { StickyPost } from '../components/StickyPost';
import stickerImage from '../assets/img/stickers.jpg';

import { postLounge } from '../redux/lounges/slice';

type FormData = {
  chat_msg: string;
};

type SearchData = {
  searchValue: string;
};

const LoungeLand = () => {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const landid = '3';
  const { search } = useParams();
  const { items, stickyItem, status, sortByTime } = useSelector(selectLounges);
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [shortByTime, setShortByTime] = useState<any | string>(
    localStorage.getItem('shortByTime')
  );

  const [showPopup, setShowPopup] = useState<any | string>(true);
  const [isLoading, setIsLoading] = useState<any | string>(false);
  let subtitle: any;

  let sortType: any = null;
  let LoungeId: any = null;
  //let currentPage: any = null;
  let searchValue: any = null;

  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    sortByTime != '' && setShortByTime(sortByTime);
  }, [sortByTime]);

  const handleLoginClick = () => {
    setShowPopup(!showPopup);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchStickyLounge({}));
    dispatch(
      fetchCatLounges({
        landid,
        sortType,
        LoungeId,
        currentPage,
        searchValue,
        shortByTime,
      })
    );
  }, [landid, currentPage, shortByTime, search]);

  const onSubmit = (data: any) => {
    /*     setIsLoading(true);
    dispatch<any>(postLounge(data)).then((res: any) => {
      reset();
      setIsLoading(false);

      dispatch(
        fetchLounges({
          sortType,
          LoungeId,
          currentPage,
          searchValue,
          shortByTime,
        })
      );
    }); */
  };

  // console.log(items);
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
                  <div>
                    <LoungeBox
                      onSubmit={onSubmit}
                      register={register}
                      handleSubmit={handleSubmit}
                      setValue={setValue}
                      isVisible={false}
                      setVisible={() => {}}
                      isLoading={isLoading}
                      onCloseMenu={() => {}}
                    />
                  </div>
                  {/* */}
                  {status === 'loading' ? (
                    [...new Array(9)]?.map((_, index) => (
                      <Placeholder key={index} />
                    ))
                  ) : stickyItem[0] != null ? (
                    <StickyPost obj={stickyItem[0]} mybutton={true} />
                  ) : (
                    ''
                  )}

                  {items.map((e) =>
                    e.checksticky === null ? <LoungeList obj={e} /> : ''
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoungeLand;
