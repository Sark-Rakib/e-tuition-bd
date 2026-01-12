// src/pages/Tuitions.jsx
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxios";
import TuitionCard from "../Component/TuitionCard";
import SkeletonLoader from "../Component/SkeletonLoader";

const ITEMS_PER_PAGE = 6;

const Tuitions = () => {
  const axiosSecure = useAxiosSecure();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchSubject, setSearchSubject] = useState("");
  const [sortBy, setSortBy] = useState("date"); // date, budget-high, budget-low

  const {
    data: response = {},
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["tuitions", currentPage, searchSubject, sortBy],
    queryFn: async () => {
      const res = await axiosSecure.get("/tuitions-pagination", {
        params: {
          page: currentPage,
          limit: ITEMS_PER_PAGE,
          status: "Approved",
          subject: searchSubject || undefined,
          sort: sortBy,
        },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const tuitions = response.tuitions || [];
  const totalTuitions = response.totalTuitions || 0;
  const totalPages = response.totalPages || 1;

  const loading = isLoading || isFetching;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="w-11/12 mx-auto px-4 py-10 min-h-screen">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
        Available <span className="text-primary">Tuitions</span>
      </h1>

      {/* Search & Sort Controls – same style as Tutors page */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10 max-w-4xl mx-auto">
        <input
          type="text"
          placeholder="Search by subject (Math, English, Physics...)"
          className="input input-bordered flex-1"
          value={searchSubject}
          onChange={(e) => {
            setSearchSubject(e.target.value);
            setCurrentPage(1);
          }}
        />

        <select
          className="select select-bordered w-full sm:w-48"
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="date">Newest First</option>
          <option value="budget-high">Budget: High to Low</option>
          <option value="budget-low">Budget: Low to High</option>
        </select>
      </div>

      {/* Results */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <SkeletonLoader key={i} />
            ))}
        </div>
      ) : tuitions.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-2xl font-semibold text-gray-600">
            No tuitions found matching your search
          </h3>
          <p className="mt-3 text-gray-500">
            Try different subject keywords or clear the search
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            {tuitions.map((tuition) => (
              <TuitionCard key={tuition._id} tuition={tuition} />
            ))}
          </div>

          {/* Pagination – same style as Tutors page */}
          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center items-center gap-2 mt-12">
              <button
                className="btn btn-sm btn-outline"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                « Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .slice(
                  Math.max(0, currentPage - 3),
                  Math.min(totalPages, currentPage + 2)
                )
                .map((page) => (
                  <button
                    key={page}
                    className={`btn btn-sm ${
                      currentPage === page ? "btn-primary" : "btn-outline"
                    }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}

              <button
                className="btn btn-sm btn-outline"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next »
              </button>
            </div>
          )}

          {/* Showing info */}
          <div className="text-center mt-6 text-gray-600">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
            {Math.min(currentPage * ITEMS_PER_PAGE, totalTuitions)} of{" "}
            {totalTuitions} tuitions
          </div>
        </>
      )}
    </div>
  );
};

export default Tuitions;
