// app/dashboard/layout.tsx
import DashboardLayout from "@/components/DashboardLayout"; 
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
// เรียกใช้ DashboardLayout 
  return <DashboardLayout>{children}</DashboardLayout>;
}