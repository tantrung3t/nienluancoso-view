
import React, { useState} from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom"
import Header from "../Components/Header";

export default function Login() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [rpassword, setRPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const history = useHistory();

    const handleSubmit = e => {
        e.preventDefault();
        if (user === '' || password === "" || rpassword === '' || name === '' || phone === '') alert("Vui lòng nhập đầy đủ thông tin!!")
        else if (password !== rpassword) {
            alert("Xác nhận mật khẩu không đúng!!");
        }
        else {
            sendData();

        }
    }

    const sendData = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "username": user,
            "password": password,
            "name": name,
            "phone": phone
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3008/signin", requestOptions)
            .then(response => response.json())
            .then(result => {
                
                if(result.result){
                    alert("Bạn đã đăng kí thành công!!");
                    history.push('/login');
                }
                else{
                    alert("Tên đăng nhập đã tồn tại!!");
                }
            })
            .catch(error => console.log('error', error));
    }






    return (
        <div>
            <Header />
            <div className="form-signin-wrap ">
                <form className="form-signin" onSubmit={handleSubmit}>
                    <div className="form-signin-header">Đăng Ký</div>
                    <div className="form-signin-login">
                        <input type="text" className="form-signin-input" placeholder="Tên đăng nhập" name="id" maxLength="128" onChange={e => setUser(e.target.value)} />
                        <input type="password" className="form-signin-input" placeholder="Mật khẩu" name="pw" maxLength="128" onChange={e => setPassword(e.target.value)} />
                        <input type="password" className="form-signin-input" placeholder="Nhập lại mật khẩu" name="rpw" maxLength="128" onChange={e => setRPassword(e.target.value)} />
                        <input type="text" className="form-signin-input" placeholder="Họ và tên" name="name" maxLength="128" onChange={e => setName(e.target.value)} />
                        <input type="text" className="form-signin-input" placeholder="Số điện thoại" name="phone" maxLength="128" onChange={e => setPhone(e.target.value)} />
                        <button type="submit" className="form-signin-btn btn btn-primary" >Đăng Ký</button>
                    </div>
                    <div className="form-signin-footer text-center">
                        <span>Nếu bạn đã có tài khoản &nbsp;</span>
                        <Link to="/login" className="primary-color" >Đăng nhập</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}