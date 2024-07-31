import { FontIcon, mergeStyles, TeachingBubble } from '@fluentui/react';
import TaskListStyle from './TaskList.style';
import { ITask } from '../Type';
import { useBoolean, useId } from '@fluentui/react-hooks';

type Prop = {
    task: ITask
}

const TaskDescription = ({ task }: Prop) => {


    const buttonId = useId();
    const [teachingBubbleVisible, { toggle: toggleTeachingBubbleVisible }] = useBoolean(false);

    return (
        <>
            <FontIcon
                id={buttonId}
                iconName="Info"
                className={task.description ?
                    TaskListStyle.iconClass : mergeStyles(TaskListStyle.iconClass, TaskListStyle.disabled)}
                onClick={task.description ? toggleTeachingBubbleVisible : () => { }}
            />
            {
                teachingBubbleVisible &&
                <TeachingBubble
                    target={`#${buttonId}`}
                    headline={task.title}
                    onDismiss={toggleTeachingBubbleVisible}
                >
                    {task.description}
                </TeachingBubble>
            }
        </>
    );
};

export default TaskDescription;