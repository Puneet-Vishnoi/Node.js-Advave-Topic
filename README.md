# Assessment-Insuredmine
Nodejs Assessment-Insuredmine
This repository contains a Node.js project that implements the functionalities required for the technical assessment. It covers the tasks such as uploading CSV data to MongoDB, searching policies, aggregating user policies, tracking real-time CPU usage, and scheduling messages.

Tech Stack:
Node.js

Express

MongoDB (using Mongoose)

csv-parser or fast-csv

worker_threads

os module

node-cron

child_process

Setup Instructions
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-username/repository-name.git
cd repository-name
2. Install Dependencies
bash
Copy
Edit
npm install
3. Environment Variables
Create a .env file in the root directory and add the following environment variables:

ini
Copy
Edit
MONGO_URI=mongodb://localhost:27017/your-database
PORT=5000
4. Run the Application
To start the application, use:

bash
Copy
Edit
npm start
This will start the server on port 5000 by default.

5. Available APIs
Task 1: Data Management APIs
Upload Data

Route: POST /upload

Description: Uploads an XLSX or CSV file to MongoDB using worker threads.

Payload: Multipart form-data with file (.csv or .xlsx).

Search Policy by Username

Route: GET /policy/:username

Description: Fetch policy information based on username.

Parameters: username (string)

Aggregated Policy by User

Route: GET /aggregated-policies

Description: Get aggregated policy information for each user.

Task 2: Utility APIs
Real-Time CPU Monitoring & Server Restart

The system continuously monitors CPU usage and restarts the server if CPU usage exceeds 70%.

Scheduled Message Insertion

Route: POST /schedule-message

Description: Schedule a message to be inserted into the database at a specific day and time.

Payload:

json
Copy
Edit
{
  "message": "Your message",
  "day": "YYYY-MM-DD",
  "time": "HH:mm"
}
6. Graceful Shutdown & Restart
The application gracefully shuts down on receiving termination signals (e.g., SIGINT, SIGTERM), and a child process is used to monitor and restart the server in case of high CPU usage (above 70%).

7. Notes
Worker Threads: Used to handle the CSV or XLSX data parsing to prevent blocking the main event loop.

MongoDB: Used for storing the various entities like Agent, User, Policy, etc. Each entity is represented as a separate collection.

Real-Time CPU Monitoring: Uses os module and worker_threads to monitor CPU utilization and restart the server if necessary.

node-cron: Used to schedule tasks like inserting messages at a specified time.
