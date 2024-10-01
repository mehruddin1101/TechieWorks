const express = require('express')
const jobController = require('../controllers/jobController')
const { upload } = require('../cloudinary');
const router = express.Router()


// router.post("/postjob", jobController.postJob)
router.post('/postjob', upload.single('image'), jobController.postJob);

router.get("/jobs", jobController.getAllJob)
router.get("/jobs/:id", jobController.getJobById)
router.put('/jobs/:id', jobController.updateJob)
router.delete('/jobs/:id', jobController.deleteJob)

// get all applylinks
router.get("/jobs/links/applyLinks", jobController.getAllApplyLinks)

module.exports = router