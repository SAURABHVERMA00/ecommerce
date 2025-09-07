import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import Item from '../models/Item.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce';
const productsPath = path.resolve('backend/products.json');

async function importProducts() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  const data = fs.readFileSync(productsPath, 'utf-8');
  const products = JSON.parse(data);
  await Item.deleteMany({});
  await Item.insertMany(products);
  console.log('Products imported!');
  mongoose.disconnect();
}

importProducts();