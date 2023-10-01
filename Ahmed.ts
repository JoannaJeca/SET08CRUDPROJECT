import http, { IncomingMessage, ServerResponse } from "http";

interface iResponse {
  message: string;
  success: boolean;
  data: {}[] | [] | {} | null;
}

interface iData {
  id: number;
  taskDescription: string;
  startDay: string;
  startMonth: string;
  startYear: number;
  startTime: string;
  endDay: string | null;
  endMonth: string | null;
  endYear: number | null;
  endTime: string | null;
  completed: boolean;
}

let Data: iData[] = [
  {
    id: 1,
    taskDescription: "Fitness training",
    startDay: "Monday",
    startMonth: "February",
    startYear: 1987,
    startTime: "4:00pm",
    endDay: "Friday",
    endMonth: "October",
    endYear: 2019,
    endTime: "12:00am",
    completed: true,
  },
  {
    id: 2,
    taskDescription: "Develop a full webpage in an hour",
    startDay: "Monday",
    startMonth: "May",
    startYear: 2024,
    startTime: "4:00pm",
    endDay: "Monday",
    endMonth: "May",
    endYear: 2024,
    endTime: "3:49pm",
    completed: true,
  },
  {
    id: 3,
    taskDescription: "Read all on HTTP",
    startDay: "Monday",
    startMonth: "April",
    startYear: 2020,
    startTime: "4:00pm",
    endDay: null,
    endMonth: null,
    endYear: null,
    endTime: null,
    completed: false,
  },
  {
    id: 4,
    taskDescription: "Watch movies and play games",
    startDay: "Monday",
    startMonth: "March",
    startYear: 2017,
    startTime: "4:00pm",
    endDay: "Tuesday",
    endMonth: "March",
    endYear: 2017,
    endTime: "12:00am",
    completed: true,
  },
  {
    id: 5,
    taskDescription: "Play football all day",
    startDay: "Monday",
    startMonth: "November",
    startYear: 2020,
    startTime: "12:00pm",
    endDay: "Monday",
    endMonth: "November",
    endYear: 2020,
    endTime: null,
    completed: false,
  },
  {
    id: 6,
    taskDescription: "Wash all clothes",
    startDay: "Saturday",
    startMonth: "February",
    startYear: 2019,
    startTime: "4:00pm",
    endDay: "Saturday",
    endMonth: "February",
    endYear: 2019,
    endTime: "7:00pm",
    completed: true,
  },
  {
    id: 7,
    taskDescription: "Finish all assignment's",
    startDay: "Tuesday",
    startMonth: "June",
    startYear: 2009,
    startTime: "4:00am",
    endDay: "Tuesday",
    endMonth: "June",
    endYear: 2009,
    endTime: null,
    completed: false,
  },
  {
    id: 8,
    taskDescription: "Learn a tech skill",
    startDay: "Thursday",
    startMonth: "December",
    startYear: 2016,
    startTime: "4:00pm",
    endDay: "Friday",
    endMonth: "October",
    endYear: 2018,
    endTime: "12:00am",
    completed: true,
  },
  {
    id: 9,
    taskDescription: "Complete the day's chores",
    startDay: "Monday",
    startMonth: "September",
    startYear: 2022,
    startTime: "12:00am",
    endDay: null,
    endMonth: null,
    endYear: null,
    endTime: null,
    completed: false,
  },
  {
    id: 10,
    taskDescription: "Raise funds for a Tesla car",
    startDay: "Wednesday",
    startMonth: "July",
    startYear: 2027,
    startTime: "2:00am",
    endDay: null,
    endMonth: null,
    endYear: null,
    endTime: null,
    completed: false,
  },
];

const Port: number = 7000;

const APIServer = http.createServer(
  (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    res.setHeader("content-type", "Application/JSON");

    let status = 404;
    let response: iResponse = {
      message: "Server failure",
      success: false,
      data: null,
    };

    const { method, url } = req;

    let bodyHolder: any = [];
    let bodyHolder1 = "";

    req
      .on("data", (chunk: any) => {
        bodyHolder.push(chunk);
      })
      .on("end", () => {
        //Getting all tasks
        if (method === "GET" && url === "/") {
          status = 200;
          response.message = "All data gotten";
          response.success = true;
          response.data = Data;
          res.write(JSON.stringify({ status, response }));
          res.end();
        } else {
          response.message = "Wrong route/method";
          response.success = false;
          response.data = null;
          res.write({ status, response });
          res.end();
        }

        // Creating a new task

        if (method === "POST" && url === "/addTask") {
          const bodyData = JSON.parse(bodyHolder);
          Data.push(bodyData);
          status = 201;
          response.message = "New data added";
          response.success = true;
          response.data = Data;
          res.write(JSON.stringify({ status, response }));
          res.end();
        } else {
          response.message = "wrong route";
          response.success = false;
          response.data = null;
          res.write({ status, response });
          res.end();
        }

        //Repairing a task
        if (method === "PATCH") {
          const oldUrl: any = url?.split("/")[1];
          let useFul = parseInt(oldUrl);
          let bodyData = JSON.parse(bodyHolder);
          let check = Data.some((el) => el.id === useFul);
          if (!check) {
            response.message = "User not found";
            res.write(JSON.stringify({ status, response }));
            res.end();
          } else {
            Data = Data.map((el) => {
              if (el.id === useFul) {
                return {
                  id: el.id,
                  taskDescription: el.taskDescription,
                  startDay: el.startDay,
                  startMonth: el.startMonth,
                  startYear: el.startYear,
                  startTime: el.startTime,
                  endDay: el.endDay,
                  endMonth: el.endMonth,
                  endYear: el.endYear,
                  endTime: el.endTime,
                  completed: bodyData.completed,
                };
              }
              return el;
            });
            status = 200;
            response.data = Data;
            response.message = "Data updated";
            response.success = true;
            res.write(JSON.stringify({ status, response }));
            res.end();
          }
        }
        //Replacing a task
        if (method === "PUT") {
          const meantForUse: any = url?.split("/")[1];
          const main = parseInt(meantForUse);
          let check = Data.some((el) => {
            return el.id === main;
          });
          if (!check) {
            response.message = "Task not found";
            res.write(JSON.stringify({ status, response }));
            res.end();
          } else {
            const body = JSON.parse(bodyHolder);
            Data = Data.map((el) => {
              if (el.id === main) {
                return {
                  id: el.id,
                  taskDescription: body.taskDescription,
                  startDay: body.startDay,
                  startMonth: body.startMonth,
                  startYear: body.startYear,
                  startTime: body.startTime,
                  endDay: body.endDay,
                  endMonth: body.endMonth,
                  endYear: body.endYear,
                  endTime: body.endTime,
                  completed: body.completed,
                };
              }
              return el;
            });
            status = 201;
            response.message = "Successfully updated fully";
            response.success = true;
            response.data = Data;
            res.write(JSON.stringify({ status, response }));
            res.end();
          }
        } else {
          response.message = "Error is coming from your route/method";
          res.write(JSON.stringify({ status, response }));
          res.end();
        }
        //Deleting a task
        if (method === "DELETE") {
          const peripheral: any = url?.split("/")[1];
          const usefulUrl = parseInt(peripheral);
          const check = Data.some((el) => el.id === usefulUrl);
          if (!check) {
            response.message = "Task not found";
            res.write(JSON.stringify({ status, response }));
            res.end();
          } else {
            Data = Data.filter((el) => {
              return el.id !== usefulUrl;
            });
            status = 200;
            response.message = "Task successfully deleted";
            response.data = Data;
            response.success = true;
            res.write(JSON.stringify({ status, response }));
            res.end();
          }
        }
        //Delete all tasks
        if (method === "DELETE" && url === "/deleteAll") {
            status = 200
          response.data = null;
          response.success = true;
          response.message = "All tasks deleted";
          res.write(JSON.stringify({ status, response }));
          res.end();
        }else{
            res.write(JSON.stringify({ status, response }));
            res.end();
        }
        //Getting completed tasks
        if (method === "GET" && url === "/getCompletedTasks") {
          Data = Data.filter((el) => {
            return el.completed === true;
          });
          response.data = Data;
          response.message = "Completed tasks gotten";
          response.success = true;
          res.write(JSON.stringify({ status: 200, response }));
          res.end();
        } else {
          res.write(JSON.stringify({ status, response }));
          res.end();
        }
        //Getting uncompleted tasks
        if (method === "GET" && url === "/getUncompletedTasks") {
          Data = Data.filter((el) => {
            return el.completed !== true;
          });
          response.data = Data;
          response.message = "Uncompleted tasks gotten";
          response.success = true;
          res.write(JSON.stringify({ status: 200, response }));
          res.end();
        } else {
          res.write(JSON.stringify({ status, response }));
          res.end();
        }
        // Delete completed tasks
        if (method === "DELETE" && url === "/deleteCompletedTasks") {
          Data = Data.filter((el) => {
            return el.completed === false;
          });
          response.data = Data;
          response.message = "Completed tasks deleted";
          response.success = true;
          res.write(JSON.stringify({ status: 200, response }));
          res.end();
        }
      });
  }
);

APIServer.listen(Port, () => {
  console.log("Project Working 🙃");
});