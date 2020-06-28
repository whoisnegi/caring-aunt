const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
import cron from "node-cron";
import Menstrual from '../models/menstrualModel';
import createNotifyDate from './dateCalc';

cron.schedule('0 11 * * *', async () => {

    const toDateStr = (date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    const date = new Date();
    const dateStr = toDateStr(date);
    const menstData = await Menstrual.find();

    for (let user of menstData) {

        /*
        If users reaches middle of their menstrual cycle then they will recieve a message notification.
        That's why code below this are checking if user reaches middle of their cycle or not by dividing 
        cycle length by halve and adding it to pastPeriodDate and then comparing it with the today's date.
        */

        const cycleLength = Math.round(user.menstrualCycleLength / 2) - 1
        const dateToNotify = createNotifyDate(user.pastPeriodDate, cycleLength)
        const dateToNotifyStr = toDateStr(dateToNotify)

        if (dateToNotifyStr === dateStr) {

            await user.populate('owner').execPopulate();

            await client.messages.create({
                to: `+91${user.owner.contact}`,
                from: process.env.TWILIO_NO,
                body: `Hey ${user.owner.name}! For next 4 to 5 days you were on a high time for getting a pregnancy.\n\nRegards,\nCaring Aunt Team.`
            });    
        }
    }
});