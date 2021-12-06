
import { Component } from "react";
import News  from "./News";

export default class Trangchu extends Component {
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

    //   componentDidUpdate(prevProps, prevState){
    //     if(prevState.reload !== this.state.reload) {
    //       this.loadData()
    //   }
    //   }
      


      componentDidMount() {
        this.loadData();
      }
    
      loadData = (load) => {
          var requestOptions = {
            method: 'GET',
            redirect: 'follow',
          };
          
          fetch("http://localhost:3008/home/list", requestOptions)
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