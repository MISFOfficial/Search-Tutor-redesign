import { formatDistanceToNow, differenceInSeconds } from "date-fns";

const JobPostTime = ({ date }) => {
  const secondsAgo = differenceInSeconds(new Date(), new Date(date));

  const timeAgo =
    secondsAgo < 60
      ? "just now"
      : formatDistanceToNow(new Date(date), { addSuffix: true });

  return <span>{timeAgo}</span>;
};

export default JobPostTime;
