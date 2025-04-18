
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { VisitorEntry } from "@/types/visitor";

interface EntriesTableProps {
  entries: VisitorEntry[];
}

export const EntriesTable = ({ entries }: EntriesTableProps) => {
  console.log("EntriesTable rendering with entries:", entries);

  // Add a safety check for entries
  if (!entries || entries.length === 0) {
    return (
      <Card className="overflow-hidden p-6">
        <p className="text-center text-gray-500">No entries found</p>
      </Card>
    );
  }

  return (
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
                {entry.time_in ? new Date(entry.time_in).toLocaleString() : ''}
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
  );
};
