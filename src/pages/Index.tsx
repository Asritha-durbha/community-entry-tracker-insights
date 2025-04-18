
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { InsightsSection } from "@/components/visitor/InsightsSection";
import { EntryForm } from "@/components/visitor/EntryForm";
import { EntriesTable } from "@/components/visitor/EntriesTable";
import { VisitorEntry, NewVisitorEntry } from "@/types/visitor";

const Index = () => {
  const [entries, setEntries] = useState<VisitorEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    console.log("Index component mounted");
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Fetching entries from Supabase...");
      const { data, error } = await supabase
        .from('visitor_entries')
        .select('*')
        .order('time_in', { ascending: false });

      console.log("Supabase response:", { data, error });

      if (error) {
        console.error("Supabase fetch error:", error);
        setError(`Failed to fetch entries: ${error.message}`);
        toast({
          title: "Error",
          description: "Failed to fetch visitor entries: " + error.message,
          variant: "destructive",
        });
      } else {
        console.log("Successfully fetched entries:", data);
        setEntries(data || []);
      }
    } catch (err) {
      console.error("Unexpected error during fetch:", err);
      setError("An unexpected error occurred");
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (newEntry: NewVisitorEntry) => {
    try {
      console.log("Adding new entry:", newEntry);
      const timeIn = new Date().toISOString();

      const { data, error } = await supabase
        .from('visitor_entries')
        .insert({
          ...newEntry,
          time_in: timeIn,
        })
        .select();

      console.log("Supabase insert response:", { data, error });

      if (error) {
        console.error("Supabase insert error:", error);
        toast({
          title: "Error",
          description: "Failed to add visitor entry: " + error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Visitor entry added successfully",
        });
        fetchEntries();
      }
    } catch (err) {
      console.error("Unexpected error during insert:", err);
      toast({
        title: "Error",
        description: "An unexpected error occurred while adding entry",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Community Entry Tracker
        </h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{error}</p>
            <button 
              onClick={fetchEntries} 
              className="mt-2 text-sm underline"
            >
              Try again
            </button>
          </div>
        )}
        
        {loading ? (
          <div className="flex justify-center p-8">
            <p>Loading entries...</p>
          </div>
        ) : (
          <>
            <InsightsSection />
            <EntryForm onSubmit={handleSubmit} />
            <EntriesTable entries={entries} />
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
