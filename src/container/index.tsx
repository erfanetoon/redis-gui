import { useRedisContext } from "@contexts/redis";
import classNames from "classnames";
import Layout from "../layout";

const Container = () => {
    const { activeItem, handleChange } = useRedisContext();

    console.log(activeItem);
    return (
        <Layout loading={true}>
            <div className="grid lg:grid-cols-2 gap-4 h-full relative">
                <div
                    className={classNames(
                        "bg-dark-600 rounded-lg h-full p-2 overflow-hidden",
                        !activeItem && "col-span-2",
                    )}>
                    <div className="h-full overflow-auto scroll-gray-700">
                        <button
                            onClick={() =>
                                handleChange({
                                    activeItem: activeItem ? null : "iran",
                                })
                            }>
                            activeItem
                        </button>
                        children
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                    </div>
                </div>

                {activeItem && (
                    <div className="bg-dark-600 rounded-lg p-1 overflow-hidden absolute lg:static w-full h-full">
                        <div className="h-full overflow-auto scroll-gray-700">
                            activeItem
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Container;
