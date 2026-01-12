// src/pages/Dashboard/DashboardHome.jsx
import React, { useEffect, useState } from "react";

import {
  FaUsers,
  FaChalkboardTeacher,
  FaMoneyBillWave,
  FaHourglassHalf,
} from "react-icons/fa";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import useAxiosSecure from "../../Hooks/useAxios";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
);

const DashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalStudents: 25,
    totalTutors: 21,
    pendingTuitions: 6,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes] = await Promise.all([
          axiosSecure.get("/dashboard/stats"),
          axiosSecure.get("/dashboard/recent-tuitions?limit=6"),
        ]);

        setStats(statsRes.data);
      } catch (err) {
        console.error("Dashboard data error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [axiosSecure]);

  // Chart Data - should come from real API in production
  const applicationsTrend = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "New Applications",
        data: [18, 24, 32, 45, 58, 67, 72, 68, 55, 48, 39, 52],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.15)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const statusDistribution = {
    labels: ["Approved", "Pending", "Rejected"],
    datasets: [
      {
        data: [15, 6, 4],
        backgroundColor: [
          "#10b981", // green
          "#f59e0b", // amber
          "#ef4444", // red
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-figure text-primary">
              <FaUsers className="text-3xl opacity-70" />
            </div>
            <div className="stat-title">Total Students</div>
            <div className="stat-value text-primary">
              {stats.totalStudents.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaChalkboardTeacher className="text-3xl opacity-70" />
            </div>
            <div className="stat-title">Active Tutors</div>
            <div className="stat-value text-secondary">
              {stats.totalTutors.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-figure text-warning">
              <FaHourglassHalf className="text-3xl opacity-70" />
            </div>
            <div className="stat-title">Pending Tuitions</div>
            <div className="stat-value text-warning">
              {stats.pendingTuitions}
            </div>
          </div>
        </div>

        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-figure text-success">
              <FaMoneyBillWave className="text-3xl opacity-70" />
            </div>
            <div className="stat-title">Total Revenue</div>
            <div className="stat-value text-success">
              ৳{stats.totalRevenue.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Line Chart - Applications over time */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Application Trend (Last 12 Months)</h2>
            <div className="h-80">
              <Line data={applicationsTrend} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Pie Chart - Tuition Status */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Current Tuition Status</h2>
            <div className="h-80 flex items-center justify-center">
              <Pie data={statusDistribution} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
