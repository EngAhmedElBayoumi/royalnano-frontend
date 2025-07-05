import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/redux/services/common";

export const permissionsApi = createApi({
  reducerPath: "permissionsApi",
  baseQuery,
  endpoints: (builder) => ({
    getPermissions: builder.query({
      query: ({ search, ordering, page, page_size }) => ({
        url: `hr/permissions`,
        params: { search, ordering, page, page_size },
      }),
    }),
    getGroupedPermissions: builder.query({
      query: () => ({
        url: `hr/permissions/grouped/`,
      }),
    }),
    getPermissionsById: builder.query({
      query: (id) => `hr/permissions/${id}/`,
    }),
    createPermissions: builder.mutation({
      query: (data) => ({
        url: `hr/permissions/`,
        method: "POST",
        body: data,
      }),
    }),
    updatePermissions: builder.mutation({
      query: ({ id, data }) => ({
        url: `hr/permissions/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetPermissionsQuery,
  useGetGroupedPermissionsQuery,
  useGetPermissionsByIdQuery,
  useCreatePermissionsMutation,
  useUpdatePermissionsMutation,
} = permissionsApi;
