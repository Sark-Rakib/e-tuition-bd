import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../Hooks/useAxios";
import TuitionCard from "../Component/TuitionCard";
import Loading from "../Component/Loading";

const Tuitions = () => {
  const axiosSecure = useAxiosSecure();

  const { data: tuitions = [], isLoading } = useQuery({
    queryKey: ["tuitions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tuitions");
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;
  const approvedTuitions = tuitions.filter((t) => t.status === "Approved");

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        Available Tuition
      </h1>

      {approvedTuitions.length === 0 ? (
        <p className="text-center text-xl text-gray-600">
          No tuition posted yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {approvedTuitions.map((tuition) => (
            <TuitionCard key={tuition._id} tuition={tuition} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Tuitions;
