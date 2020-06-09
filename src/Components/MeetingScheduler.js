import React from 'react';
import MeetingSummary from './MeetingSummary';
import SchedulerBox from './SchedulerBox';
import {save_schedules, get_schedules} from '../helpers/api';

class MeetingScheduler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meetingsList: []
    };
    this.updateMeetingsList = this.updateMeetingsList.bind(this);
  }

  updateMeetingsList(newMeeting) {
    save_schedules(newMeeting);
    let updatedMeetingsList = [...this.state.meetingsList, newMeeting];
    updatedMeetingsList = updatedMeetingsList.sort((a, b) => a.startMicro - b.startMicro);
    this.setState({
      meetingsList: updatedMeetingsList
    });
  }

  componentDidMount() {
    get_schedules().then((resp) => {
      if (resp && resp.data && !resp.data.error) { 
        const { meetings = [] } = resp.data;
        this.setState({
          meetingsList: meetings
        });
      }
    });
  }

  render() {
    const {meetingsList = []} = this.state;
    return (
      <div className="textCenter">
        <SchedulerBox addNewMeeting={this.updateMeetingsList} meetingsList={meetingsList}/>
        <MeetingSummary meetingsList={meetingsList}/>
      </div>
    );
  }
}
export default MeetingScheduler;
