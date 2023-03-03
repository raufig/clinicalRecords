const ctrl = require('../controller/index.ctrl')

const routes = {
  notFound: async (data, res) => {
    let payload = {
      message: "File Not Found",
      code: 404
    };
    let payloadStr = JSON.stringify(payload);
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(404);
    res.write(payloadStr);
    res.end("\n");
  }
};

routes.GET = {
  '/api/autentication':ctrl.authEmail,
  '/api/patient/login': ctrl.login,
  '/api/hospital/login': ctrl.login,
  '/api/doctor/login': ctrl.login,
  
  '/api/patient/changePassword': ctrl.changePass,
  '/api/hospital/changePassword': ctrl.changePass,
  '/api/doctor/changePassword': ctrl.changePass,

  '/api/doctor/createRecord': ctrl.createRecord, //doctor can review the prev clinicals records created by him using the patient document
  '/api/user/getClinicalRecords': ctrl.getClinicalRecords,
  '/api/hospital/getClinicalRecords': ctrl.getClinicalRecords,

  '/api/user/downloadFile': ctrl.downloadFile,
  '/api/hospital/downloadFile': ctrl.downloadFile
}

routes.POST = {
  '/api/patient/register': ctrl.register,
  '/api/hospital/register': ctrl.register,
  '/api/doctor/register': ctrl.register,
  '/api/patient/changePassword': ctrl.changePass,
  '/api/hospital/changePassword': ctrl.changePass,
  '/api/doctor/changePassword': ctrl.changePass,
  
  '/api/doctor/createRecord': ctrl.createRecord //doctor post new updated to a clinical record of a new one
}

routes.PUT = {
  '/api/patient/sendEmailChangePassword': ctrl.emailChangePass,
  '/api/hospital/sendEmailChangePassword': ctrl.emailChangePass,
  '/api/doctor/sendEmailChangePassword': ctrl.emailChangePass
}

module.exports = routes