import { useEffect, useState } from "react";
import Loading from "../Loading";
import NavBarDocument from "../NavBarDocument";
import DocumentCard from "../DocumentCard";
import { getHistoryDocumentsAPI } from "../../services/documentService";
import CustomPagination from "../CustomCustomPagination";

const HistoryDocument = () => {
  const [documents, setDocuments] = useState([]);
  const [count, setCount] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const addDocument = (data) => {
    setDocuments((documents) => [data, ...documents]);
  };

  const deleteDocument = (documentId) => {
    setDocuments((documents) =>
      documents.filter((document) => document._id !== documentId)
    );
  };

  const getDocuments = async () => {
    setIsLoading(true);

    const data = await getHistoryDocumentsAPI(1);
    if (data?.code === 0) {
      setDocuments(data?.documents);
      setCount(data?.count);
    } else if (data?.code === 1) {
      setDocuments([]);
      setCount(0);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getDocuments();
  }, []);

  const handlePageClick = async (selectedPage) => {
    setCurrentPage(selectedPage.selected);
    setIsLoading(true);

    const data = await getHistoryDocumentsAPI(selectedPage.selected + 1);
    if (data?.code === 0) {
      setDocuments(data?.documents);
    } else if (data?.code === 1) {
      setDocuments([]);
      setCount(0);
    }
    setIsLoading(false);
  };

  return (
    <>
      <NavBarDocument
        addDocument={addDocument}
        nameNavBar={`Tài liệu đã đăng`}
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
                    link={`/tai-lieu`}
                    doc={document}
                    deleteDocument={deleteDocument}
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
  );
};

export default HistoryDocument;
