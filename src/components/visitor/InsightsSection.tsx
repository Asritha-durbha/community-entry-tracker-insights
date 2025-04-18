
import { Card } from "@/components/ui/card";
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

const vehicleData = [
  { name: "Car", value: 45 },
  { name: "Bike", value: 30 },
  { name: "Van", value: 15 },
  { name: "Truck", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export const InsightsSection = () => {
  return (
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
  );
};
