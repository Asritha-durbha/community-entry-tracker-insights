
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Mock data for demonstration
const initialEntries = [
  {
    id: 1,
    visitorName: "John Smith",
    vehicleType: "Car",
    vehicleNumber: "ABC 123",
    purpose: "Delivery",
    timeIn: "2024-04-15T09:30",
    timeOut: "2024-04-15T10:00",
  },
  {
    id: 2,
    visitorName: "Sarah Johnson",
    vehicleType: "Bike",
    vehicleNumber: "XYZ 789",
    purpose: "Visit",
    timeIn: "2024-04-15T11:15",
    timeOut: "2024-04-15T13:45",
  },
];

const vehicleData = [
  { name: "Car", value: 45 },
  { name: "Bike", value: 30 },
  { name: "Van", value: 15 },
  { name: "Truck", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Index = () => {
  const [entries, setEntries] = useState(initialEntries);
  const [newEntry, setNewEntry] = useState({
    visitorName: "",
    vehicleType: "",
    vehicleNumber: "",
    purpose: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const timeIn = new Date().toISOString();
    setEntries([
      ...entries,
      {
        id: entries.length + 1,
        ...newEntry,
        timeIn,
        timeOut: "",
      },
    ]);
    setNewEntry({
      visitorName: "",
      vehicleType: "",
      vehicleNumber: "",
      purpose: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Community Entry Tracker
        </h1>

        {/* Insights Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Daily Visitors</h2>
            <BarChart width={400} height={300} data={[
              { name: "Mon", visitors: 20 },
              { name: "Tue", visitors: 25 },
              { name: "Wed", visitors: 30 },
              { name: "Thu", visitors: 22 },
              { name: "Fri", visitors: 28 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="visitors" fill="#4F46E5" />
            </BarChart>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Vehicle Distribution</h2>
            <PieChart width={400} height={300}>
              <Pie
                data={vehicleData}
                cx={200}
                cy={150}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {vehicleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </Card>
        </div>

        {/* New Entry Form */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Entry</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Visitor Name"
              value={newEntry.visitorName}
              onChange={(e) =>
                setNewEntry({ ...newEntry, visitorName: e.target.value })
              }
            />
            <Input
              placeholder="Vehicle Type"
              value={newEntry.vehicleType}
              onChange={(e) =>
                setNewEntry({ ...newEntry, vehicleType: e.target.value })
              }
            />
            <Input
              placeholder="Vehicle Number"
              value={newEntry.vehicleNumber}
              onChange={(e) =>
                setNewEntry({ ...newEntry, vehicleNumber: e.target.value })
              }
            />
            <Input
              placeholder="Purpose"
              value={newEntry.purpose}
              onChange={(e) =>
                setNewEntry({ ...newEntry, purpose: e.target.value })
              }
            />
            <Button type="submit" className="md:col-span-2">
              Add Entry
            </Button>
          </form>
        </Card>

        {/* Entries Table */}
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Visitor Name</TableHead>
                <TableHead>Vehicle Type</TableHead>
                <TableHead>Vehicle Number</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Time In</TableHead>
                <TableHead>Time Out</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.visitorName}</TableCell>
                  <TableCell>{entry.vehicleType}</TableCell>
                  <TableCell>{entry.vehicleNumber}</TableCell>
                  <TableCell>{entry.purpose}</TableCell>
                  <TableCell>
                    {new Date(entry.timeIn).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {entry.timeOut
                      ? new Date(entry.timeOut).toLocaleString()
                      : "Active"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default Index;
