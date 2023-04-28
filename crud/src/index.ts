import { App } from './App';
import { connectDB } from "./connection";

main();

async function main() {
    await connectDB();
    const app = new App();
    app.start('8080');
}