import http, { IncomingMessage, ServerResponse } from "http"

const port: number = 5000

interface iData {
    Num: number
    Name: string
    Class: string
    Age: number
    Gender: string
    Height: string
}

interface iMessage {
    message: string
    success: boolean
    Grade: string
    data: null|{}[]
}

let StudentInfo: {}[] = [
    {
        Num: 1,
        Name: "Destiny",
        Class: "SSS3",
        Age: 18,
        Gender: "Male",
        Height: "Tall"
    },
    {
        Num: 2,
        Name: "Esther",
        Class: "Institution",
        Age: 22,
        Gender: "Female",
        Height: "Average"
    },
    {
        Num: 3,
        Name: "Casmir",
        Class: "Polythenic",
        Age: 25,
        Gender: "Male",
        Height: "Tall"
    },
    {
        Num: 4,
        Name: "Lydia",
        Class: "SSS2",
        Age: 20,
        Gender: "Female",
        Height: "Tall"
    },
    {
        Num: 5,
        Name: "Emma",
        Class: "JSS3",
        Age: 15,
        Gender: "Male",
        Height: "Short"
    },
] 

const server = http.createServer((req:IncomingMessage, res:ServerResponse<IncomingMessage>) => {
    res.setHeader("Content-Type", "Application/JSON")

    const {url, method} = req

    let status = 404;

    let reply: iMessage = {
        message: "failed",
        success: false,
        Grade: "F9",
        data: null
    }

    let Mama: any = []

    req.on("data", (chunk: any) => {
        Mama.push(chunk)
    }).on("end", () => {
     //GET Method
     if (url === "/home" && method === "GET") {
        status = 200;
        reply.message = "Successful";
        reply.success = true;
        reply.Grade = "A1"
        reply.data = StudentInfo;
        res.write(JSON.stringify({ reply, status }));

        res.end();
      }
    //POST METHOD
        if(url === "/" && method === "POST"){
                        status = 201
            
                        const body = JSON.parse(Mama);
                        StudentInfo.push(body)
                        reply.message = "SUCCESSFULLY ADDED"
                        reply.success = true
                        reply.Grade = "A+"
                        reply.data = StudentInfo
            
                        res.write(JSON.stringify({status, reply}))
                        res.end()
                    }
        //DELETE METHOD
        if(method === "DELETE") {
            let Source:any = url?.split("/")[1]

            let Change = parseInt(Source);

            let Observe = StudentInfo.some((el: any) => {
                return el?.Num === Change;
            });

            if(Observe === false) {
                
                status = 404;

                (reply.message = "User not found"),
                (reply.success = false),
                (reply.data = null),
                (reply.Grade = "F9")

                res.write(JSON.stringify ({reply, status}))

                res.end();

            }else{
                
                StudentInfo = StudentInfo.filter((el:any) => {
                   
                        return el.Num !== Change;
                 
              
                })

                 status = 200;

                (reply.message = "Successfully Deleted"),
                (reply.success = true),
                (reply.Grade = "A++"),
                (reply.data = StudentInfo)

                res.write(JSON.stringify({reply,status}));

                res.end();
                
            }
        }
        //PATCH METHOD

        if(method === "PATCH") {
            const build = JSON.parse(Mama);

            let details: any = url?.split("/")[1]
            let detailvalue = parseInt(details)

            let findObject = StudentInfo.some((el:any) => {
                return el?.Num === detailvalue;
            })

            if(findObject === false){
                status = 404;

                (reply.message = "User not found"),
                (reply.success = false),
                (reply.Grade = "F9"),
                (reply.data = null)

                res.write(JSON.stringify({reply,status}))

                res.end()
            }else{
                const updateusername = build.Name;
                StudentInfo = StudentInfo.map((User: any) => {
                    if(User?.Num === detailvalue){
                        return {
                            Num:User?.Num,
                            Name: updateusername,
                            Age: User?.Age,
                        }
                    }
                    return User;
                })

                status = 200;

                (reply.message = "User Updated"),
                (reply.success = true),
                (reply.data = StudentInfo),
                (reply.Grade = "A++")

                res.write(JSON.stringify({reply, status}));

                res.end();
            }
        }

        // PUT METHOD:update
        if (method === "PUT") {
            const build = JSON.parse(Mama);
  
            let details: any = url?.split("/")[1];
            let datavalue = parseInt(details);
  
            let findobject = StudentInfo.some((el: any) => {
              return el?.Num === datavalue;
            });
  
            if (findobject === false) {
              status = 404;
  
              (reply.message = "User not Found"),
                (reply.data = null),
                (reply.success = false);
  
              res.write(JSON.stringify({ reply, status }));
  
              res.end();
            } else {
              const updateusername = build.name;
              const updateage = build.age;
  
              StudentInfo = StudentInfo.map((user: any) => {
                if (user?.Num === datavalue) {
                  return {
                    Num: user?.Num,
                    name: updateusername,
                    age: updateage,
                  };
                }
  
                return user;
              });
  
              status = 200;
  
              (reply.message = "User Updated"),
                (reply.data = StudentInfo),
                (reply.success = true);
  
              res.write(JSON.stringify({ reply, status }));
  
              res.end();
            }
          }
    })
})

server.listen(port, () => {
console.log("Server is up and running");    
})