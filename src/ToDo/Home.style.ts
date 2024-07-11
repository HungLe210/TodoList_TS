import { IProcessedStyleSet, IStyle, mergeStyleSets } from "@fluentui/react";


interface IHomeStyle {
    todoContainer: IStyle,
    headerStyle: IStyle,
    pivotRoot: IStyle,
    pivotContainer: IStyle
}

const HomeStyle: IProcessedStyleSet<IHomeStyle> = mergeStyleSets({
    todoContainer: {
        width: "50%",
        height: "80%",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
        borderRadius: "5px",
        overflow: "hidden"
    },
    headerStyle: {
        height: 80,
        background: "linear-gradient(to bottom, #800080 70%, #ffffff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
    },
    pivotRoot:
    {
        display: "flex",
        justifyContent: "center"
    },
    pivotContainer: {
        margin: "20px"
    }
})

export default HomeStyle;