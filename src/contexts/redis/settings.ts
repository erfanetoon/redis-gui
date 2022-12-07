import { RedisContext } from "./types";

export const DefaultValue: RedisContext = {
    path: "",
    connections: [],
    activeItem: null,
    handleChange: () => {},
};
