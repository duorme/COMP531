#!/bin/bash
PORT=3000

echo "GET /"
curl -H 'Content-Type: application/json' http://localhost:${PORT}
echo ""
echo ""


echo "GET /headlines"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/headlines
echo ""
echo ""

echo "PUT /headline"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/headline -d "{ \"headline\":\"New Headline\" }" -X PUT
echo ""
echo ""

echo "GET /headline"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/email/:user? -X GET
echo ""
echo ""

echo "PUT /email"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/email -d "{ \"email\":\"newemail@rice.edu\" }" -X PUT
echo ""
echo ""