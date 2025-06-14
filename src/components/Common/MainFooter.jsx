import {
  FaFacebook,
  FaYoutube,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaLinkedin,
  FaGithub,
  FaWhatsapp,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const MainFooter = () => {
  const year = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <FaFacebook className="text-blue-600" />,
      link: "https://www.facebook.com/saideehasan99",
      name: "Facebook",
    },
    {
      icon: <FaLinkedin className="text-blue-500" />,
      link: "https://www.linkedin.com/in/saidee-hasan",
      name: "LinkedIn",
    },
    {
      icon: <FaYoutube className="text-red-600" />,
      link: "https://www.youtube.com/@saidee-hasan",
      name: "YouTube",
    },
    {
      icon: <FaGithub className="text-gray-800" />,
      link: "https://github.com/saidee-hasan",
      name: "GitHub",
    },
    {
      icon: <FaWhatsapp className="text-green-500" />,
      link: "https://wa.me/+8801764984545",
      name: "WhatsApp",
    },
    {
      icon: <FaInstagram className="text-pink-600" />,
      link: "#",
      name: "Instagram",
    },
    {
      icon: <FaTwitter className="text-blue-400" />,
      link: "#",
      name: "Twitter",
    },
  ];

  const siteLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Wishlist", path: "/wishlist" },
    { name: "My Cart", path: "/cart" },
    { name: "Account", path: "/dashboard" },
    {
      name: "Create Channel",
      path: "https://seller-center-32880.web.app/",
      external: true,
    },
  ];

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="text-gray-500" />,
      text: "Gaibandha 1236",
    },
    {
      icon: <FaEnvelope className="text-gray-500" />,
      text: "mdsaideehasan@gmail.com",
    },
    {
      icon: <FaPhoneAlt className="text-gray-500" />,
      text: "+8801764984545",
    },
  ];

  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {siteLinks.map((item) => (
                <li key={item.name}>
                  {item.external ? (
                    <a
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600 transition-colors flex items-center"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      to={item.path}
                      className="text-gray-600 hover:text-blue-600 transition-colors flex items-center"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h3>
            <ul className="space-y-3">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-0.5">{item.icon}</span>
                  <span className="text-gray-600">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + Newsletter */}
          <div className="md:col-span-1 lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect With Us</h3>
            <div className="flex flex-wrap gap-4 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <div>
              <h4 className="text-gray-900 font-medium mb-2">Subscribe to Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <img src="/logo.png" alt="Logo" className="h-8 mr-2" />
              <span className="text-gray-900 font-medium">Captake</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-500 text-sm">&copy; {year} Captake. All rights reserved.</p>
              <p className="text-gray-500 text-sm mt-1">Elite Author on Captake.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
