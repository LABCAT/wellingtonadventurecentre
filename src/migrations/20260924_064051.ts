import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`page_intro\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`content\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`page_intro_updated_at_idx\` ON \`page_intro\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`page_intro_created_at_idx\` ON \`page_intro\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`tour_pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text NOT NULL,
  	\`hero_image\` text,
  	\`hero_image_mobile_background_position\` text DEFAULT 'center',
  	\`meta_description\` text,
  	\`intro_id\` integer,
  	\`youtube_video_youtube_id\` text,
  	\`youtube_video_video_cover\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`intro_id\`) REFERENCES \`page_intro\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`tour_pages_slug_idx\` ON \`tour_pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`tour_pages_intro_idx\` ON \`tour_pages\` (\`intro_id\`);`)
  await db.run(sql`CREATE INDEX \`tour_pages_updated_at_idx\` ON \`tour_pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`tour_pages_created_at_idx\` ON \`tour_pages\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`tour_pages_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`tour_products_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`tour_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tour_products_id\`) REFERENCES \`tour_products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`tour_pages_rels_order_idx\` ON \`tour_pages_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`tour_pages_rels_parent_idx\` ON \`tour_pages_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`tour_pages_rels_path_idx\` ON \`tour_pages_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`tour_pages_rels_tour_products_id_idx\` ON \`tour_pages_rels\` (\`tour_products_id\`);`)
  await db.run(sql`CREATE TABLE \`tour_products\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`hero_image\` text,
  	\`hero_image_blur_hash\` text,
  	\`image_alignment\` text DEFAULT 'left',
  	\`vertical_image_alignment\` text DEFAULT 'center',
  	\`description\` text,
  	\`pricing_info\` text,
  	\`fareharbour_url\` text,
  	\`show_discounts\` integer DEFAULT false,
  	\`sort\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`tour_products_updated_at_idx\` ON \`tour_products\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`tour_products_created_at_idx\` ON \`tour_products\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`promo_pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text NOT NULL,
  	\`hero_image\` text,
  	\`hero_image_blur_hash\` text,
  	\`hero_image_mobile_background_position\` text DEFAULT 'center',
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`intro_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`intro_id\`) REFERENCES \`page_intro\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`promo_pages_slug_idx\` ON \`promo_pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`promo_pages_intro_idx\` ON \`promo_pages\` (\`intro_id\`);`)
  await db.run(sql`CREATE INDEX \`promo_pages_updated_at_idx\` ON \`promo_pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`promo_pages_created_at_idx\` ON \`promo_pages\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`promo_pages_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`content_panels_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`promo_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`content_panels_id\`) REFERENCES \`content_panels\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`promo_pages_rels_order_idx\` ON \`promo_pages_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`promo_pages_rels_parent_idx\` ON \`promo_pages_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`promo_pages_rels_path_idx\` ON \`promo_pages_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`promo_pages_rels_content_panels_id_idx\` ON \`promo_pages_rels\` (\`content_panels_id\`);`)
  await db.run(sql`CREATE TABLE \`event_pages_breadcrumbs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`doc_id\` integer,
  	\`url\` text,
  	\`label\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`event_pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`event_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`event_pages_breadcrumbs_order_idx\` ON \`event_pages_breadcrumbs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`event_pages_breadcrumbs_parent_id_idx\` ON \`event_pages_breadcrumbs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`event_pages_breadcrumbs_doc_idx\` ON \`event_pages_breadcrumbs\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE \`event_pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text NOT NULL,
  	\`hero_image\` text,
  	\`hero_image_blur_hash\` text,
  	\`hero_image_mobile_background_position\` text DEFAULT 'center',
  	\`meta_description\` text,
  	\`intro_id\` integer,
  	\`youtube_video_youtube_id\` text,
  	\`youtube_video_video_cover\` text,
  	\`parent_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`intro_id\`) REFERENCES \`page_intro\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`event_pages\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`event_pages_slug_idx\` ON \`event_pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`event_pages_intro_idx\` ON \`event_pages\` (\`intro_id\`);`)
  await db.run(sql`CREATE INDEX \`event_pages_parent_idx\` ON \`event_pages\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`event_pages_updated_at_idx\` ON \`event_pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`event_pages_created_at_idx\` ON \`event_pages\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`event_pages_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`content_panels_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`event_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`content_panels_id\`) REFERENCES \`content_panels\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`event_pages_rels_order_idx\` ON \`event_pages_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`event_pages_rels_parent_idx\` ON \`event_pages_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`event_pages_rels_path_idx\` ON \`event_pages_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`event_pages_rels_content_panels_id_idx\` ON \`event_pages_rels\` (\`content_panels_id\`);`)
  await db.run(sql`CREATE TABLE \`content_panels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`hero_image\` text,
  	\`hero_image_blur_hash\` text,
  	\`image_alignment\` text DEFAULT 'left',
  	\`vertical_image_alignment\` text DEFAULT 'center',
  	\`description\` text,
  	\`sort\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`content_panels_updated_at_idx\` ON \`content_panels\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`content_panels_created_at_idx\` ON \`content_panels\` (\`created_at\`);`)
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
  await db.run(sql`CREATE TABLE \`adventure_promo_tours\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link\` text,
  	\`heading\` text,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`adventure_promo\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`adventure_promo_tours_order_idx\` ON \`adventure_promo_tours\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`adventure_promo_tours_parent_id_idx\` ON \`adventure_promo_tours\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`adventure_promo\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`style\` text DEFAULT 'left',
  	\`intro\` text,
  	\`hero_image\` text,
  	\`sidekick_image\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`adventure_promo_updated_at_idx\` ON \`adventure_promo\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`adventure_promo_created_at_idx\` ON \`adventure_promo\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`home_page_blocks_feature_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`heading\` text NOT NULL,
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
  await db.run(sql`CREATE TABLE \`home_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'Wellington Rafting',
  	\`meta_description\` text,
  	\`intro_id\` integer,
  	\`show_adventure_promos\` integer DEFAULT true,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`intro_id\`) REFERENCES \`page_intro\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_intro_idx\` ON \`home_page\` (\`intro_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`adventure_promo_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`adventure_promo_id\`) REFERENCES \`adventure_promo\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_rels_order_idx\` ON \`home_page_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_rels_parent_idx\` ON \`home_page_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_rels_path_idx\` ON \`home_page_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`home_page_rels_adventure_promo_id_idx\` ON \`home_page_rels\` (\`adventure_promo_id\`);`)
  await db.run(sql`CREATE TABLE \`about_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'About Us',
  	\`hero_image\` text,
  	\`hero_image_mobile_background_position\` text DEFAULT 'center',
  	\`meta_description\` text,
  	\`intro_id\` integer,
  	\`youtube_video_youtube_id\` text,
  	\`youtube_video_video_cover\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`intro_id\`) REFERENCES \`page_intro\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`about_page_intro_idx\` ON \`about_page\` (\`intro_id\`);`)
  await db.run(sql`CREATE TABLE \`risk_disclosure_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'Risk Disclosure',
  	\`hero_image\` text,
  	\`hero_image_mobile_background_position\` text DEFAULT 'center',
  	\`meta_description\` text,
  	\`intro_id\` integer,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`intro_id\`) REFERENCES \`page_intro\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`risk_disclosure_page_intro_idx\` ON \`risk_disclosure_page\` (\`intro_id\`);`)
  await db.run(sql`CREATE TABLE \`contact_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'Contact Us',
  	\`hero_image\` text,
  	\`hero_image_mobile_background_position\` text DEFAULT 'center',
  	\`meta_description\` text,
  	\`email_address\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`page_intro_id\` integer REFERENCES page_intro(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`tour_pages_id\` integer REFERENCES tour_pages(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`tour_products_id\` integer REFERENCES tour_products(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`promo_pages_id\` integer REFERENCES promo_pages(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`event_pages_id\` integer REFERENCES event_pages(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`content_panels_id\` integer REFERENCES content_panels(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`booking_enquiry_id\` integer REFERENCES booking_enquiry(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`adventure_promo_id\` integer REFERENCES adventure_promo(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_page_intro_id_idx\` ON \`payload_locked_documents_rels\` (\`page_intro_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_tour_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`tour_pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_tour_products_id_idx\` ON \`payload_locked_documents_rels\` (\`tour_products_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_promo_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`promo_pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_event_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`event_pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_content_panels_id_idx\` ON \`payload_locked_documents_rels\` (\`content_panels_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_booking_enquiry_id_idx\` ON \`payload_locked_documents_rels\` (\`booking_enquiry_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_adventure_promo_id_idx\` ON \`payload_locked_documents_rels\` (\`adventure_promo_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`page_intro\`;`)
  await db.run(sql`DROP TABLE \`tour_pages\`;`)
  await db.run(sql`DROP TABLE \`tour_pages_rels\`;`)
  await db.run(sql`DROP TABLE \`tour_products\`;`)
  await db.run(sql`DROP TABLE \`promo_pages\`;`)
  await db.run(sql`DROP TABLE \`promo_pages_rels\`;`)
  await db.run(sql`DROP TABLE \`event_pages_breadcrumbs\`;`)
  await db.run(sql`DROP TABLE \`event_pages\`;`)
  await db.run(sql`DROP TABLE \`event_pages_rels\`;`)
  await db.run(sql`DROP TABLE \`content_panels\`;`)
  await db.run(sql`DROP TABLE \`booking_enquiry\`;`)
  await db.run(sql`DROP TABLE \`adventure_promo_tours\`;`)
  await db.run(sql`DROP TABLE \`adventure_promo\`;`)
  await db.run(sql`DROP TABLE \`home_page_blocks_feature_block\`;`)
  await db.run(sql`DROP TABLE \`home_page\`;`)
  await db.run(sql`DROP TABLE \`home_page_rels\`;`)
  await db.run(sql`DROP TABLE \`about_page\`;`)
  await db.run(sql`DROP TABLE \`risk_disclosure_page\`;`)
  await db.run(sql`DROP TABLE \`contact_page\`;`)
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
