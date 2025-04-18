
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NewVisitorEntry } from "@/types/visitor";

interface EntryFormProps {
  onSubmit: (entry: NewVisitorEntry) => Promise<void>;
}

export const EntryForm = ({ onSubmit }: EntryFormProps) => {
  const [newEntry, setNewEntry] = useState<NewVisitorEntry>({
    visitor_name: "",
    vehicle_type: "",
    vehicle_number: "",
    purpose: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(newEntry);
    setNewEntry({
      visitor_name: "",
      vehicle_type: "",
      vehicle_number: "",
      purpose: "",
    });
  };

  return (
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
  );
};
