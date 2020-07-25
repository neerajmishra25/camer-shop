import { Injectable } from '@nestjs/common';
import { CartRepository } from './cart.respository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartRepository)
    private cartRespository: CartRepository,
  ) {}

  async addToCart(
    id: number,
    user: User,
  ): Promise<{ productId: number; quantity: number; message: string }> {
    return this.cartRespository.addToCart(id, user);
  }

  async getCart(
    user: User,
  ): Promise<{ cartItems: unknown; totalPrice: number }> {
    return this.cartRespository.getCart(user);
  }
}
