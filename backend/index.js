import express, { request, response } from 'express';
import 'dotenv/config'
//import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import paymentsRoute from './routes/paymentsRoute.js';
import cors from 'cors';
const PORT = process.env.PORT || 5555;


const app = express();


// Middleware for parsing request body
app.use(express.json());

app.use(express.static('public'));

const corsOption = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type','Authorization'],
}

app.use(cors(corsOption));

// Middleware for handling CORS POLICY
//Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
//Option 2: Allow custom origins
/*app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);
*/

app.use('/payments', paymentsRoute);

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome To MERN Stack Tutorial');
});



const mongoDBUrl = process.env.MONGODB_URL;

mongoose.connect(mongoDBUrl,{})
    .then(() => {
        console.log('App connected to database');

        app.listen(PORT, () => {
             console.log(`App is listening to port: ${PORT}`);
        });

    })
    .catch((error) => {
             console.log(error);
         });

// mongoose
//     .connect(mongoDBURL)
//     .then(() => {
//         console.log('App connected to database');
//         app.listen(PORT, () => {
//             console.log(`App is listening to port: ${PORT}`);
//         });
//     })
//     .catch((error) => {
//         console.log(error);
//     });

