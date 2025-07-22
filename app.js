const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");


const app = express();
const PORT = 4040;

const server = http.createServer(app);

const io = socketio(server);

app.set("view engine","ejs");
app.use(express.static("public"));
app.set(express.static(path.join(__dirname,"public")));
io.on("connection",function(socket){
    socket.on("send-location",function(data){
io.emit("recive-location",{id:socket.id,...data});
    });

    socket.on("disconnected",function(){
        io.emit("user-disconnect",socket.id);
    })
   
});


app.get("/",function(req,res){
res.render("index")
});

server.listen(PORT,()=> console.log(`Server started at ${PORT}`));