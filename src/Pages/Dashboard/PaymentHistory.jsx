import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxios";
import Loading from "../../Component/Loading";

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
  });

  if (isLoading) return <Loading></Loading>;

  if (isError)
    return (
      <p className="p-6 text-center text-red-500">Error fetching payments</p>
    );

  if (payments.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-xl text-gray-600">No payments yet</p>
      </div>
    );
  }

  return (
    <div className="p-4 text-black md:p-6 lg:p-8">
      <h1 className="text-3xl text-primary font-bold text-center mb-8">
        Payment History
      </h1>

      <div className="hidden lg:block overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Tutor Name
              </th>
              <th className="border border-gray-300 px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Email
              </th>
              <th className="border border-gray-300 px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Amount
              </th>
              <th className="border border-gray-300 px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Date
              </th>
              <th className="border border-gray-300 px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p._id} className="hover:bg-gray-50 transition">
                <td className="border border-gray-300 px-6 py-4">
                  {p.tutorName}
                </td>
                <td className="border border-gray-300 px-6 py-4">
                  {p.tutorEmail}
                </td>
                <td className="border border-gray-300 px-6 py-4 font-medium">
                  ${p.amount}
                </td>
                <td className="border border-gray-300 px-6 py-4">
                  {new Date(p.createdAt).toLocaleDateString("en-GB")}
                </td>
                <td className="border border-gray-300 px-6 py-4">
                  <span className="inline-block px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="block lg:hidden space-y-4">
        {payments.map((p) => (
          <div
            key={p._id}
            className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Tutor Name</p>
                  <p className="text-lg font-semibold">{p.tutorName}</p>
                </div>
                <span className="inline-block px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                  {p.status}
                </span>
              </div>

              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-base break-all">{p.tutorEmail}</p>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className="text-xl font-bold text-gray-800">${p.amount}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="text-base font-medium">
                    {new Date(p.createdAt).toLocaleDateString("en-GB")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory;
