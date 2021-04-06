import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() =>{
        message(error)
        clearError()
    }, [error, message, clearError] )

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    
    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        }catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        }catch (e) {}
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Cut Your Link</h1>
                <div className="card blue-grey darken-2 darken-1 ">
                <div className="card-content white-text">
                    <span className="card-title">Authorization</span>
                    <div>

                        <div className="input-field">
                            <input
                                placeholder="Enter Email"
                                id="email"
                                type="text"
                                name="email"
                                className="yellow-input"
                                value={form.email}
                                onChange={changeHandler}
                            />
                        </div>

                        <div className="input-field">
                            <input
                                placeholder="Enter Password"
                                id="password"
                                type="password"
                                name="password"
                                className="yellow-input"
                                value={form.password}
                                onChange={changeHandler}
                            />
                        </div>

                    </div>
                </div>
                <div className="card-action">
                    <button
                        className="btn blue-grey darken-4"
                        style={{marginRight: 7}}
                        disabled={loading}
                        onClick={loginHandler}
                    >
                        Log In
                    </button>
                    <button
                        className="btn blue-grey lighten-4 lighten-2 black-text"
                        onClick={registerHandler}
                        disabled={loading}
                    >
                        Registration
                    </button>
                </div>
            </div>
            </div>
        </div>
    )


}
