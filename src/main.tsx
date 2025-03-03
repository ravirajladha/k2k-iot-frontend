import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import ErrorBoundary from "./ErrorBoundary";

// Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css';

// Tailwind css
import './tailwind.css';

// i18n (needs to be bundled)
import './i18n';

// Router
import { RouterProvider } from 'react-router-dom';
import router from './router/index';
// import reportWebVitals from './reportWebVitals';

// Redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import { store, persistor } from '@/store/store'; // Import persistor
// reportWebVitals(console.log);
window.onerror = function (message, source, lineno, colno, error) {
    console.error("Global Error Caught:", message, source, lineno, colno, error);
};

window.onunhandledrejection = function (event) {
    console.error("Unhandled Promise Rejection:", event.reason);
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ErrorBoundary>
        <Suspense>
            <Provider store={store}>
                <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
                    <RouterProvider router={router} />
                </PersistGate>
            </Provider>
        </Suspense>
        </ErrorBoundary>
    </React.StrictMode>
);
