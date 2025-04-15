import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  idUser: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  names: string;

  @Column({ nullable: true })
  created_at: Date = new Date();

  @Column({ nullable: true })
  updated_at: Date = new Date();

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
