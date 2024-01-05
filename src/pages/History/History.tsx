import { Table, Pagination, Center } from "@mantine/core";
import { useState } from "react";
import { useQuery } from "react-query";
import { dataFetch, getUser } from "../../utils/helpers";

const generateRandomData = () => {
	const data = [];
	for (let i = 0; i < 100; i++) {
		data.push({
			step: i + 1,
			sender: ["John Doe", "Jane Doe", "John Smith", "Jane Smith"][
				Math.floor(Math.random() * 4)
			],
			receiver: ["John Doe", "Jane Doe", "John Smith", "Jane Smith"][
				Math.floor(Math.random() * 4)
			],
			amount: Math.floor(Math.random() * 1000),
			isFraudulent: Math.random() > 0.5,
		});
	}
	return data;
};

const TableReviews = ({
	data,
}: {
	data: {
		step: number;
		sender: string;
		receiver: string;
		amount: number;
		isFraudulent: boolean;
	}[];
}) => {
	const rows = data.map((row, index) => {
		return (
			<Table.Tr key={row.step + Math.random()}>
				<Table.Td>{row.step}</Table.Td>
				<Table.Td>{row.sender}</Table.Td>
				<Table.Td>{row.receiver}</Table.Td>
				<Table.Td>${row.amount}</Table.Td>
				<Table.Td
					className={row.isFraudulent ? "text-red-600" : "text-green-400"}
				>
					{row.isFraudulent ? "Yes" : "No"}
				</Table.Td>
			</Table.Tr>
		);
	});

	return (
		<Table.ScrollContainer minWidth={800}>
			<Table verticalSpacing="xs">
				<Table.Thead>
					<Table.Tr>
						<Table.Th>Step</Table.Th>
						<Table.Th>Sender</Table.Th>
						<Table.Th>Received</Table.Th>
						<Table.Th>Amount</Table.Th>
						<Table.Th>Fraudulent</Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>{rows}</Table.Tbody>
			</Table>
		</Table.ScrollContainer>
	);
};

const PER_PAGE = 10;

const History = () => {
	const user = getUser();
	const [page, setPage] = useState(1);

	const fetchTransactions = async (page = 1) => {
		const response = await dataFetch({
			user: user,
			url: `/transaction/get/${page - 1}`,
			method: "GET",
		});
		if (!response.ok) {
			return {
				count: 0,
				transactions: [],
			};
		}
		return response.json();
	};

	const { isLoading, isError, data } = useQuery({
		queryKey: ["transactions", page],
		queryFn: () => fetchTransactions(page),
	});

	if (isLoading) {
		return <Center className="h-full w-full">Loading...</Center>;
	}

	if (isError) {
		return <div>Error</div>;
	}

	if (!data || data.count === 0) {
		return <div>No Transactions Yet</div>;
	}

	console.log(data);

	return (
		<Center className="gap-5 flex-col h-full w-full justify-between">
			<TableReviews
				data={data.transactions.map((t: any) => {
					return {
						step: t.time,
						sender: t.sender_name,
						receiver: t.receiver_name,
						amount: t.amount,
						isFraudulent: t.is_fraudulent,
					};
				})}
			/>
			<Pagination
				total={Math.ceil(data.count / PER_PAGE)}
				onChange={(page) => {
					setPage(page);
				}}
				value={page}
			/>
		</Center>
	);
};

export default History;
