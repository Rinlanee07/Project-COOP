// app/dashboard/DashboardClient.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import 'react-datepicker/dist/react-datepicker.css';
import { th } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import type { Ticket, TicketStatus, TicketCounts } from "../../types/ticket";
import { ApiClient } from "@/lib/api-client";
const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002');
import {
  Wrench,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  List,
} from "lucide-react";

// ใช้ type จาก ticket.ts
type StatusCounts = TicketCounts;

const DashboardClient = ({ statusCounts }: { statusCounts: Record<TicketStatus, number> }) => {
  const [token, setToken] = useState<string | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const fetchTickets = React.useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const startStr = startDate
        ? startDate.toISOString().split('T')[0]
        : undefined;

      const endStr = endDate
        ? endDate.toISOString().split('T')[0]
        : undefined;

      const response = await apiClient.getTickets(token, {
        startDate: startStr,
        endDate: endStr,
      });

      if (response.error) {
        setError(response.error);
        setTickets([]);
      } else {
        setTickets(response.data || []);
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
      setTickets([]);
    } finally {
      setLoading(false);
    }
  }, [token, startDate, endDate]);

  useEffect(() => {
    const initializeData = async () => {
      if (typeof window !== 'undefined') {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
          setLoading(false);
          setError('Please login to view data');
          return;
        }

        setToken(storedToken);
        // If we just set certain token, wait for re-render for fetchTickets to pick it up?
        // Actually fetchTickets depends on 'token' state. 
        // If we call it here, it uses the closure 'token' which is null!
        // So we should strictly rely on the subsequent effect trigger when token changes.
        // OR pass token explicitly.
        // But fetchTickets uses state 'token'.
        // So we should NOT call fetchTickets here if token is null in closure.
        // But the original code called it: await fetchTickets();

        // Fix: If we setToken, we expect re-render.
        // The effect depends on fetchTickets.
        // If token changes, fetchTickets changes -> effect runs.
        // But initializeData sets token... 

        // Let's just make fetchTickets accessible.
      }
    };

    initializeData();
  }, []); // Wait, if I change fetchTickets deps, I must add it here!

  // Splitting the effect is better.
  useEffect(() => {
    if (token) {
      fetchTickets();
    } else {
      // Check localStorage only once? 
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      } else {
        setLoading(false); // No token found
      }
    }
  }, [token, fetchTickets]); // This will loop if fetchTickets changes constantly? 
  // fetchTickets changes when query params change. That's OK.


  const getStatusColor = (status: string) => {
    switch (status) {
      case "New": return "bg-[#646c91] text-white border border-[#646c91]";
      case "In Progress": return "bg-[#646c91] text-white border border-[#646c91]";
      case "Pending": return "bg-[#646c91] text-white border border-[#646c91]";
      case "Resolved": return "bg-[#646c91] text-white border border-[#646c91]";
      case "Closed": return "bg-[#646c91] text-white border border-[#646c91]";
      default: return "bg-[#646c91] text-white border border-[#646c91]";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "New": return <Plus className="w-6 h-6" />;
      case "In Progress": return <Wrench className="w-6 h-6" />;
      case "Pending": return <Clock className="w-6 h-6" />;
      case "Resolved": return <CheckCircle className="w-6 h-6" />;
      case "Closed": return <CheckCircle className="w-6 h-6" />;
      default: return <AlertCircle className="w-6 h-6" />;
    }
  };

  const getCardGradient = (status: string) => {
    switch (status) {
      case "New": return "from-[#E8EBF5] to-[#E8EBF5] border-[#646c91]";
      case "In Progress": return "from-[#E8EBF5] to-[#E8EBF5] border-[#646c91]";
      case "Pending": return "from-[#E8EBF5] to-[#E8EBF5] border-[#646c91]";
      case "Resolved": return "from-[#E8EBF5] to-[#E8EBF5] border-[#646c91]";
      case "Closed": return "from-[#E8EBF5] to-[#E8EBF5] border-[#646c91]";
      default: return "from-[#E8EBF5] to-[#E8EBF5] border-[#646c91]";
    }
  };

  const quickActions = [
    {
      title: "Repair items",
      icon: <List className="w-6 h-6" />,
      href: "/dashboard/repair-details",
      gradient: "from-[#646c91] to-[#646c91]",
      description: "Create new",
    },
    {
      title: "Create Repair",
      icon: <Plus className="w-6 h-6" />,
      href: "/dashboard/create-repair",
      gradient: "from-[#646c91] to-[#646c91]",
      description: "Create new repair request",
    },
  ];

  const statusLabels: Record<string, string> = {
    'New': "New",
    'In Progress': "In Progress",
    'Pending': "Pending",
    'Resolved': "Resolved",
    'Closed': "Closed",
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTickets();
  };

  const clearFilter = () => {
    setStartDate(null);
    setEndDate(null);
    fetchTickets();
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {Object.entries(statusCounts).map(([status, count]: [string, number]) => (
            <Card
              key={status}
              className={`bg-gradient-to-br ${getCardGradient(status)} backdrop-blur-sm rounded-2xl border-2`}
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className={`p-4 rounded-2xl ${getStatusColor(status)}`}>
                    {getStatusIcon(status)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#666666] mb-1">
                      {statusLabels[status]}
                    </p>
                    <p className="text-3xl font-bold text-[#092A6D]">
                      {count}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-[#092A6D] mb-6">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickActions.map((action, i) => (
              <Link
                key={i}
                href={action.href}
                className={`p-8 rounded-2xl shadow-xl flex items-center space-x-6 bg-gradient-to-r ${action.gradient} text-white`}
              >
                <div className="p-4 bg-white/20 rounded-2xl">{action.icon}</div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold mb-2">{action.title}</h4>
                  <p className="text-white/80 text-sm">{action.description}</p>
                </div>
                <div className="text-white/60">→</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Date Range Filter */}
        <div className="mb-6 p-4 bg-white rounded-xl shadow-sm border border-[#E8EBF5]">
          <form onSubmit={handleFilter} className="flex flex-col sm:flex-row gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-[#333333] mb-1">Start Date</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd MMMM yyyy"
                locale={th}
                placeholderText="Select date"
                className="px-3 py-2 border border-[#E8EBF5] rounded-lg w-full sm:w-auto focus:ring-2 focus:ring-[#D7B55A] focus:border-transparent"
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#333333] mb-1">End Date</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="dd MMMM yyyy"
                locale={th}
                placeholderText="Select date"
                className="px-3 py-2 border border-[#E8EBF5] rounded-lg w-full sm:w-auto focus:ring-2 focus:ring-[#D7B55A] focus:border-transparent"
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-[#092A6D] text-white rounded-lg hover:bg-[#697293] transition-all"
              >
                Search
              </button>
              <button
                type="button"
                onClick={clearFilter}
                className="px-4 py-2 bg-[#E8EBF5] text-[#333333] rounded-lg hover:bg-[#D6DAE6] transition-all"
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        {/* Repairs Table */}
        <div>
          <h3 className="text-2xl font-bold text-[#092A6D] mb-6">
            All Repairs
          </h3>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#092A6D] mx-auto mb-4"></div>
              <p className="text-[#666666]">Loading data...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center border border-red-200">
              <p className="font-medium">Error</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          ) : tickets.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-[#E8EBF5] p-12 text-center text-[#666666]">
              No repairs found
            </div>
          ) : (
            <Card className="bg-white rounded-xl shadow-sm border border-[#E8EBF5] overflow-hidden">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-[#092A6D] text-white">
                      <tr>
                        <th className="py-6 px-6 font-semibold">Serial Number</th>
                        <th className="py-6 px-6 font-semibold">Subject</th>
                        <th className="py-6 px-6 font-semibold">Customer</th>
                        <th className="py-6 px-6 font-semibold">Status</th>
                        <th className="py-6 px-6 font-semibold">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tickets.map((ticket) => (
                        <tr key={ticket.ticket_id} className="border-b border-[#E8EBF5] hover:bg-[#F5F7FA] transition-colors">
                          <td className="py-6 px-6 font-medium text-[#333333]">
                            {ticket.Device?.serial_number || 'N/A'}
                          </td>
                          <td className="py-6 px-6 text-[#333333]">{ticket.subject}</td>
                          <td className="py-6 px-6 text-[#333333]">
                            {ticket.Customer?.customer_name || ticket.Customer?.contact_email || "N/A"}
                          </td>
                          <td className="py-6 px-6">
                            <span
                              className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                                ticket.status
                              )}`}
                            >
                              {statusLabels[ticket.status] || ticket.status}
                            </span>
                          </td>
                          <td className="py-6 px-6 text-[#666666]">
                            {formatDate(ticket.created_at)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-6 border-t border-[#E8EBF5] bg-[#F5F7FA] text-right">
                  <Link
                    href="/dashboard/repair-details"
                    className="inline-flex items-center space-x-2 text-[#092A6D] font-semibold hover:text-[#697293] transition-colors"
                  >
                    <span>View All Repairs</span>
                    <span>→</span>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardClient;