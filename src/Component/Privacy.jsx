import React from "react";
import { Link } from "react-router";

const Privacy = () => {
  return (
    <div>
      <section className="w-11/12 mx-auto mt-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center text-indigo-800">
            Privacy Policy
          </h2>

          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>Last updated: January 12, 2026</p>

            <p>
              eTuitionBd ("we", "us", or "our") is committed to protecting your
              privacy. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you visit our
              website or use our services.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-3">
              1. Information We Collect
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Personal Information: name, email, phone number, photo, location
              </li>
              <li>
                Education & Profile Data: class, subjects, qualifications,
                experience
              </li>
              <li>
                Payment Information (handled securely by our third-party
                processor)
              </li>
              <li>
                Technical Data: IP address, browser type, device information
              </li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-3">
              2. How We Use Your Information
            </h3>
            <p>We use the collected information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, maintain and improve our services</li>
              <li>Match students with suitable tutors</li>
              <li>Process payments and transactions</li>
              <li>
                Send important updates, notifications and support messages
              </li>
              <li>Prevent fraud and ensure platform safety</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-3">
              3. Information Sharing
            </h3>
            <p>
              We do NOT sell your personal information. We may share your data
              only with:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Tutors and students (only necessary profile information for
                matching)
              </li>
              <li>Payment processors (encrypted & secure)</li>
              <li>Legal authorities when required by law</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-3">4. Your Rights</h3>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access, update or delete your personal data</li>
              <li>Withdraw consent where applicable</li>
              <li>Request data portability</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, please contact us at:{" "}
              <strong>support@etuitionbd.com</strong>
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-3">
              5. Data Security
            </h3>
            <p>
              We implement appropriate technical and organizational measures to
              protect your personal data against unauthorized access,
              alteration, disclosure or destruction.
            </p>

            <p className="mt-8 text-sm text-gray-500">
              For the full and most up-to-date Privacy Policy, please visit our
              dedicated
              <Link
                to="/terms-service"
                className="text-indigo-600 hover:underline ml-1"
              >
                Terms of Service page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
