const expressFr = require('express');
const router = expressFr.Router();

const reportController = require('../controller/report-controller');

// creating a new report
router.post("/report/create", reportController.createReport);

// reading all reports
router.get("/report/read", reportController.readAllReport);

// read one report
router.get("/report/read/:id", reportController.readByReportId);

// update report
router.patch("/report/update/:id", reportController.updateReportById);

// delete report
router.delete("/report/delete/:id", reportController.deleteReportById);

module.exports = router;