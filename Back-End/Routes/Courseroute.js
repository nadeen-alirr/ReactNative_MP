const express = require('express');
const router = express.Router();

const courseController = require('../Controller/Coursecontroller')
const usercontroller =require('../Controller/UserController')
const courseUpload = require('../courseMulter'); 

// router.post('/course', [courseUpload], courseController.createCourse);

router.get('/getCourse/:userId',courseController.get_Course);
router.get('/getcount/:userId',courseController.getcount);
router.post('/signup',usercontroller.Signup);
router.get('/protectedroute',usercontroller.verifyToken)
router.post('/login',usercontroller.login)

// router.post('password/:id',usercontroller.password)
// router.patch('/update',usercontroller.update)

router.post('/upload/:userId', usercontroller.upload)
router.post('/addToCart', courseController.addToCart);
router.get('/getCourseuser/:userId' ,courseController.getcourse)
router.delete('/deleteitemcart/:userId/:courseId',courseController.delete_item_cart)
router.post('/checkout/:userId',courseController.payment)
// router.post('/addinfocard/:userId',usercontroller.addinfocard)
router.get("/yourCourse/:userId",courseController.YourCourse)
router.post('/editinfo/:userId',usercontroller.editinfo)
router.get('/getlessons/:courseId/:userId' ,courseController.get_lessons)
// router.post('/addcourse' ,courseController.add_course)
module.exports = router;