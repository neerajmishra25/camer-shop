import {
  Controller,
  Param,
  Post,
  UseGuards,
  Get,
  ParseIntPipe,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('cart')
@UseGuards(AuthGuard())
export class CartController {
  constructor(private cartService: CartService) {}

  @Post('/:id')
  addToCart(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<{ productId: number; quantity: number; message: string }> {
    // console.log(user);
    return this.cartService.addToCart(id, user);
  }

  @Get()
  getCart(
    @GetUser() user: User,
  ): Promise<{ cartItems: unknown; totalPrice: number }> {
    return this.cartService.getCart(user);
  }
}
