import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '@domains/user/models/User';

export enum AlarmType {
  JOIN_GROUP_REQUEST = 'JOIN_GROUP_REQUEST',
  MENTORING_REQUEST = 'MENTORING_REQUEST',
  JOIN_GROUP_ACCEPTED = 'JOIN_GROUP_ACCEPTED',
  JOIN_GROUP_DECLINED = 'JOIN_GROUP_DECLINED',
  MENTORING_ACCEPTED = 'MENTORING_ACCEPTED',
  METTORING_DECLIEND = 'METTORING_DECLIEND',
}

@Entity('alarm')
export class Alarm {
  @PrimaryGeneratedColumn({ name: 'alarm_id' })
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'sender_id' })
  senderId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'reciever_id' })
  recieverId: number;

  @Column('varchar', {
    name: 'type',
  })
  type: AlarmType | string;

  @Column('varchar', { name: 'content', nullable: true, length: 255 })
  content: string | null;

  @Column('datetime', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('tinyint', { name: 'read_chk', nullable: true, width: 1 })
  readChk: boolean | null;
}
