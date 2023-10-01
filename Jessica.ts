//news aggregator

import http, { IncomingMessage, ServerResponse } from "http"
// import axios from "axios"
import event from "events"
const port : number = 2003
interface NewIn {
    id: number
    source: string
    author: string
    category: string
    title: string
    description: string
    url: string
    content: string 
    publishedby: string
}
let NewApi:NewIn[] =[
    {
        id: 1,
        source: "Joseph-Blair ...google-news",
        author: "google-news",
        category: "Technology",
        title: "The goodness of Tech in our century",
        description: "After seven years in space, the Osiris-Rex probe continues to make headlines as NASA scientists open the lid of its capsule of asteroid debris. The data coll...",
        url: "https://youtube.com/watch/feeds",
        content: "LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLorem. LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLorem, LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLorem.",
        publishedby: "2023/09/28, 03:08pm"
    },
    {
        id: 2,
        source: "VanguardNews",
        author: "Jessica Bryan ...VanguardNews",
        category: "Humanities",
        title: "Flood in Zamfara State",
        description: "After seven years of relief, the Zamfara people experience an unexpected flood in their region...",
        url: "https://facebook.com/watch/feeds",
        content: "LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLorem. LoremLoremLoremLoremLoremLoremLoremLoremLorem.LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLorem. LoremLoremLoremLoremLoremLoremLoremLoremLorem.",
        publishedby: "2023/09/28, 03:08pm"
    },
    {
        id: 3,
        source: "WION Web Team",
        author: "Luciana Peters ...WION Web Team",
        category: "Health",
        title: "Study finds mRNA from Covid vaccines in milk of breastfeeding mothers - WION",
        description: "Study finds mRNA from Covid vaccines in milk of breastfeeding mothers...",
        url: "https://youtube.cohttps://www.wionews.com/science/study-find-mrna-from-covid-vaccines-in-milk-of-breastfeeding-mothers-640553m/watch/feeds",
        content: "A new study has found presence of mRNA from Covid vaccines in the milk of breastfeeding mothers upto 45 hours after they received the vaccine. The study, reported by The Epoch Times, has been publish… [+2812 chars]",
        "publishedby": "2023-09-28T11:15:27Z"
    },
    {
        id: 4,
        source: "Science-alert",
        author: "Michelle-Bush ...Science-alert",
        category: "Science",
        title: "Latest Look at TRAPPIST-1 Planet Raises Concerns of Star 'Contamination' - ScienceAlert",
        description: "Discovery by Science-Alert Canada...",
        url: "https://www.sciencealert.com/images/2023/09/trappist-1b.jpg",
        content: "Earlier this year, the James Webb Space Telescope dashed hopes for life on one of the most Earth-like exoplanets discovered in the Milky Way.TRAPPIST-1b, a world 1.4 times the mass and 1.1 times th… [+4096 chars]",
        "publishedby": "2023-09-28T11:15:27Z"
    },
    {
        id: 5,
        source: "Home-alert",
        author: "Michelle-Bush ...Home-alert",
        category: "Human Resources",
        title: "Latest Look at TRAPPIST-1 Planet Raises Concerns of Star 'Contamination' - HomeAlert",
        description: "Discovery by Home-Alert Canada...",
        url: "https://www.sciencealert.com/images/2023/09/trappist-1b.jpg",
        content: "Earlier this year, the James Webb Space Telescope dashed hopes for life on one of the most Earth-like exoplanets discovered in the Milky Way.TRAPPIST-1b, a world 1.4 times the mass and 1.1 times th… [+4096 chars]",
        "publishedby": "2023-09-28T11:15:27Z"
    },
    {
        id: 6,
        source: "Home-alert",
        author: "Michelle-Bush ...Home-alert",
        category: "Science",
        title: "Latest Look at TRAPPIST-1 Planet Raises Concerns of Star 'Contamination' - HomeAlert",
        description: "Discovery by Home-Alert Canada...",
        url: "https://www.sciencealert.com/images/2023/09/trappist-1b.jpg",
        content: "Earlier this year, the James Webb Space Telescope dashed hopes for life on one of the most Earth-like exoplanets discovered in the Milky Way.TRAPPIST-1b, a world 1.4 times the mass and 1.1 times th… [+4096 chars]",
        "publishedby": "2023-09-28T11:15:27Z"
    },
    {
        id: 7,
        source: "Home-alert",
        author: "Michelle-Bush ...Home-alert",
        category: "Technology",
        title: "Latest Look at TRAPPIST-1 Planet Raises Concerns of Star 'Contamination' - HomeAlert",
        description: "Discovery by Home-Alert Canada...",
        url: "https://www.sciencealert.com/images/2023/09/trappist-1b.jpg",
        content: "Earlier this year, the James Webb Space Telescope dashed hopes for life on one of the most Earth-like exoplanets discovered in the Milky Way.TRAPPIST-1b, a world 1.4 times the mass and 1.1 times th… [+4096 chars]",
        "publishedby": "2023-09-28T11:15:27Z"
    },
    {
        id: 8,
        source: "Home-alert",
        author: "Michelle-Bush ...Home-alert",
        category: "Business",
        title: "Latest Look at TRAPPIST-1 Planet Raises Concerns of Star 'Contamination' - HomeAlert",
        description: "Discovery by Home-Alert Canada...",
        url: "https://www.sciencealert.com/images/2023/09/trappist-1b.jpg",
        content: "Earlier this year, the James Webb Space Telescope dashed hopes for life on one of the most Earth-like exoplanets discovered in the Milky Way.TRAPPIST-1b, a world 1.4 times the mass and 1.1 times th… [+4096 chars]",
        "publishedby": "2023-09-28T11:15:27Z"
    },
    {
        id: 9,
        source: "Home-alert",
        author: "Michelle-Bush ...Home-alert",
        category: "Science",
        title: "Latest Look at TRAPPIST-1 Planet Raises Concerns of Star 'Contamination' - HomeAlert",
        description: "Discovery by Home-Alert Canada...",
        url: "https://www.sciencealert.com/images/2023/09/trappist-1b.jpg",
        content: "Earlier this year, the James Webb Space Telescope dashed hopes for life on one of the most Earth-like exoplanets discovered in the Milky Way.TRAPPIST-1b, a world 1.4 times the mass and 1.1 times th… [+4096 chars]",
        "publishedby": "2023-09-28T11:15:27Z"
    },
    {
        id: 10,
        source: "Home-alert",
        author: "Michelle-Bush ...Home-alert",
        category: "Business",
        title: "Latest Look at TRAPPIST-1 Planet Raises Concerns of Star 'Contamination' - HomeAlert",
        description: "Discovery by Home-Alert Canada...",
        url: "https://www.sciencealert.com/images/2023/09/trappist-1b.jpg",
        content: "Earlier this year, the James Webb Space Telescope dashed hopes for life on one of the most Earth-like exoplanets discovered in the Milky Way.TRAPPIST-1b, a world 1.4 times the mass and 1.1 times th… [+4096 chars]",
        "publishedby": "2023-09-28T11:15:27Z"
    }
]
interface iMess {
    message: string,
    success: boolean,
    articles: null | {} | {}[]
}

const Server = http.createServer((req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    res.setHeader("Content-type", "Application/json")
    const {method, url} = req        
    const response: iMess ={
        message: "Not news Worthy",
        success: false,
        articles: null
    }
    let status = 404;
    let requestBody: any = [];
    req.on("data", (chunk)=> {
        requestBody.push(chunk)
    }).on("end",  ()=>{
        if(method === "GET" && url === "/"){            
            status = 200,
            response.message="News gotten"
            response.success = true
            response.articles = NewApi
            res.write(JSON.stringify({response}))
            res.end()
        };
        if(method === "POST"){
            const requestData = JSON.parse(requestBody)
            NewApi.push(requestData)
            status = 201,
            response.message= "News Added from source",
            response.success = true,
            response.articles = NewApi
            res.write(JSON.stringify({response}))
            res.end()           
        };
        if(method === "PATCH"){
            const Reset = JSON.parse(requestBody)

            let geturl: any = url?.split("/")[1];
            let urlgot = parseInt(geturl);

            let findNews = NewApi.some((el) =>{
                return el.id === urlgot
            });
            if(findNews === false){
                response.message = "headline not found"
                response.success = false;
                response.articles = null
                res.write(JSON.stringify({response}))
                res.end()
            }else{
                const ContentUpdate = Reset.content;
                const timeUpdate = Reset.publishedby;

                 NewApi = NewApi.map((news: any)=> {
                    if(news?.id === urlgot){
                        return{
                            id: news?.id,
                            source: news?.source,
                            author: news.author,
                            category: news?.category,
                            title: news?.title,
                            description: news?.description,
                            url: news?.url,
                            content: ContentUpdate,
                            publishedby: timeUpdate,
                        };
                    };
                    return news;
                });
                status = 200,
                response.message = "News Updated"
                response.success = true
                response.articles = NewApi
                res.write(JSON.stringify({response}));
                res.end()
            }
        };
        if(method === "DELETE"){
            const urlin : any = url?.split("/")[1]
            const urldel = parseInt(urlin) 
            
            NewApi = NewApi.filter((el)=>{
                return el.id !== urldel;
            });
            response.message = "Deleted"
            response.success = true
            response.articles = NewApi
            res.write(JSON.stringify({response}))
            res.end()
        };
    })
})

Server.listen(port, ()=> {
    console.log("Server is running and listening to port:", port)
})