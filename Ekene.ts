import * as http from "http";

const port = 3000;

interface SocialMediaActivity {
	platform: string;
	activity: string;
}

interface User {
	id: number;
	name: string;
	activities: SocialMediaActivity[];
}

interface Result {
	message: string;
	success: boolean;
	data: null | {} | {}[];
}

let users: User[] = [
	{
		id: 1,
		name: "Topper",
		activities: [
			{ platform: "facebook", activity: "Posted a photo" },
			{ platform: "twitter", activity: "Tweeted a message" },
		],
	},
	{
		id: 2,
		name: "Ayo",
		activities: [
			{ platform: "twitter", activity: "Retweeted a post" },
		],
	},
	{
		id: 7,
		name: "Zion",
		activities: [
			{ platform: "WhatsApp", activity: "Sent Message" },
			{ platform: "twitter", activity: "Retweeted a post" },
			{ platform: "Facebook", activity: "Post a Video" },
		],
	},
	{
		id: 9,
		name: "Ahmed",
		activities: [
			{ platform: "twitter", activity: "Retweeted a post" },
		],
	},
	{
		id: 15,
		name: "Dan",
		activities: [
			{ platform: "Instagram", activity: "Posted a Video" },
			{ platform: "twitter", activity: "Retweeted a post" },
			{ platform: "Linkdin", activity: "Retweeted a Video" },
		],
	},
	{
		id: 6,
		name: "Victor",
		activities: [
			{ platform: "twitter", activity: "Retweeted a post" },
			{ platform: "WhatsApp", activity: "Tobi Sent Hi" },
			{ platform: "Linkdin", activity: "Retweeted A Message" },
		],
	},
	{
		id: 11,
		name: "Ebuka",
		activities: [
			{ platform: "twitter", activity: "Retweeted a post" },
			{ platform: "twitter", activity: "Retweeted a post" },
			{ platform: "Linkdin", activity: "Retweeted " },
		],
	},
	{
		id: 23,
		name: "Val",
		activities: [
			{ platform: "twitter", activity: "Retweeted a post" },
			{ platform: "twitter", activity: "Retweeted a post" },
			{ platform: "Linkdin", activity: "Retweeted " },
		],
	},
	{
		id: 8,
		name: "Wiz",
		activities: [
			{ platform: "twitter", activity: "Retweeted a post" },
			{ platform: "twitter", activity: "Retweeted a post" },
			{ platform: "Linkdin", activity: "Retweeted " },
		],
	},
];

const server = http.createServer(
	(req: http.IncomingMessage, res: http.ServerResponse) => {
		const { method, url } = req;
		// const parsedUrl = url?.parse(reqUrl || "", true);

		res.setHeader("Content-Type", "application/json");
		let status = 404;

		let response: Result = {
			message: "Bad",
			success: false,
			data: null,
		};

		{
			let container: any = [];
			req
				.on("data", (chunk) => {
					container.push(chunk);
				})
				.on("end", () => {
					if (method === "GET" && url === "/getusers") {
						const iniUrl: any = url.split("/")[1];
						const useFulurl = parseInt(iniUrl);

						status = 200;

						response = {
							message: "Successfu",
							success: true,
							data: users,
						};
						res.write(JSON.stringify({ response, status }));
						res.end();
					} else if (method === "POST" && url === "/postuser") {
						const body = JSON.parse(container);
						users.push(body);

						status = 200;

						response = {
							message: "Successful",
							success: true,
							data: users,
						};

						res.write(JSON.stringify({ response, status }));
						res.end();
					} else if (method === "DELETE") {
						const userId: any = url?.split("/")[1];
						const parsed = parseInt(userId);
						users = users.filter((e) => e.id !== parsed);
						status = 200;
						response = {
							success: true,
							message: "User deleted successfully",
							data: users,
						};
						res.writeHead(status);
						res.end(JSON.stringify(response));
					} else {
						res.writeHead(status);
						res.end(JSON.stringify(response));
					}
				});
		}
	}
);

server.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});