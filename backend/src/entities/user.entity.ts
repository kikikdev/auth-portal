import { Entity, Property } from '@mikro-orm/core';

@Entity({ tableName: 'users' }) 
export class User {
  @Property({ primary: true })
  uid: string;

  @Property()
  username: string;

  @Property()
  password: string;

  @Property({ fieldName: 'latestLogin' })
  latestLogin?: Date;

  @Property({ fieldName: 'deletedAt', nullable: true })
  deletedAt?: Date;
}