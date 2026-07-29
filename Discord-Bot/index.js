import {Client, GatewayIntentBits} from "discord.js"
import { response } from "express";

const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });



client.on("messageCreate", async (message)=>{
   // console.log(message.content)
   if(message.author.bot) return;
   if(message.content.startsWith("create")){
   const url = message.content.split("create")[1].trim();
  
try {
     const response = await fetch("http://localhost:8000/" ,{
            method :"POST",
            headers:{
                  "content-type": "application/json",
                //   "Authorization": `Bearer ${process.env.JWT_TOKEN}`
            },
            body: JSON.stringify({
                url: url
            }),
        })
        console.log(response.status);
console.log(response.url);
console.log(response.headers.get("content-type"));

// const text = await response.text();
// console.log(text);
        const data = await response.json()
    
     message.reply(`Generated URL: https://localhost:8000/${data.shortId}`);
} catch (error) {
    console.log(error)
}
       
    
    
   }
   
//    message.reply({
//     content:"Hi from bot"
//    })
})

client.on("interactionCreate", (interaction)=>{
    interaction.reply("learn some skills")
})

client.login("")