import { Injectable } from '@nestjs/common';
import { AddProductDto } from './dto/add-product.dto';
import { ProductRepository } from './product.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRespository: ProductRepository,
  ) {}

  async addProduct(addProductDto: AddProductDto): Promise<Product> {
    return this.productRespository.addProduct(addProductDto);
  }
  getAllProducts(): Promise<Product[]> {
    return this.productRespository.getAllProducts();
  }
}
