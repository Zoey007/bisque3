var express = require("express");
var path = require("path");
var router = express.Router();
var db = require("../models");
var passport = require("passport");

router.get('/', (req, res, next) => {
    // if(req.isAuthenticated()){
        console.log("_________________________________");
        console.log("get route / happened..index.routes.js");
        console.log("_________________________________");
        res.redirect("/");
    // }else{
    //     console.log("_________________________________");
    //     console.log("get route / was not authenticated..index.routes.js");
    //     console.log("_________________________________");
    //     res.redirect("/login");
    // }
});

// route to get all of a rep's customers
router.get('/dashboard', (req, res, next) => {
    // if (req.isAuthenticated()) {
        console.log("_________________________________");
        console.log("route /dashboard..index.routes.js");
        console.log("_________________________________");
        db.customers.findAll({
            where: {
                repRepId: req.user.rep_id,
            },
            order: db.sequelize.col('customer_company')
        }).then(function (results) {
            console.log(results);
            res.json(results);
            // res.redirect("/")
        });
    // } else {
    //     console.log("_________________________________");
    //     console.log("User not Authenticated..index.routes.js");
    //     console.log("_________________________________");
    //     res.redirect("/login");
    // }
});

// post to create a new product
router.post('/postProducts', (req, res, next) =>{
    console.log("_________________________________");
    console.log("creating post..index.routes.js");
    console.log("_________________________________");
    // if(req.isAuthenticated()){
        db.products.create({
            product_name: req.body.product_name,
            product_description: req.body.product_description,
            product_quantity: req.body.product_quantity,
        }).then(function(results){
            console.log("Your product was created!");
            res.json(results);
            // res.redirect('/dashboard');
        });
    // }else{
    //     res.redirect("/account/login");        
    // }
});

// route to get customers from a particular rep
router.get('/customers/:id', (req, res, next) =>{
    // if(req.isAuthenticated()){
        db.customers.findAll({
            include:[{
                model: db.reps,
                where:{
                    repRepId: req.params.id
                    },
                }],
            order: db.sequelize.col('customer_company')
        }).then(function(results){
            // var studentList = {students: results}
            // res.render('specificClass', studentList);
            res.json(doc)
        });
    // }else{
    //     res.redirect("/account/login");
    // }
});



// route to page for creating new customer
// router.get('/newcustomer' , (req, res, done) => {
//     if(req.isAuthenticated()){
//         db.customers.findAll({
//             include:[{
//                 model: db.reps,
//                 attribute: [['name', 'rep_userName']]
//             }],
//             where:{
//                 repRepId: req.user.teacher_id,
//             },
//             order: db.sequelize.col('customer_company')
//     }).then(function(results){
//         // var classNames = {classes: results}
//         // res.render('newstudent', classNames);
//         res.json(doc)
//         });
//     }else{
//         res.redirect("/account/login");
//     }        
// })

// router.get('/editcustomer/:rep/:id', (req,res,next) => {
//     if(req.isAuthenticated()){
//         db.classes.findAll({
//             where:{
//                 class_id: req.params.class,
//             },
//             include:[{
//                 model: db.schedules,
//                 include:[{
//                     model: db.students,
//                     where:
//                        { student_id: req.params.id }
//                 }]
//             }]
//         }).then(function(results){
//             var studentInfo = {classes: results}
//             res.render('editStudent', studentInfo);
            // res.json(results[0].schedules[0].student.student_firstName);
            // res.json(results);
//         });
//     }else{
//         res.redirect("/account/login");
//     }
// });

// post to edit student info
// router.post('/editStudent/:id', (req, res, next) =>{
//     if(req.isAuthenticated()){
//         console.log("request body: " + req.body);
//         db.students.update({
//             student_lastName: req.body.inputStudentLastName,
//             student_firstName: req.body.inputStudentFirstName,
//             student_phone: req.body.inputStudentPhone,
//             student_email: req.body.inputStudentEmail,
//             student_gender: req.body.selectGender,
//             student_gradeLevel: req.body.selectGrade,
//             student_hallPass: req.body.inputStudentHallPass,
//             student_homeworkPass: req.body.inputStudentHomeworkPass,
//             student_score: req.body.inputStudentScore,
//             student_gender: req.body.selectGender,
//             student_active: req.body.studentActive},
//            { where: {
//                 student_id: req.params.id
//             }
//         }).then(function(results){
//             console.log("post complete");
//             res.redirect('/dashboard');
//         });
//     }else{
//         res.redirect("/account/login");        
//     }
// })

// router.post('/editNotes/:class/:id', (req, res, next) => {
//     if (req.isAuthenticated()) {
//         console.log("request body: " + req.body);
//         db.students.update({
//             student_notes: req.body.inputStudentNotes
//         },
//             {
//                 where: {
//                     student_id: req.params.id
//                 }
//             }).then(function (results) {
//                 console.log("post complete");
//                 res.redirect("/class/" + req.params.class);
//             });
//     } else {
//         res.redirect("/account/login");
//     }
// })

module.exports = router;