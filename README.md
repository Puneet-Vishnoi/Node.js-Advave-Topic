# Assessment-Insuredmine

This repository contains a Node.js project that implements the functionalities required for the technical assessment. It covers tasks such as uploading CSV data to MongoDB, searching policies, aggregating user policies, tracking real-time CPU usage, and scheduling messages.

## Tech Stack:
- **Node.js**
- **Express**
- **MongoDB** (using Mongoose)
- **csv-parser** or **fast-csv**
- **worker_threads**
- **os module**
- **node-cron**
- **child_process**

## Setup Instructions

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/Puneet-Vishnoi/Assessment-Insuredmine.git
cd Assessment-Insuredmine
```

### 2. Install Dependencies

Run the following command to install all necessary dependencies:
```base
npm install
```

Create a .env file in the root directory and add the following environment variables:
```base
MONGO_URI=mongodb://localhost:27017/Assesment
PORT=5000
```
MONGO_URI: The connection string to your MongoDB instance.

PORT: The port number on which the server will run.

4. Run the Application
To start the application, run the following command:
```base
node monitor.js
```
This will start the server on port 5000 by default. You can modify the port in the .env file.

# Available APIs

## Task 1: Data Management APIs

### 1. Upload Data
- **Route**: `POST /api/upload`
- **Description**: Uploads an XLSX or CSV file to MongoDB using worker threads.
- **Payload**: Multipart form-data with file (.csv or .xlsx).

### 2. Search Policy by Username
- **Route**: `GET /api/search/policy?name=:username`
- **Description**: Fetch policy information based on the username.
- **Parameters**:
  - `username` (string) - The username for which policy data is to be fetched.

### 3. Aggregated Policy by User
- **Route**: `GET /api/search/aggregate`
- **Description**: Get aggregated policy information for each user.

## Task 2: Utility APIs

### 1. Real-Time CPU Monitoring & Server Restart
- **Description**:   The system continuously monitors CPU usage in real time. If CPU usage exceeds **70%**, the server automatically restarts using Node.js **child processes** to ensure application stability.
### 1.1 Get CPU Usage Logs
- **Route**: `GET /api/monitor/cpu-logs`
- **Description**: Retrieves a list of CPU usage logs stored in MongoDB, which includes the CPU usage percentage and the timestamp of when it was logged.

### 2. Scheduled Message Insertion
- **Route**: `POST /api/messages/schedule-message`
- **Description**: Schedules a message to be inserted into the database at a specific day and time.
- **Payload**:
  ```json
  {
    "message": "Your message",
    "day": "YYYY-MM-DD",
    "time": "HH:mm"
  }

## 6. Graceful Shutdown & Restart
The application gracefully shuts down on receiving termination signals (e.g., SIGINT, SIGTERM). A child process is used to monitor and restart the server in case of high CPU usage (above 70%).

## 7. Notes

- **Worker Threads**: Used to handle the CSV or XLSX data parsing to prevent blocking the main event loop.
- **MongoDB**: Used for storing various entities like Agent, User, Policy, etc. Each entity is represented as a separate collection.
- **Real-Time CPU Monitoring**: Uses the `os` module and `worker_threads` to monitor CPU utilization and restart the server if necessary.
- **node-cron**: Used to schedule tasks like inserting messages at a specified time.

