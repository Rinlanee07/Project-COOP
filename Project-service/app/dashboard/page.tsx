// app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardClient from "./DashboardClient";
import { apiClient } from "@/lib/api-client";

// Frontend Status types
type FrontendStatus = 'New' | 'In Progress' | 'Pending' | 'Resolved' | 'Closed';
type BackendStatus = 'PENDING' | 'IN_PROGRESS' | 'WAITING_PARTS' | 'WAITING_CONFIRM' | 'COMPLETED' | 'SHIPPED' | 'CLOSED';

type StatusCounts = {
  [K in FrontendStatus]: number;
};

// Map backend status to frontend status
const mapStatus = (status: BackendStatus): FrontendStatus => {
  switch (status) {
    case 'PENDING':
      return 'New';
    case 'IN_PROGRESS':
    case 'WAITING_PARTS':
    case 'WAITING_CONFIRM':
      return 'In Progress';
    case 'COMPLETED':
    case 'SHIPPED':
      return 'Resolved';
    case 'CLOSED':
      return 'Closed';
    default:
      return 'New';
  }
};

const DashboardPage = () => {
  const router = useRouter();
  const [statusCounts, setStatusCounts] = useState<StatusCounts>({
    New: 0,
    'In Progress': 0,
    Pending: 0,
    Resolved: 0,
    Closed: 0,
  });
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Wrap localStorage access in try-catch for SSR
    let token: string | null = null;
    try {
      token = localStorage.getItem("token");
    } catch (e) {
      console.error("Failed to access localStorage:", e);
    }

    if (!token) {
      router.push("/");
      return;
    }

    setIsAuthenticated(true);
    setLoading(false);

    const fetchStatusCounts = async () => {
      try {
        const response = await apiClient.getTickets(token!, {});
        
        if (response.error) {
          console.error("Failed to fetch repair requests:", response.error);
          if (response.error === 'Unauthorized') {
            try {
              localStorage.removeItem("token");
            } catch (e) {
              console.error("Failed to remove token:", e);
            }
            router.push("/");
          }
          return;
        }

        const requests = response.data || [];
        const counts: StatusCounts = {
          New: 0,
          'In Progress': 0,
          Pending: 0,
          Resolved: 0,
          Closed: 0
        };

        requests.forEach((request) => {
          const frontendStatus = mapStatus(request.status as BackendStatus);
          counts[frontendStatus]++;
        });

        setStatusCounts(counts);

      } catch (error) {
        console.error("Failed to fetch status counts:", error);
      }
    };

    fetchStatusCounts();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <DashboardClient statusCounts={statusCounts} />;
};

export default DashboardPage;