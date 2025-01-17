import React, { useContext } from 'react';
import { ActionTypeEnum, ITask } from '../Type';
import { Checkbox, FontIcon, mergeStyles, MessageBar, Stack } from '@fluentui/react';
import TaskListStyle from './TaskList.style';
import TaskDescription from './TaskDescription';
import { TodoContext } from '../TodoProvider';
import ToDoString from '../String.json';

const CompletedTaskList = () => {
    const { completedTasks, dispatch } = useContext(TodoContext);
    const onTaskDelete = (id: string) => {
        if (window.confirm(ToDoString.deleteConfirm))
            dispatch({ type: ActionTypeEnum.DeleteCompletedTask, data: { id } });
    }

    const onRenderCell = (task: ITask) => {
        return <Stack horizontal
            key={task.id}
            className={TaskListStyle.taskItem}
        >
            <Stack horizontal style={{ width: "80%" }} className={TaskListStyle.disabled}>
                <Checkbox disabled />
                <span>{task.title}</span>
            </Stack>
            <Stack horizontal style={{ width: "20%" }}>
                <TaskDescription task={task} />
                <FontIcon iconName={task.isFavourite ? "FavoriteStarFill" : "FavoriteStar"} className={mergeStyles(TaskListStyle.iconClass, TaskListStyle.disabled)} />

                <FontIcon iconName="Delete" className={TaskListStyle.iconClass}
                    onClick={(id) => onTaskDelete(task.id)}
                />
            </Stack>
        </Stack>
    }

    return (
        <div>{completedTasks.length ? completedTasks.map(onRenderCell) : <MessageBar>No record to show</MessageBar>}</div>
    );
};

export default CompletedTaskList;