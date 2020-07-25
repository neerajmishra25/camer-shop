import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'camera_shop',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true, //should be false in production
};
