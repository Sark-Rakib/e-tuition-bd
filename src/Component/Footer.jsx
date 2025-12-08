import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { SiX } from "react-icons/si"; // This is the official NEW X icon (not old Twitter)

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-11/12 mx-auto bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Platform */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">E-TutionBd</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Bangladesh's most trusted platform connecting verified tutors with
              students. Find your perfect home tutor or online teacher with
              transparent payments and real reviews.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                "Home",
                "Tuitions",
                "Tutors",
                "About Us",
                "Contact",
                "Privacy Policy",
                "Terms of Service",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-pink-300 transition-colors duration-300 text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <span className="font-medium">Email:</span>
                etuitionbd@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <span className="font-medium">Phone:</span>
                +880 1745762857
              </li>
              <li className="flex items-center gap-2">
                <span className="font-medium">Address:</span>
                Dhaka, Bangladesh
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-pink-600 transition-all duration-300 hover:scale-110"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-pink-600 transition-all duration-300 hover:scale-110"
              >
                <SiX size={20} /> {/* Official NEW X Logo */}
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-pink-600 transition-all duration-300 hover:scale-110"
              >
                <FaLinkedinIn size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-pink-600 transition-all duration-300 hover:scale-110"
              >
                <FaYoutube size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-white/20 mt-10 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {currentYear} E-TutionBD. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
