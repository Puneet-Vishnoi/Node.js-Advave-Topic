const { parentPort, workerData } = require('worker_threads');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { connectDB, disconnectDB } = require('../src/config/db');
const csv = require('csv-parser');
require('dotenv').config();

// Connect to MongoDB
connectDB()

// Load Models
const Agent = require('../models/Agent');
const User = require('../models/User');
const Account = require('../models/Account');
const PolicyCategory = require('../models/PolicyCategory');
const PolicyCarrier = require('../models/PolicyCarrier');
const Policy = require('../models/Policy');

// Helper to find or create a doc
async function findOrCreate(model, query, data = {}) {
  let doc = await model.findOne(query);
  if (!doc) {
    doc = await model.create({ ...query, ...data });
  }
  return doc;
}

const processCSV = async () => {
  const results = [];

  fs.createReadStream(workerData.filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      for (const row of results) {
        try {
          // 1. Agent
          const agent = await findOrCreate(Agent, { name: row.agent });

          // 2. User
          const user = await findOrCreate(User, {
            email: row.email,
          }, {
            firstName: row.firstname,
            dob: row.dob,
            address: row.address,
            phoneNumber: row.phone,
            state: row.state,
            zipCode: row.zip,
            gender: row.gender,
            userType: row.userType,
          });

          // 3. Account
          const account = await findOrCreate(Account, {
            accountName: row.account_name,
          });

          // 4. LOB
          const policyCategory = await findOrCreate(PolicyCategory, {
            categoryName: 'policyCategory',
          });

          // 5. Carrier
          const carrier = await findOrCreate(PolicyCarrier, {
            companyName: row.company_name,
          });

          // 6. Policy
          await Policy.create({
            policyNumber: row.policy_number,
            policyStartDate: row.policy_start_date,
            policyEndDate: row.policy_end_date,
            agent: agent._id,
            user: user._id,
            account: account._id,
            policyCategory: policyCategory._id,
            carrier: carrier._id,
          });

        } catch (err) {
          console.error('Error processing row:', err);
          await disconnectDB();
          process.exit(1);
        }

        //deleting csv file after processing
        
      }

      fs.unlink(workerData.filePath, (err) => {
        if (err) {
          console.error(`Failed to delete file: ${workerData.filePath}`, err);
        } else {
          console.log(`CSV file deleted: ${workerData.filePath}`);
        }
      });

      await disconnectDB();
      parentPort.postMessage('CSV import complete');
      process.exit(0);

    });
};

processCSV();


