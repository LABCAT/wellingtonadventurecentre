import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`_home_page_v_blocks_feature_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`heading\` text,
  	\`blurhash\` text,
  	\`heading_level\` text DEFAULT 'h2',
  	\`link\` text,
  	\`content\` text,
  	\`image_position\` text DEFAULT 'left',
  	\`vertical_image_position\` text DEFAULT 'center',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_page_v_blocks_feature_block_order_idx\` ON \`_home_page_v_blocks_feature_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_blocks_feature_block_parent_id_idx\` ON \`_home_page_v_blocks_feature_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_blocks_feature_block_path_idx\` ON \`_home_page_v_blocks_feature_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_blocks_feature_block_image_idx\` ON \`_home_page_v_blocks_feature_block\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v_blocks_tour_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`blurhash\` text,
  	\`heading\` text,
  	\`description\` text,
  	\`pricing_info\` text,
  	\`fareharbor_url\` text,
  	\`more_info_url\` text,
  	\`show_discounts\` integer DEFAULT false,
  	\`image_position\` text DEFAULT 'left',
  	\`vertical_image_position\` text DEFAULT 'center',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_page_v_blocks_tour_block_order_idx\` ON \`_home_page_v_blocks_tour_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_blocks_tour_block_parent_id_idx\` ON \`_home_page_v_blocks_tour_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_blocks_tour_block_path_idx\` ON \`_home_page_v_blocks_tour_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_blocks_tour_block_image_idx\` ON \`_home_page_v_blocks_tour_block\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v_blocks_video_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`youtube_id\` text,
  	\`poster_id\` integer,
  	\`blurhash\` text,
  	\`heading\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_page_v_blocks_video_block_order_idx\` ON \`_home_page_v_blocks_video_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_blocks_video_block_parent_id_idx\` ON \`_home_page_v_blocks_video_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_blocks_video_block_path_idx\` ON \`_home_page_v_blocks_video_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_blocks_video_block_poster_idx\` ON \`_home_page_v_blocks_video_block\` (\`poster_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_title\` text DEFAULT 'Wellington Adventure Centre',
  	\`version_tagline\` text DEFAULT 'Wellington Adventure Centre
  [tagline copy placeholder]',
  	\`version_meta_description\` text,
  	\`version_intro_title\` text,
  	\`version_intro\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_version__status_idx\` ON \`_home_page_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_created_at_idx\` ON \`_home_page_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_updated_at_idx\` ON \`_home_page_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_latest_idx\` ON \`_home_page_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_contact_us_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_title\` text DEFAULT 'Contact Us',
  	\`version_hero_image_id\` integer,
  	\`version_hero_image_mobile_position\` text DEFAULT 'center',
  	\`version_meta_description\` text,
  	\`version_email_address\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`version_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_contact_us_v_version_version_hero_image_idx\` ON \`_contact_us_v\` (\`version_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_contact_us_v_version_version__status_idx\` ON \`_contact_us_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_contact_us_v_created_at_idx\` ON \`_contact_us_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_contact_us_v_updated_at_idx\` ON \`_contact_us_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_contact_us_v_latest_idx\` ON \`_contact_us_v\` (\`latest\`);`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_home_page_blocks_feature_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`heading\` text,
  	\`blurhash\` text,
  	\`heading_level\` text DEFAULT 'h2',
  	\`link\` text,
  	\`content\` text,
  	\`image_position\` text DEFAULT 'left',
  	\`vertical_image_position\` text DEFAULT 'center',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_home_page_blocks_feature_block\`("_order", "_parent_id", "_path", "id", "image_id", "heading", "blurhash", "heading_level", "link", "content", "image_position", "vertical_image_position", "block_name") SELECT "_order", "_parent_id", "_path", "id", "image_id", "heading", "blurhash", "heading_level", "link", "content", "image_position", "vertical_image_position", "block_name" FROM \`home_page_blocks_feature_block\`;`)
  await db.run(sql`DROP TABLE \`home_page_blocks_feature_block\`;`)
  await db.run(sql`ALTER TABLE \`__new_home_page_blocks_feature_block\` RENAME TO \`home_page_blocks_feature_block\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_feature_block_order_idx\` ON \`home_page_blocks_feature_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_feature_block_parent_id_idx\` ON \`home_page_blocks_feature_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_feature_block_path_idx\` ON \`home_page_blocks_feature_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_feature_block_image_idx\` ON \`home_page_blocks_feature_block\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_home_page_blocks_tour_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`blurhash\` text,
  	\`heading\` text,
  	\`description\` text,
  	\`pricing_info\` text,
  	\`fareharbor_url\` text,
  	\`more_info_url\` text,
  	\`show_discounts\` integer DEFAULT false,
  	\`image_position\` text DEFAULT 'left',
  	\`vertical_image_position\` text DEFAULT 'center',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_home_page_blocks_tour_block\`("_order", "_parent_id", "_path", "id", "image_id", "blurhash", "heading", "description", "pricing_info", "fareharbor_url", "more_info_url", "show_discounts", "image_position", "vertical_image_position", "block_name") SELECT "_order", "_parent_id", "_path", "id", "image_id", "blurhash", "heading", "description", "pricing_info", "fareharbor_url", "more_info_url", "show_discounts", "image_position", "vertical_image_position", "block_name" FROM \`home_page_blocks_tour_block\`;`)
  await db.run(sql`DROP TABLE \`home_page_blocks_tour_block\`;`)
  await db.run(sql`ALTER TABLE \`__new_home_page_blocks_tour_block\` RENAME TO \`home_page_blocks_tour_block\`;`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_tour_block_order_idx\` ON \`home_page_blocks_tour_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_tour_block_parent_id_idx\` ON \`home_page_blocks_tour_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_tour_block_path_idx\` ON \`home_page_blocks_tour_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_tour_block_image_idx\` ON \`home_page_blocks_tour_block\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_home_page_blocks_video_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`youtube_id\` text,
  	\`poster_id\` integer,
  	\`blurhash\` text,
  	\`heading\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_home_page_blocks_video_block\`("_order", "_parent_id", "_path", "id", "youtube_id", "poster_id", "blurhash", "heading", "block_name") SELECT "_order", "_parent_id", "_path", "id", "youtube_id", "poster_id", "blurhash", "heading", "block_name" FROM \`home_page_blocks_video_block\`;`)
  await db.run(sql`DROP TABLE \`home_page_blocks_video_block\`;`)
  await db.run(sql`ALTER TABLE \`__new_home_page_blocks_video_block\` RENAME TO \`home_page_blocks_video_block\`;`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_video_block_order_idx\` ON \`home_page_blocks_video_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_video_block_parent_id_idx\` ON \`home_page_blocks_video_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_video_block_path_idx\` ON \`home_page_blocks_video_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_video_block_poster_idx\` ON \`home_page_blocks_video_block\` (\`poster_id\`);`)
  await db.run(sql`ALTER TABLE \`home_page\` ADD \`_status\` text DEFAULT 'draft';`)
  await db.run(sql`CREATE INDEX \`home_page__status_idx\` ON \`home_page\` (\`_status\`);`)
  await db.run(sql`ALTER TABLE \`contact_us\` ADD \`_status\` text DEFAULT 'draft';`)
  await db.run(sql`CREATE INDEX \`contact_us__status_idx\` ON \`contact_us\` (\`_status\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`_home_page_v_blocks_feature_block\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v_blocks_tour_block\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v_blocks_video_block\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v\`;`)
  await db.run(sql`DROP TABLE \`_contact_us_v\`;`)
  await db.run(sql`DROP INDEX \`home_page__status_idx\`;`)
  await db.run(sql`ALTER TABLE \`home_page\` DROP COLUMN \`_status\`;`)
  await db.run(sql`DROP INDEX \`contact_us__status_idx\`;`)
  await db.run(sql`ALTER TABLE \`contact_us\` DROP COLUMN \`_status\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_home_page_blocks_feature_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`heading\` text NOT NULL,
  	\`blurhash\` text,
  	\`heading_level\` text DEFAULT 'h2',
  	\`link\` text,
  	\`content\` text,
  	\`image_position\` text DEFAULT 'left',
  	\`vertical_image_position\` text DEFAULT 'center',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_home_page_blocks_feature_block\`("_order", "_parent_id", "_path", "id", "image_id", "heading", "blurhash", "heading_level", "link", "content", "image_position", "vertical_image_position", "block_name") SELECT "_order", "_parent_id", "_path", "id", "image_id", "heading", "blurhash", "heading_level", "link", "content", "image_position", "vertical_image_position", "block_name" FROM \`home_page_blocks_feature_block\`;`)
  await db.run(sql`DROP TABLE \`home_page_blocks_feature_block\`;`)
  await db.run(sql`ALTER TABLE \`__new_home_page_blocks_feature_block\` RENAME TO \`home_page_blocks_feature_block\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_feature_block_order_idx\` ON \`home_page_blocks_feature_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_feature_block_parent_id_idx\` ON \`home_page_blocks_feature_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_feature_block_path_idx\` ON \`home_page_blocks_feature_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_feature_block_image_idx\` ON \`home_page_blocks_feature_block\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_home_page_blocks_tour_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`blurhash\` text,
  	\`heading\` text NOT NULL,
  	\`description\` text,
  	\`pricing_info\` text,
  	\`fareharbor_url\` text,
  	\`more_info_url\` text,
  	\`show_discounts\` integer DEFAULT false,
  	\`image_position\` text DEFAULT 'left',
  	\`vertical_image_position\` text DEFAULT 'center',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_home_page_blocks_tour_block\`("_order", "_parent_id", "_path", "id", "image_id", "blurhash", "heading", "description", "pricing_info", "fareharbor_url", "more_info_url", "show_discounts", "image_position", "vertical_image_position", "block_name") SELECT "_order", "_parent_id", "_path", "id", "image_id", "blurhash", "heading", "description", "pricing_info", "fareharbor_url", "more_info_url", "show_discounts", "image_position", "vertical_image_position", "block_name" FROM \`home_page_blocks_tour_block\`;`)
  await db.run(sql`DROP TABLE \`home_page_blocks_tour_block\`;`)
  await db.run(sql`ALTER TABLE \`__new_home_page_blocks_tour_block\` RENAME TO \`home_page_blocks_tour_block\`;`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_tour_block_order_idx\` ON \`home_page_blocks_tour_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_tour_block_parent_id_idx\` ON \`home_page_blocks_tour_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_tour_block_path_idx\` ON \`home_page_blocks_tour_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_tour_block_image_idx\` ON \`home_page_blocks_tour_block\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_home_page_blocks_video_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`youtube_id\` text NOT NULL,
  	\`poster_id\` integer,
  	\`blurhash\` text,
  	\`heading\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_home_page_blocks_video_block\`("_order", "_parent_id", "_path", "id", "youtube_id", "poster_id", "blurhash", "heading", "block_name") SELECT "_order", "_parent_id", "_path", "id", "youtube_id", "poster_id", "blurhash", "heading", "block_name" FROM \`home_page_blocks_video_block\`;`)
  await db.run(sql`DROP TABLE \`home_page_blocks_video_block\`;`)
  await db.run(sql`ALTER TABLE \`__new_home_page_blocks_video_block\` RENAME TO \`home_page_blocks_video_block\`;`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_video_block_order_idx\` ON \`home_page_blocks_video_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_video_block_parent_id_idx\` ON \`home_page_blocks_video_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_video_block_path_idx\` ON \`home_page_blocks_video_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_video_block_poster_idx\` ON \`home_page_blocks_video_block\` (\`poster_id\`);`)
}
