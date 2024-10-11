import { useEffect, useState } from "react";
import {
  getPostsStatisticsAPI,
  getapprovedPostsStatisticsAPI,
  getUnapprovedPostsStatisticsAPI,
} from "../../services/postService";
import StatiticsCard from "./StatiticsCard";
import {
  getNewUserStatisticsAPI,
  getUserIsBanStatisticsAPI,
  getUserNotBanStatisticsAPI,
  getUserStatisticsAPI,
} from "../../services/userService";

const StatiticsUser = ({ day, month, year }) => {
  const [countNewUser, setCountNewUser] = useState();

  useEffect(() => {
    getData();
  }, [day, month, year]);

  const getData = async () => {
    const userNewUserData = await getNewUserStatisticsAPI(day, month, year);
    if (userNewUserData?.code === 0) {
      setCountNewUser(userNewUserData?.count);
    }
  };

  return (
    <div className="pt-4">
      <div className="flex">
        <div className="px-4 w-1/2">
          <StatiticsCard count={countNewUser} title={"Người dùng mới"} />
        </div>
      </div>
    </div>
  );
};

export default StatiticsUser;
