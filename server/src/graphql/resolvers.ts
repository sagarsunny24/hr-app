import { loginUser, registerCompany } from "@/controllers/auth.controller.js";
import { Mutation } from "@tanstack/react-query";
import {
  LoginArgs,
  RegisterArgs,
  EmployeeDetails,
  Context,
  EmpRole,
  CompanyID,
} from "@hr-app/shared";
import type { Response } from "express";
import { GraphQLError } from "graphql";
import { createNewEmp, viewAllEmployees } from "@/controllers/employee.controller.js";

export const resolvers = {
  Query: {
    viewAll:async(
      _parents:unknown,
      args:unknown,
      context:Context
    ) =>{
      if(!context.user)  throw new GraphQLError("Unauthorized", {
          extensions: { code: "FORBIDDEN" },
        });
        
        return await viewAllEmployees(context.user.company_id)

    }
  },
  Mutation: {
    login: async (
      _parents: unknown,
      args: LoginArgs,
      { res }: { res: Response },
    ) => {
      return await loginUser(args, res);
    },
    register: async (
      _parents: unknown,
      args: RegisterArgs,
      context: unknown,
    ) => {
      const registerResponse = await registerCompany(args);
      return registerResponse;
    },
    addEmployee: async (_:unknown, args:{input:EmployeeDetails} , context: Context) => {
      if (!context.user || context.user.emp_role !== EmpRole.MANAGER) {
        throw new GraphQLError("Unauthorized", {
          extensions: { code: "FORBIDDEN" },
        });
      }
   return await createNewEmp({
    input: args.input,
    company_id: context.user.company_id,
  });

    },
  },
};
