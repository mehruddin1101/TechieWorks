const { json } = require('express/lib/response');
const Job = require('../models/JobForm')
const ApplyLink = require('../models/applyLinks')
const { upload } = require('../cloudinary');  // Assuming Cloudinary is set up in config
const cloudinary = require('cloudinary').v2;




const postJob = async (req, res) => {
  try {
    let imageUrl = '';
    
   
    if (req.file) {
     
      imageUrl = req.file.path;  
    }

    const {
      heading,
      Batch,
      description,
      companyWebsite,
      jobRole,
      qualification,
      experience,
      salary,
      jobLocation,
      lastDate,
      longDescription,
      shortDescription,
      keyResponsibility,
      roleExpectation,
      eligibilityCriteria,
      applyLinkUrl,
    } = req.body;

    let applyLink = await ApplyLink.findOne({ url: applyLinkUrl });
    if (!applyLink) {
      applyLink = new ApplyLink({ url: applyLinkUrl });
      await applyLink.save();
    }

    // Now create the new job
    const newJob = new Job({
      heading,
      Batch,
      description,
      img: imageUrl,  // Store the Cloudinary image URL directly from req.file
      companyWebsite,
      jobRole,
      qualification,  // Fixed spelling: "qualfication" -> "qualification"
      experience,
      salary,
      jobLocation,
      lastDate,
      longDescription,
      shortDescription,
      keyResponsibility,
      roleExpectation,
      eligibilityCriteria,  
      applyLink: applyLink._id, 
    });


    await newJob.save();

    // Respond with success
    res.status(201).json({
      message: 'Job created successfully',
      job: newJob,
    });
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const getAllJob = async(req, res)=>{

    // 
    try{
        const job = await Job.find().populate('applyLink')
        return res.status(200).json(job);

    }
    catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
}

const getJobById= async(req, res)=>{
    const {id} = req.params;
    try{
        const singleJob = await Job.findById(id).populate('applyLink')
        if (!singleJob){
            return res.status(404).json({message:"Job Not Found"})
        }
        return res.status(200).json(singleJob)
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Inrernal Server Error"});
    }

}

// update job 
const updateJob = async (req, res) => {
    const { id } = req.params;
    const {
      heading,
      Batch,
      description,
      img,
      companyWebsite,
      jobRole,
      qualfication,
      experience,
      salary,
      jobLocation,
      lastDate,
      longDescription,
      shortDescription,
      keyResponsibility,
      roleExpectation,
      eligibiltyCriteria,
      applyLinkUrl,
    } = req.body;
  
    try {
      
      const singleJob = await Job.findById(id).populate('applyLink');
      if (!singleJob) {
        return res.status(404).json({ message: 'Job not found' });
      }
  
      
      singleJob.heading = heading || singleJob.heading;
      singleJob.Batch = Batch || singleJob.Batch;
      singleJob.description = description || singleJob.description;
      singleJob.img = img || singleJob.img;
      singleJob.companyWebsite = companyWebsite || singleJob.companyWebsite;
      singleJob.jobRole = jobRole || singleJob.jobRole;
      singleJob.qualfication = qualfication || singleJob.qualfication;
      singleJob.experience = experience || singleJob.experience;
      singleJob.salary = salary || singleJob.salary;
      singleJob.jobLocation = jobLocation || singleJob.jobLocation;
      singleJob.lastDate = lastDate || singleJob.lastDate;
      singleJob.longDescription = longDescription || singleJob.longDescription;
      singleJob.shortDescription = shortDescription || singleJob.shortDescription;
      singleJob.keyResponsibility = keyResponsibility || singleJob.keyResponsibility;
      singleJob.roleExpectation = roleExpectation || singleJob.roleExpectation;
      singleJob.eligibiltyCriteria = eligibiltyCriteria || singleJob.eligibiltyCriteria;
  
     
      if (applyLinkUrl) {
        // new ApplyLink 
        let applyLink = await ApplyLink.findOne({ url: applyLinkUrl });
        if (!applyLink) {
          applyLink = new ApplyLink({ url: applyLinkUrl });
          await applyLink.save(); 
        }
  
      
        singleJob.applyLink = applyLink._id;
      }
  
      
      await singleJob.save();
  
      res.status(200).json({ message: 'Job updated successfully', job: singleJob });
    } catch (error) {
      console.error('Error updating job:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


  // Cascade delete
  const deleteJob = async (req, res) => {
    const { id } = req.params;
  
    try {
     
      const singleJob = await Job.findById(id).populate('applyLink');
      
      
      if (!singleJob) {
        return res.status(404).json({ message: 'Job not found' });
      }
  
   
      if (singleJob.applyLink) {
        await ApplyLink.findByIdAndDelete(singleJob.applyLink._id);
      }
  
      
      await Job.findByIdAndDelete(id);
  
      res.status(200).json({ message: 'Job deleted successfully' });

    } catch (error) {
      console.error('Error deleting job:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

  // Controller to get all apply links
const getAllApplyLinks = async (req, res) => {
  try {
    // Fetch all apply links from the database
    const applyLinks = await ApplyLink.find();
    
    // Check if there are no apply links
    if (!applyLinks || applyLinks.length === 0) {
      return res.status(404).json({ message: 'No apply links found' });
    }

    // Return the apply links as a response
    res.status(200).json({ applyLinks });
  } catch (error) {
    console.error('Error fetching apply links:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
  


module.exports= {
    postJob,
    getAllJob,
    getJobById,
    updateJob,
    deleteJob,
    getAllApplyLinks
}