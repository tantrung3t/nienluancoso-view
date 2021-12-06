
import { Component } from "react"

export default class Chudecuatoi extends Component {
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

        fetch("http://localhost:3008/chudecuatoi/" + localStorage.getItem('user'), requestOptions)
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
                tenchude={item.tenchude}
                tenchudechinh={item.tenchudechinh}
                status={item.trangthai}
                ghichu={item.ghichu}
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

    if (props.status === 1) {
        trangthai = "Chưa duyệt"
        ghichu = ""
    }
    if (props.status === 3 && props.ghichu !== "") {
        trangthai = "Bị từ chối"
        ghichu = "*Ghi chú: " + props.ghichu
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
                    <div></div>
                    <h5>{ghichu}</h5>
                </div>
                
            </div>
            
            <h3 className="mx-2">{trangthai}</h3>
            <div className="my-3 row block-separation separation-color"></div>
        </div>
    )
}