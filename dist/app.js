"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const prisma_1 = __importDefault(require("./lib/prisma"));
const logRouter_1 = __importDefault(require("./routes/logRouter"));
const dotenv_1 = __importDefault(require("dotenv"));
const commentRouter_1 = __importDefault(require("./routes/commentRouter"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const upload_1 = require("./middlewares/upload");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: ["http://localhost:3000"],
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
const swaggerDocument = yamljs_1.default.load(path_1.default.join(__dirname, "../swagger.yaml"));
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use("/auth", authRouter_1.default);
app.use("/users", userRouter_1.default);
app.use("/logs", logRouter_1.default);
app.use("/logs/:logId/comments", commentRouter_1.default);
app.use("/uploads", express_1.default.static(upload_1.uploadPath));
app.use((req, res, next) => {
    res
        .status(404)
        .json({ message: "요청하신 리소스를 찾을 수 없습니다.", status: "Fail" });
});
app.use((error, req, res, next) => {
    console.log(error.stack());
    res.status(500).json(`sever error ${error.stack}, status: "Error`);
});
app.listen(4000, () => {
    console.log("Server started!");
});
process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.$disconnect();
    console.log("Prisam 연결 종료");
    process.exit();
}));
