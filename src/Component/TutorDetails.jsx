import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import useAxiosSecure from "../Hooks/useAxios";
import Loading from "./Loading";
import { IoMdArrowRoundBack } from "react-icons/io";

const TutorDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const res = await axiosSecure.get(`/tutors/${id}`);
        setTutor(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTutor();
  }, [id, axiosSecure]);

  if (loading) return <Loading></Loading>;
  if (!tutor) return <div className="text-center py-10">Tutor not found</div>;

  const handlePayment = async () => {
    const paymentInfo = {
      expectedSalary: tutor.expectedSalary,
      tutorId: tutor._id,
      tutorEmail: tutor.tutorEmail,
      tutorName: tutor.tutorName,
    };
    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    console.log(res.data);

    window.location.href = res.data.url;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded-2xl shadow-lg">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <img
          src={tutor.tutorPhoto}
          alt={tutor.tutorName}
          className="w-32 h-32 rounded-full object-cover mb-4 ring-4 ring-indigo-200"
        />
        <h1 className="text-3xl font-bold">{tutor.tutorName}</h1>
        <p className="text-gray-600">{tutor.tutorEmail}</p>
      </div>

      {/* Details Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <p>
            <strong>Education:</strong> {tutor.education}
          </p>
          <p>
            <strong>Current Status:</strong> {tutor.currentStatus}
          </p>
          <p>
            <strong>Preferred Classes:</strong> {tutor.preferredClasses}
          </p>
          <p>
            <strong>Subjects:</strong> {tutor.subjects}
          </p>
        </div>
        <div>
          <p>
            <strong>Location:</strong> {tutor.location}
          </p>
          <p>
            <strong>Medium:</strong> {tutor.medium}
          </p>
          <p>
            <strong>Expected Salary:</strong> {tutor.expectedSalary}
          </p>
          <p>
            <strong>Available Days:</strong> {tutor.availableDays}
          </p>
        </div>
      </div>

      {/* About Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">About Tutor</h2>
        <p className="text-gray-700">{tutor.about}</p>
      </div>

      {/* Contact */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Contact</h2>
        <p className="text-gray-700">{tutor.contactPhone}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <Link
          to="/tutors"
          className="flex items-center justify-center gap-3 px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400 transition-all"
        >
          <IoMdArrowRoundBack className="text-xl" />
          Back to Tutors
        </Link>
        <button
          onClick={handlePayment}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
        >
          Accept Tutor (Payment)
        </button>
      </div>
    </div>
  );
};

export default TutorDetails;
