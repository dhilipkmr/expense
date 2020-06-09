export const getMicro = (date, time) => {
  const dateArr = date.split('-').map((val) => parseInt(val, 10));
  dateArr[1] = dateArr[1] - 1;
  const timeArr = time.split(':').map((val) => parseInt(val, 10));
  const args = [...dateArr, ...timeArr];
  return new Date(...args).getTime();
};

export const isToday = function(startMicro) {
  const dateNow = new Date();
  const todayStartMs = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate()).getTime();
  const todayStart = new Date(todayStartMs);
  const tomorrowStartMs = new Date(todayStart.setDate(todayStart.getDate() + 1)).getTime();
  return (startMicro >= todayStartMs && startMicro < tomorrowStartMs);
}

export const formatDate = (date) => { 
  return new Intl.DateTimeFormat('default',
    { hour12: true, year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }).format(date);
}
