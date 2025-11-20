import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { ProductsModule } from './features/products/products.module';
import { UsersModule } from './features/users/users.module';
import { AuthModule } from './features/auth/auth.module';
import { CartModule } from './features/cart/cart.module';
import { LlmModule } from './features/llm/llm.module';

@Module({
    imports: [
        CoreModule,
        ProductsModule,
        UsersModule,
        AuthModule,
        CartModule,
        LlmModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
