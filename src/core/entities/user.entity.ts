import { UrlShortener } from 'src/core/entities/url-shortener.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => UrlShortener, (urlShortener) => urlShortener.user)
  urlShorteners?: UrlShortener[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
