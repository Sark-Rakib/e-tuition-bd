// src/sections/AboutUs.jsx  OR place directly on Home page
import { motion } from "framer-motion";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaShieldAlt,
  FaClock,
  FaHandshake,
  FaTrophy,
} from "react-icons/fa";

const About = () => {
  return (
    <section className="w-11/12 mx-auto py-20 bg-gradient-to-b from-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Why Thousands Trust{" "}
            <span className="text-indigo-600">E-TutionBd</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bangladesh’s fastest-growing tuition platform that connects verified
            tutors with serious students — transparently, securely, and
            instantly.
          </p>
        </motion.div>

        {/* Stats Counter */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {[
            { number: "10K+", label: "Active Students" },
            { number: "5K+", label: "Verified Tutors" },
            { number: "25K+", label: "Tuitions Completed" },
            { number: "4.9★", label: "Average Rating" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="text-center"
            >
              <h3 className="text-4xl font-bold text-indigo-600">
                {stat.number}
              </h3>
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              icon: FaUserGraduate,
              title: "Verified Tutors Only",
              desc: "Every tutor goes through phone + document verification before joining.",
            },
            {
              icon: FaShieldAlt,
              title: "100% Secure Payments",
              desc: "Your money is safe. Pay only after approving your tutor via Stripe.",
            },
            {
              icon: FaClock,
              title: "Instant Matching",
              desc: "Post a tuition and get applications from qualified tutors within hours.",
            },
            {
              icon: FaChalkboardTeacher,
              title: "All Subjects & Classes",
              desc: "From Class 1 to University — Science, Commerce, Arts, Language & more.",
            },
            {
              icon: FaHandshake,
              title: "No Middleman Fee",
              desc: "Direct contact between student and tutor. Zero hidden charges.",
            },
            {
              icon: FaTrophy,
              title: "Top-Rated Platform",
              desc: "Trusted by parents and students across Dhaka, Chittagong, Sylhet & beyond.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border border-indigo-100"
            >
              <div className="text-indigo-600 mb-4">
                <feature.icon size={30} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-2xl font-semibold text-gray-800 mb-6">
            Ready to find your perfect tutor? Join 50,000+ happy learners today!
          </p>
          <a
            href="/tuitions"
            className="inline-block bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-bold py-4 px-10 rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Browse Tuitions Now
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
