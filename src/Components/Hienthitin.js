import { Component } from "react";
import News  from "./News";

export default class Hienthitin extends Component {
    constructor(props) {
        super(props);
        this.state = {
          reload : "",
          response: {
            "result": [
            ]
          }
        };
      }

      // componentDidUpdate(prevProps, prevState){
      //   if(prevState.reload !== this.state.reload) {
      //     this.loadData()
      // }
      // }
      


      componentDidMount() {
        this.loadData();
      }
    
      loadData = (load) => {
          var requestOptions = {
            method: 'GET',
            redirect: 'follow',
          };
          
          fetch("http://localhost:3008/tintuc/" + this.props.machudebaiviet, requestOptions)
            .then(response => response.json())
            .then(result => {
                  this.setState({response: result})
            })
            .catch(error => console.log('error', error));

      }

      componentWillUnmount() {
        this.setState = () =>{
            this.reload = true;
        };

    }
    
      renderNews = () => {
        
        if(this.state.response.result == null){
            return <h1>Không có tin tức về chủ đề này</h1>
        }
        let element = this.state.response.result.map((news) => {
          let turn = '';
          turn = <News
            key={news.id}
            id={news.id}
            src={news.src}
            title={news.title}
            description={news.description}
          />
          return turn;
        });
        return element;
      }
    
      render() {
        return (
          <div>
            <div className="body">
              {this.renderNews()}
            </div>
          </div>
        );
      }
}