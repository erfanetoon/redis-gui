import { KeyTypes } from "@constants/redis";
import { useRedisContext } from "@contexts/redis";
import { ActionIcon, TextInput } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import Common from "@utilities/common";
import { IGetRedisKeysFormData } from "@utilities/common/apis/redis/types";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import Types from "./types";

const Search = () => {
    const [query, setQuery] = useState("");
    const [queries, setQueries] = useState({
        type: "",
    });

    const { connection, path, handleChange } = useRedisContext();

    const { mutate } = useMutation(
        ({ query, type }: Omit<IGetRedisKeysFormData, "connection" | "path">) =>
            Common.api.redis.GetKeys({
                connection,
                path,
                query,
                type,
            }),
        {
            onSuccess: ({ data }) => {
                handleChange({
                    keys: data.result || [],
                });
            },
        },
    );

    useEffect(() => {
        if (!queries.type) {
            return undefined;
        }

        mutate({
            type: queries.type,
            query,
        });
    }, [queries]);

    return (
        <div>
            <TextInput
                placeholder="Filter by Key Name or Pattern..."
                classNames={{
                    input: `pl-${queries.type ? "36" : "12"} border-0`,
                }}
                variant="filled"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                inputContainer={(children) => (
                    <div className="relative w-full">
                        {children}

                        {queries.type && (
                            <div
                                className={classNames(
                                    "absolute top-1 h-7 left-10 rounded flex items-center justify-between px-1 w-24",
                                    KeyTypes.find(
                                        (item) => item.id === +queries.type,
                                    )?.color,
                                )}>
                                <span className="text-xs mr-2 w-full text-center">
                                    {
                                        KeyTypes.find(
                                            (item) => item.id === +queries.type,
                                        )?.title
                                    }
                                </span>

                                <MdClose
                                    className="text-white hover:text-gray-300 cursor-pointer min-w-max"
                                    onClick={() => {
                                        setQueries({
                                            type: "",
                                        });

                                        mutate({
                                            query: "",
                                            type: "",
                                        });
                                    }}
                                />
                            </div>
                        )}

                        <ActionIcon
                            variant="filled"
                            color="red.9+"
                            className="absolute top-0 right-0 h-full w-9 transition-all duration-300"
                            onClick={() =>
                                mutate({
                                    query,
                                    type: queries.type,
                                })
                            }>
                            <BiSearch />
                        </ActionIcon>

                        <Types
                            handleChangeType={(type: string) =>
                                setQueries({
                                    ...queries,
                                    type,
                                })
                            }
                        />
                    </div>
                )}
            />
        </div>
    );
};

export default Search;
