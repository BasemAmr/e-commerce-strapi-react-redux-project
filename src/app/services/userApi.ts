import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthUser } from "../../interfaces";
import CookiesService from "../../services/cookies";


interface UserResponse {
    data: AuthUser[];

  }

export const userApi  = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_SERVER_URL,
    }),
    tagTypes: ["Users"],
    endpoints: (builder) => ({
        getUsers: builder.query<UserResponse, void>({
            query: () => {


                return ({
                url: "/api/users?populate=*",
                headers: {
                    "Authorization": `Bearer ${CookiesService.getCookie("jwt")}`,
                },
            })},
            

        }),
        updateUser: builder.mutation({
            query: ({ documentId, role }) => {


                const update = {
                    role: role === "admin" ? 3 : 1 // Assuming 2 is admin role ID and 1 is authenticated role ID
                  };
                return ({
                url: `/api/users/${documentId}`,
                method: "PUT",
                body: update,
                headers: {
                    "Authorization": `Bearer ${CookiesService.getCookie("jwt")}`,
                },
            })},
            invalidatesTags: [{ type: "Users", id: "LIST" }],
        })
    }),
});


export const { useGetUsersQuery, useUpdateUserMutation } = userApi;
export default userApi;