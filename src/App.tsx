import Router from "./routes";
import { MantineProvider } from "@mantine/core";
import theme from "./utils/theme";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { ErrorBoundary } from "react-error-boundary";
import { FallbackUI } from "./components";
import { Notifications } from "@mantine/notifications";
import { QueryClientProvider } from "react-query";
import { PersistGate } from "redux-persist/integration/react";
import { queryClient } from "./utils/queries";
import "./App.css";

const App = () => {
	return (
		<ErrorBoundary
			FallbackComponent={FallbackUI}
			onError={(error: Error) => {
				console.error(error);
			}}
		>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<QueryClientProvider client={queryClient}>
						<MantineProvider defaultColorScheme="dark" theme={theme}>
							<Notifications />
							<Router />
						</MantineProvider>
					</QueryClientProvider>
				</PersistGate>
			</Provider>
		</ErrorBoundary>
	);
};

export default App;
