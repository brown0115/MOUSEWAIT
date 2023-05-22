import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LoungeHeader } from './LoungeHeader';
import { MobileLoungeHeader } from './MobileLoungeHeader';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../redux/store';
import { fetchByComposerEditor, composerPost } from '../redux/lounges/slice';
import { RiContactsBookLine } from 'react-icons/ri';

function MwAdvanceEditor() {
  type FormData = {
    edit_chat_msg: any;
    file: any;
    youtubelink: any;
    fullsizepic: any;
    mediumsizepic: any;
    thumbnailfile: any;
    selectbar: any;
    chat_id: any;
  };

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const dispatch = useAppDispatch();
  const editor = useRef(null);
  let navigate = useNavigate();
  const post_editor = localStorage.getItem('editor');
  const [content, setcontent] = useState('');

  const { LoungeId } = useParams();

  const loginuserid = localStorage.getItem('user_id');

  const [getData, SetGetData] = useState<any | []>([]);
  const loadDataOnlyOnce = () => {
    dispatch(fetchByComposerEditor({ LoungeId })).then((res: any) => {
      SetGetData(res.payload[0]);
    });
  };

  useEffect(() => {

  if(!post_editor)
    {
      navigate('/disneyland/login');
    }
    else {
      window.scrollTo(0, 0);
      loadDataOnlyOnce(); // this will fire only on first render
    }

    
  }, []);

  const onEditorStateChange = (editorState: any) => {
    setValue('edit_chat_msg', editorState.replace(/<(.|\n)*?>/g, ''));
  };

  const onSubmit = (data: any) => {
    /*   console.log(data);
    return false; */
    dispatch<any>(composerPost(data)).then((res: any) => {
      /*  console.log(res);
      return false; */
      navigate('/disneyland/lounge/');
    });
  };

  return (
    <div>
      <div className='mid-main'>
        <div className='container'>
          <div className='mid-sec mwstore-page-bg'>
            <LoungeHeader />
            <MobileLoungeHeader />
            {/*-=====mobile-view start ======-*/}

            <div className='mwstore-mid-bg'>
              <section className='editor'>
                <form
                  action=''
                  style={{ paddingTop: '13px' }}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className='advance_editor'>
                    {/*      <JoditEditor
                      ref={editor}
                      value={getData.chat_msg}
                      onChange={onEditorStateChange}
                    /> */}
                  </div>

                  <div className='mid-container'>
                    <div className='choosefile'>
                      <input type='file' {...register('file')} />
                    </div>
                    <div className='youtubelink'>
                      <label htmlFor='youtube link'>Youtube Video link:</label>
                      <br />
                      <textarea
                        style={{
                          border: '1px solid grey',
                          width: '70%',
                          marginTop: '1rem',
                          borderRadius: '5px',
                        }}
                        // rows={3}

                        {...register('youtubelink')}
                        placeholder='Youtube Link'
                        // defaultValue={chat_reply_msg}
                        /* {...register("Type")} {...register("LoungeId")} */
                      />
                    </div>

                    <input
                      type='hidden'
                      defaultValue={LoungeId}
                      {...register('chat_id')}
                    />

                    <input type='hidden' {...register('edit_chat_msg')} />

                    <div className='fullpicsize'>
                      <label className='input_label' htmlFor='fullpicsize'>
                        Full Size Picture
                      </label>{' '}
                      &nbsp; &nbsp;&nbsp; &nbsp;
                      <input type='file' id='' {...register('fullsizepic')} />
                    </div>
                    <div className='mediumpicsize'>
                      <label className='input_label' htmlFor='mediumpicsize'>
                        Medium Size Picture
                      </label>
                      <input type='file' id='' {...register('mediumsizepic')} />
                    </div>
                    <div className='ThumbnailPicture'>
                      <label className='input_label' htmlFor='ThumbnailPicture'>
                        Thumbnail Picture
                      </label>{' '}
                      &nbsp; &nbsp;
                      <input type='file' id='' {...register('thumbnailfile')} />
                    </div>
                    <select
                      style={{ width: '50%', marginBottom: '8px' }}
                      className='form-select form-select-sm'
                      aria-label='.form-select-sm example'
                      {...register('selectbar')}
                    >
                      <option selected>Open this select menu</option>
                      <option value='one'>One</option>
                      <option value='two'>Two</option>
                      <option value='three'>Three</option>
                    </select>
                    <div className='submit' style={{ margin: '1rem 30%' }}>
                      <button type='submit' className='btn btn-primary'>
                        Post
                      </button>
                    </div>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MwAdvanceEditor;
