import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { notification } from '../../utils/notification';
import { useFileReader } from '../../hooks/useFileReader';
import defaultImage from '/perfil.webp'
import { useUserStore } from '../../store/user_store';
import './style.css'

function NickName() {
    const user = useUserStore(state => state.user)
    const updatePhotoUrlUser = useUserStore(state => state.updatePhotoUrlUser)
    const [imageToSave, setImageToSave] = useState<File>()//imagen firebase
    const [src, setSrc] = useState<string>(defaultImage);
    const { result, setFileReader, errorMessage } = useFileReader()//imagen cargada
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement | null>(null);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const inputFile = e.target.files?.[0];
        if (!inputFile) {
            return;
        }
        setImageToSave(inputFile)
        setFileReader(inputFile)
    }
    function openInputImage() {
        if (!inputRef) {
            return
        }
        inputRef?.current?.click()
    }
    useEffect(() => {
        if (!user) {
            navigate('/')
            return
        }
    }, [navigate,user])
    //Efecto que cambiara el src de la imagen una vez sea leido en el hook useFileReader
    useEffect(() => {
        if (errorMessage !== undefined) {
            notification({ message: errorMessage as string, type: 'error' })
            return
        }
        if (result) {
            setSrc(result)
            return
        }
    }, [result, errorMessage])
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);
        const nick = data.get('nickname') as string;
        const name = data.get('name') as string;
        if (!nick || !name) {
            notification({ message: 'Completa los campos por favor', type: 'error' });
            return
        }
        const response = await updatePhotoUrlUser({imageToSave: imageToSave!, name, nick, base64: result! })
        if(response){
            navigate(`/home/${nick}`)
            return
        }
    }
    return (
        <>
            <form className='form_nickname form' onSubmit={handleSubmit}>
                <img id='nick_image' src={src} alt={`Imagen del usuario`} width={200} />
                <input
                    type="file"
                    name='image'
                    accept='image/*'
                    onChange={handleChange}
                    ref={inputRef}
                />
                <button type='button' onClick={openInputImage}>Seleccionar imagen</button>
                <input type="text" name='name' placeholder='Nombre' required />
                <input type="text" name='nickname' placeholder='@Nickname' required />
                <button type='submit'>Continuar</button>
            </form>
        </>
    )
}

export default NickName