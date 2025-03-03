import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store/store';
import { useNavigate } from 'react-router-dom';

const withAuthRedirect = (Component: React.ComponentType) => {
    return (props: any) => {
        const { isAuthenticated, isLoading } = useSelector((state: IRootState) => state.auth);
        const navigate = useNavigate();

        useEffect(() => {
            if (!isLoading && isAuthenticated) {
                // Redirect to home/dashboard if authenticated
                navigate('/'); // Adjust the target route as needed
            }
        }, [isAuthenticated, isLoading, navigate]);

        if (isLoading) {
            return <div>Loading... Please wait.</div>;
        }

        // Only render the component if the user is not authenticated
        return <Component {...props} />;
    };
};

export default withAuthRedirect;
