import { db } from "../db.js";

export const getVisitiors = async (req, res) => {
  try {
    const visitors = await db.query("SELECT * FROM visitors");
    res.status(200).json(visitors[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addVisitors = async (req, res) => {
  const { visitorName, vehicleType, vehicleNumber, purpose, timeIn, timeOut } =
    req.body;
  try {
    const result = await db.query(
      "INSERT INTO visitors (visitorName, vehicleType, vehicleNumber,purpose,timeIn,timeOut) VALUES (?, ?, ?, ?, ?,?)",
      [visitorName, vehicleType, vehicleNumber, purpose, timeIn, timeOut]
    );
    res
      .status(201)
      .json({ message: "Visitor added successfully", id: result[0].insertId });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const vehicleType = async (req, res) => {
  try {
    const vehicleType = await db.query(
      "SELECT vehicleType, COUNT(*) AS count FROM Visitors GROUP BY vehicleType;"
    );
    res.status(200).json(vehicleType[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDates = async (req, res) => {
  try {
    const dates = await db.query(
      "SELECT DAYNAME(timeIn) AS name, COUNT(*) AS visitors FROM Visitors GROUP BY name ORDER BY FIELD(name, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');"
    );
    res.status(200).json(dates[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
