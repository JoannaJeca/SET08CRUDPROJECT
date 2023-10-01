//HEALTHCARE APPOINTMENT SCHEDULER: Build a system for scheduling medical appointments.

import http, { IncomingMessage, ServerResponse } from "http"

interface iFeedback{
    notification:string
    availability:boolean
    patientData: null | {}| {}[]
}

interface iData{
    patientId :number
    doctor:string
    timeScheduled :string
    illness : string
    Grieviousness : number
};

let patient_Data:iData[] =[
    {
    patientId : 1,
    doctor: "Fayekemi Ojo",
    timeScheduled : "1:30PM",
    illness : "Malaria",
    Grieviousness : 3
    },
    {
    patientId : 2,
    doctor: "Fayekemi Ojo",
    timeScheduled : "3:30PM",
    illness : "Tuberculosis",
    Grieviousness : 7
    },
    {
    patientId : 3,
    doctor: "Fayekemi Ojo",
    timeScheduled : "12:00PM",
    illness : "Cough and Catarrh",
    Grieviousness : 2
    },
    {
    patientId : 4,
    doctor: "Fayekemi Ojo",
    timeScheduled : "6:00AM",
    illness : "Malaria",
    Grieviousness : 5
    },
    {
    patientId : 5,
    doctor: "Fayekemi Ojo",
    timeScheduled : "1:30PM",
    illness : "Typhoid Malaria",
    Grieviousness : 6
    },
    {
    patientId : 6,
    doctor: "Fayekemi Ojo",
    timeScheduled : "1:30PM",
    illness : "Headache",
    Grieviousness : 1
    },
    {
    patientId : 7,
    doctor: "Fayekemi Ojo",
    timeScheduled : "1:30PM",
    illness : "Malaria",
    Grieviousness : 3
    },
    {
    patientId : 8,
    doctor: "Fayekemi Ojo",
    timeScheduled : "8:30PM",
    illness : "Internal bleeding from an accident",
    Grieviousness : 9
    },
]

const port = 2007

const HospitalServer = http.createServer((req:IncomingMessage, res:ServerResponse<IncomingMessage>)=>{
    res.setHeader("Content-type", "application/json")
    const {method, url} = req

    let status= 404

    const feedback:iFeedback={
    notification:"Failed in reading number of scheduled patients",
    availability:false,
    patientData: null
    }
    
    const container:any = []

    req
       .on("data", (chunk:any)=>{
        container.push(chunk)
       })
       .on("end", ()=>{
        //Getting all booked data
        if(method ==="GET" && url==="/"){
            status = 200
            feedback.notification="Successfully read all patients scheduled at given time"
            feedback.availability = true
            feedback.patientData=patient_Data
            res.write(JSON.stringify({feedback, status}))
            res.end()
        }

        //Registering another patient
        if(method ==="POST" && url==="/registering"){
            const body = JSON.parse(container)
            patient_Data.push(body)
            status =  201
            feedback.notification="Patient successfully booked and dropped an appointment",
            feedback.availability=true,
            feedback.patientData=patient_Data,
            res.write(JSON.stringify({status, feedback}))
            res.end()
          }else{
            status= 424
            feedback.notification="Unfortunately, booking appointments are over for the day",
            feedback.availability=false,
            feedback.patientData=null,
            res.write(JSON.stringify({status, feedback}))
            res.end()
        }

        //Sorting out the patients with the most serious illness
        if(method ==="GET" && url==="/sortingPatients"){
            patient_Data= patient_Data.sort((a:any, b:any)=> b - a)
        }

        //update an existing patient
       
        
         
       })

        //delete an already treateds patient's info
        if(method === 'DELETE'){
        
            const container:any = url?.split("/")[1]
            const parsedData= parseInt(container)
            patient_Data = patient_Data.filter((el)=>{
                return el?.patientId !==parsedData
            })
            feedback.notification="Patient's appointment deleted",
            feedback.availability=true,
            feedback.patientData=patient_Data,
            res.write(JSON.stringify({status, feedback}))
            res.end()
        }
    
})

HospitalServer.listen(port, ()=>{
    console.log("Port running on", `${port}`)
})