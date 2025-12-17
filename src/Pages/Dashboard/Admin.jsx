// src/pages/dashboard/admin/PendingTuitions.jsx
import { useQuery } from "@tanstack/react-query";

import { toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useAuth";

const PendingTuitions = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: tuitions = [], refetch } = useQuery({
    queryKey: ["pending-tuitions", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/tuitions/pending?email=${user?.email}`
      );
      return res.data.data || [];
    },
  });

  const handleApprove = async (id) => {
    await axiosSecure.patch(`/tuitions/${id}/approve`, { email: user?.email });
    toast.success("Approved!");
    refetch();
  };

  const handleReject = async (id) => {
    await axiosSecure.patch(`/tuitions/${id}/reject`, { email: user?.email });
    toast.success("Rejected!");
    refetch();
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Pending Tuitions ({tuitions.length})
      </h1>

      {tuitions.length === 0 ? (
        <p className="text-center text-gray-500 text-xl">No pending tuitions</p>
      ) : (
        <div className="grid gap-6">
          {tuitions.map((t) => (
            <div
              key={t._id}
              className="bg-white p-6 rounded-lg shadow-lg border"
            >
              <h3 className="text-xl font-bold">{t.title}</h3>
              <p>
                Class: {t.studentClass} | Subject: {t.subject}
              </p>
              <p>
                Location: {t.location} | Salary: ৳{t.salary}/month
              </p>
              <p>
                Posted by: {t.studentName} ({t.studentEmail})
              </p>

              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => handleApprove(t._id)}
                  className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(t._id)}
                  className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingTuitions;
