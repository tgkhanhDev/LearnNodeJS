const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  console.log("NEXT");

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message" /></form></body>'
    );
    //"/" là miền mặc định , input xog sẽ NAV đến /message
    res.write("</head>");
    res.write("</html>");
    return res.end();
  }

  //!đây là action bất đồng bộ asynchronous
  if (url === "/message" && method === "POST") {
    //trước khi sending response và trước khi ghi vào tệp, ta muốn nhận request data
    const body = [];
    req.on("data", (chunk) => {
      console.log("chunk: ", chunk);
      body.push(chunk);
    }); //listen to data event

    //execute sau cung
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString(); //chuyển input thành string
      const message = parsedBody.split("=")[1];
      //!parsedBody có dạng message=abc nên phải split
      //!Khi split thì sẽ là ["message", "Hello%20World"]
      //?Đây là Blocking block

      fs.writeFileSync("message.txt", message, (err) => {
        res.statusCode = 302; //(Found-đc sd để chuyển hướng)
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  // process.exit();
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>MyFirstPage</title></head>");
  res.write("<body><h1>Helo from my Node.js Server!</h1></body>");
  res.write("</head>");
  res.write("</html>");
  res.end();
  //res.write(); //sẽ báo lỗi vì sau end kh đc viết thêm
};

// module.exports = requestHandler;
module.exports = {
  handler: requestHandler,
  coolthings: "HEHE",
};

// exports.handler=requestHandler;
// exports.coolthings="HEHE";
