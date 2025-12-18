// src/pages/dashboard/student/AddTuitionForm.jsx
import { useForm } from "react-hook-form";
import useAxiosSecure from "../Hooks/useAxios";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";

// Basic validation rules (using React Hook Form built-in)
const tuitionSchema = {
  title: { required: "Title is required" },
  studentClass: { required: "Please select your class" },
  subject: { required: "Subject is required" },
  location: { required: "Location is required" },
  salary: {
    required: "Salary is required",
    pattern: { value: /^\d+$/, message: "Salary must be a number" },
  },
  daysPerWeek: { required: "Select days per week" },
  tutoringTime: { required: "Preferred time is required" },
  tutorGender: { required: "Please select preferred tutor gender" },
  requirements: { required: "Requirements are required" },
  contactPhone: {
    required: "Phone number is required",
    pattern: {
      value: /^01[3-9]\d{8}$/,
      message: "Valid BD phone number required (01xxxxxxxxx)",
    },
  },
};

const AddTuitionForm = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const tuitionData = {
      ...data,
      studentName: user?.displayName,
      studentEmail: user?.email,
      studentPhoto: user?.photoURL,
      status: "Pending", // Admin will approve
      postedAt: new Date().toISOString(),
    };

    try {
      await axiosSecure.post("/tuitions", tuitionData);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Tuition posted successfully! Admin will review it soon.",
        showConfirmButton: false,
        timer: 1500,
      });
      reset();
    } catch {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Tuition post has been failed",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Post a New Tuition</h1>
        <p className="text-gray-600 mt-3">
          Fill the form below to find your perfect tutor
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-3xl shadow-xl p-8 border border-indigo-100 space-y-7"
      >
        {/* Title */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Tuition Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Need Science Tutor for Class 9 (Gulshan)"
            {...register("title", tuitionSchema.title)}
            className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Class & Subject - Side by side */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Student Class <span className="text-red-500">*</span>
            </label>
            <select
              {...register("studentClass", tuitionSchema.studentClass)}
              className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
            >
              <option value="">Select Class</option>
              {[
                "Class 1-5",
                "Class 6-8",
                "Class 9-10",
                "SSC",
                "HSC",
                "Admission Test",
                "University",
                "English Medium (O/A Level)",
              ].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errors.studentClass && (
              <p className="text-red-500 text-sm mt-1">
                {errors.studentClass.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Subject(s) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Math, Physics, Chemistry"
              {...register("subject", tuitionSchema.subject)}
              className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
            />
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1">
                {errors.subject.message}
              </p>
            )}
          </div>
        </div>

        {/* Location & Salary */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Dhanmondi, Uttara, Mirpur"
              {...register("location", tuitionSchema.location)}
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
              Salary (per month) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. 8000"
              {...register("salary", tuitionSchema.salary)}
              className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
            />
            {errors.salary && (
              <p className="text-red-500 text-sm mt-1">
                {errors.salary.message}
              </p>
            )}
          </div>
        </div>

        {/* Schedule */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Days per Week <span className="text-red-500">*</span>
            </label>
            <select
              {...register("daysPerWeek", tuitionSchema.daysPerWeek)}
              className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
            >
              <option value="">Select</option>
              {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                <option key={d} value={d}>
                  {d} days
                </option>
              ))}
            </select>
            {errors.daysPerWeek && (
              <p className="text-red-500 text-sm mt-1">
                {errors.daysPerWeek.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Preferred Time <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. 5:00 PM - 7:00 PM"
              {...register("tutoringTime", tuitionSchema.tutoringTime)}
              className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
            />
            {errors.tutoringTime && (
              <p className="text-red-500 text-sm mt-1">
                {errors.tutoringTime.message}
              </p>
            )}
          </div>
        </div>

        {/* Gender Preferences */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Student Gender
            </label>
            <select
              {...register("studentGender")}
              className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Preferred Tutor Gender <span className="text-red-500">*</span>
            </label>
            <select
              {...register("tutorGender", tuitionSchema.tutorGender)}
              className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
            >
              <option value="">Any</option>
              <option>Male</option>
              <option>Female</option>
            </select>
            {errors.tutorGender && (
              <p className="text-red-500 text-sm mt-1">
                {errors.tutorGender.message}
              </p>
            )}
          </div>
        </div>

        {/* Requirements */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Requirements & Details <span className="text-red-500">*</span>
          </label>
          <textarea
            rows="5"
            placeholder="Describe student level, weak subjects, expectations from tutor..."
            {...register("requirements", tuitionSchema.requirements)}
            className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all outline-none resize-none"
          />
          {errors.requirements && (
            <p className="text-red-500 text-sm mt-1">
              {errors.requirements.message}
            </p>
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
            {...register("contactPhone", tuitionSchema.contactPhone)}
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
            Post Tuition
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTuitionForm;
