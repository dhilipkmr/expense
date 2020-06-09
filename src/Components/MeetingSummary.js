import React from 'react';
import { isToday, formatDate } from '../helpers/utils';
import { delete_schedule } from '../helpers/api';

class MeetingSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
    this.getTabSpecificMeetingsList = this.getTabSpecificMeetingsList.bind(
      this
    );
    this.changeTab = this.changeTab.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    
  }

  changeTab(activeTab = 0) {
    this.setState({ activeTab });
  }

  getTabSpecificMeetingsList() {
    const { meetingsList } = this.props;
    const { activeTab } = this.state;
    const meetings = [];
    meetingsList.forEach((meeting) => {
      if (activeTab === 0 || isToday(meeting.startTime)) {
        meetings.push(meeting);
      }
    });
    return meetings;
  }

  handleRemove(id) {
    delete_schedule(id).then((res) => {
      console.log(res);
    });
  }

  render() {
    const { activeTab } = this.state;
    const meetings = this.getTabSpecificMeetingsList();
    return (
      <React.Fragment>
        <div id="tabs" className="tabs marginT20">
          <span
            data-cy="allMeetingsTab"
            className={
              "padL10 d-inbl tab cursorPtr " +
              (activeTab === 0 ? "activeTab" : "")
            }
            onClick={this.changeTab.bind(this, 0)}
          >
            All Meetings
          </span>
          <span
            data-cy="todayMeetingsTab"
            className={
              "padL10 d-inbl tab cursorPtr " +
              (activeTab === 1 ? "activeTab" : "")
            }
            onClick={this.changeTab.bind(this, 1)}
          >
            Today's Meetings
          </span>
          <div
            id="meetingSummary"
            data-cy="meetingSummary"
            className="meetingSummary"
          >
            {meetings.map((meetingItem, index) => {
              const {
                startTime,
                endTime,
                block,
                floor,
                meetingRoom,
                _id,
              } = meetingItem;
              return (
                <ul className="card d-inbl" data-cy="ul" key={_id}>
                  <li className="fb" data-cy="summaryHeading">
                    {block + " - " + floor + " - " + meetingRoom}
                  </li>
                  <li
                    className="padT10"
                    data-cy="startSummary"
                    style={{ textAlign: "left", paddingLeft: "15px" }}
                  >
                    <span className="fb">Starts at:</span>
                    <div>{formatDate(new Date(startTime))}</div>
                  </li>
                  <li
                    className="padT10"
                    data-cy="endSummary"
                    style={{ textAlign: "left", paddingLeft: "15px" }}
                  >
                    <span className="fb">Ends at:</span>
                    <div>{formatDate(new Date(endTime))}</div>
                  </li>
                  <button className="marginT10" type="button" onClick={() => this.handleRemove(_id)}>
                    Remove Meeting
                  </button>
                </ul>
              );
            })}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MeetingSummary;
