import { Link, useParams } from 'react-router-dom';

import Linkify from 'react-linkify';
type CommonPostMessagePropsType = {
  myChat: any;
  // chatType: any;
};

function removeTags(string: any) {
  let newstring = string
    ?.replace(/<[^>]*>/g, ' ')
    ?.replace(/\s{2,}/g, ' ')
    ?.trim();
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
export const CommonPostMessage: React.FC<CommonPostMessagePropsType> = ({
  myChat
  // chatType
}) => {
  return (
    <>
      <h6>
        {/* {chatType == '0' ?
          <Linkify>{removeTags(myChat)}</Linkify>
        :  */}
          <Linkify><div dangerouslySetInnerHTML={{__html: myChat}}></div></Linkify>
        {/* } */}
      </h6>
    </>
  );
};
