import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'game' })
export class VideoGame {
  @Column({ primary: true, generated: 'uuid' })
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;
}
