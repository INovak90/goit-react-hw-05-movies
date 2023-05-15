import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import { ColorRing } from 'react-loader-spinner';
import css from './Layout.module.css';

const Layout = () => {
  const location = useLocation();
  return (
    <>
      <header className={css.header}>
        <div className={css.container}>
          <nav>
            <ul className={css['navigation-list']}>
              <li className={css['navigation-item']}>
                <NavLink
                  className={`${
                    location.pathname === '/' ? css.active : css.pages
                  }`}
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className={css['navigation-item']}>
                <NavLink
                  className={`${
                    location.pathname.includes('/movies')
                      ? css.active
                      : css.pages
                  }`}
                  to="/movies"
                >
                  Movies
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <div className={css.container}>
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
                  colors={[
                    '#e15b64',
                    '#f47e60',
                    '#f8b26a',
                    '#abbd81',
                    '#849b87',
                  ]}
                />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </div>
      </main>
    </>
  );
};

export default Layout;
