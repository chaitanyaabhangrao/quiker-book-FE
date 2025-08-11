import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import DashboardLayout from "@/components/DashboardLayout";

export default function ServicesPage() {
  // ... existing code (states, handlers)

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">My Services</h1>
        {/* form + list */}
      </div>
    </DashboardLayout>
  );
}
