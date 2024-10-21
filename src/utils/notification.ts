import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
interface Props {
    message?: string,
    type: 'success' | 'error'
}
export function notification({ message, type = 'success' }: Props) {
    Toastify({
        text: message,
        duration: 2000,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: `${type === 'success' ? 'green' : 'red'}`,
        },
    }).showToast()
}