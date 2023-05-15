import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FetchPopularFilms } from '../../components/Api';
import css from './Home.module.css';

const Home = () => {
  const [films, setFilms] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    async function FetchData() {
      try {
        const response = await FetchPopularFilms();
        setFilms(response);
      } catch (error) {
        console.log(error);
      }
    }
    FetchData();
  }, []);

  return (
    <section className={css.home}>
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
