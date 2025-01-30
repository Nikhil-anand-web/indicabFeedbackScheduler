import cron from 'node-cron';


import dotenv from 'dotenv';
dotenv.config();


import dataFetcher from './schedulers/dataFetcher.js';

cron.schedule('*/20 * * * * *', dataFetcher);


console.log('Node-Cron project started.');
