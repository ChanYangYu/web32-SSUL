import { createConnection, Connection } from 'typeorm';
import config from '@config/index';
import { ormConfig } from '@config/ormconfig';
import { Category } from '@domains/category/models/Category';
import { Group } from '@domains/group/models/Group';
import { TechStack } from '@domains/techstack/models/TechStack';
import { GroupTechStack } from '@domains/techstack/models/GroupTechStack';
import { User } from '@domains/user/models/User';
import { Mentor } from '@domains/mentoring/models/Mentor';
import { GroupEnrollment } from '@domains/group/models/GroupEnrollment';
import { Post } from '@domains/group/models/Post';

import {
  catagorySeedData,
  groupSeedData,
  techStackSeedData,
  userSeedData,
  groupTechStackSeedData,
  groupEnrollmentSeedData,
  mentorSeedData,
  postSeedData,
} from '@root/db_seed';

export async function seed() {
  const seedConfig = { ...ormConfig[config.mode], dropSchema: true };
  const connection = await createConnection(seedConfig);
  await seedDatabase(connection);

  console.log('seeding done.');
}

async function seedDatabase(connection: Connection) {
  await connection.createQueryBuilder().insert().into(User).values(userSeedData).execute();
  await connection.createQueryBuilder().insert().into(Category).values(catagorySeedData).execute();
  await connection.createQueryBuilder().insert().into(Group).values(groupSeedData).execute();
  await connection.createQueryBuilder().insert().into(Post).values(postSeedData).execute();
  await connection
    .createQueryBuilder()
    .insert()
    .into(TechStack)
    .values(techStackSeedData)
    .execute();
  await connection.createQueryBuilder().insert().into(Mentor).values(mentorSeedData).execute();
  await connection
    .createQueryBuilder()
    .insert()
    .into(GroupTechStack)
    .values(groupTechStackSeedData)
    .execute();
  await connection
    .createQueryBuilder()
    .insert()
    .into(GroupEnrollment)
    .values(groupEnrollmentSeedData)
    .execute();

  // await connection
  //   .createQueryBuilder()
  //   .insert()
  //   .into(GroupEnrollment)
  //   .values(groupEnrollmentData)
  //   .execute();
  // await connection.createQueryBuilder().insert().into(Mentor).values(mentorData).execute();
}
