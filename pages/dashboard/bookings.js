import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import DashboardLayout from "@/components/DashboardLayout";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    axios.get('https://quiker-book.onrender.com/api/bookings', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setBookings(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
     <DashboardLayout>
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-pink-50 p-4 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-4xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">All Bookings</h1>

        <div className="space-y-3">
          {bookings.length === 0 ? (
            <p className="text-gray-500 text-center">No bookings found.</p>
          ) : (
            bookings.map((booking) => (
              <div key={booking._id} className="flex flex-col md:flex-row justify-between md:items-center border rounded-xl px-4 py-3 shadow-sm bg-gray-50 hover:bg-gray-100 transition">
                <div>
                  <p className="font-semibold text-gray-800">{booking.customerName}</p>
                  <p className="text-sm text-gray-500">{booking.serviceName} | ₹{booking.price}</p>
                  <p className="text-sm text-gray-500">{booking.date} at {booking.startTime}</p>
                </div>
                <p className={`text-xs mt-2 md:mt-0 ${booking.status === "confirmed" ? "text-green-500" : "text-yellow-500"}`}>
                  {booking.status}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
}
