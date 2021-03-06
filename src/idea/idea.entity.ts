import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('idea')
export class IdeaEntity {
  @PrimaryGeneratedColumn('uuid') 
  id: string;
  
  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
  
  @Column('text') 
  idea: string;
  
  @Column('text')
  description: string;

  @ManyToOne( type => UserEntity, author => author.ideas )
  author: UserEntity;
}
