import { Repository, EntityRepository } from 'typeorm';
import { Cart } from './cart.entity';
import { Product } from '../products/product.entity';
import { BadRequestException } from '@nestjs/common';
import { User } from '../auth/user.entity';

@EntityRepository(Cart)
export class CartRepository extends Repository<Cart> {
  async addToCart(
    id: number,
    user: User,
  ): Promise<{ productId: number; quantity: number; message: string }> {
    const product = await Product.findOne({ id });
    if (!product) {
      throw new BadRequestException('Product does not exist.');
    }
    const checkCart = await this.findOne({
      productId: id,
      userId: user.id,
    });
    console.log(checkCart);

    if (checkCart) {
      checkCart.quantity += 1;
      await checkCart.save();
      return { productId: id, quantity: 1, message: 'Item Added' };
    }

    const cartItem = new Cart();
    cartItem.quantity = 1;
    cartItem.user = user;
    cartItem.product = product;
    await cartItem.save();
    return { productId: id, quantity: 1, message: 'Item Added' };
  }

  async getCart(
    user: User,
  ): Promise<{ cartItems: unknown; totalPrice: number }> {
    const cartItems = await this.createQueryBuilder('cart')
      .select('cart.quantity')
      .innerJoinAndSelect('cart.product', 'product')
      .where('cart.userId = :userId', { userId: user.id })
      .getMany();

    let totalPrice = 0;
    cartItems.map(item => {
      console.log(typeof item.product.price);
      totalPrice += Number(item.product.price);
    });
    const cart = {
      cartItems: [...cartItems],
      totalPrice,
    };
    return cart;
  }
}
