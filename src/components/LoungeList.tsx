import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CommentReply } from './CommentReply';
import { useSelector } from 'react-redux';
import { TopImges } from '../components/TopImges';
import { TopTags } from '../components/TopTags';
import { useAppDispatch } from '../redux/store';
import { LikeButton } from '../components/LikeButton';
import { CommentButton } from '../components/CommentButton';
import { ToggleMenu } from '../components/ToggleMenu';
import { selectLounges } from '../redux/lounges/selectors';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { fetchLounges, fetchUserMenu } from '../redux/lounges/slice';
import { postLoungeFlag, postLoungeCommentEdit } from '../redux/lounges/slice';
// @ts-ignore
import { loadProgressBar } from 'axios-progress-bar';
import 'axios-progress-bar/dist/nprogress.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TagMe from './TagMe';
import DmMe from './DmMe';
import { GET_BASE_URL_IMAGE } from '../constants/apiEndpoints';
import Emoji from 'react-emoji-render';

type LoungeListPropsType = {
  obj: any;
};

export const LoungeList: React.FC<LoungeListPropsType> = ({ obj }) => {
  const dispatch = useAppDispatch();
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [isLoading, setIsLoading] = useState<any | string>(false);
  const user = localStorage.getItem('user_id');
  const { items, status, sortByTime } = useSelector(selectLounges);
  const { search } = useParams();
  const [shortByTime, setShortByTime] = useState<any | string>(
    localStorage.getItem('shortByTime')
  );

  function convertUnicode(input: any) {
    return input.replace(/\\+u([0-9a-fA-F]{4})/g, (a: any, b: any) =>
      String.fromCharCode(parseInt(b, 16))
    );
  }

  function converDate(datevalue: any) {
    const date = new Date(datevalue);
    const formattedDate = date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
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

  let sortType: any = null;
  let LoungeId: any = null;
  let currentPage: any = null;
  let searchValue: any = null;

  useEffect(() => {
    sortByTime != '' && setShortByTime(sortByTime);
  }, [sortByTime]);

  //const notify = () => toast("Wow so easy!");
  const [Notify, setIsNotify] = useState<any | string>();

  const onSubmit = (data: any) => {
    /* console.log('uuuu');
    console.log(data);
    console.log(data.chat_reply_msg);
    return false; */

    if (data.chat_reply_msg != undefined) {
      dispatch<any>(postLoungeCommentEdit(data)).then((res: any) => {
        reset();
        window.location.reload();
        Notify(toast('Post Updated Successfully'));
      });
    } else {
      setIsLoading(true);
      dispatch<any>(postLoungeFlag(data)).then((res: any) => {
        window.confirm(res.payload.data[0].error);
        window.location.reload();
        // Notify(toast(res.payload.data[0].error));
        /*    reset();
        setIsLoading(false);
        loadProgressBar();
        dispatch(
          fetchLounges({
            sortType,
            LoungeId,
            currentPage,
            searchValue,
            shortByTime,
          })
        ); */
      });
    }
  };

  /*   const formatText = (text: any) => {
    let content = text?.split(/((?:#|@|https?:\/\/[^\s]+)[a-zA-Z]+)/);
    let hashtag;

    return content?.map((word: any) => {
      if (word.startsWith('#')) {
        hashtag = word.replace('#', '');
        return (
          <Link to={`/disneyland/hash/${hashtag}`}>
            <a style={{ color: 'blue', textDecoration: 'underline' }}>{word}</a>
          </Link>
        );
      } else {
        return word;
      }
    });
  }; */

  function removeTags(string: any) {
    let newstring = string
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim();
    let content = newstring?.split(/((?:#|@|https?:\/\/[^\s]+)[a-zA-Z]+)/);
    let hashtag;

    return content?.map((word: any) => {
      if (word.startsWith('#')) {
        hashtag = word.replace('#', '');
        return (
          <Link to={`/disneyland/hash/${hashtag}`}>
            <a style={{ color: 'blue', textDecoration: 'underline' }}>{word}</a>
          </Link>
        );
      } else {
        return word;
      }
    });
  }

  function getWords(str: any) {
    const result = str.split(/\s+/).slice(0, 5).join(' ');
    return result;
  }

  return (
    <>
      <div className='card-m rounded card-m2'>
        <div className='card-s-img justify-content-between d-flex'>
          <div className='small-box d-flex'>
            <div className='small-c'>
              <Link to={`/disneyland/user/${obj.user?.user_id}/mypost`}>
                <img
                  src={
                    GET_BASE_URL_IMAGE +
                    '/disneyland/images/thumbs/' +
                    obj.user?.image
                  }
                  className='img-fluid'
                  alt='{obj.user?.user_name}'
                />
              </Link>
            </div>
            <div className='small-tt'>
              <h6>
                {' '}
                <Link to={`/disneyland/user/${obj.user?.user_id}/mypost`}>
                  {obj.user?.user_name}
                </Link>
                {obj?.user.getuserlogodetail?.speciallogo.image != null ? (
                  <img
                    src={
                      GET_BASE_URL_IMAGE +
                      '/images/user_special_logos/' +
                      obj?.user.getuserlogodetail?.speciallogo.image
                    }
                    className='card-img-top'
                    alt='img'
                    style={{ height: '10px', width: 'auto', marginLeft: '2px' }}
                  />
                ) : (
                  <></>
                )}
              </h6>
              <span>
                {obj.user?.totalpoints} #{obj.user?.position} Quality #5
              </span>

              <p>{converDate(obj.chat_time)}</p>
            </div>
          </div>

          <div>
            <>
              {/*  {console.log(obj.user.user_id)}
        {console.log(obj.isthankyou?.user_id)} */}
            </>
            <ToggleMenu
              onSubmit={onSubmit}
              register={register}
              handleSubmit={handleSubmit}
              setValue={setValue}
              isLoading={isLoading}
              username={obj.user.user_name}
              userid={obj.user.user_id}
              LoungeId={obj.chat_id}
              getThankYou={
                obj.isthankyou?.user_id == user && obj.isthankyou?.status == '1'
                  ? true
                  : false
              }
              getBookMark={
                obj.isbookmark?.user_id == user && obj.isbookmark?.status == '1'
                  ? true
                  : false
              }
              editType={obj.user?.user_id == user ? true : false}
              chat_reply_msg={obj.chat_msg}
              pageName={'Lounge'}
              lock={obj.islock == '0' ? 'Lock' : 'UnLock'}
              chatRoomId={obj.chat_room_id}
              getStick={obj.checksticky == null ? 'Stick' : 'UnStick'}
              getSubscribe={
                obj.subscribepost?.user_id == user && obj.subscribepost != null
                  ? false
                  : true
              }
            />

            {/* <DmMe
        isOpen={''}
        isClosed={''}
        LoungeId ={''}
        register ={''}
        handleSubmit ={''}
        onSubmit ={''}
        setValue ={''}
        isSubmitted={true}
         userName ={obj.user.user_name}
              userId={obj.user.user_id}
               chatId ={obj.chat_id}
              
        
        /> */}
          </div>
        </div>
        {obj.topimages && (
          <TopImges topImageData={obj.topimages} chatId={obj.chat_id} />
        )}

        {/*  <ToastContainer autoClose={3000} /> */}
        <div className='card-img-b my-2'>
          {obj.chat_img?.includes('c_img') && (
            <Link
              to={
                obj.mapping_url
                  ? '/disneyland/lands-talk/' + obj.mapping_url
                  : '/disneyland/lands-talk/' + obj.chat_id + '/Mousewait'
              }
            >
              <img
                src={
                  GET_BASE_URL_IMAGE + '/disneyland/chat_images/' + obj.chat_img
                }
                className='card-img-top img-fluid'
                alt='img'
              />
            </Link>
          )}
        </div>

        <div className='card-body'>
          <div className='t-link text-center'>
            {obj.tagcomposit && (
              <>
                <TopTags
                  gettagged={obj.tagcomposit}
                  chatId={obj.tagcomposit.chat_id}
                />
              </>
            )}
          </div>

          <div>
            <Link
              /*          to={
                obj.mapping_url != ''
                  ? `/disneyland/lands-talk/${obj.mapping_url.replace(
                      /([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\? ])+/g,
                      '-'
                    )}`
                  : `/disneyland/lands-talk/${obj.chat_id}/Mousewait`
              } */

              to={
                obj.mapping_url
                  ? '/disneyland/lands-talk/' + obj.mapping_url
                  : '/disneyland/lands-talk/' + obj.chat_id + '/Mousewait'
              }
            >
              <h6>{removeTags(obj.chat_msg)}</h6>
              {/*  <h6
                dangerouslySetInnerHTML={{
                  __html: formatText(obj.chat_msg),
                }}
              /> */}
            </Link>

            <div className='chat-icon d-flex'>
              <LikeButton likecount={obj.likecount} chatId={obj.chat_id} />
              <Link
                to={
                  obj.mapping_url
                    ? '/disneyland/lands-talk/' + obj.mapping_url
                    : '/disneyland/lands-talk/' + obj.chat_id + '/Mousewait'
                }
              >
                <CommentButton
                  commentcount={obj.commentcount}
                  chatId={obj.chat_id}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
