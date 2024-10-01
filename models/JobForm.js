const mongoose = require('mongoose');
const ApplyLink = require('./applyLinks'); 

const JobSchema = new mongoose.Schema({
  heading: String,
  Batch: String,
  description: String,
  img: String,
  companyWebsite: String,
  jobRole: String,
  qualfication: String,
  experience: String,
  salary: String,
  jobLocation: String,
  lastDate: String,
  longDescription: String,
  shortDescription: String,
  keyResponsibility: String,
  roleExpectation: String,
  eligibiltyCriteria: String,
  applyLink: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ApplyLink',
    require:true,
    
  },
});



JobSchema.pre('remove', async function (next) {
  try {
   
    await ApplyLink.findByIdAndRemove(this.applyLink);
    next();
  } catch (error) {
    next(error); 
  }
});

const Job = mongoose.model('Job', JobSchema);

module.exports = Job;
