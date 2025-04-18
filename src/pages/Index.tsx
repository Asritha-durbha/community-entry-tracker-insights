
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { InsightsSection } from "@/components/visitor/InsightsSection";
import { EntryForm } from "@/components/visitor/EntryForm";
import { EntriesTable } from "@/components/visitor/EntriesTable";
import { VisitorEntry, NewVisitorEntry } from "@/types/visitor";

const Index = () => {
  const [entries, setEntries] = useState<VisitorEntry[]>([]);
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

  const handleSubmit = async (newEntry: NewVisitorEntry) => {
    const timeIn = new Date().toISOString();

    const { error } = await supabase
      .from('visitor_entries')
      .insert({
        ...newEntry,
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
      fetchEntries();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Community Entry Tracker
        </h1>
        <InsightsSection />
        <EntryForm onSubmit={handleSubmit} />
        <EntriesTable entries={entries} />
      </div>
    </div>
  );
};

export default Index;
