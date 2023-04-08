import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { useNavigate, useParams } from 'react-router-dom';

import { Placeholder } from '../components/Placeholder';
import { LoungeHeader } from '../components/WdwLoungeHeader';
import { LoungeBox } from '../components/WdwLoungeBox';
import { LoungeList } from '../components/LoungeList';
import { MobileLoungeHeader } from '../components/WdwMobileLoungeHeader';
import {
  fetchDisneyWorldLounges,
  fetchStickyLoungeWdw,
} from '../redux/lounges/slice';
import { selectLounges } from '../redux/lounges/selectors';
import { usersSelector } from '../redux/users/selectors';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { StickyPost } from '../components/StickyPostWdw';
import stickerImage from '../assets/img/stickers.jpg';

import { postLoungeWdw } from '../redux/lounges/slice';
// @ts-ignore
import { loadProgressBar } from 'axios-progress-bar';
import 'axios-progress-bar/dist/nprogress.css';
import { WDWLoungeList } from '../components/WDWLoungeList';

type FormData = {
  chat_msg: string;
};

type SearchData = {
  searchValue: string;
};

const WdwLandLounge = () => {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const { search } = useParams();

  const { items, status, sortByTime, stickyItem } = useSelector(selectLounges);
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

  const [audienceSample, setAudienceSample] = useState(items); // set campaign as default

  useEffect(() => {
    setAudienceSample((prev) => [...prev, ...items]);
  }, [items]); // set the relation between redux campaign and local state

  // console.log(audienceSample);

  useEffect(() => {
    if (search) {
      searchValue = search;
    }
    /*   if (currentPage == 1) {
      window.scrollTo(0, 0);
    } */
    loadProgressBar();
    dispatch(fetchStickyLoungeWdw({}));
    dispatch(
      fetchDisneyWorldLounges({
        sortType,
        LoungeId,
        currentPage,
        searchValue,
        shortByTime,
      })
    );
  }, [shortByTime, search, currentPage]);

  const handelInfiniteScroll = async () => {
    // console.log("scrollHeight" + document.documentElement.scrollHeight);
    // console.log("innerHeight" + window.innerHeight);
    // console.log("scrollTop" + document.documentElement.scrollTop);
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setCurrentPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handelInfiniteScroll);
    return () => window.removeEventListener('scroll', handelInfiniteScroll);
  }, []);

  const onSubmit = (data: any) => {
    setIsLoading(true);
    dispatch<any>(postLoungeWdw(data)).then((res: any) => {
      reset();
      setIsLoading(false);
      loadProgressBar();
      dispatch(
        fetchDisneyWorldLounges({
          sortType,
          LoungeId,
          currentPage,
          searchValue,
          shortByTime,
        })
      );
    });
  };

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
                      isLoading={isLoading}
                    />
                  </div>

                  {/* */}

                  {/*         {status === 'loading'
                    ? [...new Array(9)]?.map((_, index) => (
                        <Placeholder key={index} />
                      ))
                    : items?.map((obj) => <WDWLoungeList obj={obj} />)}
               
                */}

                  {status === 'loading' ? (
                    [...new Array(9)]?.map((_, index) => (
                      <Placeholder key={index} />
                    ))
                  ) : stickyItem[0] != null ? (
                    <StickyPost obj={stickyItem[0]} mybutton={true} />
                  ) : (
                    ''
                  )}

                  {audienceSample.map((e) =>
                    e.checksticky === null ? <WDWLoungeList obj={e} /> : ''
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

export default WdwLandLounge;