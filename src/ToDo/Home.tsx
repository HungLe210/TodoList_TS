import React, { createContext, useState } from 'react';
import HomeStyle from './Home.style';
import ToDoString from './String.json';
import { Pivot, PivotItem, Label, Stack } from '@fluentui/react';
import { PivotKeyEnum, ITask } from './Type';
import TaskList from './List/TaskList';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import TodoProvider from './TodoProvider';
import TaskForm from './TaskForm/TaskForm';
import CompletedTaskList from './List/CompletedTaskList';
initializeIcons();



const Home = () => {
    const [selectedKey, setSelectedKey] = useState<string>(PivotKeyEnum.Tasks);
    const [editTaskId, setEditTaskId] = useState<string | null>(null);

    const editTask = (id: string) => {
        setEditTaskId(id);
        setSelectedKey(PivotKeyEnum.TaskForm)
    }

    return (
        <Stack className={HomeStyle.todoContainer}>
            <TodoProvider>
                <header className={HomeStyle.headerStyle}>
                    <h2 >{ToDoString.header}</h2>
                </header>
                <Stack className={HomeStyle.pivotContainer}>
                    <Pivot
                        selectedKey={String(selectedKey)}
                        styles={{ root: HomeStyle.pivotRoot }}
                        onLinkClick={(item?: PivotItem) => {
                            if (item?.props.itemKey !== PivotKeyEnum.TaskForm)
                                setEditTaskId(null)
                            setSelectedKey(item?.props.itemKey || PivotKeyEnum.Tasks)
                        }}
                    >
                        <PivotItem
                            headerText={ToDoString.pivots.taskTab}
                            itemKey={PivotKeyEnum.Tasks}
                        >
                            <TaskList setEditTask={editTask} />
                        </PivotItem>
                        <PivotItem
                            headerText={ToDoString.pivots.taskFormTab}
                            itemKey={PivotKeyEnum.TaskForm}
                        >
                            <TaskForm editTaskId={editTaskId} />
                        </PivotItem>
                        <PivotItem
                            headerText={ToDoString.pivots.completedTasks} itemKey={PivotKeyEnum.Completed}
                        >
                            <CompletedTaskList />
                        </PivotItem>
                    </Pivot>
                </Stack>
            </TodoProvider>
        </Stack >
    );
};

export default Home;