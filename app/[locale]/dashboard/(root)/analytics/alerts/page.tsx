"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Bell, 
  BellOff,
  AlertTriangle,
  AlertCircle,
  Info,
  Zap
} from "lucide-react";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import LoadingError from "@/components/dashboard/LoadingError";
import {
  useGetAlertsQuery,
  useCreateAlertMutation,
  useUpdateAlertMutation,
  useDeleteAlertMutation,
  AnalyticsAlert,
} from "@/redux/services/analytics/analyticsApi";

interface AlertFormData {
  name: string;
  alert_type: 'threshold' | 'trend' | 'anomaly';
  data_source: string;
  condition: Record<string, any>;
  severity: 'low' | 'medium' | 'high' | 'critical';
  recipients: string[];
  is_active: boolean;
}

const DATA_SOURCES = [
  { value: 'sales_total', label: 'Total Sales' },
  { value: 'inventory_value', label: 'Inventory Value' },
  { value: 'low_stock_items', label: 'Low Stock Items' },
  { value: 'revenue_vs_expenses', label: 'Revenue vs Expenses' },
  { value: 'accounts_receivable', label: 'Accounts Receivable' },
  { value: 'accounts_payable', label: 'Accounts Payable' },
];

const ALERT_TYPES = [
  { value: 'threshold', label: 'Threshold Alert', description: 'Trigger when value crosses a threshold' },
  { value: 'trend', label: 'Trend Alert', description: 'Trigger based on data trends' },
  { value: 'anomaly', label: 'Anomaly Alert', description: 'Trigger when unusual patterns detected' },
];

const SEVERITY_LEVELS = [
  { value: 'low', label: 'Low', color: 'bg-blue-100 text-blue-800' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800' },
  { value: 'critical', label: 'Critical', color: 'bg-red-100 text-red-800' },
];

export default function AlertsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<AnalyticsAlert | null>(null);
  const [formData, setFormData] = useState<AlertFormData>({
    name: "",
    alert_type: "threshold",
    data_source: "",
    condition: {},
    severity: "medium",
    recipients: [],
    is_active: true,
  });
  const [recipientInput, setRecipientInput] = useState("");

  // API hooks
  const { data: alerts, isLoading, error } = useGetAlertsQuery({});
  const [createAlert, { isLoading: creating }] = useCreateAlertMutation();
  const [updateAlert, { isLoading: updating }] = useUpdateAlertMutation();
  const [deleteAlert, { isLoading: deleting }] = useDeleteAlertMutation();

  const handleCreateAlert = async () => {
    try {
      await createAlert(formData).unwrap();
      setIsCreateDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Failed to create alert:", error);
    }
  };

  const handleEditAlert = async () => {
    if (!selectedAlert) return;

    try {
      await updateAlert({
        id: selectedAlert.id,
        alert: formData,
      }).unwrap();
      setIsEditDialogOpen(false);
      setSelectedAlert(null);
      resetForm();
    } catch (error) {
      console.error("Failed to update alert:", error);
    }
  };

  const handleDeleteAlert = async (id: number) => {
    if (confirm("Are you sure you want to delete this alert?")) {
      try {
        await deleteAlert(id).unwrap();
      } catch (error) {
        console.error("Failed to delete alert:", error);
      }
    }
  };

  const openEditDialog = (alert: AnalyticsAlert) => {
    setSelectedAlert(alert);
    setFormData({
      name: alert.name,
      alert_type: alert.alert_type,
      data_source: alert.data_source,
      condition: alert.condition,
      severity: alert.severity,
      recipients: alert.recipients,
      is_active: alert.is_active,
    });
    setIsEditDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      alert_type: "threshold",
      data_source: "",
      condition: {},
      severity: "medium",
      recipients: [],
      is_active: true,
    });
    setRecipientInput("");
  };

  const addRecipient = () => {
    if (recipientInput && !formData.recipients.includes(recipientInput)) {
      setFormData({
        ...formData,
        recipients: [...formData.recipients, recipientInput],
      });
      setRecipientInput("");
    }
  };

  const removeRecipient = (email: string) => {
    setFormData({
      ...formData,
      recipients: formData.recipients.filter(r => r !== email),
    });
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'high':
        return <AlertCircle className="h-4 w-4 text-orange-600" />;
      case 'medium':
        return <Info className="h-4 w-4 text-yellow-600" />;
      default:
        return <Info className="h-4 w-4 text-blue-600" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    const severityConfig = SEVERITY_LEVELS.find(s => s.value === severity);
    return (
      <Badge className={severityConfig?.color}>
        {severityConfig?.label || severity}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <main className="mx-4 sm:mx-7 my-5">
        <div className="flex">
          <IconWithTitle
            imageSrc="/assets/icons/sidebar/alerts.svg"
            title="Alerts Management"
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

  if (error) {
    return (
      <main className="mx-4 sm:mx-7 my-5">
        <div className="flex">
          <IconWithTitle
            imageSrc="/assets/icons/sidebar/alerts.svg"
            title="Alerts Management"
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
          imageSrc="/assets/icons/sidebar/alerts.svg"
          title="Alerts Management"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>
      
      <div className="bg-dashboardBg px-4 sm:px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Alerts Management</h1>
            <p className="text-muted-foreground">Set up alerts to monitor your business metrics</p>
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Create Alert
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Alert</DialogTitle>
                <DialogDescription>
                  Set up a new alert to monitor your business metrics and get notified when conditions are met.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Alert Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter alert name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="alert_type">Alert Type</Label>
                    <Select 
                      value={formData.alert_type} 
                      onValueChange={(value: any) => setFormData({ ...formData, alert_type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select alert type" />
                      </SelectTrigger>
                      <SelectContent>
                        {ALERT_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex flex-col">
                              <span>{type.label}</span>
                              <span className="text-xs text-muted-foreground">{type.description}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="data_source">Data Source</Label>
                    <Select 
                      value={formData.data_source} 
                      onValueChange={(value) => setFormData({ ...formData, data_source: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select data source" />
                      </SelectTrigger>
                      <SelectContent>
                        {DATA_SOURCES.map((source) => (
                          <SelectItem key={source.value} value={source.value}>
                            {source.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="severity">Severity Level</Label>
                    <Select 
                      value={formData.severity} 
                      onValueChange={(value: any) => setFormData({ ...formData, severity: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        {SEVERITY_LEVELS.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="condition">Alert Condition</Label>
                  <Textarea
                    id="condition"
                    value={JSON.stringify(formData.condition, null, 2)}
                    onChange={(e) => {
                      try {
                        const condition = JSON.parse(e.target.value);
                        setFormData({ ...formData, condition });
                      } catch (error) {
                        // Invalid JSON, keep the text as is
                      }
                    }}
                    placeholder='{"threshold": 10000, "operator": "greater_than"}'
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter condition as JSON. Example: {"{"}"threshold": 10000, "operator": "greater_than"{"}"}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Email Recipients</Label>
                  <div className="flex gap-2">
                    <Input
                      value={recipientInput}
                      onChange={(e) => setRecipientInput(e.target.value)}
                      placeholder="Enter email address"
                      onKeyPress={(e) => e.key === 'Enter' && addRecipient()}
                    />
                    <Button type="button" onClick={addRecipient} variant="outline">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.recipients.map((email) => (
                      <Badge key={email} variant="secondary" className="flex items-center gap-1">
                        {email}
                        <button
                          type="button"
                          onClick={() => removeRecipient(email)}
                          className="ml-1 text-xs hover:text-red-600"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <Label htmlFor="is_active">Active alert</Label>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateAlert} disabled={creating || !formData.name || !formData.data_source}>
                  {creating ? "Creating..." : "Create Alert"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Alerts Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Your Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Data Source</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Triggered</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {alerts?.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getSeverityIcon(alert.severity)}
                          <span className="font-medium">{alert.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {alert.alert_type.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {DATA_SOURCES.find(s => s.value === alert.data_source)?.label || alert.data_source}
                        </span>
                      </TableCell>
                      <TableCell>
                        {getSeverityBadge(alert.severity)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {alert.is_active ? (
                            <Bell className="h-4 w-4 text-green-600" />
                          ) : (
                            <BellOff className="h-4 w-4 text-gray-400" />
                          )}
                          <span className="text-sm">
                            {alert.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {alert.last_triggered 
                            ? new Date(alert.last_triggered).toLocaleDateString()
                            : 'Never'
                          }
                        </span>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openEditDialog(alert)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {}}>
                              <Zap className="h-4 w-4 mr-2" />
                              Test Alert
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteAlert(alert.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {!alerts?.length && (
              <div className="text-center py-12">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Alerts Configured</h3>
                <p className="text-muted-foreground mb-4">
                  Set up your first alert to monitor important business metrics.
                </p>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Alert
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Edit Dialog - Similar to Create Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Alert</DialogTitle>
              <DialogDescription>
                Update your alert configuration and settings.
              </DialogDescription>
            </DialogHeader>
            
            {/* Same form fields as create dialog */}
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {/* Form fields identical to create dialog */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Alert Name</Label>
                  <Input
                    id="edit-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter alert name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-alert_type">Alert Type</Label>
                  <Select 
                    value={formData.alert_type} 
                    onValueChange={(value: any) => setFormData({ ...formData, alert_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select alert type" />
                    </SelectTrigger>
                    <SelectContent>
                      {ALERT_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex flex-col">
                            <span>{type.label}</span>
                            <span className="text-xs text-muted-foreground">{type.description}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Rest of the form fields... */}
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label htmlFor="edit-is_active">Active alert</Label>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditAlert} disabled={updating || !formData.name || !formData.data_source}>
                {updating ? "Updating..." : "Update Alert"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}

