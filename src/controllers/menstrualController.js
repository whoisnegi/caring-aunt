import Menstrual from '../models/menstrualModel';
import createNotifyDate from '../utils/dateCalc';

const control = {

    create: async (req, res) => {

        const menst = await Menstrual.findOne({ owner: req.user._id })
        if (menst) {
            return res.json({ Error: 'Menstrual data already created' })
        }

        const date = req.body.pastPeriodDate;
        const length = req.body.menstrualCycleLength;
        req.body.notifyDate = createNotifyDate(date, length);

        const menstDtl = new Menstrual({
            ...req.body,
            owner: req.user._id
        });

        try {
            await menstDtl.save();
            res.status(201).json({
                'Menstrual Detail': menstDtl,
                'Result': 'Created Successfully' 
            });
        } catch (e) {
            res.status(400).json({
                error: `Error: ${e}`
            });
        }
    },

    getData: async (req, res) => {

        try {
            const menstDtl = await Menstrual.findOne({ owner: req.user._id });
            // Alternate methd > await req.user.populate('tasks').execPopulate()
            if(!menstDtl) {
                return res.json({ error: 'Create menstrual details first'})
            }
            res.send(menstDtl);
        } catch (e) {
            res.status(500).json({
                error: `${e}`
            });
        }
    },

    update: async (req, res) => {
        const updates = Object.keys(req.body);
        const canUpdate = ['pastPeriodDate', 'menstrualCycleLength', 'periodLength'];
        const isValidUpdate = updates.every(value => canUpdate.includes(value));

        if (!isValidUpdate) {
            return res.status(400).send({ error: 'Invalid updates' });
        }
        try {

            const menstDtl = await Menstrual.findOne({ owner: req.user._id });
            if (!menstDtl) {
                return res.status(404).json({ error: 'Create menstrual details first'});
            }
            updates.forEach(update => menstDtl[update] = req.body[update]);

            if (req.body.pastPeriodDate && req.body.menstrualCycleLength) {
                var notifyDate = createNotifyDate(req.body.pastPeriodDate, req.body.menstrualCycleLength);
            } else if (req.body.pastPeriodDate) {
                var notifyDate = createNotifyDate(req.body.pastPeriodDate, menstDtl.menstrualCycleLength);
            } else if (req.body.menstrualCycleLength) {
                var notifyDate = createNotifyDate(menstDtl.pastPeriodDate, req.body.menstrualCycleLength);
            }

            menstDtl.notifyDate = notifyDate;
            await menstDtl.save();
            res.json({
                'Menstrual Detail': menstDtl,
                'Result': 'Updated Successfully' 
            })
        } catch (err) {
            res.status(400).json({
                error: `${err}`
            });
        }
    },

    remove: async (req, res) => {

        try {
            const menstDtl = await Task.findOneAndDelete({ owner: req.user._id });
            // if (!menstDtl) {
            //     return res.status(404).send();
            // }
            res.json({
                'Menstrual Detail': menstDtl,
                Result: "Successfully Deleted"
            });
        } catch (err) {
            res.status(404).json({error: 'Not Found'});
        }
    },

    stats: async (req, res) => {
        try {
            const user = await Menstrual.findOne({ owner: req.user._id })
            if (!user) {
                return res.json({ Error: 'Update menstrual details first'})
            }
            res.json(user.generateStats())
        } catch (err) {
            res.status(500).json({error: 'Server Error'});
        }   
    }

};

module.exports = control;