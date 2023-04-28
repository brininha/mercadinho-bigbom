// App.ts - Responsável pela criação de rotas
import express from 'express';
import { createServer, Server } from 'http';
import cors from 'cors';
import indexRoutes from './routes';

export class App {

    app: express.Application;
    server: Server;

    constructor() {
        this.app = express();
        this.server = createServer(this.app);
        this.middlewares();
        this.cors();
        this.routes();
    }

    public start(port: string): void {
        this.app.listen(port, () => {
            console.log(`Starting on port ${port}`);
        });
    }

    public cors(): void {
        const options: cors.CorsOptions = {
            methods: '*',
            origin: '*'
        };
        this.app.use(cors(options));
    }

    public routes(): void {
        this.app.use('/', indexRoutes);
    }

    public middlewares():void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({
        extended: false
        }));
    }
}