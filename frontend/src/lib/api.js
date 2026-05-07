import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
      baseUrl: `${BACKEND_URL}/api/`,
      prepareHeaders: async (headers, { getState }) => {
        return new Promise((resolve) => {
          async function checkToken() {
            const clerk = window.Clerk;
            if (clerk) {
              const token = await clerk.session?.getToken();
              headers.set("Authorization", `Bearer ${token}`);
              resolve(headers);
            } else {
              setTimeout(checkToken, 500); // try again in 500ms
            }
          }
          checkToken();
        });
      },
    }),
    endpoints: (builder) => ({
        getHotels: builder.query({
            query: () => "hotels",
        }),

        /**search hotels using AI powered simillaraty search
         * return the hotel that symentaclly similar to the search query
         * 
         * @param {object} option - the search options
         * @param {string} option.query - the search query
          */

        getHotelsforSearchQuery: builder.query({
            query: ({ query }) => `hotels/search/retrieve?query=${query}`,
        }),


        getHotelById: builder.query({
            query: (id) => `hotels/${id}`,
        }),
        createHotel: builder.mutation({
            query: (hotel) => ({
                url: "hotels",
                method: "POST",
                body: hotel,
            }),
        }),
        createBooking: builder.mutation({
            query: (booking) => ({
                url: "booking",
                method: "POST",
                body: booking,
            }),
        }),
        getBookingById: builder.query({
            query: (id) => `booking/${id}`,
          }),

        createCheckoutSession: builder.mutation({
            query: () => ({
              url: `payments/create-checkout-session`,
              method: "POST",
            }),
          }),
          getCheckoutSessionStatus: builder.query({
            query: (sessionId) => `payments/session-status?session_id=${sessionId}`,
          }),
        }),



   
});

export const { useGetHotelsQuery,
    useGetHotelByIdQuery,
    useCreateHotelMutation,
    useCreateBookingMutation,
    useGetHotelsforSearchQueryQuery,
    useGetBookingByIdQuery,
    useCreateCheckoutSessionMutation,
    useGetCheckoutSessionStatusQuery,
 } = api;