import ProductItem from "../models/product-model";
import { CreateProductItemDTO } from "../DTOs/product/createProductDto";

export class ProductService {
  async getAllProductItems() {
    try {
      console.info(" consulta de todos los productos en el service");
      const items = await ProductItem.find().select(
        "name description price"
      );

      if (!items || items.length === 0) {
        console.warn("no se encontraron productos en el menú");
        return [];
      }

      //console.info(`productos encontrados: ${items}`);
      return items;
    } catch (error) {
      console.error("Error al obtener los productos del menú", error);
      throw new Error(
        "No se pudo obtener la lista de productos. Por favor, intenta nuevamente."
      );
    }
  }

  //obtener un producto por nombre
  async getMenuItemByName(name: string) {
    try {
      console.info(`buscando producto con nombre: `, name);
      const item = await ProductItem.findOne({ name: new RegExp(name, "i") });

      if (!item) {
        console.warn(`producto no encontrado: `, name);
        throw new Error(`Producto con nombre '${name}' no encontrado.`);
      }

      console.info(`producto encontrado:`, name);
      const respuesta = {
        name: item.name,
        id: item._id,
        price: item.price,
      };

      return respuesta;
    } catch (error) {
      console.error(`error al buscar producto por nombre `, name, error);
      throw new Error(
        "No se pudo obtener el producto. Por favor, intenta nuevamente."
      );
    }
  }

  //crear un nuevo producto
  async createMenuItem(productitemData: CreateProductItemDTO) {
    try {
      console.info("Creando un nuevo producto", productitemData);

      const existingProduct = await ProductItem.findOne({
        name: productitemData.name,
      });

      if (existingProduct) {
        console.warn(` producto duplicado: `, productitemData.name);
        throw new Error("Ya existe un producto con el nombre");
      }

      const newProductItem = new ProductItem(productitemData);
      const savedProduct = await newProductItem.save();

      console.info(`producto creado con éxito: `, productitemData.name);
      return savedProduct;
    } catch (error) {
      console.error("Error al crear el producto", error);
      throw new Error(
        "No se pudo crear el producto. Por favor, intenta nuevamente."
      );
    }
  }
}
