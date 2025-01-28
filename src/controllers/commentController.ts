import { Request, Response } from "express";
import prisma from "../lib/prisma.js";

export const getAllComments = async (req: Request, res: Response) => {
  try {
    const comments = await prisma.comment.findMany({
      include: {
        post: true,
      },
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

export const getCommentById = async (req: Request, res: Response) => {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        post: true,
      },
    });
    if (!comment) {
      res.status(404).json({ error: "Comment not found" });
      return;
    }
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comment" });
  }
};

export const getCommentsByPostId = async (req: Request, res: Response) => {
  try {
    const comments = await prisma.comment.findMany({
      where: { postId: Number(req.params.id) },
      include: {
        post: true,
      },
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

export const createComment = async (req: Request, res: Response) => {
  try {
    const { content, post_id } = req.body;
    const comment = await prisma.comment.create({
      data: {
        content,
        postId: post_id,
      },
      include: {
        post: true,
      },
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Failed to create comment" });
  }
};

export const updateComment = async (req: Request, res: Response) => {
  try {
    const { content, post_id } = req.body;
    const comment = await prisma.comment.update({
      where: { id: Number(req.params.id) },
      data: {
        content,
        postId: post_id,
      },
      include: {
        post: true,
      },
    });
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: "Failed to update comment" });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    await prisma.comment.delete({
      where: { id: Number(req.params.id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete comment" });
  }
};
