import { Component } from "react"

import "./root.css";

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


export default class Themtintuc extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,

            "machude": "",
            "src": "",
            "title": "",
            "description": "",
            "content": "",
            "count": 1,
            response: {
                "result": [
                ]
            }
        }
    }

    componentDidMount() {
        this.loadData("congnghe");
    }

    uploadData = () => {

        this.uploadImage();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "tacgia": localStorage.getItem('user'),
            "machude": this.state.machude,
            "src": this.state.src,
            "title": this.state.title,
            "description": this.state.description,
            "content": this.state.content
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3008/tintuc/add", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        alert("Gửi thành công");
        window.location.reload()
    }

    uploadImage = () => {
        var formData = new FormData();
        formData.append('file', this.state.file);
        fetch('http://localhost:3008/upload', {
            method: 'POST',
            body: formData
        })
            .then((response) => response)
            .then((result) => {
                console.log('Success:', result);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    loadData = (chude) => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:3008/header/" + chude + "/list", requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({ response: result })

                //de khi chon du lieu tu chu de ma bai viet khong bi null khi khong chon
                this.setState({ machude: result.result[0].machudebaiviet })
            })
            .catch(error => console.log('error', error));
    }

    handlechange_machude = (event) => {
        this.setState({
            machude: event.target.value
        })
        console.log(event.target.value)
    }


    title = (input) => {
        this.setState({
            title: input.target.value
        })
    }

    onInputChange = (e) => {
        console.log(e.target.files);
        this.setState({
            src: "http://localhost:3008/upload/" + e.target.files[0].name
        })
        this.setState({
            file: e.target.files[0]
        })
    }

    description = (input) => {
        this.setState({
            description: input.target.value
        })
    }

    content = (input) => {
        this.setState({
            content: input.target.value
        })
    }

    onEditorChange(evt) {
        this.setState({
            content: evt.editor.getData()
        });
    }

    send = () => {
        if (this.state.src === "" || this.state.content === "" || this.state.title === "" || this.state.description === "") alert("Vui lòng nhập đầy đủ các trường!")
        else this.uploadData()
    }


    //lam thay doi state de load data chon chu de
    chonchudechinh = (event) => {
        // this.setState({ count: this.state.count + 1 })
        var string;

        console.log(event.target.value)

        if (event.target.value === "qs") string = "quansu"
        if (event.target.value === "kh") string = "khoahoc"
        if (event.target.value === "gt") string = "giaitri"
        if (event.target.value === "cn") string = "khoahoc"
        if (event.target.value === "tt") string = "thethao"

        this.loadData(string)
    }

    //dua data vao chon chu de bai viet
    loadData_chude = () => {
        let element = this.state.response.result.map((data) => {
            let turn = '';
            turn = <option
                key={data.machudebaiviet}
                value={data.machudebaiviet}>
                {data.tenchudechinh}
            </option>
            return turn;
        });
        return element;
    }


    render() {
        return (
            <div>
                <div className="form-create-news-wrap" >
                    <div className="form-create-news" >
                        <div className="create-news-header">Tạo bài viết</div>
                        <div className="flex-wrap m-2">
                            <div className="flex-left mx-3">Tiêu đề </div>
                            <input
                                type="text"
                                className="create-news create-news-title"
                                placeholder="Nhập tiêu đề"
                                onChange={this.title}
                            ></input>
                        </div>
                        <div className="flex-wrap m-2">
                            <div className="flex-left mx-3">Chủ đề  chính</div>
                            <select className="create-news-theme" onChange={this.chonchudechinh}>
                                <option value="cn">Công nghệ</option>
                                <option value="gt">Giải trí</option>
                                <option value="kh">Khoa học</option>
                                <option value="qs">Quân sự</option>
                                <option value="tt">Thể thao</option>
                            </select>
                        </div>
                        <div className="flex-wrap m-2">
                            <div className="flex-left mx-3">Chủ đề con</div>
                            <select className="create-news-theme" onChange={this.handlechange_machude}>
                                {this.loadData_chude()}
                            </select>
                        </div>

                        <div className="flex-wrap m-2">
                            <div className="flex-left mx-3">Ảnh đại diện</div>
                            <input
                                type="file"
                                className="create-news create-news-img"
                                onChange={this.onInputChange}
                            ></input>
                        </div>
                        <div className="flex-wrap m-2">
                            <div className="flex-left mx-3">Mô tả ngắn nội dung</div>
                            <textarea
                                type="text"
                                className="create-news create-news-title"
                                placeholder="Nhập mô tả"
                                onChange={this.description}
                            ></textarea>
                        </div>

                        <div className="flex-wrap m-2 flex-top">
                            <div className="flex-left mx-3">Nội dung </div>
                            <div className="App create-news-content">
                                {/* <div className="Container" dangerouslySetInnerHTML={{ __html: this.state.content }}></div>
                    <div>{this.state.content}</div> */}
                                <CKEditor
                                    editor={ClassicEditor}
                                    // data="<p>Hello from CKEditor 5!</p>"

                                    onReady={(editor) => {
                                        // You can store the "editor" and use when it is needed.
                                        // console.log("Editor is ready to use!", editor);
                                        editor.editing.view.change((writer) => {
                                            writer.setStyle(
                                                "height",
                                                "400px",
                                                editor.editing.view.document.getRoot()
                                            );

                                        });
                                    }}

                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        this.setState({ content: data })
                                        // console.log( { event, editor, data } );
                                    }}
                                />
                            </div>
                        </div>

                        <div className="m-3">
                            <button type="button"
                                className="btn-create mx-2 btn btn-primary"
                                onClick={this.send}
                            >Đăng bài</button>
                            {/* <button type="reset" className="btn-create mx-2 btn btn-primary" onClick={this.clear}>Hủy bỏ</button> */}
                        </div>
                    </div>
                </div>

                {/* <div>
                    <div >
                        <div >Chọn chủ đề</div>
                        <select onChange={this.chonchudechinh}>
                            <option value="cn">Công nghệ</option>
                            <option value="gt">Giải trí</option>
                            <option value="kh">Khoa học</option>
                            <option value="qs">Quân sự</option>
                            <option value="tt">Thể thao</option>
                        </select>
                    </div>
                    <div>Mã chủ đề</div>
                    <select onChange={this.handlechange_machude}>
                        {this.loadData_chude()}
                    </select>
                    <div>Tiêu đề bài viết</div>
                    <input type="text" onChange={this.title}></input>
                    <div>Hình ảnh</div>
                    <div>
                        <input type="file" onChange={this.onInputChange}></input>
                    </div>
                    <div>Mô tả ngắn nội dung</div>
                    <input type="text" onChange={this.description}></input>
                    <div>Nội dung</div>
                    <div className="App">
                        {/* <div className="Container" dangerouslySetInnerHTML={{ __html: this.state.content }}></div>
                    <div>{this.state.content}</div> }
                        <CKEditor
                            editor={ClassicEditor}
                            // data="<p>Hello from CKEditor 5!</p>"

                            onReady={(editor) => {
                                // You can store the "editor" and use when it is needed.
                                // console.log("Editor is ready to use!", editor);
                                editor.editing.view.change((writer) => {
                                    writer.setStyle(
                                        "height",
                                        "400px",
                                        editor.editing.view.document.getRoot()
                                    );

                                });
                            }}


                            onChange={(event, editor) => {
                                const data = editor.getData();
                                this.setState({ content: data })
                                // console.log( { event, editor, data } );
                            }}
                        />
                    </div>
                    <button onClick={this.send}>Gửi</button>
                    <br />
                </div> */}
            </div>
        )
    }
}