console.clear()
import http, {ServerResponse, IncomingMessage} from "http";

let Library =[
    {
        Id: 1,
        Author: "Jackson",
        Title: "Percy Jackson and the Olympians:",
        Description: "The Chalice of the Gods (Percy Jackson & the Olympians)",
        Price: "$30.999",
        Rating: "4 Stars"
    },
    {
        Id: 2,
        Author: "Peterson",
        Title: "The Shadow Work Journal",
        Description: "Guide to Integrate and Transcend your Shadows",
        Price: "$19.999",
        Rating: "3 Stars"
    },
    {
        Id: 3,
        Author: "Adele",
        Title: "Killing the Witches:",
        Description: "The Horror of Salem, Massachusetts (Bill O'Reilly's Killing Series)",
        Price: "$22.999",
        Rating: "5 Stars"
    },
    {
        Id: 4,
        Author: "Ben",
        Title: "Atomic Habits",
        Description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones",
        Price: "$15.999",
        Rating: "4 Stars"
    },
    {
        Id: 5,
        Author: "Hilda Bacci",
        Title: "Skinnytaste Simple:",
        Description: "Easy, Healthy Recipes with 7 Ingredients or Fewer: A Cookbook",
        Price: "$5.999",
        Rating: "4 Stars"
    },
]
interface iData{
    id: number
    Author: string
    Tittle: string
    Description: string
    Price: string
    Rating: string
}
interface iMessage{
    message: string
    success: boolean
    data: null | {}| {}[]
}
const Port  = 9000

const server = http.createServer((req:IncomingMessage, res:ServerResponse<IncomingMessage>) =>{
    res.setHeader("Content-Type", "Application/json")
    const {method, url} = req
    let status = 404
    let response: iMessage = {
        message: "Failure Creating Library",
        success: false,
        data: null
    };
    const container: any = [];
    req.on("data", (bunch: any) =>{
        container.push(bunch)
    }).on("end", () =>{
        if(method === "GET" && url === "/"){
            res.statusCode = 200
            response.message = "Record Created Successfully";
            response.success = true;
            response.data = Library;
            res.write(JSON.stringify(response))
            res.end()
        }
        if (url ==="/" && method === "POST"){
            const requestData = Buffer.concat(container).toString();
            const container2 = JSON.parse(requestData)
            Library.push(container2);
            response.message = "Added Successfully";
            response.success = true
            response.data = Library;
            res.statusCode = 201;
            res.write(JSON.stringify(response));
            res.end();
        }

        if (url === "/" && method === "PATCH") {
            const requestData = Buffer.concat(container).toString();
            const container2 = JSON.parse(requestData);

            if (!container2 || typeof container2.Id !== "number" || typeof container2.Price !== "string") {
                res.statusCode = 400; 
                response.message = "Invalid PATCH Data";
                response.success = false;
                response.data = null;
                res.write(JSON.stringify(response));
                res.end();
            } else {
                const bookToUpdate = Library.find((book) => book.Id === container2.Id);

                if (!bookToUpdate) {
                    res.statusCode = 404;
                    response.message = "Book not found";
                    response.success = false;
                    response.data = null;
                    res.write(JSON.stringify(response));
                    res.end();
                } else {
                    bookToUpdate.Price = container2.Price;
                    response.message = "Updated Successfully";
                    response.success = true;
                    response.data = Library;
                    res.statusCode = 200; 
                    res.write(JSON.stringify(response));
                    res.end();
                }
            }
        } 
        if(method === "DELETE"){
           const container3:any = url?.split("/")[1];
           const datavalue = parseInt(container3)
           const deleteLibrary = Library.findIndex((user) =>{
            return user.Id === datavalue
           })
           if(deleteLibrary === -1){
            response.message = "User not Found";
            response.success = false
            response.data = null;
            res.write(JSON.stringify(response))
            res.statusCode = 404
            res.end();
           }else{
            Library.splice(deleteLibrary, 1);
            response.message = "User Deleted Successfully";
            response.success = true;
            response.data = Library;
            res.statusCode = 200
            res.write(JSON.stringify(response))
            res.end();
           }
        }  

    })

})

server.listen(Port, ()=>{
    console.log("Port Listening to Server on Port", Port)
})