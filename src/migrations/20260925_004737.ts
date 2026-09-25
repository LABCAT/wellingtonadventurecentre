import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`home_page_blocks_feature_block\` (
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
  await db.run(sql`CREATE INDEX \`home_page_blocks_feature_block_order_idx\` ON \`home_page_blocks_feature_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_feature_block_parent_id_idx\` ON \`home_page_blocks_feature_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_feature_block_path_idx\` ON \`home_page_blocks_feature_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_feature_block_image_idx\` ON \`home_page_blocks_feature_block\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_blocks_tour_block\` (
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
  await db.run(sql`CREATE INDEX \`home_page_blocks_tour_block_order_idx\` ON \`home_page_blocks_tour_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_tour_block_parent_id_idx\` ON \`home_page_blocks_tour_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_tour_block_path_idx\` ON \`home_page_blocks_tour_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_tour_block_image_idx\` ON \`home_page_blocks_tour_block\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'Wellington Adventure Centre',
  	\`tagline\` text DEFAULT 'Wellington Adventure Centre
  [tagline copy placeholder]',
  	\`meta_description\` text,
  	\`intro_title\` text,
  	\`intro\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`ALTER TABLE \`media\` ADD \`blurhash\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`home_page_blocks_feature_block\`;`)
  await db.run(sql`DROP TABLE \`home_page_blocks_tour_block\`;`)
  await db.run(sql`DROP TABLE \`home_page\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`blurhash\`;`)
}
