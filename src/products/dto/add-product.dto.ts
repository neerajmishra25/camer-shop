import { IsNotEmpty, Length } from 'class-validator';
import { ProductMakeYearValidation } from '../pipes/product-make-year-validation.decorator';
export class AddProductDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;

  @Length(4, 4)
  @ProductMakeYearValidation('make', { message: 'Please provide a valid year' })
  make: number;
  @IsNotEmpty()
  price: number;
}
