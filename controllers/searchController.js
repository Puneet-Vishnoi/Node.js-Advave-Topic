const User = require('../models/User');
const Policy = require('../models/Policy');


const searchPolicyByUserName = async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: 'Please provide a user name (first name)' });
  }

  try {
    
    const user = await User.findOne({ firstName: name });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const policies = await Policy.find({ user: user._id })
      .populate('agent')
      .populate('account')
      .populate('carrier')
      .populate('policyCategory')
      .populate('user');

    res.json({ user: user.firstName, policies });
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// const aggregatePolicyByUser = async (req, res) => {
//   try {
//     const result = await Policy.aggregate([
//       {
//         $lookup: {
//           from: 'users',
//           localField: 'user',
//           foreignField: '_id',
//           as: 'userInfo'
//         }
//       },
//       { $unwind: '$userInfo' },
//       {
//         $group: {
//           _id: '$userInfo._id',
//           user: { $first: '$userInfo.firstName' },
//           totalPolicies: { $sum: 1 },
//           policies: { $push: '$$ROOT' }
//         }
//       }
//     ]);

//     res.json(result);
//   } catch (err) {
//     console.error('Aggregation error:', err);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

const aggregatePolicyByUser = async (req, res) => {
  try {
    // Fetch all policies with related data
    const allPolicies = await Policy.find()
      .populate('user')
      .populate('agent')
      .populate('account')
      .populate('carrier')
      .populate('policyCategory'); // renamed from 'lob' to 'policyCategory'

    // Group by user
    const grouped = {};

    for (const policy of allPolicies) {
      const fullName = policy.user.firstName; // adjust if you want fullName or combination

      if (!grouped[fullName]) {
        grouped[fullName] = {
          user: fullName,
          policies: []
        };
      }

      grouped[fullName].policies.push(policy);
    }

    // Convert to array
    const result = Object.values(grouped);

    res.json(result);
  } catch (err) {
    console.error('Aggregation error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  searchPolicyByUserName,
  aggregatePolicyByUser,
};