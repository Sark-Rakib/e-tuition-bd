import React from "react";
import { Link } from "react-router";

const TermService = () => {
  return (
    <div>
      <section className="w-11/12 mx-auto mt-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center text-indigo-800">
            Terms of Service
          </h2>

          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>Last updated: January 12, 2026</p>

            <p>
              Welcome to eTuitionBd. These Terms of Service ("Terms") govern
              your access to and use of our website, mobile applications, and
              services (collectively, the "Service").
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-3">
              1. Acceptance of Terms
            </h3>
            <p>
              By accessing or using the Service you agree to be bound by these
              Terms. If you do not agree, please do not use our Service.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-3">
              2. User Accounts
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must provide accurate and complete information</li>
              <li>
                You are responsible for maintaining the confidentiality of your
                account
              </li>
              <li>All tutors must pass our verification process</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-3">3. User Conduct</h3>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Post false, misleading or fraudulent information</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Use the platform for any illegal purpose</li>
              <li>
                Attempt to gain unauthorized access to any part of the Service
              </li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-3">
              4. Payments & Fees
            </h3>
            <p>
              eTuitionBd may charge service fees for certain transactions. All
              payments are processed through secure third-party payment
              gateways. Fees and refund policies are clearly stated before any
              transaction.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-3">5. Termination</h3>
            <p>
              We may suspend or terminate your account if you violate these
              Terms, engage in fraudulent activity, or for any other reason at
              our sole discretion.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-3">
              6. Limitation of Liability
            </h3>
            <p>
              eTuitionBd is a platform connecting students and tutors. We are
              not responsible for the quality of teaching, behavior of users, or
              any disputes between users. Use the platform at your own risk.
            </p>

            <p className="mt-8 text-sm text-gray-500">
              For the complete and legally binding Terms of Service, please
              visit our dedicated
              <Link
                to="/privacy-policy"
                className="text-indigo-600 hover:underline ml-1"
              >
                Privacy Policy page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermService;
