import { usePage, Link } from "@inertiajs/react";
import { Users, Box, AlertCircle, FileText } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Statistics() {
  const { props } = usePage();
  const { users, materials, reportedUsers, reportedItems, flash } = props;

  // Prepare data for the chart
  const data = [
    { name: "Users", count: users.length },
    { name: "Materials", count: materials.length },
    { name: "Reported Users", count: reportedUsers.length },
    { name: "Reported Items", count: reportedItems.length },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Statistics</h1>

      {flash?.success && (
        <div className="bg-green-100 text-green-800 text-sm p-2 rounded mb-4">
          {flash.success}
        </div>
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
  {/* Users Card */}
  <Link href="/admin/users">
    <div className="bg-white shadow rounded-lg p-6 text-center flex flex-col items-center">
    <Users className="w-10 h-10 text-indigo-500 mb-2" />
    <p className="text-gray-500">Users</p>
    <p className="text-3xl font-bold mt-2">{users.length - 1}</p>
  </div>
  </Link>


  {/* Materials Card */}
  <Link href="/materials">
    <div className="bg-white shadow rounded-lg p-6 text-center flex flex-col items-center">
    <Box className="w-10 h-10 text-green-500 mb-2" />
    <p className="text-gray-500">Materials</p>
    <p className="text-3xl font-bold mt-2">{materials.length}</p>
  </div>
  </Link>


  {/* Reported Users Card */}
  <Link href="/admin/reported">
  <div className="bg-white shadow rounded-lg p-6 text-center flex flex-col items-center">
    <AlertCircle className="w-10 h-10 text-red-500 mb-2" />
    <p className="text-gray-500">Reported Users</p>
    <p className="text-3xl font-bold mt-2">{reportedUsers.length}</p>
  </div>
  </Link>

  {/* Reported Items Card */}
  <Link href="/admin/reported-item">
    <div className="bg-white shadow rounded-lg p-6 text-center flex flex-col items-center">
    <FileText className="w-10 h-10 text-yellow-500 mb-2" />
    <p className="text-gray-500">Reported Items</p>
    <p className="text-3xl font-bold mt-2">{reportedItems.length}</p>
  </div>
  </Link>

</div>

      {/* Line Chart */}
      <div className="bg-white shadow rounded-lg p-4">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#4f46e5" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
