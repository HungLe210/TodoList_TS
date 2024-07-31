import React, { createContext, useReducer } from 'react';
import { ActionTypeEnum, IAddAction, ICompletedAction, IDeleteAction, IReducerAction, ITask, ITodoContext, IToDoState, IToggleFavoriteAction, IUpdateAction } from './Type';
import { clone } from './utility';

export const TodoContext = createContext<ITodoContext>({
    activeTasks: [],
    completedTasks: [],
    dispatch: () => { }
}
);

type Props = {
    children: React.ReactNode
}

const addTaskAction = (state: IToDoState, action: IAddAction) => {
    const { data } = action;
    data.id = new Date().toJSON();
    return [action.data, ...state.activeTasks];
}
const deleteTaskAction = (state: IToDoState, action: IDeleteAction) => {
    console.log("Before Delete", state.activeTasks);
    const activeTasks: ITask[] = clone(state.activeTasks);
    const filteredData = activeTasks.filter(task => task.id !== action.data.id);
    return filteredData;
}

const deleteCompletedTaskAction = (state: IToDoState, action: IDeleteAction) => {
    const completedTasks: ITask[] = clone(state.completedTasks);
    const filteredData = completedTasks.filter(task => task.id !== action.data.id);
    return filteredData;
}

const toggleFavoriteAction = (state: IToDoState, action: IToggleFavoriteAction) => {
    const activeTasks: ITask[] = clone(state.activeTasks);
    const favoriteIndex = activeTasks.findIndex(task => task.id === action.data.id);
    if (favoriteIndex >= 0)
        activeTasks[favoriteIndex].isFavourite = !activeTasks[favoriteIndex].isFavourite;
    //console.log("ActiveTask after Update: ", activeTasks);
    return activeTasks;
}

const updateTaskAction = (state: IToDoState, action: IUpdateAction) => {
    const activeTasks: ITask[] = clone(state.activeTasks);
    const Index = activeTasks.findIndex(task => task.id === action.data.id);
    if (Index >= 0)
        activeTasks[Index] = action.data;
    //console.log("ActiveTask after Update: ", activeTasks);
    return activeTasks;
}

const completedTaskAction = (state: IToDoState, action: ICompletedAction) => {
    const activeTasks: ITask[] = clone(state.activeTasks);
    const completedTaskData = activeTasks.find(task => task.id === action.data.id)
    const filteredData = activeTasks.filter(task => task.id !== action.data.id);
    const completedTasks = completedTaskData ? [completedTaskData, ...state.completedTasks] : [...state.completedTasks];
    return {
        activeTasks: filteredData,
        completedTasks: completedTasks,
    };

}

const reducer = (state: IToDoState, action: IReducerAction) => {
    console.log("State", state)
    console.log("Action", action)
    switch (action.type) {
        case ActionTypeEnum.Add:
            return { ...state, activeTasks: addTaskAction(state, action) }
        case ActionTypeEnum.Delete:
            return { ...state, activeTasks: deleteTaskAction(state, action) }
        case ActionTypeEnum.DeleteCompletedTask:
            return { ...state, completedTasks: deleteCompletedTaskAction(state, action) }
        case ActionTypeEnum.ToggleFavorite:
            return { ...state, activeTasks: toggleFavoriteAction(state, action) }
        case ActionTypeEnum.Update:
            return { ...state, activeTasks: updateTaskAction(state, action) }
        case ActionTypeEnum.Completed:
            const data = completedTaskAction(state, action)
            return { ...state, activeTasks: data.activeTasks, completedTasks: data.completedTasks };
    }
    return { ...state };
}



const TodoProvider = (props: Props) => {

    const tasks: ITask[] = [
        {
            id: "1",
            title: "Task 1",
            isFavourite: true
        },
        {
            id: "2",
            title: "Task 2",
            isFavourite: false
        },
        {
            id: "3",
            title: "Task 3",
            isFavourite: false
        },
    ];
    const data: IToDoState = { activeTasks: tasks, completedTasks: [] };
    const [state, dispatch] = useReducer(reducer, data);
    return (
        <TodoContext.Provider value={{ activeTasks: state.activeTasks, completedTasks: state.completedTasks, dispatch }}>
            {props.children}
        </TodoContext.Provider>

    );
};

export default TodoProvider;