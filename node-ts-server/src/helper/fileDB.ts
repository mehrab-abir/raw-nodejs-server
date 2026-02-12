import { readFileSync } from "node:fs";
import path from "node:path";
import fs from 'fs'

const filePath = path.join(process.cwd(), 'src/data/users.json');

//*reding existing data
export function readUsers(){
    const data = readFileSync(filePath, "utf-8");
    return JSON.parse(data); //* data is the file as json, so must parse them before retruning
}

export function writeUsers(users : any){
    fs.writeFileSync(filePath,JSON.stringify(users, null, 2));

    //? data must be stringify as we are storing them in the as json
}