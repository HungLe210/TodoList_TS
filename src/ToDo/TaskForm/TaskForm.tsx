import { MessageBar, MessageBarType, PrimaryButton, Stack, TextField } from '@fluentui/react';
import React, { useContext, useEffect, useState } from 'react';
import { useInput } from './useInput';
import { TodoContext } from '../TodoProvider';
import { ActionTypeEnum, ITask } from '../Type';
import TodoString from "../String.json"
type Props = {
    editTaskId: string | null
}

const TaskForm = ({ editTaskId }: Props) => {
    const { dispatch, activeTasks } = useContext(TodoContext)
    const title = useInput("");
    const description = useInput("");

    useEffect(() => {
        if (editTaskId) {
            const taskData = activeTasks.find(task => task.id === editTaskId);
            title.set(taskData?.title || "");
            description.set(taskData?.description || "");
        }
    }, [editTaskId]);

    const [showMessage, setShowMessage] = useState<{
        type: MessageBarType,
        message: string
    }>({ type: MessageBarType.success, message: "" });



    const addTaskAction = () => {
        const data: ITask = {
            id: "",
            title: title.value,
            description: description.value,
            isFavourite: false
        };

        dispatch({ type: ActionTypeEnum.Add, data: data });
        setShowMessage({ type: MessageBarType.success, message: "Task Added" })
    }
    const updateTaskAction = () => {

        const taskData = activeTasks.find(task => task.id === editTaskId);
        if (taskData) {
            const data: ITask = {
                id: taskData.id,
                title: title.value,
                description: description.value,
                isFavourite: false
            };
            dispatch({ type: ActionTypeEnum.Update, data: data })
            setShowMessage({ type: MessageBarType.success, message: "Task Updated" })
        } else {

            
        }
        setShowMessage({ type: MessageBarType.error, message: "Error While Updating" })

    }

    useEffect(() => {
        if (showMessage.message) {
            setTimeout(() => {
                setShowMessage({ type: MessageBarType.success, message: "" })
            }, 1000)
        }
    }, [showMessage.message])

    const onFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        editTaskId ? updateTaskAction() : addTaskAction();


    };

    return (
        <form onSubmit={onFormSubmit}>
            <TextField label="Title" required {...title} />
            <TextField label="Description" multiline rows={4} {...description} />

            <Stack horizontal tokens={{ childrenGap: 20 }} style={{ marginTop: "10px" }}>
                <Stack style={{ width: "80%" }}>
                    {showMessage.message && (
                        <MessageBar messageBarType={MessageBarType.success}>
                            Task Added
                        </MessageBar>
                    )}
                </Stack>

                <Stack style={{ width: "20%" }}>
                    <PrimaryButton type="submit" text={editTaskId ? TodoString.updtTaskBtn : TodoString.addTaskBtn} />
                </Stack>
            </Stack>
        </form >
    );
};

export default TaskForm;