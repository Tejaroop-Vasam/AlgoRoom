import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as usersSchema from './users.schema';
import * as problemsSchema from './problems.schema';

export * from './common.schema';
export * from './users.schema';
export * from './problems.schema';

const schema = {
  ...usersSchema,
  ...problemsSchema,
};

export type DrizzleDB = NodePgDatabase<typeof schema>;
export default schema;
