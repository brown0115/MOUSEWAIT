import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../redux/store';
import {
  postLoungeCommentReply,
  postLoungeCommentEdit,
  fetchLoungeDetails,
  fetchStickerLounges,
  addSticker,
} from '../redux/lounges/slice';
import stickerImage from '../assets/img/stickers.jpg';
import { StickerTabs } from '../components/StickerTabs';
import { selectLounges } from '../redux/lounges/selectors';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { removeUserLounge } from '../redux/lounges/slice';

type EditBoxPropsType = {
  replyData: any;

  chatId: any;
  chat_reply_id: any;
  stickerData: any;
  id: any;
  editbox: boolean;
  type: string;
  chat_reply_msg: string;
};
type FormData = {
  chat_reply_msg: string;
  chat_id: number;
  chat_reply_id: number;
  type: string;
  id: number;
};

export const EditBox: React.FC<EditBoxPropsType> = ({
  replyData,

  chatId,
  chat_reply_id,
  stickerData,
  editbox,
  type,
  chat_reply_msg,
  id,
}) => {
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormData>();
  const dispatch = useAppDispatch();
  const modules = {
    toolbar: false,
  };

  const { stickerPickItems } = useSelector(selectLounges);

  //const [commentData, SetCommentData] = useState<any | []>(replyData);
  const [showSticker, SetShowSticker] = useState<any | string>(false);
  const [stickerSelection, SetStickerSelection] = useState<any | string>('');
  //const [edittype, SetEditType] = useState<any | string>('C');
  const token = localStorage.getItem('token');
  const loginuserid = localStorage.getItem('user_id');
  useEffect(() => {
    SetStickerSelection(stickerPickItems.toString());
  }, [stickerPickItems]);

  if (editbox == true) {
    /*  console.log('9999');
    console.log(stickerSelection); */
    if (stickerSelection == '') {
      SetStickerSelection(chat_reply_msg);
    }
  }

  const onEditorStateChange = (editorState: any) => {
    /*  console.log(editorState);
    console.log(chat_reply_msg); */
    //if(editorState == '')
    setValue('chat_reply_msg', editorState);
  };

  const openSticker = () => {
    SetShowSticker(!showSticker);
  };

  const { LoungeId, url } = useParams();
  const [Notify, setIsNotify] = useState<any | string>();

  const onSubmit = (data: any) => {
    const chat_reply_msg = getValues('chat_reply_msg');
    /* console.log(chat_reply_msg);
    return false; */
    chat_reply_msg != ''
      ? dispatch<any>(postLoungeCommentEdit(data)).then((res: any) => {
          reset();
          SetStickerSelection(null);
          window.location.reload();
          Notify(toast('Updated Successfully'));
          // console.log(res);
          //dispatch(fetchLoungeDetails({ LoungeId }));
          /*    reset();
          SetCommentData(res.payload.data.replydata);
          let data: any = null;
          dispatch<any>(addSticker(data));
          SetStickerSelection(null); */
        })
      : alert('Please enter comment');
  };

  return (
    <>
      {editbox == true && (
        <div>
          <div
            className='editbox'
            style={{
              padding: '10px',
            }}
          >
            {type === 'C' ? (
              <h6 style={{ textAlign: 'center', color: 'red' }}>
                You Are Editing Comment
              </h6>
            ) : (
              <h6 style={{ textAlign: 'center', color: 'red' }}>
                You Are Editing Reply
              </h6>
            )}

            <form
              className='space-y-6'
              onSubmit={handleSubmit(onSubmit)}
              method='POST'
            >
              <div className='com-box-main'>
                <div className='com-box d-flex'>
                  <ReactQuill
                    theme='snow'
                    className='form-control'
                    modules={modules}
                    onChange={onEditorStateChange}
                    value={stickerSelection}
                    placeholder='Type your comment here...'
                  />

                  <input
                    type='hidden'
                    readOnly={true}
                    {...register('chat_id')}
                    defaultValue={chatId}
                  />
                  <input
                    type='hidden'
                    readOnly={true}
                    {...register('chat_reply_id')}
                    defaultValue={chat_reply_id}
                  />
                  <input
                    type='hidden'
                    readOnly={true}
                    {...register('type')}
                    defaultValue={type}
                  />
                  <input
                    type='hidden'
                    readOnly={true}
                    {...register('id')}
                    defaultValue={id}
                  />
                  <div className='icon-ic d-flex'>
                    <div
                      className='icon-ic0'
                      onClick={handleSubmit(onSubmit)}
                    ></div>
                    <div className='icon-ic1' onClick={openSticker}></div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          {showSticker == true && (
            <div>
              <StickerTabs tabData={stickerData} />
            </div>
          )}{' '}
        </div>
      )}
    </>
  );
};