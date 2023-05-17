import { Link } from 'react-router-dom';
import { FcUndo } from 'react-icons/fc';
import css from './Back.module.css';

const Back = ({ location }) => {
  return (
    <Link to={location} className={css.back}>
      <FcUndo />
      Go back
    </Link>
  );
};

export default Back;