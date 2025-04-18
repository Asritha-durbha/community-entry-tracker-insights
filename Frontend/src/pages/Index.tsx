import { useEffect, useState } from "react";
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
import axios from "axios";


interface Entry {
  id: number;
  visitorName: string;
  vehicleType: string;
  vehicleNumber: string;
  purpose: string;
  timeIn: string; 
  timeOut: string; 
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Index = () => {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({
    visitorName: "",
    vehicleType: "",
    vehicleNumber: "",
    purpose: "",
    timeIn: "",
    timeOut: "",
  });

  const [vehicleData, setvehicleData] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/visitors");
        setEntries(response.data);
        const vehicleCount = await axios.get(
          "http://localhost:5000/api/vehicleType"
        );
        setvehicleData(
          vehicleCount.data.map((item: any) => ({
            name: item.vehicleType,
            value: item.count,
          }))
        );
        const dateCount = await axios.get("http://localhost:5000/api/Dates");
        setDates(dateCount.data);
        console.log(dateCount.data);
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    };
    fetchEntries();
  }, [newEntry]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const timeIn = new Date().toISOString();
    console.log({ ...newEntry, timeIn });
    const post = await axios.post(
      "http://localhost:5000/api/visitors",
      newEntry
    );
    console.log(post.data);
    setNewEntry({
      visitorName: "",
      vehicleType: "",
      vehicleNumber: "",
      purpose: "",
      timeIn: "",
      timeOut: "",
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
            <BarChart width={400} height={300} data={dates}>
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
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </Card>
        </div>

        {/* New Entry Form */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Entry</h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
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
            <Input
              placeholder="TimeIn"
              value={newEntry.timeIn}
              onChange={(e) =>
                setNewEntry({ ...newEntry, timeIn: e.target.value })
              }
            />
            <Input
              placeholder="TimeOut"
              value={newEntry.timeOut}
              onChange={(e) =>
                setNewEntry({ ...newEntry, timeOut: e.target.value })
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
