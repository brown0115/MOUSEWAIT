import { useEffect, useState, useRef } from 'react';
// @ts-ignore
import { loadProgressBar } from 'axios-progress-bar';
import 'axios-progress-bar/dist/nprogress.css';
import { Link, useNavigate } from 'react-router-dom';
import { postLounge, fetchLounges } from '../redux/lounges/slice';
import Modal from 'react-modal';
import { useAppDispatch } from '../redux/store';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectLounges } from '../redux/lounges/selectors';
import CircularProgress from '@mui/material/CircularProgress';
import { isMobile } from 'react-device-detect';
import Post from '../assets/img/h-p.png';
import { getValue } from '@testing-library/user-event/dist/utils';
// import ProgressBar from "@ramonak/react-progress-bar";
type LoungeBoxPropsType = {
  onSubmit: any;
  register: any;
  handleSubmit: any;
  setValue: any;
  isLoading: any;
  onCloseMenu: any;
  isVisible: any;
  setVisible: any;
};

type ProgressBarProps = {
  completed: number;
};

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    width: '100%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    background: '#F5F5F5',
    transform: 'translate(-50%, -50%)',
  },
};

export const LoungeBox: React.FC<LoungeBoxPropsType> = ({
  register,
  handleSubmit,
  setValue,
  onCloseMenu,
  isVisible,
  setVisible,
  //isLoading,
}) => {
  const [modalIsOpen, setIsOpen] = useState(isVisible);

  const [land, setLand] = useState<number | string>('7');

  const [file, setFile] = useState<number | string>();
  const [imagePreviewUrl, setImagePreviewUrl] = useState<any>();
  const loungland = localStorage.getItem('loungeland');
  const [text, setTextArea] = useState('');

  const {
    reset,
    formState: { errors },
  } = useForm<FormData>();

  let subtitle: any;

  function openModal() {
    onCloseMenu();
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  let navigate = useNavigate();

  // const { register, setValue, handleSubmit,getValues, formState: { errors } } = useForm<FormData>();

  const token = localStorage.getItem('token');

  const inputFile = useRef<HTMLInputElement | any>();

  const formelement = document.querySelector('form');

  function handleImageChange(e: any) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    if (file.type.match('image.*')) {
      reader.onloadend = () => {
        let result = reader.result;

        setFile(file);
        setImagePreviewUrl(result);

        setValue('chat_img', result);
      };

      reader.readAsDataURL(file);
    }
  }

  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };

  // const hide = ()=>{
  //   setIsOpen(false)
  // }

  useEffect(() => {
    setValue('chat_room_id', land);
  }, [land]);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<any | string>(false);
  let sortType: any = null;
  let LoungeId: any = null;
  let currentPage: any = null;
  let searchValue: any = null;

  const { items, status, sortByTime } = useSelector(selectLounges);

  const [shortByTime, setShortByTime] = useState<any | string>(
    localStorage.getItem('shortByTime')
  );
  useEffect(() => {
    sortByTime != '' && setShortByTime(sortByTime);
  }, [sortByTime]);

  function closeModal() {
    setLand('');
    setImagePreviewUrl('');
    setValue('chat_img', '');
    setValue('chat_msg', '');
    setIsOpen(false);
    setVisible(false);
  }

  const onSubmit = (data: any) => {
    if (token == null) {
      navigate('/disneyland/login');
    } else {
      //console.log(data);

      // setIsOpen(false);
      loadProgressBar();

      setIsLoading(true);
      dispatch<any>(postLounge(data)).then((res: any) => {
        // navigate('/disneyland/lounge/');
        closeModal();
        if (res.payload.data.message != undefined) {
          window.alert(res.payload.data.message);
        }

        setIsLoading(false);
        window.location.reload();
        /*      dispatch(
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

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <form
          className='space-y-6'
          onSubmit={handleSubmit(onSubmit)}
          method='POST'
        >
          <div className='row'>
            <div className='box-t-1'>
              <h6>New Post</h6>
              <div className='close-p' onClick={closeModal}>
                <i className='fa fa-close my-b' />
              </div>
              <div className='boxwidth'>
                {imagePreviewUrl ? (
                  <img
                    src={imagePreviewUrl}
                    style={{ width: 100, height: 100 }}
                  />
                ) : (
                  <p>
                    Earn MouseWait Credits and help the community by posting
                    quality family- friendly content to the Lounge. Please only
                    post Disney related pictures that you own -- NO GOOGLED
                    PICS! <br />
                    Thank You!
                  </p>
                )}

                <div className='plus-p'>
                  <i className='fa fa-plus my-b' onClick={onButtonClick} />

                  <input
                    id='fileinput'
                    ref={inputFile}
                    className='fileInput'
                    type='file'
                    onChange={(e) => handleImageChange(e)}
                  />
                </div>

                <div className='box-ttt'>
                  {/* <label for="story" class="w-50 m-auto justify-content-start">Tell us your story</label> */}
                  <textarea
                    rows={3}
                    cols={60}
                    // value={text}
                    // onChange={e => setTextArea(e.target.value) }
                    placeholder='write a caption '
                    {...register('chat_msg')}
                  />
                  <input
                    type='hidden'
                    setValue={land}
                    {...register('chat_room_id')}
                  />
                  <input
                    type='hidden'
                    setValue={file}
                    {...register('chat_img')}
                  />
                  <div className='box-li'>
                    <ul className='m-0 p-0' style={{ cursor: 'pointer' }}>
                      <li
                        style={land == 7 ? { backgroundColor: '#9BB8EF' } : {}}
                        onClick={() => setLand('7')}
                      >
                        DISNEYLAND TALK
                      </li>
                      <li
                        style={land == 1 ? { backgroundColor: '#9BB8EF' } : {}}
                        onClick={() => setLand('1')}
                      >
                        REALTIME TALK
                      </li>
                      <li
                        style={land == 0 ? { backgroundColor: '#9BB8EF' } : {}}
                        onClick={() => setLand('0')}
                      >
                        THE HUB{' '}
                      </li>

                      {loungland != '' ? (
                        <li
                          style={
                            land == 3 ? { backgroundColor: '#9BB8EF' } : {}
                          }
                          onClick={() => setLand('3')}
                        >
                          LOUNGΞLAND{' '}
                        </li>
                      ) : (
                        <></>
                      )}
                    </ul>
                  </div>
                  <div className='mw-post text-center'>
                    <Link to='/disneyland/lounge'></Link>

                    {isLoading == true ? (
                      <CircularProgress />
                    ) : (
                      /*  <input className='MW-btn' type='Submit' value='Loading' /> */
                      <input className='MW-btn' style={{backgroundColor: text == '' ? '#d8cccc' : '#9bb8ef', cursor: text == '' ? 'auto' : 'pointer'}} type='submit' value='Post' disabled={text == ''} ></input>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal>

      {isMobile ? (
        <li className='nav-item last-li my-link' onClick={openModal}>
          <div className='nav-icon'>
            <img src={Post} className='img-fluid' alt='img' />
            <a style={{ marginLeft: '15px' }} href='javascript:void(0)'>
              Post to the Lounge
            </a>
          </div>
        </li>
      ) : (
        
        <div className='plus-show-btn' onClick={openModal}>
          <button className='plus-show'>
            <i className='fa fa-plus plus-i'></i>
          </button>
        </div>
      )}
    </div>
  );
};
