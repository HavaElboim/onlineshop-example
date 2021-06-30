/* all this is currently inside index.js:
import express from 'express';
import { PORT, NODE_ENV } from './config';

const app = express();
app.disable('x-powered-by');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
*/