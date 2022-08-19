import { Request } from "express";
import { IRequest } from "../types/user.types";
import TodoService from "../services/todo.service";

export class TodoController {
    constructor(private todoService: TodoService) {}
    async getAllTodos(req: IRequest) {
        return await this.todoService.getAllTodos(req.user.id, req.query);
    }
    async getTodo(req: Request) {
        return await this.todoService.getTodo(req.params.id);
    }

    async createTodo(req: IRequest) {
        return await this.todoService.createTodo(req.body, req.user.id);
    }
    async updateTodo(req: IRequest) {
        return await this.todoService.updateTodo(
            req.params.id,
            req.body,
            req.user.id
        );
    }
    async deleteTodo(req: Request) {
        return await this.todoService.deleteTodo(req.params.id);
    }
}

const todoController = new TodoController(new TodoService());
export default todoController;
