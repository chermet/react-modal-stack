import React from 'react'

class ModalStack extends React.Component{

  constructor(props) {
    super(props);
    this.state = {};
    this.onFadeClick = this.onFadeClick.bind(this);
    this.getStackHolderStyle = this.getStackHolderStyle.bind(this);
    this.getFadeStyle = this.getFadeStyle.bind(this);
    this.getModalZIndex = this.getModalZIndex.bind(this);
  };

  onFadeClick(e){
    this.props.onFadeClick(e);
  }

  getStackHolderStyle(){
    if(this.props.stack.length > 0){
      return {display: 'block'}
    }
    return {display: 'none'}
  }

  getFadeStyle(){
    const { zIndexStep, zIndexStart }= this.props;
    const zIndex = (this.props.stack.length - 1) * zIndexStep + zIndexStart;
    return{zIndex: zIndex}
  }

  getModalZIndex(index){
    const {zIndexStep, zIndexStart } = this.props;
    if(this.props.stack.length - 1 === index){
      return zIndexStep * index + 1 + zIndexStart;
    }else{
      return zIndexStep * index + zIndexStart;
    }
  }

  render(){
    const zIndexStep = this.props.zIndexStep;
    const modals = this.props.stack.map((item, index)=>{
      return(
        <div  key={"k" + index} className={this.props.className + "-modal"}
              style={{  zIndex: this.getModalZIndex(index),
                        position:'absolute'}}>
        {item}
      </div>);
    });
    return (
      <div style={this.getStackHolderStyle()} className={this.props.className}>
        <div className="modal-fade" style={this.getFadeStyle()} onClick={this.onFadeClick}></div>
        {modals}
      </div>)
  };
};


ModalStack.defaultProps = {
  stack: [],
  onFadeClick: ()=>{},
  zIndexStart: 0,
  zIndexStep: 1,
  className : "react-modal-stack-holder"
}

ModalStack.propTypes = {
  className: React.PropTypes.string,
  stack: React.PropTypes.arrayOf(React.PropTypes.object),
  onFadeClick: React.PropTypes.func,
  zIndexStart: React.PropTypes.number,
  zIndexStep: React.PropTypes.number
};

export default ModalStack;
