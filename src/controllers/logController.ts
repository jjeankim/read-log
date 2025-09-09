import type { Request, Response } from "express";
import prisma from "../lib/prisma.js";
import type { UserRequest } from "../types/expressUserRequest.js";
import { ERROR_MESSAGE, SUCCESS_MESSAGES } from "../constants/message.js";

// 로그 작성
export const createLog = async (req: UserRequest, res: Response) => {
  const { title, content, bookAuthor, rating, isPublic, image } = req.body;

  const ratingInt = Number(rating);
  const isPublicBoolean =
    typeof isPublic === "boolean" ? isPublic : isPublic === "true";

  const userId = req.user!.id;
  try {
    const log = await prisma.log.create({
      data: {
        title,
        content,
        bookAuthor,
        image,
        rating: ratingInt,
        userId,
        isPublic: isPublicBoolean,
      },
    });

    return res
      .status(201)
      .json({ message: SUCCESS_MESSAGES.LOG_CREATED, data: log });
  } catch (error) {
    return res.status(500).json({ message: ERROR_MESSAGE.SERVER_ERROR });
  }
};

// 공개 로그 목록 조회 (페이지네이션)
export const getLogs = async (req: Request, res: Response) => {
  const page = Math.max(parseInt(req.query.page as string) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit as string) || 10, 50);
  const skip = (page - 1) * limit;

  const sortBy = (req.query.sortBy as string) || "createdAt";
  const sortOrder = (req.query.sort as "asc" | "desc") || "desc";

  try {
    const [logs, total] = await Promise.all([
      prisma.log.findMany({
        where: { isPublic: true },
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: limit,
      }),
      prisma.log.count({ where: { isPublic: true } }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return res.status(200).json({
      message: SUCCESS_MESSAGES.LOG_LIST_SUCCESS,
      data: logs,
      pagination: {
        total,
        page,
        totalPages,
        limit,
        hasMore: page < totalPages,
        nextPage: page < totalPages ? page + 1 : null,
        prevPage: page > 1 ? page - 1 : null,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: ERROR_MESSAGE.SERVER_ERROR });
  }
};

// 단일 로그 조회
export const getLog = async (req: UserRequest, res: Response) => {
  const logId = Number(req.params.logId);

  try {
    const log = await prisma.log.findUnique({
      where: { id: logId },
    });
    if (!log) {
      return res.status(404).json({ message: ERROR_MESSAGE.LOG_NOT_FOUND });
    }

    if (log.isPublic) {
      return res
        .status(200)
        .json({ message: SUCCESS_MESSAGES.LOG_DETAIL_SUCCESS, data: log });
    }

    if (!req.user) {
      return res
        .status(401)
        .json({ message: ERROR_MESSAGE.LOG_LOGIN_REQUIRED });
    }

    if (log.userId !== req.user.id) {
      return res.status(403).json({ message: ERROR_MESSAGE.LOG_FORBIDDEN });
    }

    return res
      .status(200)
      .json({ message: SUCCESS_MESSAGES.LOG_DETAIL_SUCCESS, data: log });
  } catch (error) {
    return res.status(500).json({ message: ERROR_MESSAGE.SERVER_ERROR });
  }
};

// 내 로그 목록 조회 (페이지네이션)
export const getMyLogs = async (req: UserRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: ERROR_MESSAGE.UNAUTHORIZED });
  }

  const page = Math.max(parseInt(req.query.page as string) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit as string) || 10, 50);
  const skip = (page - 1) * limit;
  const sort = (req.query.sort as "asc" | "desc") || "desc";

  try {
    const [logs, total] = await Promise.all([
      prisma.log.findMany({
        where: { userId: req.user.id },
        orderBy: { createdAt: sort },
        skip,
        take: limit,
      }),
      prisma.log.count({ where: { userId: req.user.id } }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return res.status(200).json({
      message: SUCCESS_MESSAGES.MY_LOG_LIST_SUCCESS,
      data: logs,
      pagination: {
        total,
        page,
        totalPages,
        limit,
        hasMore: page < totalPages,
        nextPage: page < totalPages ? page + 1 : null,
        prevPage: page > 1 ? page - 1 : null,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: ERROR_MESSAGE.SERVER_ERROR });
  }
};

// 로그 수정
export const updateLog = async (req: UserRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: ERROR_MESSAGE.UNAUTHORIZED });
  }

  const logId = Number(req.params.logId);
  const { title, content, bookAuthor, rating, isPublic, image } = req.body;

  const ratingInt = Number(rating);
  const isPublicBoolean =
    typeof isPublic === "boolean" ? isPublic : isPublic === "true";

  try {
    const log = await prisma.log.findUnique({
      where: { id: logId },
    });
    if (!log) {
      return res.status(404).json({ message: ERROR_MESSAGE.LOG_NOT_FOUND });
    }

    if (req.user.id !== log.userId) {
      return res
        .status(403)
        .json({ message: ERROR_MESSAGE.LOG_UPDATE_FORBIDDEN });
    }

    const updatedLog = await prisma.log.update({
      where: { id: logId },
      data: {
        title,
        content,
        bookAuthor,
        rating: ratingInt,
        isPublic: isPublicBoolean,
        image,
      },
    });
    return res
      .status(200)
      .json({ message: SUCCESS_MESSAGES.LOG_UPDATED, data: updatedLog });
  } catch (error) {
    return res.status(500).json({ message: ERROR_MESSAGE.SERVER_ERROR });
  }
};

// 로그 삭제
export const deleteLog = async (req: UserRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: ERROR_MESSAGE.UNAUTHORIZED });
  }

  const logId = Number(req.params.logId);
  try {
    const log = await prisma.log.findUnique({
      where: { id: logId },
    });

    if (!log) {
      return res.status(404).json({ message: ERROR_MESSAGE.LOG_NOT_FOUND });
    }

    if (req.user.id !== log.userId) {
      return res
        .status(403)
        .json({ message: ERROR_MESSAGE.LOG_DELETE_FORBIDDEN });
    }

    await prisma.log.delete({
      where: { id: logId },
    });

    return res.status(200).json({ message: SUCCESS_MESSAGES.LOG_DELETED });
  } catch (error) {
    return res.status(500).json({ message: ERROR_MESSAGE.SERVER_ERROR });
  }
};

// 추천 로그

export const getRecommendedLogs = async (req: UserRequest, res: Response) => {
  const userId = req.query.userId ? Number(req.query.userId) : null;

  try {
    let logs = await prisma.log.findMany({
      where: { isPublic: true, rating: { gte: 4 } },
      take: 20,
      orderBy: { createdAt: "desc" },
    });

    logs = logs.sort(() => 0.5 - Math.random()).slice(0, 6);

    if (userId) {
    }

    return res.status(200).json({
      message: "추천 로그 조회 성공",
      data: logs,
    });
  } catch (error) {
    return res.status(500).json({ message: ERROR_MESSAGE.SERVER_ERROR });
  }
};
