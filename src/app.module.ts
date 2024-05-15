import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [AuthModule, ProductsModule, SeedModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
