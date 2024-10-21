import React, { FormEvent, useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../../context/context'
import { useNavigate } from 'react-router-dom';
import { notification } from '../../utils/notification';
import { setUserPhotoInStorage } from '../../actions/storage/saveImageUser';
import { verifyNickInDb } from '../../actions/db/verifyExistUserNick';
import { updateUser } from '../../actions/db/updateUser';
import { useFileReader } from '../../hooks/useFileReader';
import defaultImage from '../../../public/perfil.webp'
import './style.css'
import { getUserImageOfStorage } from '../../actions/storage/getImageUser';
import { verifyExistUserName } from '../../actions/db/verifyExistUserName';
function NickName() {
    const { user, setUserProfile } = useContext(Context);
    const [imageToSave, setImageToSave] = useState<File>()//imagen firebase
    const [src, setSrc] = useState<string>(defaultImage);//
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
        console.log({ user })
        if (!user) {
            navigate('/')
        }
    }, [navigate, user])
    //Efecto que cambiara el src de la imagen una vez sea leido en el hook useFileReader
    useEffect(() => {
        if (errorMessage !== undefined) {
            notification({ message: errorMessage as string, type: 'error' })
            return
        }
        if (result) {
            setSrc(result)
        }
    }, [result, errorMessage])
    async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        const nick = data.get('nickname');
        const name = data.get('name');
        const { ok, uploadRef } = await setUserPhotoInStorage({ uid: user.uid, image: imageToSave, base64: result });
        if (!ok) {
            notification({ message: 'Ocurrio un error al subir la imagen.', type: 'error' });
            return
        }
        //Verificar si ya existe el nick del usuario
        const responseVerifyNick = await verifyNickInDb(nick as string);
        if (responseVerifyNick?.exist || responseVerifyNick?.error) {
            notification({ message: responseVerifyNick?.message, type: 'error' })
            return
        }
        //Verificar si ya existe el nombre del usurio
        const responseVerifyName = await verifyExistUserName(name as string);
        if (responseVerifyName.exist || responseVerifyName.error) {
            notification({ message: responseVerifyName.message, type: 'error' })
            return
        }
        //Actualizar el usuario en la base de datos
        const url = await getUserImageOfStorage({ photoURL: uploadRef?.metadata.fullPath ?? '' })
        const newInfoUser = { ...user, photoURL: url.imageUrl, nick, name, following: [] };
        const responseUpdateUser = await updateUser({ newInfoUser });
        const save = responseUpdateUser?.save;
        if (!save) {
            notification({ message: "Ocurrio un error al modificar la informacion, por favor intentalo mas tarde.", type: 'error' })
            return
        }
        setUserProfile(newInfoUser)
        navigate(`/home/${nick}`)
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