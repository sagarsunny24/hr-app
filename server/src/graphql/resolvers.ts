import { loginUser, registerCompany } from "@/controllers/auth.controller.js";
import { Mutation } from "@tanstack/react-query";
import {
  LoginArgs,
  RegisterArgs,
  EmployeeDetails,
  Context,
  EmpRole,
} from "@hr-app/shared";
import type { Response } from "express";
import { GraphQLError } from "graphql";
import { createNewEmp } from "@/controllers/employee.controller.js";

export const resolvers = {
  Query: {},
  Mutation: {
    login: async (
      _parents: unknown,
      args: LoginArgs,
      { res }: { res: Response },
    ) => {
      return loginUser(args, res);
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
      if (!context.user || context.user.emp_role !== EmpRole.HR) {
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
