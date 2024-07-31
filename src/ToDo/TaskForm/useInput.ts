import { useState } from "react"

export const useInput = (initialValue: string) => {
    const [value, setValue] = useState(initialValue)
    const onChange = (
        event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setValue(event.currentTarget.value);
    }

    const set = (data: string) => {
        setValue(data)
    }

    return { value, onChange, set }
}