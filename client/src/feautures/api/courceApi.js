import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../authSlice";
// import CreateLecture from "@/pages/admin/lecture/CreateLecture";

const COURCE_API = "http://localhost:8080/api/v1/cource";

export const courceApi = createApi({
  reducerPath: "courceApi",
  tagTypes: ["Refetch_Creator_Cource"],
  baseQuery: fetchBaseQuery({
    baseUrl: COURCE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCource: builder.mutation({
      query: ({ courceTitle, category }) => ({
        url: "",
        method: "POST",
        body: { courceTitle, category },
      }),
      invalidatesTags: ["Refetch_Creator_Cource"], //if not understood check time stamp at 7:22:58
    }),
    getCreatorCource: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["Refetch_Creator_Cource"],
    }),
    editCource: builder.mutation({
      query: ({ formData, courceId }) => ({
        url: `/${courceId}`,
        method: "PUT",
        body: formData,
      }),
    }),
    getCourceById: builder.query({
      query: (courceId) => ({
        url: `/${courceId}`,
        method: "GET",
      }),
    }),
    createLecture: builder.mutation({
      query: ({ lectureTitle, courceId }) => ({
        url: `/${courceId}/lecture`,
        method: "POST",
        body: { lectureTitle },
      }),
    }),
    getCourceLecture: builder.query({
      query: ({ courceId }) => ({
        url: `/${courceId}/lecture`,
        method: "GET",
      }),
    }),
    editLecture: builder.mutation({
      query: ({
        lectureTitle,
        videInfo,
        isPreviewFree,
        courceId,
        lectureId,
      }) => ({
        url: `/${courceId}/lecture/${lectureId}`,
        method: "POST",
        body: { lectureTitle, videInfo, isPreviewFree },
      }),
    }),
  }),
});

export const {
  useCreateCourceMutation,
  useGetCreatorCourceQuery,
  useEditCourceMutation,
  useGetCourceByIdQuery,
  useCreateLectureMutation,
  useGetCourceLectureQuery,
  useEditLectureMutation
} = courceApi;
