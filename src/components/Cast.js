import { FetchCast } from './Api';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import placeHolder from '../image/placeholder.jpg';
import css from './Cast.module.css';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
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
          const response = await FetchCast(movieId);
          setCast(response);
        }
      } catch (error) {
        console.log(error);
      }
    }
    FetchData();
  }, [movieId]);

  return (
    <section className={css['section-cast']}>
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
