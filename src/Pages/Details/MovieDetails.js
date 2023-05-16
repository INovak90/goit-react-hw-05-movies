import { Link, Outlet, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { FcUndo } from 'react-icons/fc';
import { FetchDetails } from '../../components/Api';
import { Suspense } from 'react';
import { ColorRing } from 'react-loader-spinner';
import placeHolder from '../../image/placeholder.jpg';
import css from './MovieDetails.module.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [moviesDetails, setMoviesDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const currentLocation = useLocation();
  const location = useRef(currentLocation.state);
  useEffect(() => {
    async function FetchData() {
      try {
        if (!movieId) {
          return;
        }
        setIsLoading(true);
        const response = await FetchDetails(movieId);
        setMoviesDetails(response);
        setIsLoading(false);
      } catch (error) {
        setError(
          'Sorry something went wrong, please reload the page, or go back.'
        );
      } finally {
        setIsLoading(false);
      }
    }
    FetchData();
  }, [movieId]);

  return (
    <>
      <section className={css.details}>
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
        <Link to={location.current.from} className={css.back}>
          <FcUndo />
          Go back
        </Link>
        {moviesDetails ? (
          <div className={css['box-details']}>
            {!moviesDetails.poster_path ? (
              <img className={css.image} src={placeHolder} alt="placeHolder" />
            ) : (
              <img
                className={css.image}
                src={`https://image.tmdb.org/t/p/w500${moviesDetails.poster_path}`}
                alt="backdrop_path"
              />
            )}

            <div className={css['box-info']}>
              <h1>{moviesDetails.original_title}</h1>
              <p>User Score: {Math.round(moviesDetails.vote_average * 10)}%</p>
              <h2>Overview</h2>
              <p>{moviesDetails.overview}</p>
              <h2>Genres</h2>
              <p>{moviesDetails.genres.map(genre => genre.name).join(' ')}</p>
            </div>
          </div>
        ) : (
          <p>{error}</p>
        )}
      </section>

      <section className={css['about-movies']}>
        <h2>Additional information</h2>
        <ul className={css['about-list']}>
          <li>
            <Link
              to="cast"
              className={`${
                currentLocation.pathname.includes('cast')
                  ? css.active
                  : css.cast
              }`}
              // state={{ from: location.current }}
            >
              Cast
            </Link>
          </li>
          <li>
            <Link
              to="reviews"
              className={`${
                currentLocation.pathname.includes('reviews')
                  ? css.active
                  : css.cast
              }`}
              // state={{ from: location.current }}
            >
              Reviews
            </Link>
          </li>
        </ul>
      </section>
      <Suspense
        fallback={
          <div>
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </>
  );
};

export default MovieDetails;
