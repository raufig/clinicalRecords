const CRYPTO = require('./crypto');

const { Patient } = require('../model/patient.model')
const { Hospital } = require('../model/hospital.model')
const { Doctor } = require('../model/doctor.model')


const token = async (id, type) => {
    
    let kindOfUser = type
    var model='';
    if(kindOfUser === 'patient') model = Patient
    if(kindOfUser === 'hospital') model = Hospital
    if(kindOfUser === 'doctor') model = Doctor
    
    const dbFind = await model.findById(id)
    if(!dbFind){
        return false
    }else{
        if( type==='doctor' ){
            const date = new Date();
    
            const day = ('0' + date.getDate()).slice(-2);
            const month = ('0' + (date.getMonth() + 1)).slice(-2);
    
            const hash = CRYPTO.sha224(id, dbFind.name, day, month, type);
            return hash
        }else{
            const date = new Date();
    
            const day = ('0' + date.getDate()).slice(-2);
            const month = ('0' + (date.getMonth() + 1)).slice(-2);
    
            const hash = CRYPTO.sha224(id, dbFind.name, day, month);
            return hash
        }
    }
    
    
}

module.exports = { token }