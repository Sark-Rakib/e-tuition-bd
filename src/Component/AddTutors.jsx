import { useForm } from "react-hook-form";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxios";
import Swal from "sweetalert2";

const AddTutors = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const tutorData = {
      ...data,
      tutorName: user?.displayName,
      tutorEmail: user?.email,
      tutorPhoto: user?.photoURL,
      status: "Pending",
      postedAt: new Date().toISOString(),
    };

    try {
      await axiosSecure.post("/tutors", tutorData);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Tutor profile posted successfully! Admin will review soon.",
        showConfirmButton: false,
        timer: 1500,
      });
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Become a Tutor</h1>
        <p className="text-gray-600 mt-3">
          Create your tutor profile and start getting tuition requests
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-3xl shadow-xl p-8 border border-indigo-100 space-y-7"
      >
        {/* Tutor Name & Photo (Auto-filled) */}
        <div className="flex items-center gap-6 bg-indigo-50 p-6 rounded-2xl">
          <img
            src={
              user?.photoURL ||
              "https://i.ibb.co.com/4p0jH0Z/default-avatar.jpg"
            }
            alt="Tutor"
            className="w-24 h-24 rounded-full ring-4 ring-indigo-200 object-cover"
          />
          <div>
            <h3 className="text-2xl font-bold text-gray-800">
              {user?.displayName}
            </h3>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>

        {/* Education & Experience */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Highest Education <span className="text-red-500">*</span>
            </label>
            <select
              {...register("education", { required: "Education is required" })}
              className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
            >
              <option value="">Select Education</option>
              <option>HSC/Equivalent</option>
              <option>Undergraduate Student</option>
              <option>Bachelor's Degree</option>
              <option>Master's Student</option>
              <option>Master's Degree</option>
              <option>PhD</option>
            </select>
            {errors.education && (
              <p className="text-red-500 text-sm mt-1">
                {errors.education.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Current Status <span className="text-red-500">*</span>
            </label>
            <select
              {...register("currentStatus", {
                required: "Current status is required",
              })}
              className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
            >
              <option value="">Select</option>
              <option>University Student</option>
              <option>Job Holder</option>
              <option>Full-time Tutor</option>
              <option>Other</option>
            </select>
            {errors.currentStatus && (
              <p className="text-red-500 text-sm mt-1">
                {errors.currentStatus.message}
              </p>
            )}
          </div>
        </div>

        {/* Preferred Classes & Subjects */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Preferred Classes <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Class 6-10, SSC, HSC"
              {...register("preferredClasses", {
                required: "Preferred classes required",
              })}
              className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
            />
            {errors.preferredClasses && (
              <p className="text-red-500 text-sm mt-1">
                {errors.preferredClasses.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Subjects You Teach <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Math, Physics, English, Chemistry"
              {...register("subjects", { required: "Subjects are required" })}
              className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
            />
            {errors.subjects && (
              <p className="text-red-500 text-sm mt-1">
                {errors.subjects.message}
              </p>
            )}
          </div>
        </div>

        {/* Location & Medium */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Preferred Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Dhanmondi, Gulshan, Uttara"
              {...register("location", { required: "Location is required" })}
              className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">
                {errors.location.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Teaching Medium <span className="text-red-500">*</span>
            </label>
            <select
              {...register("medium", { required: "Medium is required" })}
              className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
            >
              <option value="">Select Medium</option>
              <option>Bangla Medium</option>
              <option>English Medium</option>
              <option>English Version</option>
              <option>Both</option>
            </select>
            {errors.medium && (
              <p className="text-red-500 text-sm mt-1">
                {errors.medium.message}
              </p>
            )}
          </div>
        </div>

        {/* Expected Salary & Days */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Expected Salary (per month){" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. 10000 - 15000"
              {...register("expectedSalary", {
                required: "Expected salary required",
              })}
              className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
            />
            {errors.expectedSalary && (
              <p className="text-red-500 text-sm mt-1">
                {errors.expectedSalary.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Available Days per Week <span className="text-red-500">*</span>
            </label>
            <select
              {...register("availableDays", {
                required: "Select available days",
              })}
              className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
            >
              <option value="">Select</option>
              {[3, 4, 5, 6, 7].map((d) => (
                <option key={d} value={d}>
                  {d} days
                </option>
              ))}
            </select>
            {errors.availableDays && (
              <p className="text-red-500 text-sm mt-1">
                {errors.availableDays.message}
              </p>
            )}
          </div>
        </div>

        {/* About & Experience */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            About Yourself & Experience <span className="text-red-500">*</span>
          </label>
          <textarea
            rows="6"
            placeholder="Write about your teaching experience, achievements, teaching style, why students should choose you..."
            {...register("about", { required: "This field is required" })}
            className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all outline-none resize-none"
          />
          {errors.about && (
            <p className="text-red-500 text-sm mt-1">{errors.about.message}</p>
          )}
        </div>

        {/* Contact Phone */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Your Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="01xxxxxxxxx"
            {...register("contactPhone", {
              required: "Phone number is required",
              pattern: {
                value: /^01[3-9]\d{8}$/,
                message: "Valid Bangladeshi number required (01xxxxxxxxx)",
              },
            })}
            className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
          />
          {errors.contactPhone && (
            <p className="text-red-500 text-sm mt-1">
              {errors.contactPhone.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center pt-6">
          <button
            type="submit"
            className={`px-12 py-5 rounded-xl text-white font-bold text-lg transition-all transform hover:scale-105 ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-pink-600 hover:shadow-2xl"
            }`}
          >
            Post Tutor
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTutors;
