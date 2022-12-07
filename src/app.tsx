import ContextsProvider from "./contexts/provide";
import ToastContainer from "./components/public/toast";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import classNames from "classnames";
import Container from "./container";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App = () => {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <ContextsProvider>
                <MantineProvider
                    withGlobalStyles
                    withNormalizeCSS
                    theme={{
                        colorScheme: "dark",
                        fontFamily: "IRANSans, Arial, sans-serif",
                        fontSizes: {
                            xs: 12,
                            sm: 14,
                            md: 16,
                            lg: 18,
                            xl: 20,
                        },
                        spacing: {
                            xs: 8,
                            sm: 12,
                            md: 16,
                            lg: 24,
                            xl: 32,
                        },
                        breakpoints: {
                            xs: 640,
                            sm: 768,
                            md: 1024,
                            lg: 1280,
                            xl: 1536,
                        },
                        primaryColor: "red",
                    }}>
                    <ModalsProvider modalProps={{}}>
                        <section>
                            <ToastContainer
                                rtl={true}
                                position="bottom-right"
                                autoClose={4000}
                                theme="colored"
                                hideProgressBar
                                newestOnTop
                                closeOnClick
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                            />

                            <Container />

                            <div
                                className={classNames(
                                    "hidden",
                                    "text-gray-500 text-red-500 text-blue-500 text-grape-500",
                                    "text-sm text-md text-lg text-xl text-2xl text-3xl text-4xl text-5xl text-6xl text-7xl text-8xl text-9xl",
                                )}
                            />
                        </section>
                    </ModalsProvider>
                </MantineProvider>
            </ContextsProvider>
        </QueryClientProvider>
    );
};

export default App;