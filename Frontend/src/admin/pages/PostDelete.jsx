import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import PostCard from "../../components/PostCard";
import CustomPagination from "../../components/CustomCustomPagination";
import { useLocation } from "react-router-dom";
import HeaderAdmin from "../components/HeaderAdmin";
import SidebarAdmin from "../components/SidebarAdmin";
import { getDeletePostsAPI } from "../../services/postService";
import PostCardAdmin from "../components/PostCardAdmin";

const PostDelete = ({}) => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [countPosts, setCountPosts] = useState(0);
  const [currentPage, setCurrentPage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  useEffect(() => {
    getDeletePosts();
  }, []);

  const getDeletePosts = async (currentPage) => {
    setIsLoading(true);
    const data = await getDeletePostsAPI(currentPage);
    setPosts(data.posts);
    setCountPosts(data.count);
    setIsLoading(false);
  };

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
    getDeletePosts(selectedPage.selected + 1);
  };

  return (
    <div className="w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-gray-100 lg:rounded-lg h-screen overflow-hidden">
      <HeaderAdmin />

      <div className="w-full flex gap-2 lg:gap-4  h-full">
        <div className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto">
          <SidebarAdmin />
        </div>

        {/* CENTER */}
        <div className="flex-1 h-full flex flex-col  overflow-y-auto pt-4">
          {isLoading ? (
            <Loading />
          ) : posts?.length > 0 ? (
            <>
              {posts?.map((item) => (
                <>
                  <PostCardAdmin
                    key={item.id}
                    post={item}
                    link={"/admin/bai-viet-da-xoa"}
                  />
                </>
              ))}
              <div className="flex justify-center mb-10">
                <CustomPagination
                  nextLabel=">"
                  onPageChange={handlePageClick}
                  pageCount={Math.ceil(countPosts / 10)}
                  previousLabel="<"
                  currentPage={currentPage}
                />
              </div>
            </>
          ) : (
            <div className="flex w-full h-full items-center justify-center">
              <p className="text-lg text-ascent-2">
                Không tìm thấy bài viết nào
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDelete;
