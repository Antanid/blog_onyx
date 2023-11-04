import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { blogApi } from './blogApi';
import { singleApi } from './singleApi';

export const store = configureStore({
    reducer: {
        [blogApi.reducerPath]: blogApi.reducer,
        [singleApi.reducerPath]: singleApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApi.middleware, singleApi.middleware)
})