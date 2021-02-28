module.exports = {
    date: ("0" + new Date().getDate()).slice(-2),
    month: ("0" + (new Date().getMonth() + 1)).slice(-2),
    year: new Date().getFullYear(),
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
    seconds: new Date().getSeconds(),

    now: function(){
        return this.year + "-" + this.month + "-" + this.date + " " + this.hours + ":" + this.minutes + ":" + this.seconds;
    }
};