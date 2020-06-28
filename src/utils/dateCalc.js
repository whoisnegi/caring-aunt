const createNotifyDate = (givenDate, addedDays) => {

    if (typeof givenDate === "object") {
        givenDate = `${givenDate.getFullYear()}-${givenDate.getMonth() + 1}-${givenDate.getDate()}`;
    }

    Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    };

    const dateArray = givenDate.split('-');
    const intDateArray = dateArray.map(value => Number(value));
    const date = new Date(intDateArray[0], intDateArray[1] - 1, intDateArray[2]);
    const notifyDate = date.addDays(addedDays - 1);

    return notifyDate;
};

export default createNotifyDate;