function getDate(epochSec){
  const datearray = new Array(6);
  const dd = new Date();
  dd.setTime(epochSec * 1000);
  datearray[0] = dd.getYear();
  if(datearray[0] < 1900) datearray[0] += 1900;
  datearray[1] = dd.getMonth() + 1;
  datearray[2] = dd.getDate();
  datearray[3] = dd.getHours();
  datearray[4] = dd.getMinutes();
  datearray[5] = dd.getSeconds();
  for(var count = 3; count < 6; count++){
    if(datearray[count] < 10) datearray[count] = "0"+datearray[count];
  }
  return datearray;
}

function currentTime(){
  const dd = new Date();
  document.getElementById("epochSec").value = Math.floor(dd.getTime() / 1000);
}

function esecToString(epochSec){
  let outstring = "Not integer."
  if(!isNaN(epochSec)) {
    const da = getDate(epochSec);
    outstring = da[0]+"年"+da[1]+"月"+da[2]+"日 "+da[3]+":"+da[4]+":"+da[5];
  }
  document.getElementById("stringSec").value = outstring;
}

function stringToEsec(str){
  let year, month, date, hours, minutes, seconds, matchstrs;
  if(str.indexOf("年") != -1){
    year = parseInt(str.match(/(\d+)年/)[1], 10);
    month = parseInt(str.match(/(\d+)月/)[1], 10);
    date = parseInt(str.match(/(\d+)日/)[1], 10);
  }else{
    matchstrs = str.match(/(\d+)\/(\d+)\/(\d+)/);
    year = parseInt(matchstrs[1], 10);
    month = parseInt(matchstrs[2], 10);
    date = parseInt(matchstrs[3], 10);
  }

  if(year < 1970) {
    if(year >= 70) {
      year += 1900;
    } else {
      year += 2000;
    }
  }
  str.from = 0;
  if(str.indexOf("時") != -1) {
    hours = parseInt(str.match(/(\d+)時/)[1], 10);
    minutes = parseInt(str.match(/(\d+)分/)[1], 10);
    if(str.match(/(\d+)秒/)) {
      seconds = parseInt(str.match(/(\d+)秒/)[1], 10);
    } else {
      seconds = 0;
    }
  } else {
    if( str.match(/\d+:\d+:\d+/) ) {
      matchstrs = str.match(/(\d+):(\d+):(\d+)/);
      hours = parseInt(matchstrs[1], 10);
      minutes = parseInt(matchstrs[2], 10);
      seconds = parseInt(matchstrs[3], 10);
    } else {
      matchstrs = str.match(/(\d+):(\d+)/);
      hours = parseInt(matchstrs[1], 10);
      minutes = parseInt(matchstrs[2], 10);
      seconds = 0;
    }
  }
  valueToEsec(year, month, date, hours, minutes, seconds);
}

function valueToEsec(year, month, date, hours, minutes, seconds){
  const dd = new Date(year, month-1, date, hours, minutes, seconds);
  document.getElementById("epochSec").value = Math.floor(dd.getTime()/1000);
  document.getElementById("epochSec").onfocus = null;
}
