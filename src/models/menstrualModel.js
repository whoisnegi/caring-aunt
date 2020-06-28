import mongoose from 'mongoose';
import dateCalc from '../utils/dateCalc'


const menstDtlSchema = new mongoose.Schema({
    pastPeriodDate: {
        type: Date,
        required: true
    },

    menstrualCycleLength: {
        type: Number,
        required: true,
        trim: true,
        min: 26,
        max: 30
    },

    periodLength: {
        type: Number,
        required: true,
        trim: true,
        min: 3,
        max: 8
    },

    notifyDate: {
        type: Date,
        required: true
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        required: true,
        ref: 'User'
    }

});

menstDtlSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    return {
        'Past Period Date': userObject.pastPeriodDate.toDateString(),
        'Menstrual Cycle Length': userObject.menstrualCycleLength,
        'Period Length': userObject.periodLength
    };
};


menstDtlSchema.methods.generateStats = function () {
    const user = this;

    function daysBetween(date1, date2) {
        const oneDay = 1000 * 60 * 60 * 24;// The number of milliseconds in one day
        const differenceMs = Math.abs(date1 - date2);// Calculate the difference in milliseconds
        return Math.round(differenceMs / oneDay); // Convert back to days and return
    }

    const halfCycleLength = Math.round(user.menstrualCycleLength / 2)
    const ovulationDate = dateCalc(user.pastPeriodDate, halfCycleLength)

    return {
        'Current cycle start date': user.pastPeriodDate.toDateString(),
        'Current cycle end date': user.notifyDate.toDateString(),
        'Current day in cycle': daysBetween(user.pastPeriodDate, new Date()),
        'Next cycle and period begins from': dateCalc(user.notifyDate, 2).toDateString(),
        'Ovulation phase': ovulationDate.toDateString()
    }
}    

const Menstrual = mongoose.model('Menst', menstDtlSchema);
export default Menstrual;