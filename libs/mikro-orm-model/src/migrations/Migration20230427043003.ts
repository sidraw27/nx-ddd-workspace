import { Migration } from '@mikro-orm/migrations';

export class Migration20230427043003 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "booking_chat_messages" drop constraint "booking_chat_messages_booking_id_foreign";');

    this.addSql('alter table "booking_details" drop constraint "booking_details_booking_id_foreign";');

    this.addSql('alter table "driver_cars" drop constraint "driver_cars_model_id_foreign";');

    this.addSql('alter table "bookings" drop constraint "bookings_driver_id_foreign";');

    this.addSql('alter table "driver_cars" drop constraint "driver_cars_driver_id_foreign";');

    this.addSql('create table "orders" ("id" bigint not null default NEXT_ID(), "user_id" bigint not null, "amount" numeric(10,0) not null, "serial_no" varchar(255) not null, "status" smallint not null default 0, "note" varchar(255) null, "created_at" varchar(255) not null, "updated_at" varchar(255) not null, constraint "orders_pkey" primary key ("id"));');
    this.addSql('create index "orders_status_index" on "orders" ("status");');

    this.addSql('create table "order_details" ("id" bigint not null default NEXT_ID(), "order_id" bigint not null, "quantity" smallint not null, "created_at" varchar(255) not null, constraint "order_details_pkey" primary key ("id"));');

    this.addSql('alter table "orders" add constraint "orders_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');

    this.addSql('alter table "order_details" add constraint "order_details_order_id_foreign" foreign key ("order_id") references "orders" ("id") on update cascade;');

    this.addSql('drop table if exists "booking_chat_messages" cascade;');

    this.addSql('drop table if exists "booking_details" cascade;');

    this.addSql('drop table if exists "bookings" cascade;');

    this.addSql('drop table if exists "car_models" cascade;');

    this.addSql('drop table if exists "driver_cars" cascade;');

    this.addSql('drop table if exists "drivers" cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "order_details" drop constraint "order_details_order_id_foreign";');

    this.addSql('create table "booking_chat_messages" ("id" int8 not null default next_id(), "booking_id" int8 not null default null, "message" varchar not null default null, "is_message" bool not null default true, "created_at" timestamptz not null default null, "updated_at" timestamptz not null default null, constraint "booking_chat_messages_pkey" primary key ("id"));');

    this.addSql('create table "booking_details" ("id" int8 not null default next_id(), "booking_id" int8 not null default null, "capacity" int2 not null default null, "riding_at" timestamptz not null default null, "origin" point not null default null, "destination" point not null default null, "is_paid" varchar not null default false, "created_at" varchar not null default null, constraint "booking_details_pkey" primary key ("id"));');

    this.addSql('create table "bookings" ("id" int8 not null default next_id(), "user_id" int8 not null default null, "driver_id" int8 null default null, "amount" numeric not null default null, "serial_no" varchar not null default null, "status" int2 not null default 0, "note" varchar null default null, "invoice_number" varchar null default null, "invoice_type" int2 null default null, "invoice_donate_code" varchar null default null, "invoice_status" int2 not null default null, "created_at" varchar not null default null, "updated_at" varchar not null default null, constraint "bookings_pkey" primary key ("id"));');
    this.addSql('create index "bookings_status_index" on "bookings" ("status");');

    this.addSql('create table "car_models" ("id" int8 not null default next_id(), "brand" varchar not null default null, "model" varchar not null default null, "capacity" int2 not null default null, "created_at" varchar not null default null, "updated_at" varchar not null default null, "deleted_at" timestamptz null default null, constraint "car_models_pkey" primary key ("id"));');

    this.addSql('create table "driver_cars" ("id" int8 not null default next_id(), "driver_id" int8 not null default null, "model_id" int8 not null default null, "license_plate" varchar not null default null, "color" int2 not null default null, "year" int2 not null default null, "created_at" varchar not null default null, "updated_at" varchar not null default null, "deleted_at" timestamptz null default null, constraint "driver_cars_pkey" primary key ("id"));');

    this.addSql('create table "drivers" ("id" int8 not null default next_id(), "created_at" varchar not null default null, "updated_at" varchar not null default null, "deleted_at" timestamptz null default null, constraint "drivers_pkey" primary key ("id"));');

    this.addSql('alter table "booking_chat_messages" add constraint "booking_chat_messages_booking_id_foreign" foreign key ("booking_id") references "bookings" ("id") on update cascade on delete no action;');

    this.addSql('alter table "booking_details" add constraint "booking_details_booking_id_foreign" foreign key ("booking_id") references "bookings" ("id") on update cascade on delete no action;');

    this.addSql('alter table "bookings" add constraint "bookings_driver_id_foreign" foreign key ("driver_id") references "drivers" ("id") on update cascade on delete set null;');
    this.addSql('alter table "bookings" add constraint "bookings_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete no action;');

    this.addSql('alter table "driver_cars" add constraint "driver_cars_driver_id_foreign" foreign key ("driver_id") references "drivers" ("id") on update cascade on delete no action;');
    this.addSql('alter table "driver_cars" add constraint "driver_cars_model_id_foreign" foreign key ("model_id") references "car_models" ("id") on update cascade on delete no action;');

    this.addSql('drop table if exists "orders" cascade;');

    this.addSql('drop table if exists "order_details" cascade;');
  }

}
