"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
}

export interface FilterState {
  search: string;
  agents: string;
  groups: string;
  created: string;
  closedAt: string;
  resolvedAt: string;
  resolutionDue: string;
  firstResponseDue: string;
  nextResponseDue: string;
}

export default function FilterSidebar({
  isOpen,
  onClose,
  onApply,
}: FilterSidebarProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    agents: "any",
    groups: "any",
    created: "last30",
    closedAt: "any",
    resolvedAt: "any",
    resolutionDue: "any",
    firstResponseDue: "any",
    nextResponseDue: "any",
  });

  const handleApply = () => {
    onApply(filters);
  };

  const handleReset = () => {
    const resetFilters: FilterState = {
      search: "",
      agents: "any",
      groups: "any",
      created: "last30",
      closedAt: "any",
      resolvedAt: "any",
      resolutionDue: "any",
      firstResponseDue: "any",
      nextResponseDue: "any",
    };
    setFilters(resetFilters);
    onApply(resetFilters);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white border-l border-[#E8EBF5] shadow-xl z-50 overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E8EBF5] pb-4">
          <h2 className="text-lg font-semibold text-[#092A6D]">FILTERS</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#F5F7FA] rounded transition-colors"
          >
            <X className="h-5 w-5 text-[#666666]" />
          </button>
        </div>

        {/* Search */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-[#333333]">
            Search fields
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#666666]" />
            <Input
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
              placeholder="Search..."
              className="pl-9 border-[#E8EBF5] focus:ring-2 focus:ring-[#D7B55A] focus:border-transparent"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#333333]">
              Agents Include
            </Label>
            <Select
              value={filters.agents}
              onValueChange={(value) =>
                setFilters({ ...filters, agents: value })
              }
            >
              <SelectTrigger className="border-[#E8EBF5]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any agent</SelectItem>
                <SelectItem value="orm">Orm Thong</SelectItem>
                <SelectItem value="phoenix">Phoenix</SelectItem>
                <SelectItem value="dev">Development Team</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#333333]">
              Groups Include
            </Label>
            <Select
              value={filters.groups}
              onValueChange={(value) =>
                setFilters({ ...filters, groups: value })
              }
            >
              <SelectTrigger className="border-[#E8EBF5]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any group</SelectItem>
                <SelectItem value="customer">Customer Service</SelectItem>
                <SelectItem value="development">Development</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#333333]">Created</Label>
            <Select
              value={filters.created}
              onValueChange={(value) =>
                setFilters({ ...filters, created: value })
              }
            >
              <SelectTrigger className="border-[#E8EBF5]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="last7">Last 7 days</SelectItem>
                <SelectItem value="last30">Last 30 days</SelectItem>
                <SelectItem value="last90">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#333333]">
              Closed at
            </Label>
            <Select
              value={filters.closedAt}
              onValueChange={(value) =>
                setFilters({ ...filters, closedAt: value })
              }
            >
              <SelectTrigger className="border-[#E8EBF5]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="last7">Last 7 days</SelectItem>
                <SelectItem value="last30">Last 30 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#333333]">
              Resolved at
            </Label>
            <Select
              value={filters.resolvedAt}
              onValueChange={(value) =>
                setFilters({ ...filters, resolvedAt: value })
              }
            >
              <SelectTrigger className="border-[#E8EBF5]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="last7">Last 7 days</SelectItem>
                <SelectItem value="last30">Last 30 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#333333]">
              Resolution due by
            </Label>
            <Select
              value={filters.resolutionDue}
              onValueChange={(value) =>
                setFilters({ ...filters, resolutionDue: value })
              }
            >
              <SelectTrigger className="border-[#E8EBF5]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="tomorrow">Tomorrow</SelectItem>
                <SelectItem value="next7">Next 7 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#333333]">
              First response due by
            </Label>
            <Select
              value={filters.firstResponseDue}
              onValueChange={(value) =>
                setFilters({ ...filters, firstResponseDue: value })
              }
            >
              <SelectTrigger className="border-[#E8EBF5]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="tomorrow">Tomorrow</SelectItem>
                <SelectItem value="next7">Next 7 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#333333]">
              Next response due by
            </Label>
            <Select
              value={filters.nextResponseDue}
              onValueChange={(value) =>
                setFilters({ ...filters, nextResponseDue: value })
              }
            >
              <SelectTrigger className="border-[#E8EBF5]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="tomorrow">Tomorrow</SelectItem>
                <SelectItem value="next7">Next 7 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t border-[#E8EBF5]">
          <Button
            onClick={handleReset}
            variant="outline"
            className="flex-1 border-[#E8EBF5] text-[#333333] hover:bg-[#F5F7FA]"
          >
            Reset
          </Button>
          <Button
            onClick={handleApply}
            className="flex-1 bg-[#092A6D] hover:bg-[#697293] text-white"
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}

