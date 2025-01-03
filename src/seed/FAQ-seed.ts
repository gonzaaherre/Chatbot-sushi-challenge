import mongoose from "mongoose";
import FAQ from "../models/faq-model";
import connectDB from "../config/dbClient";

const seedFAQs = async () => {
  FAQ.deleteMany({}).then(() => {
    console.log("Se eliminaron las preguntas frecuentes anteriores");
  });

  const faqs = [
    {
      question: "¿Qué tipos de sushi ofrecemos?",
      answer: "Ofrecemos sushi tradicional, makis, nigiris y más.",
    },
    {
      question: "¿Cuáles son los horarios de apertura?",
      answer: "Estamos abiertos todos los días de 10:00 AM a 10:00 PM.",
    },
    {
      question: "¿Puedo hacer un pedido en línea?",
      answer:
        "Sí, puedes hacer pedidos en línea a través de nuestra página web.",
    },
    {
      question: "¿Tienen opciones vegetarianas?",
      answer: "Sí, ofrecemos opciones vegetarianas y veganas.",
    },
    {
      question: "¿Realizan entregas a domicilio?",
      answer: "Sí, ofrecemos servicio de entrega a domicilio en varias zonas.",
    },
    {
      question: "¿Cuánto tarda la entrega?",
      answer:
        "El tiempo de entrega varía entre 30 a 45 minutos, dependiendo de la zona.",
    },
  ];

  try {
    await connectDB();
    await FAQ.insertMany(faqs);
    console.log("FAQ seeded successfully!");
  } catch (error) {
    console.error("Error seeding FAQ:", error);
  } finally {
    mongoose.connection.close(); // Cerramos la conexión
  }
};

seedFAQs();
