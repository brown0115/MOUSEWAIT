import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { Link, useNavigate, useParams } from 'react-router-dom';
import qs from 'qs';
import { Placeholder } from '../components/Placeholder';
import { CommentBox } from '../components/CommentBox';
import { fetchLoungeDetails } from '../redux/lounges/slice';
import { selectLounges } from '../redux/lounges/selectors';
import { GET_BASE_URL_IMAGE, dTime } from '../constants/apiEndpoints';
import { useForm } from 'react-hook-form';
import midBanner from '../assets/img/mid-banner-img.png';
import { ToggleMenu } from '../components/ToggleMenu';
import stickerImage from '../assets/img/stickers.jpg';
import faceBookImage from '../assets/img/face-s.jpg';
import pinImage from '../assets/img/face-s.jpg';
import { Helmet } from 'react-helmet';

import {
  postThankyou,
  postBookMark,
  postLoungeComment,
  postLoungeFlag,
  fetchStickerLounges,
  addSticker,
  removeUserLounge,
} from '../redux/lounges/slice';
import cardmImage from '../assets/img/card-m-img.png';

import { CommentList } from '../components/CommentList';

type FormData = {
  chat_msg: string;
  chat_id: number;
};

const LandLoungeDetail = (props: any) => {
  const dispatch = useAppDispatch();
  const { LoungeId, url } = useParams();
  const { itemDetail, status, stickerItems, commentDataList } =
    useSelector(selectLounges);

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormData>();
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user_id');
  const [commentData, SetCommentData] = useState<any | []>(commentDataList);
  const [thankData, SetThankData] = useState<any | []>([]);
  const [showIcon, SetShowIcon] = useState<any | string>(true);
  const [chatMessage, setChatMessage] = useState();
  const [bookMark, SetBookMark] = useState<any | string>(false);
  const [thankYou, SetThankYou] = useState<any | string>(false);

  const [flagType, setFlagType] = useState<any | string>('C');
  const [flagAction, setFlagAction] = useState<any | string>('move-silent');

  const user_id = localStorage.removeItem('userid');
  // const user_name = localStorage.removeItem('user_name');
  const onClickIcon = () => {
    SetShowIcon(!showIcon);
  };
  let navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(fetchLoungeDetails({ LoungeId })).then((res: any) => {
      SetCommentData(res.payload[0].comments);
      SetThankData(res.payload[0].thanks);
      //console.log(res.payload[0].isbookmark?.status)
      res.payload[0].isbookmark?.status == 1 && SetBookMark(true);
      res.payload[0].isthankyou?.status == 1 && SetThankYou(true);
    });
  }, [LoungeId]);

  useEffect(() => {
    let emojiData: any = null;
    dispatch(fetchStickerLounges({ emojiData }));
  }, [user_id]);

  function converDate(datevalue: any) {
    const date = new Date(datevalue);
    const formattedDate = date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    return formattedDate;
  }

  /* 
function clickable_link(text:any)
{

let newtext:any = text.replace('#(script|about|applet|activex|chrome):#is', "\\1:", text);

// pad it with a space so we can match things at the start of the 1st line.
let ret = ' '+newtext;

// matches an "xxxx://yyyy" URL at the start of a line, or after a space.
// xxxx can only be alpha characters.
// yyyy is anything up to the first space, newline, comma, double quote or <
ret = ret.replace("#(^|[\n ])([\w]+?://[\w\#$%&~/.\-;:=,?@\[\]+]*)#is", "\\1<a href=\"\\2\" target=\"_blank\">\\2</a>");

// matches a "www|ftp.xxxx.yyyy[/zzzz]" kinda lazy URL thing
// Must contain at least 2 dots. xxxx contains either alphanum, or "-"
// zzzz is optional.. will contain everything up to the first space, newline,
// comma, double quote or <.
ret = ret.replace("#(^|[\n ])((www|ftp)\.[\w\#$%&~/.\-;:=,?@\[\]+]*)#is", "\\1<a href=\"http://\\2\" target=\"_blank\">\\2</a>");

// matches an email@domain type address at the start of a line, or after a space.
// Note: Only the followed chars are valid; alphanums, "-", "_" and or ".".
ret = ret.replace("#(^|[\n ])([a-z0-9&\-_.]+?)@([\w\-]+\.([\w\-\.]+\.)*[\w]+)#i", "\\1<a href=\"mailto:\\2@\\3\">\\2@\\3</a>");

// Remove our padding..
ret = ret.substr(1);
return ret;
}
  const onThankyou = (LoungeId:any) => {

    dispatch<any> (postThankyou({LoungeId})).then((res:any) => {
      //reset()
    res.payload.data[0].message =='Added' ? SetThankYou(true) :SetThankYou(false);
     SetThankData([])
     SetThankData(res.payload.data[0].thankdata)
     //res.payload[0].isthankyou?.status ==1 && SetThankYou(true) 
      })
     
   
   };


   const onLoungeFlag = (LoungeId:any,Type:any,Action:any,ReportedId:any) => {

    dispatch<any> (postLoungeFlag({LoungeId,Type,Action,ReportedId})).then((res:any) => {
    
      })
     
   
   };


   const onRemoveFlag = (ban_chat_id:any) => {

    dispatch<any> (removeUserLounge({ban_chat_id})).then((res:any) => {
    
      })
     
   
   };

   const onBookMark = (LoungeId:any) => {

    dispatch<any> (postBookMark({LoungeId})).then((res:any) => {
      //reset()
     console.log(res.payload.data[0].message);
     
     res.payload.data[0].message =='Added' ? SetBookMark(true) :SetBookMark(false);



      })
     
   
   };
 */

  const onSubmit = (data: any) => {
    if (token != null) {
      const chat_msg = getValues('chat_msg');

      chat_msg != ''
        ? dispatch<any>(postLoungeComment(data)).then((res: any) => {
            if (res.payload.message != undefined) {
              window.alert(res.payload.message);
              window.location.reload();
            } else {
              reset();
              //console.log(res.payload);
              let data: any = null;

              let up = document.getElementsByClassName('ql-editor');
              up[0].innerHTML = '';

              //dispatch<any>(addSticker(data));

              // dispatch(fetchLoungeDetails({ LoungeId }))

              SetCommentData((commentData: any) => [
                ...commentData,
                res.payload.data.commentdata[0],
              ]);
            }
          })
        : alert('Please enter comment');
    } else {
      navigate('/disneyland/login');
    }
  };

  function converTime(datevalue: any) {
    const date = new Date(datevalue);
    const formattedDate = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    });
    return formattedDate;
  }

  function getWords(str: any) {
    const result = str.split(/\s+/).slice(0, 5).join(' ');
    return result;
  }

  /* const formatText = (text: any) => {
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

  return (
    <>
      <div className='mid-main'>
        <div className='container'>
          <div className='mid-sec'>
            <div className='banner-img'>
              <Link to={`/disneyland/lounge`}>
                <img
                  src={midBanner}
                  className='img-fluid'
                  alt='mid-banner-img'
                />
              </Link>
            </div>
            <div>
              {status === 'error' ? (
                <div className='content__error-info'>
                  <h2>Error</h2>
                  <p>Please try to open the page later.</p>
                </div>
              ) : (
                <div className='mid-card-sec mobile-card-sec'>
                  {status === 'loading'
                    ? [...new Array(9)].map((_, index) => (
                        <Placeholder key={index} />
                      ))
                    : itemDetail?.map((obj) => (
                        <div
                          className='card-m rounded card-m2'
                          key={obj.chat_id}
                        >
                          <div className='card-s-img justify-content-between d-flex'>
                            <div className='small-box d-flex'>
                              <div className='small-c'>
                                <a>
                                  <img
                                    src={
                                      GET_BASE_URL_IMAGE +
                                      '/disneyland/images/thumbs/' +
                                      obj.user.image +
                                      dTime
                                    }
                                    className='img-fluid'
                                    alt={obj.user.user_name}
                                  />
                                </a>
                              </div>
                              <div className='small-tt'>
                                <h6>
                                  {' '}
                                  <Link
                                    to={`/disneyland/user/${obj.user?.user_id}/mypost`}
                                  >
                                    {obj.user?.user_name}
                                  </Link>
                                </h6>
                                <span>
                                  {obj.user.position} #{obj.user.totalpoints}{' '}
                                  Quality #{obj.user.rank}
                                </span>
                                <p>{converDate(obj.chat_time)}</p>
                              </div>
                            </div>

                            <>
                              <Helmet>
                                <title property='og:title'>
                                  {getWords(obj.chat_msg)}
                                </title>
                                <meta
                                  property='og:description'
                                  content={obj.chat_msg}
                                  name='description'
                                />
                                <meta
                                  name='keywords'
                                  content={getWords(obj.chat_msg)}
                                />
                                <meta
                                  property='fb:app_id'
                                  content='152066798153435'
                                />
                                <meta property='og:type' content='website' />
                                <meta
                                  property='og:site_name'
                                  content='MouseWait'
                                />
                                <meta
                                  property='og:image'
                                  content={
                                    GET_BASE_URL_IMAGE +
                                    '/disneyland/chat_images/' +
                                    obj.chat_img
                                  }
                                />
                                <meta
                                  property='og:url'
                                  content={
                                    GET_BASE_URL_IMAGE +
                                    `/disneyland/lands-talk/${obj.chat_id}/${obj.chat_msg}`
                                  }
                                />
                              </Helmet>
                            </>

                            <div>
                              <ToggleMenu
                                onSubmit={onSubmit}
                                register={register}
                                handleSubmit={handleSubmit}
                                setValue={setValue}
                                isLoading={''}
                                LoungeId={obj.chat_id}
                                username={obj.user.user_name}
                                userid={obj.user.user_id}
                                getThankYou={
                                  obj.isthankyou?.status == '1' ? true : false
                                }
                                getBookMark={
                                  obj.isbookmark?.status == '1' ? true : false
                                }
                                editType={
                                  obj.user?.user_id == user ? true : false
                                }
                                chat_reply_msg={obj.chat_msg}
                                pageName={'Detail'}
                                lock={obj.islock == '0' ? 'Lock' : 'UnLock'}
                                chatRoomId={obj.chat_room_id}
                                getStick={
                                  obj.checksticky == null ? 'Stick' : 'UnStick'
                                }
                                getSubscribe={
                                  obj.subscribepost?.user_id == user &&
                                  obj.subscribepost != null
                                    ? false
                                    : true
                                }
                              />
                            </div>
                          </div>
                          <div className='card-img-b my-2'>
                            {obj.chat_img.includes('c_img') && (
                              <img
                                src={
                                  GET_BASE_URL_IMAGE +
                                  '/disneyland/chat_images/' +
                                  obj.chat_img
                                }
                                className='card-img-top img-fluid'
                                alt='img'
                              />
                            )}
                          </div>

                          <div className='card-body '>
                            <h6>{removeTags(obj.chat_msg)}</h6>
                            {commentData?.map((cmt: any, index: any) => (
                              <>
                                <CommentList
                                  cmt={cmt}
                                  chatId={obj.chat_id}
                                  replyShow={false}
                                  stickerData={stickerItems}
                                />
                              </>
                            ))}
                          </div>

                          <div className='card-body'>
                            {/*    {showIcon==true &&
                    <div className="link-img-s">
                      <div className="link-main">
                        <div className="img-l" onClick={()=>onLoungeFlag(LoungeId,flagType,flagAction,user_id)}>
                          
                            <i className="fa-solid fa-flag" /> Flag
                        
                        </div>
                        <div className="img-l"   onClick={()=>onThankyou(LoungeId)}
                        >
                          
                            <i className="fa-solid fa-star" /> 
                            {thankYou ==true ? ' Thanked' : ' Thank You!'} 
                        </div>
                        <div className="img-l" onClick={()=>onBookMark(LoungeId)}>
                        
                    <i className="fa-solid fa-bookmark"  />   
                      {bookMark ==true ? ' Bookmarked' : ' Bookmark'}    
                          
                        </div>
                        <div className="img-l">
                         
                            <i className="fa-solid fa-xmark" onClick={()=>onRemoveFlag(LoungeId)}  /> Remove
                    
                        </div>
                      </div>
                    </div>
                  } */}

                            {/* <form
                                className="space-y-6"
                                onSubmit={handleSubmit(onSubmit)}
                                method="POST"
                              >
                    <div className="com-box-main">
                      <div className="com-box d-flex">
                        <textarea className="form-control"
                          {...register("chat_msg")} rows={3} 
                      
                          />

                  <input type="hidden" readOnly={true} {...register("chat_id")} 
                    defaultValue={obj.chat_id}/> 
                        <a href="">
                          <img
                            src={stickerImage}
                            className="com-imgg  img-fluid"
                            alt="img"
                          />
                        </a>
                      </div>
                      <div className="post">
                      {token!=null ? <input type="Submit"  defaultValue="Post"/> 
                        :<input type="Submit" disabled defaultValue="Post"/> }
                      
                      </div>
                    </div>
                    </form> */}
                            <div className='thank-sec'>
                              <div className='thank-t d-flex'>
                                <h6>
                                  {thankData.length > 0 ? (
                                    <> Thanked by:</>
                                  ) : (
                                    <></>
                                  )}

                                  {thankData?.map((data: any, index: any) => (
                                    <span key={index}>
                                      <Link
                                        to={`/disneyland/user/${data.user_id}/mypost`}
                                      >
                                        {data.user.user_name}
                                      </Link>
                                    </span>
                                  ))}
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  <div className='search-comm-sec'>
                    <CommentBox
                      chatId={LoungeId}
                      onSubmit={onSubmit}
                      register={register}
                      handleSubmit={handleSubmit}
                      stickerData={stickerItems}
                      setValue={setValue}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandLoungeDetail;
