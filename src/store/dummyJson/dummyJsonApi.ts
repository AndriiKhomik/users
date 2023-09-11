import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ServerResponse } from "../../types";

type Props = {
  search: string;
  skip: number;
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
      query: ({ search, skip, limit }) => ({
        url: "users",
        params: {
          q: search,
          limit: limit,
          skip: skip,
        },
      }),
      transformResponse: (response: ServerResponse) => response,
    }),
  }),
});

export const { useGetUsersQuery } = dummyJsonApi;
