import { check, validationResult } from 'express-validator';

export const signUpValidate = [
    check('name', 'Please provide your Name').exists(),
    check('name', 'Name cannot be empty').not().isEmpty(),
    check('name', 'Name must have only alphabetical characters').isAlpha(),
    check('name', 'Name should have atleast 4 char').isLength({ min: 4 }),
    check('email', 'Please provide your Email Id').exists(),
    check('email', 'Email id shouldn\'t be empty').not().isEmpty(),
    check('email', 'Email id should be in correct format').isEmail(),
    check('password', 'Please provide password').exists(),
    check('password', 'Password shouldn\'t be empty').not().isEmpty(),
    check('password', 'Password should have atleast 8 char').isLength({ min: 8 }),
    check('contact', 'Please provide your contact no').exists(),
    check('contact', 'Contact number shouldn\'t be empty').not().isEmpty(),
    check('contact', 'Please provide a valid contact number').optional().isNumeric(),
    check('contact', 'Contact number should contain 10 digits').isLength({ min: 10, max:10 }),
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
    check('email', 'Please provide your Email Id').exists(),
    check('email', 'Email id shouldn\'t be empty').not().isEmpty(),
    check('email', 'Email should be in correct format').isEmail(),
    check('password', 'Please provide your password').exists(),
    check('password', 'Password shouldn\'t be empty').not().isEmpty(),
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
    check('pastPeriodDate', 'Please provide your past period date').exists(),
    check('pastPeriodDate', 'Past period date shouldn\'t be empty').not().isEmpty(), 
    check('pastPeriodDate', 'Please provide \'YYYY-MM-DD\' format for date').matches(/^(20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/, "i"),
    check('menstrualCycleLength', 'Please provide your menstrual cycle length').exists(),
    check('menstrualCycleLength', 'Menstrual cycle length shouldn\'t be empty').not().isEmpty(),
    check('menstrualCycleLength', 'In Menstrual-Cycle-Length only numeric values are allowed').optional().isNumeric(),
    check('menstrualCycleLength', 'Menstrual-Cycle-Length must be between 26 and 30').matches(/^[2][6-9]|[3][0-1]/, "i"),
    check('periodLength', 'Please provide your period length').exists(),
    check('periodLength', 'Period length shouldn\'t be empty').not().isEmpty(),
    check('periodLength', 'In Period-Length only numeric values are allowed').isNumeric(),
    check('periodLength', 'Period length must be between 4 and 8').matches(/^[4-8]/,"i"),
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