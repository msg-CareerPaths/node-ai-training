import { InitialSchema1731624000000 } from './1731624000000-InitialSchema';
import { SeedMockData1731624001000 } from './1731624001000-SeedMockData';

export const ProductionMigrations = [InitialSchema1731624000000];
export const DevelopmentMigrations = [
    ...ProductionMigrations,
    SeedMockData1731624001000
];
