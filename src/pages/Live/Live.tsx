import { Center, Text, Image } from "@mantine/core";
import { useEffect, useState } from "react";
import { WS_URL } from "../../../config";
import { getUser } from "../../utils/helpers";
import { AreaChart, ChartTooltip, LineChart } from "@mantine/charts";

function addSeconds(date: Date, seconds: number) {
	date.setSeconds(date.getSeconds() + seconds);
	return date;
}

const generateRandomData = () => {
	const data = [];
	for (let i = 0; i < 50; i++) {
		data.push({
			time: addSeconds(new Date("2024-01-04T12:00:00"), i * 60)
				.toTimeString()
				.split(" ")[0],
			sender: ["John Doe", "Jane Doe", "John Smith", "Jane Smith"][
				Math.floor(Math.random() * 4)
			],
			receiver: ["John Doe", "Jane Doe", "John Smith", "Jane Smith"][
				Math.floor(Math.random() * 4)
			],
			amount: Math.floor(Math.random() * 1000),
			isFraudulent: Math.random() > 0.9,
			image: "https://avatars.githubusercontent.com/u/52072276?v=4",
		});
	}
	return data;
};

const processData = (
	data: {
		time: string;
		amount: number;
		isFraudulent: boolean;
		imageURL: string;
	}[]
) => {
	const processedData = data.map((item) => {
		return {
			time: item.time,
			Amount: item.isFraudulent ? null : item.amount,
			FraudulentAmount: item.isFraudulent ? item.amount : null,
			imgUrl: item.imageURL,
		};
	});
	return processedData;
};

const Live = () => {
	const user = getUser();
	const [data, setData] = useState<
		{
			time: string;
			amount: number;
			isFraudulent: boolean;
			imageURL: string;
		}[]
	>([]);
	useEffect(() => {
		// setInterval(() => {
		// 	setData((prev) => [
		// 		...(prev ?? []),
		// 		{
		// 			time: new Date().toTimeString().split(" ")[0],
		// 			amount: Math.floor(Math.random() * 1000),
		// 			isFraudulent: Math.random() > 0.9,
		// 			imageURL: "http://localhost:8000/static/gg-1.png",
		// 		},
		// 	]);
		// }, 3000);

		// Establish a socket connection
		const socket = new WebSocket(WS_URL + `/${user.userToken}`);

		// Connection opened
		socket.addEventListener("open", (event: Event) => {
			console.log("Connected to WS Server");

			// Send message to server
			socket.send("Hello Server!");
		});

		// Listen for messages
		socket.addEventListener("message", (event) => {
			const data = JSON.parse(event.data);
			console.log("Message from server ", data);
			setData((prev) => [
				...(prev ?? []),
				{
					time: data.time,
					amount: data.amount,
					isFraudulent: data.is_fraud == "1",
					imageURL: "http://localhost:8000/static/" + data.image,
				},
			]);
		});
	}, []);
	return (
		<Center className="flex flex-col gap-10">
			<Center className="w-full gap-3 justify-start">
				<Text className="text-3xl font-bold dark:text-slate-200">
					Live Transaction{" "}
				</Text>
				<span className="animate-ping inline-flex h-[10px] w-[10px] rounded-full bg-red-600"></span>
			</Center>
			{data && data.length > 0 ? (
				<LineChart
					h={500}
					data={processData(data)}
					withLegend
					connectNulls
					dataKey="time"
					tooltipProps={{
						content: ({ label, payload }) => {
							if (!payload)
								return <ChartTooltip label={label} payload={payload} />;

							const actualPayload = payload[0]?.payload;

							if (!actualPayload)
								return <ChartTooltip label={label} payload={payload} />;

							if (!actualPayload["imgUrl"])
								return <ChartTooltip label={label} payload={payload} />;

							return (
								<Center className="bg-white  p-5 rounded-xl gap-5">
									<Image
										src={actualPayload["imgUrl"]}
										width={"100px"}
										className="rounded-full"
									/>
								</Center>
							);
						},
					}}
					series={[
						{ name: "Amount", color: "indigo.6" },
						{ name: "FraudulentAmount", color: "red.6" },
					]}
					curveType="linear"
				/>
			) : (
				<Text className="text-3xl font-bold dark:text-slate-200">
					No Transactions Yet
				</Text>
			)}
		</Center>
	);
};

export default Live;
