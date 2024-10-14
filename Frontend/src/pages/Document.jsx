import Header from "../components/Header";
import FiltersCard from "../components/FiltersCard";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import DocumentCard from "../components/DocumentCard";
import FiltersDocument from "../components/FiltersDocument";
import NavBarDocument from "../components/NavBarDocument";
import {
  getDocumentsAPI,
  getUnapprovedDocumentsAPI,
} from "../services/documentService";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useLocation } from "react-router-dom";
import UnapprovedDocument from "../components/document/UnapprovedDocument";
import CustomPagination from "../components/CustomCustomPagination";
import HistoryDocument from "../components/document/HistoryDocument";
import SearchDocument from "../components/document/SearchDocument";
import SearchHistoryDocument from "../components/document/SearchHistoryDocument";
import SearchUnApprovedDocument from "../components/document/SearchUnApprovedDocument";

const Document = () => {
  const [documents, setDocuments] = useState([]);
  const [count, setCount] = useState();
  const [currentPage, setCurrentPage] = useState();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const addDocument = (data) => {
    if (data.documents) {
      setDocuments((documents) => [data.documents, ...documents]);
    } else {
      setDocuments((documents) => [data, ...documents]);
    }
  };

  const deleteDocument = (documentId) => {
    setDocuments((documents) =>
      documents.filter((document) => document._id !== documentId)
    );
  };

  const getDocuments = async () => {
    setIsLoading(true);
    const data = await getDocumentsAPI(1);
    if (data?.code === 0) {
      setDocuments(data?.documents);
      setCount(data?.count);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getDocuments();
  }, []);

  const handlePageClick = async (selectedPage) => {
    setCurrentPage(selectedPage.selected);
    setIsLoading(true);

    const data = await getDocumentsAPI(selectedPage.selected + 1);
    if (data?.code === 0) {
      setDocuments(data?.documents);
    }
    setIsLoading(false);
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
          {location.pathname === "/tai-lieu" ? (
            <>
              <NavBarDocument
                nameNavBar={`Tài liệu`}
                addDocument={addDocument}
              />

              {isLoading ? (
                <Loading />
              ) : (
                <>
                  {documents?.length < 0 ? (
                    <>Chưa có tài liệu nào</>
                  ) : (
                    <>
                      {documents?.map((document) => {
                        return (
                          <DocumentCard
                            doc={document}
                            link={`/tai-lieu`}
                            deleteDocument={deleteDocument}
                            addDocument={addDocument}
                          />
                        );
                      })}
                    </>
                  )}
                </>
              )}

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
          ) : location.pathname === "/tai-lieu/chua-duyet" ? (
            <>
              <UnapprovedDocument
                addDocument={addDocument}
                deleteDocument={deleteDocument}
              />
            </>
          ) : location.pathname === "/tai-lieu/lich-su" ? (
            <>
              <>
                <HistoryDocument
                  addDocument={addDocument}
                  deleteDocument={deleteDocument}
                />
              </>
            </>
          ) : location.pathname === "/tai-lieu/search" ? (
            <>
              <>
                <SearchDocument />
              </>
            </>
          ) : location.pathname === "/tai-lieu/chua-duyet/search" ? (
            <>
              <>
                <SearchUnApprovedDocument />
              </>
            </>
          ) : location.pathname === "/tai-lieu/lich-su/search" ? (
            <>
              <>
                <SearchHistoryDocument />
              </>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Document;
