import React from "react";
import "./types.d";
import {
	Landing,
	Signup,
	Login,
	Home,
	History,
	Live,
	Dashboard,
} from "../pages";
import { Route } from "react-router-dom";

const SuspenseFallback = () => {
	return <div>Loading...</div>;
};

const LazyRouteElement = (props: { element: JSX.Element }) => {
	return (
		<React.Suspense fallback={<SuspenseFallback />}>
			{props.element}
		</React.Suspense>
	);
};

export const routes: RouteType[] = [
	{
		path: "/",
		element: <Landing />,
		title: "Welcome",
		description: "Landing Page of App",
	},
	{
		path: "/login",
		element: <Login />,
		title: "Login",
		description: "Login Page of App",
	},
	{
		path: "/signup",
		element: <Signup />,
		title: "Signup",
		description: "Signup Page of App",
	},
	{
		path: "/home",
		element: <Home />,
		title: "Home",
		description: "Home Page of App",
		children: (
			<>
				<Route
					path="/home"
					element={<LazyRouteElement element={<Dashboard />} />}
				/>
				<Route
					path="/home/all"
					element={<LazyRouteElement element={<History />} />}
				/>
				<Route
					path="/home/live"
					element={<LazyRouteElement element={<Live />} />}
				/>
			</>
		),
	},
];
