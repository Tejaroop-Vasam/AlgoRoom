import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as usersSchema from './users.schema';
import * as problemsSchema from './problems.schema';
import * as commonSchema from './common.schema';

export { baseEntity, primaryKeyId, id, timestamps } from './common.schema';
export * from './users.schema';
export * from './problems.schema';

const schema = {
  ...usersSchema,
  ...problemsSchema,
  ...commonSchema,
};

export type DrizzleDB = NodePgDatabase<typeof schema>;
export default schema;