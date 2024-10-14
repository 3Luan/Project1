import { useEffect, useState } from "react";
import Loading from "../Loading";
import NavBarDocument from "../NavBarDocument";
import DocumentCard from "../DocumentCard";
import { searchDocumentAPI } from "../../services/documentService";
import CustomPagination from "../CustomCustomPagination";
import { useLocation, useParams } from "react-router-dom";

const SearchDocument = () => {
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
            const data = await searchDocumentAPI(1, query);
            if (data?.code === 0) {
                setDocuments(data?.documents);
                setCount(data?.count);
            } else if (data?.code === 1) {
                setDocuments([]);
            }
            setIsLoading(false);
        }
    };

    const handlePageClick = async (selectedPage) => {
        setCurrentPage(selectedPage.selected);
        if (query) {
            setIsLoading(true);

            const data = await searchDocumentAPI(
                selectedPage.selected + 1,
                query
            );

            if (data?.code === 0) {
                setDocuments(data?.documents);
            } else if (data?.code === 1) {
                setDocuments([]);
            }
            setIsLoading(false);
        }
    };

    return (
        <>
            <NavBarDocument nameNavBar={`Tài liệu`} query={query} />

            {isLoading ? (
                <Loading />
            ) : (
                <>
                    {documents?.map((document) => (
                        <DocumentCard
                            key={document.id}
                            link={`/tai-lieu`}
                            doc={document}
                        />
                    ))}
                </>
            )}
            {count > 0 ?? (
                <div className="flex justify-center mb-10">
                    <CustomPagination
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageCount={Math.ceil(count / 10)}
                        previousLabel="<"
                        currentPage={currentPage}
                    />
                </div>
            )}
        </>
    );
};

export default SearchDocument;
