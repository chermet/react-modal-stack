import React from 'react';
import { render } from "react-dom";
import ModalStack from "./react-modal-stack";
import Highlight from "react-highlight";
//import 'bootstrap/scss/bootstrap.scss';
import './styles/app.scss';
import './styles/plates.scss';
import './styles/inputs.scss';
import './styles/buttons.scss';
import "./styles/react-modal-stack.scss";
import "./styles/default.scss";


class Root extends React.Component{
  constructor(props){
    super(props);
    this.state={
      openModals:[]
    };

    this.pushModal = this.pushModal.bind(this);
    this.popModal = this.popModal.bind(this);
    this.onModalFadeClick = this.onModalFadeClick.bind(this);
    this.createModal = this.createModal.bind(this);
    this.modals = []

    for(let i=1; i<=4; i++){
      const modal = this.createModal(i);
      this.modals.push(modal);
    }
  };

  createModal(index){
    return(
      <div className={"modal-" + index} key={"m-" + index}>
        <div className="modal-header">
          {"Modal " + index}
        </div>
        <div className="modal-content">
        </div>
        <div className="modal-actions">
          <div className="modal-action">
            <button className="modal-btn-one-more" onClick={this.pushModal}>One More</button>
          </div>
          <div className="modal-action">
            <button className="modal-btn-close" onClick={this.popModal}>Close</button>
          </div>
        </div>
      </div>
    )

  }

  pushModal(e){
    e.stopPropagation();
    const srcIndex = this.state.openModals.length;
    if(srcIndex < this.modals.length){
      const nextOpenModals = this.state.openModals.slice();
      nextOpenModals.push(this.modals[srcIndex]);
      this.setState({openModals: nextOpenModals})
    }
  };

  popModal(e){
    e.stopPropagation();
    const nextOpenModals = this.state.openModals.slice();
    nextOpenModals.pop();
    this.setState({openModals: nextOpenModals});
  }


  onModalFadeClick(e){
    this.popModal(e)
  }

  render(){
    return(
      <div>

        <div className="plate-0">
          <h3>A Demo Page for react-modal-stack</h3>
          <div>
            This demo is interactive, please use inputs below.
          </div>
        </div>
        <div className="plate-1">
          <div className="btn-1">
            <div className="btn-1-in" onClick={this.pushModal}>Create modal</div>
          </div>
        </div>

        <div className="modal-portal">
          <ModalStack stack={this.state.openModals} onFadeClick={this.onModalFadeClick}/>
        </div>





        <div className="plate-3">
          <div className="plate-4">
            <h4>Usage:</h4>
            <div>
              ...npm is on the way...
            </div>
            <div>
              From dist folder, copy react-modal-stack.js into your project.<br/>
              To run demo locally, see <a href="https://github.com/3-4rm/react-modal-stack">readme</a><br/>
              The entire list of props see below example.
            </div>
          </div>
<Highlight>{`
//some JavaScript code sample...
import ModalStack from './react-modal-stack'

//  ...

// Last child of your root component:
//...
  <div className="modal-portal">
    <ModalStack stack={this.state.modals}/>
  </div>
//...
`}</Highlight>
        </div>


        <div className="plate-6">
        <h4>List of props:</h4>
        <table className="props-table">
          <tbody>
            <tr>
              <td>stack </td>
              <td>Some description goes here</td>
            </tr>
            <tr>
              <td>zIndexStart </td>
              <td>Some description goes here</td>
            </tr>
            <tr>
              <td>zIndexStep </td>
              <td>Some description goes here</td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    )
  }
}

render(<Root/>, document.getElementById("appcontainer"));
