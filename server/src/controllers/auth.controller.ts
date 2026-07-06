import {  RequestHandler } from "express";
import { AppDataSource } from "@/config/db.js";
import { Companies } from "@/entities/Companies.js";


const registerCompany:RequestHandler =async(req,res,next)=>{

  try{
 const {company_name, registration_no ,ceo_name, company_loc,created_date,company_address} = req.body

  await AppDataSource
        .createQueryBuilder()
        .insert()
        .into(Companies)
        .values({
          company_name,
          registration_no,
          ceo_name,
          company_loc,
          created_date,
          company_address
        })
        .execute()
  res.status(201).json({message:'Company successfully created'})
  }
 catch(err){
  next(err)
 }
}
