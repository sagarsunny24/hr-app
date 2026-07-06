import { PrimaryGeneratedColumn,Entity,Column, CreateDateColumn } from "typeorm";

@Entity({name:'company_details'})
export class Companies{

  @PrimaryGeneratedColumn('uuid')
  company_id!:string

  @Column({type:'text'})
  company_name!:string

  @Column({type:'varchar',length:255, unique:true})
  registration_no!:string

  @Column({type:'text'})
  ceo_name!:string

  @Column({type:'text'})
  company_loc!:string

  @CreateDateColumn({ type: "date" })
  created_date!:Date

  @Column({type:'text'})
  company_address!:string

}