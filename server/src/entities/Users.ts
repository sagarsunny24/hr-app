import { Entity,OneToOne,JoinColumn,Column, PrimaryColumn } from "typeorm";
import  {Employee}  from "./Employee.js";

@Entity({name:'users'})
export class Users {
  
  @PrimaryColumn('uuid')
  user_id!:string

  @OneToOne(()=>Employee,{onDelete:'CASCADE'})
  @JoinColumn({name: 'user_id',referencedColumnName:'emp_id',foreignKeyConstraintName:'fk_users_to_emp'})
  user!:Employee;

  @Column({unique:true,type: "text"})
  email!: string;

  @Column({type:'varchar',length:255})
  password_hash!: string

  @Column({type: "varchar",
    nullable: true})
  refresh_token!: string | null
}