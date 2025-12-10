import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';
import routes from './routes/index.js';
import init from './models/initDB.js';

const app = express();

app.use(express.json());
app.use(cors({origin: '*', exposedHeaders: ['Content-Disposition']}));
app.use(helmet());
app.use(hpp());
app.use(compression());

const Server = async () => {
    console.log(`Starting application server in ${process.env.ENVIRONMENT || 'development'} mode. Please wait...`);
    try{
        await init();
        app.get("/", (req, res) => { return res.send("Server running! Welcome to root route.") } );
        
        routes(app);

        const app_port = process.env.PORT || 3000;
        app.listen(app_port, (err) => { err ? console.error(`Server failed to start. Message- ${err}.`) : console.log(`Server started successfully on port ${app_port}.`) })
    }
    catch(err){
        console.error(`Server failed! Message- ${err}.`);
    }
}

// start server
Server();