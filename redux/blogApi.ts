import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const blogApi = createApi({
    reducerPath: 'blogApi',
    tagTypes: ['Items'],
    baseQuery: fetchBaseQuery({ baseUrl: 'https://654619eafe036a2fa9552b93.mockapi.io/' }),
    endpoints: (build) => ({
        getData: build.query({
            query: () => `blog`,
            providesTags: (result) => result
                ? [
                    ...result.map(({ id }: any) => ({ type: 'Items', id })),
                    { type: 'Items', id: 'LIST' },
                ]
                : [{ type: 'Items', id: 'LIST' }],
        }),
        // getSingleData: build.query({
        //     query: (id) => `blog/${id}`,
        // }),
        // editData: build.mutation({
        //     query: ({ newData, id }) => ({
        //         url: `blog/${id}`,
        //         method: 'PUT',
        //         body: newData,
        //     }),
        //     invalidatesTags: [{ type: 'Items', id: 'LIST' }]
        // }),
        postData: build.mutation({
            query: (newData) => ({
                url: `blog`,
                method: 'POST',
                body: newData,
            }),
            invalidatesTags: [{ type: 'Items', id: 'LIST' }]
        }),
        deletetItem: build.mutation({
            query: (id) => ({
                url: `blog/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Items', id: 'LIST' }]
        }),
    })
})


export const {
    useGetDataQuery,
    // useGetSingleDataQuery,
    // useEditDataMutation,
    usePostDataMutation,
    useDeletetItemMutation } = blogApi;