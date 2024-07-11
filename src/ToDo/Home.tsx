import React, { createContext, useState } from 'react';
import HomeStyle from './Home.style';
import ToDoString from './String.json';
import { Pivot, PivotItem, Label, Stack } from '@fluentui/react';
import { PivotKeyEnum, ITask } from './Type';
import TaskList from './List/TaskList';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import TodoProvider from './TodoProvider';
import TaskForm from './TaskForm/TaskForm';
initializeIcons();



const Home = () => {
    const [selectedKey, setSelectedKey] = useState<string>(PivotKeyEnum.Tasks);
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
                            setSelectedKey(item?.props.itemKey || PivotKeyEnum.Tasks)
                        }}
                    >
                        <PivotItem
                            headerText={ToDoString.pivots.taskTab}
                            itemKey={PivotKeyEnum.Tasks}
                        >
                            <TaskList />
                        </PivotItem>
                        <PivotItem
                            headerText={ToDoString.pivots.taskFormTab}
                            itemKey={PivotKeyEnum.TaskForm}
                        >
                            <TaskForm />
                        </PivotItem>
                        <PivotItem
                            headerText={ToDoString.pivots.completedTasks} itemKey={PivotKeyEnum.Completed}
                        >
                            <Label>Pivot #3</Label>
                        </PivotItem>
                    </Pivot>
                </Stack>
            </TodoProvider>
        </Stack >
    );
};

export default Home;