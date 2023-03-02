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
  //.end HTML WITH INPUTS to change password
  '/api/patient/changePassword': ctrl.changePass,
  '/api/hospital/changePassword': ctrl.changePass,
  '/api/doctor/changePassword': ctrl.changePass,

  '/api/doctor/createRecord': ctrl.createRecord
}

routes.POST = {
  '/api/patient/register': ctrl.register,
  '/api/hospital/register': ctrl.register,
  '/api/doctor/register': ctrl.register,
  '/api/patient/changePassword': ctrl.changePass,
  '/api/hospital/changePassword': ctrl.changePass,
  '/api/doctor/changePassword': ctrl.changePass,
  
  '/api/doctor/createRecord': ctrl.createRecord
}

routes.PUT = {
  '/api/patient/sendEmailChangePassword': ctrl.emailChangePass,
  '/api/hospital/sendEmailChangePassword': ctrl.emailChangePass,
  '/api/doctor/sendEmailChangePassword': ctrl.emailChangePass
}

routes.DELETE = {
  '/api/user/:id': ctrl.deleteUserById 
}

module.exports = routes