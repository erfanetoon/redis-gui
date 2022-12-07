import { useRedisContext } from "../../../contexts/redis";
import { Select } from "@mantine/core";

const Connections = () => {
    const { connections } = useRedisContext();

    return (
        <Select
            variant="filled"
            radius={9999}
            data={connections.map((item) => ({
                label: item,
                value: item,
            }))}
            placeholder="Choose connection"
        />
    );
};

export default Connections;
