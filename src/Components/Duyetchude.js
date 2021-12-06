import React, { Component } from "react";


export default class Duyetchude extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: {
                "result": [
                ]
            }
        }
    }

    loadData = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
        };

        fetch("http://localhost:3008/duyetchude/list_status", requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({ response: result })
                console.log(result)
            })
            .catch(error => console.log('error', error));
    }

    componentDidMount() {
        this.loadData();
    }

    delete_News = (index, id, ghichu) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "id": id,
            "ghichu": ghichu
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3008/duyetchude_xoa/", requestOptions)
            .then(response => response.json())
            .then(result => {
                //   this.setState({response: result}) 
                console.log(result)

            })
            .catch(error => console.log('error', error));


        //them doan nay de hien thi danh sach duoc xoa muot hon
        var arrlist = this.state.response;
        console.log(arrlist)
        arrlist.result.splice(index, 1)
        this.setState({ response: arrlist })

        //sao khi xoa cap nhat la ds duyet tin
        // this.loadData(); 



    }

    agree_News = (index, id) => {

        var requestOptions = {
            method: 'PUT',
            redirect: 'follow',
        };

        fetch("http://localhost:3008/duyetchude_duyet/" + id, requestOptions)
            .then(response => response.json())
            .then(result => {
                //   this.setState({response: result}) 
                console.log(result)

            })
            .catch(error => console.log('error', error));


        //them doan nay de hien thi danh sach duoc xoa muot hon
        var arrlist = this.state.response;
        console.log(arrlist)
        arrlist.result.splice(index, 1)
        this.setState({ response: arrlist })

        //sao khi xoa hoac duyet cap nhat lai ds duyet tin
        // this.loadData();
    }



    show_view = () => {
        let list = this.state.response.result.map((item, index) =>
            <ListItem key={index}
                index={index}
                id={item.machudebaiviet}
                tenchude={item.tenchude}
                tenchudechinh={item.tenchudechinh}
                delete={(index, id, ghichu) => { this.delete_News(index, id, ghichu) }}
                agree={(index, id) => { this.agree_News(index, id) }}
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

    let data = "";
    const buttonDelete = () => { 
        if(data === "") alert("Hãy nhập lí do không duyệt chủ đề này vào ô ghi chú!")
        else{
            props.delete(props.index, props.id, data);
        }
    }
    const buttonAgree = () => {
        props.agree(props.index, props.id);
    }

    const ghiChu = (e) => {
        data = e.target.value
    }

    return (
        <div className="row manager-page">
            <div className="news-wrap m-2">
                <div className="news-description mx-1">
                    <div className="news-title my-1">
                        Tên chủ đề: {props.tenchudechinh}
                    </div>
                    <div>
                        Thuộc chủ đề: {props.tenchude}
                    </div>
                    
                </div>
            </div>
            <button onClick={buttonAgree} type="button" className="btn-manager mx-2 btn btn-primary">Duyệt</button>
            <button onClick={buttonDelete} type="button" className="btn-manager mx-2 btn btn-primary">Xóa</button>
            <input onChange={ghiChu} type="text" placeholder="Ghi chú" name="ghichu" className="manager-note mr-2"/>
            <div className="my-3 row block-separation separation-color"></div>
        </div>
    )
}