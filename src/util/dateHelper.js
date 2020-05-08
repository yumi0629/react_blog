import moment from "moment";

export function formatTime(time) {
    return moment(time).utcOffset(480).format('YYYY-MM-DD HH:mm:ss');
}

export function formatToDay(time) {
    return moment(time).utcOffset(480).format('YYYY-MM-DD');
}
