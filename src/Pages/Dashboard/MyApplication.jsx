import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxios";
import Loading from "../../Component/Loading";
import { useNavigate } from "react-router";

const MyApplication = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // fetch only user's applications
  const { data: tutors = [], isLoading } = useQuery({
    queryKey: ["my-applications", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/applications?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email, // user loaded হলে চালাবে
  });

  if (isLoading) return <Loading />;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Tutor Posts</h1>

      {tutors.length === 0 ? (
        <p className="text-center text-gray-500">No tutor posts found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutors.map((tutor) => (
            <div
              key={tutor._id}
              className="bg-white shadow-md rounded-lg p-5 hover:shadow-lg transition-shadow relative flex flex-col justify-between"
            >
              <div>
                {/* Status Badge */}
                <span
                  className={`inline-block px-3 py-1 rounded-full text-white text-sm font-medium mb-3 ${
                    tutor.status === "Approved"
                      ? "bg-green-500"
                      : tutor.status === "Rejected"
                      ? "bg-red-500"
                      : "bg-gray-400"
                  }`}
                >
                  {tutor.status || "Pending"}
                </span>

                {/* Tutor Photo */}
                <img
                  src={tutor.tutorPhoto || "https://i.pravatar.cc/150"}
                  alt={tutor.tutorName}
                  className="w-20 h-20 rounded-full mx-auto mb-4"
                />

                {/* Tutor Info */}
                <h2 className="text-xl font-semibold mb-2 text-center">
                  {tutor.tutorName}
                </h2>

                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Education:</span>{" "}
                  {tutor.education}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Current Status:</span>{" "}
                  {tutor.currentStatus}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Preferred Classes:</span>{" "}
                  {tutor.preferredClasses}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Subjects:</span>{" "}
                  {tutor.subjects}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Location:</span>{" "}
                  {tutor.location}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Medium:</span> {tutor.medium}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Expected Salary:</span> $
                  {tutor.expectedSalary}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Available Days:</span>{" "}
                  {tutor.availableDays}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">About:</span> {tutor.about}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Contact:</span>{" "}
                  {tutor.contactPhone}
                </p>
              </div>

              {/* Edit Button Bottom Right */}
              <div className="flex justify-end mt-3">
                <button
                  onClick={() => navigate(`/dashboard/tutor/${tutor._id}/edit`)}
                  className="bg-blue-500 w-20 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
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

export default MyApplication;
