import React, { Component } from 'react'
import '../../materialize.css';
import loading from '../../loading.gif'

export class Widget extends Component {
  state = {
    head : [],
    body : [],
    svg : '',
    text: '',
    showContent: true,
    load: true,
  }
  
  componentDidMount(){
    // console.log(this.props.contentType)
    if (this.props.contentType === "table")
    {
      // idIs = this.props.uniqueID
      this.get("http://localhost:5000/table/?id="+this.props.uniqueID).then(res => {
      this.setState({head:res['head'],body:res['body'],load:false})
      //  console.log(this.state.head, this.state.body)
      }).catch(err => console.log(err));    
    } else if (this.props.contentType === "svg") {
      this.get("http://localhost:5000/svg/?id="+this.props.uniqueID).then(res => {
      this.setState({svg:res['svg'],load:false})
    // //  console.log(this.state.head, this.state.body)
    }).catch(err => console.log(err));
    } else if (this.props.contentType === "text") {
      this.get("http://localhost:5000/text/?id="+this.props.uniqueID).then(res => {
      // console.log(res['text'])
      this.setState({text:res['text'],load:false})
    // //  console.log(this.state.head, this.state.body)
    }).catch(err => console.log(err));
    }

  }

  async get(url) {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    });
    const resData = await response.json();
    return resData;
  }

  generateKey(){
    return `${ Math.random()}_${ new Date().getTime() }`;
  }

  clickEventHandler(Operation){
    if(Operation==="^") {
      const doesShow = this.state.showContent;
      this.setState({showContent:!doesShow})
    } else if (Operation==="X"){
      document.getElementById(this.props.uniqueID).remove();
    } else if (Operation==="/"){
      // let uniqueID = this.props.contentType;
      let container = document.getElementById(this.props.uniqueID)
      if (container.className===""){
        container.className= "container"
      } else {
      container.className= ""
      // console.log(container);
      }
      // console.log(container)
      // document.querySelector('.div.row.card').style.width = "1000px";
    }
  }

  render() {

    let load = null;
    if (this.state.load) load = <img src={loading} alt=""/>
    let content = null;
    if (this.props.contentType === 'table' && this.state.showContent === true){
      const tableHead = this.state.head.map(el => {
        return <th key={this.generateKey()}>{el}</th>
      })
  
      const tableBody = this.state.body.map(el => {
        let cell = []
        for(let key in el){
          cell.push(<td key={this.generateKey()}>{el[key]}</td>)
           //console.log(el[key])
        }
        return <tr key={this.generateKey()}>{cell}</tr>
      })
      // console.log(this.props.contentType);
      content = (
        <>
        {load}
            <table className="teal lighten-2 responsive-table centered striped"> 
              <thead>
                <tr>
                  {tableHead}
                </tr>
              </thead>
              <tbody>
                  {tableBody}
              </tbody>
            </table> 
        </> 
      )
    } else if (this.props.contentType === 'svg' && this.state.showContent === true){
      let svgcontent = this.state.svg;
      content = (<div className="center"> 
      {load}
      <div dangerouslySetInnerHTML={{__html: 
      svgcontent}}></div>
    </div>);
    } else if (this.props.contentType === 'text' && this.state.showContent === true){
      // let svgcontent = this.state.svg;
      content = (<>
      {load}
      <h3>{this.state.text}</h3>
      </>);
    }

    return (
      <div id={this.props.uniqueID} className="container post">
        <div className="row card yellow lighten-4"> 
          <h5 className="left" >Project files</h5>
          <div className=" secondary-content">
              <button onClick={()=>{this.clickEventHandler('^')}} className="btn waves-effect waves-light">^</button>
              <button onClick={()=>{this.clickEventHandler('/')}} className="btn waves-effect waves-light">/</button>
              <button onClick={()=>{this.clickEventHandler('X')}} className="btn waves-effect waves-light">X</button>
            </div>
        
            <div className="col s12 card">
             {content}
            </div>
</div>
      </div>
    )
  }
}

export default Widget;
