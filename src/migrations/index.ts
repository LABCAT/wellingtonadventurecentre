import * as migration_20260918_151419_initial from './20260918_151419_initial';
import * as migration_20260925_004737 from './20260925_004737';

export const migrations = [
  {
    up: migration_20260918_151419_initial.up,
    down: migration_20260918_151419_initial.down,
    name: '20260918_151419_initial',
  },
  {
    up: migration_20260925_004737.up,
    down: migration_20260925_004737.down,
    name: '20260925_004737'
  },
];
