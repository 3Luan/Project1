import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Loading from "../Loading";
import PostCard from "../PostCard";
import CustomPagination from "../CustomCustomPagination";
import { searchUnapprovedPostAPI } from "../../services/postService";
import NavBarComunity from "../NavBarCommunity";

const SearchUnApprovedPost = () => {
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState();
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const newQuery = new URLSearchParams(location.search).get("query");
    setQuery(newQuery);
  }, [location.search]);

  useEffect(() => {
    getPosts(query);
  }, [query]);

  const getPosts = async (query) => {
    if (query) {
      setIsLoading(true);
      const data = await searchUnapprovedPostAPI(1, query);

      if (data?.code === 0) {
        setPosts(data?.posts);
        setCount(data?.count);
      } else if (data?.code === 1) {
        setPosts([]);
        setCount(0);
      }
      setIsLoading(false);
    }
  };

  const handlePageClick = async (selectedPage) => {
    setCurrentPage(selectedPage.selected);
    if (query) {
      setIsLoading(true);

      const data = await searchUnapprovedPostAPI(
        selectedPage.selected + 1,
        query
      );
      if (data?.code === 0) {
        setPosts(data?.posts);
      } else if (data?.code === 1) {
        setCount(0);
        setPosts([]);
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <NavBarComunity nameNavBar={`Bài viết chờ duyệt`} query={query} />

      {isLoading ? (
        <Loading />
      ) : (
        <>
          {posts.length === 0 ? (
            <div className="text-center py-4">Không có bài viết nào</div>
          ) : (
            <>
              {posts?.map((post) => (
                <PostCard
                  key={post.id}
                  link={`/bai-viet-chua-duyet`}
                  post={post}
                />
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
          )}
        </>
      )}
    </>
  );
};

export default SearchUnApprovedPost;
