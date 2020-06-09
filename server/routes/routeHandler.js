import mongoose from 'mongoose';
import Schedules from '../models/schedulesModel';

export const saveSchedule = (request, response) => {
  const { block, floor, meetingRoom, startTime, endTime } = request.body;
  var newSchedule = new Schedules({
    _id: mongoose.Types.ObjectId(),
    block, floor, meetingRoom, startTime, endTime
  });
  newSchedule.save().then((doc) => {
    response.send({ error: false, msg: 'Saved Successfully' });
  }, (e) => {
    response.status(500).send(e);
  });
};

export const getSchedule = (request, response) => {
  Schedules.find({}).then((doc) => {
    response.send({error: false, meetings: doc });
  }, (e) => {
    response.status(500).send({ error: true, msg: e });
  });
};
