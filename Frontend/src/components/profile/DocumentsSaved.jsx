import React, { useEffect, useState } from "react";
import { getSaveDocumentsdAPI } from "../../services/userService";
import PostCard from "../PostCard";
import Loading from "../Loading";
import CustomPagination from "../CustomCustomPagination";
import Header from "../Header";
import FiltersCard from "../FiltersCard";
import Sidebar from "../Sidebar";
import CustomButton from "../CustomButton";
import TextInput from "../TextInput";
import { useLocation, useNavigate } from "react-router-dom";
import SearchDocumentSaved from "./SearchDocumentSaved";

const DocumentsSaved = () => {
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const [keywordSearch, setKeywordSearch] = useState("");

  const getData = async (selectedPage) => {
    setIsLoading(true);
    const data = await getSaveDocumentsdAPI(selectedPage);

    if (data?.code === 0) {
      setPosts(data?.posts);
      setCount(data?.count);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
    getData(selectedPage.selected + 1);
  };

  const handleSearch = async (event) => {
    if (event?.key === "Enter" || !event?.key) {
      if (keywordSearch) {
        navigate(`/tai-lieu-da-luu/search?query=${keywordSearch}`);
      }
    }
  };

  return (
    <>
      <div className="w-full px-0 pb-20 bg-gray-100 lg:rounded-lg h-screen overflow-hidden">
        <Header />
        <div className="w-screen mt-24 flex justify-center gap-2 lg:gap-4 pt-3 h-full">
          <div className="hidden w-1/6 h-full md:flex flex-col gap-6 overflow-y-auto bg-white">
            <Sidebar />
            <FiltersCard />
          </div>

          {/* CENTER */}
          <div className="w-1/2 h-full flex flex-col  overflow-y-auto rounded-lg bg-white">
            <div className="flex justify-between mt-3 mx-3 pb-4 border-b">
              <div className=" mt-2 bg-white z-10 rounded-md flex">
                <div className="block px-4 py-2 text-gray-800 leading-8 text-2xl font-bold">
                  Tài liệu đã lưu
                </div>
              </div>
              <div className="flex items-center">
                <TextInput
                  styles="mb-1 rounded-md border border-gray-200  text-gray-600 focus:shadow-md transition duration-300 ease-in"
                  placeholder="Tìm kiếm..."
                  onChange={(e) => setKeywordSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch(currentPage);
                    }
                  }}
                />
                <CustomButton
                  title={<i className="fa-solid fa-magnifying-glass"></i>}
                  containerStyles={`bg-[#0444a4] text-white text-xl mt-1 py-3 px-4 rounded-md font-semibold text-sm`}
                  onClick={() => {
                    handleSearch(currentPage);
                  }}
                />
              </div>
            </div>
            {location.pathname === "/tai-lieu-da-luu/search" ? (
              <>
                <SearchDocumentSaved />
              </>
            ) : (
              <>
                {isLoading ? (
                  <Loading />
                ) : posts.length > 0 ? (
                  <>
                    {posts.map((item) => (
                      <PostCard key={item.id} post={item} link={"/tai-lieu"} />
                    ))}
                    <div className="flex justify-center mb-10">
                      <CustomPagination
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageCount={Math.ceil(count / 10)}
                        previousLabel="<"
                        currentPage={currentPage}
                      />
                    </div>
                  </>
                ) : (
                  <div className="flex w-full h-full items-center justify-center bg-white">
                    <p className="text-lg text-ascent-2">
                      Bạn chưa lưu tài liệu nào.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DocumentsSaved;
