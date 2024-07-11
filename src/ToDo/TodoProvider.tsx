import React, { createContext, useReducer } from 'react';
import { ITask, ITodoContext, IToDoState } from './Type';



export const TodoContext = createContext<ITodoContext>({
    activeTasks: [],
    dispatch: () => { }
}
);

type Props = {
    children: React.ReactNode
}

const reducer = (state: IToDoState, action: any) => {
    console.log(state)
    console.log(action)
    switch (action.type) {
        case 'add': {
            const { data } = action;
            data.id = new Date().toJSON();
            return { ...state, activeTasks: [action.data, ...state.activeTasks] }
        }
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
    const data = { activeTasks: tasks }
    const [state, dispatch] = useReducer(reducer, data);
    return (
        <TodoContext.Provider value={{ activeTasks: state.activeTasks, dispatch }}>
            {props.children}
        </TodoContext.Provider>

    );
};

export default TodoProvider;