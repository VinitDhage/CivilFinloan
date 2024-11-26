module.exports=(app)=>{
    const App = require("../controllers/app.controller.js");

    // 1.
    app.get("/allservices",App.getAll);
    //2.
    app.get("/service/:type",App.getServiceByType);
    //3.
    app.post("/service/:type/form",App.addServiceRequest);
    //4.
    app.post("/member",App.addMember);
    //5.
    app.post("/service/:type/calculate",App.calculateEMI);
    //6.
    app.put("/updaterequest",App.updateRequests);
    //7.
    app.put("/updatepassword",App.updatePassword);
    //8.
    app.delete("/deleterequests",App.deleteRequests);
    //9.
    app.delete("/cancelmember",App.cancelMember);


    app.all("*",(req,res,next)=>{
        const err = new Error(`can't find ${req.originalUrl} on this server`)
        err.status='fail';
        err.statusCode=404;
        next(err);
    })

    app.use((err,req,res,next)=>{
        err.statusCode = err.statusCode || 500;
        err.status = err.status || "error";
        res.status(err.statusCode).json({
            status:err.status,
            message:err.message
        })
    })
}