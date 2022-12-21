import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiClient, RequestOpts} from '../api/client';
import type {BaseQueryFn} from '@reduxjs/toolkit/query';
import {GetLabelsRes} from '../api/label';

const customBaseQuery: BaseQueryFn<RequestOpts, unknown, string> = async (args, api) => {
  // window.location.assign('/login');
  try {
    const response = await apiClient.request({...args});
    // console.log('Got response');
    // console.log(response);
    return {data: response};
  } catch (error: unknown) {
    // console.log('encountered error');
    // console.log(error);
    return {error: 'error'};
  }
};

export const apiSlice = createApi({
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getLabels: builder.query<GetLabelsRes, void>({
      query: () => ({
        url: '/labels',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetLabelsQuery,
} = apiSlice;
