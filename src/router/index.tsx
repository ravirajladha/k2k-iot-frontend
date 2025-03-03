import { createBrowserRouter } from 'react-router-dom';
import BlankLayout from '../components/Layouts/BlankLayout';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import { routes } from './routes';
import { protectedRoutes } from './protectedRoutes';
import { ProtectedRoute } from '@/utils/ProtectedRoute';

const finalRoutes = routes.map((route) => {
    // Apply ProtectedRoute wrapper to protected routes only
    const isProtected = protectedRoutes.some((protectedRoute) => protectedRoute.path === route.path);

    const wrappedElement = isProtected ? (
        <ProtectedRoute>{route.element}</ProtectedRoute>
    ) : (
        route.element
    );

    return {
        ...route,
        element: route.layout === 'blank' ? (
            <BlankLayout>{wrappedElement}</BlankLayout>
        ) : (
            <DefaultLayout>{wrappedElement}</DefaultLayout>
        ),
    };
});

const router = createBrowserRouter(finalRoutes);

export default router;
