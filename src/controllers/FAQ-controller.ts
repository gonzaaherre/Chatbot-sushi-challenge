import { NextFunction, Request, Response } from "express";
import { FAQService } from "../services/FAQ-service";

export class FAQController {
  private faqService: FAQService;

  constructor() {
    this.faqService = new FAQService();
  }

  // Obtener todas las preguntas frecuentes
  async getAllFAQsController(req: Request, res: Response) {
    console.log("Preguntas frecuentes");
    try {
      const faqs = await this.faqService.getAllFAQs();
      res.status(200).json(faqs);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener las preguntas frecuentes.", error });
    }
  }

  // //buscar una pregunta específica por palabra clave
  // async getFAQByKeywordController(req: Request, res: Response) {
  //   const keyword = req.query.keyword as string;

  //   try {
  //     const faq = await this.faqService.getFAQByKeyword(keyword);
  //     res.status(200).json(faq);
  //   } catch (error) {
  //     res.status(500).json({ message: "Error al buscar la pregunta", error });
  //   }
  //}

  async getFAQByKeywordController(req: Request, res: Response,next: NextFunction): Promise<Response> {
    const { keywords } = req.body;

  try {
    if (!keywords) {
      return res.status(400).json({ message: "Las palabras clave son requeridas." });
    }

    console.log("Palabras clave recibidas:", keywords);
    const faqs = await this.faqService.getFAQByKeywords(keywords);

    if (faqs.length > 0) {
      return res.status(200).json(faqs);
    } else {
      return res.status(404).json({ message: "No se encontraron FAQs relacionadas." });
    }
  } catch (error) {
    console.error("Error al buscar FAQs:", error);
    return res.status(500).json({ message: "Error al buscar las FAQs.", error });
  }
}
  

  // Crear una nueva pregunta frecuente
  async createFAQController(req: Request, res: Response) {
    const { question, answer } = req.body;

    try {
      const newFAQ = await this.faqService.createFAQ(question, answer);
      res.status(201).json(newFAQ);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al crear la pregunta frecuente", error });
    }
  }
}
