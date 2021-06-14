# Hackerbay-Microservices

A stateless microservice in Nodejs, with three major functionalities - Authentication, JSON patching, Image Thumbnail Generation


## Setup
The API requires Nodejs to be installed on your system

git clone this repo

cd Hackerbay-Microservice

Create a .env file and set jwtSecret to any secret key of your choice.
e.g
jwtSecret=secretKey

npm install

npm start

App can be reached at localhost:3000
 

## Testing the API routes.
Testing can be done with Postman

### Authentication
This is a demo authentication so you can use any username or password to login.
 1. Make a POST request to /api/auth. 
 2. In the Body select x-www-form-urlencoded.
 3. Set the username key and the password key with values of atleast 3 characters and 3 characters respectively.
 4. Send
 
 Expected result:
 {
    "user": "john",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJpYXQiOjE2MjM2NDM4MTksImV4cCI6MTYyMzY2NTQxOX0.wPW5KsMNJyI2X8t0TDyVWhPpfJ3hEod3auATgM0qGLg",
    "authorized": true
}


 ### JSON patching
Apply json patch to a json object, and return the resulting json object.
 1. Make a POST request to /api/patchJson. 
 2. Set the key to jsonObjec and value to an object. Set another key to jsonPatchObject and the value to an object.

 Examples:
 jsonObject
 { "user": { "firstName": "John", "lastName": "Doe" } }

 jsonPatchObject
 [{"op": "replace", "path": "/user/firstName", "value": "James"}, {"op": "replace", "path": "/user/lastName", "value": "Brown"}]

 3. Add Header, set key as ```token``` and value as token received from **Authentication**.
 4. Expected result:
 { "user": { "firstName": "John", "lastName": "Doe" } }


 ### Thumbnail Generator
Create a thumbnail.
 1. Make a POST request to /api/thumbnail. 
 2. Set the key ```imageUrl``` to a public image url.
 3. Add Header, set key as ```token``` and value as token received from **Authentication**.
 4. Image will be downloaded and converted to a thumbnail of size 50x50 pixels with a sample Expected result:
 {
    "converted": true,
    "user": "doej",
    "success": "Image has been resized",
    "thumbnail": "./public/images/resized/"
 }


## Unit Testing
mochai is used for the unit testing .
cd to application's root directory then Run npm test.

## Logging
All logs are saved in ```logger.log``` in the application's root.


## Built With
 * [Node.js](https://nodejs.org)
 * [Express](https://expressjs.com/)
 * [Mocha](https://mochajs.org/) - For testing



## Docker image
https://hub.docker.com/repository/docker/jelroi/hackerbay-microservices
