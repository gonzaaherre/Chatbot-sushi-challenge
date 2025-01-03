import MenuItem from "../models/product-model";
import { CreateProductItemDTO } from "../DTOs/product/createProductDto";

export class ProductService {
  async getAllProductItems() {
    return await MenuItem.find();
  }

  async getMenuItemByName(name: string) {
    return await MenuItem.findOne({ name: new RegExp(name, "i") });
  }

  async createMenuItem(menuItemData: CreateProductItemDTO) {
    const newMenuItem = new MenuItem(menuItemData);
    return await newMenuItem.save();
  }

  async deleteAllMenuItems() {
    return await MenuItem.deleteMany({});
  }
}
