import { Dispatch } from "react"

export enum PivotKeyEnum {
    Tasks = "Tasks",
    TaskForm = "TaskForm",
    Completed = "CompletedTasks"
}

export interface ITask {
    id: string
    title: string
    description?: string
    isFavourite: boolean
}

export interface ITodoContext {
    activeTasks: ITask[],
    dispatch: Dispatch<any>
}

export interface IToDoState {
    activeTasks: ITask[]
}