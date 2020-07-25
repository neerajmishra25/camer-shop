import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AddProductDto } from './dto/add-product.dto';
import { Product } from './product.entity';
import { AuthGuard } from '@nestjs/passport';
// import { ProductMakeYearValidationPipe } from './pipes/product-make-year-validation.pipe';

@Controller('products')
@UseGuards(AuthGuard())
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getAllProducts(): Promise<Product[]> {
    return this.productsService.getAllProducts();
  }

  @Post()
  @UsePipes(ValidationPipe)
  addProducts(@Body() addProductDto: AddProductDto): Promise<Product> {
    return this.productsService.addProduct(addProductDto);
  }
}
