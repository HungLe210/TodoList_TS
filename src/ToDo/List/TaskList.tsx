import React, { useContext } from 'react';
import TaskListStyle from './TaskList.style';
import { Checkbox, FontIcon, Stack } from '@fluentui/react';
import { TodoContext } from '../TodoProvider';


const TaskList = () => {
    const { activeTasks } = useContext(TodoContext);
    const onRender = (task: any) => {
        return <Stack
            horizontal key={task.id}
            className={TaskListStyle.taskItem}
        >
            <Stack horizontal style={{ width: "80%" }}>
                <Checkbox />
                {task.title}
            </Stack>
            <Stack horizontal style={{ width: "20%" }}>
                <FontIcon iconName="Info" className={TaskListStyle.iconClass} />
                <FontIcon iconName={task.isFavourite ? "FavoriteStarFill" : "FavoriteStar"} className={TaskListStyle.iconClass} />
                <FontIcon iconName="EditNote" className={TaskListStyle.iconClass} />
                <FontIcon iconName="Delete" className={TaskListStyle.iconClass} />
            </Stack>
        </Stack>
    }

    return (
        <div>{activeTasks.map(onRender)}</div>
        /* {task.map((item) => onRender(item))} */
    );
};

export default TaskList;