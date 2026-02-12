import { IncomingMessage, ServerResponse } from "node:http";

export type RouteHandler = (req:IncomingMessage,res:ServerResponse)=> void;
export const routes : Map<string, Map<string, RouteHandler>> = new Map();
//* 1st string -> Method
//* 2nd string -> path, RouteHandler - > handler function

function addRoutes(method : string, path : string, handler:RouteHandler){
    if(!routes.has(method)){
        routes.set(method, new Map());
    }

    routes.get(method)!.set(path,handler);
}

export default addRoutes;