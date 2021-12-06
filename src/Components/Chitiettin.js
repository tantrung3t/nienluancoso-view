

import { Component } from "react";

import './Chitiettin.css';


export default class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
          response: {
            "result": [
            ]
          }
        };
      }
    
      componentDidMount() {
        this.loadData();
      }
    
      loadData = () => {
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        
        fetch("http://localhost:3008/home/detail/" + this.props.id, requestOptions)
          .then(response => response.json())
          .then(result => {
            this.setState({response: result})
          })
          .catch(error => console.log('error', error));
      }

    render() {
        return(
            <div className="body-detail">
                <div className="image-detail">
                <img src={this.state.response.result.src} alt="detail"/>
                </div>
                <h1 className="title-detail">{this.state.response.result.title}</h1>
                
                {/* <h1 className="content-detail">{this.state.response.result.content}</h1> */}


                {/* khi CSDL duoc luu tu SKEditor dung cai duoi de hien thi duoc theo dinh danh html */}
                <div className="Container" dangerouslySetInnerHTML={{__html: this.state.response.result.content}}></div>
                <div className="my-3 row block-separation separation-color"></div>
                <h4>Người viết: {this.state.response.result.name}</h4>
                <div className="my-3 row block-separation separation-color"></div>
            </div>
        )
    }
}