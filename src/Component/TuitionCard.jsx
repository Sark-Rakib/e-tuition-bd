// src/components/TuitionCard.jsx
import React from "react";
import { Link } from "react-router";

const TuitionCard = ({ tuition }) => {
  const {
    _id,
    title,
    studentClass,
    subject,
    location,
    salary,
    daysPerWeek,
    tutoringTime,
    tutorGender,
    studentName,
    studentPhoto,
    postedAt,
    status = "Pending",
  } = tuition;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200">
      <div className="card-body p-6">
        {/* Status Badge */}
        <div className="flex justify-between items-center gap-5 mb-4">
          <div
            className={`badge ${
              status === "Approved"
                ? "badge-success"
                : status === "Pending"
                ? "badge-warning"
                : "badge-error"
            } badge-lg font-semibold`}
          >
            {status}
          </div>
          <p className="text-sm text-gray-500">
            Posted: {formatDate(postedAt)}
          </p>
        </div>

        {/* Title */}
        <h2 className="card-title text-xl font-bold line-clamp-2">{title}</h2>

        {/* Student Info */}
        <div className="flex items-center gap-3 my-4">
          <div className="avatar">
            <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={
                  studentPhoto ||
                  "https://i.ibb.co.com/4p0jH0Z/default-avatar.jpg"
                }
                alt={studentName}
              />
            </div>
          </div>
          <div>
            <p className="font-semibold">{studentName}</p>
            <p className="text-sm text-gray-600">Student</p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <span className="font-medium">Class:</span> {studentClass}
          </div>

          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <span className="font-medium">Subject:</span> {subject}
          </div>

          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-indigo-600"
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

          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-indigo-600"
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
            <span className="font-medium">Salary:</span> ৳{salary}/month
          </div>

          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-indigo-600"
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
            <span className="font-medium">Days:</span> {daysPerWeek} days/week
          </div>

          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-indigo-600"
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
            <span className="font-medium">Time:</span> {tutoringTime}
          </div>
        </div>

        {/* Preferred Tutor Gender */}
        <div className="mt-4">
          <span className="font-medium text-gray-700">Preferred Tutor:</span>
          <span className="ml-2 badge badge-outline badge-info">
            {tutorGender === "Any" ? "Male/Female" : tutorGender}
          </span>
        </div>

        {/* Action Button */}
        <div className="card-actions mt-6">
          <Link
            to={`/tuition-details/${_id}`}
            className="btn btn-primary w-full hover:btn-secondary transition-all"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TuitionCard;
