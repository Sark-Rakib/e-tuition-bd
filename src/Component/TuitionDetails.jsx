import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import useAxiosSecure from "../Hooks/useAxios";
import Loading from "./Loading";
import { IoMdArrowRoundBack } from "react-icons/io";

const TuitionDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [tuition, setTuition] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTuition = async () => {
      try {
        const res = await axiosSecure.get(`/tuitions/${id}`);
        setTuition(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTuition();
  }, [id, axiosSecure]);

  if (loading) return <Loading />;
  if (!tuition)
    return <div className="text-center py-10 text-xl">Tuition not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <img
          src={
            tuition.studentPhoto ||
            "https://i.ibb.co/4p0jH0Z/default-avatar.jpg"
          }
          alt={tuition.studentName}
          className="w-32 h-32 rounded-full object-cover mb-4 ring-4 ring-indigo-200"
        />
        <h1 className="text-3xl font-bold">{tuition.studentName}</h1>
        <p className="text-gray-600">{tuition.studentEmail}</p>
      </div>

      {/* Tuition Details Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <p>
            <strong>Student Class:</strong> {tuition.studentClass}
          </p>
          <p>
            <strong>Subjects:</strong> {tuition.subject}
          </p>
          <p>
            <strong>Location:</strong> {tuition.location}
          </p>
          <p>
            <strong>Expected Salary:</strong> {tuition.salary}
          </p>
          <p>
            <strong>Days Per Week:</strong> {tuition.daysPerWeek}
          </p>
        </div>
        <div className="space-y-2">
          <p>
            <strong>Tutoring Time:</strong> {tuition.tutoringTime}
          </p>
          <p>
            <strong>Student Gender:</strong> {tuition.studentGender}
          </p>
          <p>
            <strong>Preferred Tutor:</strong> {tuition.tutorGender}
          </p>
          <p>
            <strong>Student Describtion:</strong> {tuition.requirements}
          </p>
          <p>
            <strong>Contact Phone:</strong> {tuition.contactPhone}
          </p>
        </div>
      </div>

      {/* Optional: About Section */}
      {tuition.notes && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Additional Notes</h2>
          <p className="text-gray-700">{tuition.notes}</p>
        </div>
      )}

      {/* Back Button */}
      <div className="text-center mt-8">
        <Link
          to="/tuition"
          className="flex items-center justify-center gap-3 mx-auto w-50 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
        >
          <IoMdArrowRoundBack className="text-xl" />
          Back To Tuition
        </Link>
      </div>
    </div>
  );
};

export default TuitionDetails;
