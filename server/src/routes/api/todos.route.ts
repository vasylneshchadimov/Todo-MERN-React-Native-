import { Router } from "express";
import {
    tryCatchMiddleware,
    isExistId,
    validationForBody,
} from "./../../middlewares/validates";
import { todoSchema } from "../../types/todos.type";
import todoController from "../../controllers/todo.controller";
import passport from "passport";
import { ValidToken } from "../../middlewares/auth.middleware";

const todosRouter: Router = Router();

todosRouter.get(
    "/",
    ValidToken(),
    tryCatchMiddleware(todoController.getAllTodos.bind(todoController))
);

todosRouter.post(
    "/",

    validationForBody(todoSchema),
    ValidToken(),
    tryCatchMiddleware(todoController.createTodo.bind(todoController))
);
todosRouter.put(
    "/:id",
    isExistId(),
    ValidToken(),
    validationForBody(todoSchema),

    tryCatchMiddleware(todoController.updateTodo.bind(todoController))
);
todosRouter.delete(
    "/:id",
    ValidToken(),
    isExistId(),

    tryCatchMiddleware(todoController.deleteTodo.bind(todoController))
);

export default todosRouter;
