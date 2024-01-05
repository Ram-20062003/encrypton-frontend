import { Outlet, useNavigate } from "react-router-dom";
import { getUser } from "../../utils/helpers";

import { useState } from "react";
import {
	Group,
	Code,
	AppShell,
	Burger,
	Box,
	Container,
	Text,
	Center,
	Button,
} from "@mantine/core";
import {
	IconBellRinging,
	IconFingerprint,
	IconKey,
	IconSettings,
	Icon2fa,
	IconDatabaseImport,
	IconReceipt2,
	IconSwitchHorizontal,
	IconLogout,
	IconHistory,
	IconLayoutDashboard,
	IconTimeline,
} from "@tabler/icons-react";
import classes from "./NavbarSimple.module.css";
import { useDisclosure } from "@mantine/hooks";

const data = [
	{
		link: "/home",
		label: "Dashboard",
		icon: IconLayoutDashboard,
	},
	{ link: "/home/all", label: "History", icon: IconHistory },
	{
		link: "/home/live",
		label: "Live",
		icon: IconTimeline,
	},
];

const Home = () => {
	const user = getUser();
	const navigate = useNavigate();
	const [opened, { toggle }] = useDisclosure();
	const [active, setActive] = useState("Dashboard");

	if (!user) {
		navigate("/login");
		return null;
	}

	const links = data.map((item) => (
		// eslint-disable-next-line react/jsx-key
		<Button
			className="w-[200px] rounded-full"
			color={active === item.label ? "blue" : "black"}
			onClick={() => {
				navigate(item.link);
				setActive(item.label);
			}}
			key={item.link}
			leftSection={<item.icon className={classes.linkIcon} stroke={1.5} />}
		>
			{item.label}
		</Button>
	));

	return (
		<Box className="h-screen w-screen">
			<Container
				size="lg"
				className="flex justify-end gap-4 flex-col items-start h-[20%] pb-5"
			>
				<Text className="text-5xl text-white drop-shadow-md">
					Welcome <b>{user.name}</b>!
				</Text>
				<Center className="gap-5 w-full">{links}</Center>
			</Container>
			<Container
				size="lg"
				className="glass h-[80%] py-6 px-6 overflow-y-scroll"
			>
				<Outlet />
			</Container>
		</Box>
	);
};

export default Home;
