import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["USER", "PARCEL"],
  endpoints: () => ({}),
});

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// // Define your base API
// export const baseApi = createApi({
//   reducerPath: "baseApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1" }),
//   endpoints: (builder) => ({
//     // Example: Fetch all users
//     getUsers: builder.query({
//       query: () => "/users", // API endpoint
//     }),
//     // Example: Fetch a single user by ID
//     getUserById: builder.query({
//       query: (id) => `/users/${id}`,
//     }),
//     // Example: Add a new user
//     addUser: builder.mutation({
//       query: (newUser) => ({
//         url: "/users",
//         method: "POST",
//         body: newUser,
//       }),
//     }),
//   }),
// });

// // Export hooks for usage in functional components
// export const {
//   useGetUsersQuery,
//   useGetUserByIdQuery,
//   useAddUserMutation,
// } = baseApi;

// import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

// export const baseApi = createApi({
//   baseQuery: fetchBaseQuery({
//     baseUrl: import.meta.env.VITE_API_URL,
//     credentials: "include", // ✅ VERY IMPORTANT — allows cookies to be sent
//   }),
//   endpoints: () => ({}),
// });
