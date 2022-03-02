import { Post, prisma } from "@prisma/client";
import { Context } from "../..";

interface PostArgs {
  post: {
    title?: string;
    content?: string;
  };
}

interface PostPayloadType {
  userErrors: {
    message: string;
  }[];
  post: Post | null;
}
export const postResolvers = {
  postCreate: async (
    _: any,
    { post }: PostArgs,
    { prisma }: Context
  ): Promise<PostPayloadType> => {
    const { title, content } = post;
    if (!title || !content) {
      return {
        userErrors: [
          {
            message: "you must provide title and content to create a post",
          },
        ],
        post: null,
      };
    }

    return {
      userErrors: [],
      post: await prisma.post.create({
        data: {
          title,
          content,
          authorId: 1,
        },
      }),
    };
  },

  postUpdate: async (
    _: any,
    { post, postId }: { postId: string; post: PostArgs["post"] },
    { prisma }: Context
  ): Promise<PostPayloadType> => {
    const { title, content } = post;

    if (!title && !content) {
      return {
        userErrors: [
          {
            message: "need to have at lease one filed to update",
          },
        ],
        post: null,
      };
    }

    const existingPost = await prisma.post.findUnique({
      where: {
        id: parseInt(postId),
      },
    });

    if (!existingPost) {
      return {
        userErrors: [
          {
            message: "Post doesnt exist",
          },
        ],
        post: null,
      };
    }

    let payloadToUpdate = {
      title,
      content,
    };

    if (!title) delete payloadToUpdate.title;
    if (!content) delete payloadToUpdate.content;
    return {
      userErrors: [],
      post: await prisma.post.update({
        data: {
          ...payloadToUpdate,
        },
        where: {
          id: parseInt(postId),
        },
      }),
    };
  },
  postDelete: async (
    _: any,
    { postId }: { postId: string },
    { prisma }: Context
  ): Promise<PostPayloadType> => {
    const existingPost = await prisma.post.findUnique({
      where: {
        id: Number(postId),
      },
    });
    if (!existingPost) {
      return {
        userErrors: [
          {
            message: "Post couldnt find",
          },
        ],
        post: null,
      };
    }

    return {
      userErrors: [],
      post: await prisma.post.delete({
        where: {
          id: Number(postId),
        },
      }),
    };
  },
};
