import { Component } from "react";
import ListItem from "./ListItem";

export default class Chudegiaitri extends Component {
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
      
      fetch("http://localhost:3008/header/giaitri/list", requestOptions)
        .then(response => response.json())
        .then(result => {
          this.setState({response: result})
        })
        .catch(error => console.log('error', error));
    }

    renderList = () => {
        let element = this.state.response.result.map((data) => {
          let turn = '';
          turn = <ListItem 
          key = {data.machudebaiviet}
                  chude = "giaitri"
                  machudebaiviet = {data.machudebaiviet}
                  tenchudechinh={data.tenchudechinh}
        />
          return turn;
        });
    
        return element;
      }

    render() {
        return(
            <div>
                {this.renderList()}
            </div>
        )
    }
}
