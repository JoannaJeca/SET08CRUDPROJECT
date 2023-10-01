
import http, { IncomingMessage, ServerResponse } from "http"

const port: number = 4000;

interface iData {
    Id: number
    Name: string
    CurrentLocation: string
    Destination: string
    Distance: string
    Time: string
}

interface iMessage {
    message: string,
    success: boolean,
    data: null|{}|[]|{}[],
}


let TripInfo: iData[] = [
    {
        Id: 1,
        Name: 'Chidera',
        CurrentLocation: "CodeLab",
        Destination: "Boundary",
        Distance: "3km",
        Time: "1hr",
    },
    {
        Id: 2,
        Name: 'John',
        CurrentLocation: "Ajeromi",
        Destination: "Wilmer",
        Distance: "5km",
        Time: "3hrs",
    },
    {
        Id: 3,
        Name: 'Casmir',
        CurrentLocation: "Ajegunle",
        Destination: "Lekki",
        Distance: "10km",
        Time: "6hrs",
    },
    {
        Id: 4,
        Name: 'Divine',
        CurrentLocation: "Victoria Island",
        Destination: "East",
        Distance: "25km",
        Time: "10hrs",
    },
    {
        Id: 5,
        Name: 'David',
        CurrentLocation: "Ajegunle",
        Destination: "Lagos Island",
        Distance: "5km",
        Time: "2hrs",
    },
    {
        Id: 6,
        Name: 'Derachi',
        CurrentLocation: "Ago Palace",
        Destination: "Mile 2",
        Distance: "4km",
        Time: "30mins",
    },
    {
        Id: 7,
        Name: 'Blessing',
        CurrentLocation: "Wilmer",
        Destination: "Okokomaiko",
        Distance: "10km",
        Time: "6hrs",
    },
    {
        Id: 8,
        Name: 'Casmir',
        CurrentLocation: "Ajegunle",
        Destination: "Lekki",
        Distance: "10km",
        Time: "6hrs",
    },
    {
        Id: 9,
        Name: 'Lydia',
        CurrentLocation: "OjoRoad",
        Destination: "Boundary",
        Distance: "7km",
        Time: "45mins",
    },
    {
        Id: 10,
        Name: 'Esther',
        CurrentLocation: "Ojuelegba",
        Destination: "Toll-gate",
        Distance: "15km",
        Time: "5hrs",
    },
]

const server = http.createServer((req:IncomingMessage, res:ServerResponse<IncomingMessage>) => {
    res.setHeader("Content-Type", "application/json");

    const {url, method} = req;

    let status = 404;

    let response: iMessage = {
        message: "Failed",
        success: false,
        data: null,
    }

    let Body : any = [];

    req.on("data", (chunk: any) => {
        Body.push(chunk);
    }).on("end", () => {
        
        //GET METHOD

        if(url === "/" && method === "GET"){
            status = 200;

            response.message = "All TripInfo Gotten"
            response.success = true
            response.data = TripInfo
            
            res.write(JSON.stringify({status, response}))

            res.end()
        }

                //POST METHOD

                if(url === "/" && method === "POST"){
                    status = 201
        
                    const container = JSON.parse(Body);
                    TripInfo.push(container)
                    response.message = "SUCCESSFULLY ADDED"
                    response.success = true
                    response.data = TripInfo
        
                    res.write(JSON.stringify({status, response}))

                    res.end()
                }

                //PATCH METHOD
                if(method === "PATCH") {
                    const build = JSON.parse(Body);
                    let details: any = url?.split("/")[1];
                    let detailvalue = parseInt(details);
                    
                    let findObject = TripInfo.find ((el: any) => {
                        return el.Id === detailvalue
                    });
                    if(!findObject){
                        status = 404;
                        (response.message = "Failed to find object."),
                        (response.success = false),
                        (response.data = null)

                        res.write(JSON.stringify({status, response}))

                        res.end();
                    }else{
                        const updateUsername = build.Name;
                        TripInfo = TripInfo.map((User: any) => {
                            if(User?.Id === detailvalue) {
                                return {
                                    Id: User?.Id,
                                    Name: updateUsername,
                                    CurrentLocation: User.CurrentLocation,
                                    Destination: User.Destination,
                                    Distance: User.Distance,
                                    Time: User.Time,
                                }
                            }
                            return User
                        })
                        status = 200;

                        (response.message = "User Updated"),
                        (response.success = true),
                        (response.data = TripInfo),
        
                        res.write(JSON.stringify({status, response}));
        
                        res.end();
                    }
                }

        if(method === "DELETE") {
            const build = JSON.parse(Body);

            let details: any = url?.split("/")[1]
            let detailvalue = parseInt(details)

            let findObject = TripInfo.some((el:any) => {
                return el.Id === detailvalue;
            })

            if(findObject === false){
                status = 404;

                (response.message = "User not found"),
                (response.success = false),
                (response.data = null)

                res.write(JSON.stringify({response,status}))

                res.end()
            }else{
                const updateusername = build.Name;
                TripInfo = TripInfo.map((User: any) => {
                    if(User?.Id === detailvalue){
                        return User.Id !== detailvalue
                    }
                    return User;
                })

                status = 200;

                (response.message = "User Updated"),
                (response.success = true),
                (response.data = TripInfo),

                res.write(JSON.stringify({response, status}));

                res.end();
             }
             }
            
    })
})
server.listen(port, () => {
    console.log("Server is up and running");
    
})