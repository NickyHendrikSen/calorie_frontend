const getTimeFromDate = (date) => {
    let d = new Date(date);
    return d.getHours().toString().padStart(2,"0") + ":"
            + d.getMinutes().toString().padStart(2,"0") + ":"
            + d.getSeconds().toString().padStart(2,"0");
}

export default getTimeFromDate;