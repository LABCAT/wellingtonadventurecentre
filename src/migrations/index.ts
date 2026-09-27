import * as migration_20260918_151419_initial from './20260918_151419_initial';
import * as migration_20260925_004737 from './20260925_004737';
import * as migration_20260927_002439_content_model_expansion from './20260927_002439_content_model_expansion';
import * as migration_20260927_011513_live_preview_global_versions from './20260927_011513_live_preview_global_versions';

export const migrations = [
  {
    up: migration_20260918_151419_initial.up,
    down: migration_20260918_151419_initial.down,
    name: '20260918_151419_initial',
  },
  {
    up: migration_20260925_004737.up,
    down: migration_20260925_004737.down,
    name: '20260925_004737',
  },
  {
    up: migration_20260927_002439_content_model_expansion.up,
    down: migration_20260927_002439_content_model_expansion.down,
    name: '20260927_002439_content_model_expansion',
  },
  {
    up: migration_20260927_011513_live_preview_global_versions.up,
    down: migration_20260927_011513_live_preview_global_versions.down,
    name: '20260927_011513_live_preview_global_versions'
  },
];
