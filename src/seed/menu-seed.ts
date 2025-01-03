import Product from "../models/product-model";
import connectDB from "../config/dbClient";
import mongoose from "mongoose";

const seedMenu = async () => {
  const products = [
    {
      name: "Nigiri de salmón",
      description:
        "Delicado arroz sushi cubierto con una fina lámina de salmón fresco.",
      price: 450,
      category: "Nigiri",
      available: true,
    },
    {
      name: "Roll California",
      description: "Roll con arroz, alga nori, palta, queso crema y kanikama.",
      price: 700,
      category: "Rolls",
      available: true,
    },
    {
      name: "Roll Tempura",
      description: "Roll frito con camarón, queso crema y salsa teriyaki.",
      price: 800,
      category: "Rolls",
      available: true,
    },
    {
      name: "Sashimi de atún",
      description:
        "Láminas frescas de atún rojo servidas con wasabi y salsa de soja.",
      price: 900,
      category: "Sashimi",
      available: true,
    },
    {
      name: "Combo Familiar",
      description: "50 piezas de sushi mixto: rolls, nigiris y sashimi.",
      price: 4500,
      category: "Combos",
      available: true,
    },
    {
      name: "Gyozas de cerdo",
      description: "Empanaditas japonesas rellenas de cerdo y vegetales.",
      price: 600,
      category: "Entradas",
      available: true,
    },
  ];

  try {
    await connectDB();
    await Product.insertMany(products);
    console.log("Menu seeded successfully!");
  } catch (error) {
    console.error("Error seeding menu:", error);
  } finally {
    mongoose.connection.close(); // Cerramos la conexión
  }
};

seedMenu();
