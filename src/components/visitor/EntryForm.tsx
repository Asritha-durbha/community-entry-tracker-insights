
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NewVisitorEntry } from "@/types/visitor";

interface EntryFormProps {
  onSubmit: (entry: NewVisitorEntry) => Promise<void>;
}

export const EntryForm = ({ onSubmit }: EntryFormProps) => {
  console.log("Rendering EntryForm");
  
  const [newEntry, setNewEntry] = useState<NewVisitorEntry>({
    visitor_name: "",
    vehicle_type: "",
    vehicle_number: "",
    purpose: "",
  });
  
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit(newEntry);
      setNewEntry({
        visitor_name: "",
        vehicle_type: "",
        vehicle_number: "",
        purpose: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
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
          required
        />
        <Input
          placeholder="Vehicle Type"
          value={newEntry.vehicle_type}
          onChange={(e) =>
            setNewEntry({ ...newEntry, vehicle_type: e.target.value })
          }
          required
        />
        <Input
          placeholder="Vehicle Number"
          value={newEntry.vehicle_number}
          onChange={(e) =>
            setNewEntry({ ...newEntry, vehicle_number: e.target.value })
          }
          required
        />
        <Input
          placeholder="Purpose"
          value={newEntry.purpose}
          onChange={(e) =>
            setNewEntry({ ...newEntry, purpose: e.target.value })
          }
          required
        />
        <Button 
          type="submit" 
          className="md:col-span-2"
          disabled={submitting}
        >
          {submitting ? "Adding..." : "Add Entry"}
        </Button>
      </form>
    </Card>
  );
};
