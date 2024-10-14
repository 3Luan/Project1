import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import LoginAdmin from "../admin/pages/LoginAdmin";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import PostDetailsUtc2 from "../components/PostDetailsUtc2";
import PostDetails from "../components/PostDetails";
import Message from "../pages/Message";
import Community from "../pages/Community";
import NewsUTC2 from "../pages/NewsUTC2";
import Follow from "../pages/Follow";
import PrivateRoutes from "./privateRoutes";
import PostUnApprovedDetails from "../components/PostUnApprovedDetails";
import HomeAdmin from "../admin/pages/HomeAdmin";
import { useSelector } from "react-redux";
import PrivateAdminRoutes from "./privateAdminRoutes";
import PostDelete from "../admin/pages/PostDelete";
import EditPostModal from "../components/modals/EditPostModal";
import Document from "../pages/Document";
import DocumentDetails from "../components/DocumentDetails";
import UnapprovedDocument from "../components/document/UnapprovedDocument";
import DocumentUnApprovedDetails from "../components/document/DocumentUnApprovedDetails";
import SearchDocument from "../components/document/SearchDocument";
import PostsSaved from "../components/profile/PostsSaved";
import DocumentsSaved from "../components/profile/DocumentsSaved";
import ForgotPassword from "../pages/ForgotPassword";
import Administrators from "../admin/pages/Administrators";
import DocumentDelete from "../admin/pages/DocumentDelete";
import CommentDelete from "../admin/pages/CommentDelete";
import StatiticsPost from "../admin/components/StatiticsPost";
import PostDeleteDetails from "../admin/components/PostDeleteDetails";
import DocumentDeleteDetails from "../admin/components/DocumentDeleteDetails";
import Statistics from "../admin/pages/Statistics";

const AppRoutes = () => {
  const authAdmin = useSelector((state) => state.authAdmin);
  return (
    <>
      <Routes>
        {/* Routes cho phần user */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/message"
          element={
            <PrivateRoutes>
              <Message />
            </PrivateRoutes>
          }
        />
        <Route path="/student/post/:postUtc2Id" element={<PostDetailsUtc2 />} />
        <Route path="/tin-tuc-su-kien" element={<NewsUTC2 />} />
        <Route
          path="/tin-tuc-su-kien/:postUtc2Id"
          element={<PostDetailsUtc2 />}
        />
        <Route path="/community" element={<Community />} />
        <Route path="/community/history" element={<Community />} />
        <Route path="/community/post/:postId" element={<PostDetails />} />

        <Route path="/tai-lieu" element={<Document />} />
        <Route path="/tai-lieu/:documentId" element={<DocumentDetails />} />

        {/* <Route
          path="/tai-lieu-chua-duyet/:postId"
          element={
            <PrivateRoutes>
              <PostUnApprovedDetails />
            </PrivateRoutes>
          }
        /> */}
        <Route path="/tai-lieu/search" element={<Document />} />
        <Route
          path="/tai-lieu/chua-duyet/search"
          element={
            <PrivateRoutes>
              <Document />
            </PrivateRoutes>
          }
        />
        <Route
          path="/tai-lieu/lich-su/search"
          element={
            <PrivateRoutes>
              <Document />
            </PrivateRoutes>
          }
        />

        <Route path="/community/search" element={<Community />} />
        <Route
          path="/community/unapproved/search"
          element={
            <PrivateRoutes>
              <Community />
            </PrivateRoutes>
          }
        />
        <Route
          path="/community/history/search"
          element={
            <PrivateRoutes>
              <Community />
            </PrivateRoutes>
          }
        />

        <Route
          path="/tai-lieu/chua-duyet"
          element={
            <PrivateRoutes>
              <Document />
            </PrivateRoutes>
          }
        />

        <Route
          path="/bai-viet-chua-duyet/:postId"
          element={
            <PrivateRoutes>
              <PostUnApprovedDetails />
            </PrivateRoutes>
          }
        />

        <Route
          path="/tai-lieu-chua-duyet/:documentId"
          element={
            <PrivateRoutes>
              <DocumentUnApprovedDetails />
            </PrivateRoutes>
          }
        />

        <Route
          path="/community/unapproved"
          element={
            <PrivateRoutes>
              <Community />
            </PrivateRoutes>
          }
        />

        <Route
          path="/community/history"
          element={
            <PrivateRoutes>
              <Community />
            </PrivateRoutes>
          }
        />

        <Route
          path="/tai-lieu/lich-su"
          element={
            <PrivateRoutes>
              <Document />
            </PrivateRoutes>
          }
        />

        <Route
          path="/follow"
          element={
            <PrivateRoutes>
              <Follow />
            </PrivateRoutes>
          }
        />

        <Route
          path="/profile/:userId"
          element={
            <PrivateRoutes>
              <Profile />
            </PrivateRoutes>
          }
        />

        <Route
          path="/bai-viet-da-luu"
          element={
            <PrivateRoutes>
              <PostsSaved />
            </PrivateRoutes>
          }
        />

        <Route
          path="/tai-lieu-da-luu"
          element={
            <PrivateRoutes>
              <DocumentsSaved />
            </PrivateRoutes>
          }
        />

        <Route
          path="/message/:chatId"
          element={
            <PrivateRoutes>
              <Message />
            </PrivateRoutes>
          }
        />

        <Route
          path="/follow/co-the-quen/search"
          element={
            <PrivateRoutes>
              <Follow />
            </PrivateRoutes>
          }
        />

        <Route
          path="/follow/dang-theo-doi/search"
          element={
            <PrivateRoutes>
              <Follow />
            </PrivateRoutes>
          }
        />

        <Route
          path="/follow/nguoi-theo-doi/search"
          element={
            <PrivateRoutes>
              <Follow />
            </PrivateRoutes>
          }
        />

        <Route
          path="/bai-viet-da-luu/search"
          element={
            <PrivateRoutes>
              <PostsSaved />
            </PrivateRoutes>
          }
        />

        <Route
          path="/tai-lieu-da-luu/search"
          element={
            <PrivateRoutes>
              <DocumentsSaved />
            </PrivateRoutes>
          }
        />

        <Route path="/thong-bao/search" element={<Home />} />

        <Route path="/tin-tuc-su-kien/search" element={<NewsUTC2 />} />

        {/* ////////////////Routes cho phần admin ////////////////////*/}

        <Route path="/admin/login" element={<LoginAdmin />} />

        <Route
          path="/admin"
          element={
            <PrivateAdminRoutes>
              <Statistics />
            </PrivateAdminRoutes>
          }
        />

        <Route
          path="/admin/bai-viet-da-xoa"
          element={
            <PrivateAdminRoutes>
              <PostDelete />
            </PrivateAdminRoutes>
          }
        />

        <Route
          path="/admin/tai-lieu-da-xoa"
          element={
            <PrivateAdminRoutes>
              <DocumentDelete />
            </PrivateAdminRoutes>
          }
        />

        <Route
          path="/admin/binh-luan-da-xoa"
          element={
            <PrivateAdminRoutes>
              <CommentDelete />
            </PrivateAdminRoutes>
          }
        />

        <Route
          path="/admin/user"
          element={
            <PrivateAdminRoutes>
              <Administrators />
            </PrivateAdminRoutes>
          }
        />

        <Route
          path="/admin/thong-ke-bai-viet"
          element={
            <PrivateAdminRoutes>
              <HomeAdmin />
            </PrivateAdminRoutes>
          }
        />

        <Route
          path="/admin/thong-ke-tai-lieu"
          element={
            <PrivateAdminRoutes>
              <HomeAdmin />
            </PrivateAdminRoutes>
          }
        />

        <Route
          path="/admin/bai-viet-da-xoa/:postId"
          element={
            <PrivateAdminRoutes>
              <PostDeleteDetails />
            </PrivateAdminRoutes>
          }
        />

        <Route
          path="/admin/tai-lieu-da-xoa/:documentId"
          element={
            <PrivateAdminRoutes>
              <DocumentDeleteDetails />
            </PrivateAdminRoutes>
          }
        />

        {/* Nếu route không tồn tại sẽ quay về Home */}
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
