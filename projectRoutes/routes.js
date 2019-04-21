const employee = require('../controller/employee');
const modulee = require('../controller/module');
const task = require('../controller/task');
const empTraining = require('../controller/empTraining');
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.text());
router.use(bodyParser.json());
router.get('/employee', employee.employeeGet);
router.post('/employee', employee.employeeInsert);
router.get('/employeeFetch', employee.employeeFetch);
router.get('/employeeFetchId', employee.employeeFetchId);
router.post('/employeeUpdate', employee.employeeUpdate);
router.get('/employeeDelete', employee.employeeDelete);
router.get('/module', modulee.moduleGet);
router.post('/module', modulee.moduleInsert);
router.get('/moduleFetch', modulee.moduleFetch);
router.get('/moduleFetchId', modulee.moduleFetchId);
router.get('/moduleDelete', modulee.moduleDelete);
router.post('/moduleUpdate', modulee.moduleUpdate);
router.get('/task', task.taskGet);
router.post('/task', task.taskInsert);
router.get('/taskFetch', task.taskFetch);
router.get('/taskFetchId', task.taskFetchId);
router.get('/taskDelete', task.taskDelete);
router.post('/taskUpdate', task.taskUpdate);
router.get('/training', empTraining.empTrainingGet);
router.post('/training', empTraining.empTrainingInsert);
router.get('/trelloBoard', empTraining.trelloBoard);
router.get('/updateDrift', empTraining.updateDriftParams);
router.post('/updateDrift', empTraining.updateDrift);
//router.

module.exports = router;