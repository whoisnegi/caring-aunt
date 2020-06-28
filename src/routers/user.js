import express from 'express';
import auth from '../middlewares/auth';
import upload from '../config/multer';
import { signUpValidate, logInValidate } from '../middlewares/validate'

import { signup, login, logout, logoutAll, userProfile, deleteUserProfile,
         updateUserProfile } from '../controllers/userController';

import { getAvatar, deleteAvatar, multerErrHandler, 
         uploadAvatar } from '../controllers/avatarController';         

const router = express.Router();

/* 
LOGIN AND SIGNUP ARE PUBLIC ROUTES
*/

// Sign Up  
router.post('/users', signUpValidate, signup);

// Log In 
router.post('/users/login', logInValidate, login);

// Log Out
router.post('/users/logout', auth, logout);

// Log out from every device 
router.post('/users/logoutAll', auth, logoutAll);

// upload Profile Picture
router.post('/users/me/avatar', auth, upload.single('avatar'), uploadAvatar, multerErrHandler);

// Get Profile Picture   
router.get('/users/me/avatar', auth, getAvatar);

// User profile
router.get('/users/me', auth, userProfile);

// Update profile
router.patch('/users/me', auth, updateUserProfile);

// Delete user profile    
router.delete('/users/me', auth, deleteUserProfile);

// Delete profile picture
router.delete('/users/me/avatar', auth, deleteAvatar);

export default router;