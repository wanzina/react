import React,{Component} from 'react'
import List from "../../common/List/List";
import ReactSwipe from 'react-swipe';
import pubsub from 'pubsub-js';

class Home extends Component{
  state={
    list:[]
  };
  componentDidMount(){

    pubsub.publish('view_loading',true);

    fetch(
      `/data/index.data`
    ).then(
      res=>res.json()
    ).then(
      data=>{
        setTimeout(()=>{

          pubsub.publish('view_loading',false);

          this.setState({list:data});
        },1000)
      }
    )
  }
  render(){
    return (
      <div className="Home">
        <ReactSwipe
          className="carousel"
          swipeOptions={{
            continuous: true,
            auto: 1000,

          }}
        >
          <div style={{background:'#399','lineHeight':'150px'}}>PANE 1</div>
          <div style={{background:'#393','lineHeight':'150px'}}>PANE 2</div>
          <div style={{background:'#939','lineHeight':'150px'}}>PANE 3</div>
        </ReactSwipe>

        <List list={this.state.list} dataName="home"/>

      </div>
    )
  }
}
export default Home;