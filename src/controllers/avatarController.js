import sharp from 'sharp';
import User from '../models/userModel';

const control = {

    uploadAvatar: async (req, res) => {
        try {
            const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
            req.user.avatar = buffer;
            await req.user.save();
            res.status(201).json({ Result: 'Profile pic uploaded Successfully' });
        } catch (error) {
            res.status(400).json({ error: `${error}` });
        }
    },

    multerErrHandler: (err, req, res, next) => {
        res.status(400).send({ error: err.message });
    },

    deleteAvatar: async (req, res) => {
        if (!req.user.avatar) {
            return res.status(200).json({ msg: 'No profile pic found' });
        }
        try {
            req.user.avatar = undefined;
            await req.user.save();
            res.status(200).json({ Result: 'Profile pic removed Successfully' });
        } catch (error) {
            res.status(400).json({ error: `${error}` });
        }
    },

    getAvatar: async (req, res) => {
        try {
            const user = await User.findById(req.user._id);

            if (!user || !user.avatar) {
                return res.status(404).json({ error: 'Not Found' });
            }
            res.set('Content-Type', 'image/png');
            res.send(user.avatar);

        } catch (e) {
            res.status(400).send();
        }
    }
}

module.exports = control;