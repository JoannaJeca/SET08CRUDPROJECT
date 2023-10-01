import http, {ServerResponse, IncomingMessage} from "http"

const Port:number = 2000;


interface iMessage{
  message:string,
  success:boolean,
  data:null| {} | {}[]
}
interface iData{
  id:number,
  food:string,
  ingredients:string,
  recipe:{},
  howToServe:{},
  img?:string
}


let RecipeBook:iData[] = [
  {
    id:1,
    food:"Ewa-Agoyin And Bread",
    ingredients:"Beans, Water, Dried-Chili, Red-bell-pepper, Onion, Palm-oil, Salt, Maggi",
    recipe:{
      step1:"dolor sit, amet consectetur adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step2:" consectetur adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet consectetur",
      step3:" adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet consectetur",
      step4:"ipsum dolor sit, amet consectetur adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet ",
      step5:""
    },
    howToServe:{
      step1:"Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step2:"Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step3:"Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step4:"Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step5:"Lorem ipsum dolor sit, amet consectetur adipisicing elit."
    },
    img:"https://img-global.cpcdn.com/recipes/c762b73b3f787671/1200x630cq70/photo.jpg"
  },
  {
    id:2,
    food:"Fried-Rice Or Jollof",
    ingredients:"Rice, Tin-tomatoes, Tatase, Rodo, Tomatoes, Oil, Butter, Nut-meg, Curry, Thyme, White-pepper, Vegetables, Salt, Aromat-seasoning",
    recipe:{
      step1:"ipsum dolor sit, amet consectetur adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet ",
      step2:" adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet consectetur",
      step3:"amet consectetur adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet",
      step4:" consectetur adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet consectetur",
      step5:"dolor sit, amet consectetur adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet consectetur adipisicing elit."
    },
    howToServe:{
      step1:"Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step2:"Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step3:"Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step4:"Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step5:"Lorem ipsum dolor sit, amet consectetur adipisicing elit."
    },
    img:"https://upload.wikimedia.org/wikipedia/commons/7/7e/Plates_of_Jollof_Rice%2C_Fried_Rice_and_Chicken.jpg"
  },
   {
    id:3,
    food:"Yam And Egg",
    ingredients:"Yam, Egg, Oil, Fresh-peppers & tomatoes, Onions, Salt, Maggi" ,
    recipe:{
      step1:"ipsum dolor sit, amet consectetur adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet ",
      step2:" consectetur adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet consectetur",
      step3:"dolor sit, amet consectetur adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step4:" adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet consectetur",
      step5:"amet consectetur adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet"
    },
    howToServe:{
      step1:"Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step2:"Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step3:"Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step4:"Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step5:"Lorem ipsum dolor sit, amet consectetur adipisicing elit."
    },
    img:"https://agameals.com/wp-content/uploads/2022/04/maxresdefault-23-1140x694.jpg"
  },
   {
    id:4,
    food:"Spagetti",
    ingredients:"Sachet-spagetti, tin-tomatoes, Onoins, Ground-tomato, Ground-pepper, Ground-crayfish, Seasoning, Salt",
    recipe:{
      step1:"dolor sit, amet consectetur adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step2:"amet consectetur adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet",
      step3:" adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet consectetur",
      step4:"ipsum dolor sit, amet consectetur adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet ",
      step5:" consectetur adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet consectetur"
    },
    howToServe:{
      step1:"Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step2:"Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step3:"Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step4:"Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step5:"Lorem ipsum dolor sit, amet consectetur adipisicing elit."
    },
    img:"https://thecozycook.com/wp-content/uploads/2019/08/Bolognese-Sauce-500x500.jpg"
  },
   {
    id:5,
    food:"Eforiro And Semo",
    ingredients:"Beef, Shaki, Cowskin, Dry-fish, Palm-oil, Efo-shoko, Red-bell Scotch-bonnet & Chili pepper, Ground-crayfish, Salt",
    recipe:{
      step1:"dolor sit, amet consectetur adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step2:"amet consectetur adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet",
      step3:" adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet consectetur",
      step4:" consectetur adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet consectetur",
      step5:"ipsum dolor sit, amet consectetur adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet "
    },
    howToServe:{
      step1:"Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step2:"Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step3:"Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step4:"Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step5:"Lorem ipsum dolor sit, amet consectetur adipisicing elit."
    },
    img:"https://www.fmnfoods.com/wp-content/uploads/2020/06/SEMOVEGPEPPER-600.jpg"
  },
   {
    id:6,
    food:"Egusi-Soup and Fufu",
    ingredients:"Egusi-melon, Palm-oil, Beef, Dried-fish, Cray-fish, Locust-bean, vegetables, Achi Ofor Or Cocoyam, Salt, pepper",
    recipe:{
      step1:"ipsum dolor sit, amet consectetur adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet ",
      step2:" consectetur adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet consectetur",
      step3:" adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet consectetur",
      step4:"dolor sit, amet consectetur adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step5:"amet consectetur adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet"
    },
    howToServe:{
      step1:"Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step2:"Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step3:"Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step4:"Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step5:"Lorem ipsum dolor sit, amet consectetur adipisicing elit."
    },
    img:"https://lowcarbafrica.com/wp-content/uploads/2020/11/fufu-IG-1.jpg"
  },
   {
    id:7,
    food:"Rice And Stew/Sauce",
    ingredients:"Rice, Tomatoes, Pepper, Oil, Curry, Onion, Maggi, Salt",
    recipe:{
      step1:"ipsum dolor sit, amet consectetur adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet ",
      step2:" adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet consectetur",
      step3:" consectetur adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet consectetur",
      step4:"amet consectetur adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet",
      step5:"dolor sit, amet consectetur adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet consectetur adipisicing elit."
    },
    howToServe:{
      step1:"Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step2:"Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step3:"Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step4:"Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step5:"Lorem ipsum dolor sit, amet consectetur adipisicing elit."
    },
    img:"https://images.slurrp.com/prod/recipe_images/transcribe/main%20course/African_Beef_Stew.webp?impolicy=slurrp-20210601&width=1200&height=675"
  },
   {
    id:8,
    food:"Akara And Pap",
    ingredients:"Beans, Salt, Onion, Pepper, Oil, Corn, Water,",
    recipe:{
      step1:"ipsum dolor sit, amet consectetur adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet ",
      step2:" adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet consectetur",
      step3:"dolor sit, amet consectetur adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step4:"amet consectetur adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet",
      step5:" consectetur adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet consectetur"
    },
    howToServe:{
      step1:"Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step2:"Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step3:"Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step4:"Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step5:"Lorem ipsum dolor sit, amet consectetur adipisicing elit."
    },
    img:"https://img-global.cpcdn.com/recipes/8e0e68234dacf09c/1200x630cq70/photo.jpg"
  },
   {
    id:9,
    food:"Pepper-Soup",
    ingredients:"Blended(uzuza-seed, Ehuru-seed, Dried-ginger, Yokriyo, Rokoje, Jassa, Omilo), Beef/Chicken, Pomo, Shaki, Liver, Salt, Maggi",
    recipe:{
      step1:"dolor sit, amet consectetur adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step2:"amet consectetur adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet",
      step3:" adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet consectetur",
      step4:"ipsum dolor sit, amet consectetur adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet ",
      step5:" consectetur adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet consectetur"
    },
    howToServe:{
      step1:"Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step2:"Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step3:"Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step4:"Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step5:"Lorem ipsum dolor sit, amet consectetur adipisicing elit."
    },
    img:"https://cheflolaskitchen.com/wp-content/uploads/2018/05/nigerian-goat-meat-pepper-soup-3-500x450.jpg"
  },
  {
    id:10,
    food:"Eba And Vegetable-Soup",
    ingredients:"Vegetables, Pepper, Salt, Maggi, Crayfish, Pomo, Vegetables, Onion, Oil",
    recipe:{
      step1:" consectetur adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet consectetur",
      step2:" consectetur adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, consectetur",
      step3:" adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet consectetur",
      step4:"met consectetur adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet ",
      step5:"amet consectetur adipisicing elit. Placeat quae voluptates Lorem ipsum dolor sit, amet "
    },
    howToServe:{
      step1:"Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step2:"Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step3:"Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step4:"Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      step5:"Lorem ipsum dolor sit, amet consectetur adipisicing elit."
    },
    img:"https://tribuneonlineng.com/wp-content/uploads/2018/11/Eba-1.jpg"
  },
]

const server = http.createServer((req:IncomingMessage, res:ServerResponse<IncomingMessage>)=>{
    res.setHeader("content-Type", "Application/JSON")
    const {method, url} = req
    let status = 404

    let response:iMessage = {
        message:"Haven't read any recipe yet",
        success: false,
        data:null
    }

    let holder:any = []
    req.on("data",(chunk:any)=>{
      holder.push(chunk)
    }).on("end",()=>{
      
     //get
     if(method === "GET" && url === "/"){
       status = 200
       response.message = "Gotten"
       response.success = true
       response.data = RecipeBook
       res.write(JSON.stringify({response, status}))
       res.end()
     }
     
     //post
     if(method === "POST" && url === "/"){
        const body = JSON.parse(holder)
        RecipeBook.push(body)
        status = 200
        response.message = "Posted"
        response.success = true
        response.data  = RecipeBook
        res.write(JSON.stringify({response, status}))
        res.end()
     }
       
      //patch
       if(method === "PATCH"){
        const body = JSON.parse(holder)
        let details:any = url?.split("/")[1]
        let value = parseInt(details)

        const find  = RecipeBook.some((el)=>{
          return el.id === value
        })

        if(find === false){
          status = 404
          response.message = "No message"
          response.success = false
          response.data = null
          res.write(JSON.stringify({response, status}))
          res.end()
        }else{
          const change = body.food
          RecipeBook = RecipeBook.map((el:any)=>{
            if(el?.id === value){
              return{
                id:el?.id,
                food:change,
                ingredients:el?.ingredients,
                recipe:el?.recipe,
                howToServe:el?.howToServe,
                img:el?.img
              }
            }
            return el
          })
          status = 200
          response.message = "completed"
          response.success = true
          response.data = RecipeBook
          res.write(JSON.stringify({response, status}))
          res.end()
        }
       }

       //delete

       if(method === "DELETE"){
         const details:any = url?.split("/")[1]
         const val = parseInt(details)
         RecipeBook = RecipeBook.filter((el)=>{
           return el.id !== val
         })
         status = 200
         response.message = "successful"
         response.success = true
         response.data = RecipeBook
         res.write(JSON.stringify({response, status}))
         res.end()
       }

    })
})

server.listen(Port,()=>{
    console.log("server is listening on port", Port)
})