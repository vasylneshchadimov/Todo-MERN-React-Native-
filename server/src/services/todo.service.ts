import Todo from "../models/Todo";
import { ITodo } from "../types/todos.type";

interface IQuery {
    search: string;
    compleated: string;
    privated: string;
    skip: string;
    limit: string;
}

export default class TodoService {
    async getAllTodos(userId: string, query: IQuery) {
        const { search, compleated, privated, skip, limit } = query;
        const priv = privated === "true";
        const compl = compleated === "true";

        const allTodos = await Todo.find({
            $and: [
                {
                    title: { $regex: search },
                    isCompleted: compl,
                    isPublic: priv,
                },
                { $or: [{ userId }, { isPublic: false }] },
            ],
        })
            .skip(Number(skip))
            .limit(Number(limit));
        return allTodos;
    }
    async getTodo(id: string) {
        const todo = await Todo.findById(id);
        return todo;
    }

    async createTodo(todo: ITodo, userId: string) {
        const newTodo = await Todo.create({
            ...todo,
            userId: userId,
        });
        return newTodo;
    }
    async updateTodo(id: string, todo: ITodo, userId: string) {
        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { ...todo, userId },
            {
                new: true,
            }
        );
        return updatedTodo;
    }
    async deleteTodo(id: string) {
        const deletedTodo = await Todo.findByIdAndDelete(id);
        return deletedTodo;
    }
}
