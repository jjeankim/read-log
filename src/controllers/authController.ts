import type { Request, Response } from "express";
import { loginSchema, signupSchema } from "../validator/authSchema.js";
import bcrypt from "bcryptjs";
import prisma from "../lib/prisma.js";
import { ERROR_MESSAGE, SUCCESS_MESSAGES } from "../constants/message.js";
import { ZodError } from "zod";
import { generateAccessToken, generateRefreshToken } from "../lib/token.js";
import pkg from "jsonwebtoken";

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS || "10");
const isProduction = process.env.NODE_ENV === "production";

// 회원가입
export const signup = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = signupSchema.parse(req.body);
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await prisma.user.create({
      data: {
        email,
        userName: name,
        password: hashedPassword,
      },
    });

    return res
      .status(201)
      .json({ message: SUCCESS_MESSAGES.USER_CREATED, data: user });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: ERROR_MESSAGE.REGISTER_VALIDATION_FAILED,
        errors: error.issues.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      });
    }
    return res.status(500).json({ message: ERROR_MESSAGE.SERVER_ERROR });
  }
};

// 로그인
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({
        message: ERROR_MESSAGE.USER_NOT_FOUND,
        errors: [{ field: "email", message: "등록되지 않은 이메일입니다." }],
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: ERROR_MESSAGE.INVALID_CREDENTIALS,
        errors: [
          { field: "password", message: "비밀번호가 일치하지 않습니다." },
        ],
      });
    }

    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      name: user.userName,
    });

    const refreshToken = generateRefreshToken({
      id: user.id,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProduction, // prod 에서만 true
      sameSite: isProduction ? "none" : "lax", // 크로스 도메인 대응
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7일
    });

    return res.status(200).json({
      message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
      accessToken,
      user: {
        email: user.email,
        name: user.userName,
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: ERROR_MESSAGE.LOGIN_VALIDATION_FAILED,
        errors: error.issues.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      });
    }
    return res.status(500).json({ message: ERROR_MESSAGE.SERVER_ERROR });
  }
};

// 로그아웃
export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });
    return res.json({ message: SUCCESS_MESSAGES.LOGGED_OUT });
  } catch (error) {
    return res.status(500).json({ message: ERROR_MESSAGE.SERVER_ERROR });
  }
};

// 토큰 재발급
export const refreshToken = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    return res.status(401).json({ message: ERROR_MESSAGE.TOKEN_MISSING });
  }

  try {
    const decoded = pkg.verify(
      token,
      process.env.JWT_REFRESH_SECRET_KEY as string
    ) as { id: number };

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(401).json({ message: ERROR_MESSAGE.USER_NOT_FOUND });
    }

    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      name: user.userName,
    });

    return res.json({
      accessToken,
      user: {
        email: user.email,
        name: user.userName,
      },
    });
  } catch (error) {
    if (error instanceof pkg.JsonWebTokenError) {
      return res.status(401).json({ message: ERROR_MESSAGE.TOKEN_INVALID });
    }
    return res.status(500).json({ message: ERROR_MESSAGE.SERVER_ERROR });
  }
};
