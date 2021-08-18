import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import {Request, Response} from "express";
import * as cors  from 'cors';
import * as helmet from 'helmet';
const PORT = process.env.PORT || 3000;


//https://www.youtube.com/watch?v=8si7IFlj0l4&list=WL&index=40&t=246s enlace guia

createConnection().then(async () => {

    // create express app
    const app = express();
    // middlewares
    app.use(cors());
    app.use(helmet());


    app.use(express.json());

   
    // setup express app here
    // ...

    // start express server
    app.listen(PORT,()=>console.log(`Server running on port : ${PORT}`));


}).catch(error => console.log(error));
