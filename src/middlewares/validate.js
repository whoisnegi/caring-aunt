import { check, validationResult } from 'express-validator';

export const signUpValidate = [
    check('name', 'Name should be atleast 4 char').isLength({ min: 4 }),
    check('email', 'Email should be in correct format').isEmail(),
    check('password', 'Password should be atleast 8 char').isLength({ min: 8 }),
    check('contact', 'Contact Number should be of 10 digits').isMobilePhone(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({  // 422 -> Unprocessable Entity
                error: errors.array()[0].msg
            });
        }
        next()
      }
]

export const logInValidate = [
    check('email', 'Email should be in correct format').isEmail(),
    check('password', 'Password should be atleast 8 char').isLength({ min: 8 }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                error: errors.array()[0].msg
            });
        }
        next()
    }
]

export const menstvalidate = [
    check('pastPeriodDate', 'In Past-Period-Date only numeric values are allowed'),
    check('menstrualCycleLength', 'In Menstrual-Cycle-Length only numeric values are allowed').isNumeric(),
    check('periodLength', 'In Period-Length only numeric values are allowed').isNumeric(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                error: errors.array()[0].msg
            });
        }
        next()
    }
]