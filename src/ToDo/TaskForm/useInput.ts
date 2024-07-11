import { useState } from "react"

export const useInput = (initialValue: string) => {
    const [value, setValue] = useState(initialValue)
    const onChange = (
        event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setValue(event.currentTarget.value);
    }
    return { value, onChange }
}