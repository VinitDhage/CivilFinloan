const services = require("../models/services.model");
const requests = require("../models/requests.model");
const members= require("../models/members.model");


exports.getAll = (req,res)=>{
    services.find()
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        console.error(err.stack);
        res.status(500).json({
            message:err.message || "some error occured"
        })
    })
}


exports.getServiceByType=(req,res)=>{
    services.find({type:req.params.type})
    .then((data)=>{
        if(!data){
            res.status(404).send({
                message:"no services found with this Type"
            })
        }
        res.status(200).send(data);
    })
    .catch((err)=>{
        console.error("Error in fetching Service Data: ",err.message);
    });
}


exports.addServiceRequest=(req,res)=>{
    if(!req.body.mobile || !req.body.email || !req.body.amt || !req.params.type || !req.body.message || !req.body.code){
        return res.status(400).json({message:"Please provide all data"});
    }

    const Request = new requests({
        mobile:req.body.mobile,
        email:req.body.email,
        amt:req.body.amt,
        type:req.params.type,
        msg:req.body.message,
        code:req.body.code
    });

    Request.save(Request)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || "some error occured"
        })
        console.error("Error in inserting Service Data: ",err.message);
    })
}


exports.addMember=(req,res)=>{
    if(!req.body.mobile || !req.body.email || !req.body.occupation || !req.body.createpassword){
        return res.status(400).json({message:"Please provide all data"});
    }

    const Member = new members({
        mobile:req.body.mobile,
        email:req.body.email,
        occupation:req.body.occupation,
        createpassword:req.body.createpassword
    });

    Member.save(Member)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || "some error occured"
        })
        console.error("Error in inserting Member Data: ",err.message);
    })
}


exports.calculateEMI = (req, res) => {
    const { amt, tenure} = req.body;
    const param_type = req.params.param_type;
  
    try {
      if (!amt || !tenure) {
        return res.status(400).send({ message: "Required fields are missing" });
      }
      let emi;
      if (param_type == "MI Loan") {
        emi = ((amt * tenure) / 100) * 10; 
      } else if (param_type === "Home Loan") {
        emi = ((amt * tenure) / 100) * 12; 
      } else if (param_type === "Car Loan") {
        emi = ((amt * tenure) / 100) * 8; 
      } else {
        return res.status(400).send({ message: "Invalid loan type provided" });
      }
      res.status(200).send({ emi });
    } 
    catch (err) {
      console.error("Error occurred while calculating EMI:", err.message);
      res.status(500).send({ error: err.message});
    }
};


exports.updateRequests = (req, res) => {
    if (!req.body.mobile || !req.body.email || !req.body.amt || !req.body.msg || !req.body.code) {
        return res.status(400).json({ message: "Please provide all required data" });
    }

    requests.findOneAndUpdate(
        {mobile: req.body.mobile},
        {
            mobile: req.body.mobile,
            email: req.body.email,
            amt: req.body.amt,
            type: req.body.type,
            msg: req.body.msg,
            code: req.body.code
        },
        { new: true } 
    )
    .then(data => {
        if (!data) {
            return res.status(404).json({ message: "Service request not found" });
        }
        res.json({
            mobile:req.body.mobile,
            service: req.body.code,
            type: req.body.type,
            remarks:"update with new service"
        });
    })
    .catch(err => {
        console.error("Error updating service request: ", err.message);
        res.status(500).json({
            message: err.message || "Some error occurred while updating the service request"
        });
    });
};


exports.updatePassword = (req, res) => {
    if (!req.body.mobile || !req.body.password) {
        return res.status(400).json({ message: "Please provide both mobile number and new password" });
    }

    members.findOneAndUpdate(
        { mobile: req.body.mobile }, 
        { createpassword: req.body.password }, 
        { new: true }
    )
    .then(data => {
        if (!data) {
            return res.status(404).json({ message: "User with this mobile number not found" });
        }
        res.json({ 
            message: "Password updated successfully",
            mobile:req.body.mobile,
            password:req.body.password
        });
    })
    .catch(err => {
        console.error("Error updating password: ", err.message);
        res.status(500).json({
            message: err.message || "Some error occurred while updating the password"
        });
    });
};


exports.deleteRequests=(req,res)=>{
    if (!req.body.mobile) {
        return res.status(400).json({ message: "Please provide a mobile number" });
    }

    requests.findOneAndDelete(
        { mobile: req.body.mobile }
    )
    .then((data)=>{
        if(!data){
            return res.status(404).send({
                message:`Request is not found with mobile no.  : ${req.body.mobile}`
            })
        }
        res.send(
            {message:"Request Deleted successfully"}
        )
    })
    .catch((err)=>{
        res.status(500).send({
            message:`Error deleting Request with mobile no. : ${req.body.mobile}`
        })
    })
}

exports.cancelMember=(req,res)=>{
    if (!req.body.mobile) {
        return res.status(400).json({ message: "Please provide a mobile number" });
    }

    members.findOneAndDelete(
        { mobile: req.body.mobile }
    )
    .then((data)=>{
        if(!data){
            return res.status(404).send({
                message:`Member is not found with mobile no.  : ${req.body.mobile}`
            })
        }
        res.send(
            {message:"Member Deleted successfully"}
        )
    })
    .catch((err)=>{
        res.status(500).send({
            message:`Error deleting Member with mobile no. : ${req.body.mobile}`
        })
    })
}
