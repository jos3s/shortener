import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  constructor(url: string, shortener: string) {
    this.url = url;
    this.shortenerLink = shortener;
  }
}
