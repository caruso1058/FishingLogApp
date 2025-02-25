import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@/components/ui/table";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Supabase config
const supabaseUrl = "https://valefsedslqexjvbpsce.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhbGVmc2Vkc2xxZXhqdmJwc2NlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzNzM0MTUsImV4cCI6MjA1NTk0OTQxNX0.L-DPL5SD535D6xffP-g8WH-1i_pi_mRyf1trxAUDYNs";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Page() {
  const [logs, setLogs] = useState([]);
  const [log, setLog] = useState({
    date: new Date(),
    bodyOfWater: "",
    timeOfDay: "",
    location: "",
    depth: "",
    bait: "",
    species: "",
    notes: ""
  });

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    const { data, error } = await supabase
      .from("fishing_logs")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setLogs(data);
  };

  const handleChange = (e) => {
    setLog((prevLog) => ({ ...prevLog, [e.target.name]: e.target.value }));
  };

  const handleDateChange = (date) => {
    setLog((prevLog) => ({ ...prevLog, date }));
  };

  const handleAddLog = async () => {
    const newLog = { ...log, date: log.date.toISOString() };
    const { error } = await supabase.from("fishing_logs").insert([newLog]);
    if (!error) {
      // re-fetch or manually update
      setLogs([newLog, ...logs]);
      setLog({
        date: new Date(),
        bodyOfWater: "",
        timeOfDay: "",
        location: "",
        depth: "",
        bait: "",
        species: "",
        notes: ""
      });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Fishing Log</h1>
      <Card className="mb-4">
        <CardContent>
          <div className="grid gap-2">
            <DatePicker
              selected={log.date}
              onChange={handleDateChange}
              className="p-2 border rounded"
            />
            <Input
              placeholder="Body of Water"
              name="bodyOfWater"
              value={log.bodyOfWater}
              onChange={handleChange}
            />
            <select
              name="timeOfDay"
              value={log.timeOfDay}
              onChange={handleChange}
              className="p-2 border rounded"
            >
              <option value="">Select Time of Day</option>
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
              <option value="night">Night</option>
            </select>
            <Input
              placeholder="Location (GPS or Description)"
              name="location"
              value={log.location}
              onChange={handleChange}
            />
            <Input
              placeholder="Depth Fished"
              name="depth"
              value={log.depth}
              onChange={handleChange}
            />
            <select
              name="bait"
              value={log.bait}
              onChange={handleChange}
              className="p-2 border rounded"
            >
              <option value="">Select Bait Type</option>
              <option value="artificial">Artificial</option>
              <option value="live">Live</option>
            </select>
            <Input
              placeholder="Species Caught"
              name="species"
              value={log.species}
              onChange={handleChange}
            />
            <Textarea
              placeholder="Additional Notes"
              name="notes"
              value={log.notes}
              onChange={handleChange}
            />
            <Button onClick={handleAddLog}>Add Log</Button>
          </div>
        </CardContent>
      </Card>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Body of Water</TableCell>
            <TableCell>Time of Day</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Depth</TableCell>
            <TableCell>Bait</TableCell>
            <TableCell>Species</TableCell>
            <TableCell>Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logs.map((entry, index) => (
            <TableRow key={index}>
              <TableCell>{new Date(entry.date).toLocaleDateString()}</TableCell>
              <TableCell>{entry.bodyOfWater}</TableCell>
              <TableCell>{entry.timeOfDay}</TableCell>
              <TableCell>{entry.location}</TableCell>
              <TableCell>{entry.depth}</TableCell>
              <TableCell>{entry.bait}</TableCell>
              <TableCell>{entry.species}</TableCell>
              <TableCell>{entry.notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
