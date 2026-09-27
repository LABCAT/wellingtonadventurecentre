import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_feature_block\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_block_order_idx\` ON \`pages_blocks_feature_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_block_parent_id_idx\` ON \`pages_blocks_feature_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_block_path_idx\` ON \`pages_blocks_feature_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_block_image_idx\` ON \`pages_blocks_feature_block\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_tour_block\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_tour_block_order_idx\` ON \`pages_blocks_tour_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_tour_block_parent_id_idx\` ON \`pages_blocks_tour_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_tour_block_path_idx\` ON \`pages_blocks_tour_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_tour_block_image_idx\` ON \`pages_blocks_tour_block\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_video_block\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_video_block_order_idx\` ON \`pages_blocks_video_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_video_block_parent_id_idx\` ON \`pages_blocks_video_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_video_block_path_idx\` ON \`pages_blocks_video_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_video_block_poster_idx\` ON \`pages_blocks_video_block\` (\`poster_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_breadcrumbs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`doc_id\` integer,
  	\`url\` text,
  	\`label\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_breadcrumbs_order_idx\` ON \`pages_breadcrumbs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_breadcrumbs_parent_id_idx\` ON \`pages_breadcrumbs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_breadcrumbs_doc_idx\` ON \`pages_breadcrumbs\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE \`pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text,
  	\`hero_image_id\` integer,
  	\`hero_image_mobile_position\` text DEFAULT 'center',
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`intro_title\` text,
  	\`intro\` text,
  	\`parent_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_hero_image_idx\` ON \`pages\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_parent_idx\` ON \`pages\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`pages__status_idx\` ON \`pages\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_feature_block\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_feature_block_order_idx\` ON \`_pages_v_blocks_feature_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_feature_block_parent_id_idx\` ON \`_pages_v_blocks_feature_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_feature_block_path_idx\` ON \`_pages_v_blocks_feature_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_feature_block_image_idx\` ON \`_pages_v_blocks_feature_block\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_tour_block\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_tour_block_order_idx\` ON \`_pages_v_blocks_tour_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_tour_block_parent_id_idx\` ON \`_pages_v_blocks_tour_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_tour_block_path_idx\` ON \`_pages_v_blocks_tour_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_tour_block_image_idx\` ON \`_pages_v_blocks_tour_block\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_video_block\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_video_block_order_idx\` ON \`_pages_v_blocks_video_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_video_block_parent_id_idx\` ON \`_pages_v_blocks_video_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_video_block_path_idx\` ON \`_pages_v_blocks_video_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_video_block_poster_idx\` ON \`_pages_v_blocks_video_block\` (\`poster_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_version_breadcrumbs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`doc_id\` integer,
  	\`url\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_version_breadcrumbs_order_idx\` ON \`_pages_v_version_breadcrumbs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_breadcrumbs_parent_id_idx\` ON \`_pages_v_version_breadcrumbs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_breadcrumbs_doc_idx\` ON \`_pages_v_version_breadcrumbs\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_generate_slug\` integer DEFAULT true,
  	\`version_slug\` text,
  	\`version_hero_image_id\` integer,
  	\`version_hero_image_mobile_position\` text DEFAULT 'center',
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`version_intro_title\` text,
  	\`version_intro\` text,
  	\`version_parent_id\` integer,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_parent_idx\` ON \`_pages_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_slug_idx\` ON \`_pages_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_hero_image_idx\` ON \`_pages_v\` (\`version_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_parent_idx\` ON \`_pages_v\` (\`version_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_updated_at_idx\` ON \`_pages_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_created_at_idx\` ON \`_pages_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version__status_idx\` ON \`_pages_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_created_at_idx\` ON \`_pages_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_updated_at_idx\` ON \`_pages_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_latest_idx\` ON \`_pages_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`tour_blocks_feature_block\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`tour\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`tour_blocks_feature_block_order_idx\` ON \`tour_blocks_feature_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`tour_blocks_feature_block_parent_id_idx\` ON \`tour_blocks_feature_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`tour_blocks_feature_block_path_idx\` ON \`tour_blocks_feature_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`tour_blocks_feature_block_image_idx\` ON \`tour_blocks_feature_block\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`tour_blocks_tour_block\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`tour\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`tour_blocks_tour_block_order_idx\` ON \`tour_blocks_tour_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`tour_blocks_tour_block_parent_id_idx\` ON \`tour_blocks_tour_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`tour_blocks_tour_block_path_idx\` ON \`tour_blocks_tour_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`tour_blocks_tour_block_image_idx\` ON \`tour_blocks_tour_block\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`tour_blocks_video_block\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`tour\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`tour_blocks_video_block_order_idx\` ON \`tour_blocks_video_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`tour_blocks_video_block_parent_id_idx\` ON \`tour_blocks_video_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`tour_blocks_video_block_path_idx\` ON \`tour_blocks_video_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`tour_blocks_video_block_poster_idx\` ON \`tour_blocks_video_block\` (\`poster_id\`);`)
  await db.run(sql`CREATE TABLE \`tour\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text,
  	\`hero_image_id\` integer,
  	\`hero_image_mobile_position\` text DEFAULT 'center',
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`intro_title\` text,
  	\`intro\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`tour_slug_idx\` ON \`tour\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`tour_hero_image_idx\` ON \`tour\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`tour_updated_at_idx\` ON \`tour\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`tour_created_at_idx\` ON \`tour\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`tour__status_idx\` ON \`tour\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_tour_v_blocks_feature_block\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_tour_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_tour_v_blocks_feature_block_order_idx\` ON \`_tour_v_blocks_feature_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_tour_v_blocks_feature_block_parent_id_idx\` ON \`_tour_v_blocks_feature_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_tour_v_blocks_feature_block_path_idx\` ON \`_tour_v_blocks_feature_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_tour_v_blocks_feature_block_image_idx\` ON \`_tour_v_blocks_feature_block\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_tour_v_blocks_tour_block\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_tour_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_tour_v_blocks_tour_block_order_idx\` ON \`_tour_v_blocks_tour_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_tour_v_blocks_tour_block_parent_id_idx\` ON \`_tour_v_blocks_tour_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_tour_v_blocks_tour_block_path_idx\` ON \`_tour_v_blocks_tour_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_tour_v_blocks_tour_block_image_idx\` ON \`_tour_v_blocks_tour_block\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_tour_v_blocks_video_block\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_tour_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_tour_v_blocks_video_block_order_idx\` ON \`_tour_v_blocks_video_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_tour_v_blocks_video_block_parent_id_idx\` ON \`_tour_v_blocks_video_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_tour_v_blocks_video_block_path_idx\` ON \`_tour_v_blocks_video_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_tour_v_blocks_video_block_poster_idx\` ON \`_tour_v_blocks_video_block\` (\`poster_id\`);`)
  await db.run(sql`CREATE TABLE \`_tour_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_generate_slug\` integer DEFAULT true,
  	\`version_slug\` text,
  	\`version_hero_image_id\` integer,
  	\`version_hero_image_mobile_position\` text DEFAULT 'center',
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`version_intro_title\` text,
  	\`version_intro\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`tour\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_tour_v_parent_idx\` ON \`_tour_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_tour_v_version_version_slug_idx\` ON \`_tour_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_tour_v_version_version_hero_image_idx\` ON \`_tour_v\` (\`version_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_tour_v_version_version_updated_at_idx\` ON \`_tour_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_tour_v_version_version_created_at_idx\` ON \`_tour_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_tour_v_version_version__status_idx\` ON \`_tour_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_tour_v_created_at_idx\` ON \`_tour_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_tour_v_updated_at_idx\` ON \`_tour_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_tour_v_latest_idx\` ON \`_tour_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`promo_blocks_feature_block\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`promo\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`promo_blocks_feature_block_order_idx\` ON \`promo_blocks_feature_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`promo_blocks_feature_block_parent_id_idx\` ON \`promo_blocks_feature_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`promo_blocks_feature_block_path_idx\` ON \`promo_blocks_feature_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`promo_blocks_feature_block_image_idx\` ON \`promo_blocks_feature_block\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`promo_blocks_tour_block\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`promo\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`promo_blocks_tour_block_order_idx\` ON \`promo_blocks_tour_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`promo_blocks_tour_block_parent_id_idx\` ON \`promo_blocks_tour_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`promo_blocks_tour_block_path_idx\` ON \`promo_blocks_tour_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`promo_blocks_tour_block_image_idx\` ON \`promo_blocks_tour_block\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`promo_blocks_video_block\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`promo\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`promo_blocks_video_block_order_idx\` ON \`promo_blocks_video_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`promo_blocks_video_block_parent_id_idx\` ON \`promo_blocks_video_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`promo_blocks_video_block_path_idx\` ON \`promo_blocks_video_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`promo_blocks_video_block_poster_idx\` ON \`promo_blocks_video_block\` (\`poster_id\`);`)
  await db.run(sql`CREATE TABLE \`promo\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text,
  	\`hero_image_id\` integer,
  	\`hero_image_mobile_position\` text DEFAULT 'center',
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`intro_title\` text,
  	\`intro\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`promo_slug_idx\` ON \`promo\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`promo_hero_image_idx\` ON \`promo\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`promo_updated_at_idx\` ON \`promo\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`promo_created_at_idx\` ON \`promo\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`promo__status_idx\` ON \`promo\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_promo_v_blocks_feature_block\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_promo_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_promo_v_blocks_feature_block_order_idx\` ON \`_promo_v_blocks_feature_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_promo_v_blocks_feature_block_parent_id_idx\` ON \`_promo_v_blocks_feature_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_promo_v_blocks_feature_block_path_idx\` ON \`_promo_v_blocks_feature_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_promo_v_blocks_feature_block_image_idx\` ON \`_promo_v_blocks_feature_block\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_promo_v_blocks_tour_block\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_promo_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_promo_v_blocks_tour_block_order_idx\` ON \`_promo_v_blocks_tour_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_promo_v_blocks_tour_block_parent_id_idx\` ON \`_promo_v_blocks_tour_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_promo_v_blocks_tour_block_path_idx\` ON \`_promo_v_blocks_tour_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_promo_v_blocks_tour_block_image_idx\` ON \`_promo_v_blocks_tour_block\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_promo_v_blocks_video_block\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_promo_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_promo_v_blocks_video_block_order_idx\` ON \`_promo_v_blocks_video_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_promo_v_blocks_video_block_parent_id_idx\` ON \`_promo_v_blocks_video_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_promo_v_blocks_video_block_path_idx\` ON \`_promo_v_blocks_video_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_promo_v_blocks_video_block_poster_idx\` ON \`_promo_v_blocks_video_block\` (\`poster_id\`);`)
  await db.run(sql`CREATE TABLE \`_promo_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_generate_slug\` integer DEFAULT true,
  	\`version_slug\` text,
  	\`version_hero_image_id\` integer,
  	\`version_hero_image_mobile_position\` text DEFAULT 'center',
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`version_intro_title\` text,
  	\`version_intro\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`promo\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_promo_v_parent_idx\` ON \`_promo_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_promo_v_version_version_slug_idx\` ON \`_promo_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_promo_v_version_version_hero_image_idx\` ON \`_promo_v\` (\`version_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_promo_v_version_version_updated_at_idx\` ON \`_promo_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_promo_v_version_version_created_at_idx\` ON \`_promo_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_promo_v_version_version__status_idx\` ON \`_promo_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_promo_v_created_at_idx\` ON \`_promo_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_promo_v_updated_at_idx\` ON \`_promo_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_promo_v_latest_idx\` ON \`_promo_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`booking_enquiry\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`email\` text NOT NULL,
  	\`phone_number\` text NOT NULL,
  	\`tour_type\` text,
  	\`date\` text,
  	\`number_of_people\` numeric,
  	\`additional_info\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`booking_enquiry_updated_at_idx\` ON \`booking_enquiry\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`booking_enquiry_created_at_idx\` ON \`booking_enquiry\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`home_page_blocks_video_block\` (
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
  await db.run(sql`CREATE INDEX \`home_page_blocks_video_block_order_idx\` ON \`home_page_blocks_video_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_video_block_parent_id_idx\` ON \`home_page_blocks_video_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_video_block_path_idx\` ON \`home_page_blocks_video_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_video_block_poster_idx\` ON \`home_page_blocks_video_block\` (\`poster_id\`);`)
  await db.run(sql`CREATE TABLE \`contact_us\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'Contact Us',
  	\`hero_image_id\` integer,
  	\`hero_image_mobile_position\` text DEFAULT 'center',
  	\`meta_description\` text,
  	\`email_address\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`contact_us_hero_image_idx\` ON \`contact_us\` (\`hero_image_id\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`pages_id\` integer REFERENCES pages(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`tour_id\` integer REFERENCES tour(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`promo_id\` integer REFERENCES promo(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`booking_enquiry_id\` integer REFERENCES booking_enquiry(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_tour_id_idx\` ON \`payload_locked_documents_rels\` (\`tour_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_promo_id_idx\` ON \`payload_locked_documents_rels\` (\`promo_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_booking_enquiry_id_idx\` ON \`payload_locked_documents_rels\` (\`booking_enquiry_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_feature_block\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_tour_block\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_video_block\`;`)
  await db.run(sql`DROP TABLE \`pages_breadcrumbs\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_feature_block\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_tour_block\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_video_block\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_version_breadcrumbs\`;`)
  await db.run(sql`DROP TABLE \`_pages_v\`;`)
  await db.run(sql`DROP TABLE \`tour_blocks_feature_block\`;`)
  await db.run(sql`DROP TABLE \`tour_blocks_tour_block\`;`)
  await db.run(sql`DROP TABLE \`tour_blocks_video_block\`;`)
  await db.run(sql`DROP TABLE \`tour\`;`)
  await db.run(sql`DROP TABLE \`_tour_v_blocks_feature_block\`;`)
  await db.run(sql`DROP TABLE \`_tour_v_blocks_tour_block\`;`)
  await db.run(sql`DROP TABLE \`_tour_v_blocks_video_block\`;`)
  await db.run(sql`DROP TABLE \`_tour_v\`;`)
  await db.run(sql`DROP TABLE \`promo_blocks_feature_block\`;`)
  await db.run(sql`DROP TABLE \`promo_blocks_tour_block\`;`)
  await db.run(sql`DROP TABLE \`promo_blocks_video_block\`;`)
  await db.run(sql`DROP TABLE \`promo\`;`)
  await db.run(sql`DROP TABLE \`_promo_v_blocks_feature_block\`;`)
  await db.run(sql`DROP TABLE \`_promo_v_blocks_tour_block\`;`)
  await db.run(sql`DROP TABLE \`_promo_v_blocks_video_block\`;`)
  await db.run(sql`DROP TABLE \`_promo_v\`;`)
  await db.run(sql`DROP TABLE \`booking_enquiry\`;`)
  await db.run(sql`DROP TABLE \`home_page_blocks_video_block\`;`)
  await db.run(sql`DROP TABLE \`contact_us\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
}
