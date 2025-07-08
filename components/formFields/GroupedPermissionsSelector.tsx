"use client";
import React, { useState } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";

interface Permission {
  id: number;
  name: string;
  codename: string;
  action: string;
}

interface PermissionGroup {
  id: string;
  name: string;
  app_label: string;
  permissions: Permission[];
}

interface GroupedPermissionsSelectorProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
  placeholder?: string;
  className?: string;
  groups: PermissionGroup[];
  filterPermissions?: number[]; // For filtering permissions based on job role
}

const GroupedPermissionsSelector = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ 
  control,
  name,
  label,
  className,
  groups,
  filterPermissions,
}: GroupedPermissionsSelectorProps<TFieldValues, TName>) => {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const toggleGroup = (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const getFilteredGroups = () => {
    if (!filterPermissions || filterPermissions.length === 0) {
      return groups;
    }

    return groups
      .map((group) => ({
        ...group,
        permissions: group.permissions.filter((permission) =>
          filterPermissions.includes(permission.id)
        ),
      }))
      .filter((group) => group.permissions.length > 0);
  };

  const filteredGroups = getFilteredGroups();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const allPermissionIds = filteredGroups.flatMap((group) =>
          group.permissions.map((p) => p.id)
        );

        const selectedPermissions = field.value || [];
        const isAllSelected = allPermissionIds.length > 0 && selectedPermissions.length === allPermissionIds.length;
        const isPartiallySelected =
          selectedPermissions.length > 0 && !isAllSelected;

        return (
          <FormItem className={className}>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <div className="space-y-2 border rounded-md p-4 max-h-96 overflow-y-auto">
                <div className="flex items-center space-x-2 pb-2 border-b">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        field.onChange(allPermissionIds);
                      } else {
                        field.onChange([]);
                      }
                    }}
                    ref={(el) => {
                      if (el) el.indeterminate = isPartiallySelected;
                    }}
                  />
                  <span className="font-medium text-sm">Select All</span>
                </div>
                {filteredGroups.map((group) => {
                  const groupPermissionIds = group.permissions.map((p) => p.id);
                  const selectedInGroup = groupPermissionIds.filter((id) =>
                    selectedPermissions.includes(id)
                  );
                  const isGroupAllSelected = groupPermissionIds.length > 0 && selectedInGroup.length === groupPermissionIds.length;
                  const isGroupPartiallySelected =
                    selectedInGroup.length > 0 && !isGroupAllSelected;
                  const isExpanded = expandedGroups.has(group.id);

                  return (
                    <div key={group.id} className="border rounded-md">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-t-md">
                        <div className="flex items-center space-x-2">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleGroup(group.id)}
                            className="p-0 h-auto"
                          >
                            {isExpanded ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </Button>
                          <Checkbox
                            checked={isGroupAllSelected}
                            onCheckedChange={(checked) => {
                              const currentSelected = new Set(selectedPermissions);
                              if (checked) {
                                groupPermissionIds.forEach((id) => currentSelected.add(id));
                              } else {
                                groupPermissionIds.forEach((id) =>
                                  currentSelected.delete(id)
                                );
                              }
                              field.onChange(Array.from(currentSelected));
                            }}
                            ref={(el) => {
                              if (el) el.indeterminate = isGroupPartiallySelected;
                            }}
                          />
                          <span className="font-medium text-sm">{group.name}</span>
                          <span className="text-xs text-gray-500">
                            ({selectedInGroup.length}/{group.permissions.length})
                          </span>
                        </div>
                      </div>
                      {isExpanded && (
                        <div className="p-3 space-y-2 bg-white rounded-b-md">
                          {group.permissions.map((permission) => (
                            <div
                              key={permission.id}
                              className="flex items-center space-x-2 pl-6"
                            >
                              <Checkbox
                                checked={selectedPermissions.includes(permission.id)}
                                onCheckedChange={(checked) => {
                                  const currentSelected = new Set(selectedPermissions);
                                  if (checked) {
                                    currentSelected.add(permission.id);
                                  } else {
                                    currentSelected.delete(permission.id);
                                  }
                                  field.onChange(Array.from(currentSelected));
                                }}
                              />
                              <span className="text-sm">{permission.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default GroupedPermissionsSelector;