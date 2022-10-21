import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const apiSplice: any = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:1234",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Shop", "Product", "User", "Cart"],
  endpoints: (builder) => ({
    //LOGIN
    login: builder.mutation({
      query: (data) => ({
        url: "/user-login",
        method: "POST",
        body: data,
      }),
    }),
    getUser: builder.query({
      query: () => "/get-data",
      providesTags: ["User"],
    }),
    //LOGOUT
    signup: builder.mutation({
      query: (data) => ({
        url: "/user-signup",
        method: "POST",
        body: data,
      }),
    }),
    //SHOP
    getShop: builder.query({
      query: () => "/get-all-shop-by-user-id",
      providesTags: ["Shop"],
    }),

    getOneShop: builder.query({
      query: (id) => `/get-one-shop/${id}`,
      providesTags: ["Shop"],
    }),

    createShop: builder.mutation({
      query: (data) => ({
        url: "/create-shop",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Shop"],
    }),

    updateShop: builder.mutation({
      query: (data) => ({
        url: "/update-shop",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Shop"],
    }),

    deleteShop: builder.mutation({
      query: (id) => ({
        url: `/delete-shop/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Shop"],
    }),

    toggleShop: builder.mutation({
      query: (data) => ({
        url: "/toggle-shop",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Shop"],
    }),

    //PRODUCT
    getProduct: builder.query({
      query: () => "/get-all-product",
      providesTags: ["Product"],
    }),
    getOneProduct: builder.query({
      query: (id) => `/get-one-product/${id}`,
      providesTags: ["Product"],
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/create-product",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: "/update-product",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/delete-product/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Product"],
    }),

    //CART
    getCart: builder.query({
      query: () => "/get-cart-items",
      providesTags: ["Cart"],
    }),
    createCart: builder.mutation({
      query: (data) => ({
        url: "/create-cart-items",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCart: builder.mutation({
      query: (data) => ({
        url: "/update-cart-items",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),
    deleteCart: builder.mutation({
      query: (id) => ({
        url: `/delete-cart-item/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useGetUserQuery,
  useGetShopQuery,
  useGetOneShopQuery,
  useCreateShopMutation,
  useUpdateShopMutation,
  useDeleteShopMutation,
  useToggleShopMutation,
  useGetProductQuery,
  useGetOneProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetCartQuery,
  useCreateCartMutation,
  useUpdateCartMutation,
  useDeleteCartMutation,
} = apiSplice;
