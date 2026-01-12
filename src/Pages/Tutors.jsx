import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxios";
import TutorCard from "../Component/TutorCard";
import SkeletonLoader from "../Component/SkeletonLoader";

const ITEMS_PER_PAGE = 6;

const Tutors = () => {
  const axiosSecure = useAxiosSecure();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  const {
    data: tutors = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["tutors"],
    queryFn: async () => (await axiosSecure.get("/tutors")).data,
  });

  // We NEVER early return — we just conditionally render content
  const loading = isLoading || isFetching;

  let visibleTutors = tutors.filter((t) => t.status === "Approved");

  if (search.trim()) {
    const term = search.toLowerCase().trim();
    visibleTutors = visibleTutors.filter((t) =>
      [t.tutorName, ...(t.subjects || []), t.location, t.qualification].some(
        (v) =>
          String(v ?? "")
            .toLowerCase()
            .includes(term)
      )
    );
  }

  visibleTutors = [...visibleTutors].sort((a, b) => {
    if (sort === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sort === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
    if (sort === "name-asc") return a.tutorName.localeCompare(b.tutorName);
    if (sort === "name-desc") return b.tutorName.localeCompare(a.tutorName);
    return 0;
  });

  const total = visibleTutors.length;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = Math.min(start + ITEMS_PER_PAGE, total);
  const current = visibleTutors.slice(start, end);

  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(1);
    }
  }, [totalPages, page]);

  return (
    <div className="w-11/12 mx-auto px-4 py-10 min-h-screen">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-10">
        Available <span className="text-primary">Tutors</span>
      </h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-10 max-w-4xl mx-auto">
        <input
          type="text"
          placeholder="Search by name, subject, location..."
          className="input input-bordered flex-1"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <select
          className="select select-bordered w-full sm:w-48"
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setPage(1);
          }}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="name-asc">A–Z</option>
          <option value="name-desc">Z–A</option>
        </select>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <SkeletonLoader key={i} />
            ))}
        </div>
      ) : total === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-2xl font-semibold text-gray-600">
            No tutors found
          </h3>
          <p className="mt-3 text-gray-500">Try different keywords</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {current.map((t) => (
              <TutorCard key={t._id} tutor={t} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center gap-2 mt-12">
              <button
                className="btn btn-sm btn-outline"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                « Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .slice(Math.max(0, page - 3), Math.min(totalPages, page + 2))
                .map((p) => (
                  <button
                    key={p}
                    className={`btn btn-sm ${
                      p === page ? "btn-primary" : "btn-outline"
                    }`}
                    onClick={() => {
                      setPage(p);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    {p}
                  </button>
                ))}

              <button
                className="btn btn-sm btn-outline"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next »
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Tutors;
