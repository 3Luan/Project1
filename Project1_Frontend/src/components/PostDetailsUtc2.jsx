import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Loading from "./Loading";
import { handleGetPostById } from "../redux/postDetailsUtc2/postDetailsUtc2Action";
import Header from "./Header";
import FiltersCard from "./FiltersCard";
import Sidebar from "./Sidebar";
import moment from "moment";
import "moment/locale/vi";

const PostDetailsUtc2 = () => {
  moment.locale("vi");
  const dispatch = useDispatch();
  const postDetailsUtc2 = useSelector((state) => state.postDetailsUtc2);
  const { postUtc2Id } = useParams();

  useEffect(() => {
    dispatch(handleGetPostById(postUtc2Id));
  }, []);

  return (
    <div className="w-full px-0 pb-20 bg-gray-100 lg:rounded-lg h-screen overflow-hidden">
      <Header />
      <div className="w-screen mt-24 flex justify-center gap-2 lg:gap-4 pt-3 h-full">
        <div className="hidden w-1/6 h-full md:flex flex-col gap-6 overflow-y-auto bg-white">
          <Sidebar />
          <FiltersCard />
        </div>

        {/* CENTER */}
        <div className="w-1/2 h-full flex flex-col gap-6 overflow-y-auto rounded-lg">
          <div className="bg-white p-16 rounded-xl mb-20">
            {postDetailsUtc2.isLoading ? (
              <Loading />
            ) : (
              <>
                <div className="text-3xl font-medium mb-5">
                  {postDetailsUtc2.title}
                </div>
                <div className="flex text-md mb-14">
                  <span className="mr-10">
                    Danh mục:{" "}
                    {postDetailsUtc2.post_connects[0]?.sub_category.name}
                  </span>

                  <span>
                    Ngày:{" "}
                    {moment(postDetailsUtc2.created_at).format("DD/MM/YYYY")}
                  </span>
                </div>
                <div
                  className="text-lg leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: postDetailsUtc2.content,
                  }}
                />

                {postDetailsUtc2.post_attachments.length > 0 ? (
                  <>
                    <div className="flex text-md mt-14">
                      <span className="mr-10">
                        Chi tiết vui lòng xem file đính kèm:
                      </span>
                    </div>
                    {postDetailsUtc2.post_attachments.map((item) => (
                      <div className="file-item border border-gray rounded-full p-2">
                        <a
                          href={`https://utc2.edu.vn${item.path}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.name}
                        </a>
                      </div>
                    ))}
                  </>
                ) : (
                  ""
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailsUtc2;
