import User from '../models/userModel';
import { sendWelcomeEmail, sendCancellationEmail } from '../utils/email';

const control = {

    signup: async (req, res) => {

        try {
            const user = new User(req.body);
            let emailExists = await User.findOne({ email: user.email });
            if (emailExists) {
                return res.status(406).json({
                    error: 'An account with that email address already exists. Please login to continue.'
                });
            }

            await user.save();
            sendWelcomeEmail(user.email, user.name);

            const token = await user.generateAuthToken();
            res.status(201).json({
                user,
                token,
                Result: 'Sign Up successfully'
            });
        } catch (e) {
            res.status(400).json({
                error: `Error: ${e}`
            });
        }
    },

    login: async (req, res) => {

        try {
            const user = await User.findByCredentials(req.body.email, req.body.password);
            const token = await user.generateAuthToken();
            res.json({ user, token,
                Result: 'Login Success'
            });
        } catch (e) {
            res.status(400).send(e);
        }
    },

    logout: async (req, res) => {
        try {
            req.user.tokens = req.user.tokens.filter((objToken) => {
                return objToken.token !== req.token; // [{id, token}, {id, token}..]
            });
            await req.user.save();
            res.status(200).json({
                Result: "Logout successfully"
            });
        } catch (e) {
            res.status(500).json({
                error: 'Server Error'
            });
        }
    },

    logoutAll: async (req, res) => {
        try {
            req.user.tokens = [];
            await req.user.save();
            res.status(200).json({
                Result: "Logout successfully"
            });
        } catch (e) {
            res.status(500).json({
                error: 'Server Error'
            });
        }
    },

    userProfile: async (req, res) => {
        res.send(req.user);
    },

    updateUserProfile: async (req, res) => {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'email', 'password', 'age', 'contact'];
        const isvalidOperation = updates.every(update => allowedUpdates.includes(update));
        if (!isvalidOperation) {
            return res.status(400).send({ error: 'Invalid updates' });
        }
        try {
            /* certain mongoose query bypasses middleware (like findByIdAndUpdate())
            and perfoms operations directly on database and that is why we use special
            operation like runvalidator */
            updates.forEach(update => req.user[update] = req.body[update]);
            await req.user.save();
            res.json({
                profile: req.user,
                Result: 'Updated Successfully'

            });

        } catch (e) {
            res.status(400).json({   // validation failure
                error: `Error: ${e}`
            });
        }
    },

    deleteUserProfile: async (req, res) => {
        try {
            await req.user.remove(); //can also use findbyidanddelete
            sendCancellationEmail(req.user.email, req.user.name);
            res.status(200).json({ message: 'User Deleted' });
        } catch (err) {
            res.status(500).json({
                error: 'Server Error'
            });
        }
    }
};

module.exports = control;