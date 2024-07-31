import React, { useContext } from 'react';
import TaskListStyle from './TaskList.style';
import { Checkbox, FontIcon, MessageBar, Stack } from '@fluentui/react';
import { TodoContext } from '../TodoProvider';
import { ActionTypeEnum, ITask } from '../Type';
import TodoString from "../String.json";
import TaskDescription from './TaskDescription';


type Props = {
    setEditTask: (taskId: string) => void

}

const TaskList = ({ setEditTask }: Props) => {
    const { activeTasks, dispatch } = useContext(TodoContext);

    const onTaskDelete = (id: string) => {
        if (window.confirm(TodoString.deleteConfirm))
            dispatch({ type: ActionTypeEnum.Delete, data: { id } })
    }

    const onFavoriteClick = (id: string) => {
        dispatch({ type: ActionTypeEnum.ToggleFavorite, data: { id } })
    }

    const onEditTaskClick = (id: string) => {

    }

    const checkboxClickedHnd = (id: string) => {
        dispatch({ type: ActionTypeEnum.Completed, data: { id } })
    }

    const onRenderCell = (task: ITask) => {
        return <Stack horizontal
            key={task.id}
            className={TaskListStyle.taskItem}
        >
            <Stack horizontal style={{ width: "80%" }}>
                <Checkbox onChange={() => {
                    checkboxClickedHnd(task.id)
                }} />
                {task.title}
            </Stack>
            <Stack horizontal style={{ width: "20%" }}>
                <TaskDescription task={task} />
                <FontIcon iconName={task.isFavourite ? "FavoriteStarFill" : "FavoriteStar"} className={TaskListStyle.iconClass} onClick={() => onFavoriteClick(task.id)} />
                <FontIcon iconName="EditNote" className={TaskListStyle.iconClass} onClick={() => {
                    setEditTask(task.id)
                }} />
                <FontIcon iconName="Delete" className={TaskListStyle.iconClass} onClick={(id) => onTaskDelete(task.id)} />
            </Stack>
        </Stack>
    }

    return (
        <div>{activeTasks.length ? activeTasks.map(onRenderCell) : <MessageBar>No record to show</MessageBar>}</div>
        /* {task.map((item) => onRenderCell(item))} */
    );
};

export default TaskList;