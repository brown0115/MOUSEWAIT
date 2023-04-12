import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { MdMessage } from 'react-icons/md';
import { selectLounges } from '../redux/lounges/selectors';
import axios, { AxiosResponse } from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

import {
  AiOutlineTag,
  AiOutlineCloseCircle,
  AiOutlineMessage,
} from 'react-icons/ai';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

import {
  fetchAllTaglists,
  sendDmMessage,
  assignTagToPost,
  fetchLounges,
  fetchUserLounges,
} from '../redux/lounges/slice';

type TagMePropsType = {
  isOpen: any;
  isClosed: any;
  TagDatas: any;
  chatId: any;
  Page: any;
};

export const TagMe: React.FC<TagMePropsType> = ({
  isOpen,
  isClosed,
  TagDatas,
  chatId,
  Page,
}) => {
  type FormData = {
    checkedId: any;
    chatId: any;
    // sender_id: any;
    // sender_user_name: String;
  };
  let navigate = useNavigate();
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [TagList, setTagLists] = useState<any | string>('');
  const [closeToggle, setCloseToggle] = useState<any | String>(isClosed);

  const closeTagToggle = () => {
    setCloseToggle(isClosed);
  };

  const dispatch = useAppDispatch();
  let tagData: any = null;

  const [ListsOfdata, setListsOfdatas] = useState<any | String>(TagDatas);

  const checktagged = (id: any) => {
    // let checked = e.target.checked
    // console.log(checked)
    //console.log(id);
  };
  const { sortByTime } = useSelector(selectLounges);
  let sortType: any = null;
  let currentPage: any = null;
  let searchValue: any = null;
  let LoungeId: any = null;

  const [shortByTime, setShortByTime] = useState<any | string>(
    localStorage.getItem('shortByTime')
  );

  useEffect(() => {
    sortByTime != '' && setShortByTime(sortByTime);
  }, [sortByTime]);

  const onSubmit = (data: any) => {
    dispatch<any>(assignTagToPost(data)).then((res: any) => {
      window.location.reload();
    });
  };

  const [searchTag, setAllSearcTag] = useState<any | String>();
  async function search(key: any) {
    setListsOfdatas(key);
    if (key.length > 0) {
      let LoungeId: any = chatId;
      let tagData: any = key;
      dispatch(fetchAllTaglists({ tagData, LoungeId })).then((res: any) => {
        setAllSearcTag(res.payload);
      });
    }
  }

  const [checked, setChecked] = useState<any | string>(false);
  return (
    <div>
      {isOpen == true && (
        <>
          <div className='containerDialog'>
            <Dialog
              PaperProps={{
                sx: {
                  overflowY: 'inherit',
                  zIndex: '1',
                  width: '17rem',
                  height: '80%',
                },
              }}
              open={isOpen}
              onClose={isClosed}
            >
              <DialogContent>
                <form action='' onSubmit={handleSubmit(onSubmit)}>
                  <input
                    type='text'
                    className='inp'
                    placeholder='Search tag'
                    onChange={(e) => search(e.target.value)}
                  />
                  <input className='tag-submit' type='submit' />
                  <div className='closebutton'>
                    <div className='buttondialog'>
                      <AiOutlineCloseCircle
                        className='icon'
                        onClick={closeTagToggle}
                      />
                    </div>
                  </div>
                  <DialogContentText>
                    <ul className='list-group list-group-flush'>
                      {searchTag == undefined ? (
                        <>
                          {TagDatas &&
                            TagDatas.map((obj: any) => (
                              <div
                                style={{
                                  display: 'flex',
                                  paddingLeft: '8px',
                                  paddingTop: '5px',
                                }}
                              >
                                <input
                                  // onChange ={()=>checktagged(obj.id) }
                                  style={{ marginRight: '9px' }}
                                  type='checkbox'
                                  defaultChecked={
                                    obj.gettagdata != '' ? true : false
                                  }
                                  value={obj.id}
                                  {...register('checkedId')}
                                />
                                <li>{obj.tags_name}</li>
                                <input
                                  type='hidden'
                                  value={chatId}
                                  {...register('chatId')}
                                />
                              </div>
                            ))}
                        </>
                      ) : (
                        <>
                          {' '}
                          {searchTag &&
                            searchTag.map((obj: any) => (
                              <div
                                style={{
                                  display: 'flex',
                                  paddingLeft: '8px',
                                  paddingTop: '5px',
                                }}
                              >
                                <input
                                  // onChange ={()=>checktagged(obj.id) }
                                  style={{ marginRight: '9px' }}
                                  type='checkbox'
                                  defaultChecked={
                                    obj.gettagdata != '' ? true : false
                                  }
                                  value={obj.id}
                                  {...register('checkedId')}
                                />
                                <li>{obj.tags_name}</li>
                                <input
                                  type='hidden'
                                  value={chatId}
                                  {...register('chatId')}
                                />
                              </div>
                            ))}
                        </>
                      )}
                    </ul>
                  </DialogContentText>
                </form>
              </DialogContent>
              <DialogActions></DialogActions>
            </Dialog>
          </div>
        </>
      )}
    </div>
  );
};

export default TagMe;
