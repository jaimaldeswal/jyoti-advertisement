import { useEffect, useState } from 'react'
import emailjs from '@emailjs/browser'
import { BrowserRouter, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import './styles.css'
import { company } from './data'

function ScrollToTop() {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }, [pathname])

    return null
}

function Header() {
    const [menuOpen, setMenuOpen] = useState(false)
    const location = useLocation()

    useEffect(() => {
        setMenuOpen(false)
    }, [location.pathname])

    const toggleMenu = () => setMenuOpen((open) => !open)
    const closeMenu = () => setMenuOpen(false)

    return (
        <header className="top-header">
            <div className="brand-block">
                <img
                    src="/asset/logo.png"
                    alt="Jyoti Advertisement logo"
                    className="brand-logo"
                />
                <div className="brand-text">
                    <h2>{company.name}</h2>
                    <p>{company.slogan}</p>
                </div>
            </div>

            <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle navigation" aria-expanded={menuOpen}>
                <span />
                <span />
                <span />
            </button>

            <nav className={`top-nav ${menuOpen ? 'open' : ''}`}>
                {company.navigation.map((item) => (
                    <NavLink key={item.path} to={item.path} onClick={closeMenu} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                        {item.label}
                    </NavLink>
                ))}
            </nav>
        </header>
    )
}

function Footer({ openPopup }) {
    return (
        <footer className="footer">
            <div className="footer-grid">
                <div className="footer-column">
                    <div className="brand-block footer-brand">
                        <img
                            src="/asset/logo.png"
                            alt="Jyoti Advertisement logo"
                            className="brand-logo"
                        />
                        <div>
                            <h3>{company.name}</h3>
                            <p>{company.slogan}</p>
                        </div>
                    </div>
                    <p className="footer-copy">{company.description}</p>
                </div>

                <div className="footer-column">
                    <h4>Explore</h4>
                    <ul>
                        {company.navigation.map((item) => (
                            <li key={item.path}><NavLink to={item.path}>{item.label}</NavLink></li>
                        ))}
                    </ul>
                </div>

                <div className="footer-column">
                    <h4>Contact</h4>
                    <p><strong>Email:</strong> {company.email}</p>
                    <p><strong>Phone:</strong> {company.phone}</p>
                    <p><strong>Alt:</strong> {company.alternatePhone}</p>
                </div>

                <div className="footer-column">
                    <h4>Newsletter</h4>
                    <p>Sign up for our latest news & articles. We won’t give you spam mails.</p>
                    <NewsletterSignup openPopup={openPopup} />
                </div>
            </div>

            <div className="office-grid">
                {company.offices.map((office) => (
                    <div key={office.city} className="office-card">
                        <h5>{office.city}</h5>
                        <p>{office.title}</p>
                        <span>{office.address}</span>
                    </div>
                ))}
            </div>
        </footer>
    )
}

function ContactForm({ openPopup }) {
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
    const [sending, setSending] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((s) => ({ ...s, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSending(true)
        try {
            await emailjs.send(
                'service_rertjnw',
                'template_pcanpoi',
                form,
                'NBSW8n_wWmCawGZmx'
            )
            openPopup('Inquiry Received', 'Thank you — your message is on its way. We will contact you soon.')
            setForm({ name: '', email: '', phone: '', message: '' })
        } catch (err) {
            console.error(err)
            openPopup('Submission Failed', 'We could not send your inquiry. Please try again later.')
        } finally {
            setSending(false)
        }
    }

    return (
        <form className="contact-form" onSubmit={handleSubmit}>
            <label>
                Name
                <input name="name" type="text" placeholder="Your name" value={form.name} onChange={handleChange} required />
            </label>
            <label>
                Email
                <input name="email" type="email" placeholder="Your email" value={form.email} onChange={handleChange} required />
            </label>
            <label>
                Company
                <input name="company" type="text" placeholder="Your company" value={form.company || ''} onChange={handleChange} />
            </label>
            <label>
                Message
                <textarea name="message" rows="4" placeholder="Tell us about your project" value={form.message} onChange={handleChange} required />
            </label>
            <button type="submit" className="btn btn-primary" disabled={sending}>{sending ? 'Sending...' : 'Send Inquiry'}</button>
        </form>
    )
}

function NewsletterSignup({ openPopup }) {
    const [email, setEmail] = useState('')
    const [sending, setSending] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email) return
        setSending(true)

        try {
            await emailjs.send(
                'service_rertjnw',
                'template_pcanpoi',
                {
                    name: 'Newsletter Signup',
                    email,
                    phone: company.phone,
                    message: 'New newsletter subscriber: please add this contact to updates list.'
                },
                'NBSW8n_wWmCawGZmx'
            )
            openPopup('Subscribed', 'Thanks for signing up! You will receive our latest updates soon.')
            setEmail('')
        } catch (err) {
            console.error(err)
            openPopup('Subscription Failed', 'We could not process your signup. Please try again later.')
        } finally {
            setSending(false)
        }
    }

    return (
        <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button type="submit" className="btn btn-primary" disabled={sending}>
                {sending ? 'Signing up...' : 'Sign Up'}
            </button>
        </form>
    )
}

function HomePage({ openPopup }) {
    const [showPromo, setShowPromo] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const hasSeenPromo = sessionStorage.getItem('jyoti-promo-seen')
        if (!hasSeenPromo) {
            const timer = window.setTimeout(() => {
                setShowPromo(true)
            }, 800)
            return () => window.clearTimeout(timer)
        }
    }, [])

    const handleClose = () => {
        sessionStorage.setItem('jyoti-promo-seen', 'true')
        setShowPromo(false)
    }

    const handleContact = () => {
        sessionStorage.setItem('jyoti-promo-seen', 'true')
        navigate('/contact')
    }

    return (
        <>
            {showPromo && (
                <div className="promo-overlay" onClick={handleClose}>
                    <div className="promo-modal" onClick={(event) => event.stopPropagation()}>
                        <button className="promo-close" onClick={handleClose} aria-label="Close popup">×</button>
                        <div className="promo-content">
                            <img src="/asset/banner.png" alt="Jyoti Advertisement promotional banner" className="promo-image" />
                            <div className="promo-copy">
                                <p className="eyebrow">Let’s Build Your Brand</p>
                                <h3>Elevate your visibility with premium outdoor, print, and branding solutions.</h3>
                                <p>From hoardings and bus branding to office identity and printing, Jyoti Advertisement delivers results with quality and reliability.</p>
                                <button className="btn btn-primary" onClick={handleContact}>Contact Us</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <header className="hero">
                <div className="hero-content">
                    <p className="eyebrow">{company.name}</p>
                    <h1>{company.tagline}</h1>
                    <p className="hero-copy">{company.description}</p>
                    <div className="hero-actions">
                        <a href="#services" className="btn btn-primary">Explore Services</a>
                        <a href="#contact" className="btn btn-secondary">Request a Consultation</a>
                    </div>
                </div>
            </header>

            <main>
                <section className="section stats-section">
                    <div className="stats-grid">
                        {company.stats.map((item) => (
                            <div key={item.label} className="stat-card">
                                <strong>{item.value}</strong>
                                <span>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="about" className="section">
                    <div className="section-heading">
                        <p className="eyebrow">About Us</p>
                        <h2>Trusted advertising partner with manufacturing strength, premium execution, and pan-India reach.</h2>
                    </div>
                    <div className="card-grid">
                        <article className="card">
                            <h3>Our Mission</h3>
                            <p>{company.mission}</p>
                        </article>
                        <article className="card">
                            <h3>Our Vision</h3>
                            <p>{company.vision}</p>
                        </article>
                        <article className="card">
                            <h3>Why Clients Choose Us</h3>
                            <p>We combine strategy, in-house production, field installation, and dependable delivery to create powerful brand visibility without compromising quality.</p>
                        </article>
                    </div>
                </section>

                <section id="services" className="section alt-section">
                    <div className="section-heading">
                        <p className="eyebrow">Services</p>
                        <h2>End-to-end advertising solutions designed to make your brand impossible to ignore.</h2>
                    </div>
                    <div className="service-list">
                        {company.services.map((service) => (
                            <div key={service} className="service-item">{service}</div>
                        ))}
                    </div>
                </section>

                <section id="contact" className="section contact-section">
                    <div className="section-heading">
                        <p className="eyebrow">Contact</p>
                        <h2>Start a conversation with our team.</h2>
                    </div>
                    <div className="contact-grid">
                        <div className="contact-card">
                            <h3>Reach Us</h3>
                            <p><strong>Email:</strong> {company.email}</p>
                            <p><strong>Phone:</strong> {company.phone}</p>
                            <p><strong>Alt:</strong> {company.alternatePhone}</p>
                        </div>
                        <ContactForm />
                    </div>
                </section>
            </main>
        </>
    )
}

function AboutPage() {
    return (
        <main className="page-content">
            <section className="section">
                <p className="eyebrow">Company Profile</p>
                <h2>About Jyoti Advertisement</h2>
                <p className="page-copy">{company.description}</p>
                <p className="page-copy">Our work is guided by strategic thinking, refined presentation, and a commitment to helping businesses communicate with confidence.</p>
                <div className="card-grid">
                    {company.strengths.map((strength) => (
                        <article key={strength.title} className="card">
                            <h3>{strength.title}</h3>
                            <p>{strength.description}</p>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    )
}

function ServicesPage() {
    return (
        <main className="page-content">
            <section className="section">
                <p className="eyebrow">Our Services</p>
                <h2>Advertising, branding, printing, and promotional solutions.</h2>
                <div className="service-list services-grid">
                    {company.services.map((service) => {
                        const serviceContent = company.serviceShowcase?.[service] || {}
                        const images = Array.isArray(serviceContent.images) ? serviceContent.images.filter(Boolean) : []
                        const description = serviceContent.description || 'Tailored campaign solutions designed to strengthen brand presence and customer engagement.'

                        return (
                            <article key={service} className="card service-card">
                                <div className="service-carousel">
                                    <ServiceImageCarousel images={images} alt={service} />
                                </div>
                                <div className="service-info">
                                    <h3>{service}</h3>
                                    <p>{description}</p>
                                </div>
                            </article>
                        )
                    })}
                </div>
            </section>
        </main>
    )
}

function ServiceImageCarousel({ images, alt }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const safeImages = Array.isArray(images) ? images.filter(Boolean) : []
    const imageCount = safeImages.length

    useEffect(() => {
        setCurrentIndex(0)
    }, [imageCount])

    const goToPrev = () => {
        setCurrentIndex((index) => (index > 0 ? index - 1 : 0))
    }

    const goToNext = () => {
        setCurrentIndex((index) => (index < imageCount - 1 ? index + 1 : index))
    }

    if (imageCount === 0) {
        return (
            <div className="carousel-shell">
                <div className="service-image empty-image">Image coming soon</div>
            </div>
        )
    }

    return (
        <div className="carousel-shell">
            <img src={safeImages[currentIndex]} alt={`${alt} view ${currentIndex + 1}`} className="service-image" />
            <div className="carousel-controls">
                <button className="carousel-btn prev" onClick={goToPrev} disabled={currentIndex === 0} aria-label="Previous image">
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="arrow-icon">
                        <path d="M15 6 L9 12 L15 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                </button>

                <div className="carousel-progress" aria-label={`Image ${currentIndex + 1} of ${imageCount}`}>
                    {safeImages.map((_, index) => (
                        <span key={index} className={index === currentIndex ? 'progress-dot active' : 'progress-dot'} />
                    ))}
                </div>

                <button className="carousel-btn next" onClick={goToNext} disabled={currentIndex === imageCount - 1} aria-label="Next image">
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="arrow-icon">
                        <path d="M9 6 L15 12 L9 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

function InfrastructurePage() {
    return (
        <main className="page-content">
            <section className="section">
                <div className="section-heading">
                    <p className="eyebrow">Our Production Setup</p>
                    <h2>Technology that powers premium visibility.</h2>
                </div>
                <div className="service-list infrastructure-grid">
                    {company.infrastructure.map((item) => (
                        <article key={item.title} className="card infrastructure-card">
                            <img src={item.image} alt={item.title} className="infrastructure-image" />
                            <h3>{item.title}</h3>
                            <div className="infrastructure-details">
                                {item.details.map((line) => (
                                    <p key={line}>{line}</p>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>

                <div className="section-heading" style={{ marginTop: '2rem' }}>
                    <p className="eyebrow">Infrastructure & Operations</p>
                    <h2>Industrial-grade in-house production for premium campaigns and faster delivery.</h2>
                    <p className="page-copy">Our manufacturing units at Jind and Goa are equipped to handle printing, fabrication, and branding requirements at scale. Our branch office at Mohali enables smooth client coordination, project management, and regional execution.</p>
                </div>
                <div className="card-grid">
                    {company.offices.map((office) => (
                        <article key={office.city} className="card">
                            <h3>{office.city}</h3>
                            <p>{office.title}</p>
                            <p>{office.address}</p>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    )
}

function TestimonialsPage() {
    return (
        <main className="page-content">
            <section className="section">
                <p className="eyebrow">Testimonials</p>
                <h2>Trusted by government bodies and leading brands for high-impact campaigns.</h2>
                <div className="card-grid">
                    <article className="card">
                        <h3>Government-Scale Deployments</h3>
                        <p>We have supported large-scale public campaigns and official branding programs across Haryana and neighboring states with reliable execution.</p>
                    </article>
                    <article className="card">
                        <h3>Corporate Visibility Campaigns</h3>
                        <p>From transit branding to retail activations, our teams deliver premium execution that drives stronger brand presence and customer recall.</p>
                    </article>
                    <article className="card">
                        <h3>Flagship Projects</h3>
                        <p>Our portfolio includes G-20 Summit outdoor branding, bus wraps, mobile activations, and campaigns executed across multiple cities and retail networks.</p>
                    </article>
                </div>
            </section>
        </main>
    )
}

function CareerPage() {
    return (
        <main className="page-content">
            <section className="section">
                <p className="eyebrow">Career</p>
                <h2>Grow with a team that delivers excellence in branding and execution.</h2>
                <p className="page-copy">We welcome professionals who are passionate about execution, design, client coordination, and quality delivery in the advertising space. Join us to be part of campaigns that shape visibility for leading brands and government initiatives.</p>
                <p className="page-copy">
                    Interested in job opportunities with Jyoti Advertisement?{' '}
                    <a href="/contact" className="btn btn-secondary" style={{ display: 'inline-block', marginTop: '0.5rem' }}>
                        Apply by contacting us here
                    </a>
                </p>
            </section>
        </main>
    )
}

function ContactPage({ openPopup }) {
    return (
        <main className="page-content">
            <section className="section contact-section">
                <div className="section-heading">
                    <p className="eyebrow">Contact</p>
                    <h2>Reach the Jyoti Advertisement team.</h2>
                </div>
                <div className="contact-grid">
                    <div className="contact-card">
                        <h3>Get in touch</h3>
                        <p><strong>Email:</strong> {company.email}</p>
                        <p><strong>Phone:</strong> {company.phone}</p>
                        <p><strong>Alt:</strong> {company.alternatePhone}</p>
                    </div>
                    <ContactForm openPopup={openPopup} />
                </div>
            </section>
        </main>
    )
}

function App() {
    const [popup, setPopup] = useState({ open: false, title: '', message: '' })

    const openPopup = (title, message) => {
        setPopup({ open: true, title, message })
    }

    const closePopup = () => {
        setPopup((prev) => ({ ...prev, open: false }))
    }

    return (
        <BrowserRouter>
            <ScrollToTop />
            <div className="page-shell">
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage openPopup={openPopup} />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/infrastructure" element={<InfrastructurePage />} />
                    <Route path="/testimonials" element={<TestimonialsPage />} />
                    <Route path="/career" element={<CareerPage />} />
                    <Route path="/contact" element={<ContactPage openPopup={openPopup} />} />
                </Routes>
                <Footer openPopup={openPopup} />
                {popup.open && <PopupModal title={popup.title} message={popup.message} onClose={closePopup} />}
            </div>
        </BrowserRouter>
    )
}

function PopupModal({ title, message, onClose }) {
    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-box" onClick={(event) => event.stopPropagation()}>
                <button className="popup-close" onClick={onClose} aria-label="Close popup">×</button>
                <h3>{title}</h3>
                <p>{message}</p>
                <button className="btn btn-secondary" onClick={onClose}>Close</button>
            </div>
        </div>
    )
}

export default App
