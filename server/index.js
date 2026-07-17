import http from "http"
import fs from "fs"



const server = http.createServer((req, res)=>{
    const log = `${Date.now() } ${req.url} New Request received\n`;

    fs.appendFile("log.txt", log, (err) =>{
        
         switch(req.url){
            case "/":
            res.end("Homepage");
            break;
            case "/about":
            res.end("I am  Fiza Noor");
            break;
            default:
            res.end(" 404 not found");
         }
    })
})

server.listen(8001, ()=>{
    console.log("Server is running on port 8001");
})