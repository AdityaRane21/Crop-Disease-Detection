import React from "react";
import { motion } from "framer-motion";
import { 
  Leaf, 
  Shield, 
  Zap, 
  Users, 
  Globe, 
  Award,
  BarChart2,
  Clock
} from "lucide-react";

const About = () => {
  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Advanced AI Technology",
      description: "Our system uses state-of-the-art deep learning algorithms trained on millions of plant disease images."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Real-time Detection",
      description: "Get instant results with our fast and accurate disease detection system."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Expert Support",
      description: "Access to agricultural experts and detailed treatment recommendations."
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Global Coverage",
      description: "Support for multiple crops and diseases across different regions."
    }
  ];

  const stats = [
    { icon: <Award className="h-6 w-6" />, value: "99%", label: "Accuracy Rate" },
    { icon: <BarChart2 className="h-6 w-6" />, value: "50K+", label: "Scans Performed" },
    { icon: <Users className="h-6 w-6" />, value: "10K+", label: "Happy Farmers" },
    { icon: <Clock className="h-6 w-6" />, value: "< 5s", label: "Detection Time" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Revolutionizing Crop Disease Detection
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Using cutting-edge AI technology to help farmers protect their crops and increase yields
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              To empower farmers with advanced technology that helps them detect and treat crop diseases early,
              leading to better yields and sustainable farming practices.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="text-green-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-green-600 mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A diverse group of experts in agriculture, AI, and software development
              working together to revolutionize crop disease detection.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8">
              Join thousands of farmers already using our technology
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Free Trial
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About; 