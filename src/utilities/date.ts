import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/en";

dayjs.extend(relativeTime);

const DateHelper = ({
    datetime,
    format = "DD MMMM YYYY - HH:mm",
    fromNow = false,
}: {
    datetime: string | number;
    format?: string;
    fromNow?: boolean;
}) => {
    if (!dayjs) {
        return "";
    }

    if (fromNow) {
        // @ts-ignore
        return dayjs(datetime).fromNow();
    } else {
        return dayjs(datetime).format(format);
    }
};

export default DateHelper;
