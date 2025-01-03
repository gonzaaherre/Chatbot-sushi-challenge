import FAQ from "../models/faq-model";

export class FAQService {
  async getAllFAQs() {
    try {
      const faqs = await FAQ.find();
      console.log("FAQs: ", faqs);
      return faqs;
    } catch (error) {
      console.error("Error getting FAQ: ", error);
      throw error;
    }
  }

  async getFAQByKeyword(keyword: string) {
    try {
      //(ignora mayúsculas/minúsculas)
      console.log("Palabra clave: ", keyword);

      const faq = await FAQ.findOne({
        question: new RegExp(keyword, "i"),
      }).select("question answer -_id");

      if (!faq) {
        throw new Error("No se encontraron resultados para la palabra clave");
      }
      console.log(faq);
      return faq;
    } catch (error) {
      console.error("Error al buscar la pregunta frecuente:", error);
      throw new Error("Hubo un error al buscar la pregunta frecuente");
    }
  }
  async createFAQ(question: string, answer: string) {
    const faq = new FAQ({ question, answer });
    return await faq.save();
  }
}
