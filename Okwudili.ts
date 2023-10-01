import http, { IncomingMessage, ServerResponse } from "http"

const port = 3000

interface iData{
    id: number
    product_Name: string
    categories: string
    price: number
}

interface iMessage {
    message: string
    success: boolean
    data: null | {} | {}[]
}

let chart: iData[] = [
    {
        id: 1,
        product_Name: "Electirc Iron",
        categories: "Electronics",
        price: 6000
    },
    {
        id: 2,
        product_Name: "Hot plate",
        categories: "Electronics",
        price: 7500
    },
    {
        id: 3,
        product_Name: "Refrigirator",
        categories: "Electronics",
        price: 60000
    },
    {
        id: 4,
        product_Name: "Television",
        categories: "Electronics",
        price: 6000
    },
    {
        id: 5,
        product_Name: "Shirt",
        categories: "Clothing",
        price: 1000
    },
    {
        id: 6,
        product_Name: "T-Shirt",
        categories: "Clothing",
        price: 1000
    },
    {
        id: 7,
        product_Name: "Sleeveless dress",
        categories: "Clothing",
        price: 1000
    },
    {
        id: 8,
        product_Name: "Senator",
        categories: "Clothing",
        price: 1000
    },
    {
        id: 9,
        product_Name: "Lexus",
        categories: "Car",
        price: 1000
    },
    {
        id: 10,
        product_Name: "Ferrari",
        categories: "Car",
        price: 1000
    },
    {
        id: 11,
        product_Name: "Lambongni",
        categories: "Car",
        price: 1000
    },
    {
        id: 12,
        product_Name: "Toyota",
        categories: "Car",
        price: 1000
    },
    {
        id: 13,
        product_Name: "Hood",
        categories: "Hat",
        price: 1000
    },
    {
        id: 14,
        product_Name: "cowboy hat",
        categories: "Hat",
        price: 500
    },
    {
        id: 15,
        product_Name: "cap",
        categories: "Hat",
        price: 900
    },
    {
        id: 16,
        product_Name: "bobble hat",
        categories: "Hat",
        price: 1500
    },
    {
        id: 17,
        product_Name: "Pendant",
        categories: "Jewellery",
        price: 12000
    },
    {
        id: 18,
        product_Name: "Medallion",
        categories: "Jewellery",
        price: 20000
    },
    {
        id: 19,
        product_Name: "chain",
        categories: "Jewellery",
        price: 5000
    },
    {
        id: 20,
        product_Name: "cufflink",
        categories: "Jewellery",
        price: 200
    },
]

const server = http.createServer((req: IncomingMessage, res:ServerResponse<IncomingMessage>) =>{
    res.setHeader("Content-Type", "application/json")

    const {method, url} = req
    let status = 404;

    let response:iMessage = {
        message: "Failed",
        success: false,
        data: null
    }


    const container: any = []

    req.on("data", (chunk: any) =>{
        container.push(chunk)

    }).on("end", () =>{

        if(url === "/" && method === "GET"){
            status = 200;
            response.message = `Successful gotten ${chart.length} product`
            response.success = true;
            response.data = chart;
            res.write(JSON.stringify({status, response}))
            res.end()
        }

        if(url === "/" && method === "POST"){
            const body = JSON.parse(container)          
                        
            let confirm = chart.find((el) =>{
                return el.id === body.id;
            });

            if (confirm){
                 
                status = 404;

                response.message = `id ${body.id} already exist`
                response.success = false
                response.data = null
                res.write(JSON.stringify({status, response}))
                res.end()

                return;
            }
                chart.push(body); 
                status = 200;

                response.message = "Added successfully"
                response.success = true
                response.data = chart;
                res.write(JSON.stringify({status, response}))
                res.end()
            
        }

        if(method === "PATCH"){
            const build = JSON.parse(container)
            
            let link: any = url?.split("/")[1]
            let unLink = parseInt(link)

            let find = chart.some((el) =>{
                return el.id === unLink
            });

            if(!find){
                status = 404;

                (response.message = "User not found");
                (response.success = false);
                (response.data = null)
                res.write(JSON.stringify({status, response}))
                res.end()
            }else{
                const updateproduct = build.product_Name

                chart = chart.map((el: any) =>{
                    if(el?.id === unLink){
                        return{
                            id: el?.id,
                            product_Name: updateproduct,
                            categories:el?.categories,
                            price: el?.price

                        }
                    }
                    return el
                })
                status = 200;

                (response.message = ` id ${unLink} has been updated`);
                (response.success = true);
                (response.data = chart)
                res.write(JSON.stringify({status, response}))
                res.end()
            }
        }

        if(method === "PUT"){
            const body = JSON.parse(container)

            let link: any = url?.split("/")[1]
            let unLink = parseInt(link)

            let find = chart.some((el) =>{
                return el.id === unLink
            });

            if(!find){
                status = 404;

                (response.message = "User not found");
                (response.success = false);
                (response.data = null);
                res.write(JSON.stringify({status, response}))
                res.end()
            }else{
                const Updateproduct = body.product_Name
                const UpdateCat = body.categories
                const UpdatePrice = body.price

                chart = chart.map((user: any) =>{
                    if(user?.id === unLink){
                        return{
                            id: user?.id,
                            product_Name: Updateproduct,
                            categories: UpdateCat,
                            price: UpdatePrice
                        };
                    }
                    return user
                })
                status = 200;

                (response.message = "User updated");
                (response.success = true);
                (response.data = chart)
                res.write(JSON.stringify({status, response}))
                res.end()
            }
        }

        if(method === "DELETE"){
            const body = JSON.parse(container)

            let link: any = url?.split("/")[1]
            let unLink = parseInt(link)

            let find = chart.some((el) =>{
                return el.id === unLink;
            });

            if(!find){
                status = 404;
                (response.message = "User not Found"),
              (response.data = null),
              (response.success = false);

            res.write(JSON.stringify({ response, status }));

            res.end();

            }else{
                chart = chart.filter((el) =>{
                    return el.id !== unLink
                });
    
                response.message = `id ${unLink} deleted`
                response.success = true
                response.data = chart
                res.write(JSON.stringify({status, response}))
                res.end()
            }
        }

        if(method === "GET"){
            let link: any = url?.split("/")[1]
            let unLink = parseInt(link);

            let find: any = chart.find((el: any) =>{
                return el.id === unLink
            });
            status = 200

            response.message = `id ${unLink} gotten only`;
            response.success = true
            response.data = find
            res.write(JSON.stringify({status, response}))
            res.end()
        }
        
        if(method === "GET"){

            let Cat = JSON.parse(container)
            
            const {categories} = Cat
            const link: any = url?.split("/")[1]
            let unLink = link.toString();

            let find: any = chart.some((el: any) =>{
                return el.categories === unLink
            });

            if(find){
                let Cat = chart.filter((el) =>{
                    return el.categories === unLink
                })
                status = 200;

                response.message = `${unLink} categories gotten`
            response.success = true
            response.data = Cat
            res.write(JSON.stringify({status, response}))
            res.end()
            }else{
                status = 404;
                response.message = `${unLink} categories not found`,
              response.data = null,
              response.success = false;

            res.write(JSON.stringify({ response, status }));

            res.end();
            }
        }else{
            status = 404;
                response.message = `check your catergories method`,
              response.data = null,
              response.success = false;

            res.write(JSON.stringify({ response, status }));

            res.end();
        }

    })
})

server.listen(port, () =>{
    console.log("Awating");
    
})