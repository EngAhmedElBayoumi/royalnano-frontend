import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/redux/services/common";

// Types for Reports API
export interface ReportFilter {
  date_from?: string;
  date_to?: string;
  branch_id?: number;
  customer_id?: number;
  supplier_id?: number;
  employee_id?: number;
  status?: string;
  category_id?: number;
  department_id?: number;
}

export interface ReportTemplate {
  id: number;
  name: string;
  report_type: string;
  description?: string;
  filters_config: Record<string, unknown>;
  columns_config: Array<{
    key: string;
    label: string;
    type: string;
    width?: number;
    sortable?: boolean;
  }>;
  created_by: number;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface ReportExecution {
  id: number;
  template: ReportTemplate;
  executed_by: number;
  filters_applied: ReportFilter;
  status: "pending" | "running" | "completed" | "failed";
  results: Record<string, unknown>;
  execution_time?: number;
  error_message?: string;
  created_at: string;
}

export interface ScheduledReport {
  id: number;
  template: ReportTemplate;
  name: string;
  frequency: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
  recipients: string[];
  filters_config: ReportFilter;
  next_execution: string;
  last_execution?: string;
  is_active: boolean;
  created_by: number;
  created_at: string;
}

export interface ReportData {
  report_type: string;
  title: string;
  data: Array<Record<string, unknown>>;
  columns: Array<{
    key: string;
    label: string;
    type: string;
    width?: number;
  }>;
  total_records: number;
  filters_applied: ReportFilter;
  generated_at: string;
  execution_time: number;
  summary?: Record<string, unknown>;
}

export interface ReportType {
  key: string;
  name: string;
  description: string;
  category: string;
  available_filters: string[];
  default_columns: string[];
}

export const reportsApi = createApi({
  reducerPath: "reportsApi",
  baseQuery,
  tagTypes: ["ReportTemplate", "ReportExecution", "ScheduledReport"],
  endpoints: (builder) => ({
    // Report Templates
    getReportTemplates: builder.query<
      ReportTemplate[],
      {
        search?: string;
        report_type?: string;
        is_active?: boolean;
      }
    >({
      query: (params) => ({
        url: "reports/templates/",
        params,
      }),
      providesTags: ["ReportTemplate"],
    }),

    getReportTemplate: builder.query<ReportTemplate, number>({
      query: (id) => `reports/templates/${id}/`,
      providesTags: ["ReportTemplate"],
    }),

    createReportTemplate: builder.mutation<
      ReportTemplate,
      Partial<ReportTemplate>
    >({
      query: (template) => ({
        url: "reports/templates/",
        method: "POST",
        body: template,
      }),
      invalidatesTags: ["ReportTemplate"],
    }),

    updateReportTemplate: builder.mutation<
      ReportTemplate,
      {
        id: number;
        template: Partial<ReportTemplate>;
      }
    >({
      query: ({ id, template }) => ({
        url: `reports/templates/${id}/`,
        method: "PATCH",
        body: template,
      }),
      invalidatesTags: ["ReportTemplate"],
    }),

    deleteReportTemplate: builder.mutation<void, number>({
      query: (id) => ({
        url: `reports/templates/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["ReportTemplate"],
    }),

    // Report Executions
    getReportExecutions: builder.query<
      ReportExecution[],
      {
        template?: number;
        status?: string;
      }
    >({
      query: (params) => ({
        url: "reports/executions/",
        params,
      }),
      providesTags: ["ReportExecution"],
    }),

    getReportExecution: builder.query<ReportExecution, number>({
      query: (id) => `reports/executions/${id}/`,
      providesTags: ["ReportExecution"],
    }),

    // Scheduled Reports
    getScheduledReports: builder.query<
      ScheduledReport[],
      {
        search?: string;
        template?: number;
        frequency?: string;
        is_active?: boolean;
      }
    >({
      query: (params) => ({
        url: "reports/scheduled/",
        params,
      }),
      providesTags: ["ScheduledReport"],
    }),

    getScheduledReport: builder.query<ScheduledReport, number>({
      query: (id) => `reports/scheduled/${id}/`,
      providesTags: ["ScheduledReport"],
    }),

    createScheduledReport: builder.mutation<
      ScheduledReport,
      Partial<ScheduledReport>
    >({
      query: (report) => ({
        url: "reports/scheduled/",
        method: "POST",
        body: report,
      }),
      invalidatesTags: ["ScheduledReport"],
    }),

    updateScheduledReport: builder.mutation<
      ScheduledReport,
      {
        id: number;
        report: Partial<ScheduledReport>;
      }
    >({
      query: ({ id, report }) => ({
        url: `reports/scheduled/${id}/`,
        method: "PATCH",
        body: report,
      }),
      invalidatesTags: ["ScheduledReport"],
    }),

    deleteScheduledReport: builder.mutation<void, number>({
      query: (id) => ({
        url: `reports/scheduled/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["ScheduledReport"],
    }),

    // Report Generator
    getAvailableReportTypes: builder.query<ReportType[], void>({
      query: () => "reports/generator/available_types/",
    }),

    generateReport: builder.mutation<
      ReportData,
      {
        report_type: string;
        filters?: ReportFilter;
      }
    >({
      query: (body) => ({
        url: "reports/generator/generate/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ReportExecution"],
    }),

    exportReport: builder.mutation<
      Blob,
      {
        report_type: string;
        filters?: ReportFilter;
        format: "excel" | "csv" | "pdf";
      }
    >({
      query: (body) => ({
        url: "reports/generator/export/",
        method: "POST",
        body,
        responseHandler: (response) => response.blob(),
      }),
    }),

    getReportFiltersSchema: builder.query<Record<string, unknown>, void>({
      query: () => "reports/generator/filters_schema/",
    }),

    // Report Categories and Statistics
    getReportCategories: builder.query<
      Array<{
        category: string;
        count: number;
        types: ReportType[];
      }>,
      void
    >({
      query: () => "reports/generator/categories/",
    }),

    getReportStatistics: builder.query<
      {
        total_reports: number;
        reports_this_month: number;
        most_used_type: string;
        average_execution_time: number;
        recent_executions: ReportExecution[];
      },
      void
    >({
      query: () => "reports/generator/statistics/",
    }),
  }),
});

export const {
  // Templates
  useGetReportTemplatesQuery,
  useGetReportTemplateQuery,
  useCreateReportTemplateMutation,
  useUpdateReportTemplateMutation,
  useDeleteReportTemplateMutation,

  // Executions
  useGetReportExecutionsQuery,
  useGetReportExecutionQuery,

  // Scheduled Reports
  useGetScheduledReportsQuery,
  useGetScheduledReportQuery,
  useCreateScheduledReportMutation,
  useUpdateScheduledReportMutation,
  useDeleteScheduledReportMutation,

  // Generator
  useGetAvailableReportTypesQuery,
  useGenerateReportMutation,
  useExportReportMutation,
  useGetReportFiltersSchemaQuery,

  // Statistics
  useGetReportCategoriesQuery,
  useGetReportStatisticsQuery,
} = reportsApi;
