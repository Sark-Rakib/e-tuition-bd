import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxios";
import Loading from "../../Component/Loading";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";

const Tuitor = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Fetch all tutors
  const {
    data: tutors = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tutors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tutors");
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tutor?")) return;
    try {
      const res = await axiosSecure.delete(`/tutors/${id}`);
      if (res.data.deletedCount > 0) {
        toast.success("Tutor deleted successfully ✅");
        refetch();
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete tutor ❌");
    }
  };

  const handleEdit = (id) => {
    navigate(`/tutors/${id}/edit`);
  };

  const handleView = (id) => {
    navigate(`/tutor-details/${id}`);
  };

  const handleApprove = async (id) => {
    if (!window.confirm("Are you sure you want to approve this tuition?"))
      return;
    try {
      const res = await axiosSecure.patch(`/tutor/${id}/approve`, {
        email: user?.email, // যেই user approve করছে তার email
      });
      if (res.data.success) {
        toast.success("Tuition approved ✅");
        refetch(); // update UI
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to approve tuition ❌");
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm("Are you sure you want to reject this tuition?"))
      return;
    try {
      const res = await axiosSecure.patch(`/tutor/${id}/reject`, {
        email: user?.email, // যেই user reject করছে তার email
      });
      if (res.data.success) {
        toast.success("Tuition rejected ❌");
        refetch(); // update UI
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to reject tuition ❌");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">All Tutors ({tutors.length})</h1>
      {tutors.length === 0 ? (
        <p className="text-center text-gray-500">No tutors found</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="table table-zebra w-full">
            <thead className="bg-gray-100">
              <tr>
                <th>SL</th>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Location</th>
                <th>Salary</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tutors.map((t, index) => (
                <tr key={t._id}>
                  <td>{index + 1}</td>
                  <td>{t.tutorName}</td>
                  <td>{t.tutorEmail}</td>
                  <td>{t.subjects}</td>
                  <td>{t.location}</td>
                  <td>${t.expectedSalary}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${
                        t.status === "Approved"
                          ? "bg-green-500"
                          : t.status === "Rejected"
                          ? "bg-red-500"
                          : "bg-gray-400"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => handleView(t._id)}
                      className="btn btn-xs btn-info"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(t._id)}
                      className="btn btn-xs btn-warning"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(t._id)}
                      className="btn btn-xs btn-error"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleApprove(t._id)}
                      className="btn btn-xs btn-success"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(t._id)}
                      className="btn btn-xs btn-error"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Tuitor;
