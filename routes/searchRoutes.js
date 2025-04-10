const express = require('express');
const router = express.Router();
const { searchPolicyByUserName } = require('../controllers/searchController');
const { aggregatePolicyByUser } = require('../controllers/searchController');


router.get('/policy', searchPolicyByUserName);
router.get('/aggregate', aggregatePolicyByUser);

module.exports = router;
