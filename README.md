# Caring Aunt

```
Author: - Karan Singh Negi

```
### Deployed URL's

[Click here](https://caring-aunt.herokuapp.com)

## Brief About of Project

Project is gender-specific, will beneficial for females, once the user signed up with our website from their onwards tracking of there periods is not a mess anymore for them.

We'll be giving each and every single details of their menstrual cycle details on their phone via **Text Messages**.

Few features we have applied and there are many more we are left with for now. Which we will definitely be adding with passing time in the near future.

Let's take a tour of our project.

## End Points of APIs

### 1. To Register User:

- #### https://caring-aunt.herokuapp.com/users
  - Register User by giving following details-
    - name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \_ required
    - email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\_ required
    - age&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\_ not-required
    - password&nbsp;&nbsp;&nbsp;&nbsp;\_ required
    - contact&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\_ required

`Once you register there's no need to log in as a token pass is generated as you register and can access the site.`

### 2. After Registering User we are going to take user's `Past Period Details`

- #### https://caring-aunt.herokuapp.com/menst

  > This is a Post Route

  - User can give her Past Period Details by giving following the fields-
    - pastPeriodDate
    - menstrualCycleLength
    - periodLength

  > Here all fields are required
  > By upper detail we will be calculating users future period dates and keep on reminding user 1 day prior to her period date via **text messages**

  > From tomorrow onwards your period is starting.

### 3. User can see her Mentrual Cycle Entered Data

- #### https://caring-aunt.herokuapp.com/menst

  > This is a Get Route

### 4. User can Update her following details:

- #### https://caring-aunt.herokuapp.com/menst

  > This is a Patch Route

  - Here user can update her past given details.
  - By that, we will be calculating the notify date again.

### 5. User can see her Menstrual Cycle Statistics.

- #### https://caring-aunt.herokuapp.com/menst/cycle-stats

  > This is a Get Route

  - From here user can see her Statistics about Past Period Date's.

### 6. For Logging In:

- #### https://caring-aunt.herokuapp.com/users/login

  - You can log in by giving the following details which are required
    - email
    - password

### 7. To Logout:

- #### https://caring-aunt.herokuapp.com/users/logout

### 8. Logging Out from all system:

- #### https://caring-aunt.herokuapp.com/users/logoutAll

`We have created an API from the user can log in from different-different Operating Systems, So for that, we have implemented`

`LOGOUT ALL FEATURE: Which will give user and feature to logout from all devices.`

### 9. To Set User Profile Picture:

- #### https://caring-aunt.herokuapp.com/users/me/avatar

  > This is a Post Route

  - From here user can set her profile picture to give her profile a good look

### 10. To See the Profile Picture Uploaded:

- #### https://caring-aunt.herokuapp.com/users/me/avatar

  > This is a Get Route

- From here user can see her profile picture.

### 11. To delete Pre-Existing Profile Picture:

- #### https://caring-aunt.herokuapp.com/users/me/avatar

  > This is a Delete Route

  - Here user can delete her pre-existing profile picture

### 12. To delete User

- ### https://caring-aunt.herokuapp.com/users/me

  > This is Delete Route

  - From here user can delete her
    existence in our site

  - After this route hits, we are not having any user's information sending her email of **goodbye** and deleting all data from our database.

### 13. To read some good blogs

- ### https://caring-aunt.herokuapp.com/blogs

  - As these 4-7 Days are very challenging stages of every female so we are giving some good blogs to read at that time and at any time.
