const currentDate = new Date();
let currHours = currentDate.getHours();
let currMinutes = currentDate.getMinutes();
let currSeconds = currentDate.getSeconds();

setInterval(() => {
    currSeconds++;
    if(currSeconds % 60 == 0) currMinutes++;
    if(currMinutes % 60 == 0 && currSeconds % 60 == 0) currHours++;

    currSeconds %= 60;
    currMinutes %= 60;
    currHours %= 24;

    let merdian = "";
    if(currHours > 12) {
        merdian = "PM";
    }
    else {
        merdian = "AM";
    }
    if(currSeconds < 10) {
        currSeconds = "0" + currSeconds;
    }
    if(currMinutes < 10) {
        currMinutes = "0" + currMinutes;
    }
    if(currHours % 12 < 10) {
        currHours = "0" + currHours;
    }
 
    console.log(`The current time of the machine is ${currHours%12}:${currMinutes}:${currSeconds} ${merdian}`);
}, 1000)