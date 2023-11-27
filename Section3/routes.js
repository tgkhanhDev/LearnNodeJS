const fs = require("fs");
const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message please: </title></head>");
    res.write("<h1>Please Input:</h1>");
    res.write(
      '<body><form action="/user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>'
    );
    res.write("</head>");
    res.write("</html>");
    return res.end();
  }

  if (url === "/user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
        const usermessage = parsedBody.split("=")[1];
        fs.writeFileSync("userMessage.txt", usermessage, (err) => {
          res.statusCode = 302; //(Found-đc sd để chuyển hướng)
          res.setHeader("Location", "/");
          if (err) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "text/html");
            res.write("<html>");
            res.write("<head><title>Error</title></head>");
            res.write("<body><h1>Internal Server Error</h1></body>");
            res.write("</head>");
            res.write("</html>");
            return res.end();
          }
          return res.end();
        });
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>UserPage</title></head>");
  res.write("<body><h1>Success!</h1></body>");
  res.write("</head>");
  res.write("</html>");
  res.end();
};

exports.handler = requestHandler;
