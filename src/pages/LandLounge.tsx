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
  fetchLounges,
  fetchUserMenu,
  fetchStickyLounge,
} from '../redux/lounges/slice';
import { selectLounges } from '../redux/lounges/selectors';
import { usersSelector } from '../redux/users/selectors';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';

import stickerImage from '../assets/img/stickers.jpg';

import { postLounge } from '../redux/lounges/slice';
// @ts-ignore
import { loadProgressBar } from 'axios-progress-bar';
import 'axios-progress-bar/dist/nprogress.css';
import Progressbar from 'react-js-progressbar';
import { StickyPost } from '../components/StickyPost';

type FormData = {
  chat_msg: string;
};

type SearchData = {
  searchValue: string;
};

type ProgressbarProps = {
  input: number;
  pathWidth: number;
  pathColor: ('#56ab2f' | '#a8e063')[];
  trailWidth: number;
  trailColor: '#363636';
};
// const Progressbar: React.FunctionComponent<ProgressbarProps> = ({
//   input,
//   pathWidth,
//   pathColor,
//   trailColor,
//   trailWidth,
//   textStyle,

// })=>{
//   console.log('how aee you')

// }

const LandLounge = () => {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

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
  // let currentPage: any = null;
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

  const loadDataOnlyOnce = () => {
    /*    if (currentPage == 1) {
      window.scrollTo(0, 0);
    } */
    if (search) {
      searchValue = search;
    }
    loadProgressBar();
    dispatch(fetchStickyLounge({}));
    dispatch(
      fetchLounges({
        sortType,
        LoungeId,
        currentPage,
        searchValue,
        shortByTime,
      })
    );
  };

  //console.log(myData);

  useEffect(() => {
    loadDataOnlyOnce(); // this will fire only on first render
  }, [shortByTime, search, currentPage]);

  // to get user menu
  const loginuserid = localStorage.getItem('user_id');
  const [assignMenu, SetAssignMenu] = useState<any | string>([]);
  useEffect(() => {
    dispatch(fetchUserMenu({ loginuserid })).then((res: any) => {
      // console.log(res);
      SetAssignMenu(res.payload);
    });
  }, []);

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

  //console.log(items);

  return (
    <>
      <div className='mid-main'>
        <div className='container'>
          <div className='mid-sec'>
            <LoungeHeader />
            <MobileLoungeHeader />

            <div id='progressbarContainer'>
              {/* {
               isLoading==false? <div className="progress" style={{borderRadius:"10px"  ,width:"80%" ,marginLeft:"12%" , marginBottom:"10px"}}>
               <label htmlFor="progressbar" >40%</label>
               <progress id='progress-bar' value='40' max='100' style={{ width:"100%", borderRadius:"20px"  , }}> </progress>
               </div> :""
              } */}
            </div>

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
                      onSubmit={''}
                      register={register}
                      handleSubmit={handleSubmit}
                      setValue={setValue}
                      isLoading={isLoading}
                    />
                  </div>

                  {/*             {status === 'loading'
                    ? [...new Array(9)]?.map((_, index) => (
                        <Placeholder key={index} />
                      ))
                    : items?.map((obj) => <LoungeList obj={obj} />)} */}

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
                    e.checksticky === null ? <LoungeList obj={e} /> : ''
                  )}

                  {assignMenu.length > 0 ? (
                    assignMenu.map((item: any) =>
                      item.rights_id == '7'
                        ? localStorage.setItem('Tag', 'true')
                        : ''
                    )
                  ) : (
                    <>{localStorage.setItem('Tag', '')}</>
                  )}
                  {assignMenu.length > 0 ? (
                    assignMenu.map((item: any) =>
                      item.rights_id == '6'
                        ? localStorage.setItem('MP', 'true')
                        : ''
                    )
                  ) : (
                    <>{localStorage.setItem('MP', '')}</>
                  )}

                  {assignMenu.length > 0 ? (
                    assignMenu.map((item: any) =>
                      item.rights_id == '12'
                        ? localStorage.setItem('DM', 'true')
                        : ''
                    )
                  ) : (
                    <>{localStorage.setItem('DM', '')}</>
                  )}
                  {assignMenu.length > 0 ? (
                    assignMenu.map((item: any) =>
                      item.rights_id == '8'
                        ? localStorage.setItem('SP', 'true')
                        : ''
                    )
                  ) : (
                    <>{localStorage.setItem('SP', '')}</>
                  )}
                  {assignMenu.length > 0 ? (
                    assignMenu.map((item: any) =>
                      item.rights_id == '13'
                        ? localStorage.setItem('loungeland', 'true')
                        : ''
                    )
                  ) : (
                    <>{localStorage.setItem('loungeland', '')}</>
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

export default LandLounge;