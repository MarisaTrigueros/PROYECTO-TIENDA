// src/server.ts
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();  // Cargar las variables de entorno desde .env

const app = express();

// Middleware de CORS
app.use(cors({
  origin: 'http://localhost:5173',  // Asegúrate de que coincida con el puerto de Vite (Frontend)
}));

app.use(express.json());  // Middleware para interpretar JSON en las requests

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI || '', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

// Definir un modelo básico de producto
interface IProduct {
  name: string;
  price: number;
}

const productSchema = new mongoose.Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const Product = mongoose.model<IProduct>('Product', productSchema);

// Rutas básicas para obtener productos
app.get('/api/products', async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos', error });
  }
});

// Iniciar el servidor en el puerto 5000
app.listen(3000, () => {
  console.log('Servidor backend corriendo en el puerto 5000');
});
