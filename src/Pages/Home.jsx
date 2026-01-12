import React, { useEffect, useState } from "react";
import { Link } from "react-router"; // Note: usually should be react-router-dom
import useAxiosSecure from "../Hooks/useAxios";
import { motion } from "framer-motion";
import Loading from "../Component/Loading";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import SkeletonLoader from "../Component/SkeletonLoader";

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
      {/* ==================== Your Original Hero Section ==================== */}
      <section className="w-11/12 mx-auto bg-indigo-600 text-white mt-5 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false }}
          className="w-11/12 mx-auto text-center space-y-6"
        >
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
        </motion.div>
      </section>

      {/* ==================== Your Original Latest Tuitions ==================== */}

      <section className="w-11/12 mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold">
            Latest <span className="text-primary">Tuition</span> Posts
          </h2>
          <Link
            to="/tuition"
            className="text-primary font-medium hover:underline"
          >
            View All →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {approvedTuition.length === 0
            ? Array(4)
                .fill(0)
                .map((_, index) => <SkeletonLoader key={index} />)
            : approvedTuition
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 4)
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
                    <h3 className="text-xl text-black font-semibold">
                      {tuition.studentName}
                    </h3>
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

      {/* ==================== Your Original Latest Tutors ==================== */}
      <section className="w-11/12 mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold">
            Latest <span className="text-primary">Tutors</span> Posts
          </h2>
          <Link
            to="/tutors"
            className="text-primary font-medium hover:underline"
          >
            View All →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {approvedTutor.length === 0
            ? Array(4)
                .fill(0)
                .map((_, index) => <SkeletonLoader key={index} />)
            : approvedTutor
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 4)
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
                    <h3 className="text-xl text-black font-semibold">
                      {tutor.tutorName}
                    </h3>
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

      {/* ==================== FEATURES ==================== */}
      <section className="w-11/12 mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Our <span className="text-primary">Features</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-xl shadow text-center">
            <h3 className="text-xl text-black font-semibold mb-3">
              Smart Matching
            </h3>
            <p className="text-gray-600">
              Find tutors that perfectly match your requirements
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow text-center">
            <h3 className="text-xl text-black font-semibold mb-3">
              Verified Profiles
            </h3>
            <p className="text-gray-600">
              All tutors are manually verified for authenticity
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow text-center">
            <h3 className="text-xl text-black font-semibold mb-3">
              Secure Platform
            </h3>
            <p className="text-gray-600">
              Safe communication & secure payment system
            </p>
          </div>
        </div>
      </section>

      {/* ==================== SERVICES ==================== */}
      <section className="w-11/12 mx-auto bg-gray-50 rounded-xl py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl text-black font-bold mb-8 text-center">
            Our <span className="text-primary">Services</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-xl shadow">
              <h3 className="text-xl text-black font-semibold mb-3">
                Home Tutoring
              </h3>
              <p className="text-blue-400">
                Experienced tutors come to your home
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow">
              <h3 className="text-xl text-black font-semibold mb-3">
                Online Tutoring
              </h3>
              <p className="text-blue-400">
                Learn from anywhere with video classes
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow">
              <h3 className="text-xl text-black font-semibold mb-3">
                Group Classes
              </h3>
              <p className="text-blue-400">
                Affordable learning in small groups
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CATEGORIES ==================== */}
      <section className="w-11/12 mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Popular <span className="text-primary">Categories</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            "Class 1-5",
            "Class 6-8",
            "SSC",
            "HSC",
            "O/A Level",
            "IELTS",
            "Admission",
            "University",
            "Arabic",
            "Quran",
            "Programming",
            "Language",
          ].map((cat) => (
            <div
              key={cat}
              className="bg-indigo-50 p-5 rounded-xl text-center hover:bg-indigo-100 transition-colors cursor-pointer"
            >
              <p className="font-medium text-black">{cat}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== STATISTICS ==================== */}
      <section className="w-11/12 mx-auto bg-primary text-white py-16 rounded-xl">
        <div className="w-11/12 mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Our Statistics
          </h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold">5K+</div>
              <p>Happy Students</p>
            </div>
            <div>
              <div className="text-4xl font-bold">2K+</div>
              <p>Active Tutors</p>
            </div>
            <div>
              <div className="text-4xl font-bold">10K+</div>
              <p>Classes Completed</p>
            </div>
            <div>
              <div className="text-4xl font-bold">98%</div>
              <p>Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="w-11/12 mx-auto px-5">
        <h2 className="text-3xl font-bold mb-8 text-center">
          What Our <span className="text-primary">Users Say</span>
        </h2>

        <Swiper
          loop={true}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          coverflowEffect={{
            stretch: "50%",
            rotate: 30,
            depth: 200,
            modifier: 1,
            scale: 0.75,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: {
              // Mobile
              slidesPerView: 1,
            },
            640: {
              // Small devices
              slidesPerView: 2,
            },
            1024: {
              // Desktop
              slidesPerView: 3,
            },
          }}
          modules={[EffectCoverflow, Autoplay]}
          className="mySwiper my-10"
        >
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Rahim Mia",
                text: "Found an excellent tutor for my daughter in just 3 days!",
                role: "Parent",
              },
              {
                name: "Shaila Akter",
                text: "The teaching style is amazing and really helped my son improve his grades.",
                role: "Parent",
              },
              {
                name: "Imran Hossain",
                text: "Highly professional and patient. My child loves attending the classes!",
                role: "Parent",
              },
              {
                name: "Farhana Khatun",
                text: "Quick responses, great guidance, and the lessons are very engaging.",
                role: "Parent",
              },
              {
                name: "Rakib Ahmed",
                text: "Found the perfect tutor for my daughter. She is more confident and motivated now.",
                role: "Parent",
              },
              {
                name: "Sumaiya Akter",
                text: "Very professional platform and genuine students.",
                role: "Tutor",
              },
              {
                name: "Fahim Chowdhury",
                text: "Best tuition platform in Bangladesh right now.",
                role: "Student",
              },
            ].map((item, idx) => (
              <SwiperSlide key={idx}>
                <div className="bg-indigo-50 p-6 rounded-xl">
                  <p className="italic text-black mb-4">"{item.text}"</p>
                  <p className="font-semibold text-black">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.role}</p>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </section>

      {/* ==================== BLOGS ==================== */}
      <section className="w-11/12 mx-auto px-5">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Latest <span className="text-primary">Blogs</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "How to Choose the Right Tutor", date: "Jan 5, 2026" },
            { title: "SSC 2026 Preparation Tips", date: "Jan 3, 2026" },
            { title: "Benefits of Online Tutoring", date: "Dec 28, 2025" },
          ].map((blog, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-xl text-blue-400 font-semibold mb-2">
                {blog.title}
              </h3>
              <p className="text-sm text-gray-500">{blog.date}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section className="w-11/12 mx-auto bg-gray-100 py-16 rounded-xl">
        <div className="max-w-4xl mx-auto px-5">
          <h2 className="text-3xl text-black md:text-4xl font-bold text-center mb-14">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>

          <div className="space-y-5">
            {[
              {
                q: "How do I know the tutors are genuine?",
                a: "All tutors go through ID verification, educational qualification check & sometimes demo class.",
              },
              {
                q: "Is the payment safe?",
                a: "Yes. We hold payment until both parties are satisfied with the classes.",
              },
              {
                q: "Can I take trial classes?",
                a: "Most tutors offer 1-2 trial classes. You can discuss this during initial contact.",
              },
              {
                q: "What if I need to change tutor?",
                a: "You can switch tutor anytime. We help you find a better match.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer p-6 font-medium text-black text-lg">
                    {item.q}
                    <span className="transition group-open:rotate-180">▼</span>
                  </summary>
                  <div className="px-6 pb-6 pt-0 text-gray-600">{item.a}</div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== NEWSLETTER ==================== */}
      <section className="w-11/12 mx-auto bg-gray-100 py-16 rounded-xl">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl text-black font-bold mb-6">
            Subscribe to Newsletter
          </h2>
          <p className="text-lg text-black mb-8 max-w-2xl mx-auto">
            Get latest tuition jobs, tutor tips & education updates directly in
            your inbox
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 text-black rounded-lg  outline-2 outline-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-indigo-700">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* ==================== FINAL CALL TO ACTION ==================== */}
      <section className="w-11/12 mx-auto px-4 text-center py-5">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Start Your Journey?
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          <Link
            to="/tuition"
            className="px-10 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-indigo-700"
          >
            Find Tuition Now
          </Link>
          <Link
            to="/add-tutors"
            className="px-10 py-4 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-indigo-50"
          >
            Join as Tutor
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
