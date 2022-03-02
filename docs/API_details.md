## API Details

### login API

``` bash 
URL: http://localhost:3000/api/user/login
Request Body:
{
    "username": "pradeep",
    "password": "pradeep"
}
Response Body:
{
    "message": "Login Successful.",
    "response": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InByYWRlZXAiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImphZGhhdnByYWRlZXAwMkBnbWFpbC5jb20iLCJpYXQiOjE2MzM4NTc1MzUsImV4cCI6MTYzMzg2MTEzNX0.uyqa-Ff9C4V4PExF5GCve7_XhGpl5PYWV8FGcP7m5aM",
        "user": {
            "username": "pradeep",
            "role": "admin",
            "email": "jadhavpradeep02@gmail.com"
        }
    }
}
```
### Get All Visitors data
``` bash 

GET 
URL: http://localhost:3000/api/visitor

with Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InByYWRlZXAiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImphZGhhdnByYWRlZXAwMkBnbWFpbC5jb20iLCJpYXQiOjE2MzM4NTI2ODQsImV4cCI6MTYzMzg1NjI4NH0.qWWquy66Yf6N9jagGVMnr6kI3cU4O2LgZP1efbywaho

No request body.

Response Body: 
[
    {
        "visitor_id": 1,
        "visitor_name": "Mohan",
        "visitor_mobile": "9867153742",
        "visitor_email": "mohan@abc.com",
        "uan": "1122334455",
        "pf_account_no": "MH/BAN/0002/25788/29882",
        "establishment_name": "IBM",
        "created_at": "2021-10-08T18:58:50.000Z",
        "grievance_category": "Normal",
        "no_of_visit": 1,
        "attended_at_level": "Clerk",
        "grievance_details": "Pension not started",
        "status": "Pending"
    }
]
```
### Add User
``` bash 

POST 
URL: http://localhost:3000/api/visitor/add

with Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InByYWRlZXAiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImphZGhhdnByYWRlZXAwMkBnbWFpbC5jb20iLCJpYXQiOjE2MzM4NTI2ODQsImV4cCI6MTYzMzg1NjI4NH0.qWWquy66Yf6N9jagGVMnr6kI3cU4O2LgZP1efbywaho

Request Body:
{
    "visitor_name" : "Amol Kumar",
    "visitor_mobile" : "9867452312",
    "visitor_email" :   "amol.kumar@gmail.com",
    "uan" : "112233445566771",
    "pf_account_no" : "MH/BAN/0002/25788/12234",
    "establishment_name" : "Infosys",
    "grievance_category" : "Major",
    "no_of_visit" : "1",
    "attended_at_level" : "Clerk",
    "grievance_details" : "Pension is pending",
    "status" : "Not resolved"
}

Response:
{
    "status": "200",
    "message": "Grievance and Visitor Added successfully"
}

```
### Update User
``` bash 

PUT 
URL: http://localhost:3000/api/visitor/update

with Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InByYWRlZXAiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImphZGhhdnByYWRlZXAwMkBnbWFpbC5jb20iLCJpYXQiOjE2MzM4NTI2ODQsImV4cCI6MTYzMzg1NjI4NH0.qWWquy66Yf6N9jagGVMnr6kI3cU4O2LgZP1efbywaho

Request Body:
{
    "visitor_name" : "Amol Kumar",
    "visitor_mobile" : "9867452312",
    "visitor_email" :   "amol.kumar@gmail.com",
    "uan" : "112233445566771",
    "pf_account_no" : "MH/BAN/0002/25788/12234",
    "establishment_name" : "Infosys",
    "grievance_category" : "Major",
    "no_of_visit" : "1",
    "attended_at_level" : "Clerk",
    "grievance_details" : "Pension is pending",
    "status" : "Not resolved"
}
Response Body:
{
    "status": "200",
    "message": "Grievance and Visitor Updated successfully"
}

```

### Delete User

``` bash 

DELETE
URL: http://localhost:3000/api/visitor/delete?visitor_id=4

with Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InByYWRlZXAiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImphZGhhdnByYWRlZXAwMkBnbWFpbC5jb20iLCJpYXQiOjE2MzM4NTI2ODQsImV4cCI6MTYzMzg1NjI4NH0.qWWquy66Yf6N9jagGVMnr6kI3cU4O2LgZP1efbywaho

Request Body:
NA
Response Body:
{
    "status": "200",
    "message": "Record deleted successfully"
}

```
### Search Visitor
``` bash 
POST
URL: http://localhost:3000/api/visitor/search

with Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InByYWRlZXAiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImphZGhhdnByYWRlZXAwMkBnbWFpbC5jb20iLCJpYXQiOjE2MzM4NTI2ODQsImV4cCI6MTYzMzg1NjI4NH0.qWWquy66Yf6N9jagGVMnr6kI3cU4O2LgZP1efbywaho

Request Body:
{
    "by":"epfo",
    "value":"MH/BAN"
}
or {
    "by":"phone",
    "value":"9867"
} 
or  {
    "by":"email",
    "value":"amit@"
}

Response Body:
[
    {
        "visitor_id": 1,
        "visitor_name": "Mohan",
        "visitor_mobile": "9867153742",
        "visitor_email": "mohan@abc.com",
        "uan": "1122334455",
        "pf_account_no": "MH/BAN/0002/25788/29882",
        "establishment_name": "IBM",
        "created_at": "2021-10-08T18:58:50.000Z",
        "grievance_category": "Normal",
        "no_of_visit": 1,
        "attended_at_level": "Clerk",
        "grievance_details": "Pension not started",
        "status": "Pending"
    },
    {
        "visitor_id": 8,
        "visitor_name": "Kunal Saha",
        "visitor_mobile": "9867452314",
        "visitor_email": "amit.saha@gmail.com",
        "uan": "112233445566889",
        "pf_account_no": "MH/BAN/0002/23145/87908",
        "establishment_name": "TCS",
        "created_at": "2021-10-10T09:51:50.000Z",
        "grievance_category": "Minor",
        "no_of_visit": 2,
        "attended_at_level": "PF Inspector",
        "grievance_details": "Action taken, will resolve within 1 week",
        "status": "Inprogress"
    }
]

```

### Search Establishment
``` bash  
POST
URL: http://localhost:3000/api/visitor/search
Request Body: 
{
    "by":"establishment",
    "value":"indira printing"
}

Response:
[
    {
        "estb_id": 9,
        "establishment_id": "PUPUN0003998000",
        "establishment_name": "INDIRA PRINTING PRESS",
        "estb_account_task_id": "10101"
    }
]

```
### Reports API :

``` bash 
POST
URL: http://localhost:3000/api/visitor/report
Request Body: 
{
    "start_date": "2021-10-09 00:00:00",
    "end_date": "2021-10-09 23:59:59",
    "type": "grievance_category"
}

Response:
[
   {
      "visitor_id":4,
      "visitor_name":"Mohan Kumar",
      "visitor_mobile":"8928898672",
      "visitor_email":"mohan.k@gmali.com",
      "member_name":"Sahil",
      "member_phone":"7865453421",
      "grievance_id":1002,
      "uan":"977327656012",
      "pf_account_no":"PA/PUN/99999/888/77777",
      "ppo_number":"",
      "establishment_name":"BOMBAY TRADING SWADESHI STORES",
      "estb_account_task_id":"10204",
      "establishment_id":"PUPUN0003987000",
      "created_at":"2021-12-06T17:57:30.000Z",
      "grievance_category":"Transfer_F13",
      "section":"pension",
      "no_of_visit":4,
      "attended_at_level":"RPC2",
      "grievance_details":"Tranfer issue",
      "status":"in_progress",
      "visited_at":"2021-12-06T17:57:30.000Z"
   }
]
```

Visitor Status :

```bash
Request URL: http://localhost:3000/api/visitor/status
Request: NA
Response:
{
   "daily":{
      "total":0,
      "pending":0,
      "resolved":0
   },
   "weekly":{
      "total":0,
      "pending":0,
      "resolved":0
   },
   "monthly":{
      "total":2,
      "pending":2,
      "resolved":0
   },
   "total":{
      "total":2,
      "pending":2,
      "resolved":0
   }
}

```

API Visitor > Close

```bash
Request URL (POST): http://localhost:3000/api/visitor/close
Request: 
{
    "grievance_id": "1",
    "status": "Closed",
    "attended_at_level": "APC",
    "no_of_visit": "4",
    "grievance_details": "closed now"
}
Response:
{
    "status": "200",
    "message": "Grievance and Visitor Status closed successfully"
}
```

API Top Visits

```bash
Request URL (GET request): http://localhost:3000/api/visitor/topvisits
Request: 
{}
Response:
[
   {
      "visitor_id":4,
      "visitor_name":"Mohan Kumar",
      "visitor_mobile":"8928898672",
      "visitor_email":"mohan.k@gmali.com",
      "member_name":"Sahil",
      "member_phone":"7865453421",
      "grievance_id":1002,
      "uan":"977327656012",
      "pf_account_no":"PA/PUN/99999/888/77777",
      "ppo_number":"",
      "establishment_name":"BOMBAY TRADING SWADESHI STORES",
      "estb_account_task_id":"10204",
      "establishment_id":"PUPUN0003987000",
      "created_at":"2021-12-06T17:57:30.000Z",
      "grievance_category":"Transfer_F13",
      "section":"pension",
      "no_of_visit":4,
      "attended_at_level":"RPC2",
      "grievance_details":"Tranfer issue",
      "status":"in_progress",
      "visited_at":"2021-12-06T17:57:30.000Z"
   }
]
```

/// Longest pending Grivances API Request
API : top Pending Grievances :

```bash
Request URL (GET request): http://localhost:3000/api/visitor/toppending
Request: 
{}
Response:
[
   {
      "visitor_id":4,
      "visitor_name":"Mohan Kumar",
      "visitor_mobile":"8928898672",
      "visitor_email":"mohan.k@gmali.com",
      "member_name":"Sahil",
      "member_phone":"7865453421",
      "grievance_id":1002,
      "uan":"977327656012",
      "pf_account_no":"PA/PUN/99999/888/77777",
      "ppo_number":"",
      "establishment_name":"BOMBAY TRADING SWADESHI STORES",
      "estb_account_task_id":"10204",
      "establishment_id":"PUPUN0003987000",
      "created_at":"2021-12-06T17:57:30.000Z",
      "grievance_category":"Transfer_F13",
      "section":"pension",
      "no_of_visit":4,
      "attended_at_level":"RPC2",
      "grievance_details":"Tranfer issue",
      "status":"in_progress",
      "visited_at":"2021-12-06T17:57:30.000Z"
   }
]

```


NEXT API REQUEST : [ Refer feature reqeust of 19-01-2022 ]



// Visitors Search API : Result >> Visitors list
    Search by : visitor name / uan / mobile / visitor_email / pf_account_no
    Result : Visitor details + Visitors grievances ( All ) + All visits data of every grievance

``` bash 
POST
URL: http://localhost:3000/api/visitor/search

with Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InByYWRlZXAiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImphZGhhdnByYWRlZXAwMkBnbWFpbC5jb20iLCJpYXQiOjE2MzM4NTI2ODQsImV4cCI6MTYzMzg1NjI4NH0.qWWquy66Yf6N9jagGVMnr6kI3cU4O2LgZP1efbywaho

Request Body:
{
    "by":"epfo",
    "value":"MH/BAN",
    search: "visitor"
}
or {
    "by":"phone",
    "value":"9867",
    search: "visitor"
} 
or  {
    "by":"email",
    "value":"amit@",
    search: "visitor"
}

Response Body:
[
    {
        "visitor_id": 1,
        "visitor_name": "Mohan",
        "visitor_mobile": "9867153742",
        "visitor_email": "mohan@abc.com",
        "uan": "1122334455",
        "pf_account_no": "MH/BAN/0002/25788/29882",
        "establishment_name": "IBM",
        "created_at": "2021-10-08T18:58:50.000Z",
        "grievance_category": "Normal",
        "no_of_visit": 1,
        "attended_at_level": "Clerk",
        "grievance_details": "Pension not started",
        "status": "Pending"
    },
    {
        "visitor_id": 8,
        "visitor_name": "Kunal Saha",
        "visitor_mobile": "9867452314",
        "visitor_email": "amit.saha@gmail.com",
        "uan": "112233445566889",
        "pf_account_no": "MH/BAN/0002/23145/87908",
        "establishment_name": "TCS",
        "created_at": "2021-10-10T09:51:50.000Z",
        "grievance_category": "Minor",
        "no_of_visit": 2,
        "attended_at_level": "PF Inspector",
        "grievance_details": "Action taken, will resolve within 1 week",
        "status": "Inprogress"
    }
]
```

// Members Search API : Result >> Members list
    Search by : member_name / uan / member_mobile / pf_account_no
    Result : Member details + Members grievances ( All ) + All visits data of every grievance 

```bash
Request URL: http://localhost:3000/api/visitor/membersearch

Request Object:
{
    "by":"member_mobile",
    "value":"9876"
}
{
    "by":"member_name",
    "value":"jayprakas"
}
{
    "by":"uan",
    "value":"9773"
}
{
    "by":"pf_account_no",
    "value":"9773"
}

Response Object:
[
    {
        "grievance_id": 1008,
        "visitor_id": 8,
        "member_name": "Jayprakash Ahuja",
        "member_phone": "9876543210",
        "uan": "1779773276790",
        "pf_account_no": "PU/PUN/123/99/8887",
        "ppo_number": "",
        "establishment_name": "",
        "estb_account_task_id": "",
        "establishment_id": "",
        "grievance_category": "KYC_Update",
        "section": "compliance",
        "no_of_visit": 2,
        "attended_at_level": "DA",
        "grievance_details": "modify kyc",
        "status": "in_progress",
        "visit_at": "2022-02-13T12:18:29.000Z"
    },
    {
        "grievance_id": 1008,
        "visitor_id": 8,
        "member_name": "Jayprakash Ahuja",
        "member_phone": "9876543210",
        "uan": "1779773276790",
        "pf_account_no": "PU/PUN/123/99/8887",
        "ppo_number": "",
        "establishment_name": "",
        "estb_account_task_id": "",
        "establishment_id": "",
        "grievance_category": "KYC_Update",
        "section": "compliance",
        "no_of_visit": 3,
        "attended_at_level": "SSAO",
        "grievance_details": "modify kyc forwarded to next level",
        "status": "in_progress",
        "visit_at": "2022-02-13T12:58:06.000Z"
    }
]
```



// Member details pade
>> Get Member details >>

``` bash 
Request URL: http://localhost:3000//api/visitor/member?uan=899766123456

Response : 
[
    {
        "grievance_id": 1008,
        "visitor_id": 8,
        "member_name": "Jayprakash Ahuja",
        "member_phone": "9876543210",
        "uan": "1779773276790",
        "pf_account_no": "PU/PUN/123/99/8887",
        "ppo_number": "",
        "establishment_name": "",
        "estb_account_task_id": "",
        "establishment_id": "",
        "grievance_category": "KYC_Update",
        "section": "compliance",
        "no_of_visit": 2,
        "attended_at_level": "DA",
        "grievance_details": "modify kyc",
        "status": "in_progress",
        "visit_at": "2022-02-13T12:18:29.000Z"
    },
    {
        "grievance_id": 1008,
        "visitor_id": 8,
        "member_name": "Jayprakash Ahuja",
        "member_phone": "9876543210",
        "uan": "1779773276790",
        "pf_account_no": "PU/PUN/123/99/8887",
        "ppo_number": "",
        "establishment_name": "",
        "estb_account_task_id": "",
        "establishment_id": "",
        "grievance_category": "KYC_Update",
        "section": "compliance",
        "no_of_visit": 3,
        "attended_at_level": "SSAO",
        "grievance_details": "modify kyc forwarded to next level",
        "status": "in_progress",
        "visit_at": "2022-02-13T12:58:06.000Z"
    }
]
```  

//  Visitor Detail Page
>> Get Visitor details >>

``` bash 
Request URL: http://localhost:3000//api/visitor/visitordata?visitor_id=3

Response : 
[
    {
        "grievance_id": 1008,
        "visitor_id": 8,
        "member_name": "Jayprakash Ahuja",
        "member_phone": "9876543210",
        "uan": "1779773276790",
        "pf_account_no": "PU/PUN/123/99/8887",
        "ppo_number": "",
        "establishment_name": "",
        "estb_account_task_id": "",
        "establishment_id": "",
        "grievance_category": "KYC_Update",
        "section": "compliance",
        "no_of_visit": 2,
        "attended_at_level": "DA",
        "grievance_details": "modify kyc",
        "status": "in_progress",
        "visit_at": "2022-02-13T12:18:29.000Z"
    },
    {
        "grievance_id": 1008,
        "visitor_id": 8,
        "member_name": "Jayprakash Ahuja",
        "member_phone": "9876543210",
        "uan": "1779773276790",
        "pf_account_no": "PU/PUN/123/99/8887",
        "ppo_number": "",
        "establishment_name": "",
        "estb_account_task_id": "",
        "establishment_id": "",
        "grievance_category": "KYC_Update",
        "section": "compliance",
        "no_of_visit": 3,
        "attended_at_level": "SSAO",
        "grievance_details": "modify kyc forwarded to next level",
        "status": "in_progress",
        "visit_at": "2022-02-13T12:58:06.000Z"
    }
]
``` 

=== Add User API ===========

```

API : http://localhost:3000/api/user/addUser

Post Request Object:
{
    "username": "username",
    "email":"abcd@def.com",
    "password": "abc@123",
    "role":"admin"
}

Response:
{
    "status": "200",
    "message": "User Added successfully"
}

```