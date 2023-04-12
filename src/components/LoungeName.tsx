import { Link, useNavigate, useParams } from 'react-router-dom';
type LoungeNamePropsType = {
  Time: any;
  Roomid: any;
};

export const LoungeName: React.FC<LoungeNamePropsType> = ({ Time, Roomid }) => {
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
  return (
    <>
      <div className='d-flex'>
        {' '}
        <p>{converDate(Time)}</p>{' '}
        {Roomid == '7' ? (
          <Link to={`/disneyland/lounge`}>
            <p className='my-dis'>Disneyland-Talk</p>
          </Link>
        ) : Roomid == '1' ? (
          <Link to={`/disneyland/lands/1/Disneyland-Real-Time/`}>
            <p className='my-dis'>Disneyland-Real-Time</p>
          </Link>
        ) : Roomid == null || Roomid == '0' ? (
          <Link to={`/disneyland/lands/0/the-hub/`}>
            <p className='my-dis'>The-Hub</p>
          </Link>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
