import http from "http";
import fs from "fs";
import url from "url";

const server = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return req.end;
  const log = `${Date.now()} ${req.url} ${req.method} New Request received\n`;
  const myUrl = url.parse(req.url, true);
  console.log(myUrl);

  fs.appendFile("log.txt", log, (err) => {
    switch (myUrl.pathname) {
      case "/":
        res.end("Homepage");
        break;
      case "/about":
        const username = myUrl.query.myname;
        res.end(`Hi ${username}`);
        break;
      case "/search":
        const search = myUrl.query.search_query;
        res.end(`Search result for ${search}`);
        break;
      case "/signup":
        if (req.method === "GET") return res.end("Signup page");
        else if (req.method === "POST") {
          //DB Query
          res.end("Signup form submitted");
        }
        case "/users":
        req.url = "/1"
        const users = myUrl.query.userid;
        if(req.method === "GET") return res.end(`User ID: ${users}`);
        break;
      default:
        res.end(" 404 not found");
    }
  });
});

server.listen(8001, () => {
  console.log("Server is running on port 8001");
});
