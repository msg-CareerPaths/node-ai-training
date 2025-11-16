/* eslint-disable */
import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class SeedMockData1731624001000 implements MigrationInterface {
    name = 'SeedMockData1731624001000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM "order_items"');
        await queryRunner.query('DELETE FROM "orders"');
        await queryRunner.query('DELETE FROM "products"');
        await queryRunner.query('DELETE FROM "users"');

        const adminPass = await bcrypt.hash('admin', 10);
        const userPass = await bcrypt.hash('jdoe', 10);

        await queryRunner.query(
            `
                INSERT INTO "users" ("username", "fullname", "password", "roles")
                VALUES
                    ($1, $2, $3, ARRAY['admin']::"user_role_enum"[]),
                    ($4, $5, $6, ARRAY['user']::"user_role_enum"[])
            `,
            ['admin', 'Admin User', adminPass, 'jdoe', 'John Doe', userPass]
        );

        await queryRunner.query(`
            INSERT INTO "products" ("name", "category", "image", "price", "description")
            VALUES
              ('Smartphone X', 'electronics', 'https://picsum.photos/seed/smartphone-x/640/480', 799.99, 'A modern smartphone with great features.'),
              ('Running Shoes', 'sports', 'https://picsum.photos/seed/running-shoes/640/480', 89.99, 'Lightweight running shoes for daily training.'),
              ('Coffee Maker', 'home', 'https://picsum.photos/seed/coffee-maker/640/480', 59.99, 'Automatic coffee maker with timer.')
        `);

        const users = await queryRunner.query(
            'SELECT id, username FROM "users" WHERE username IN ($1, $2)',
            ['admin', 'jdoe']
        );
        const products = await queryRunner.query(
            'SELECT id, name, price FROM "products"'
        );

        const customer = users.find((u: any) => u.username === 'jdoe');
        const phone = products.find((p: any) => p.name === 'Smartphone X');
        const shoes = products.find((p: any) => p.name === 'Running Shoes');

        if (!customer || !phone || !shoes) {
            return;
        }

        const totalPrice = Number(phone.price) + Number(shoes.price);

        const [order] = await queryRunner.query(
            `
            INSERT INTO "orders" ("userId", "status", "totalPrice")
            VALUES ($1, 'pending', $2)
            RETURNING id
        `,
            [customer.id, totalPrice]
        );

        await queryRunner.query(
            `
            INSERT INTO "order_items" ("productId", "quantity", "priceAtPurchase", "orderId")
            VALUES
              ($1, 1, $2, $3),
              ($4, 1, $5, $3)
        `,
            [phone.id, phone.price, order.id, shoes.id, shoes.price]
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM "order_items"');
        await queryRunner.query('DELETE FROM "orders"');
        await queryRunner.query('DELETE FROM "products"');
        await queryRunner.query('DELETE FROM "users"');
    }
}
