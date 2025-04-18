
export interface VisitorEntry {
  id: number;
  visitor_name: string;
  vehicle_type: string;
  vehicle_number: string;
  purpose: string;
  time_in: string;
  time_out: string | null;
}

export interface NewVisitorEntry {
  visitor_name: string;
  vehicle_type: string;
  vehicle_number: string;
  purpose: string;
}
