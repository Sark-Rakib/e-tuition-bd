// src/pages/Tutors.jsx
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxios";
import TutorCard from "../Component/TutorCard";

const Tutors = () => {
  const axiosSecure = useAxiosSecure();

  const { data: tutors = [], isLoading } = useQuery({
    queryKey: ["tutors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tutors");
      return res.data;
    },
  });

  if (isLoading)
    return <div className="text-center py-10">Loading tutors...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10">Available Tutors</h1>

      {tutors.length === 0 ? (
        <p className="text-center text-xl text-gray-600">
          No tutors available yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutors.map((tutor) => (
            <TutorCard key={tutor._id} tutor={tutor} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Tutors;
