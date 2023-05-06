const getDateFormat = (date, time) => {
    let d = new Date(date);
    let t = !time ? "00:00:00" : time
    return d.getFullYear() + "-" + (d.getMonth()+1).toString().padStart(2,"0") + "-" + d.getDate().toString().padStart(2,"0") + " " + t;
}

export default getDateFormat;