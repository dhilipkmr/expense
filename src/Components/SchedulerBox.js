import React from 'react';
import {getMicro, formatDate} from '../helpers/utils';

class SchedulerBox extends React.Component {
  constructor(props) {
    super(props);
    this.handleError = this.handleError.bind(this);
    this.resetState = this.resetState.bind(this);
    this.checkIfWithinTwoHours = this.checkIfWithinTwoHours.bind(this);
    this.checkIfMeetingRoomFree = this.checkIfMeetingRoomFree.bind(this);
    this.validateError = this.validateError.bind(this);
    this.scheduleMeeting = this.scheduleMeeting.bind(this);
    this.state = this.resetState();
  }

  resetState() {
    return {
      block: 'Block A',
      floor: 'Floor 1',
      meetingRoom: 'Meeting Room 1',
      sDate: '',
      sTime: '',
      eDate: '',
      eTime: '',
      startTime: '',
      endTime: ''
    };
  }

  handleError(showError, errorText = 'Invalid Input!') {
    if (showError) {
      this.refs.error.classList.remove('dn');
      this.refs.error.innerText = errorText;
      return;
    }
    this.refs.error.classList.add('dn');
  }

  checkIfWithinTwoHours(value) {
    const currTime = new Date().getTime();
    if ((currTime >  new Date(value.startTime).getTime()) && (currTime > new Date(value.endTime).getTime())) {
      return "Sorry, cannot Schedule meeting in the past";
    }
    if (new Date(value.startTime).getTime() > new Date(value.endTime).getTime()) {
      return "Start time cannot be greater than Endtime";
    }
  }

  checkIfMeetingRoomFree() {
    const { block, floor, meetingRoom, startTime, endTime } = this.state;
    let isBooked = false;
    this.props.meetingsList.forEach((value) => {
      const isSameLocation = (block === value.block && floor === value.floor && meetingRoom === value.meetingRoom);
      const isSameTime = (startTime >= value.startTime && startTime <= value.endTime) || (endTime >= value.startTime && endTime <= value.endTime);
      if (isSameTime && isSameLocation) {
        isBooked = true;
      }
    });
    if (isBooked) {
      return 'The room is Unavailable, there is a meeting between ' + formatDate(new Date(startTime)) + ' and ' + formatDate(new Date(endTime));
    }
    return '';
  }

  validateError() { 
    const { block, floor, meetingRoom, startTime, endTime } = this.state;
    if (!block || !floor || !meetingRoom || !startTime || !endTime) {
      this.handleError(true);
      return true;
    }
    this.handleError(false);
    const value = { startTime, endTime };
    let errorText = this.checkIfWithinTwoHours(value);
    errorText = !errorText ? this.checkIfMeetingRoomFree(value) : errorText;
    if (errorText) {
      this.handleError(true, errorText);
      return true;
    }
  }

  scheduleMeeting() {
    const hasError = this.validateError();
    if (!hasError) {
      const { block, floor, meetingRoom, startTime, endTime } = this.state;
      this.props.addNewMeeting({ block, floor, meetingRoom, startTime, endTime });
      this.setState(this.resetState());
    }
  }

  handleChange(e, key) {
    this.setState({ [key]: e.target.value });
  }

  componentDidUpdate(prevProps, prevState) {
    if (((this.state.sDate !== prevState.sDate) && this.state.sTime) || ((this.state.sTime !== prevState.sTime) && this.state.sDate)){
      const [yyyy, mm ,dd] = this.state.sDate.split('-');
      const [hh, min] = this.state.sTime.split(':');
      this.setState({
        startTime: new Date(yyyy, parseInt(mm) - 1, dd, hh, min).getTime()
      });
    }
    
    if (((this.state.eDate !== prevState.eDate) && this.state.eTime) || ((this.state.eTime !== prevState.eTime) && this.state.eDate)) {
      const [yyyy, mm, dd] = this.state.eDate.split('-');
      const [hh, min] = this.state.eTime.split(':');
      this.setState({
        endTime: new Date(yyyy, parseInt(mm) - 1, dd, hh, min).getTime()
      });
    }

  }

  render() {
    const { block, floor, meetingRoom, sDate, sTime, eDate, eTime, startTime, endTime } = this.state;
    return (
      <React.Fragment>
        <div className="margin20 textCenter fs20">Meeting Scheduler</div>
        <div className="textCenter inputContent">
          <div className="txtLeft marginTB40 fb">
            <label className="" htmlFor="buildingName">Block Name: </label>
            <select data-cy="blockSelector" value={block} onChange={(e) => this.handleChange(e, 'block')}>
              <option value="Block A">Block A</option>
              <option value="Block B">Block B</option>
              <option value="Block C">Block C</option>
            </select>
            <label className="padL10" htmlFor="floorNumber">Floor No:</label>
            <select data-cy="floorSelector" value={floor} onChange={(e) => this.handleChange(e, 'floor')}>
              <option value="Floor 1">Floor 1</option>
              <option value="Floor 2">Floor 2</option>
              <option value="Floor 3">Floor 3</option>
            </select>
            <label className="padL10" htmlFor="meetingRoomName">Meeting Room No:</label>
            <select data-cy="roomSelector" value={meetingRoom} onChange={(e) => this.handleChange(e, 'meetingRoom')}>
              <option value="Meeting Room 1">Room 1</option>
              <option value="Meeting Room 2">Room 2</option>
              <option value="Meeting Room 3">Room 3</option>
            </select>
          </div>
          <div className="txtLeft">
            <div className="marginTB40 fb">Meeting Start at :
              <input type="date" data-cy="startDate" value={sDate} onChange={(e) => this.handleChange(e, 'sDate')}/>
              <input type="time" data-cy="startTime" value={sTime} onChange={(e) => this.handleChange(e, 'sTime')}/>
            </div>
            <div className="marginTB40 fb">Meeting Ends at :
              <input type="date" data-cy="endDate" value={eDate} onChange={(e) => this.handleChange(e, 'eDate')}/>
              <input type="time" data-cy="endTime" value={eTime} onChange={(e) => this.handleChange(e, 'eTime')}/>
            </div>
          </div>
          <div ref="error" data-cy="error" className="dn error padB10">Invalid Input!</div>
          <button data-cy="scheduleBtn" type="button" className="marginB20 btn" onClick={this.scheduleMeeting}>Schedule Meeting</button>
        </div>
      </React.Fragment>
    );
  }
}

export default SchedulerBox;
