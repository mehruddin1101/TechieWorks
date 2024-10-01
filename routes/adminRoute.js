const express = require('express')
const router = express.Router();
const  adminController = require('../controllers/adminController') 
console.log("called routes")

// routes
router.post("/register", adminController.registerController)
router.post("/login", adminController.longinController )

module.exports = router;