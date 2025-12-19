import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxios";
import Loading from "./Loading";

const EditTuition = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();

  // fetch tuition data
  const { data: tuition, isLoading } = useQuery({
    queryKey: ["tuition", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tuitions/${id}`);
      return res.data;
    },
  });

  // set default values when tuition is fetched
  useEffect(() => {
    if (tuition) {
      reset({
        title: tuition.title,
        studentName: tuition.studentName,
        studentClass: tuition.studentClass,
        subject: tuition.subject,
        location: tuition.location,
        salary: tuition.salary,
      });
    }
  }, [tuition, reset]);

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.put(`/tuitions/${id}`, data);
      console.log(res.data);
      if (res.data.success) {
        Swal.fire("Success!", "Tuition updated successfully.", "success");
        navigate("/dashboard/my-tuition");
      }
    } catch (err) {
      console.log("Update error:", err.response?.data || err.message);
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Edit Tuition
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex flex-col">
            <label className="label font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              {...register("title")}
              className="input w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Title"
            />
          </div>

          <div className="flex flex-col">
            <label className="label font-medium text-gray-700 mb-1">
              Student Name
            </label>
            <input
              {...register("studentName")}
              className="input w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Student Name"
            />
          </div>

          <div className="flex flex-col">
            <label className="label font-medium text-gray-700 mb-1">
              Class
            </label>
            <input
              {...register("studentClass")}
              className="input w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Class"
            />
          </div>

          <div className="flex flex-col">
            <label className="label font-medium text-gray-700 mb-1">
              Subject
            </label>
            <input
              {...register("subject")}
              className="input w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Subject"
            />
          </div>

          <div className="flex flex-col">
            <label className="label font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              {...register("location")}
              className="input w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Location"
            />
          </div>

          <div className="flex flex-col">
            <label className="label font-medium text-gray-700 mb-1">
              Salary
            </label>
            <input
              {...register("salary")}
              type="number"
              className="input w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Salary"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-all"
          >
            Update Tuition
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTuition;
