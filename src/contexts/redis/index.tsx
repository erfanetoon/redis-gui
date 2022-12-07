// @ts-nocheck
import {
    createContext,
    FC,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { DefaultValue } from "./settings";
import { RedisContext } from "./types";

interface Props {
    children: ReactNode;
}

const Context = createContext<RedisContext>(DefaultValue);

export const RedisProvider: FC<Props> = ({ children }) => {
    const [data, setData] = useState(DefaultValue);

    useEffect(() => {
        if (!window.RedisGUI) {
            return undefined;
        }

        setData({
            path: window.RedisGUI.path as RedisContext["path"],
            connections: window.RedisGUI
                .connections as RedisContext["connections"],
        });
    }, []);

    const handleChange: RedisContext["handleChange"] = (newData) => {
        setData((oldState) => ({
            ...oldState,
            ...newData,
        }));
    };

    return (
        <Context.Provider value={{ ...data, handleChange }}>
            {children}
        </Context.Provider>
    );
};

export const useRedisContext = () => useContext(Context);
