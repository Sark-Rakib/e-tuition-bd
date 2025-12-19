import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxios";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: payments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
    refetchInterval: 5000, // optional: auto-refresh every 5 seconds
  });

  if (isLoading) return <p className="p-4">Loading payments...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error fetching payments</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Payment History</h1>
      {payments.length === 0 ? (
        <p>No payments yet</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2">Tutor Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p._id} className="text-center">
                <td className="border px-4 py-2">{p.tutorName}</td>
                <td className="border px-4 py-2">{p.tutorEmail}</td>
                <td className="border px-4 py-2">${p.amount}</td>
                <td className="border px-4 py-2">
                  {new Date(p.createdAt).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentHistory;
