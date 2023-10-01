import http, { IncomingMessage, ServerResponse } from "http";

const port = 2005

interface iMessage {
  message: string;
  success: boolean;
  data: null | {} | {}[];
}
interface iReserve {
  id: number;
  name: string;
  date: number | string;
  time: number;
  totalGuest: number;
  seatingPosition: string;
  foodChoice?: string;
}

let reservation: iReserve[] = [
  {
    id: 1,
    name: "Prince",
    date: "30/8/2023",
    time: 6,
    totalGuest: 2,
    seatingPosition: "Front-row",
    foodChoice: "International-cusine",
  },
  {
    id: 2,
    name: "Habeeb",
    date: "1/9/2023",
    time: 7,
    totalGuest: 5,
    seatingPosition: "Middle-row",
    foodChoice: "Local-cusine",
  },
  {
    id: 3,
    name: "Jessica",
    date: "30/8/2023",
    time: 8,
    totalGuest: 3,
    seatingPosition: "Back-row"
  },
  {
    id: 4,
    name: "Ayomide",
    date: "1/9/2023",
    time: 6,
    totalGuest: 4,
    seatingPosition: "Front-row",
    foodChoice: "International-cusine",
  },
  {
    id: 5,
    name: "Nzube",
    date: "2/9/2023",
    time: 7,
    totalGuest: 1,
    seatingPosition: "Middle-row"
  },
  {
    id: 6,
    name: "Joan",
    date: "1/9/2023",
    time: 8,
    totalGuest: 5,
    seatingPosition: "Back-row",
    foodChoice: "International-cusine",
  },
  {
    id: 7,
    name: "Stanley",
    date: "2/9/2023",
    time: 6,
    totalGuest: 3,
    seatingPosition: "Front-row",
    foodChoice: "Local-cusine",
  },
  {
    id: 8,
    name: "Ahmed",
    date: "30/8/2023",
    time: 5.45,
    totalGuest: 6,
    seatingPosition: "Middle-row",
    foodChoice: "International-cusine",
  },
  {
    id: 9,
    name: "Zion",
    date: "3/9/2023",
    time: 7,
    totalGuest: 2,
    seatingPosition: "Back-row"
  },
  {
    id: 10,
    name: "Wisdom",
    date: "3/9/2023",
    time: 8,
    totalGuest: 3,
    seatingPosition: "Front-row",
    foodChoice: "International-cusine",
  },
];

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    res.setHeader("Content-type", "application/json");
    let { method, url } = req;
    let status = 404;

    let response: iMessage = {
      message: "Failed",
      success: true,
      data: null,
    };
    let data = "";

    let Container: any = [];
    req
      .on("data", (chunk: any) => {
        Container.push(chunk);
      })
      .on("end", () => {
        if (method === "GET") {
          
            // GET METHOD
            if (url === "/allreservations") {
              status = 200;
              response.message = "Successful Entry";
              response.success = true;
              response.data = reservation;
            } else if (url === "/foodchoice") {
              status = 200;
              const foodChoices = Array.from(
                new Set(reservation.filter((item) => item.foodChoice))
              );
              response.message = "Successfully retrieved foodChoice categories";
              response.success = true;
              response.data = foodChoices;
            }


          response.message = "Successful Entry";
          response.success = true;
          response.data = reservation;

          res.write(JSON.stringify({ response, status }));

          res.end();
        }


        
        //post method
        if (url === "/adduser" && method === "POST") {
          status = 201;
          const body = JSON.parse(Container);
            reservation.push(body)
            
          response.message = "Added Successfully";
          response.success = true;
          response.data = reservation;

          res.write(JSON.stringify({ response, status }));

          res.end();
        }


        // PUT
        if(method === "PUT"){
            const build = JSON.parse(Container);
            let details: any = url?.split("/")[1];
            let datavalue = parseInt(details);
  
            let findobject = reservation.some((el) => {
              return el.id === datavalue;
            });
  
            if (findobject === false) {
              status = 404;
  
              (response.message = "User not Found"),
                (response.data = null),
                (response.success = false);
  
              res.write(JSON.stringify({ response, status }));
  
              res.end();
            } else {
              const updatetime= build.time;
              const updatetotalguest = build.totalguest;
  
              reservation = reservation.map((user: any) => {
                if (user?.id === datavalue) {
                  return {
                    id: user?.id,
                    time: updatetime,
                    totalGuest: updatetotalguest
                  };
                }
                return user;
              });
  
              status = 200;
  
              (response.message = "User Updated"),
                (response.data = reservation),
                (response.success = true);
  
              res.write(JSON.stringify({ response, status }));
  
              res.end();
            }

      };



       //DELETE
       if(method === "DELETE"){
        let details: any = url?.split("/")[1];
        let deleted = parseInt(details)

        let find = reservation.some((el) => {
          return el.id === deleted 
        })
        if(find === false){
          status = 404
        }else{
          reservation = reservation.map((el: any) => {
             if(el?.id !== deleted){
              return el = null;
             }
             return el;
          })
        }
        (response.message = "Delete succesfully"),
        (response.data = reservation),
        (response.success = true);

      res.write(JSON.stringify({ response, status }));

      res.end();
      }




  }
);
  })

server.listen(port, () => {
  console.log("Server is running on port", port);
});