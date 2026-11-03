import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as usersSchema from './users.schema';
import * as problemsSchema from './problems.schema';
import * as roomsSchema from './rooms.schema';
import * as commonSchema from './common.schema';

export { baseEntity, primaryKeyId, id, timestamps } from './common.schema';
export * from './users.schema';
export * from './problems.schema';

export {
  rooms,
  roomParticipants,
  roomsRelations,
  roomParticipantsRelations,
  roomModeEnum,
  roomStatusEnum,
  bufferVisibilityEnum,
} from './rooms.schema';

const schema = {
  ...usersSchema,
  ...problemsSchema,
  ...roomsSchema,
  ...commonSchema,
};

export type DrizzleDB = NodePgDatabase<typeof schema>;
export default schema;