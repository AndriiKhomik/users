import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ServerResponse } from "../../types";

type Props = {
  search: string;
  page: number;
  limit: number;
};

export const dummyJsonApi = createApi({
  reducerPath: "dummyDataApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/",
  }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    getUsers: build.query<ServerResponse, Props>({
      query: ({ search, page, limit }) => ({
        url: "users",
        params: {
          q: search,
          limit: 10,
          page: page,
        },
      }),
      transformResponse: (response: ServerResponse) => response,
    }),
  }),
});

export const { useGetUsersQuery } = dummyJsonApi;
