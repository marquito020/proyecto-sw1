import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Auth, NewUser } from "../models/auth.model";
import { UserInfo } from "../models/user.models";

type ResponseDataLogin = {
  token: string;
  user: UserInfo;
};



export const authApi = createApi({
  reducerPath: "authApi",
  /* baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:4000" }), */
  baseQuery: fetchBaseQuery({ baseUrl: "https://backend-proyect-35yc.onrender.com" }),
  endpoints: (builder) => ({
    login: builder.mutation<ResponseDataLogin, Auth>({
      query: (auth) => ({
        url: "/api/login",
        method: "POST",
        body: auth,
      }),
    }),
    registerNewUser: builder.mutation<UserInfo, NewUser>({
      query: (newUser) => ({
        url: "/api/register",
        method: "POST",
        body: newUser,
      }),
    }),
  }),
});

export const { useRegisterNewUserMutation, useLoginMutation } = authApi;
