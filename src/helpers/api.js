import axios from 'axios';
export const get_schedules = () => {
  const url = '/get_schedules';
  return axios.get(url);
}

export const save_schedules = (params) => {
  const { block, floor, meetingRoom, startTime, endTime} = params;
  const url = '/save_schedule';
  return axios.post(url, { block, floor, meetingRoom, startTime, endTime });
}