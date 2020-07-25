import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { User } from '../auth/user.entity';
import { Product } from '../products/product.entity';

@Entity()
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column()
  // title: string;

  // @Column('decimal', { precision: 10, scale: 2 })
  // price: number;

  @Column()
  quantity: number;

  @ManyToOne(
    type => User,
    user => user.cart,
  )
  user: User;

  @ManyToOne(
    type => Product,
    product => product.cart,
  )
  product: Product;

  @Column()
  userId: number;

  @Column()
  productId: number;
}
