import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UrlShortener {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 3000 })
  url: string;

  @Column({ length: 30 })
  shortenerLink: string;

  @Column()
  accessCounter: number = 0;

  @ManyToOne(() => User, (user) => user.urlShorteners)
  user?: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  constructor(url: string, shortener: string, user?: User) {
    this.url = url;
    this.shortenerLink = shortener;
    this.user = user;
  }
}
