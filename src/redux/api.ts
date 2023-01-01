import { createApi } from "@reduxjs/toolkit/query/react";
import { apiClient, RequestOpts, AppError } from "api/client";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import * as type from "api/interfaces";
import { addFailure, addSuccess } from "redux/notifications";
import { logoutUser } from "redux/auth";
import { ERROR_UNAUTHORIZED } from "config";

// RTK custom query
// needs to return {data: YOUR_DATA} or {error: YOUR_ERROR} object
const customBaseQuery: BaseQueryFn<RequestOpts, unknown, AppError> = async (args, api) => {
  const result = await apiClient.request({ ...args });

  console.log(result);

  if ("error" in result && result.error.message === ERROR_UNAUTHORIZED) {
    // User's refresh token has expired, trigger logout
    api.dispatch(addFailure("Session expired, please login again"));
    api.dispatch(logoutUser());
    return result;
  }

  if ("data" in result && result.data.message) {
    api.dispatch(addSuccess(result.data.message));
  } else if ("error" in result) {
    api.dispatch(addFailure(result.error.message));
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: customBaseQuery,
  tagTypes: ["Label", "Task"],
  endpoints: (builder) => ({
    registerUser: builder.mutation<type.RegisterUserRes, type.RegisterUserReq>({
      query: (arg) => ({
        url: "/users/register",
        method: "POST",
        data: arg,
      }),
    }),
    loginUser: builder.mutation<type.LoginUserRes, type.LoginUserReq>({
      query: (arg) => ({
        url: "/users/login",
        method: "POST",
        data: arg,
      }),
    }),
    logoutUser: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
    }),
    getLabels: builder.query<{ labels: type.Label[] }, void>({
      query: () => ({
        url: "/labels",
        method: "GET",
      }),
      providesTags: ["Label"],
    }),
    getLabel: builder.query<{ label: type.Label }, string>({
      query: (id) => ({
        url: `/labels/${id}`,
        method: "GET",
      }),
      providesTags: ["Label"],
    }),
    createLabel: builder.mutation<type.LabelRes, type.CreateLabelReq>({
      query: (arg) => ({
        url: "/labels",
        method: "POST",
        data: arg,
      }),
      invalidatesTags: ["Label"],
    }),
    updateLabel: builder.mutation<type.LabelRes, type.UpdateLabelReq>({
      query: ({ id, ...label }) => ({
        url: `/labels/${id}`,
        method: "put",
        data: label,
      }),
      invalidatesTags: ["Label"],
    }),
    deleteLabel: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/labels/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Label"],
    }),
    getTasks: builder.query<{ tasks: type.Task[] }, void>({
      query: () => ({
        url: "/tasks",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [...result.tasks.map((item) => ({ type: "Task" as const, id: item.id })), "Task"]
          : ["Task"],
    }),
    getTask: builder.query<{ task: type.Task }, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "Task", id: arg }],
    }),
    createTask: builder.mutation<{ task: type.Task; message: string }, type.CreateTaskReq>({
      query: (arg) => ({
        url: "/tasks",
        method: "POST",
        data: arg,
      }),
      invalidatesTags: ["Task"],
    }),
    updateTask: builder.mutation<{ task: type.Task; message: string }, type.UpdateTaskReq>({
      query: ({ id, ...task }) => ({
        url: `/tasks/${id}`,
        method: "PUT",
        data: task,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Task", id: arg.id }],
    }),
    deleteTask: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Task", id: arg }],
    }),
    addLabels: builder.mutation<{ message: string }, type.TaskLabelsReq>({
      query: ({ id, labels }) => ({
        url: `/tasks/${id}/attach`,
        method: "POST",
        data: { labels },
      }),
      invalidatesTags: ["Task"],
    }),
    removeLabels: builder.mutation<{ message: string }, type.TaskLabelsReq>({
      query: ({ id, labels }) => ({
        url: `/tasks${id}/detach`,
        method: "POST",
        data: labels,
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetLabelsQuery,
  useGetLabelQuery,
  useCreateLabelMutation,
  useUpdateLabelMutation,
  useDeleteLabelMutation,
  useGetTasksQuery,
  useGetTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useAddLabelsMutation,
  useRemoveLabelsMutation,
} = apiSlice;
