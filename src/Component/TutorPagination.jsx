import React, { useState } from "react";
import TutorCard from "./TutorCard";

const TutorPagination = ({ tutors }) => {
  const tutorsArray = Array.isArray(tutors) ? tutors : [];
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(tutorsArray.length / itemsPerPage);

  const currentTutors = tutorsArray.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Latest Tutors</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentTutors.length > 0 ? (
          currentTutors.map((tutor) => (
            <TutorCard key={tutor._id} tutor={tutor} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No tutors available.
          </p>
        )}
      </div>

      {totalPages > 0 && (
        <div className="flex justify-center mt-8 gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-4 py-2 rounded transition ${
                currentPage === idx + 1
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 hover:bg-indigo-500 hover:text-white"
              }`}
            >
              {idx + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default TutorPagination;
