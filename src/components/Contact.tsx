import { useState } from 'react';
import { ArrowRight, Mail, Phone, MapPin, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import SectionWrapper from './ui/SectionWrapper';
import SectionHeading from './ui/SectionHeading';
import Button from './ui/Button';

const FORMSPREE_URL = 'https://formspree.io/f/xnjopvzj';

const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('Please fill in all required fields (*) or try again.');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Basic validation
    const name = (formData.get('name') as string)?.trim();
    const email = (formData.get('email') as string)?.trim();
    const message = (formData.get('message') as string)?.trim();
    
    if (!name || !email || !message) {
      setStatus('error');
      setErrorMsg('Please fill in all required fields: Name, Email, and Project Description.');
      return;
    }


    setStatus('sending');

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus('error');
        setErrorMsg(data?.errors?.[0]?.message || `Submission failed (${res.status}). Please try again.`);
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg('Network error — please check your connection and try again.');
    }
  };

  return (
    <SectionWrapper id="contact" bg="light" className="relative">
      <style>{`
        .contact-card {
          background-color: #FFFFFF;
          border-radius: 2rem;
          box-shadow: 0 20px 50px rgba(0,0,0,0.06);
          position: relative;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid rgba(0,0,0,0.04);
        }
        .contact-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 25px 60px rgba(0,0,0,0.08);
        }
        
        /* The animated background wrapper inside the card */
        .contact-card-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        /* Center Glow */
        .contact-card-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(59,130,246,0.12), rgba(59,130,246,0.06) 30%, transparent 70%);
          transition: background 0.3s ease;
          animation: contact-breathe 8s ease-in-out infinite;
          will-change: transform, opacity;
        }
        .contact-card:hover .contact-card-glow {
          background: radial-gradient(circle at center, rgba(59,130,246,0.16), rgba(59,130,246,0.08) 30%, transparent 70%);
        }

        /* Grid Lines */
        .contact-card-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px);
          background-size: 40px 40px;
          -webkit-mask-image: radial-gradient(circle at center, black 20%, transparent 80%);
          mask-image: radial-gradient(circle at center, black 20%, transparent 80%);
          animation: contact-breathe 10s ease-in-out infinite reverse;
          will-change: transform, opacity;
        }

        /* Form Card Special Overrides */
        .contact-card-form .contact-card-glow {
          background: radial-gradient(circle at center, rgba(59,130,246,0.14), rgba(59,130,246,0.07) 35%, transparent 75%);
        }
        .contact-card.contact-card-form:hover .contact-card-glow {
          background: radial-gradient(circle at center, rgba(59,130,246,0.18), rgba(59,130,246,0.09) 35%, transparent 75%);
        }
        .contact-card-form .contact-card-grid {
          background-size: 50px 50px;
        }
        .contact-card-form {
          border: 1px solid rgba(59,130,246,0.08); /* faint inner border */
        }

        @keyframes contact-breathe {
          0%, 100% { opacity: 0.9; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.02); }
        }
        
        /* Make sure content inside card stays above the background */
        .contact-card-content {
          position: relative;
          z-index: 10;
        }
      `}</style>

      {/* Section Background Grid & Glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,172,206,0.06) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,172,206,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,172,206,0.05) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
        }}
      />

      <SectionHeading
        badge="Ready to start?"
        title="Get an Exact Quote"
        subtitle="Fill out your property details below. Our team maps your building using satellite data and provides an accurate estimate rapidly."
        className="mb-16 relative z-10"
      />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 relative z-10">

        {/* Contact Info Sidebar */}
        <div className="w-full lg:w-5/12">
          <div className="space-y-6 lg:space-y-10 w-full lg:sticky lg:top-32">

            <div className="contact-card p-8 md:p-10 flex items-start gap-6 group">
              <div className="contact-card-bg">
                <div className="contact-card-glow"></div>
                <div className="contact-card-grid"></div>
              </div>
              <div className="contact-card-content flex items-start gap-6 w-full">
                <div className="w-14 h-14 rounded-2xl bg-blue-accent/10 flex items-center justify-center text-blue-accent flex-shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-dark/50 text-xs font-bold uppercase tracking-wider mb-2">Call Us Directly</p>
                  <p className="text-dark font-bold text-xl md:text-2xl hover:text-blue-accent cursor-pointer transition-colors">+372 550 3644</p>
                  <p className="text-dark/60 text-sm mt-1">Available Mon-Fri, 9am - 6pm</p>
                </div>
              </div>
            </div>

            <div className="contact-card p-8 md:p-10 flex items-start gap-6 group">
              <div className="contact-card-bg">
                <div className="contact-card-glow"></div>
                <div className="contact-card-grid"></div>
              </div>
              <div className="contact-card-content flex items-start gap-6 w-full">
                <div className="w-14 h-14 rounded-2xl bg-blue-accent/10 flex items-center justify-center text-blue-accent flex-shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-dark/50 text-xs font-bold uppercase tracking-wider mb-2">Email Us</p>
                  <p className="text-dark font-bold text-xl md:text-2xl hover:text-blue-accent cursor-pointer transition-colors w-max">info@glassdrone.ee</p>
                </div>
              </div>
            </div>

            <div className="contact-card p-8 md:p-10 flex items-start gap-6 group">
              <div className="contact-card-bg">
                <div className="contact-card-glow"></div>
                <div className="contact-card-grid"></div>
              </div>
              <div className="contact-card-content flex items-start gap-6 w-full">
                <div className="w-14 h-14 rounded-2xl bg-blue-accent/10 flex items-center justify-center text-blue-accent flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.81 11.81 0 0 0 12.05 0C5.495 0 .16 5.333.158 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.332 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-dark/50 text-xs font-bold uppercase tracking-wider mb-2">WhatsApp</p>
                  <p className="text-dark font-bold text-xl md:text-2xl hover:text-blue-accent cursor-pointer transition-colors w-max">Instant response</p>
                  <a href="https://wa.me/3725503644" target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-sm font-semibold text-blue-accent border-b border-blue-accent/30 hover:border-blue-accent pb-0.5 transition-colors">Start Chat →</a>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="contact-card p-6 flex flex-col items-center text-center group">
                <div className="contact-card-bg">
                  <div className="contact-card-glow"></div>
                  <div className="contact-card-grid"></div>
                </div>
                <div className="contact-card-content flex flex-col items-center w-full">
                  <MapPin className="text-blue-accent mb-3" size={28} />
                  <p className="text-dark font-bold mb-1">Service Area</p>
                  <p className="text-dark/60 text-sm leading-relaxed">Estonia, Baltics & Scandinavia</p>
                </div>
              </div>

              <div className="contact-card p-6 flex flex-col items-center text-center group">
                <div className="contact-card-bg">
                  <div className="contact-card-glow"></div>
                  <div className="contact-card-grid"></div>
                </div>
                <div className="contact-card-content flex flex-col items-center w-full">
                  <Clock className="text-blue-accent mb-3" size={28} />
                  <p className="text-dark font-bold mb-1">Response Time</p>
                  <p className="text-dark/60 text-sm leading-relaxed">Usually within 24 hours</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Form Main Area */}
        <div className="w-full lg:w-7/12">
          <div className="contact-card contact-card-form p-10 md:p-14 group">
            <div className="contact-card-bg">
              <div className="contact-card-glow"></div>
              <div className="contact-card-grid"></div>
            </div>

            <div className="contact-card-content w-full">
              <h3 className="text-2xl font-bold text-dark mb-8">Property Details</h3>

              <form action={FORMSPREE_URL} method="POST" className="flex flex-col gap-6" onSubmit={handleSubmit}>

                {/* Honeypot spam trap — invisible to real users, bots will fill it */}
                <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-dark font-semibold text-sm ml-1">Full Name <span className="text-red-400">*</span></label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Jane Doe"
                      required
                      className="w-full px-6 py-4 rounded-xl bg-light border border-transparent focus:bg-white focus:border-blue-accent focus:ring-4 focus:ring-blue-accent/10 transition-all outline-none text-dark"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-dark font-semibold text-sm ml-1">Company</label>
                    <input
                      type="text"
                      name="company"
                      placeholder="Acme Properties LLC"
                      className="w-full px-6 py-4 rounded-xl bg-light border border-transparent focus:bg-white focus:border-blue-accent focus:ring-4 focus:ring-blue-accent/10 transition-all outline-none text-dark"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-dark font-semibold text-sm ml-1">Email Address <span className="text-red-400">*</span></label>
                    <input
                      type="email"
                      name="email"
                      placeholder="jane@example.com"
                      required
                      className="w-full px-6 py-4 rounded-xl bg-light border border-transparent focus:bg-white focus:border-blue-accent focus:ring-4 focus:ring-blue-accent/10 transition-all outline-none text-dark"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-dark font-semibold text-sm ml-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+372 000 0000"
                      className="w-full px-6 py-4 rounded-xl bg-light border border-transparent focus:bg-white focus:border-blue-accent focus:ring-4 focus:ring-blue-accent/10 transition-all outline-none text-dark"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-dark font-semibold text-sm ml-1">Building Address</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="123 Corporate Blvd, Tallinn, Estonia"
                    className="w-full px-6 py-4 rounded-xl bg-light border border-transparent focus:bg-white focus:border-blue-accent focus:ring-4 focus:ring-blue-accent/10 transition-all outline-none text-dark"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-dark font-semibold text-sm ml-1">Project Description & Requirements <span className="text-red-400">*</span></label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="E.g. 15-story residential building, roughly 200 windows. Hasn't been cleaned in 2 years. Looking for a fast turnaround."
                    required
                    className="w-full px-6 py-4 rounded-xl bg-light border border-transparent focus:bg-white focus:border-blue-accent focus:ring-4 focus:ring-blue-accent/10 transition-all outline-none resize-none text-dark"
                  ></textarea>
                </div>



                {/* Success / Error feedback */}
                {status === 'success' && (
                  <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-green-50 border border-green-200 text-green-700">
                    <CheckCircle2 size={20} className="flex-shrink-0" />
                    <span className="font-medium text-sm">Request sent! We'll get back to you within 24 hours.</span>
                  </div>
                )}
                {status === 'error' && (
                  <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-red-50 border border-red-200 text-red-600">
                    <AlertCircle size={20} className="flex-shrink-0" />
                    <span className="font-medium text-sm">{errorMsg}</span>
                  </div>
                )}

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full mt-4 flex justify-center items-center gap-3 shadow-xl shadow-blue-accent/20"
                  disabled={status === 'sending' || status === 'success'}
                >
                  {status === 'sending' ? 'Sending…' : status === 'success' ? '✓ Sent!' : 'Submit Project Details'}
                  {status !== 'sending' && status !== 'success' && (
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  )}
                </Button>
              </form>
            </div>

          </div>
        </div>

      </div>
    </SectionWrapper>
  );
};
export default Contact;
