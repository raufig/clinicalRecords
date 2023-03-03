const fs = require('fs')
const path = require('path')

const CRYPTO = require('../middleware/crypto')
const { sendConfirmationEmail, sendchangePass } = require('../middleware/nodeMailer')
const { token } = require('../middleware/token')
const { Patient } = require('../model/patient.model')
const { Hospital } = require('../model/hospital.model')
const { Doctor } = require('../model/doctor.model')

const { Analysis } = require('../model/AnalysisAndManagement.model')
const { Anamesi } = require('../model/anamnesis.model')
const { Background } = require('../model/background.model')
const { ClinicalRecord } = require('../model/clinicalRecord.model')
const { Medicine } = require('../model/medicines.model')
const { PhisicalExam } = require('../model/PhysicalExam.model')
const { Referral } = require('../model/referral.model')
const { Surgery } = require('../model/surgeryOrder.model')


const ctrl = {}

ctrl.login = async (data, res) => {
  let kindOfUser = data.path.split('/')[2]
  var model = '';
  if(kindOfUser === 'patient') model = Patient
  else if(kindOfUser === 'hospital') model = Hospital
  else if(kindOfUser === 'doctor') model = Doctor
    let payload = {
        document: data.body.document,
        pass: CRYPTO.sha256(data.body.pass),
      };
      /* let checkUser = await model.find({ document: payload.document }); */
      let checkUser = ''
      try {
        checkUser = await model.findOne({ document: payload.document });
      } catch (error) {
        console.log("ERROR",error);
      }
      
      if(!checkUser || checkUser.pass !== payload.pass){
        res
        .writeHead(400)
        .end("wrong document or password")
      }else{
        let response  = { 
          message:'access granted',
          token: await token(checkUser._id.toString(), kindOfUser),
          id: checkUser._id.toString(),
          name: checkUser.name,
          hospital: checkUser.hospital
        }
        if(kindOfUser==='doctor' && checkUser.firstSession){
          response = {message:'change your password first'}
        }
        
        //let _token = await token(payload.id.toString(), kindOfUser)
        res.setHeader("Content-Type", "application/json")
        .setHeader("Access-Control-Allow-Origin", "*")
        .writeHead(200)
        .end(JSON.stringify(response))
      }
      

}
ctrl.register = async (data, res) => {
  let _token = await token(data.params.id, 'hospital');
  //console.log(_token, data.headers.authorization)
  let kindOfUser = data.path.split('/')[2]
  var model='';
  if(kindOfUser === 'patient') model = Patient
  else if(kindOfUser === 'hospital') model = Hospital
  else if(kindOfUser === 'doctor' && data.headers.authorization.replace('Bearer ','') === _token){
     model = Doctor
    }else{
      return res.writeHead(400)
      .end('only the hospital can create doctors users')
    }

  let payload = data.body
  payload.email.toLowerCase()
  let checkNewUser = ''
  try {
    checkNewUser = await model.findOne({ document: payload.document });
  } catch (e) {
    console.log(e)
    return res.writeHead(404)
    .end(`Invalid data sent to ${kindOfUser}, please fill in the data correctly`);
  }
  if(checkNewUser){
    return res.writeHead(400)
    .end("enable user registration already exist!!!");
  }else{
    payload.pass = CRYPTO.sha256(payload.pass)
    let newUser = new model(payload);
    const result = await newUser.save();

    sendConfirmationEmail(result.email, kindOfUser, result._id.toString())
    res.setHeader("Content-Type", "application/json")
      .setHeader("Access-Control-Allow-Origin", "*")
      .writeHead(200)
      .end(JSON.stringify(result))
  }
}

ctrl.authEmail = async (data, res) => {
    let kindOfUser = data.params.kindOfUser
    var model='';
    if(kindOfUser === 'patient') model = Patient
    else if(kindOfUser === 'hospital') model = Hospital
    else if(kindOfUser === 'doctor') model = Doctor
    const checkUser = await model.findById(data.params.id)
    
    if(!checkUser){
      return res.writeHead(400)
      .end("enable user validation, user does not exist exist!!!");
    }else{
      const validateUser = await model.findByIdAndUpdate( data.params.id, { validated: true }, {new: true})
      

      const tokenResult = await token(validateUser._id.toString(), kindOfUser)
      const result = {
        message: 'change password',
        token: tokenResult
      };
      res.setHeader("Content-Type", "application/json")
      .setHeader("Access-Control-Allow-Origin", "*")
      .writeHead(200)
      .end(JSON.stringify(result))
      
    }
}
ctrl.emailChangePass = async (data,res) => {
  let kindOfUser = data.path.split('/')[2]
    var model='';
    if(kindOfUser === 'patient') model = Patient
    else if(kindOfUser === 'hospital') model = Hospital
    else if(kindOfUser === 'doctor') model = Doctor
    const checkUser = await model.findOne({ email: data.params.email })
    
    if(!checkUser){
      return res.writeHead(400)
      .end("user does not exist !!!");
    }else{
      const result = sendchangePass(checkUser.email, kindOfUser, checkUser._id.toString())

      res.setHeader("Content-Type", "application/json")
      .setHeader("Access-Control-Allow-Origin", "*")
      .writeHead(200)
      .end("check your email")
      
    }
}
ctrl.changePass = async (data, res) => {
  let kindOfUser = data.path.split('/')[2]

  if(data.method==='get'){
    const html = fs.readFileSync(path.join(__dirname, 'view', 'index.html')).toString()
    .replace('__KIND_OF_USER__', kindOfUser)
    .replace('__ID__', data.params.id)
    res.setHeader("Content-Type", "text/html")
      .setHeader("Access-Control-Allow-Origin", "*")
      .writeHead(200)
      .end(html)
  }else{
      var model='';
      if(kindOfUser === 'patient') model = Patient
      else if(kindOfUser === 'hospital') model = Hospital
      else if(kindOfUser === 'doctor' ) model = Doctor
      const checkUser = await model.findById(data.params.id)
    
    if(!checkUser){
      return res.writeHead(400)
      .end("user does not exist!!!");
    }else{
      const result = await model.findByIdAndUpdate(checkUser._id.toString(), {pass: CRYPTO.sha256(data.body.newPassword), firstSession:false}, {new:true})
      let response  = { 
        message:'access granted',
        status:'ok',
        token: await token(result._id.toString(), kindOfUser)
      }
      res.setHeader("Content-Type", "application/json")
      .setHeader("Access-Control-Allow-Origin", "*")
      .writeHead(200)
      .end(JSON.stringify(response))
    }
  }
}

ctrl.createRecord = async (data, res) => {

  let _token = await token(data.params.id, 'doctor');
  
  if(data.headers.authorization.replace('Bearer ','') !== _token){
    return res.writeHead(400)
    .end("unauthorized user!!!");
  }else{
    if(data.method=== 'get'){
      if(!data.body.document){
        return res.writeHead(400)
        .end("pls write the patient document!!!");
      }
      const doctorId = data.params.id
      
      const patientData = await Patient.findOne({ document: data.body.document })
      console.log("AQUI", patientData)
      const populatedData = await ClinicalRecord.find({ patientId: patientData._id.toString(), signature: doctorId })
      .populate({path:'anamesi'})
      .populate({path: 'background' })
      .populate({path: 'medicine' })
      .populate({path: 'physicalExam' })
      .populate({path: 'referral' })
      .populate({path: 'surgery' })
      .populate({path: 'analysis' })



  res.setHeader("Content-Type", "application/json")
    .setHeader("Access-Control-Allow-Origin", "*")
    .writeHead(200)
    .end(JSON.stringify(populatedData))

    }
    if(data.method === 'post' && data.params.action === 'createClinicalRecord'){
      const newClinicalRecord = new ClinicalRecord(data.body)
      const savedData = await newClinicalRecord.save()
      
      res.setHeader("Content-Type", "application/json")
      .setHeader("Access-Control-Allow-Origin", "*")
      .writeHead(200)
      .end(JSON.stringify(savedData))
    }
    if(data.method === 'post' && data.params.action === 'fillOutInformation'){
      let model = ''
      
      let payload = {
        Analysis:{},
        Anamesi:{},
        Background:{},
        Medicine:{},
        PhisicalExam:{},
        Referral:{},
        surgery:{},
      }
      for(const key in data.body){
        console.log("KEYS: ",key)
        if(key ==='Analysis')model = Analysis;
        if(key ==='Anamesi')model = Anamesi;
        if(key ==='Background')model = Background;
        if(key ==='Medicine')model = Medicine;
        if(key ==='PhisicalExam')model = PhisicalExam;
        if(key ==='Referral')model = Referral;
        if(key ==='Surgery')model = Surgery;
        const collection = new model(data.body[key])
        const savedData = await collection.save()
        //console.log(savedData)
        const updateClinicalRecords = await ClinicalRecord.findByIdAndUpdate(savedData.clinicalRecordId, {[key.toLowerCase()]: savedData._id.toString() }, {new:true})
        console.log("AQUI ", updateClinicalRecords)
        Object.assign(payload[key],  savedData)
      }

      //console.log(payload)
      res.setHeader("Content-Type", "application/json")
      .setHeader("Access-Control-Allow-Origin", "*")
      .writeHead(200)
      .end(JSON.stringify(payload))
    }
  }

}

ctrl.getClinicalRecords = async (data, res) => {
  let kindOfUser = data.path.split('/')[2]
  let _token = await token(data.params.id, kindOfUser);
  if(data.headers.authorization.replace('Bearer ','') !== _token){
    return res.writeHead(400)
        .end("user is not autenticated")
  }else{
    let target   = ''
    if(kindOfUser === 'hospital') target = 'hospitalId'
    else if(kindOfUser === 'patient') target = 'patientId'
    const clinicalRecords = await ClinicalRecord.find({[target]:data.params.id})
    .populate({path:'anamesi'})
    .populate({path: 'background' })
    .populate({path: 'medicine' })
    .populate({path: 'physicalExam' })
    .populate({path: 'referral' })
    .populate({path: 'surgery' })
    .populate({path: 'analysis' })
    res.setHeader("Content-Type", "application/json")
      .setHeader("Access-Control-Allow-Origin", "*")
      .writeHead(200)
      .end(JSON.stringify(clinicalRecords))
  }
}


const PDFDocument = require('pdfkit');


ctrl.downloadFile =async( data, res) => {
  let kindOfUser = data.path.split('/')[2]
  let _token = await token(data.params.id, kindOfUser);
  console.log(_token)
  console.log(data.headers.authorization)
  if(data.headers.authorization.replace('Bearer ','') !== _token){
    return res.writeHead(400)
        .end("user is not autenticated")
  }else{
    let target   = ''
    if(kindOfUser === 'hospital') target = 'hospitalId'
    else if(kindOfUser === 'patient') target = 'patientId'
    const clinicalRecords = await ClinicalRecord.find({[target]:data.params.id})
    .populate({path:'anamesi'})
    .populate({path: 'background' })
    .populate({path: 'medicine' })
    .populate({path: 'physicalExam' })
    .populate({path: 'referral' })
    .populate({path: 'surgery' })
    .populate({path: 'analysis' })
    
    const jsonParsed = clinicalRecords.map(cr => cr.toObject());

    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(`${jsonParsed.userName}.pdf`));
  
    doc.fontSize(16).text('Clinical record:', { underline: true });
    doc.moveDown();
    doc.fontSize(12).text(JSON.stringify(jsonParsed, null, 2));
  
    doc.end();
    console.log(`PDF file ${`${jsonParsed.userName}.pdf`} created successfully.`);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${`${jsonParsed.userName}.pdf`}`);
    fs.createReadStream(`${jsonParsed.userName}.pdf`).pipe(res);
  }
 
}


module.exports = ctrl