import fs from "fs"

function logRequest(filename){
    return((req,res,next)=>{
      
        fs.appendFile(filename, `\n${Date.now()}, ${req.method}, ${req.path}`,(err,data)=>{
        next();
    })
})}

export default logRequest;