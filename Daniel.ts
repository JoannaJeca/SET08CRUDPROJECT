import http, {ServerResponse, IncomingMessage} from "http"


const port: number = 2006

interface iBlog{
  id: number;
  Author: string;
  title: string;
  description: string;
  rating: number;
  date: number;
}

interface iMessage{
message: string;
data: null|{}|{}[];
success: boolean;
}

let Blog: iBlog[] = [
     
    {
        id: 1,
        Author: "Esther Joseph",
        title: "Teach Junkie",
        description: "Teach Junkie is a blog founded by Esther, who is the main author on the site. However, she allows content contributors, meaning her blog is actually a community of teachers who want to improve and learn new techniques. The blog is categorized into grades and different subjects, including science, languages, math, art, and more.",
        rating: 5,
       date: 31-4-2022
  },
    {
        id: 2,
        Author: "Adimike Sylvia",
        title: "Tech Savvy Mama",
        description: "Tech Savvy Mama was founded in 2008 by former teacher and technology specialist Leticia Barr, who also happens to be a mother of two. She mostly focuses on aspects of parenting that are related to the digital age and technological development.",
        rating: 4,
        date:15-7-2023
  },
    {
        id: 3,
        Author: "Salawudeen Habeeb",
        title: "My Fitness Pal",
        description: "My Fitness Pal is an online platform that helps people lose weight. The site also offers a great set of mobile apps that allow users to keep track of their weight, exercise regularly, and more. The site also has a lively blog section where users can learn more about all things related to fitness.",
        rating: 2,
        date: 10-3-2015
  },
    {
        id: 4,
        Author: "Okwudili Daniel",
        title: "Apartment Therapy",
        description: "Apartment Therapy is a blog focusing on interior design. It was launched by Maxwell Ryan in 2001. Ryan is an interior designer who turned to blogging (using the moniker “the apartment therapist”). The blog has reached 20 million followers and has expanded into a full-scale media company.",
        rating: 3,
        date: 10-7-2003
  },
    {
        id: 5,
        Author: "Ndulue Stanley",
        title: "Style & Error",
        description: "Style & Error is a men’s fashion blog by Ndulue Stanley, a famous stylist, editor, and writer. Apart from his blog, he also works as a Fashion Editor with British GQ and is an Editor at Large for The Rake magazine. Also, Stanley is the main man behind the styles of many male celebrities.",
        rating: 5, 
        date: 14-10-2006
  },
]




const server = http.createServer((req:IncomingMessage, res: ServerResponse<IncomingMessage>)=>{
        res.setHeader("Content-Type", "application/JSON")
        let {method, url} = req;
        let Status = 404;


        let response: iMessage = {
            message: "Failed",
            success: false,
            data: null,
          };

    let Container: any = []

    req.on("data",(chunk: any)=>{
      Container.push(chunk);
    })
    .on("end",()=>{
        // GET METHOD

        if (method === "GET" && url === "/getBlogs") {
          Status = 200;
          response.message= "Blogs successfully retrieved"
          response.data = Blog;
          response.success = true;
          res.write(JSON.stringify({response, Status}))

          res.end()
        }

        // POST METHOD
        if (method === "POST" && url === "/") {
          Status = 201;
          const More = JSON.parse(Container);
          Blog.push(More);

          response.message = "More Blogs added successfully"
          response.data = Blog;
          response.success= true;

          res.write(JSON.stringify({response, Status}))
          res.end();
        }

        // UPDATE METHOD

        if (method === "PATCH") {
          let patch = JSON.parse(Container);

          let value: any = url?.split("/")[1];
          let patchedValue = parseInt(value);
          
          let find = Blog.some((el) =>{
            el?.id === patchedValue;
          });

          if (find) {
           
            Status = 404;
            response.message = "Not Found";
            response.data = null;
            response.success = false;
           
          }else{
            const UpdateRating = patch.rating;

            Blog = Blog.map((blogger: any)=>{
                if (blogger?.id === patchedValue) {
                  return {
                    id: blogger.id,
                    Author: blogger.author,
                    title: blogger.title,
                    description:blogger.description,
                    rating: UpdateRating,
                    date: blogger.date
                  }
                
                };
                return blogger;

                
            });

            Status = 200;
                response.message = "Rating updated successfully"
                response.data = Blog;
                response.success = true;

                res.write(JSON.stringify({response, Status}));
                res.end();
          }

         
        }

                //Delete method
                if (method === "DELETE") {
                  const Container: any = url?.split("/")[1];
                  let blogs = parseInt(Container);
        
                  Blog = Blog.filter((el) => {
                    return el?.id !== blogs;
                  });
        
                  response.message = "User deleted";
                  response.data = Blog;
                  response.success = true;
                  res.write(JSON.stringify({ response }));
                  res.end();
                }
        
    })

      
})


server.listen (port,()=>{
    console.log(`listening on port ${port}`)
})



// Daniel's blog project