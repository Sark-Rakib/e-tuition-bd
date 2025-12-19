import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import Loading from "../../Component/Loading";
import useAxiosSecure from "../../Hooks/useAxios";
import { useNavigate } from "react-router";

const MyTuition = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: tuitions = [], isLoading } = useQuery({
    queryKey: ["tuitions", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/tuitions-get?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Tuitions</h1>

      {tuitions.length === 0 ? (
        <p className="text-center text-gray-500">
          You have no tuitions posted yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tuitions.map((t) => (
            <div
              key={t._id}
              className="bg-white shadow-md rounded-lg p-5 hover:shadow-lg transition-shadow flex flex-col justify-between relative"
            >
              {/* Status Badge */}
              <span
                className={`inline-block px-3 py-1 rounded-full text-white text-sm absolute top-4 ${
                  t.status === "Approved"
                    ? "bg-green-500"
                    : t.status === "Rejected"
                    ? "bg-red-500"
                    : "bg-gray-400"
                }`}
              >
                {t.status || "Pending"}
              </span>

              {/* Student Photo & Title */}
              <div className="text-center mb-4">
                <img
                  src={t.studentPhoto || "https://i.pravatar.cc/150"}
                  alt={t.studentName}
                  className="w-24 h-24 rounded-full mx-auto mb-2 object-cover"
                />
                <h2 className="text-xl font-semibold">{t.title}</h2>
              </div>

              {/* Tuition Details */}
              <div className="text-gray-700 space-y-1">
                <p>
                  <span className="font-medium">Student Name:</span>{" "}
                  {t.studentName}
                </p>
                <p>
                  <span className="font-medium">Class:</span> {t.studentClass}
                </p>
                <p>
                  <span className="font-medium">Subject:</span> {t.subject}
                </p>
                <p>
                  <span className="font-medium">Location:</span> {t.location}
                </p>
                <p>
                  <span className="font-medium">Salary:</span> ${t.salary}
                </p>
                <p>
                  <span className="font-medium">Days/Week:</span>{" "}
                  {t.daysPerWeek}
                </p>
                <p>
                  <span className="font-medium">Tutoring Time:</span>{" "}
                  {t.tutoringTime}
                </p>
                <p>
                  <span className="font-medium">Student Gender:</span>{" "}
                  {t.studentGender}
                </p>
                <p>
                  <span className="font-medium">Tutor Gender:</span>{" "}
                  {t.tutorGender}
                </p>
                <p>
                  <span className="font-medium">Requirements:</span>{" "}
                  {t.requirements}
                </p>
                <p>
                  <span className="font-medium">Contact:</span> {t.contactPhone}
                </p>
              </div>

              {/* Edit Button Bottom Right */}
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => navigate(`/dashboard/tuition/${t._id}/edit`)}
                  className="bg-blue-500 text-white w-20 px-4 py-2 rounded hover:bg-blue-600 text-sm"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTuition;
