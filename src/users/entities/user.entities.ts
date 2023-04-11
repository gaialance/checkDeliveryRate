/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BeforeInsert } from "typeorm";
import { UserType } from "../enums/user-type.enum";
import { Exclude } from 'class-transformer';
import { uuid } from 'uuidv4';
import * as bcrypt from 'bcryptjs';

export const ADMIN_GROUP = 'ADMIN_GROUP';

@Entity({ name: 'users' })
export class User {
  public static USER_IMAGE_BASE_PATH = 'users/';
  public static DISK_NAME = 'default';
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ unique: true })
  uuid: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ name: 'email_verified_at' , type: 'timestamp', nullable: true })
  emailVerifiedAt: Date;

  @Column({ length: 255, unique: true, nullable: true })
  username: string;

  @Exclude()
  @Column({ length: 255, nullable: true })
  password: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  status: string;

  @Column({ length: 255 })
  salt: string;

  @Exclude()
  @Column({ length: 255, nullable: true })
  refreshToken: string;

  @Column({ name:"user_type" , length:255, enum: UserType, default: UserType.USER })
  userType: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;

  @BeforeInsert()
  private insertUuid() {
    this.uuid = uuid();
  }

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
    this.salt = salt
  }
}

