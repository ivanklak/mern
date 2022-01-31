import React from "react";

const AuthPage = () => {
    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Сократи ссылку</h1>
                <div className="card white z-depth-1">
                    <div className="card-content white-text">
                        <span className="card-title black-text">Авторизация</span>
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="Введите email"
                                    id="email"
                                    type="text"
                                    className="yellow-input"
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input
                                    placeholder="Введите пароль"
                                    id="password"
                                    type="password"
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn black white-text" style={{marginRight: 20}}>Войти</button>
                        <button className="btn white lighten-1 black-text">Регистрация</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AuthPage;