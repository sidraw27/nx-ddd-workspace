import { Migration } from '@mikro-orm/migrations';

export class Migration20230401000000 extends Migration {
  async up() {
    this.addSql(`
      CREATE SEQUENCE table_id_seq
      AS integer
      START WITH 1
      INCREMENT BY 1
      NO MINVALUE
      NO MAXVALUE
      CACHE 1;
    `);
    this.addSql(`
      CREATE OR REPLACE FUNCTION next_id(OUT result bigint) AS $$
      DECLARE
        our_epoch bigint := 1681976370000;
        seq_id bigint;
        now_millis bigint;
        shard_id int := 5;
      BEGIN
        SELECT nextval('table_id_seq') % 1024 INTO seq_id;
        SELECT FLOOR(EXTRACT(EPOCH FROM clock_timestamp()) * 1000) INTO now_millis;
        result := (now_millis - our_epoch) << 23;
        result := result | (shard_id <<10);
        result := result | (seq_id);
      END;  
      $$ LANGUAGE PLPGSQL;
    `);
  }

}
