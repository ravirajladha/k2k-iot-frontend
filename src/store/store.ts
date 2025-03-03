import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default storage (localStorage for web)
import themeConfigSlice from './slices/themeConfigSlice';
import authReducer from './slices/authSlice';
import alertReducer from "./slices/alertSlice";


// Combine reducers
const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    auth: authReducer,
    alerts: alertReducer,

});

// Persist configuration
const persistConfig = {
    key: 'root', // Root key for the persisted state
    storage,
    whitelist: ['auth'], // Only persist the auth slice (you can add more slices as needed)
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable serializable check for redux-persist
        }),
});

// Create persistor
export const persistor = persistStore(store);

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, IRootState, unknown, Action<string>>;
