import { postResolvers } from "./Post";
import { authResolvers } from "./Auth";

export const Mutation = {
  ...postResolvers,
  ...authResolvers,
};
