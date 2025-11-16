import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1731624000000 implements MigrationInterface {
    name = 'InitialSchema1731624000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

        await queryRunner.query(
            "CREATE TYPE \"user_role_enum\" AS ENUM ('admin', 'user')"
        );
        await queryRunner.query(
            "CREATE TYPE \"product_category_enum\" AS ENUM ('electronics', 'fashion', 'home', 'beauty', 'sports', 'toys', 'books', 'groceries', 'automotive', 'pet_supplies', 'office', 'health')"
        );
        await queryRunner.query(
            "CREATE TYPE \"order_status_enum\" AS ENUM ('pending', 'confirmed', 'processing', 'shipped', 'out_for_delivery', 'delivered', 'cancelled', 'returned', 'refunded')"
        );
        await queryRunner.query(
            "CREATE TYPE \"report_type_enum\" AS ENUM ('pdf', 'excel')"
        );
        await queryRunner.query(
            "CREATE TYPE \"report_kind_enum\" AS ENUM ('revenue', 'most_bought_products')"
        );

        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "username" varchar(255) NOT NULL,
                "fullname" varchar(255) NOT NULL,
                "password" varchar(255) NOT NULL,
                "roles" "user_role_enum"[] NOT NULL DEFAULT ARRAY['user']::"user_role_enum"[]
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "products" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "name" varchar(255) NOT NULL,
                "category" "product_category_enum" NOT NULL,
                "image" varchar(255) NOT NULL,
                "price" numeric NOT NULL,
                "description" text NOT NULL
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "orders" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "userId" uuid NOT NULL,
                "status" "order_status_enum" NOT NULL DEFAULT 'pending',
                "totalPrice" numeric NOT NULL,
                "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "order_items" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "productId" uuid NOT NULL,
                "quantity" integer NOT NULL,
                "priceAtPurchase" numeric NOT NULL,
                "orderId" uuid NOT NULL
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "reports" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "filename" varchar(255) NOT NULL,
                "type" "report_type_enum" NOT NULL,
                "reportKind" "report_kind_enum" NOT NULL,
                "data" bytea NOT NULL,
                "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
            )
        `);

        await queryRunner.query(`
            ALTER TABLE "orders"
            ADD CONSTRAINT "FK_orders_user"
            FOREIGN KEY ("userId") REFERENCES "users"("id")
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "order_items"
            ADD CONSTRAINT "FK_order_items_product"
            FOREIGN KEY ("productId") REFERENCES "products"("id")
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "order_items"
            ADD CONSTRAINT "FK_order_items_order"
            FOREIGN KEY ("orderId") REFERENCES "orders"("id")
            ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE "order_items" DROP CONSTRAINT "FK_order_items_order"'
        );
        await queryRunner.query(
            'ALTER TABLE "order_items" DROP CONSTRAINT "FK_order_items_product"'
        );
        await queryRunner.query(
            'ALTER TABLE "orders" DROP CONSTRAINT "FK_orders_user"'
        );

        await queryRunner.query('DROP TABLE "order_items"');
        await queryRunner.query('DROP TABLE "orders"');
        await queryRunner.query('DROP TABLE "products"');
        await queryRunner.query('DROP TABLE "users"');
        await queryRunner.query('DROP TABLE "reports"');

        await queryRunner.query('DROP TYPE "order_status_enum"');
        await queryRunner.query('DROP TYPE "product_category_enum"');
        await queryRunner.query('DROP TYPE "user_role_enum"');
        await queryRunner.query('DROP TYPE "report_type_enum"');
        await queryRunner.query('DROP TYPE "report_kind_enum"');
    }
}
