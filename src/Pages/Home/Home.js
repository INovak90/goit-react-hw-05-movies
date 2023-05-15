import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FetchPopularFilms } from '../../components/Api';
import { ColorRing } from 'react-loader-spinner';
import css from './Home.module.css';

const Home = () => {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    async function FetchData() {
      try {
        setIsLoading(true);
        const response = await FetchPopularFilms();
        setFilms(response);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    FetchData();
  }, []);

  return (
    <section className={css.home}>
      {isLoading && (
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      )}
      <ul className={css['movie-list']}>
        {films.map(film => (
          <li key={film.id} className={css['movie-item']}>
            <Link
              className={css['movie-text']}
              to={`/movies/${film.id}`}
              state={{ from: location }}
            >
              {film.original_title ? (
                <p className={css['movie-title']}>{film.original_title}</p>
              ) : (
                <p className={css['movie-title']}>{film.name}</p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Home;
