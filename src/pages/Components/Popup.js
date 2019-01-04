import React, {Component} from 'react';

export default class Popup extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {cancelCallback, confirmCallback} = this.props;
    return (
      <div className="backDrop">
        <div className="popupContainer whiteBg">
          <div className="popupHeader">
            <div className="fb fs14 padB10 textCenter">
              Do you want to Delete this transaction?
            </div>
            <div className="tr">
              <div className="newBtn white themeBg in-bl tr mf5 fs12" onClick={confirmCallback}>Confirm</div>
              <div className="newBtn white themeBg in-bl tr mf5 fs12" onClick={cancelCallback}>Cancel</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
