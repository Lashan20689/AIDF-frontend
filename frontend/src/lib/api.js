import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Hotel } from 'lucide-react';

const BACKEND_URL = "http://localhost:8000";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/api/`,
        prepareHeaders: async (headers, { getState }) => {
            const token = await window?.clerk?.session?.gettoken();
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

        }
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
                url: "bookings",
                method: "POST",
                body: booking,
            }),
        }),



    }),
});

export const { useGetHotelsQuery,
    useGetHotelByIdQuery,
    useCreateHotelMutation,
    useCreateBookingMutation,
    useGetHotelsforSearchQueryQuery } = api;