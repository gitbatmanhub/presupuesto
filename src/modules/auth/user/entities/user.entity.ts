import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  idUser: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  names: string;

  @Column({ nullable: true })
  created_at: Date = new Date();

  @Column({ nullable: true })
  updated_at: Date = new Date();
}
