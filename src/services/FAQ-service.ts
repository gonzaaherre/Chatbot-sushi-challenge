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

  // async getFAQByKeyword(keyword: string) {
  //   try {
  //     //(ignora mayúsculas/minúsculas)
  //     console.log("Palabra clave: ", keyword);
  //     //descompone los caracteres con tilde en su forma base y elimina la tilde
  //     const normalizedKeyword = keyword.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  //     console.log("Palabra clave normalizada: ", normalizedKeyword);
  //     const faq = await FAQ.findOne({
  //       question: new RegExp(normalizedKeyword, "i"),
  //     }).select("question answer -_id");

  //     if (!faq) {
  //       throw new Error("No se encontraron resultados para la palabra clave");
  //     }
  //     console.log(faq);
  //     return faq;
  //   } catch (error) {
  //     console.error("Error al buscar la pregunta frecuente:", error);
  //     throw new Error("Hubo un error al buscar la pregunta frecuente");
  //   }
  // }
  async getFAQByKeywords(keywords: string) {
    try {
      let long = 2;
      console.log("Palabras clave originales:", keywords);
  
      const normalizedKeywords = keywords
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") //normalizar y eliminar tildes
        .toLowerCase()
        .split(/\s+/); //dividir por espacios

      if(normalizedKeywords.length === 1){
        long = 1;
      }
      console.log("Palabras clave normalizadas:", normalizedKeywords);
  
      const faqs = await FAQ.find(); // Obtener todas las FAQs
      
      const matchingFAQs = faqs.filter((faq: any) => {
        const normalizedQuestion = faq.question
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();
          //busco palabra por palabra con el includes
        const matches = normalizedKeywords.filter((keyword) =>
          normalizedQuestion.includes(keyword)
        );
        return matches.length >= long; //i hay al menos 2 coincidencias
      });
  
      if (matchingFAQs.length === 0) {
        throw new Error("No se encontraron FAQs relevantes.");
      }
  
      console.log("FAQs encontradas:", matchingFAQs);
      return matchingFAQs;
    } catch (error) {
      console.error("Error al buscar FAQs por palabras clave:", error);
      throw new Error("Hubo un error al buscar las FAQs.");
    }
  }
  async createFAQ(question: string, answer: string) {
    const faq = new FAQ({ question, answer });
    return await faq.save();
  }
}
