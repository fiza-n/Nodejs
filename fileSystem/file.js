import fs from "node:fs"

//synchronus call 
// fs.writeFileSync("test.txt", "testing nodejs");
// fs.writeFileSync("test.txt", "testing nodejs hh")

// //asynchronus call
// fs.writeFile("test1.txt", "testing", (err)=>{
//     console.log(err);
// })

//read file synchronus
const result = fs.readFileSync("./contact.txt", "utf-8");
console.log(result);

//does not return any value, it will return undefined
fs.readFile("./contact.txt", "utf-8", (err, data)=>{
    if(err){
        console.log(err); 
    }
    console.log(data);
})