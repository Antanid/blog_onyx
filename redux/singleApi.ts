import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const singleApi = createApi({
    reducerPath: 'singleApi',
    tagTypes: ['Item'],
    baseQuery: fetchBaseQuery({ baseUrl: 'https://654619eafe036a2fa9552b93.mockapi.io/blog/' }),
    endpoints: (build) => ({
        getSingleData: build.query({
            query: (id) => `${id}`,
        }),
        editData: build.mutation({
            query: ({ newData, id }) => ({
                url: `${id}`,
                method: 'PUT',
                body: newData,
            }),
            invalidatesTags: [{ type: 'Item', id: 'LIST' }]
        }),
        newComment: build.mutation({
            query: ({ newData, id }) => ({
              url: `${id}`,
              method: 'PUT',
              body: newData
            }),
        })
    })
})

export const { useGetSingleDataQuery, useEditDataMutation, useNewCommentMutation } = singleApi;