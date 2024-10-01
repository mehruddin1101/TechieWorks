const mongoose = require('mongoose');

const ApplyLinkSchema = mongoose.Schema({
    url:{
        type:String,
        require:true
       
    },
    dateAdded:{
        type:Date,
        default:Date.now,

    }
})

const ApplyLink = mongoose.model("ApplyLink",ApplyLinkSchema)
module.exports= ApplyLink