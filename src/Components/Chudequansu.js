import { Component } from "react";
import ListItem from "./ListItem";

export default class Chudequansu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: {
              "result": [
              ]
            }
          };
    }

    // componentDidUpdate(){
    //   this.loadData();
    // }


    componentDidMount() {
      this.loadData();
    }
  
    loadData = () => {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("http://localhost:3008/header/quansu/list", requestOptions)
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
                  chude = "quansu"
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
