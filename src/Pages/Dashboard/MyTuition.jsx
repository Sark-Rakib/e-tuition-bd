import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import Loading from "../../Component/Loading";
import useAxiosSecure from "../../Hooks/useAxios";

const MyTuition = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

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
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <img
                src={t.studentPhoto}
                alt={t.studentName}
                className="w-20 h-20 rounded-full mx-auto mb-3"
              />
              <h2 className="text-xl font-semibold mb-2 text-center">
                {t.title}
              </h2>
              <p>
                <b>Student Name:</b> {t.studentName}
              </p>
              <p>
                <b>Class:</b> {t.studentClass}
              </p>
              <p>
                <b>Subject:</b> {t.subject}
              </p>
              <p>
                <b>Location:</b> {t.location}
              </p>
              <p>
                <b>Salary:</b> {t.salary}
              </p>

              <span
                className={`inline-block mt-2 px-2 py-1 rounded-full text-white text-sm ${
                  t.status === "Approved"
                    ? "bg-green-500"
                    : t.status === "Rejected"
                    ? "bg-red-500"
                    : "bg-gray-400"
                }`}
              >
                {t.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTuition;
