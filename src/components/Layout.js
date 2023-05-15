import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
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
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </>
  );
};

export default Layout;
