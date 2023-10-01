import http, { IncomingMessage, ServerResponse } from "http";

const port: number = 6000;
interface iMessage {
  message: string;
  data: null | [] | {}[];
  success: boolean;
}
interface Question {
  text: string;
}

interface Quiz {
  id: number;
  title: string;
  questions: Question[];
}

let quizzes: Quiz[] = [
  {
    id: 1,
    title: "General Knowledge",
    questions: [
      {
        text: "Who is the president of Nigeria",
      },
    ],
  },
  {
    id: 2,
    title: "History",
    questions: [
      {
        text: "In which year did World War II end?",
      },
    ],
  },
  {
    id: 3,
    title: "History",
    questions: [
      {

        text: "In which year",
      },
    ],
  },
  {
    id: 4,
    title: "Mathematics",
    questions: [
      {

        text: "What is the square root of 2",
      },
    ],
  },
  {
    id: 5,
    title: "Biology",
    questions: [
      {

        text: "After head is what",
      },
    ],
  },
  {
    id: 6,
    title: "Chemistry",
    questions: [
      {

        text: "What is Hydrogen",
      },
    ],
  },
];
const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    res.setHeader("content-type", "Application/json");

    const { method, url } = req;

    let status = 404;

    let response: iMessage = {
      message: "failed",
      data: null,
      success: false,
    };
    let Holder: any = [];
    req
      .on("data", (chunk) => {
        Holder += (chunk);
      })
      .on("end", () => {
        if (method === "GET") {
          let GetData = quizzes;
        const split: any= url?.split("/")[1]
        const id = parseInt(split)

        if(GetData){
        let Get = quizzes.filter((el) => {
          return el.id === id
        })
          status = 200;
          response.message = "All data gotten";
          response.data = GetData;
          response.success = true;
          res.write(JSON.stringify({ response, status }));
          res.end();
      }
      }

        if(method === "POST" && url === "/"){
          let body = JSON.parse(Holder)
          quizzes.push(body)
          let {title, id} = JSON.parse(Holder)
          const newquiz: Quiz = {
            id, title,
            questions: []
          }
          quizzes.push(newquiz)
          response.message = "Added succesfully",
          response.data = body
          response.success = true
          res.write(JSON.stringify({ response, status }));
          res.end();
        }

        if(method === "PUT"){
          const build = JSON.parse(Holder);
          let details: any = url?.split("/")[1];
          let datavalue = parseInt(details);

          let findobject = quizzes.some((el) => {
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
            const updateusertitle = build.title;
            const updatetext = build.questions;

            quizzes = quizzes.map((user: any) => {
              if (user?.id === datavalue) {
                return {
                  id: user?.id,
                  title: updateusertitle,
                  questions: updatetext,
                };
              }

              return user;
            });

            status = 200;

            (response.message = "User Updated"),
              (response.data = quizzes),
              (response.success = true);

            res.write(JSON.stringify({ response, status }));

            res.end();
          }
        }
        if(method === "PATCH"){
          const build = JSON.parse(Holder);
          let details: any = url?.split("/")[1];
          let datavalue = parseInt(details);

          let findobject = quizzes.some((el) => {
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
            const updateusertitle = build.title;
            const updatetext = build.questions;

            quizzes = quizzes.map((user: any) => {
              if (user?.id === datavalue) {
                return {
                  id: user?.id,
                  title: updateusertitle,
                  questions: updatetext,
                };
              }

              return user;
            });

            status = 200;

            (response.message = "User Updated"),
              (response.data = quizzes),
              (response.success = true);

            res.write(JSON.stringify({ response, status }));

            res.end();
          }
        }
        //DELETE
        if(method === "DELETE"){
          let details: any = url?.split("/")[1];
          let deleted = parseInt(details)

          let find = quizzes.some((el) => {
            return el.id === deleted 
          })
          if(find === false){
            status = 404
          }else{
            quizzes = quizzes.map((el: any) => {
               if(el?.id !== deleted){
                return el = null;
               }
               return el;
            })
          }
          (response.message = "Delete succesfully"),
          (response.data = quizzes),
          (response.success = true);

        res.write(JSON.stringify({ response, status }));

        res.end();
        }
      });
  }
);
      
server.listen(port, () => {
  console.log("server is up and listening");
}); 