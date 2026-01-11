"use client";

import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { MessageCircle, ChevronDown } from "lucide-react";
import type { RepairListItem } from "@/services/repairService";

interface RepairTicketCardProps {
  repair: RepairListItem;
  isSelected?: boolean;
  onSelect?: (id: number, selected: boolean) => void;
}

export default function RepairTicketCard({
  repair,
  isSelected = false,
  onSelect,
}: RepairTicketCardProps) {
  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "High":
        return "bg-yellow-500";
      case "Medium":
        return "bg-blue-500";
      case "Low":
        return "bg-green-500";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "New":
        return (
          <Badge className="bg-[#D7B55A] text-white border-0 text-xs px-2 py-0.5">
            New
          </Badge>
        );
      case "Pending":
        return (
          <Badge className="bg-orange-500 text-white border-0 text-xs px-2 py-0.5">
            First response due
          </Badge>
        );
      case "In Progress":
        return null;
      case "Closed":
        return (
          <Badge className="bg-green-500 text-white border-0 text-xs px-2 py-0.5">
            Resolved on time
          </Badge>
        );
      default:
        return null;
    }
  };

  const getInitials = (name?: string) => {
    if (!name) return "?";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const getAvatarColor = (name?: string) => {
    if (!name) return "bg-gray-400";
    const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colors = [
      "bg-orange-500",
      "bg-blue-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
    ];
    return colors[hash % colors.length];
  };

  return (
    <div className="flex items-start gap-4 p-4 border-b border-[#E8EBF5] hover:bg-[#F5F7FA] transition-colors group">
      {/* Checkbox */}
      <div className="pt-1">
        <Checkbox
          checked={isSelected}
          onCheckedChange={(checked) =>
            onSelect?.(repair.id, checked === true)
          }
          className="border-[#697293] data-[state=checked]:bg-[#092A6D] data-[state=checked]:border-[#092A6D]"
        />
      </div>

      {/* Avatar */}
      <Avatar className={`${getAvatarColor(repair.customerName)} h-10 w-10`}>
        <AvatarFallback className="text-white text-sm font-medium">
          {getInitials(repair.customerName)}
        </AvatarFallback>
      </Avatar>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <Link
          href={`/dashboard/repair-details/${repair.id}`}
          className="block hover:underline"
        >
          <div className="flex items-start gap-2 mb-2">
            {getStatusBadge(repair.status)}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-[#092A6D]">
                  [{repair.customerName || "N/A"}]
                </span>
                <span className="text-sm text-[#333333]">
                  {repair.printerModel}
                </span>
                <span className="text-sm text-[#666666] font-mono">
                  #{repair.id}
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Details */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-[#666666] mt-2">
          <div className="flex items-center gap-1">
            <MessageCircle className="h-3 w-3" />
            <span>{repair.assignedTo || "Unassigned"}</span>
          </div>
          <span>Created: {repair.createdAgo || repair.createdAt}</span>
          {repair.firstResponseDue && (
            <span className="text-orange-600 font-medium">
              First response due in: {repair.firstResponseDue}
            </span>
          )}
          {repair.dueIn && (
            <span>Due in: {repair.dueIn}</span>
          )}
          {repair.resolvedAt && (
            <span className="text-green-600">Resolved on time</span>
          )}
          {repair.inProgressFor && (
            <span>In Progress for: {repair.inProgressFor}</span>
          )}
        </div>
      </div>

      {/* Right Side Controls */}
      <div className="flex items-center gap-2">
        {/* Priority */}
        <Select defaultValue={repair.priority || "Low"}>
          <SelectTrigger className="h-8 w-24 border-[#E8EBF5] text-xs">
            <div className="flex items-center gap-1.5">
              <div
                className={`w-2 h-2 rounded-full ${getPriorityColor(
                  repair.priority
                )}`}
              />
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Low">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                Low
              </div>
            </SelectItem>
            <SelectItem value="Medium">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                Medium
              </div>
            </SelectItem>
            <SelectItem value="High">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                High
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Assignee */}
        <Select defaultValue={repair.assignedGroup || "unassigned"}>
          <SelectTrigger className="h-8 w-32 border-[#E8EBF5] text-xs">
            <div className="flex items-center gap-1.5">
              <div className="h-4 w-4 rounded-full bg-[#092A6D] flex items-center justify-center">
                <span className="text-[8px] text-white">
                  {getInitials(repair.assignedTo).charAt(0)}
                </span>
              </div>
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Customer Service">Customer Service</SelectItem>
            <SelectItem value="Development">Development</SelectItem>
            <SelectItem value="unassigned">Unassigned</SelectItem>
          </SelectContent>
        </Select>

        {/* Status */}
        <Select defaultValue={repair.status}>
          <SelectTrigger className="h-8 w-32 border-[#E8EBF5] text-xs">
            <div className="flex items-center gap-1.5">
              <div className="h-1 w-6 bg-[#092A6D] rounded-full" />
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

