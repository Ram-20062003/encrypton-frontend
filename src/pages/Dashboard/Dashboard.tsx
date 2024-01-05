import {
	Center,
	Group,
	Paper,
	RingProgress,
	SimpleGrid,
	rem,
	Text,
	Button,
	FileButton,
} from "@mantine/core";
import { dataFetch, getUser, showNotification } from "../../utils/helpers";

import classes from "./StatsGroup.module.css";
import { useEffect, useState } from "react";
import Papa from "papaparse";

const data = [
	{
		title: "Total Amount",
		stats: "$1,234,567",
	},
	{
		title: "Fraudulent Amount",
		stats: "$234,567",
	},
	{
		title: "Fraudulent",
		stats: "19%",
	},
];

export function StatsGroup() {
	const stats = data.map((stat) => (
		<div key={stat.title} className={classes.stat}>
			<Text className={classes.count}>{stat.stats}</Text>
			<Text className={classes.title}>{stat.title}</Text>
		</div>
	));
	return <div className={classes.root}>{stats}</div>;
}

const Dashboard = () => {
	const user = getUser();
	const [file, setFile] = useState<File | null>(null);

	useEffect(() => {
		const sendToServer = async (data: any) => {
			const processedData = [];

			for (let i = 1; i < data.length; i++) {
				const element = data[i];
				const step = element[0];
				const type = element[1];
				const amount = element[2];
				const nameOrig = element[3];
				const oldbalanceOrg = element[4];
				const newbalanceOrig = element[5];
				const nameDest = element[6];
				const oldbalanceDest = element[7];
				const newbalanceDest = element[8];

				processedData.push({
					time: Number(step),
					amount: Number(amount),
					sender_name: nameOrig,
					sender_old_balance: Number(oldbalanceOrg),
					sender_new_balance: Number(newbalanceOrig),
					receiver_name: nameDest,
					receiver_old_balance: Number(oldbalanceDest),
					receiver_new_balance: Number(newbalanceDest),
					transaction_type: type,
				});
			}

			const response = await dataFetch({
				user: user,
				url: "/transaction/csv",
				body: processedData,
				method: "POST",
			});
			const json = await response.json();
			console.log(json);
		};
		const convertCSVToJSON = async (file: File) => {
			Papa.parse(file, {
				complete: async function (results) {
					await sendToServer(results.data);
					showNotification(
						"Success",
						"Data uploaded successfully",
						"success"
					);
				},
			});
		};
		if (file) {
			convertCSVToJSON(file);
		}
	}, [file]);

	if (!user) {
		return <Center className="h-screen">Loading...</Center>;
	}

	return (
		<Center className="flex flex-col gap-10">
			<StatsGroup />
			<FileButton onChange={setFile} accept="*">
				{(props) => <Button {...props}>Upload Data</Button>}
			</FileButton>
		</Center>
	);
};

export default Dashboard;
