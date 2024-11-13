export function dataUrlToArrayBuffer(dataUrl: string) {
    const arr = dataUrl.split(',');
    const byteString = atob(arr[1]);
    const arrayBuffer = new Uint8Array(byteString.length);

    for (let i = 0; i < byteString.length; i++) {
        arrayBuffer[i] = byteString.charCodeAt(i);
    }
    return arrayBuffer.buffer;
}
