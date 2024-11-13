export function getImageOfInput(file: File) {
    let result = '';
    const validTypes: string[] = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
        return {
            ok: false,
            message: 'El formato de imagen no es valido.'
        };
    }
    const reader = new FileReader();
    reader.onload = () => {
        if (reader.result) {
            result = reader.result as string;
            console.log(result)
        }
    };
    reader.readAsDataURL(file);
    console.log({ result })
    return {
        ok: true,
        result
    }
}

