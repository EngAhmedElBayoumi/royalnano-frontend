"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Download,
  Play,
  Clock,
  Filter,
  Search,
  Calendar,
  Building,
  User,
  Package,
} from "lucide-react";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import LoadingError from "@/components/dashboard/LoadingError";
import { DateRangeFilter } from "@/components/dashboard/filters/DateRangeFilter";
import {
  useGetAvailableReportTypesQuery,
  useGenerateReportMutation,
  useExportReportMutation,
  useGetReportExecutionsQuery,
  useGetReportStatisticsQuery,
  ReportFilter,
  ReportData,
} from "@/redux/services/reports/reportsApi";
import { useGetBranchesQuery } from "@/redux/services/dashboard/inventory/branchesApi";

export default function ReportsPage() {
  const t = useTranslations("reports");
  const [selectedReportType, setSelectedReportType] = useState<string>("");
  const [filters, setFilters] = useState<ReportFilter>({});
  const [generatedReport, setGeneratedReport] = useState<ReportData | null>(
    null
  );
  const [activeTab, setActiveTab] = useState("generate");

  // API hooks
  const {
    data: reportTypes,
    isLoading: typesLoading,
    error: typesError,
  } = useGetAvailableReportTypesQuery();
  const { data: executions, isLoading: executionsLoading } =
    useGetReportExecutionsQuery({});
  const { data: statistics, isLoading: statsLoading } =
    useGetReportStatisticsQuery();
  const { data: branchesData, isLoading: branchesLoading } =
    useGetBranchesQuery({});
  const [generateReport, { isLoading: generating }] =
    useGenerateReportMutation();
  const [exportReport, { isLoading: exporting }] = useExportReportMutation();

  const handleGenerateReport = async () => {
    if (!selectedReportType) return;

    try {
      const result = await generateReport({
        report_type: selectedReportType,
        filters,
      }).unwrap();
      setGeneratedReport(result);
      setActiveTab("results");
    } catch (error) {
      console.error("Failed to generate report:", error);
    }
  };

  const handleExportReport = async (format: "excel" | "csv" | "pdf") => {
    if (!selectedReportType) return;

    try {
      const result = await exportReport({
        report_type: selectedReportType,
        filters,
        format,
      }).unwrap();

      // Create download link
      const url = window.URL.createObjectURL(result);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${selectedReportType}_report.${
        format === "excel" ? "xlsx" : format
      }`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to export report:", error);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<
      string,
      "default" | "secondary" | "destructive" | "outline"
    > = {
      completed: "default",
      running: "secondary",
      failed: "destructive",
      pending: "outline",
    };
    return (
      <Badge variant={variants[status] || "outline"}>
        {t(`status.${status}`)}
      </Badge>
    );
  };

  if (typesLoading) {
    return (
      <main className="mx-4 sm:mx-7 my-5">
        <div className="flex">
          <IconWithTitle
            imageSrc="/assets/icons/sidebar/reports.svg"
            title={t("title")}
            backgroundColor="#F8F7F7"
            textColor="primary"
          />
        </div>
        <div className="bg-dashboardBg px-4 sm:px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px]">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </main>
    );
  }

  if (typesError) {
    return (
      <main className="mx-4 sm:mx-7 my-5">
        <div className="flex">
          <IconWithTitle
            imageSrc="/assets/icons/sidebar/reports.svg"
            title={t("title")}
            backgroundColor="#F8F7F7"
            textColor="primary"
          />
        </div>
        <div className="bg-dashboardBg px-4 sm:px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px]">
          <LoadingError />
        </div>
      </main>
    );
  }

  return (
    <main className="mx-4 sm:mx-7 my-5">
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/sidebar/reports.svg"
          title={t("title")}
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-dashboardBg px-4 sm:px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px]">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="generate">{t("tabs.generate")}</TabsTrigger>
            <TabsTrigger value="results">{t("tabs.results")}</TabsTrigger>
            <TabsTrigger value="history">{t("tabs.history")}</TabsTrigger>
            <TabsTrigger value="statistics">{t("tabs.statistics")}</TabsTrigger>
          </TabsList>

          {/* Generate Report Tab */}
          <TabsContent value="generate" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {t("generate.title")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Report Type Selection */}
                <div className="space-y-2">
                  <Label htmlFor="report-type">
                    {t("generate.reportType")}
                  </Label>
                  <Select
                    value={selectedReportType}
                    onValueChange={setSelectedReportType}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t("generate.reportTypePlaceholder")}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTypes?.map((type) => (
                        <SelectItem key={type.key} value={type.key}>
                          <div className="flex flex-col">
                            <span>{type.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {type.description}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Filters Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>{t("generate.filters.dateRange")}</Label>
                    <DateRangeFilter
                      value={filters}
                      onChange={(newFilters) =>
                        setFilters({ ...filters, ...newFilters })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="branch">
                      {t("generate.filters.branch")}
                    </Label>
                    <Select
                      value={filters.branch_id?.toString() || ""}
                      onValueChange={(value) =>
                        setFilters({
                          ...filters,
                          branch_id: value ? parseInt(value) : undefined,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t("generate.filters.branchPlaceholder")}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">
                          {t("generate.filters.allBranches")}
                        </SelectItem>
                        {branchesData?.results?.map((branch) => (
                          <SelectItem
                            key={branch.id}
                            value={branch.id.toString()}
                          >
                            {branch.name} ({branch.branch_code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">
                      {t("generate.filters.status")}
                    </Label>
                    <Select
                      value={filters.status || ""}
                      onValueChange={(value) =>
                        setFilters({ ...filters, status: value || undefined })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t("generate.filters.statusPlaceholder")}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">
                          {t("generate.filters.allStatuses")}
                        </SelectItem>
                        <SelectItem value="active">
                          {t("generate.filters.active")}
                        </SelectItem>
                        <SelectItem value="inactive">
                          {t("generate.filters.inactive")}
                        </SelectItem>
                        <SelectItem value="pending">
                          {t("generate.filters.pending")}
                        </SelectItem>
                        <SelectItem value="completed">
                          {t("generate.filters.completed")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={handleGenerateReport}
                    disabled={!selectedReportType || generating}
                    className="flex items-center gap-2"
                  >
                    <Play className="h-4 w-4" />
                    {generating
                      ? t("generate.buttons.generating")
                      : t("generate.buttons.generate")}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => handleExportReport("excel")}
                    disabled={!selectedReportType || exporting}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    {t("generate.buttons.exportExcel")}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => handleExportReport("csv")}
                    disabled={!selectedReportType || exporting}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    {t("generate.buttons.exportCsv")}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => handleExportReport("pdf")}
                    disabled={!selectedReportType || exporting}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    {t("generate.buttons.exportPdf")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Results Tab */}
          <TabsContent value="results" className="space-y-6">
            {generatedReport ? (
              <Card>
                <CardHeader>
                  <CardTitle>{generatedReport.title}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>
                      {t("results.totalRecords")}:{" "}
                      {generatedReport.total_records}
                    </span>
                    <span>
                      {t("results.generated")}:{" "}
                      {new Date(generatedReport.generated_at).toLocaleString()}
                    </span>
                    <span>
                      {t("results.executionTime")}:{" "}
                      {generatedReport.execution_time.toFixed(2)}s
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          {generatedReport.columns.map((column) => (
                            <TableHead key={column.key}>
                              {column.label}
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {generatedReport.data.slice(0, 50).map((row, index) => (
                          <TableRow key={index}>
                            {generatedReport.columns.map((column) => (
                              <TableCell key={column.key}>
                                {row[column.key]?.toString() || "-"}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  {generatedReport.data.length > 50 && (
                    <div className="mt-4 text-center text-sm text-muted-foreground">
                      {t("results.showingRecords", {
                        total: generatedReport.total_records,
                      })}{" "}
                      {t("results.exportNote")}
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {t("results.noReport.title")}
                  </h3>
                  <p className="text-muted-foreground text-center">
                    {t("results.noReport.description")}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  {t("history.title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {executionsLoading ? (
                  <div className="animate-pulse space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-12 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{t("history.table.reportType")}</TableHead>
                          <TableHead>{t("history.table.status")}</TableHead>
                          <TableHead>{t("history.table.executedBy")}</TableHead>
                          <TableHead>
                            {t("history.table.executionTime")}
                          </TableHead>
                          <TableHead>{t("history.table.createdAt")}</TableHead>
                          <TableHead>{t("history.table.actions")}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(executions?.results || []).map((execution) => (
                          <TableRow key={execution.id}>
                            <TableCell>
                              {execution.template?.name ||
                                t("history.dynamicReport")}
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(execution.status)}
                            </TableCell>
                            <TableCell>{execution.executed_by}</TableCell>
                            <TableCell>
                              {execution.execution_time
                                ? `${execution.execution_time.toFixed(2)}s`
                                : "-"}
                            </TableCell>
                            <TableCell>
                              {new Date(execution.created_at).toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">
                                {t("history.viewButton")}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="statistics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t("statistics.cards.totalReports")}
                  </CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {statsLoading ? (
                      <div className="h-8 bg-gray-200 rounded animate-pulse w-16"></div>
                    ) : (
                      statistics?.total_reports || 0
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t("statistics.cards.thisMonth")}
                  </CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {statsLoading ? (
                      <div className="h-8 bg-gray-200 rounded animate-pulse w-16"></div>
                    ) : (
                      statistics?.reports_this_month || 0
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t("statistics.cards.mostUsedType")}
                  </CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-sm font-bold">
                    {statsLoading ? (
                      <div className="h-6 bg-gray-200 rounded animate-pulse w-24"></div>
                    ) : (
                      statistics?.most_used_type || "N/A"
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t("statistics.cards.avgExecutionTime")}
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {statsLoading ? (
                      <div className="h-8 bg-gray-200 rounded animate-pulse w-16"></div>
                    ) : (
                      `${(statistics?.average_execution_time || 0).toFixed(2)}s`
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Executions */}
            <Card>
              <CardHeader>
                <CardTitle>{t("statistics.recentExecutions")}</CardTitle>
              </CardHeader>
              <CardContent>
                {statsLoading ? (
                  <div className="animate-pulse space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-12 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {statistics?.recent_executions?.map((execution) => (
                      <div
                        key={execution.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div>
                          <p className="font-medium">
                            {execution.template?.name ||
                              t("history.dynamicReport")}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(execution.created_at).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(execution.status)}
                          <Button variant="outline" size="sm">
                            {t("history.viewButton")}
                          </Button>
                        </div>
                      </div>
                    )) || (
                      <p className="text-center text-muted-foreground py-8">
                        {t("statistics.noRecentExecutions")}
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
