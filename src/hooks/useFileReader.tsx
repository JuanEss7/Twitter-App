import { useState } from "react";

export function useFileReader() {
    const [file, setFile] = useState<File>()
    const [result, setResult] = useState<string | null>(null);
    const validTypes: string[] = ['image/jpeg', 'image/png', 'image/gif'];
    let errorMessage;
    function setFileReader(file: File | undefined) {
        setFile(file);
    }
    if (!file) return { result: null, setFileReader }
    if (!validTypes.includes(file.type)) {
        errorMessage = 'El formato de imagen no es valido.'
        return { errorMessage, result, setFileReader }
    }
    const reader = new FileReader();
    reader.onload = () => {
        if (reader.result) {
            const resultFile = reader.result as string;
            setResult(resultFile);
        }
    };
    reader.readAsDataURL(file);

    return { result, setFileReader, errorMessage }
}