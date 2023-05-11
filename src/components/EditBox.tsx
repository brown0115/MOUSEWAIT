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

  const textRef = useRef(null);

  const onClickSticker = (data: any) => {
    let editor = (textRef.current  as any ).getEditor();
    var range = editor.getSelection();
    let position = range ? range.index : editor.getLength()-1;
    
    var rte = document.getElementById('my-rich-text-editor'); // Replace with the ID of your Rich Text Editor
    rte?.focus();
    var imageSrc = data;
    editor.insertEmbed(position, 'image', imageSrc);
    editor.setSelection(position + 1, 0);
  }

  if (editbox == true) {
    if (stickerSelection == '') {
      SetStickerSelection(chat_reply_msg);
    }
  }

  const openSticker = () => {
    SetShowSticker(!showSticker);
  };

  const { LoungeId, url } = useParams();
  const [Notify, setIsNotify] = useState<any | string>();

  const onSubmit = (data: any) => {

    data['chat_reply_msg'] = stickerSelection; 
    console.log('stickerSelection', stickerSelection);   
     /* return false; */
     stickerSelection != '<p><br></p>' && stickerSelection != ''
      ? dispatch<any>(postLoungeCommentEdit(data)).then((res: any) => {
          reset();
          SetStickerSelection(null);
          window.location.reload();
          Notify(toast('Updated Successfully'));
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
                Edit
              </h6>
            ) : (
              <h6 style={{ textAlign: 'center', color: 'red' }}>
                Edit
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
                    onChange={SetStickerSelection}
                    value={stickerSelection}
                    placeholder='Add your magic...'
                    ref={textRef}
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
              <StickerTabs tabData={stickerData} onClickSticker={onClickSticker}/>
            </div>
          )}{' '}
        </div>
      )}
    </>
  );
};
