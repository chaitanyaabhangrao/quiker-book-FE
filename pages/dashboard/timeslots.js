import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import DashboardLayout from "@/components/DashboardLayout";

export default function TimeslotsPage() {
  const [timeslots, setTimeslots] = useState([]);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    axios.get('https://quiker-book.onrender.com/api/timeslots', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setTimeslots(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleAddTimeslot = async () => {
    if (!date || !startTime) {
      alert("Please fill all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post('http://localhost:5000/api/timeslots',
        { date, startTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTimeslots(prev => [...prev, res.data]);
      setDate(""); setStartTime("");
      alert("Timeslot added!");
    } catch (err) {
      console.error(err);
      alert("Failed to add timeslot");
    }
  };

  return (
       <DashboardLayout>
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">My Timeslots</h1>

        {/* Add timeslot form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="date"
            className="border rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
          <input
            type="time"
            className="border rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            value={startTime}
            onChange={e => setStartTime(e.target.value)}
          />
        </div>

        <button
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-xl mb-6 transition duration-200 shadow"
          onClick={handleAddTimeslot}
        >
          Add Timeslot
        </button>

        {/* Timeslot list */}
        <div className="space-y-3">
          {timeslots.length === 0 ? (
            <p className="text-gray-500 text-center">No timeslots added yet.</p>
          ) : (
            timeslots.map((slot) => (
              <div key={slot._id} className="flex justify-between items-center border rounded-xl px-4 py-3 shadow-sm bg-gray-50 hover:bg-gray-100 transition">
                <div>
                  <p className="font-semibold text-gray-800">{slot.date}</p>
                  <p className="text-sm text-gray-500">{slot.startTime}</p>
                </div>
                <p className={`text-xs ${slot.isBooked ? "text-red-500" : "text-green-500"}`}>
                  {slot.isBooked ? "Booked" : "Available"}
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
