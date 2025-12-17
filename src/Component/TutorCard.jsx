// src/components/TutorCard.jsx
import React from "react";
import { Link } from "react-router";
import TutorPagination from "./TutorPagination";

const TutorCard = ({ tutor }) => {
  const {
    _id,
    tutorName,
    email,
    tutorPhoto,
    phone,
    subjects,
    qualification,
    experience,
    location,
    salaryExpectation,
    availableDays,
    availableTime,
    bio,
    role = "Tutor",
    createdAt,
    status,
  } = tutor;

  // তারিখ ফরম্যাট
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const subjectList = Array.isArray(subjects)
    ? subjects
    : subjects
    ? subjects.split(",").map((s) => s.trim())
    : [];

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200">
      <div className="card-body p-6">
        {/* Role Badge & Joined Date */}
        <div className="flex justify-between items-center gap-5 mb-4">
          <div className="badge badge-success badge-lg font-semibold">
            {status}
          </div>
          <p className="text-sm text-gray-500">
            Joined: {formatDate(createdAt || new Date())}
          </p>
        </div>

        {/* Tutor Avatar & Name */}
        <div className="flex items-center gap-4 mb-5">
          <div className="avatar">
            <div className="w-20 rounded-full ring ring-success ring-offset-base-100 ring-offset-2">
              <img src={tutorPhoto} alt={tutorName} />
            </div>
          </div>
          <div>
            <h2 className="card-title text-2xl font-bold text-gray-800">
              {tutorName}
            </h2>
            <p>{role}</p>
            <p className="text-gray-600">{email}</p>
            {phone && <p className="text-sm text-gray-500 mt-1">📞 {phone}</p>}
          </div>
        </div>

        {/* Subjects */}
        {subjectList.length > 0 && (
          <div className="mb-4">
            <p className="font-semibold text-gray-700 mb-2">Teaches:</p>
            <div className="flex flex-wrap gap-2">
              {subjectList.map((sub, idx) => (
                <span key={idx} className="badge badge-primary badge-outline">
                  {sub}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {qualification && (
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 14l9-5-9-5-9 5 9 5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                />
              </svg>
              <span className="font-medium">Qualification:</span>{" "}
              {qualification}
            </div>
          )}

          {experience && (
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M12 6v6m0 0l3 3m-3-3l-3 3"
                />
              </svg>
              <span className="font-medium">Experience:</span> {experience}{" "}
              years
            </div>
          )}

          {location && (
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="font-medium">Location:</span> {location}
            </div>
          )}

          {salaryExpectation && (
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-medium">Expected Salary:</span> ৳
              {salaryExpectation}/month
            </div>
          )}

          {availableDays && (
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="font-medium">Available:</span> {availableDays}{" "}
              days/week
            </div>
          )}

          {availableTime && (
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-medium">Time:</span> {availableTime}
            </div>
          )}
        </div>

        {/* Short Bio */}
        {bio && (
          <div className="mt-5">
            <p className="text-gray-700 italic line-clamp-3">"{bio}"</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="card-actions mt-6 flex gap-3">
          <Link
            to={`/tutor-details/${_id}`}
            className="btn btn-success flex-1 hover:btn-primary transition-all"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TutorCard;
