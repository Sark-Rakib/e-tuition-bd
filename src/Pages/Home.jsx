import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../Hooks/useAxios";
import { motion } from "framer-motion";
import Loading from "../Component/Loading";

const HomePage = () => {
  const axiosSecure = useAxiosSecure();
  const [tuitions, setTuitions] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tuitionsRes = await axiosSecure.get("/tuitions");
        setTuitions(tuitionsRes.data);

        const tutorsRes = await axiosSecure.get("/tutors");
        setTutors(tutorsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [axiosSecure]);

  if (loading) return <Loading />;
  const approvedTuition = tuitions.filter((t) => t.status === "Approved");
  const approvedTutor = tutors.filter((t) => t.status === "Approved");

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="w-11/12 mx-auto bg-indigo-600 text-white mt-5 py-24">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-6">
          <h1 className="text-5xl font-bold">
            Find the Best Tutors & Tuitions
          </h1>
          <p className="text-xl">
            Connect with verified tutors and manage tuition posts effortlessly.
          </p>
          <div className="flex items-center justify-center md:mt-1">
            <Link
              to="/tuition"
              className="px-8 py-4 bg-yellow-400 text-indigo-800 font-semibold rounded-lg hover:bg-yellow-500 transition-all"
            >
              Explore Tuitions
            </Link>
            <Link
              to="/tutors"
              className="ml-5 px-8 py-4 bg-yellow-400 text-indigo-800 font-semibold rounded-lg hover:bg-yellow-500 transition-all"
            >
              Explore Tutors
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Tuitions */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Latest <span className="text-primary">Tuition</span> Posts
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {approvedTuition
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // sort by latest first
            .slice(0, 3)
            .map((tuition) => (
              <motion.div
                key={tuition._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-indigo-50 p-6 rounded-xl shadow hover:shadow-lg transition-all text-center"
              >
                <img
                  src={tuition.studentPhoto}
                  alt={tuition.studentName}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold">{tuition.studentName}</h3>
                <p className="text-gray-600">
                  Student Class : {tuition.studentClass}
                </p>
                <Link
                  to={`/tuition-details/${tuition._id}`}
                  className="inline-block mt-4 px-4 py-2 bg-yellow-400 text-indigo-800 rounded hover:bg-yellow-500 transition-all"
                >
                  View Profile
                </Link>
              </motion.div>
            ))}
        </div>
      </section>

      {/* Latest Tutors */}
      <section className="max-w-7xl mx-auto  px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Latest <span className="text-primary">Tutors</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {approvedTutor
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // sort by latest first
            .slice(0, 3)
            .map((tutor) => (
              <motion.div
                key={tutor._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-indigo-50 p-6 rounded-xl shadow hover:shadow-lg transition-all text-center"
              >
                <img
                  src={
                    tutor.tutorPhoto ||
                    "https://i.ibb.co/4p0jH0Z/default-avatar.jpg"
                  }
                  alt={tutor.tutorName}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold">{tutor.tutorName}</h3>
                <p className="text-gray-600">
                  Current Status : {tutor.currentStatus}
                </p>
                <Link
                  to={`/tutor-details/${tutor._id}`}
                  className="inline-block mt-4 px-4 py-2 bg-yellow-400 text-indigo-800 rounded hover:bg-yellow-500 transition-all"
                >
                  View Profile
                </Link>
              </motion.div>
            ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="w-11/12 mx-auto bg-gray-50 py-16">
        <div className="px-4 text-center space-y-6">
          <h2 className="text-3xl font-bold">
            How <span className="text-primary">It</span> Works
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition-all">
              <h3 className="text-xl font-semibold mb-2">1. Post Tuition</h3>
              <p>
                Students post tuition requests with details like class, budget,
                and schedule.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition-all">
              <h3 className="text-xl font-semibold mb-2">2. Apply</h3>
              <p>Tutors browse tuitions and apply to suitable posts.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition-all">
              <h3 className="text-xl font-semibold mb-2">
                3. Approval & Payment
              </h3>
              <p>
                Students approve tutors and make secure payments through the
                system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="w-11/12 mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Why Choose <span className="text-primary">eTuitionBd</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-indigo-50 rounded-xl shadow text-center">
            <h3 className="text-xl font-semibold mb-2">Verified Tutors</h3>
            <p>All tutors are verified for quality teaching and reliability.</p>
          </div>
          <div className="p-6 bg-indigo-50 rounded-xl shadow text-center">
            <h3 className="text-xl font-semibold mb-2">Easy Management</h3>
            <p>Post tuitions, apply, approve, and track payments seamlessly.</p>
          </div>
          <div className="p-6 bg-indigo-50 rounded-xl shadow text-center">
            <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
            <p>Integrated payment system ensures hassle-free transactions.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
