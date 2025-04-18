import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
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

interface VisitorEntry {
  id: number;
  visitor_name: string;
  vehicle_type: string;
  vehicle_number: string;
  purpose: string;
  time_in: string;
  time_out: string | null;
}

const vehicleData = [
  { name: "Car", value: 45 },
  { name: "Bike", value: 30 },
  { name: "Van", value: 15 },
  { name: "Truck", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Index = () => {
  const [entries, setEntries] = useState<VisitorEntry[]>([]);
  const [newEntry, setNewEntry] = useState({
    visitor_name: "",
    vehicle_type: "",
    vehicle_number: "",
    purpose: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    const { data, error } = await supabase
      .from('visitor_entries')
      .select('*')
      .order('time_in', { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch visitor entries",
        variant: "destructive",
      });
    } else {
      setEntries(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const timeIn = new Date().toISOString();

    const { data, error } = await supabase
      .from('visitor_entries')
      .insert({
        visitor_name: newEntry.visitor_name,
        vehicle_type: newEntry.vehicle_type,
        vehicle_number: newEntry.vehicle_number,
        purpose: newEntry.purpose,
        time_in: timeIn,
      })
      .select();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add visitor entry",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Visitor entry added successfully",
      });
      
      setNewEntry({
        visitor_name: "",
        vehicle_type: "",
        vehicle_number: "",
        purpose: "",
      });
      fetchEntries();
    }
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
              value={newEntry.visitor_name}
              onChange={(e) =>
                setNewEntry({ ...newEntry, visitor_name: e.target.value })
              }
            />
            <Input
              placeholder="Vehicle Type"
              value={newEntry.vehicle_type}
              onChange={(e) =>
                setNewEntry({ ...newEntry, vehicle_type: e.target.value })
              }
            />
            <Input
              placeholder="Vehicle Number"
              value={newEntry.vehicle_number}
              onChange={(e) =>
                setNewEntry({ ...newEntry, vehicle_number: e.target.value })
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
                  <TableCell>{entry.visitor_name}</TableCell>
                  <TableCell>{entry.vehicle_type}</TableCell>
                  <TableCell>{entry.vehicle_number}</TableCell>
                  <TableCell>{entry.purpose}</TableCell>
                  <TableCell>
                    {new Date(entry.time_in).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {entry.time_out
                      ? new Date(entry.time_out).toLocaleString()
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
