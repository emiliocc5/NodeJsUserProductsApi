const express = require("express");

var http = require("http");
var url = require("url");
var querystring = require("querystring");
var log = require("./modules/log"); //Importación total
var { countries } = require ("countries-list"); //Importacion parcial

var server = http.createServer(function(request, response) {
  var parsed = url.parse(request.url);
  console.log("parsed: ", parsed);
  
  var pathname = parsed.pathname;

  var query = querystring.parse(parsed.query);
  console.log("query: ", query);

  if (pathname == "/") {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write("<html><body><p>HELLO</p></body></html>");
    response.end();
  } else if (pathname == "/exit") {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write("<html><body><p>BYE</p></body></html>");
    response.end();
  } else if (pathname == "/country") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.write(JSON.stringify(countries[query.code]));
    response.end();
  } else if (pathname == "/info") {
    var result = log.info(pathname);
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(result);
    response.end();
  } else if (pathname == "/error") {
    var resultError = log.error(pathname);
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(resultError);
    response.end();
  } else {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.write("<html><body><p>NOT FOUND</p></body></html>");
    response.end();
  }
});

server.listen(4000);

console.log("Runing on 4000");
