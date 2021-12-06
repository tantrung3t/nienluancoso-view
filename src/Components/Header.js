import React from "react";

import { useHistory } from "react-router";


import Chudequansu from "./Chudequansu";
import Chudekhoahoc from "./Chudekhoahoc";
import Chudethethao from "./Chudethethao";
import Chudegiaitri from "./Chudegiaitri";
import Chudecongnghe from "./Chudecongnghe";



import './Header.css';
import { Link } from "react-router-dom";



export default function Header() {
    const history = useHistory();



    let elementUser;
    const onLogout = () => {
        localStorage.removeItem('name')
        localStorage.removeItem('user')
        localStorage.removeItem('type')
        localStorage.removeItem('token')
        history.push('/')
        window.location.reload()
    }

    const tacgia =
        <div className="dropdown">
            <div className="title-div">
                {localStorage.getItem('name')}
            </div>

            <div className="dropdown-content">
                <li className="link" onClick={() => {
                    history.push("/themtintuc")
                }}>
                    Đăng tin
                </li>
                <li className="link" onClick={() => {
                    history.push("/themchude")
                }}>
                    Thêm chủ đề
                </li>
                <li className="link" onClick={() => {
                    history.push("/chinhsuabaiviet")
                }}>
                    Bài viết của tôi
                </li>
                <li className="link" onClick={() => {
                    history.push("/chudecuatoi")
                }}>
                    Chủ đề của tôi
                </li>
                <li className="link" onClick={onLogout}>
                    Đăng xuất
                </li>

            </div>
        </div>

    const quantrihethong = <div className="dropdown">
        <div className="title-div">
            {localStorage.getItem('name')}
        </div>

        <div className="dropdown-content">
            <li className="link" onClick={() => {
                history.push("/capnhattaikhoan")
            }}>
                Cập nhật tài khoản
            </li>
            <li className="link" onClick={onLogout}>
                Đăng xuất
            </li>

        </div>
    </div>

    const quantribaiviet = <div className="dropdown">
        <div className="title-div">
            {localStorage.getItem('name')}
        </div>

        <div className="dropdown-content">
            <li className="link" onClick={() => {
                history.push("/duyettin")
            }}>
                Duyệt tin
            </li>
            <li className="link" onClick={() => {
                history.push("/duyetchude")
            }}>
                Duyệt chủ đề
            </li>
            <li className="link" onClick={onLogout}>
                Đăng xuất
            </li>

        </div>
    </div>

    const chuaduyet = <div className="dropdown">
        <div className="title-div">
            Tài khoản chưa được duyệt
        </div>

        <div className="dropdown-content">

            <li className="link" onClick={onLogout}>
                Đăng xuất
            </li>

        </div>
    </div>

    if (localStorage.getItem('user') == null) {

        elementUser = <div className="title-div" onClick={() => {
            history.push("/login")
        }}>
            ĐĂNG NHẬP
        </div>
    }
    else {
        if (localStorage.getItem('type') === "ad") elementUser = quantrihethong
        if (localStorage.getItem('type') === "qt") elementUser = quantribaiviet
        if (localStorage.getItem('type') === "tg") elementUser = tacgia
        if (localStorage.getItem('type') === "cd") elementUser = chuaduyet
    }

    return (
        <div className="navbar align-center">
            <div className="dropdown-left">
                <Link className="" to="/">
                    <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDc1LjM1MiA3NS4zNTEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPHBhdGggZD0iTTI0LjczMyw1MS4yNDJjMi4wNyw0LjM5Nyw1LjE2Miw4LjYwMiw5LjIwOCwxMi41MTZjLTguMDI2LTEuMTcyLTE0Ljg0MS01LjkzMy0xOC43OTgtMTIuNjE2TDI0LjczMyw1MS4yNDJ6ICAgIE0zMy43ODcsMTEuODA2Yy03LjczNiwxLjE2OC0xNC4zNyw1LjcxOS0xOC4zNSwxMi4xMThsOS4yOTksMC4xMDJDMjYuNzgsMTkuNzE2LDI5LjgyNiwxNS42MTQsMzMuNzg3LDExLjgwNnogTTM2LjkwMywyNC4xNTYgICBsMC4xMzgtMTIuNjM3Yy0wLjAwNCwwLTAuMDIxLDAtMC4wMjgsMGMtNC40NDUsMy44OC03LjgyNyw4LjA3OS0xMC4wODEsMTIuNTI1TDM2LjkwMywyNC4xNTZ6IE0xNS40MzksMjguMDgxbC0xLjgzNi0wLjAxNyAgIGwtMS44MTQtMC4wMjNsLTAuMTQzLDEzLjEyNUw0LjI5NywyNy45NjFMMi4yNDUsMjcuOTRsLTIuMDQ0LTAuMDIyTDAsNDYuNTkybDEuODI2LDAuMDI3bDEuODE4LDAuMDE3bDAuMTQ1LTEzLjQ2M0wxMS4zNSw0Ni43MiAgIGwxLjk0OCwwLjAyMmwxLjk0MywwLjAyM0wxNS40MzksMjguMDgxeiBNMzIuOTA0LDMxLjU4NmwwLjAxNi0xLjY2NWwwLjAyMS0xLjY1NGwtMTMuNzUzLTAuMTQ3bC0wLjIwMSwxOC42ODRsMTQuMTgsMC4xNDggICBsMC4wMTktMS42NmwwLjAxNi0xLjY1NmwtMTAuMjc1LTAuMTA5bDAuMDUxLTQuODc1bDkuMTM2LDAuMDk4bDAuMDE2LTEuNjAybDAuMDE2LTEuNjEybC05LjEzNC0wLjA5NmwwLjA0NC0zLjk2MUwzMi45MDQsMzEuNTg2eiAgICBNNTEuNTQ4LDQyLjAzM0w1MS41NDgsNDIuMDMzbC0yLjU2LTEzLjU5MWwtMi4wODMtMC4wMjJsLTIuMDczLTAuMDI2bC0yLjgxNCwxMy42NDhsLTIuOTc1LTEzLjcwN2wtMi4wMjgtMC4wMjNsLTIuMDI5LTAuMDI0ICAgbDQuOTk3LDE4Ljc0bDEuODUzLDAuMDIxbDEuODU5LDAuMDIzbDMuMDkxLTE0LjY4NWwyLjg0MiwxNC43NDNsMS44NjMsMC4wMjdsMS44NTEsMC4wMTlsNS40MDEtMTguNjI5bC0xLjk3NC0wLjAyMWwtMS45NzMtMC4wMjEgICBMNTEuNTQ4LDQyLjAzM3ogTTM5LjA0NywxMS41NDJjLTAuMDA5LDAtMC4wMjEsMC0wLjAyNywwbC0wLjEzNiwxMi42MzVsOS45NzksMC4xMDVDNDYuNjk4LDE5Ljc4OCw0My40MTEsMTUuNTE5LDM5LjA0NywxMS41NDJ6ICAgIE02MC4zNTksMjQuNDAzYy0zLjg0NC02LjQ3OS0xMC4zNzctMTEuMTY5LTE4LjA5Ni0xMi41MDZjMy44ODcsMy44ODksNi44NDMsOC4wNTQsOC43OTYsMTIuNDA4TDYwLjM1OSwyNC40MDN6IE00MSw2My44MzMgICBjOC4wNDUtMC45OTksMTQuOTU3LTUuNjEzLDE5LjA2Ny0xMi4yMTVsLTkuNTkyLTAuMTAxQzQ4LjMxMyw1NS44Nyw0NS4xMjQsNjAuMDA1LDQxLDYzLjgzM3ogTTQ4LjI2NSw1MS40OTVsLTkuNjczLTAuMTA1ICAgbC0wLjEzMSwxMi4wNjdDNDIuNzE4LDU5Ljc1LDQ2LjAwOSw1NS43MjYsNDguMjY1LDUxLjQ5NXogTTc0LjAyNSwzOC4zOGMtMC45MTMtMC44MDUtMi43MTUtMS41MjktNS40MjktMi4xNTggICBjLTEuODY2LTAuNDQ4LTMuMDg5LTAuODE1LTMuNjU5LTEuMTMyYy0wLjU4Mi0wLjMwNi0wLjg3NC0wLjc0My0wLjg2Ny0xLjMwNmMwLjAwNS0wLjc2OSwwLjI5Mi0xLjM5MywwLjg2LTEuODE5ICAgYzAuNTU5LTAuNDE0LDEuMzM5LTAuNjI2LDIuMzI2LTAuNjEzYzEuMTQ0LDAuMDA5LDIuMDY5LDAuMjg1LDIuNzc2LDAuODA3YzAuNzAzLDAuNTI0LDEuMDg2LDEuMjI4LDEuMTQxLDIuMTJsMy44MDEsMC4wNDcgICBjLTAuMTIxLTEuODgxLTAuODM1LTMuMzY2LTIuMTM2LTQuNDgyYy0xLjI5OC0xLjExNy0yLjk5Ny0xLjY4NS01LjA5MS0xLjcwNWMtMi4yMzMtMC4wMjUtNC4wMTUsMC40OS01LjM0LDEuNTI3ICAgYy0xLjMyMSwxLjA0OS0xLjk5MiwyLjQ5OC0yLjAxLDQuMzAxYy0wLjAxOSwxLjYxOSwwLjQ2MywyLjgxNSwxLjQ0MSwzLjU5M2MwLjk5NCwwLjc3MywyLjk3LDEuNTExLDUuOTIyLDIuMTk5ICAgYzEuNjA1LDAuMzc0LDIuNjUsMC43NDEsMy4xNDMsMS4wNjdjMC40OTMsMC4zMzgsMC43NDIsMC44NTIsMC43MzUsMS41NjFjLTAuMDA3LDAuNzE0LTAuMzY1LDEuMjU5LTEuMDY4LDEuNjU2ICAgYy0wLjcwNywwLjM5My0xLjY3NCwwLjU4NC0yLjkyNCwwLjU3Yy0xLjIwOS0wLjAxNC0yLjE1My0wLjI4OC0yLjgyMi0wLjgzYy0wLjY3Ny0wLjUzNi0xLjAyMy0xLjI5Ni0xLjA1Ni0yLjI5OGwtMy43NTktMC4wMzggICBjMC4wNjgsMi4wMTYsMC43NjYsMy41NzYsMi4wODUsNC42ODVjMS4zMTgsMS4xMTgsMy4xNjEsMS42OCw1LjUyLDEuNzAyYzIuMzYxLDAuMDIyLDQuMjI3LTAuNDYxLDUuNjIxLTEuNDgyICAgYzEuMzk2LTEuMDE4LDIuMDk2LTIuNCwyLjExNC00LjE1NkM3NS4zOCw0MC40NTIsNzQuOTMxLDM5LjE3OCw3NC4wMjUsMzguMzh6IE0zNi40ODIsNjMuNDIybDAuMTMxLTEyLjA1NGwtOS42NzMtMC4xMDQgICBDMjkuMTEzLDU1LjUzOSwzMi4zMTIsNTkuNjMxLDM2LjQ4Miw2My40MjJ6IiBmaWxsPSIjZmZmZmZmIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPC9nPjwvc3ZnPg=="
                        alt="logo" height="47px" />
                </Link>
            </div>

            <div>


                <div className="dropdown">
                    <Link to="/khoahoc" className="title-div">
                        KHOA HỌC
                    </Link>

                    <div className="dropdown-content">
                        <Chudekhoahoc />
                    </div>
                </div>

                <div className="dropdown">
                    <Link to="/quansu" className="title-div" >
                        QUÂN SỰ
                    </Link>
                    <div className="dropdown-content">
                        <Chudequansu />
                    </div>
                </div>

                <div className="dropdown">
                    <Link to="/thethao" className="title-div">
                        THỂ THAO
                    </Link>
                    <div className="dropdown-content">
                        <Chudethethao />
                    </div>
                </div>

                <div className="dropdown">
                    <Link to="/giaitri" className="title-div">
                        GIẢI TRÍ
                    </Link>

                    <div className="dropdown-content">
                        <Chudegiaitri />

                    </div>
                </div>


                <div className="dropdown">
                    <Link to="/congnghe" className="title-div">
                        CÔNG NGHỆ
                    </Link>

                    <div className="dropdown-content">
                        <Chudecongnghe />

                    </div>
                </div>
            </div>


            <div className="dropdown-right">

                {elementUser}
            </div>


        </div>
    )
}
