import { Request, Response } from "express";
import prisma from "../lib/prisma.js";

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: true,
        comments: true,
      },
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        user: true,
        comments: true,
      },
    });
    if (!post) {
      res.status(404).json({ error: "Post not found" });
      return;
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch post" });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, user_id } = req.body;
    const post = await prisma.post.create({
      data: {
        title,
        content,
        userId: user_id,
      },
      include: {
        user: true,
      },
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { title, content, user_id } = req.body;
    const post = await prisma.post.update({
      where: { id: Number(req.params.id) },
      data: {
        title,
        content,
        userId: user_id,
      },
      include: {
        user: true,
      },
    });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to update post" });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    await prisma.post.delete({
      where: { id: Number(req.params.id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete post" });
  }
};
