import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HeaderAdmin from "./HeaderAdmin";
import SidebarAdmin from "./SidebarAdmin";
import StatiticsCard from "./StatiticsCard";
import {
  getPostsStatisticsAPI,
  getUnapprovedPostsStatisticsAPI,
  getapprovedPostsStatisticsAPI,
} from "../../services/postService";
import {
  getDocumentStatisticsAPI,
  getUnapprovedDocumentStatisticsAPI,
  getapprovedDocumentStatisticsAPI,
} from "../../services/documentService";

const StatiticsDocument = ({ day, month, year }) => {
  const [countDocument, setCountDocument] = useState();
  const [countApprovedDocument, setCountApprovedDocument] = useState();
  const [countUnapprovedDocument, setCountUnapprovedDocument] = useState();

  useEffect(() => {
    getData();
  }, [day, month, year]);

  const getData = async () => {
    const postData = await getDocumentStatisticsAPI(day, month, year);
    if (postData?.code === 0) {
      setCountDocument(postData?.count);
    }

    const approvedData = await getapprovedDocumentStatisticsAPI(
      day,
      month,
      year
    );
    if (approvedData?.code === 0) {
      setCountApprovedDocument(approvedData?.count);
    }

    const unapprovedData = await getUnapprovedDocumentStatisticsAPI(
      day,
      month,
      year
    );
    if (unapprovedData?.code === 0) {
      setCountUnapprovedDocument(unapprovedData?.count);
    }
  };

  return (
    <div className="pt-4">
      <div className="flex">
        <div className="px-4 w-1/2">
          <StatiticsCard count={countDocument} title={"Tất cả tài liệu"} />
        </div>
        <div className="px-4 w-1/2">
          <StatiticsCard
            count={countApprovedDocument}
            title={"Tài liệu đã duyệt"}
          />
        </div>
      </div>
      <div className="flex">
        <div className="px-4 py-4 w-1/2">
          <StatiticsCard
            count={countUnapprovedDocument}
            title={"Tài liệu chưa duyệt"}
          />
        </div>
        <div className="px-4 py-4 w-1/2"></div>
      </div>
    </div>
  );
};

export default StatiticsDocument;
