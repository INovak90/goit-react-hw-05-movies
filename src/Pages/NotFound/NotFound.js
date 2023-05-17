import styled from './NotFound.module.css';
import notFoundImage from '../../image/not-found.jpg';
import Back from 'components/Back/Back';

const NotFound = () => {
  return (
    <section className={styled.sectionNotFound}>
      <Back location={'/'} />
      <div className={styled.boxNotFound}>
        <h1>Sorry the page not found. Please return homepage, click back.</h1>
        <div>
          <img src={notFoundImage} alt="notFoundImage" />
        </div>
      </div>
    </section>
  );
};

export default NotFound;
