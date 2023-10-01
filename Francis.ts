import http, { ServerResponse, IncomingMessage } from "http";

const port = 2000;
interface iMassege {
  message: string;
  data: null | [] | {}[];
  success: boolean;
}

interface iData {
  id: number;
  word: string;
  meaning: string;
  partofspecch: string;
}
let Data: iData[] = [
  {
    id: 1,
    word: "man",
    meaning: "an adult male human being",
    partofspecch: "noun",
  },
  {
    id: 2,
    word: "people",
    meaning: "human beings in general",
    partofspecch: "noun",
  },
  {
    id: 3,
    word: "code",
    meaning: "a system of words, letters, figures, or symbols",
    partofspecch: "noun",
  },
  {
    id: 4,
    word: "Programming",
    meaning: "the process or activity of writing computer programs",
    partofspecch: "noun",
  },
];
const Server = http.createServer(
  (req: IncomingMessage, resp: ServerResponse<IncomingMessage>) => {
    resp.setHeader("content-Type", "application/json");

    const { method, url } = req;

    let Status: number = 404;

    let response: iMassege = {
      message: "Failed",
      success: false,
      data: null,
    };

    let Container: any = [];
    req
      .on("data", (chunk: any) => {
        Container.push(chunk);
      })
      .on("end", () => {
        //GET Method
        if (url === "/word" && method === "GET") {
          Status = 200;
          response.message = "Successful";
          response.success = true;
          response.data = Data;
          resp.write(JSON.stringify({ response, Status }));

          resp.end();
        }
        //post method
        if (url === "/" && method === "POST") {
          Status = 201;
          const body = JSON.parse(Container);
          Data.push(body);

          response.message = "Added Successfully";
          response.success = true;
          response.data = Data;

          resp.write(JSON.stringify({ response, Status }));

          resp.end();
        }
    })})