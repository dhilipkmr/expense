import React, {Component} from 'react';
import { Ripple} from '../utils/utils';

export default class Popup extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {cancelCallback, confirmCallback} = this.props;
    return (
      <div className="popupBackDrop">
        <div className="popupContainer whiteBg">
          <div className="popupHeader">
            <div className="fb fs14 padB10 textCenter">
              Do you want to Delete this transaction?
            </div>
            <div className="tr">
              <Ripple classes="in-bl newBtn white themeBg in-bl tr mf5 fs12" onClickHandler={confirmCallback}>Confirm</Ripple>
              <Ripple classes="in-bl newBtn white themeBg in-bl tr mf5 fs12" onClickHandler={cancelCallback}>Cancel</Ripple>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
