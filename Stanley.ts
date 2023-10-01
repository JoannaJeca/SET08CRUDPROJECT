import http, { ServerResponse, IncomingMessage } from "http";

const port: number = 2000;

interface iData {
  id: number;
  username: string;
  email: string;
  password: number | string;
}
interface iMessage {
  data: null | {} | {}[];
  success: boolean;
  message: string;
}

let Database: iData[] = [
  {
    id: 1,
    username: "Stanzorl Afc",
    email: "stanzorl7@gmail.com",
    password: 69283,
  },
  {
    id: 2,
    username: "Dwayne",
    email: "miles@gmail.com",
    password: 69283,
  },
  {
    id: 3,
    username: "AhmedRu",
    email: "rufai@gmail.com",
    password: 69283,
  },
  {
    id: 4,
    username: "ZubbyOne",
    email: "zubby@gmail.com",
    password: 69283,
  },
  {
    id: 5,
    username: "Daniel Eron",
    email: "daniel@gmail.com",
    password: 69283,
  },
];

const Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    res.setHeader("content-type", "application/JSON");
    let { method, url } = req;
    let status: number = 404;

    let response: iMessage = {
      data: null,
      success: false,
      message: "Invalid route",
    };
    let Container: any = [];

    req
      .on("data", (chunk: any) => {
        Container.push(chunk);
      })
      .on("end", () => {
        //CRUD//
        //GET METHOD(READ -> )

        if(method === 'GET' && url === '/'){
            status = 200
            response.message = `All ${Database.length} users gotten`
            response.data = Database
            response.success = true;
            res.write(JSON.stringify({response, status}))
            res.end()
        }

        // POST METHOD(CREATE -> )
        if(method === 'POST' && url === '/home'){
            const Body = JSON.parse(Container)
           const {email} = Body;
           if (email === Body?.email) {
            status = 404
            response.message = 'Email already used by another user'
            response.data = null
            response.success = false
            res.write(JSON.stringify({response, status}))
            res.end()
           }else{
            status = 201;
            Database.push(Body)
            response.data = Database
            response.message = 'Registered successfully'
            response.success = true
            res.write(JSON.stringify({response, status}))
            res.end()
           }
           
        }

        // PATCH METHOD(UPDATE -> )
        if(method === 'PATCH'){
            const build = JSON.parse(Container)

            let details:any = url?.split("/")[1]
            let convert = parseInt(details)

            let targetObject = Database.some((el)=>{
                return el?.id === convert
            });
            if(!targetObject){
                status = 404
                response.data = null
                response.message = 'User details not found'
                response.success = false
                res.write(JSON.stringify({response, status}))
                res.end();
            }else{
                    const newemail = build.newemail

                    Database = Database.map((user:any)=>{
                      if (user?.email === newemail) {
                        response.message = 'Email already used by another user'
                      }else{
                        if (user?.id === convert) {
                          return {
                            id: user?.id,
                            username: user?.name,
                            password: user?.password,
                            email: newemail,
                          };
                        }
                        return user;
                      }
                    })
                    status = 200
                    response.data = Database
                    response.message = 'User details updated'
                    response.success = true
                    res.write(JSON.stringify({response, status}))
                    res.end()
            }
        }
        if (method === "PUT") {
          const build = JSON.parse(Container);

          let details: any = url?.split("/")[1];
          let convert = parseInt(details);

          let targetObject = Database.some((el) => {
            return el?.id === convert;
          });
          if (!targetObject) {
            status = 404;
            response.data = null;
            response.message = "User details does not exist ";
            response.success = false;
            res.write(JSON.stringify({ response, status }));
            res.end();
          } else {
            const newusername = build.username;
            const newpassword = build.password;
            const newemail = build.email;

            Database = Database.map((user: any) => {
              if (user?.email === newemail) {
                response.message = 'Email already used by another user'
              }else{
                if (user?.id === convert) {
                  return {
                    id: user?.id,
                    username: newusername,
                    password: newpassword,
                    email: newemail,
                  };
                }
                return user;

              }
              
            });
            status = 200;
            response.data = Database;
            response.message = "User info successfully updated";
            response.success = true;
            res.write(JSON.stringify({ response, status }));
            res.end();
          }
        }

        // /DELETE METHOD(DELETE ->)
        if (method === "DELETE") {
          let details: any = url?.split("/")[1];
          let convert = parseInt(details);

          let targetObject = Database.filter((el) => {
            return el?.id !== convert;
          });
          if (!targetObject === false) {
            status = 200;
            response.data = targetObject;
            response.message = "User deleted";
            response.success = true;
            res.write(JSON.stringify({ response, status }));
            res.end();
          } else {
            status = 404;
            response.data = null;
            response.message = "User details does not exist";
            response.success = false;
            res.write(JSON.stringify({ response, status }));
            res.end();
          }
        }
      });
  }
);

Server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});