import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/redux/services/common";

// Types for Analytics API
export interface AnalyticsFilter {
  period?: string;
  date_from?: string;
  date_to?: string;
  branch_id?: number;
  group_by?: string;
}

export interface ChartData {
  chart_type: string;
  title: string;
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
    fill?: boolean;
  }>;
  filters_applied: AnalyticsFilter;
  generated_at: string;
}

export interface KPIData {
  key: string;
  label: string;
  value: number;
  change_percentage?: number;
  trend?: 'up' | 'down' | 'stable';
  format?: 'number' | 'currency' | 'percentage';
}

export interface DashboardWidget {
  id: number;
  name: string;
  widget_type: string;
  data_source: string;
  title: string;
  description?: string;
  config: Record<string, any>;
  filters: AnalyticsFilter;
  position_x: number;
  position_y: number;
  width: number;
  height: number;
  refresh_interval: number;
  is_active: boolean;
  created_by: number;
  created_at: string;
  updated_at: string;
}

export interface Dashboard {
  id: number;
  name: string;
  description?: string;
  widgets: DashboardWidget[];
  is_default: boolean;
  is_public: boolean;
  created_by: number;
  created_at: string;
  updated_at: string;
}

export interface DashboardData {
  dashboard_id: number;
  dashboard_name: string;
  widgets: Array<{
    widget_id: number;
    widget_name: string;
    widget_type: string;
    title: string;
    position: {
      x: number;
      y: number;
      width: number;
      height: number;
      order: number;
    };
    data: ChartData;
    config: Record<string, any>;
    error?: string;
  }>;
  filters_applied: AnalyticsFilter;
  generated_at: string;
  cache_status: string;
}

export interface AnalyticsAlert {
  id: number;
  name: string;
  alert_type: 'threshold' | 'trend' | 'anomaly';
  data_source: string;
  condition: Record<string, any>;
  severity: 'low' | 'medium' | 'high' | 'critical';
  recipients: string[];
  is_active: boolean;
  last_triggered?: string;
  created_by: number;
  created_at: string;
}

export interface UserDashboardPreference {
  id: number;
  user: number;
  default_dashboard?: number;
  theme: string;
  auto_refresh: boolean;
  refresh_interval: number;
  date_range_preference: string;
}

export const analyticsApi = createApi({
  reducerPath: "analyticsApi",
  baseQuery,
  tagTypes: ['Dashboard', 'Widget', 'Alert', 'Preference'],
  endpoints: (builder) => ({
    // Dashboard Widgets
    getWidgets: builder.query<DashboardWidget[], { search?: string; widget_type?: string; data_source?: string }>({
      query: (params) => ({
        url: "analytics/widgets/",
        params,
      }),
      providesTags: ['Widget'],
    }),

    createWidget: builder.mutation<DashboardWidget, Partial<DashboardWidget>>({
      query: (widget) => ({
        url: "analytics/widgets/",
        method: "POST",
        body: widget,
      }),
      invalidatesTags: ['Widget'],
    }),

    updateWidget: builder.mutation<DashboardWidget, { id: number; widget: Partial<DashboardWidget> }>({
      query: ({ id, widget }) => ({
        url: `analytics/widgets/${id}/`,
        method: "PATCH",
        body: widget,
      }),
      invalidatesTags: ['Widget'],
    }),

    deleteWidget: builder.mutation<void, number>({
      query: (id) => ({
        url: `analytics/widgets/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ['Widget'],
    }),

    // Dashboards
    getDashboards: builder.query<Dashboard[], { search?: string; is_default?: boolean; is_public?: boolean }>({
      query: (params) => ({
        url: "analytics/dashboards/",
        params,
      }),
      providesTags: ['Dashboard'],
    }),

    getDashboard: builder.query<Dashboard, number>({
      query: (id) => `analytics/dashboards/${id}/`,
      providesTags: ['Dashboard'],
    }),

    createDashboard: builder.mutation<Dashboard, Partial<Dashboard>>({
      query: (dashboard) => ({
        url: "analytics/dashboards/",
        method: "POST",
        body: dashboard,
      }),
      invalidatesTags: ['Dashboard'],
    }),

    updateDashboard: builder.mutation<Dashboard, { id: number; dashboard: Partial<Dashboard> }>({
      query: ({ id, dashboard }) => ({
        url: `analytics/dashboards/${id}/`,
        method: "PATCH",
        body: dashboard,
      }),
      invalidatesTags: ['Dashboard'],
    }),

    deleteDashboard: builder.mutation<void, number>({
      query: (id) => ({
        url: `analytics/dashboards/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ['Dashboard'],
    }),

    addWidgetToDashboard: builder.mutation<{ message: string }, {
      dashboardId: number;
      widget_id: number;
      position_x?: number;
      position_y?: number;
      width?: number;
      height?: number;
      order?: number;
    }>({
      query: ({ dashboardId, ...body }) => ({
        url: `analytics/dashboards/${dashboardId}/add_widget/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ['Dashboard'],
    }),

    removeWidgetFromDashboard: builder.mutation<{ message: string }, {
      dashboardId: number;
      widget_id: number;
    }>({
      query: ({ dashboardId, widget_id }) => ({
        url: `analytics/dashboards/${dashboardId}/remove_widget/`,
        method: "DELETE",
        body: { widget_id },
      }),
      invalidatesTags: ['Dashboard'],
    }),

    // Analytics Data
    getAvailableDataSources: builder.query<Array<{
      key: string;
      name: string;
      type: string;
    }>, void>({
      query: () => "analytics/data/available_sources/",
    }),

    generateAnalyticsData: builder.mutation<ChartData, {
      data_source: string;
      filters?: AnalyticsFilter;
    }>({
      query: (body) => ({
        url: "analytics/data/generate/",
        method: "POST",
        body,
      }),
    }),

    getDashboardData: builder.mutation<DashboardData, {
      dashboard_id: number;
      filters?: AnalyticsFilter;
    }>({
      query: (body) => ({
        url: "analytics/data/dashboard_data/",
        method: "POST",
        body,
      }),
    }),

    getKPIs: builder.query<any, { filters?: any }>({
      query: ({ filters = {} }) => ({
        url: "analytics/data/kpis/",
        method: "POST",
        body: { filters },
      }),
    }),

    getFiltersSchema: builder.query<Record<string, any>, void>({
      query: () => "analytics/data/filters_schema/",
    }),

    clearAnalyticsCache: builder.mutation<{ message: string }, { all?: boolean }>({
      query: (params) => ({
        url: "analytics/data/clear_cache/",
        method: "DELETE",
        params,
      }),
    }),

    // Alerts
    getAlerts: builder.query<AnalyticsAlert[], { search?: string; alert_type?: string; severity?: string; is_active?: boolean }>({
      query: (params) => ({
        url: "analytics/alerts/",
        params,
      }),
      providesTags: ['Alert'],
    }),

    createAlert: builder.mutation<AnalyticsAlert, Partial<AnalyticsAlert>>({
      query: (alert) => ({
        url: "analytics/alerts/",
        method: "POST",
        body: alert,
      }),
      invalidatesTags: ['Alert'],
    }),

    updateAlert: builder.mutation<AnalyticsAlert, { id: number; alert: Partial<AnalyticsAlert> }>({
      query: ({ id, alert }) => ({
        url: `analytics/alerts/${id}/`,
        method: "PATCH",
        body: alert,
      }),
      invalidatesTags: ['Alert'],
    }),

    deleteAlert: builder.mutation<void, number>({
      query: (id) => ({
        url: `analytics/alerts/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ['Alert'],
    }),

    // User Preferences
    getUserPreferences: builder.query<UserDashboardPreference[], void>({
      query: () => "analytics/preferences/",
      providesTags: ['Preference'],
    }),

    updateUserPreferences: builder.mutation<UserDashboardPreference, { id: number; preferences: Partial<UserDashboardPreference> }>({
      query: ({ id, preferences }) => ({
        url: `analytics/preferences/${id}/`,
        method: "PATCH",
        body: preferences,
      }),
      invalidatesTags: ['Preference'],
    }),

    createUserPreferences: builder.mutation<UserDashboardPreference, Partial<UserDashboardPreference>>({
      query: (preferences) => ({
        url: "analytics/preferences/",
        method: "POST",
        body: preferences,
      }),
      invalidatesTags: ['Preference'],
    }),
  }),
});

export const {
  // Widgets
  useGetWidgetsQuery,
  useCreateWidgetMutation,
  useUpdateWidgetMutation,
  useDeleteWidgetMutation,

  // Dashboards
  useGetDashboardsQuery,
  useGetDashboardQuery,
  useCreateDashboardMutation,
  useUpdateDashboardMutation,
  useDeleteDashboardMutation,
  useAddWidgetToDashboardMutation,
  useRemoveWidgetFromDashboardMutation,

  // Analytics Data
  useGetAvailableDataSourcesQuery,
  useGetAnalyticsDataMutation,
  useGetDashboardDataMutation,
  useGetKPIsQuery,
  useGetFiltersSchemaQuery,
  useClearCacheMutation,

  // Alerts
  useGetAlertsQuery,
  useCreateAlertMutation,
  useUpdateAlertMutation,
  useDeleteAlertMutation,

  // Preferences
  useGetUserPreferencesQuery,
  useUpdateUserPreferencesMutation,
  useCreateUserPreferencesMutation,
} = analyticsApi;

