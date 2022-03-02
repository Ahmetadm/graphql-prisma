import { StringValueNode } from "graphql";
import { Context } from "../..";

interface SignupArgs {
  email: string;
  name: string;
  bio: string;
  password: string;
}

export const authResolvers = {
  signup: (
    _: any,
    { email, name, password, bio }: SignupArgs,
    { prisma }: Context
  ) => {
    return prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });
  },
};
