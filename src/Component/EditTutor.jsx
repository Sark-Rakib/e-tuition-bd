import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxios";
import Loading from "./Loading";

const EditTutor = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();

  // Fetch tutor data
  const { data: tutor, isLoading } = useQuery({
    queryKey: ["tutor", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tutors/${id}`);
      return res.data;
    },
  });

  // Set default values when tutor data is fetched
  useEffect(() => {
    if (tutor) {
      reset({
        currentStatus: tutor.currentStatus,
        tutorName: tutor.tutorName,
        preferredClasses: tutor.preferredClasses,
        subjects: tutor.subjects,
        location: tutor.location,
        expectedSalary: tutor.expectedSalary,
      });
    }
  }, [tutor, reset]);

  const onSubmit = async (data) => {
    try {
      // Map form fields to MongoDB field names
      const formattedData = {
        currentStatus: data.currentStatus,
        tutorName: data.tutorName,
        preferredClasses: data.preferredClasses,
        subjects: data.subjects,
        location: data.location,
        expectedSalary: data.expectedSalary,
      };

      const res = await axiosSecure.put(`/tutors/${id}`, formattedData);

      if (res.data.success) {
        Swal.fire("Success!", "Tutor updated successfully.", "success");
        navigate("/dashboard/my-application");
      } else {
        Swal.fire("Info", "No changes were made.", "info");
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
          Edit Tutor
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Current Status */}
          <div className="flex flex-col">
            <label className="label font-medium text-gray-700 mb-1">
              Current Status
            </label>
            <input
              {...register("currentStatus")}
              className="input w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Current Status"
            />
          </div>

          {/* Tutor Name */}
          <div className="flex flex-col">
            <label className="label font-medium text-gray-700 mb-1">
              Tutor Name
            </label>
            <input
              {...register("tutorName")}
              className="input w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Tutor Name"
            />
          </div>

          {/* Preferred Classes */}
          <div className="flex flex-col">
            <label className="label font-medium text-gray-700 mb-1">
              Preferred Classes
            </label>
            <input
              {...register("preferredClasses")}
              className="input w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Preferred Classes"
            />
          </div>

          {/* Subjects */}
          <div className="flex flex-col">
            <label className="label font-medium text-gray-700 mb-1">
              Subjects
            </label>
            <input
              {...register("subjects")}
              className="input w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Subjects"
            />
          </div>

          {/* Location */}
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

          {/* Expected Salary */}
          <div className="flex flex-col">
            <label className="label font-medium text-gray-700 mb-1">
              Expected Salary
            </label>
            <input
              {...register("expectedSalary")}
              type="number"
              className="input w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Expected Salary"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-all"
          >
            Update Tutor
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTutor;
