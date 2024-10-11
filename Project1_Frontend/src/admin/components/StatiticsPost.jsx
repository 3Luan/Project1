import { useEffect, useState } from "react";
import {
  getPostsStatisticsAPI,
  getapprovedPostsStatisticsAPI,
  getUnapprovedPostsStatisticsAPI,
} from "../../services/postService";
import StatiticsCard from "./StatiticsCard";

const StatiticsPost = ({ day, month, year }) => {
  const [countPost, setCountPost] = useState();
  const [countApprovedPost, setCountApprovedPost] = useState();
  const [countUnapprovedPost, setCountUnapprovedPost] = useState();

  useEffect(() => {
    getData();
  }, [day, month, year]);

  const getData = async () => {
    const postData = await getPostsStatisticsAPI(day, month, year);
    if (postData?.code === 0) {
      setCountPost(postData?.count);
    }

    const approvedData = await getapprovedPostsStatisticsAPI(day, month, year);
    if (approvedData?.code === 0) {
      setCountApprovedPost(approvedData?.count);
    }

    const unapprovedData = await getUnapprovedPostsStatisticsAPI(
      day,
      month,
      year
    );
    if (unapprovedData?.code === 0) {
      setCountUnapprovedPost(unapprovedData?.count);
    }
  };

  return (
    <div className="pt-4">
      <div className="flex">
        <div className="px-4 w-1/2">
          <StatiticsCard count={countPost} title={"Tất cả bài viết"} />
        </div>
        <div className="px-4 w-1/2">
          <StatiticsCard
            count={countApprovedPost}
            title={"Bài viết đã duyệt"}
          />{" "}
        </div>
      </div>
      <div className="flex">
        <div className="px-4 py-4 w-1/2">
          <StatiticsCard
            count={countUnapprovedPost}
            title={"Bài viết chưa duyệt"}
          />
        </div>
        <div className="px-4 py-4 w-1/2"></div>
      </div>
    </div>
  );
};

export default StatiticsPost;
