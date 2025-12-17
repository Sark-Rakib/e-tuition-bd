import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxios";
import Loading from "../../Component/Loading";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";

const Student = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Fetch all tuitions
  const {
    data: tuitions = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tuitions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tuitions");
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tuition?"))
      return;
    try {
      const res = await axiosSecure.delete(`/tuitions/${id}`);
      if (res.data.deletedCount > 0) {
        toast.success("Tuition deleted successfully ✅");
        refetch();
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete tuition ❌");
    }
  };

  const handleEdit = (id) => {
    navigate(`/tuitions/${id}/edit`);
  };

  const handleView = (id) => {
    navigate(`/tuition-details/${id}`);
  };
  const handleApprove = async (id) => {
    if (!window.confirm("Are you sure you want to approve this tuition?"))
      return;
    try {
      const res = await axiosSecure.patch(`/tuitions/${id}/approve`, {
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
      const res = await axiosSecure.patch(`/tuitions/${id}/reject`, {
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
      <h1 className="text-3xl font-bold mb-6">
        All Tuitions ({tuitions.length})
      </h1>
      {tuitions.length === 0 ? (
        <p className="text-center text-gray-500">No tuitions found</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="table table-zebra w-full">
            <thead className="bg-gray-100">
              <tr>
                <th>SL</th>
                <th>Title</th>
                <th>Student</th>
                <th>Class</th>
                <th>Subject</th>
                <th>Location</th>
                <th>Salary</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tuitions.map((t, index) => (
                <tr key={t._id}>
                  <td>{index + 1}</td>
                  <td>{t.title}</td>
                  <td>{t.studentName}</td>
                  <td>{t.studentClass}</td>
                  <td>{t.subject}</td>
                  <td>{t.location}</td>
                  <td>${t.salary}</td>
                  <td>
                    {" "}
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

export default Student;
