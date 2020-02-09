import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('idea')
export class IdeasEntity {
  @PrimaryGeneratedColumn('uuid') 
  id: string;
  
  @CreateDateColumn() 
  createdDate: Date;
  
  @Column('text') 
  idea: string;
  
  @Column('text') 
  description: string;
}