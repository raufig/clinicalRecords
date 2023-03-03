# clinicalRecords

usage:
GET:
/api/autentication
/api/patient/login
/api/hospital/login
/api/doctor/login

'/api/patient/changePassword'

'/api/hospital/changePassword'
'/api/doctor/changePassword'

'/api/doctor/createRecord'
http://localhost:1234/api/doctor/createRecord?id=64008ba6b76472c14501f1b2&action=fillOutInformation
body:
```JSON
{
    "document":"159753456852"
}
```
'/api/user/getClinicalRecords'
'/api/hospital/getClinicalRecords'

'/api/user/downloadFile'
'/api/hospital/downloadFile'

POST:
'/api/patient/register'
body:
```JSON
{
  "document": "159753456852",
  "name": "justina",
  "lastName": "del barrio",
  "email": "raufig@gmail.com", // can be tested with real gmail emails
  "phone": "35035035036",
  "pass": "pass123!"
}
```
'/api/hospital/register'
body:
```JSON
{

  "document": "159753456852-1",
  "name": "hospital",
  "address": "calle falsa 123",
  "email": "raufig@gmail.com",// can be tested with real gmail emails
  "phone": "35035035036",
  "pass": "pass123!",
  "medicalServicesProvided": [
    "pediatria",
    "gastroenterologia",
    "otros"
  ]
}
```
'/api/doctor/register' (required hospital be authenticated with bearer token)
body:
```JSON
{
  "document": "99999999",
  "name": "Pilar",
  "lastName": "Pilar",
  "email": "raufig@gmail.com", // can be tested with real gmail emails
  "phone": "35035035036",
  "pass": "pass123!",
  "profession": "Pediatra",
}
```
'/api/patient/changePassword'
'/api/hospital/changePassword'
'/api/doctor/changePassword'

'/api/doctor/createRecord'
http://localhost:1234/api/doctor/createRecord?id=64008ba6b76472c14501f1b2&action=fillOutInformation
body:
```JSON
{

    "Analysis":{
        "patientId":"640154e9a3bd0a16871433de",
        "signature": "64008ba6b76472c14501f1b2",
        "clinicalRecordId":"64014f6372b2320c1e735953",
        "analysis":[
            {
                "analysisName": "paciente con cardiopatia",
                "analysisDescription":"se recomienda tomar pastillas cada 8 horas para controlar cardiopatia"
            }
        ],
        "disability":{
            "disability":true,
            "numOfDays": 2
        },
        "diagnosis":"cardiopatia leve pericentral"
    },
    "Anamesi":{
        "patientId":"640154e9a3bd0a16871433de",
        "signature": "64008ba6b76472c14501f1b2",
        "clinicalRecordId":"64014f6372b2320c1e735953",
        "presentDisease":"N/A",
        "reasonForConsultation": " paciente presenta dolor punzante al lado izquierdo del pecho en ocaciones inmovilizante",
        "pain":{
            "painScale": 8,
            "painClassification": "dolor punzante"
        }
    },
    "Background":{
        "patientId":"640154e9a3bd0a16871433de",
        "signature": "64008ba6b76472c14501f1b2",
        "clinicalRecordId":"64014f6372b2320c1e735953",
        "personalHistory": {
            "patology":"N/A",
            "toxic":"N/A",
            "hypersensitivity":"N/A",
            "pharmacological":"N/A",
            "occupational":"arquitecto",
            "surgical":"N/A",
            "transfusional":"N/A",
            "traumatic":"N/A",
            "allergies":"N/A",
            "allergiesCauses":"N/A",
            "gynecology":"N/A",
            "vaccination":"Covid-19 2 dosis moderna"
        },
        "familyBackground": [
            {"mother":"sin antecedentes"},
            {"father":"sin antecedentes"}
        ]
    },
    "Medicine":{
        "patientId":"640154e9a3bd0a16871433de",
        "signature": "64008ba6b76472c14501f1b2",
        "clinicalRecordId":"64014f6372b2320c1e735953",
        "medicines":[
            {
                "medicineName":"ibuprofeno- naproxeno",
                "medicineDescription": "tomar cada 8 horas o en presencia del dolor"
            }
        ],
        "diagnosis":"cardiopatia leve pericentral"
    },
    "PhisicalExam":{
        "patientId":"640154e9a3bd0a16871433de",
        "signature": "64008ba6b76472c14501f1b2",
        "clinicalRecordId":"64014f6372b2320c1e735953",
        "vitalSigns":{
            "size":{
                "value":1.80,
                "UMT":"M"
            },
            "weight":{
                "value":90,
                "UMP":"Kg"
            },
            "IMC":0,
            "TAS":0,
            "TAD":0,
            "FC":0,
            "FR":0,
            "Temp":35
        },
        "physicalExam":[
            {
                "examName":"auscultación",
                "description": "paciente con corazon arritmico"
            }
        ]
    },
    "Referral":{
        "patientId":"640154e9a3bd0a16871433de",
        "signature": "64008ba6b76472c14501f1b2",
        "clinicalRecordId":"64014f6372b2320c1e735953",
        "specialist": [
            {
                "specialistName":"Cardiologia primera vez",
                "specialistDescription":"Se remite a cardiologia para evaluacion mas precisa"
            }
        ],
        "diagnosis":"cardiopatia leve pericentral"
    },
    "SurgeryOrder":{
        "patientId":"640154e9a3bd0a16871433de",
        "signature": "64008ba6b76472c14501f1b2",
        "clinicalRecordId":"64014f6372b2320c1e735953",
        "surgery":[
            {
                "surgeryName":"N/A",
                "surgeryDescription":"N/A"
            }
        ],
        "diagnosis":"cardiopatia leve pericentral"
    }
}
```
http://localhost:1234/api/doctor/createRecordid=64008ba6b76472c14501f1b2&action=createClinicalRecord
body:
```JSON
{
    "patientId":"63fff8811031696a3604c28d",
    "signature": "64008ba6b76472c14501f1b2",
    "time":"16:30",
    "hospitalName":"hospital",
    "doctorName": "Pilar",
    "approvalNum": 1,
    "kindOfAttention": "medicina general"
}
```
PUT:
'/api/patient/sendEmailChangePassword'
http://localhost:1234/api/patient/sendEmailChangePassword?email=raufig@gmail.com
'/api/hospital/sendEmailChangePassword'
http://localhost:1234/api/hospital/sendEmailChangePassword?email=raufig@gmail.com
'/api/doctor/sendEmailChangePassword'
http://localhost:1234/api/doctor/sendEmailChangePassword?email=raufig@gmail.com

update password function, check if the email is created in the database, and send an html to the email with instructions to change the password


