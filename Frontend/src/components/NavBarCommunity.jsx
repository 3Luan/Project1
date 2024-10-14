import { useDispatch, useSelector } from "react-redux";
import { handleGetUnapprovedPosts } from "../redux/post/postAction";
import { Link, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import "moment/locale/vi";
import { useEffect, useState, useRef } from "react";
import CreatePostModal from "./modals/CreatePostModal";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";
import { searchPostAPI } from "../services/postService";
import toast from "react-hot-toast";

const NavBarComunity = ({
  addPost,
  setPosts,
  setCount,
  currentPage,
  nameNavBar,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const auth = useSelector((state) => state.auth);
  const [openModalCreatePost, setOpenModalCreatePost] = useState(false);
  const location = useLocation();
  const [keywordSearch, setKeywordSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const newQuery = new URLSearchParams(location.search).get("query");
    setKeywordSearch(newQuery);
  }, [location.search]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = async (event) => {
    if (event?.key === "Enter" || !event?.key) {
      if (keywordSearch) {
        if (
          location.pathname === "/community" ||
          location.pathname === "/community/search"
        ) {
          navigate(`/community/search?query=${keywordSearch}`);
        } else if (
          location.pathname === "/community/unapproved" ||
          location.pathname === "/community/unapproved/search"
        ) {
          navigate(`/community/unapproved/search?query=${keywordSearch}`);
        } else if (
          location.pathname === "/community/history" ||
          location.pathname === "/community/history/search"
        ) {
          navigate(`/community/history/search?query=${keywordSearch}`);
        }
      }
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const onclickCreatePost = () => {
    setMenuOpen(false);
    setOpenModalCreatePost(true);
  };

  return (
    <div className="bg-white m-3 rounded-xl  flex flex-col items-center">
      <div className="flex justify-between w-full pb-4 border-b">
        <div ref={menuRef} className=" mt-2 bg-white z-10 rounded-md flex">
          <Link
            to="/community"
            onClick={() => setMenuOpen(false)}
            className="block px-4 py-2 text-gray-800 leading-8 text-sm font-medium"
          >
            Các bài viết
          </Link>
          {auth.auth && (
            <>
              <Link
                to="/community/history"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 text-gray-800 leading-8 text-sm font-medium"
              >
                Lịch sử bài đăng
              </Link>
              <Link
                to="/community/unapproved"
                className="block px-4 py-2 text-gray-800 leading-8 text-sm font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Bài viết chờ duyệt
              </Link>

              <button
                onClick={() => onclickCreatePost()}
                className="block px-2 py-2 text-gray-800 text-sm font-medium"
                title="Tạo bài viết mới"
              >
                <i class="fa-sharp fa-solid fa-circle-plus text-xl"></i>
              </button>
            </>
          )}
        </div>

        {openModalCreatePost && (
          <CreatePostModal
            openModal={openModalCreatePost}
            setOpenModal={setOpenModalCreatePost}
            addPost={addPost}
          />
        )}
        <div className="flex items-center">
          <TextInput
            styles="mb-1 rounded-md border border-gray-200 bg-white text-gray-600 transition duration-300 ease-in"
            placeholder="Tìm kiếm bài viết..."
            value={keywordSearch}
            onKeyDown={handleSearch}
            onChange={(e) => setKeywordSearch(e.target.value)}
          />
          <CustomButton
            title={<i className="fa-solid fa-magnifying-glass"></i>}
            containerStyles={`bg-[#0444a4] text-white text-xl mt-1 py-3 px-4 rounded-md font-semibold text-sm`}
            onClick={() => {
              handleSearch();
            }}
          />
        </div>
      </div>
      <div className="text-2xl md:text-1xl font-bold text-center my-4 ml-2">
        {nameNavBar ? (
          <>{nameNavBar}</>
        ) : (
          <>
            {location.pathname === "/community" ? (
              <>Trao đổi</>
            ) : location.pathname === "/community/history" ? (
              <>Lịch sử bài đăng</>
            ) : (
              <>Bài viết chờ duyệt</>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default NavBarComunity;
