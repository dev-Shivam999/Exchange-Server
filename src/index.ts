import express from 'express';
import { Db } from './db/db';
import cookieParser from 'cookie-parser';
import { UserRouter } from './Routers/User';
import cors from 'cors'
import { SelRoute } from './Routers/Sel';
import { config } from 'dotenv';

import cluster from 'cluster';
import os from 'os';
config()

const totalCpus = os.cpus().length;
console.log(totalCpus);


if (cluster.isPrimary) {
    console.log(`totalCpus: ${totalCpus}`);

    for (let i = 0; i < totalCpus; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} exited, starting a new one...`);
        cluster.fork();
    });
}else{

    const app = express();
    app.use(cors({
        credentials: true,
        origin: `*`
    }))
    console.log(process.env.Url);


    Db()
    app.use(express.json())
    app.use(cookieParser())
    app.use('/user', UserRouter)
    app.use('/Sel', SelRoute)


    const Port = process.env.PORT || 3000


    app.listen(Port, () => {
        console.log(`app listening on ${Port}`);

    })
}