import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/users/register",
        method: "POST",
        data: userInfo,
      }),
    }),

    userInfo: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["USER"],
    }),

    // auth.api.ts
    getAllUsers: builder.query({
      query: (params?: { page?: number; limit?: number }) => {
        if (params?.page && params?.limit) {
          return {
            url: `/users/all-users?page=${params.page}&limit=${params.limit}`,
            method: "GET",
          };
        }

        return {
          url: `/users/all-users`,
          method: "GET",
        };
      },
      providesTags: ["USER"],
    }),

    getReceiver: builder.query({
      query: (email: string) => ({
        url: `/users/getByMail?email=${email}`,
        method: "GET",
      }),
      providesTags: ["PARCEL"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetAllUsersQuery,
  useUserInfoQuery,
  useLogoutMutation,
  useLazyGetReceiverQuery,
} = authApi;
