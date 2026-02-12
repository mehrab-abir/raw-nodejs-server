//this function runs when app starts, registers the handler in memory [Map()] with its 'method' and 'url',

import { readUsers, writeUsers } from "./fileDB";
import parseBody from "./parseBody";
import addRoutes from "./RouteHandler";
import sendResponse from "./sendResponse";

//which is later looked up from the Map() using the 'method' and 'url' when api is hit by the client, if found, we run the handler, otherwise, send '404 not found' response
addRoutes("GET", "/", (req, res) => {
  sendResponse(res, 200, {
    message: "Hello from node.js server, built manually......",
    path: req.url,
  });
});


addRoutes("GET", "/allproducts", (req,res)=>{
    sendResponse(res, 200, {
      message: "All Products from database",
      path: req.url,
    });
});


addRoutes("POST","/api/users",async (req,res)=>{
    const body = await parseBody(req);

    const users = readUsers(); //*bring all existing data first

    const newUser = {
      ...body
    }

    users.push(newUser); //* push the new data to the existing array of objects

    writeUsers(users) //* write the file entirely with the whole data

    sendResponse(res,201,{success : true, data : body});
})
