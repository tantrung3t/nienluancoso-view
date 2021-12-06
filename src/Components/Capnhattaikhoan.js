import React, { Component } from "react";

export default class Capnhattaikhoan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: {
                "result": [
                ]
            }
        }
    }

    componentDidMount() {
        this.loadData()
    }

    loadData = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
        };

        fetch("http://localhost:3008/taikhoan/list", requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({ response: result })
            })
            .catch(error => console.log('error', error));
    }



    duyetTaikhoan = (index, loai, user) => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "username": user,
            "loaitk": loai
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3008/taikhoan/duyet", requestOptions)
            .then(response => response.json())
            .then(result => {
                //   this.setState({response: result}) 
                console.log(result)

            })
            .catch(error => console.log('error', error));


        //them doan nay de hien thi danh sach duoc xoa muot hon
        var arrlist = this.state.response;
        arrlist.result.splice(index, 1)
        this.setState({ response: arrlist })

    }


    show_view = () => {
        let list = this.state.response.result.map((item, index) =>
            <ListItem key={index}
                index={index}
                id={item.id}
                username={item.username}
                name={item.name}
                phone={item.phone}
                duyet={(index, loai, user) => { this.duyetTaikhoan(index, loai, user) }}
            >
            </ListItem>
        );
        return list
    }


    render() {
        return (
            this.show_view()
        )
    }
}

function ListItem(props) {

    let data = "tg";

    const chon = (e) => {
        data = e.target.value;
        // props.chon(e.target.value, props.username)  
    }

    const duyet = () => {
        props.duyet(props.index, data, props.username);
    }

    return (
        <div className="row manager-page">
            <div className="news-wrap m-2">
                <div className="news-description mx-1">
                    <div className="news-title my-1">
                        Tên tài khoản: {props.username}
                    </div>
                    <div>
                        Tên: {props.name}
                    </div>
                    <div>
                        Số điện thoại: {props.phone}
                    </div>

                </div>
            </div>
            <div className="mx-2">
                <div className="my-2">Loại tài khoản</div>
                <select onChange={chon}>
                    <option value="tg">Tác giả</option>
                    <option value="qt">Quản trị nội dung</option>
                </select>
            </div>
            <button onClick={duyet} type="button" className="btn-manager mx-2 btn btn-primary">Duyệt</button>
            <div className="my-3 row block-separation separation-color"></div>
        </div>
    )
}