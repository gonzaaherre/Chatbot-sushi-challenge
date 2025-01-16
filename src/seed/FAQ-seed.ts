import mongoose from "mongoose";
import FAQ from "../models/faq-model";
import order from "../models/order-model";
import { connectDB } from "../config/dbClient";
import product from "../models/product-model";

const seedFAQs = async () => {
  FAQ.deleteMany({}).then(() => {
    console.log("Se eliminaron las preguntas frecuentes anteriores");
  });

  product.deleteMany({}).then(() => {
    console.log("Se eliminaron los productos anteriores");
  });

  const faqs = [
    {
      question: "¿Qué tipos de sushi ofrecen tienen?",
      answer: "Ofrecemos sushi tradicional, makis, nigiris y más.",
    },
    {
      question: "¿Cuáles son los horarios del local abiertos abierto?",
      answer: "Estamos abiertos todos los días de 10:00 AM a 10:00 PM.",
    },
    {
      question: "¿Puedo hacer un pedido en línea online?",
      answer:
        "Sí, puedes hacer pedidos en línea a través de nuestra página web.",
    },
    {
      question: "¿Tienen opciones para vegetarianos?",
      answer: "Sí, ofrecemos opciones vegetarianas y veganas.",
    },
    {
      question: "¿Realizan entregas a domicilio?",
      answer: "Sí, ofrecemos servicio de entrega a domicilio en varias zonas.",
    },
    {
      question: "¿Cuánto tarda tardan la entrega?",
      answer:
        "El tiempo de entrega varía entre 30 a 45 minutos, dependiendo de la zona.",
    },
  ];

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
    await FAQ.insertMany(faqs);
    await product.insertMany(products);
    await seedOrders();
    console.log("Menu and FAQs seeded successfully!");
  } catch (error) {
    console.error("Error seeding FAQ or menu:", error);
  } finally {
    mongoose.connection.close();
  }
};

async function seedOrders() {
  try {
    //Obtener productos existentes
    const products = await product.find();
    //crear con cualquier product
    const ordersData = [
      {
        products: [
          { product: products[0]._id, quantity: 2 },
          { product: products[1]._id, quantity: 1 },
        ],
        totalPrice: products[0].price * 2 + products[1].price * 1,
        status: "pending",
      },
      {
        products: [{ product: products[1]._id, quantity: 3 }],
        totalPrice: products[1].price * 3,
        status: "completed",
      },
    ];
    //limpiar ordenes existentes
    await order.deleteMany({});
    console.log("Órdenes existentes eliminadas.");

    // Insertar nuevas órdenes
    const createdOrders = await order.insertMany(ordersData);
    console.log(`Órdenes creadas: ${createdOrders.length}`);
  } catch (error) {
    console.error("Error al sembrar las órdenes:", error);
  }
}

seedFAQs();
