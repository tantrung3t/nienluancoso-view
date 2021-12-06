
import { Component } from "react"
import { Link } from 'react-router-dom';

export default class Chinhsuabaiviet extends Component {
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

        fetch("http://localhost:3008/chinhsuatin/" + localStorage.getItem('user'), requestOptions)
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

    show_view = () => {
        let list = this.state.response.result.map((item, index) =>
            <ListItem key={index}
                index={index}
                id={item.id}
                src={item.src}
                title={item.title}
                description={item.description}
                tenchude={item.tenchude}
                tenchudechinh={item.tenchudechinh}
                status={item.status}
                ghichu={item.ghichu}
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

    let trangthai = "Đã duyệt"
    let ghichu = ""

    if(props.status === 0){
        trangthai = "Chưa duyệt"
        ghichu = ""
    }
    if(props.status === 3 && props.ghichu !== "") {
        trangthai = "Bị từ chối"
        ghichu = "*Ghi chú: " + props.ghichu
    }

    return (
        <div className="row manager-page">
            <Link to={`/${props.id}`} className="news-wrap m-2 br">
                <img className="news-img mr-2" alt="img" src={props.src}></img>
                <div className="news-description mx-1">
                    <div className="news-title my-1">
                        {props.title}
                    </div>
                    <div className="news-summary my-1">
                        {props.description}
                    </div>
                    <div className="news-summary my-1">
                    Thuộc chủ đề: {props.tenchude} - {props.tenchudechinh}
                    </div>
                    <div>{ghichu}</div>
                </div>
            </Link>
            <h3 className="mx-2">{trangthai}</h3>
            <Link to={`/chinhsuabaiviet/${props.id}`}>
            <button type="button" className="mx-2 f-1 btn btn-primary">Sửa bài viết</button></Link>
            <div className="my-3 row block-separation separation-color"></div>
        </div>
    )
}