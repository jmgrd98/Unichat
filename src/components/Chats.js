import React from "react";
import { useHistory } from "react-router-dom";
import {ChatEngine} from 'react-chat-engine'
import { auth } from "../firebase";
import '../index.css'
import {useAuth} from '../contexts/AuthContext'

export default function Chats(){

const history = useHistory()
const {user} = useAuth()


    async function handleLogout(){
        await auth.signOut()
        history.push('/')
    }

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
                projectId='a0ac4f3d-7768-4e96-81e6-4ed6436ae06d'
                userName='.'
                userSecret='.'
            />
        </div>
    )
}