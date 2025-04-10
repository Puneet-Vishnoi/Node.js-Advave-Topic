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

git clone https://github.com/your-username/repository-name.git
cd repository-name

### 2. Install Dependencies

Run the following command to install all necessary dependencies:

npm install


Create a .env file in the root directory and add the following environment variables:
MONGO_URI=mongodb://localhost:27017/your-database
PORT=5000

MONGO_URI: The connection string to your MongoDB instance.

PORT: The port number on which the server will run.

4. Run the Application
To start the application, run the following command:

npm start
This will start the server on port 5000 by default. You can modify the port in the .env file.

# Available APIs

## Task 1: Data Management APIs

### 1. Upload Data
- **Route**: `POST /upload`
- **Description**: Uploads an XLSX or CSV file to MongoDB using worker threads.
- **Payload**: Multipart form-data with file (.csv or .xlsx).

### 2. Search Policy by Username
- **Route**: `GET /policy/:username`
- **Description**: Fetch policy information based on the username.
- **Parameters**:
  - `username` (string) - The username for which policy data is to be fetched.

### 3. Aggregated Policy by User
- **Route**: `GET /aggregated-policies`
- **Description**: Get aggregated policy information for each user.

## Task 2: Utility APIs

### 1. Real-Time CPU Monitoring & Server Restart
- **Description**: The system continuously monitors CPU usage and restarts the server if CPU usage exceeds 70%.

### 2. Scheduled Message Insertion
- **Route**: `POST /schedule-message`
- **Description**: Schedules a message to be inserted into the database at a specific day and time.
- **Payload**:
  ```json
  {
    "message": "Your message",
    "day": "YYYY-MM-DD",
    "time": "HH:mm"
  }
