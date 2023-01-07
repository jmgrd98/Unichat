import React, {useRef, useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import {ChatEngine} from 'react-chat-engine'
import { auth } from "../firebase";
import '../index.css'
import {useAuth} from '../contexts/AuthContext'
import axios from "axios";


export default function Chats(){

const history = useHistory()
const {user} = useAuth()
const [loading, setLoading] = useState(true)


    async function handleLogout(){
        await auth.signOut()
        history.push('/')
    }

    async function getFile(url){
        const response = await fetch(url)
        const data = await response.blob()

        return new File([data], 'userPhoto.jpg', {type: 'image/jpeg'})
    }

    useEffect(() => {
        if(!user){
            history.push('/')
            return
        }

        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                'project-id': 'a0ac4f3d-7768-4e96-81e6-4ed6436ae06d',
                'user-name': user.email,
                'user-secret': user.uid
            }
        })
        .then(() => {
            setLoading(false)
        })
        .catch(() => {
            let formData = new FormData()
            formData.append('email', user.email)
            formData.append('username', user.email)
            formData.append('secret', user.uid)

            getFile(user.photoURL)
            .then((avatar) => {
                formData.append('avatar', avatar, avatar.name)
            
                axios.post('https://api.chatengine.io/users',
                formData,
                {headers: {'private-key': '5fdb2a80-8d61-43cb-a8ae-69f008045bfe'}}
                )
                .then(() => setLoading(false))
                .catch((error) => console.log(error))
            })
        })
    }, [user, history])

    if(!user || loading) return 'Loading...'

    return(
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    Unichat
                </div>
                <div
                className="logout-tab"
                onClick={handleLogout}>
                    Logout
                </div>
            </div>

            <ChatEngine
                height='calc(100vh - 66px)'
                projectID='a0ac4f3d-7768-4e96-81e6-4ed6436ae06d'
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    )
}