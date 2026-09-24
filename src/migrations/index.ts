import * as migration_20260918_151419_initial from './20260918_151419_initial';
import * as migration_20260924_064051 from './20260924_064051';

export const migrations = [
  {
    up: migration_20260918_151419_initial.up,
    down: migration_20260918_151419_initial.down,
    name: '20260918_151419_initial',
  },
  {
    up: migration_20260924_064051.up,
    down: migration_20260924_064051.down,
    name: '20260924_064051'
  },
];
