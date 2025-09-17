'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Linkedin, Youtube, Twitter } from 'lucide-react'
import { getContactInfo, ContactInfo } from '@/lib/generic'

export default function Footer() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const fetchedContactInfo = await getContactInfo()
        setContactInfo(fetchedContactInfo)
      } catch (err) {
        console.error('Error fetching contact info for footer:', err)
      }
    }

    fetchContactInfo()
  }, [])
  return (
    <footer className="bg-[#003366] text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="font-merriweather text-xl font-bold mb-6">Contact info</h3>
            <div className="space-y-3 font-inter">
              <p>Faculty of Engineering</p>
              <p>Alexandria University</p>
              <p>CSMI Building</p>
              <p>
                <Link
                  href={`mailto:${contactInfo?.email || 'email@email.com'}`}
                  className="hover:text-[#FDB813] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 focus:ring-offset-[#003366] rounded"
                >
                  {contactInfo?.email || 'email@email.com'}
                </Link>
              </p>
              <p>{contactInfo?.phoneNumber || '+201001101010'}</p>
              <p>
                <Link 
                  href="/contact" 
                  className="hover:text-[#FDB813] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 focus:ring-offset-[#003366] rounded"
                >
                  Contact form
                </Link>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-merriweather text-xl font-bold mb-6">Quick Links</h3>
            <div className="space-y-3 font-inter">
              <p><Link href="/about" className="hover:text-[#FDB813] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 focus:ring-offset-[#003366] rounded">About us</Link></p>
              <p><Link href="/media" className="hover:text-[#FDB813] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 focus:ring-offset-[#003366] rounded">Media</Link></p>
              <p><Link href="/people" className="hover:text-[#FDB813] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 focus:ring-offset-[#003366] rounded">People</Link></p>
              <p><Link href="/research" className="hover:text-[#FDB813] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 focus:ring-offset-[#003366] rounded">Research</Link></p>
              <p><Link href="/publication" className="hover:text-[#FDB813] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 focus:ring-offset-[#003366] rounded">Publication</Link></p>
              <p><Link href="/opportunities" className="hover:text-[#FDB813] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 focus:ring-offset-[#003366] rounded">Opportunities</Link></p>
              <p><Link href="/engagements" className="hover:text-[#FDB813] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 focus:ring-offset-[#003366] rounded">Engagement</Link></p>
              <p><Link href="/contact" className="hover:text-[#FDB813] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 focus:ring-offset-[#003366] rounded">Contacts</Link></p>
            </div>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="font-merriweather text-xl font-bold mb-6">Follow us</h3>
            <p className="font-inter mb-6 opacity-90">
              Stay connected with our latest research and updates through our social media channels and newsletter.
            </p>
            <div className="flex space-x-4">
              {contactInfo?.facebook && (
                <Link
                  href={contactInfo.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 rounded-xl hover:bg-[#FDB813] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 focus:ring-offset-[#003366] transform hover:scale-110"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook size={20} />
                </Link>
              )}
              {contactInfo?.linkedin && (
                <Link
                  href={contactInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 rounded-xl hover:bg-[#FDB813] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 focus:ring-offset-[#003366] transform hover:scale-110"
                  aria-label="Follow us on LinkedIn"
                >
                  <Linkedin size={20} />
                </Link>
              )}
              {contactInfo?.youtube && (
                <Link
                  href={contactInfo.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 rounded-xl hover:bg-[#FDB813] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 focus:ring-offset-[#003366] transform hover:scale-110"
                  aria-label="Follow us on YouTube"
                >
                  <Youtube size={20} />
                </Link>
              )}
              {contactInfo?.twitter && (
                <Link
                  href={contactInfo.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 rounded-xl hover:bg-[#FDB813] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:ring-offset-2 focus:ring-offset-[#003366] transform hover:scale-110"
                  aria-label="Follow us on Twitter"
                >
                  <Twitter size={20} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/20 bg-[#1A1A1A]">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="flex items-center space-x-4">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/opst-logo.svg`}
                alt="OPST Lab"
                width={80}
                height={30}
                className="h-8 w-auto"
              />
              <span className="font-inter text-sm opacity-75">
                Copyright © 2025 OPST Lab. All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
