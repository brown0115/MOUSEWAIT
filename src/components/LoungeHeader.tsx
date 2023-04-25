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
        <img src={midBanner} className='img-fluid' alt='mid-banner-img' />
        <Link to='/disneyland/lounge/' className="banner-logo"></Link>
      </div>
      <div className='top-trend'>
        <div className='text-head-trend text-center'>
          <h6 className='trending-t'>TRENDING SECTION</h6>
          <h6 className='trending-section-new'>
            {/*   {getpagename} (the name of the Land) */}
            {getpagename != '' ? <> {getpagename}</> : <> Disneyland Lounge</>}
          </h6>
          <Search />
        </div>
      </div>

      {/*    <div className='text-head text-center'>
        <ul className='p-0 m-0'>
          <li>
            <Link
              className={
                location.pathname == '/disneyland/d/L/most-viewed/'
                  ? 'selectmenu'
                  : ''
              }
              to='/disneyland/d/L/most-viewed/'
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
                location.pathname == '/disneyland/lands/7/Disneyland-Talk/'
                  ? 'selectmenu'
                  : ''
              }
              to='/disneyland/lands/0/Disneyland-Talk/'
            >
              Disneyland Talk
            </Link>
          </li>
          <li>
            <Link
              className={
                location.pathname == '/disneyland/lands/1/Disneyland-Real-Time/'
                  ? 'selectmenu'
                  : ''
              }
              to='/disneyland/lands/1/Disneyland-Real-Time/'
            >
              Real-Time
            </Link>
          </li>
          <li>
            <Link
              className={
                location.pathname == '/disneyland/lands/0/the-hub/'
                  ? 'selectmenu'
                  : ''
              }
              to='/disneyland/lands/0/the-hub/'
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
                to='/disneyland/loungeland/'
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
