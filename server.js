const express = require("express");
const bodyParser = require("body-parser");
const path = require("path")
const mongoose = require("mongoose");


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1:27017/civilloan",{
    useNewUrlParser: true,
})
.then(() => console.log("Connected to MongoDB Server"))
.catch(err =>{
    console.log(err);
    process.exit();
});

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


let PORT = 8080;

app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

require("./routes/app.routes.js")(app);

app.get("/member/form", (req, res) => {
    res.sendFile('createMember.html', { root: 'views' }); 
});


app.listen(PORT, () => {
    console.log(`Server is running on port no. ${PORT}`);
})



