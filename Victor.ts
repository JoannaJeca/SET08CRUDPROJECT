import http, { IncomingMessage, ServerResponse } from "http"

const port = 3000

interface iData {
    id: number
    title: string
    Daily_duty: string
    task: string
}

interface iMessage {
    message: string
    success: boolean
    data: null | {} | {}[]
}

let Post: iData[] = [
    {
        id: 1,
        title: "WORKERS ROUTINE",
        Daily_duty: "Daily monitoring",
        task: "Ducumentaion of daily production"
    },
    {
        id: 2,
        title: "Hot plate",
        Daily_duty: "Daily monitoring",
        task: "Ducumentaion of HR files"
    },
    {
        id: 3,
        title: "Refrigirator",
        Daily_duty: "Daily monitoring",
        task: "Take daily monitior"
    },
    {
        id: 4,
        title: "Television",
        Daily_duty: "Daily monitoring",
        task: "Ducumentaion of daily production"
    },
    {
        id: 5,
        title: "Shirt",
        Daily_duty: "Daily monitoring",
        task: "Ducumentaion of daily production"
    },
    {
        id: 6,
        title: "T-Shirt",
        Daily_duty: "Daily monitoring",
        task: "Ducumentaion of daily production"
    },

]

const server = http.createServer((req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    res.setHeader("Content-Type", "application/json")

    const { method, url } = req
    let status = 404;

    let response: iMessage = {
        message: "Failed",
        success: false,
        data: null
    }


    const container: any = []

    req.on("data", (chunk: any) => {
        container.push(chunk)

    }).on("end", () => {

        if (url === "/" && method === "GET") {
            status = 200;
            response.message = `Successful ${Post} `
            response.success = true;
            response.data = Post;
            res.write(JSON.stringify({ status, response }))
            res.end()
        }

        if (url === "/" && method === "POST") {
            const body = JSON.parse(container)

            let confirm = Post.find((el) => {
                return el.id === body.id;
            });

            if (confirm) {

                status = 404;

                response.message = `id ${body.id} already exist`
                response.success = false
                response.data = null
                res.write(JSON.stringify({ status, response }))
                res.end()

                return;
            }
            Post.push(body);
            status = 200;

            response.message = "Added successfully"
            response.success = true
            response.data = Post;
            res.write(JSON.stringify({ status, response }))
            res.end()

        }

        if (method === "PATCH") {
            const build = JSON.parse(container)

            let link: any = url?.split("/")[1]
            let unLink = parseInt(link)

            let find = Post.some((el) => {
                return el.id === unLink
            });

            if (!find) {
                status = 404;

                (response.message = "User not found");
                (response.success = false);
                (response.data = null)
                res.write(JSON.stringify({ status, response }))
                res.end()
            } else {
                const updateproduct = build.product_Name

                Post = Post.map((el: any) => {
                    if (el?.id === unLink) {
                        return {
                            id: el?.id,
                            product_Name: updateproduct,
                            categories: el?.categories,
                            price: el?.price

                        }
                    }
                    return el
                })
                status = 200;

                (response.message = ` id ${unLink} has been updated`);
                (response.success = true);
                (response.data = Post)
                res.write(JSON.stringify({ status, response }))
                res.end()
            }
        }

        if (method === "PUT") {
            const body = JSON.parse(container)

            let link: any = url?.split("/")[1]
            let unLink = parseInt(link)

            let find = Post.some((el) => {
                return el.id === unLink
            });

            if (!find) {
                status = 404;

                (response.message = "post not found");
                (response.success = false);
                (response.data = null);
                res.write(JSON.stringify({ status, response }))
                res.end()
            } else {
                const Updateproduct = body.product_Name
                const UpdateCat = body.categories
                const UpdatePrice = body.price

                Post = Post.map((user: any) => {
                    if (user?.id === unLink) {
                        return {
                            id: user?.id,
                            product_Name: Updateproduct,
                            categories: UpdateCat,
                            price: UpdatePrice
                        };
                    }
                    return user
                })
                status = 200;

                (response.message = "POST updated");
                (response.success = true);
                (response.data = Post)
                res.write(JSON.stringify({ status, response }))
                res.end()
            }
        }

        if (method === "DELETE") {
            const body = JSON.parse(container)

            let link: any = url?.split("/")[1]
            let unLink = parseInt(link)

            let find = Post.some((el) => {
                return el.id === unLink;
            });

            if (!find) {
                status = 404;
                (response.message = "User not Found"),
                    (response.data = null),
                    (response.success = false);

                res.write(JSON.stringify({ response, status }));

                res.end();

            } else {
                Post = Post.filter((el) => {
                    return el.id !== unLink
                });

                response.message = `id ${unLink} deleted`
                response.success = true
                response.data = Post
                res.write(JSON.stringify({ status, response }))
                res.end()
            }
        }

        if (method === "GET") {
            let link: any = url?.split("/")[1]
            let unLink = parseInt(link);

            let find: any = Post.find((el: any) => {
                return el.id === unLink
            });
            status = 200

            response.message = `id ${unLink} gotten only`;
            response.success = true
            response.data = find
            res.write(JSON.stringify({ status, response }))
            res.end()
        }

        if (method === "GET") {

            let Cat = JSON.parse(container)

            const { categories } = Cat
            const activePost: any = url?.split("/")[1]
            let inactivepost = activePost.toString();

            let find: any = Post.some((el: any) => {
                return el.categories === inactivepost
            });

            if (find) {
                let Cat = Post.filter((el) => {
                    return el.Daily_duty === inactivepost
                })
                status = 200;

                response.message = `${inactivepost} daily routine gotten`
                response.success = true
                response.data = Cat
                res.write(JSON.stringify({ status, response }))
                res.end()
            } else {
                status = 404;
                response.message = `${inactivepost} post not found`,
                    response.data = null,
                    response.success = false;

                res.write(JSON.stringify({ response, status }));

                res.end();
            }
        } else {
            status = 404;
            response.message = `check your post`,
                response.data = null,
                response.success = false;

            res.write(JSON.stringify({ response, status }));

            res.end();
        }

    })
})

server.listen(port, () => {
    console.log(" sever runing");

})