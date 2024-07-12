import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const BackButton = ({ destination = '/' }) => {
  return (
    <div className='flex'>
      <Link
        to={destination}
        className="bi bi-back"
      >
        <BsArrowLeft className='text-2xl w-4' />

      </Link>
    </div>
  )
}

export default BackButton