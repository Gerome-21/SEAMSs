const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "seams",
});

// Login endpoint
app.post('/students/login', (req, res) => {
    const { student_id, password } = req.body;

    // Validate input
    if (!student_id || !password) {
        return res.status(400).json({ success: false, message: "Student ID and password are required." });
    }

    // Query to check for matching student_id and password
    const sql = "SELECT * FROM students WHERE student_id = ? AND password = ?";
    db.query(sql, [student_id, password], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ success: false, message: "An error occurred. Please try again later." });
        }

        // Check if a match was found
        if (results.length > 0) {
            return res.status(200).json({ success: true, message: "Login successful.", student: results[0] });
        } else {
            return res.status(401).json({ success: false, message: "Invalid Student ID or password." });
        }
    });
});




//display students
app.get("/", (req, res) => {
    const sql = "SELECT * FROM students";
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Error fetching data", error: err });
        }
        return res.json(data);
    });
});

//display events
app.get("/events", (req, res) => {
    const query = "SELECT * FROM events"; // Ensure 'events' matches your SQL table name
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching events:", err);
            return res.status(500).send("An error occurred while fetching events.");
        }
        res.json(results); // Send the data as JSON
    });
});

// add event:
app.post('/addeventform', (req, res) => {
    const { eventName, venue, eventDate, eventTime, eventTimeEnd, yearlevel, course, sanction } = req.body;

    if (!eventName || !venue || !eventDate || !eventTime || !eventTimeEnd || !yearlevel || !course || !sanction) {
        return res.status(400).send({ message: 'Missing required fields.' });
    }

    const yearLevelStr = Array.isArray(yearlevel) ? yearlevel.join(', ') : yearlevel;
    const courseStr = Array.isArray(course) ? course.join(', ') : course;

    const query = `
      INSERT INTO events (eventName, venue, eventDate, eventTime, eventTimeEnd, yearlevel, course, sanction)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [eventName, venue, eventDate, eventTime, eventTimeEnd, yearLevelStr, courseStr, sanction];

    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Error inserting event:', err);
            return res.status(500).send({ message: 'An error occurred while adding the event.' });
        }
        res.status(201).send({ message: 'Event added successfully!', results });
    });
});

//add students 
app.post('/studentform', (req, res) => {
    console.log("Received data:", req.body);  // Add this to log incoming data
    const sql = "INSERT INTO students (first_name, last_name, student_id, password, gender, course, messenger_link, skill, year_level ) VALUES (?)";
    const values = [
        req.body.first_name,
        req.body.last_name,
        req.body.student_id,
        req.body.password,
        req.body.gender,
        req.body.course,
        req.body.messenger_link,
        req.body.skill,
        req.body.year_level,
    ];
    
    db.query(sql, [values], (err, data) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ message: "Error inserting data", error: err });
        }
        return res.json({ message: "Student added successfully", data: data });
    });
});
//update students
app.put('/firstyearlist/updatefrstyear/:id', (req, res) => {
    const sql = "UPDATE students SET `first_name` = ?, `last_name` = ?, `student_id` = ?, `password` = ?, `gender` = ?, `course` = ?, `messenger_link` = ?, `skill` = ?, `year_level` = ? WHERE id = ?";
    const values = [
        req.body.first_name,
        req.body.last_name,
        req.body.student_id,
        req.body.password,
        req.body.gender,
        req.body.course,
        req.body.messenger_link,
        req.body.skill,
        req.body.year_level,
    ];
    db.query(sql, [...values, req.params.id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to update the record.", error: err });
        }
        res.json({ message: "Record updated successfully." });
    });
});

app.get('/firstyearlist/updatefrstyear/:id', (req, res) => {
    const sql = "SELECT * FROM students WHERE id = ?";
    db.query(sql, [req.params.id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to fetch student data.", error: err });
        }
        res.json(data[0]); // Return the first record
    });
});


//delete students
app.delete('/students/:id', (req, res) => {
    const sql = "DELETE FROM students WHERE id = ?";
    const id = req.params.id;

    db.query(sql, [id], (err,data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
});


app.listen(8081, () => {
    console.log("Listening on port 8081");
});
