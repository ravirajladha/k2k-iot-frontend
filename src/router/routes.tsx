// import { lazy } from 'react';
// const Index = lazy(() => import('../pages/Index'));
// const Error = lazy(() => import('../components/Error'));

// const routes = [
//     // {
//     //     path: '/',
//     //     element: <Index />,
//     //     layout: 'default',
//     // },
//     {
//         path: '*',
//         element: <Error />,
//         layout: 'blank',
//     },
// ];

// export { routes };

import { lazy } from 'react';
const LoginBoxed = lazy(() => import('../pages/Authentication/LoginBoxed'));

const LoginCover = lazy(() => import('../pages/Authentication/LoginCover'));
const RegisterBoxed = lazy(() => import('../pages/Authentication/RegisterBoxed'));
const PageNotFound = lazy(() => import('../pages/Error/Error404'));
import { protectedRoutes } from './protectedRoutes';

// Unprotected Routes
const unprotectedRoutes = [
    {
        path: '/login',
        element: <LoginBoxed />,
        layout: 'blank',
    },
    {
        path: '/register',
        element: <RegisterBoxed />,
        layout: 'blank',
    },
];

// General Routes
const generalRoutes = [

    {
        path: '*', // Catch-all route for Page Not Found
        element: <PageNotFound />,
        layout: 'blank',
    },
];

// Combine All Routes
const routes = [...protectedRoutes, ...unprotectedRoutes, ...generalRoutes];

export { routes };

