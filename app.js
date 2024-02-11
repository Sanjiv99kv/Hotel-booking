const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const bodyParser = require("body-parser");
const { log } = require("console");
const stpath = path.join(__dirname, "template/views");
const hbspath = path.join(__dirname, "template/partials");
const connection = require("./db");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));
app.set("view engine", "hbs");
app.set("views", stpath);
hbs.registerPartials(hbspath);


app.get("/", (req, res) => {
    res.render("index");
})

app.get("/login", (req, res) => {
    res.render("login");
})

app.post("/submit", (req, res) => {
    console.log(req.body);
    var sql = "insert into inquiry values(?,?,?,?)";
    connection.query(sql,[req.body.location,req.body.checkin,req.body.checkout,req.body.guests],(err)=>{
        if(!err){
            console.log("Data inserted successfully")
            res.render("index");
        }
        else{
            console.log(err);
        }
    })
})

app.post("/sign", (req, res) => {
    var sql = "insert into USER values(?,?,?)";
    connection.query(sql, [req.body.name, req.body.email, req.body.password], (err) => {
        if (!err) {
            console.log("Data inserted successfully")
            res.render("pop",{
                errr:"Msg",
                msg:"Registeration completed successfully"
            })
        }
        else {
            console.log(err)
        }
    })

})

app.post("/login", (req, res) => {
    try {
        let email = req.body.email;
        let passgiven = req.body.password;
        const sql = `SELECT * FROM user WHERE Email=?`;
        connection.query(sql, [email], async (err, result) => {
            let data = await result;
            if (data.length) {
                if (passgiven === data[0].PASSWORD) {
                    res.render("home",{
                        name:data[0].NAME
                    });
                }
                else {
                    res.render("pop",{
                        errr:"Error",
                        msg:"Wrong password"
                    })
                }
            }
            else {
                res.render("pop",{
                    errr:"Error",
                    msg:"User not found"
                })
            }
        })

    } catch (error) {
        res.send(error);
    }
});

app.get("/about",(req,res)=>{
    res.render("about");
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})