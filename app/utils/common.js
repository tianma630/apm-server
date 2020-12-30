function getToday() {
    let d = new Date();
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
}

function getNextDay(i) {
    let d = new Date(+new Date() + i * 24 * 60 * 60 * 1000);
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
}

function addDays(d, i) {
    d = new Date(+new Date(d) + i * 24 * 60 * 60 * 1000);
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
}

module.exports = {
    getToday,
    getNextDay,
    addDays,
}