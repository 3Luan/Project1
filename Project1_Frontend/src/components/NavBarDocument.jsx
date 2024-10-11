import { useDispatch, useSelector } from "react-redux";
import { handleGetUnapprovedPosts } from "../redux/post/postAction";
import { Link, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import "moment/locale/vi";
import { useEffect, useState, useRef } from "react";
import CreatePostModal from "./modals/CreatePostModal";
import CreateDocumentModal from "./modals/CreateDocumentModal";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";

const NavBarDocument = ({ addDocument, nameNavBar }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const auth = useSelector((state) => state.auth);
  const [openModalCreateDocument, setOpenModalCreateDocument] = useState(false);
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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const onclickCreateDocument = () => {
    setMenuOpen(false);
    setOpenModalCreateDocument(true);
  };

  const handleSearch = (event) => {
    if (event?.key === "Enter" || !event?.key) {
      if (keywordSearch) {
        if (
          location.pathname === "/tai-lieu" ||
          location.pathname === "/tai-lieu/search"
        ) {
          navigate(`/tai-lieu/search?query=${keywordSearch}`);
        } else if (
          location.pathname === "/tai-lieu/chua-duyet" ||
          location.pathname === "/tai-lieu/chua-duyet/search"
        ) {
          navigate(`/tai-lieu/chua-duyet/search?query=${keywordSearch}`);
        } else if (
          location.pathname === "/tai-lieu/lich-su" ||
          location.pathname === "/tai-lieu/lich-su/search"
        ) {
          navigate(`/tai-lieu/lich-su/search?query=${keywordSearch}`);
        }
      }
    }
  };

  return (
    <div className="bg-white m-3 rounded-xl  flex flex-col items-center">
      <div className="flex justify-between w-full pb-4 border-b">
        <div ref={menuRef} className=" mt-2 bg-white z-10 rounded-md flex">
          <Link
            to="/tai-lieu"
            onClick={() => setMenuOpen(false)}
            className="block px-4 py-2 text-gray-800 leading-8 text-sm font-medium"
          >
            Các tài liệu
          </Link>
          {auth.auth && (
            <>
              <Link
                to="/tai-lieu/lich-su"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 text-gray-800 leading-8 text-sm font-medium"
              >
                Lịch sử
              </Link>
              <Link
                to="/tai-lieu/chua-duyet"
                className="block px-4 py-2 text-gray-800 leading-8 text-sm font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Tài liệu chờ duyệt
              </Link>

              <button
                onClick={() => onclickCreateDocument()}
                className="block px-2 py-2 text-gray-800 text-sm font-medium"
                title="Thêm tài liệu"
              >
                <i class="fa-sharp fa-solid fa-circle-plus text-xl"></i>
              </button>
            </>
          )}
        </div>

        {openModalCreateDocument && (
          <CreateDocumentModal
            openModal={openModalCreateDocument}
            setOpenModal={setOpenModalCreateDocument}
            addDocument={addDocument}
          />
        )}
        <div className="flex items-center">
          <TextInput
            styles="mb-1 rounded-md border border-gray-200 text-gray-600 transition duration-300 ease-in"
            placeholder="Tìm kiếm tài liệu..."
            value={keywordSearch}
            onKeyDown={handleSearch}
            onChange={(e) => setKeywordSearch(e.target.value)}
          />
          <CustomButton
            title={<i className="fa-solid fa-magnifying-glass"></i>}
            containerStyles={`bg-[#0444a4] text-white text-xl mt-1 py-3 px-4 rounded-md font-semibold text-sm`}
            onClick={() => handleSearch()}
          />
        </div>
      </div>
      <div className="text-2xl md:text-1xl font-bold text-center my-4 ml-2">
        {nameNavBar}
      </div>
    </div>
  );
};
export default NavBarDocument;
