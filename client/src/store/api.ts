import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

interface User {
  id: string;
  first: string;
  last: string;
  roleId: string;
  photo: string;
  createdAt: string;
  updatedAt: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PagedResponse<T> {
  data: T[];
  next: number | null;
  prev: number | null;
  pages: number;
}

// Request types
interface CreateUserRequest {
  first: string;
  last: string;
  roleId: string;
}

interface UpdateUserRequest {
  first?: string;
  last?: string;
  roleId?: string;
}

interface CreateRoleRequest {
  name: string;
  description?: string;
  isDefault?: boolean;
}

interface UpdateRoleRequest {
  name?: string;
  description?: string;
  isDefault?: boolean;
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3002"}),
  tagTypes: ["User", "Role"],
  endpoints: (builder) => ({
    // Users
    getUsers: builder.query<
      PagedResponse<User>,
      {page?: number; search?: string}
    >({
      query: ({page = 1, search}) => ({
        url: "users",
        params: {page, ...(search && {search})},
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({id}) => ({type: "User" as const, id})),
              {type: "User", id: "LIST"},
            ]
          : [{type: "User", id: "LIST"}],
    }),

    getUser: builder.query<User, string>({
      query: (id) => `users/${id}`,
      providesTags: (result, error, id) => [{type: "User", id}],
    }),

    createUser: builder.mutation<User, CreateUserRequest>({
      query: (body) => ({
        url: "users",
        method: "POST",
        body,
      }),
      invalidatesTags: [{type: "User", id: "LIST"}],
    }),

    updateUser: builder.mutation<User, {id: string; data: UpdateUserRequest}>({
      query: ({id, data}) => ({
        url: `users/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, {id}) => [
        {type: "User", id},
        {type: "User", id: "LIST"},
      ],
    }),

    deleteUser: builder.mutation<User, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{type: "User", id: "LIST"}],
    }),

    // Roles
    getRoles: builder.query<
      PagedResponse<Role>,
      {page?: number; search?: string}
    >({
      query: ({page = 1, search}) => ({
        url: "roles",
        params: {page, ...(search && {search})},
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({id}) => ({type: "Role" as const, id})),
              {type: "Role", id: "LIST"},
            ]
          : [{type: "Role", id: "LIST"}],
    }),

    getRole: builder.query<Role, string>({
      query: (id) => `roles/${id}`,
      providesTags: (result, error, id) => [{type: "Role", id}],
    }),

    createRole: builder.mutation<Role, CreateRoleRequest>({
      query: (body) => ({
        url: "roles",
        method: "POST",
        body,
      }),
      invalidatesTags: [{type: "Role", id: "LIST"}],
    }),

    updateRole: builder.mutation<Role, {id: string; data: UpdateRoleRequest}>({
      query: ({id, data}) => ({
        url: `roles/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, {id}) => [
        {type: "Role", id},
        {type: "Role", id: "LIST"},
      ],
    }),

    deleteRole: builder.mutation<Role, string>({
      query: (id) => ({
        url: `roles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{type: "Role", id: "LIST"}],
    }),
  }),
});
