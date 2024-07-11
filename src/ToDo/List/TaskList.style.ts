import { IProcessedStyleSet, IStyle, mergeStyleSets } from "@fluentui/react";

interface ITaskListType {
    taskItem: IStyle,
    iconClass: IStyle
}

const TaskListStyle: IProcessedStyleSet<ITaskListType> = mergeStyleSets({
    taskItem: {
        maxHeight: 50,
        minHeight: 30,
        padding: 10,
        width: "100%",
        backgroundColor: "lavender",
        selectors: {
            "&:hover": { background: "rbg(243,242,241)" },
        },
        margin: 5,
        display: "flex",
        alignItems: "center",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
    },
    iconClass: {
        fontSize: 20,
        margin: '0 3px',
        selectors: {
            "&:hover": { cursor: "pointer" },
        },
    }
})

export default TaskListStyle;