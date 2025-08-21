import React from 'react'
import { Link } from 'react-router'
import { 
  Users, 
  Target, 
  Award, 
  Heart, 
  Globe, 
  Zap,
  Shield,
  Truck,
  Star,
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  Home
} from 'lucide-react'

const AboutPage = () => {
  const stats = [
    { number: "50K+", label: "Happy Customers", icon: <Users className="w-6 h-6" /> },
    { number: "1000+", label: "Products Sold", icon: <Award className="w-6 h-6" /> },
    { number: "15+", label: "Countries Served", icon: <Globe className="w-6 h-6" /> },
    { number: "99.9%", label: "Customer Satisfaction", icon: <Star className="w-6 h-6" /> }
  ]

  const values = [
    {
      icon: <Heart className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Customer First",
      description: "Every decision we make starts with our customers in mind. Your satisfaction is our top priority, and we go above and beyond to exceed your expectations."
    },
    {
      icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Quality Assurance",
      description: "We carefully curate every product in our catalog, ensuring that only the highest quality items reach our customers. No compromises on quality."
    },
    {
      icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Innovation",
      description: "We embrace new technologies and constantly improve our platform to provide you with the most seamless shopping experience possible."
    },
    {
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Transparency",
      description: "Honest pricing, clear policies, and transparent communication. We believe in building trust through openness and reliability."
    }
  ]

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://img.freepik.com/premium-photo/cheerful-woman-ceo-isolated-white-background-caucasian-woman-ceo-studio_474717-98529.jpg",
      description: "With 15+ years in e-commerce, Sarah founded Elegant Stores with a vision to make quality products accessible to everyone."
    },
    {
      name: "Michael Chen",
      role: "Head of Product",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      description: "Michael leads our product curation team, ensuring every item meets our high standards for quality and value."
    },
    {
      name: "Emily Rodriguez",
      role: "Customer Success Manager",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      description: "Emily champions our customer-first approach, leading initiatives that put your shopping experience at the center of everything we do."
    },
    {
      name: "David Park",
      role: "Head of Technology",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      description: "David oversees our platform development, ensuring Elegant Stores remains fast, secure, and user-friendly."
    }
  ]

  const milestones = [
    { year: "2020", title: "Company Founded", description: "Elegant Stores was born from a simple idea: make quality products accessible to everyone." },
    { year: "2021", title: "10K Customers", description: "Reached our first major milestone with 10,000 satisfied customers across the country." },
    { year: "2022", title: "International Expansion", description: "Expanded our shipping to 15+ countries, bringing Elegant Stores to a global audience." },
    { year: "2023", title: "Award Recognition", description: "Recognized as 'Best E-commerce Platform' by the Digital Commerce Awards." },
    { year: "2024", title: "50K+ Happy Customers", description: "Celebrating over 50,000 customers who trust Elegant Stores for their shopping needs." }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 space-y-12 sm:space-y-16 lg:space-y-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-black via-yellow-500 to-white rounded-2xl sm:rounded-3xl text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
            <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full text-sm">
                <Home className="w-4 h-4" />
                About Elegant Stores
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                We're on a mission to
                <span className="block bg-black bg-clip-text text-transparent mt-2">
                  revolutionize shopping
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
                Founded in 2020, Elegant Stores has grown from a small startup to a trusted e-commerce platform 
                serving thousands of customers worldwide. We believe shopping should be simple, secure, and satisfying.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 hover:scale-105 shadow-lg"
                >
                  Shop Our Products
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </div>
            </div>
          </div>
          
          {/* Floating Elements - Hidden on very small screens */}
          <div className="hidden sm:block absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
          <div className="hidden sm:block absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full animate-pulse delay-1000"></div>
          <div className="hidden lg:block absolute top-1/2 right-1/4 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-500"></div>
        </section>

        {/* Stats Section */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 text-slate-800 font-semibold text-sm sm:text-base">
              <Award className="w-4 h-4 sm:w-5 sm:h-5" />
              Our Impact in Numbers
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              These numbers represent real people
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              and real relationships we've built over the years
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-3 sm:space-y-4 p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl hover:bg-gray-50 transition-colors duration-200 shadow-sm">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gray-900 text-amber-400 rounded-xl sm:rounded-2xl">
                  {stat.icon}
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">{stat.number}</div>
                <div className="text-gray-600 text-xs sm:text-sm lg:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Our Story Section */}
        <section className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 text-slate-800 font-semibold text-sm sm:text-base">
              <Award className="w-4 h-4 sm:w-5 sm:h-5" />
              Our Story
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              From idea to industry leader
            </h2>
            
            <div className="space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
              <p>
                Elegant Stores started in a small garage with a big dream: to create an online shopping 
                experience that puts customers first. What began as a simple idea has grown into 
                a platform trusted by thousands of customers worldwide.
              </p>
              <p>
                We noticed that online shopping often felt impersonal and unreliable. So we set 
                out to change that by building a platform where quality, transparency, and customer 
                satisfaction aren't just promises – they're guarantees.
              </p>
              <p>
                Today, we're proud to be more than just an e-commerce site. We're a community of 
                people who believe that great products and exceptional service should be accessible 
                to everyone, everywhere.
              </p>
            </div>
            
            <Link 
              to="/products"
              className="inline-flex items-center gap-2 bg-black text-amber-400 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Shop Our Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="relative order-1 lg:order-2">
            <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl sm:rounded-3xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop" 
                alt="Elegant Stores office space"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-xl border border-gray-100">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-gray-900">2020</div>
                <div className="text-xs sm:text-sm text-gray-600">Founded</div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="space-y-6 sm:space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Our Core Values</h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              These principles guide every decision we make and every interaction we have
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center space-y-4 p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl hover:bg-gray-50 transition-colors duration-200 shadow-sm">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gray-900 text-amber-400 rounded-xl sm:rounded-2xl">
                  {value.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <section className="space-y-8 sm:space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Our Journey</h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Key milestones that have shaped Elegant Stores into what it is today
            </p>
          </div>
          
          {/* Mobile Timeline */}
          <div className="block lg:hidden space-y-6">
            {milestones.map((milestone, index) => (
              <div key={index} className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
                <div className="text-gray-900 font-bold text-lg mb-2">{milestone.year}</div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                <p className="text-gray-600 text-sm">{milestone.description}</p>
              </div>
            ))}
          </div>

          {/* Desktop Timeline */}
          <div className="hidden lg:block relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-200"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-900 rounded-full border-4 border-white shadow-lg z-10"></div>
                  
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                      <div className="text-gray-900 font-bold text-lg mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600 text-sm">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="space-y-8 sm:space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Meet Our Team</h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              The passionate people behind Elegant Stores who work every day to make your experience better
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center space-y-4 group bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="relative mx-auto w-24 h-24 sm:w-32 sm:h-32 rounded-xl sm:rounded-2xl overflow-hidden bg-gray-100">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-slate-800 font-medium text-sm sm:text-base">{member.role}</p>
                  <p className="text-gray-600 text-xs sm:text-sm mt-2 leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-black via-gray-900 to-yellow-500 rounded-2xl sm:rounded-3xl text-white p-6 sm:p-8 lg:p-12">
          <div className="text-center space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">Ready to Join Our Community?</h2>
            <p className="text-amber-100 text-base sm:text-lg max-w-2xl mx-auto">
              Discover amazing products, enjoy exceptional service, and become part of the Elegant Stores family today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 hover:scale-105 shadow-lg"
              >
                Start Shopping
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-white/30 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Get in Touch
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AboutPage