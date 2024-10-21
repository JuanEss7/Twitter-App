import { useEffect, useState } from "react";

export function useDebounce(value: string) {
    const [result, setResult] = useState('');
    useEffect(() => {
        console.log({ value })
        if (value === undefined || typeof value !== 'string' || value === null) {
            setResult('')
            return
        }
        const time = setTimeout(() => {
            setResult(value);
        }, 500)
        return () => {
            clearTimeout(time)
        }
    }, [value])
    return [result]
}