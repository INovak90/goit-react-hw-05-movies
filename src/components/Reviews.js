import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FetchReviews } from './Api';
import css from './Reviews.module.css';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
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
          const response = await FetchReviews(movieId);
          setReviews(response);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    FetchData();
  }, [movieId]);
  return (
    <section className={css['section-reviews']}>
      <ul className={css['reviews-list']}>
        {reviews.length > 0 &&
          reviews.map(review => {
            return (
              <li key={review.id} className={css['reviews-item']}>
                <h2 className={css['reviews-title']}>{review.author}</h2>
                <p>{review.content}</p>
              </li>
            );
          })}
        {reviews === [] && !isLoading && (
          <p>We don`t have any reviews from this movie.</p>
        )}
      </ul>
    </section>
  );
};

export default Reviews;
