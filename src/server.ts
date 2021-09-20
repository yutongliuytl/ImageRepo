import express from 'express';
import cors, { CorsOptions } from 'cors';

// Import Routes
import image_routes from './routes/image';

const app = express();
import "dotenv/config";

const options: CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: process.env.ALLOWED_ORIGIN,
  preflightContinue: false,
};

// Middlewares
app.use(express.json({limit: "5mb"}));
app.use(cors(options));

// Routes Middleware
app.use('/image', image_routes);
app.use('/user', image_routes);

// PORT, Listen
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`App running on PORT ${port}`));