import { FetchCast } from './Api';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import placeHolder from '../image/placeholder.jpg';
import css from './Cast.module.css';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const firstUpdate = useRef(true);

  useEffect(() => {
    async function FetchData() {
      try {
        if (!movieId) {
          return;
        }
        if (firstUpdate.current) {
          firstUpdate.current = false;
        } else {
          setIsLoading(true);
          const response = await FetchCast(movieId);
          setCast(response);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    FetchData();
  }, [movieId]);

  return (
    <section className={css['section-cast']}>
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
      <ul className={css['cast-list']}>
        {cast &&
          cast.map(actor => (
            <li key={actor.id} className={css['cast-item']}>
              {actor.profile_path ? (
                <img
                  className={css['cast-image']}
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  alt=""
                />
              ) : (
                <img
                  src={placeHolder}
                  alt="placeHolder"
                  className={css['cast-image']}
                />
              )}
              <div className={css['box-actor']}>
                <p>{actor.name}</p>
                <p>Character: {actor.character}</p>
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
};
export default Cast;
