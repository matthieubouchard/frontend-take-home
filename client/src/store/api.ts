import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Entity interfaces
export interface User {
  id: string;
  first: string;
  last: string;
  roleId: string;
  photo: string;
  createdAt: string;
  updatedAt: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PagedResponse<T> {
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

// Tag constants
export const TAGS = {
  USERS: 'Users',
  ROLES: 'Roles',
  LIST: 'LIST'
} as const;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3002" }),
  tagTypes: [TAGS.USERS, TAGS.ROLES],
  endpoints: (builder) => ({
    // Users
    getUsers: builder.query<
      PagedResponse<User>,
      { page?: number; search?: string }
    >({
      query: ({ page = 1, search }) => ({
        url: "users",
        params: { page, ...(search && { search }) },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: TAGS.USERS, id })),
              { type: TAGS.USERS, id: TAGS.LIST },
            ]
          : [{ type: TAGS.USERS, id: TAGS.LIST }],
    }),
    
    getUser: builder.query<User, string>({
      query: (id) => `users/${id}`,
      providesTags: (result, error, id) => [{ type: TAGS.USERS, id }],
    }),
    
    createUser: builder.mutation<User, CreateUserRequest>({
      query: (body) => ({
        url: "users",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: TAGS.USERS, id: TAGS.LIST }],
    }),
    
    updateUser: builder.mutation<User, { id: string; data: UpdateUserRequest }>({
      query: ({ id, data }) => ({
        url: `users/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: TAGS.USERS, id },
        { type: TAGS.USERS, id: TAGS.LIST },
      ],
    }),
    
    deleteUser: builder.mutation<User, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: TAGS.USERS, id: TAGS.LIST }],
    }),
    
    // Roles
    getRoles: builder.query<
      PagedResponse<Role>,
      { page?: number; search?: string }
    >({
      query: ({ page = 1, search }) => ({
        url: "roles",
        params: { page, ...(search && { search }) },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: TAGS.ROLES, id })),
              { type: TAGS.ROLES, id: TAGS.LIST },
            ]
          : [{ type: TAGS.ROLES, id: TAGS.LIST }],
    }),
    
    getRole: builder.query<Role, string>({
      query: (id) => `roles/${id}`,
      providesTags: (result, error, id) => [{ type: TAGS.ROLES, id }],
    }),
    
    createRole: builder.mutation<Role, CreateRoleRequest>({
      query: (body) => ({
        url: "roles",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: TAGS.ROLES, id: TAGS.LIST }],
    }),
    
    updateRole: builder.mutation<Role, { id: string; data: UpdateRoleRequest }>({
      query: ({ id, data }) => ({
        url: `roles/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: TAGS.ROLES, id },
        { type: TAGS.ROLES, id: TAGS.LIST },
      ],
    }),
    
    deleteRole: builder.mutation<Role, string>({
      query: (id) => ({
        url: `roles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: TAGS.ROLES, id: TAGS.LIST }],
    }),
  }),
});
