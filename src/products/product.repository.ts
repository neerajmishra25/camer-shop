import { Repository, EntityRepository } from 'typeorm';
import { Product } from './product.entity';
import { AddProductDto } from './dto/add-product.dto';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async addProduct(addProductsDto: AddProductDto): Promise<Product> {
    const { title, description, price, make } = addProductsDto;
    const product = new Product();
    product.title = title;
    product.description = description;
    product.price = price;
    product.make = make;
    await product.save();
    return product;
  }
  async getAllProducts(): Promise<Product[]> {
    const query = this.createQueryBuilder('product');
    const product = await query.getMany();
    return product;
  }
}
