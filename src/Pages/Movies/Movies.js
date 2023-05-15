import { FetchSearchQueryFilms } from 'components/Api';
import { useState, useEffect, Suspense } from 'react';
import { Link, Outlet, useSearchParams, useLocation } from 'react-router-dom';
import { FcSearch, FcUndo } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { ColorRing } from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';
import css from './Movies.module.css';
import styled from '../Home/Home.module.css';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams('');
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const query = searchParams.get('query');
  const location = useLocation();

  const onSubmitForm = e => {
    e.preventDefault();
    const value = e.target.elements.query.value;
    if (value.trim() === '') {
      return toast('Your request is bad!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
    setSearchParams({ query: value.toLocaleLowerCase() });
    setMovies(null);
  };
  useEffect(() => {
    async function FetchData() {
      try {
        if (query === null) {
          return;
        }

        setIsLoading(true);
        const response = await FetchSearchQueryFilms(query);
        setMovies(response);
        if (response.length === 0) {
          return toast.error('Nothing was found according to your request !', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    FetchData();
  }, [query]);
  return (
    <>
      <section className={css.movies}>
        <Link to="/" className={css.back}>
          <FcUndo />
          Go back
        </Link>
        <form onSubmit={onSubmitForm} className={css.form}>
          <label>
            <input
              className={css.input}
              name="query"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search movies"
            />
          </label>
          <button type="submit" aria-label="search" className={css.search}>
            <FcSearch />
            Search
          </button>
        </form>

        <ul className={styled['movie-list']}>
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
          {movies &&
            movies.map(movie => (
              <li key={movie.id} className={styled['movie-item']}>
                <Link
                  className={styled['movie-text']}
                  to={`${movie.id}`}
                  state={{ from: location }}
                >
                  <p>{movie.title}</p>
                </Link>
              </li>
            ))}
        </ul>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </section>
    </>
  );
};

export default Movies;
