
import { Component } from "react"

import "./root.css";

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


export default class Chinhtietbaiviet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            "tenchude": "Phim",
            "tenchudechinh": null,
            "machude": null,
            "src": null,
            "title": null,
            "description": null,
            "content": null,
            "count": 1,
            response: {
                "result": [
                ]
            }
        }
    }

    componentDidMount() {
        this.loadData(this.props.id);
    }

    uploadData = () => {
        if (this.state.src !== null) this.uploadImage();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "id": this.props.id,
            "src": this.state.src,
            "title": this.state.title,
            "description": this.state.description,
            "content": this.state.content
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3008/chinhsuatin", requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        alert("Tin tức đẵ được cập nhật!")
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

    loadData = (id) => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:3008/suatin/" + id, requestOptions)
            .then(response => response.json())
            .then(result => {

                //hien thi thong tin khi load trang xong
                document.getElementById("title").value = result.result[0].title;
                document.getElementById("description").value = result.result[0].description;
                this.setState({ title: result.result[0].title })
                this.setState({ description: result.result[0].description })
                this.setState({ tenchude: result.result[0].tenchude })
                this.setState({ tenchudechinh: result.result[0].tenchudechinh })
                this.setState({ content: result.result[0].content })

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
        this.uploadData()
        console.log(this.state.title)
        console.log(this.state.src)
        console.log(this.state.description)
        console.log(this.state.content)
        console.log(this.state.file)
    }

    render() {
        return (

            <div>
                <div className="form-create-news-wrap" >
                    <form className="form-create-news" >
                        <div className="create-news-header">Sửa bài viết</div>
                        <div className="flex-wrap m-2">
                            <div className="flex-left mx-3">Tiêu đề </div>
                            <input
                                id="title"
                                type="text"
                                className="create-news create-news-title"
                                placeholder="Nhập tiêu đề"
                                onChange={this.title}
                            ></input>
                        </div>
                        <div className="flex-wrap m-2">
                            <div className="flex-left mx-3">Chủ đề  chính</div>
                            {this.state.tenchude} - {this.state.tenchudechinh}
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
                                id="description"
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
                                    data={this.state.content}

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
                            >Cập nhật</button>
                        </div>
                    </form>
                </div>
                {/* 
                <div>Chủ đề: {this.state.tenchude} - {this.state.tenchudechinh}</div>
                <div>Tiêu đề bài viết</div>
                <input id="title" type="text" onChange={this.title}></input>
                <div>Hình ảnh</div>
                <div>
                    <input id="src" type="file" onChange={this.onInputChange}></input>
                </div>
                <div>Mô tả ngắn nội dung</div>
                <input id="description" type="text" onChange={this.description}></input>
                <div>Nội dung</div>
                <div className="App">
                    {/* <div className="Container" dangerouslySetInnerHTML={{ __html: this.state.content }}></div>
                    <div>{this.state.content}</div> }
                    <CKEditor
                        editor={ClassicEditor}
                        data={this.state.content}

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


                <br />
                <br />
                <button onClick={this.send}>Cập nhât</button>
                <br /> */}
            </div>




        )
    }
}