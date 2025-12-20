import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxios";
import TuitionCard from "../Component/TuitionCard";
import Loading from "../Component/Loading";
import { useState } from "react";

const Tuitions = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6;
  const [searchSubject, setSearchSubject] = useState("");
  const [searchSort, setSearchSort] = useState("date");

  const { register, handleSubmit } = useForm({
    defaultValues: {
      subject: "",
      sort: "date",
    },
  });

  const onSearch = (data) => {
    setSearchSubject(data.subject || "");
    setSearchSort(data.sort || "date");
    setCurrentPage(1);
  };

  const {
    data: response = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tuitions", currentPage, searchSubject, searchSort],
    queryFn: async () => {
      const res = await axiosSecure.get("/tuitions-pagination", {
        params: {
          page: currentPage,
          limit,
          status: "Approved",
          subject: searchSubject || undefined,
          sort: searchSort,
        },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const tuitions = response.tuitions || [];
  const totalPages = response.totalPages || 1;
  const totalTuitions = response.totalTuitions || 0;

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        Error loading tuitions
      </div>
    );
  }

  const generatePageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) pages.push(1, 2, 3, 4, 5, "...", totalPages);
      else if (currentPage >= totalPages - 3)
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      else
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
    }
    return pages;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <form
        onSubmit={handleSubmit(onSearch)}
        className="bg-white p-6 rounded-xl shadow-md mb-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Subject Input */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Search by Subject
            </label>
            <input
              {...register("subject")}
              type="text"
              placeholder="e.g. Math, Physics, English..."
              className="w-full px-6 py-3 text-lg border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary"
              autoComplete="off"
            />
          </div>

          {/* Sort Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-2">Sort by</label>
            <select
              {...register("sort")}
              className="w-full px-6 py-3 text-lg border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="date">Newest First</option>
              <option value="budget-high">Budget: High to Low</option>
              <option value="budget-low">Budget: Low to High</option>
            </select>
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-primary hover:bg-blue-600 text-black font-bold py-3 px-8 rounded-xl transition shadow-md"
            >
              Search
            </button>
          </div>
        </div>
      </form>

      <h1 className="text-4xl font-bold text-center mb-4">Available Tuition</h1>
      <p className="text-center text-gray-600 mb-10">
        {totalTuitions} tuition{totalTuitions !== 1 ? "s" : ""} available
      </p>

      {tuitions.length === 0 ? (
        <p className="text-center text-xl text-gray-600">
          {searchSubject
            ? `No tuition found for "${searchSubject}"`
            : "No tuition available yet."}
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {tuitions.map((tuition) => (
              <TuitionCard key={tuition._id} tuition={tuition} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-3 mt-10 flex-wrap">
              <button
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="px-5 py-2 rounded-lg bg-gray-200 disabled:opacity-50"
              >
                Previous
              </button>

              {generatePageNumbers().map((page, i) =>
                page === "..." ? (
                  <span key={i} className="px-3 py-2">
                    ...
                  </span>
                ) : (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === page
                        ? "bg-primary font-bold"
                        : "bg-gray-200"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() =>
                  setCurrentPage(Math.min(currentPage + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-5 py-2 rounded-lg bg-gray-200 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Tuitions;
