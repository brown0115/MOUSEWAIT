import { Link, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { setSortByTime } from '../redux/lounges/slice';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import midBanner from '../assets/img/mid-banner-img.png';
import { Search } from '../components/Search';
export const LoungeHeader = () => {
  const [stTime, SetStTime] = useState<any>(false);
  const srtvalue = localStorage.getItem('shortByTime');
  const loungeland = localStorage.getItem('loungeland');
  const getpagename = localStorage.getItem('pagename');
  const dispatch = useAppDispatch();
  const location = useLocation();
  useEffect(() => {
    srtvalue == null ? SetStTime(false) : SetStTime(srtvalue);
  }, [srtvalue]);
  const onSoryTime = (sorTBY: any) => {
    SetStTime(sorTBY);
    localStorage.setItem('shortByTime', sorTBY);
    let SortTimeType: any = sorTBY;
    let sortingTime: any = null;

    dispatch(setSortByTime({ SortTimeType }));
  };
  return (
    <>
      <div className='banner-img'>
        <Link to='/disneyworld/lounge/'>
          <img src={midBanner} className='img-fluid' alt='mid-banner-img' />
        </Link>
      </div>
      <div className='top-trend'>
        <div className='text-head-trend text-center'>
          <h6 className='trending-t'>TRENDING SECTION</h6>
          <h6 className='trending-section-new'>
            {/*   {getpagename} (the name of the Land) */}
            {getpagename != '' ? <> {getpagename}</> : <> Disneyworld Lounge</>}
          </h6>
          <Search />
        </div>
      </div>
      {/*  <div className='text-head text-center'>
        <ul className='p-0 m-0'>
          <li>
            <Link
              className={
                location.pathname == '/disneyworld/d/L/most-viewed/'
                  ? 'selectmenu'
                  : ''
              }
              to='/disneyworld/d/L/most-viewed/'
            >
              Best of the Day
            </Link>
          </li>
          <li>
            <Link
              className={
                location.pathname == '/disneyland/mystore/' ? 'selectmenu' : ''
              }
              to='/disneyland/mystore/'
            >
              Sticker Store
            </Link>
          </li>
          <li>
            <Link
              className={
                location.pathname == '/disneyworld/lands/1/Wdw-Talk/'
                  ? 'selectmenu'
                  : ''
              }
              to='/disneyworld/lands/1/Wdw-Talk/'
            >
              Wdw Talk
            </Link>
          </li>
          <li>
            <Link
              className={
                location.pathname == '/disneyworld/lands/2/Wdw-Real-Time/'
                  ? 'selectmenu'
                  : ''
              }
              to='/disneyworld/lands/2/Wdw-Real-Time/'
            >
              Wdw Real-Time
            </Link>
          </li>
          <li>
            <Link
              className={
                location.pathname == '/disneyworld/lands/0/the-hub/'
                  ? 'selectmenu'
                  : ''
              }
              to='/disneyworld/the-hub/'
            >
              The Hub
            </Link>
          </li>
          {stTime != 'true' ? (
            <li onClick={() => onSoryTime('true')}>Sort By Time</li>
          ) : (
            <li onClick={() => onSoryTime('false')}>Default</li>
          )}
          {loungeland == 'true' ? (
            <li>
              <Link
                className={
                  location.pathname == '/loungeland/' ? 'selectmenu' : ''
                }
                to='/disneyworld/loungeland/'
              >
                LOUNGΞLAND
              </Link>
            </li>
          ) : (
            <li></li>
          )}
        </ul>
      </div> */}
    </>
  );
};
