"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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
  Copy, 
  Share, 
  Settings,
  Layout,
  Eye,
  Star
} from "lucide-react";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import LoadingError from "@/components/dashboard/LoadingError";
import {
  useGetDashboardsQuery,
  useCreateDashboardMutation,
  useUpdateDashboardMutation,
  useDeleteDashboardMutation,
  Dashboard,
} from "@/redux/services/analytics/analyticsApi";

interface DashboardFormData {
  name: string;
  description: string;
  is_default: boolean;
  is_public: boolean;
}

export default function DashboardManagementPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedDashboard, setSelectedDashboard] = useState<Dashboard | null>(null);
  const [formData, setFormData] = useState<DashboardFormData>({
    name: "",
    description: "",
    is_default: false,
    is_public: false,
  });

  // API hooks
  const { data: dashboards, isLoading, error } = useGetDashboardsQuery({});
  const [createDashboard, { isLoading: creating }] = useCreateDashboardMutation();
  const [updateDashboard, { isLoading: updating }] = useUpdateDashboardMutation();
  const [deleteDashboard, { isLoading: deleting }] = useDeleteDashboardMutation();

  const handleCreateDashboard = async () => {
    try {
      await createDashboard(formData).unwrap();
      setIsCreateDialogOpen(false);
      setFormData({
        name: "",
        description: "",
        is_default: false,
        is_public: false,
      });
    } catch (error) {
      console.error("Failed to create dashboard:", error);
    }
  };

  const handleEditDashboard = async () => {
    if (!selectedDashboard) return;

    try {
      await updateDashboard({
        id: selectedDashboard.id,
        dashboard: formData,
      }).unwrap();
      setIsEditDialogOpen(false);
      setSelectedDashboard(null);
      setFormData({
        name: "",
        description: "",
        is_default: false,
        is_public: false,
      });
    } catch (error) {
      console.error("Failed to update dashboard:", error);
    }
  };

  const handleDeleteDashboard = async (id: number) => {
    if (confirm("Are you sure you want to delete this dashboard?")) {
      try {
        await deleteDashboard(id).unwrap();
      } catch (error) {
        console.error("Failed to delete dashboard:", error);
      }
    }
  };

  const openEditDialog = (dashboard: Dashboard) => {
    setSelectedDashboard(dashboard);
    setFormData({
      name: dashboard.name,
      description: dashboard.description || "",
      is_default: dashboard.is_default,
      is_public: dashboard.is_public,
    });
    setIsEditDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      is_default: false,
      is_public: false,
    });
  };

  if (isLoading) {
    return (
      <main className="mx-4 sm:mx-7 my-5">
        <div className="flex">
          <IconWithTitle
            imageSrc="/assets/icons/sidebar/dashboard.svg"
            title="Dashboard Management"
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
            imageSrc="/assets/icons/sidebar/dashboard.svg"
            title="Dashboard Management"
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
          imageSrc="/assets/icons/sidebar/dashboard.svg"
          title="Dashboard Management"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>
      
      <div className="bg-dashboardBg px-4 sm:px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Dashboard Management</h1>
            <p className="text-muted-foreground">Create and manage your analytics dashboards</p>
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Create Dashboard
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Dashboard</DialogTitle>
                <DialogDescription>
                  Create a new dashboard to organize your analytics widgets.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Dashboard Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter dashboard name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter dashboard description"
                    rows={3}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_default"
                    checked={formData.is_default}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_default: checked })}
                  />
                  <Label htmlFor="is_default">Set as default dashboard</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_public"
                    checked={formData.is_public}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_public: checked })}
                  />
                  <Label htmlFor="is_public">Make public (visible to all users)</Label>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateDashboard} disabled={creating || !formData.name}>
                  {creating ? "Creating..." : "Create Dashboard"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Dashboards Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layout className="h-5 w-5" />
              Your Dashboards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Widgets</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dashboards?.map((dashboard) => (
                    <TableRow key={dashboard.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{dashboard.name}</span>
                          {dashboard.is_default && (
                            <Badge variant="secondary" className="text-xs">
                              <Star className="h-3 w-3 mr-1" />
                              Default
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {dashboard.description || "No description"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {dashboard.is_public && (
                            <Badge variant="outline" className="text-xs">
                              Public
                            </Badge>
                          )}
                          {!dashboard.is_public && (
                            <Badge variant="secondary" className="text-xs">
                              Private
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {dashboard.widgets?.length || 0} widgets
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {new Date(dashboard.created_at).toLocaleDateString()}
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
                            <DropdownMenuItem onClick={() => {}}>
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openEditDialog(dashboard)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {}}>
                              <Settings className="h-4 w-4 mr-2" />
                              Manage Widgets
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {}}>
                              <Copy className="h-4 w-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {}}>
                              <Share className="h-4 w-4 mr-2" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteDashboard(dashboard.id)}
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
            
            {!dashboards?.length && (
              <div className="text-center py-12">
                <Layout className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Dashboards Found</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first dashboard to start organizing your analytics widgets.
                </p>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Dashboard
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Dashboard</DialogTitle>
              <DialogDescription>
                Update your dashboard settings and configuration.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Dashboard Name</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter dashboard name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter dashboard description"
                  rows={3}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-is_default"
                  checked={formData.is_default}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_default: checked })}
                />
                <Label htmlFor="edit-is_default">Set as default dashboard</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-is_public"
                  checked={formData.is_public}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_public: checked })}
                />
                <Label htmlFor="edit-is_public">Make public (visible to all users)</Label>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditDashboard} disabled={updating || !formData.name}>
                {updating ? "Updating..." : "Update Dashboard"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}

