import { baseApi } from "@/redux/baseApi";

export const parcelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createParcel: builder.mutation({
      query: (createParcel) => ({
        url: "/parcels/create",
        method: "POST",
        data: createParcel,
      }),
      invalidatesTags: ["PARCEL"],
    }),

    getMyParcels: builder.query({
      query: () => ({
        url: "/parcels/my-parcels",
        method: "GET",
      }),
      providesTags: ["PARCEL"],
    }),

    getIncomingParcels: builder.query({
      query: () => ({
        url: "/parcels/incoming",
        method: "GET",
      }),
      providesTags: ["PARCEL"],
    }),

    getDeliveredParcels: builder.query({
      query: (status: string = "Delivered") => ({
        url: `/parcels/my-parcels?status=${status}`,
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
        url: `/parcels/confirm/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["PARCEL"],
    }),

    getAllParcels: builder.query({
      query: () => ({
        url: "/parcels",
        method: "GET",
      }),
      providesTags: ["PARCEL"],
    }),

    blockParcel: builder.mutation({
      query: ({ id }) => ({
        url: `/parcels/block/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["PARCEL"],
    }),

    unBlockParcel: builder.mutation({
      query: ({ id }) => ({
        url: `/parcels/unblock/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["PARCEL"],
    }),
    //track
    trackParcelByTid: builder.query({
      query: (id: string) => ({
        url: `/parcels/track/${id}`,
        method: "GET",
      }),
      providesTags: ["PARCEL"],
    }),

    updateParcelStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/parcels/status/${id}`,
        method: "PATCH",
        body: { currentStatus: status },
      }),
      invalidatesTags: ["PARCEL"],
    }),
  }),
});

export const {
  useCreateParcelMutation,
  useGetMyParcelsQuery,
  useCancelParcelMutation,
  useGetIncomingParcelsQuery,
  useConfirmParcelMutation,
  useGetDeliveredParcelsQuery,
  useGetAllParcelsQuery,
  useBlockParcelMutation,
  useUnBlockParcelMutation,
  useLazyTrackParcelByTidQuery,
  useUpdateParcelStatusMutation,
} = parcelApi;
