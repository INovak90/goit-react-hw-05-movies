import { FetchSearchQueryFilms } from 'components/Api';
import { useState, useEffect, Suspense } from 'react';
import {
  Link,
  Outlet,
  useSearchParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { FcSearch } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { ColorRing } from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';
import css from './Movies.module.css';
import styled from '../Home/Home.module.css';
import Back from 'components/Back/Back';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams('');

  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [submit, setSubmit] = useState(true);

  const query = searchParams.get('query') ?? '';
  const location = useLocation();
  const navigate = useNavigate();

  const updateQueryString = e => {
    if (e.target.value === '') {
      return setSearchParams({});
    }
    setSubmit(false);
    setSearchParams({ query: e.target.value });
  };

  const onSubmitForm = e => {
    e.preventDefault();
    if (query.trim() === '') {
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
    setSubmit(true);
  };

  useEffect(() => {
    async function FetchData() {
      try {
        if (!submit) {
          return;
        }
        if (query !== '') {
          setIsLoading(true);
          const response = await FetchSearchQueryFilms(query);
          setMovies(response);
          if (response.length === 0) {
            navigate('/movies', { replace: true });
            return toast.error(
              'Nothing was found according to your request !',
              {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
              }
            );
          }
        }
        setIsLoading(false);
      } catch (error) {
        navigate('/', { replace: true });
        toast.error('Something went wrong, please reload the page.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      } finally {
        setIsLoading(false);
        setSubmit(false);
      }
    }
    FetchData();
  }, [navigate, query, submit]);
  return (
    <>
      <section className={css.movies}>
        <Back location={'/'} />
        <form onSubmit={onSubmitForm} className={css.form}>
          <label>
            <input
              onChange={updateQueryString}
              className={css.input}
              value={query}
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
