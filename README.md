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
'/api/user/getClinicalRecords'
'/api/hospital/getClinicalRecords'

'/api/user/downloadFile'
'/api/hospital/downloadFile'

POST:
'/api/patient/register'
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

PUT:
'/api/patient/sendEmailChangePassword'
'/api/hospital/sendEmailChangePassword'
'/api/doctor/sendEmailChangePassword'

