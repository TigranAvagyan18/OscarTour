import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1778059902459 implements MigrationInterface {
    name = 'Init1778059902459'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "feedback" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "message" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_8389f9e087a57689cd5be8b2b13" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tour" ("id" SERIAL NOT NULL, "slug" character varying NOT NULL, "title" character varying NOT NULL, "short_description" text NOT NULL, "full_description" text NOT NULL, "category" character varying NOT NULL, "duration" character varying NOT NULL, "duration_hours" integer NOT NULL, "duration_days" integer, "price" numeric(10,2) NOT NULL, "price_note" character varying NOT NULL DEFAULT 'per person', "original_price" numeric(10,2), "image" character varying, "gallery" jsonb NOT NULL DEFAULT '[]', "rating" numeric(3,2) NOT NULL DEFAULT '0', "review_count" integer NOT NULL DEFAULT '0', "max_group_size" integer NOT NULL, "min_group_size" integer NOT NULL, "languages" jsonb NOT NULL DEFAULT '[]', "difficulty" character varying NOT NULL, "pickup_included" boolean NOT NULL DEFAULT false, "meeting_point" character varying, "region" character varying, "starting_point" character varying, "departures" jsonb NOT NULL DEFAULT '[]', "highlights" jsonb NOT NULL DEFAULT '[]', "included" jsonb NOT NULL DEFAULT '[]', "excluded" jsonb NOT NULL DEFAULT '[]', "itinerary" jsonb NOT NULL DEFAULT '[]', "faq" jsonb NOT NULL DEFAULT '[]', "tags" jsonb NOT NULL DEFAULT '[]', "badge" character varying, "is_published" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_977f1da07ba1cf4a613e1d3991d" UNIQUE ("slug"), CONSTRAINT "PK_972cd7fa4ec39286068130fa3f7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tour"`);
        await queryRunner.query(`DROP TABLE "feedback"`);
    }

}
