import { useEffect, useState } from "react";
import Loading from "../Loading";
import NavBarDocument from "../NavBarDocument";
import DocumentCard from "../DocumentCard";
import { searchUnApprovedDocumentAPI } from "../../services/documentService";
import CustomPagination from "../CustomCustomPagination";
import { useLocation, useParams } from "react-router-dom";

const SearchUnApprovedDocument = () => {
  const [documents, setDocuments] = useState([]);
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
    getDocuments(query);
  }, [query]);

  const getDocuments = async (query) => {
    if (query) {
      setIsLoading(true);

      const data = await searchUnApprovedDocumentAPI(1, query);
      if (data?.code === 0) {
        setDocuments(data?.documents);
        setCount(data?.count);
      } else if (data?.code === 1) {
        setDocuments([]);
        setCount(0);
      }
      setIsLoading(false);
    }
  };

  const handlePageClick = async (selectedPage) => {
    setCurrentPage(selectedPage.selected);
    if (query) {
      setIsLoading(true);

      const data = await searchUnApprovedDocumentAPI(
        selectedPage.selected + 1,
        query
      );
      if (data?.code === 0) {
        setDocuments(data?.documents);
      } else if (data?.code === 1) {
        setDocuments([]);
        setCount(0);
      }
    }
    setIsLoading(false);
  };

  return (
    <>
      <NavBarDocument nameNavBar={`Tài liệu chờ duyệt`} query={query} />

      {isLoading ? (
        <Loading />
      ) : (
        <>
          {documents?.length < 0 ? (
            <>Chưa có tài liệu nào</>
          ) : (
            <>
              {" "}
              {documents?.map((document) => (
                <DocumentCard
                  key={document.id}
                  link={`/tai-lieu/chua-duyet`}
                  doc={document}
                />
              ))}
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

export default SearchUnApprovedDocument;
