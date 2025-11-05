import { baseApi } from "@/redux/baseApi";

export const parcelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createParcel: builder.mutation({
      query: (createParcel) => ({
        url: "/parcels/create-parcel",
        method: "POST",
        data: createParcel,
      }),
      invalidatesTags: ["PARCEL"],
    }),

    //get sender all parcel
    getSenderAllParcel: builder.query({
      query: () => ({
        url: "/parcels/sender/all",
        method: "GET",
      }),
      providesTags: ["PARCEL"],
    }),

    getReceiverParcels: builder.query({
      query: () => ({
        url: "/parcels/receiver/all",
        method: "GET",
      }),
      providesTags: ["PARCEL"],
    }),

    cancelParcel: builder.mutation({
      query: ({ id }) => ({
        url: `/parcels/cancel/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["PARCEL"],
    }),

    confirmParcel: builder.mutation({
      query: ({ id }) => ({
        url: `parcels/receiver/confirm-delivery/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["PARCEL"],
    }),

    getAllParcels: builder.query({
      query: (params?: {
        page?: number;
        limit?: number;
        sortBy?: string;
        sortOrder?: string;
      }) => {
        if (params?.page && params?.limit) {
          return {
            url: `/parcels/admin/all?page=${params.page}&limit=${params.limit}&sortBy=${params.sortBy}&sortOrder=${params.sortOrder}`,
            method: "GET",
          };
        }
        //  No pagination or sorting
        return {
          url: `/parcels/admin/all`,
          method: "GET",
        };
      },
      providesTags: ["PARCEL"],
    }),

    trackParcelByTid: builder.query({
      query: (id: string) => ({
        url: `/parcels/track/${id}`,
        method: "GET",
      }),
      providesTags: ["PARCEL"],
    }),

    updateParcelStatus: builder.mutation({
      query: ({ id, updateData }) => ({
        url: `/parcels/update-status/${id}`,
        method: "PATCH",
        data: updateData,
      }),
      invalidatesTags: ["PARCEL"],
    }),
  }),
});

export const {
  useCreateParcelMutation,
  useCancelParcelMutation,
  useGetReceiverParcelsQuery,
  useConfirmParcelMutation,

  useGetAllParcelsQuery,

  useLazyTrackParcelByTidQuery,
  useUpdateParcelStatusMutation,
  useGetSenderAllParcelQuery,
} = parcelApi;
