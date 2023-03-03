const http = require("http");
const url = require("url");
const querystring = require("querystring");
const https = require("https"); // Add this line
require("./db");
const routes = require("./router/index.routes");

const server = http.createServer(function(req, res) {
  let parsedURL = url.parse(req.url, true);
  let path = parsedURL.pathname.toString();

  //console.log(path);
  let qs = {params: parsedURL.query};
  qs = JSON.parse(JSON.stringify(qs));
  let headers = req.headers;
  let method = req.method.toLowerCase();

  let body = "";

  req.on("data", function(data) {
    //console.log("got some data");
    body += data.toString();
  });

  req.on("end", function() {
    console.log("send a response");

    // Parse the request body as JSON if it exists
    let requestBody = {body:{}};
    if (body) {
      requestBody.body = JSON.parse(body);
    }

    const data = Object.assign({}, qs, requestBody, {
      path: path,
      headers: headers,
      method: method,
    });

    //console.log("HEADER", data);
    let handler = '';
    switch (method) {
      case "get":
        handler = routes.GET[path];
        if (handler) {
          handler(data, res);
        } else {
          routes.notFound(data, res);
        }
        break;

      case "post":
        handler = routes.POST[path];
        if (handler) {
          if (path === '/oauth/token') {
            getBearerToken(data, res, handler);
          } else {
            handler(data, res);
          }
        } else {
          routes.notFound(data, res);
        }
        break;

      case "put":
        handler = routes.PUT[path];
        if (handler) {
          if (path === '/oauth/token') {
            getBearerToken(data, res, handler);
          } else {
            handler(data, res);
          }
        } else {
          routes.notFound(data, res);
        }
        break;

      case "delete":
        // TODO: Add logic to handle HTTP DELETE requests
        break;

      default:
        routes.notFound(data, res);
        break;
    }
  });
});

server.listen(1234, function() {
  console.log("Listening on port 1234");
});

function getBearerToken(data, res, next) {
  const clientId = 'your_client_id';
  const clientSecret = 'your_client_secret';

  const options = {
    hostname: 'auth.example.com',
    path: '/oauth/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  const req = https.request(options, (resp) => {
    let token = '';

    resp.on('data', (chunk) => {
      token += chunk;
    });

    resp.on('end', () => {
      data.token = JSON.parse(token).access_token; // Store the token in the data object
      next(data, res);
    });
  });

  req.on('error', (error) => {
    console.error(error);
  });

  req.write(`grant_type=client_credentials&client_id=${encodeURIComponent(clientId)}&client_secret=${encodeURIComponent(clientSecret)}`);
  req.end();
}
