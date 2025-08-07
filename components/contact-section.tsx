'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Facebook, Linkedin, Youtube, Twitter, MapPin, Mail, Phone, Send, User, MessageSquare } from 'lucide-react'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
    alert('Thank you for your message! We will get back to you soon.')
  }

  return (
    <section className="bg-[#F8F8F8] py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h1 className="font-merriweather text-5xl font-bold text-[#1A1A1A] mb-4">
            Contact Us
          </h1>
          <div className="w-20 h-1 bg-[#FDB813] mx-auto mb-6"></div>
          <p className="font-inter text-lg text-[#555555] max-w-2xl mx-auto leading-relaxed">
            Feel free to contact us and we will get back to you as soon as possible. 
            We're here to help with any questions about our research, programs, or collaborations.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-7xl mx-auto">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 md:p-10 border border-gray-100 group relative overflow-hidden">
              {/* Overlay Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FDB813]/5 to-[#3399FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-[#FDB813] rounded-2xl flex items-center justify-center shadow-lg">
                    <Send size={24} className="text-[#003366]" />
                  </div>
                  <h2 className="font-merriweather text-2xl font-bold text-[#1A1A1A]">
                    Send us a Message
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="font-inter text-sm font-medium text-[#1A1A1A] flex items-center gap-2">
                      <User size={16} className="text-[#FDB813]" />
                      Full Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FDB813] focus:border-[#FDB813] focus:outline-none font-inter placeholder-gray-400 transition-all duration-200 shadow-sm hover:shadow-md"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="font-inter text-sm font-medium text-[#1A1A1A] flex items-center gap-2">
                      <Mail size={16} className="text-[#3399FF]" />
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FDB813] focus:border-[#FDB813] focus:outline-none font-inter placeholder-gray-400 transition-all duration-200 shadow-sm hover:shadow-md"
                    />
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className="font-inter text-sm font-medium text-[#1A1A1A] flex items-center gap-2">
                      <Phone size={16} className="text-[#003366]" />
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FDB813] focus:border-[#FDB813] focus:outline-none font-inter placeholder-gray-400 transition-all duration-200 shadow-sm hover:shadow-md"
                    />
                  </div>

                  {/* Subject Field */}
                  <div className="space-y-2">
                    <label htmlFor="subject" className="font-inter text-sm font-medium text-[#1A1A1A] flex items-center gap-2">
                      <MessageSquare size={16} className="text-[#FDB813]" />
                      Subject *
                    </label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      placeholder="What is this regarding?"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FDB813] focus:border-[#FDB813] focus:outline-none font-inter placeholder-gray-400 transition-all duration-200 shadow-sm hover:shadow-md"
                    />
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="font-inter text-sm font-medium text-[#1A1A1A]">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Tell us more about your inquiry..."
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FDB813] focus:border-[#FDB813] focus:outline-none font-inter placeholder-gray-400 resize-none transition-all duration-200 shadow-sm hover:shadow-md"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit"
                    className="w-full bg-[#003366] hover:bg-[#003366]/90 text-white font-inter font-semibold py-4 text-lg rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:ring-2 focus:ring-[#003366] focus:ring-offset-2 flex items-center justify-center gap-2"
                  >
                    <Send size={20} />
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Visit Us Card */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FDB813]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#FDB813] rounded-2xl flex items-center justify-center mr-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <MapPin size={24} className="text-[#003366]" />
                  </div>
                  <h3 className="font-merriweather text-xl font-bold text-[#1A1A1A]">
                    Visit Us
                  </h3>
                </div>
                <div className="font-inter text-[#555555] leading-relaxed pl-16">
                  <p className="font-medium text-[#1A1A1A]">Faculty of Engineering</p>
                  <p>Alexandria University</p>
                  <p>CSMI Building</p>
                </div>
              </div>
            </div>

            {/* Contact Details Card */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#3399FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-[#3399FF] rounded-2xl flex items-center justify-center mr-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <Phone size={24} className="text-white" />
                  </div>
                  <h3 className="font-merriweather text-xl font-bold text-[#1A1A1A]">
                    Get in Touch
                  </h3>
                </div>
                <div className="space-y-4 pl-16">
                  <div className="flex items-center">
                    <Mail size={18} className="text-[#555555] mr-3" />
                    <a 
                      href="mailto:opst@alexu.edu.eg" 
                      className="font-inter text-[#555555] hover:text-[#003366] transition-colors"
                    >
                      opst@alexu.edu.eg
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Phone size={18} className="text-[#555555] mr-3" />
                    <a 
                      href="tel:+201000101001" 
                      className="font-inter text-[#555555] hover:text-[#003366] transition-colors"
                    >
                      +201000101001
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Card */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#003366]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              <div className="relative z-10">
                <h3 className="font-merriweather text-xl font-bold text-[#1A1A1A] mb-4">
                  Follow Us
                </h3>
                <p className="font-inter text-[#555555] text-sm mb-6 leading-relaxed">
                  Stay connected with our latest research updates and news
                </p>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="w-12 h-12 bg-[#1877F2] rounded-2xl flex items-center justify-center text-white hover:bg-[#1877F2]/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:ring-offset-2"
                    aria-label="Facebook"
                  >
                    <Facebook size={20} />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-[#0A66C2] rounded-2xl flex items-center justify-center text-white hover:bg-[#0A66C2]/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#0A66C2] focus:ring-offset-2"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-[#FF0000] rounded-2xl flex items-center justify-center text-white hover:bg-[#FF0000]/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:ring-offset-2"
                    aria-label="YouTube"
                  >
                    <Youtube size={20} />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-[#1DA1F2] rounded-2xl flex items-center justify-center text-white hover:bg-[#1DA1F2]/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] focus:ring-offset-2"
                    aria-label="Twitter"
                  >
                    <Twitter size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
