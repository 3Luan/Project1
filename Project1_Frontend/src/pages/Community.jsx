import Header from "../components/Header";
import FiltersCard from "../components/FiltersCard";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import CustomCreatePost from "../components/CustomCreatePost";
import {
    handleGetPosts,
    handleGetUnapprovedPosts,
    handlegetHistoryPosts,
} from "../redux/post/postAction";
import PostCard from "../components/PostCard";
import CustomPagination from "../components/CustomCustomPagination";
import NavBarComunity from "../components/NavBarCommunity";
import { useLocation } from "react-router-dom";
import SearchPost from "../components/post/SearchPost";
import SearchHistoryPost from "../components/post/SearchHistoryPost";
import SearchUnApprovedPost from "../components/post/SearchUnApprovedPost";

const Community = () => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const post = useSelector((state) => state.post);
    const [posts, setPosts] = useState([]);
    const [count, setCount] = useState();
    const [currentPage, setCurrentPage] = useState();
    const [isSearch, setIsSearch] = useState(false);
    const location = useLocation();

    const addPost = (data) => {
        setPosts((posts) => [data.post, ...posts]);
    };

    const deletePost = (postId) => {
        setPosts((posts) => posts.filter((post) => post._id !== postId));
    };

    useEffect(() => {
        if (location.pathname === "/community/unapproved") {
            dispatch(handleGetUnapprovedPosts());
        } else if (location.pathname === "/community/history") {
            dispatch(handlegetHistoryPosts());
        } else if (location.pathname === "/community") {
            dispatch(handleGetPosts());
        }
    }, [location.pathname]);

    useEffect(() => {
        if (post.posts && !post.isLoading) {
            setPosts(post?.posts);
            setCount(post?.count);
        }
    }, [post]);

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);

        if (location.pathname === "/community/unapproved") {
            dispatch(handleGetUnapprovedPosts(selectedPage.selected + 1));
        } else if (location.pathname === "/community/history") {
            dispatch(handlegetHistoryPosts(selectedPage.selected + 1));
        } else if (location.pathname === "/community") {
            dispatch(handleGetPosts(selectedPage.selected + 1));
        }
    };

    return (
        <div className="w-full px-0 pb-20 bg-gray-100 lg:rounded-lg h-screen overflow-hidden">
            <Header />
            <div className="w-screen mt-24 flex justify-center gap-2 lg:gap-4 pt-3 h-full">
                <div className="hidden w-1/6 h-full md:flex flex-col gap-6 overflow-y-auto bg-white">
                    <Sidebar />
                    <FiltersCard />
                </div>

                {/* CENTER */}
                <div className="w-1/2 h-full flex flex-col  overflow-y-auto rounded-lg bg-white">
                    {location.pathname === "/community/search" ? (
                        <SearchPost />
                    ) : location.pathname === "/community/history/search" ? (
                        <SearchHistoryPost />
                    ) : location.pathname === "/community/unapproved/search" ? (
                        <SearchUnApprovedPost />
                    ) : (
                        <>
                            <NavBarComunity
                                addPost={addPost}
                                setPosts={setPosts}
                                setCount={setCount}
                                currentPage={currentPage}
                            />

                            {post.isLoading ? (
                                <Loading />
                            ) : posts.length > 0 ? (
                                <>
                                    {posts.map((item) => (
                                        <>
                                            {location.pathname ===
                                            "/community/unapproved" ? (
                                                <>
                                                    <PostCard
                                                        key={item.id}
                                                        post={item}
                                                        deletePost={deletePost}
                                                        addPost={addPost}
                                                        link={
                                                            "/bai-viet-chua-duyet"
                                                        }
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <PostCard
                                                        key={item.id}
                                                        post={item}
                                                        deletePost={deletePost}
                                                        addPost={addPost}
                                                        link={"/community/post"}
                                                    />
                                                </>
                                            )}
                                        </>
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
                                <div className="flex w-full h-full items-center justify-center">
                                    <p className="text-lg text-ascent-2">
                                        Không tìm thấy bài viết nào
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Community;
