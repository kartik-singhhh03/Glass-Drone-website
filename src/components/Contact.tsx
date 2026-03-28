import { ArrowRight, Mail, Phone, MapPin, Clock, UploadCloud } from 'lucide-react';
import SectionWrapper from './ui/SectionWrapper';
import SectionHeading from './ui/SectionHeading';
import Card from './ui/Card';
import Button from './ui/Button';

const Contact = () => {
  return (
    <SectionWrapper id="contact" bg="light">
      <SectionHeading 
        badge="Ready to start?"
        title="Get an Exact Quote"
        subtitle="Fill out your property details below. Our team maps your building using satellite data and provides an accurate estimate rapidly."
        className="mb-16"
      />
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* Contact Info Sidebar */}
        <div className="w-full lg:w-5/12">
          <div className="space-y-6 lg:space-y-10 w-full lg:sticky lg:top-32">
            
            <Card padding="md" hover={false} className="border border-gray-100 flex items-start gap-6 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-blue-accent/10 flex items-center justify-center text-blue-accent flex-shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-dark/50 text-xs font-bold uppercase tracking-wider mb-2">Call Us Directly</p>
                <p className="text-dark font-bold text-xl md:text-2xl hover:text-blue-accent cursor-pointer transition-colors">+372 550 3644</p>
                <p className="text-dark/60 text-sm mt-1">Available Mon-Fri, 9am - 6pm</p>
              </div>
            </Card>

            <Card padding="md" hover={false} className="border border-gray-100 flex items-start gap-6 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-blue-accent/10 flex items-center justify-center text-blue-accent flex-shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-dark/50 text-xs font-bold uppercase tracking-wider mb-2">Email Us</p>
                <p className="text-dark font-bold text-xl md:text-2xl hover:text-blue-accent cursor-pointer transition-colors w-max">info@glassdrone.ee</p>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-[2rem] border border-gray-100 flex flex-col items-center text-center shadow-sm">
                <MapPin className="text-blue-accent mb-3" size={28} />
                <p className="text-dark font-bold mb-1">Service Area</p>
                <p className="text-dark/60 text-sm leading-relaxed">Estonia, Baltics & Scandinavia</p>
              </div>
              
              <div className="bg-white p-6 rounded-[2rem] border border-gray-100 flex flex-col items-center text-center shadow-sm">
                <Clock className="text-blue-accent mb-3" size={28} />
                <p className="text-dark font-bold mb-1">Response Time</p>
                <p className="text-dark/60 text-sm leading-relaxed">Usually within 24 hours</p>
              </div>
            </div>

          </div>
        </div>
        
        {/* Form Main Area */}
        <div className="w-full lg:w-7/12">
          <Card padding="lg" hover={false} border={false} className="shadow-2xl shadow-gray-200/50 bg-white border border-gray-50">
            <h3 className="text-2xl font-bold text-dark mb-8">Property Details</h3>
            
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-dark font-semibold text-sm ml-1">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Jane Doe" 
                    className="w-full px-6 py-4 rounded-xl bg-light border border-transparent focus:bg-white focus:border-blue-accent focus:ring-4 focus:ring-blue-accent/10 transition-all outline-none text-dark"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-dark font-semibold text-sm ml-1">Company</label>
                  <input 
                    type="text" 
                    placeholder="Acme Properties LLC" 
                    className="w-full px-6 py-4 rounded-xl bg-light border border-transparent focus:bg-white focus:border-blue-accent focus:ring-4 focus:ring-blue-accent/10 transition-all outline-none text-dark"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-dark font-semibold text-sm ml-1">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="jane@example.com" 
                    className="w-full px-6 py-4 rounded-xl bg-light border border-transparent focus:bg-white focus:border-blue-accent focus:ring-4 focus:ring-blue-accent/10 transition-all outline-none text-dark"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-dark font-semibold text-sm ml-1">Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="+372 000 0000" 
                    className="w-full px-6 py-4 rounded-xl bg-light border border-transparent focus:bg-white focus:border-blue-accent focus:ring-4 focus:ring-blue-accent/10 transition-all outline-none text-dark"
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-dark font-semibold text-sm ml-1">Building Address</label>
                <input 
                  type="text" 
                  placeholder="123 Corporate Blvd, Tallinn, Estonia" 
                  className="w-full px-6 py-4 rounded-xl bg-light border border-transparent focus:bg-white focus:border-blue-accent focus:ring-4 focus:ring-blue-accent/10 transition-all outline-none text-dark"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-dark font-semibold text-sm ml-1">Project Description & Requirements</label>
                <textarea 
                  rows={4}
                  placeholder="E.g. 15-story residential building, roughly 200 windows. Hasn't been cleaned in 2 years. Looking for a fast turnaround." 
                  className="w-full px-6 py-4 rounded-xl bg-light border border-transparent focus:bg-white focus:border-blue-accent focus:ring-4 focus:ring-blue-accent/10 transition-all outline-none resize-none text-dark"
                ></textarea>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-dark font-semibold text-sm ml-1">Photo / Reference File <span className="text-dark/40 font-normal">(Optional)</span></label>
                <label className="w-full px-6 py-8 rounded-xl bg-light border-2 border-dashed border-gray-200 hover:border-blue-accent hover:bg-blue-accent/5 transition-all cursor-pointer flex flex-col items-center justify-center text-center group">
                  <UploadCloud className="text-blue-accent/50 group-hover:text-blue-accent mb-3 transition-colors" size={32} />
                  <span className="text-dark font-medium mb-1">Click to upload or drag & drop</span>
                  <span className="text-dark/50 text-sm">JPG, PNG, or PDF (max. 10MB)</span>
                  <input type="file" className="hidden" accept=".jpg,.jpeg,.png,.pdf" />
                </label>
              </div>
              
              <Button variant="primary" size="lg" className="w-full mt-4 flex justify-center items-center gap-3 shadow-xl shadow-blue-accent/20">
                Submit Project Details
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>

          </Card>
        </div>
        
      </div>
    </SectionWrapper>
  );
};
export default Contact;
