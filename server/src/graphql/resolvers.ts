import { loginUser,registerCompany } from "@/controllers/auth.controller.js";
import { Mutation } from "@tanstack/react-query";
import { LoginArgs, RegisterArgs } from "@hr-app/shared";
import type { Response } from "express";

export const resolvers = {
  Query: {

  },
  Mutation:{
    login: async (_parents:unknown,args:LoginArgs, { res }: { res: Response }) =>{
      return loginUser(args,res)

    },
    registerCompany: async(_parents:unknown,args:RegisterArgs,context:unknown) =>{
      const registerResponse = await registerCompany(args)
     
    }
  }
}