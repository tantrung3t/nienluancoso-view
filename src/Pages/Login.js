
// import React  from "react";
// import { useHistory } from "react-router-dom"


// import "./Login.css"

// export default function Login(){

//     let history = useHistory();
//     let userName;

//     //lay gia tri textfield username
//     const changeData = (input) =>{ 
//         userName = input.target.value;
//     }


//     const login = () => {

//         //dua gia tri textfield vao localStorage
//         localStorage.setItem('user', userName);

//         //reload lai trang voi url /admin
//         if(userName.slice(0,2) === "ad"){
//             history.push('/')
//         }
//         else history.push('/')
//     }
//     return(
//         <div className="form">

//             <div className="form-group">
//             <h3>Login</h3>
//                 <input 
//                     type="text"
//                     placeholder="Username" 
//                     onChange={changeData}/>

//                 <div className="khoang-cach"></div>

//                 <input
//                     type="password"
//                     color="lightBlue"
//                     size="lg"
//                     outline={true}
//                     placeholder="Password" />

//                 <div className="khoang-cach"></div>

//                 <button
//                     onClick={login}>
//                     Đăng nhập
//                 </button>

//                 <button className="button">
//                     Trang chủ
//                 </button>
//             </div>

//             </div>
//     )
// }


import React from 'react';


import { useHistory, Link } from "react-router-dom";
import Header from '../Components/Header';

export default function Login() {

    const history = useHistory();
    let type = null;
    let user;

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        user = data.get('userName')


        // // eslint-disable-next-line no-console
        // console.log({
        //     userName: data.get('userName'),
        //     password: data.get('password'),
        // });

        //gui thong tin dang nhap len api
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "username": data.get('userName'),
            "password": data.get('password')
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3008/login", requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result); 
                type = result;

                if (dangnhap()) {
                    history.push("/")
                    window.location.reload();
                }
            })
            .catch(error => console.log('error', error));

    };

    const dangnhap = () => {
        if (type.result == null) alert("Thông tin đăng nhập không đúng!");
        localStorage.setItem("token", type.result.token);
        let element = type.result.data.map((data) => {
            localStorage.setItem("type", data.loaitk);
            localStorage.setItem("name", data.name);
            localStorage.setItem("user", user);
            return true;
        });
        return element;
    }



    return (
        <div>
            <Header />
            <div className="form-signin-wrap ">
                <form className="form-signin" onSubmit={handleSubmit}>
                    <div className="form-signin-header">Đăng Nhập</div>
                    <div className="form-signin-login">
                        <input type="text" id ="userName"className="form-signin-input" placeholder="Tên đăng nhập" name="userName" maxLength="128"  />
                        <input type="password" id="password" className="form-signin-input" placeholder="Mật khẩu" name="password" maxLength="128"  />
                        <button type="submit" className="form-signin-btn btn btn-primary" >Đăng nhập</button>
                    </div>
                    <div className="form-signin-footer text-center">
                        <span>Nếu bạn chưa có tài khoản &nbsp;</span>
                        <Link to="/signin" className="primary-color">Đăng ký</Link>
                    </div>
                </form>
            </div>
            {/* <ThemeProvider theme={theme}s>
                <Container component="main" maxWidth="xs" className="form-signin ">
                    <CssBaseline/>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        {/* <Avatar sx={{ m: 2, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>}
                        <Typography component="h1" variant="h3" marginTop="20px">
                            Đăng nhập
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="userName"
                                label="Tên đăng nhập"
                                name="userName"
                                autoFocus
                                
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Mật khẩu"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Đăng nhập
                            </Button>

                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={dangki}
                            >
                                Đăng kí
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider> */}
        </div>
    );
}