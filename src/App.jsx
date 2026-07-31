import { useEffect, useState } from 'react'
import emailjs from '@emailjs/browser'
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
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
    const [compact, setCompact] = useState(false)
    const location = useLocation()

    useEffect(() => {
        setMenuOpen(false)
    }, [location.pathname])

    useEffect(() => {
        const handleScroll = () => {
            const shouldCompact = window.innerWidth > 900 && window.scrollY > 70
            setCompact(shouldCompact)
        }

        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })
        window.addEventListener('resize', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleScroll)
        }
    }, [])

    const toggleMenu = () => setMenuOpen((open) => !open)
    const closeMenu = () => setMenuOpen(false)

    return (
        <header className={`top-header ${compact ? 'compact' : ''}`}>
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
    const [activeLocationIndex, setActiveLocationIndex] = useState(0)
    const locations = company.offices.filter((office) => office.coordinates)
    const activeLocation = locations[activeLocationIndex] || locations[0]
    const location = useLocation()

    const goToPrevious = () => {
        setActiveLocationIndex((index) => (index === 0 ? locations.length - 1 : index - 1))
    }

    const goToNext = () => {
        setActiveLocationIndex((index) => (index + 1) % locations.length)
    }

    return (
        <footer className="footer">
            <div className="footer-grid">
                <div className="footer-column footer-brand-column">
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
                    <div className="footer-newsletter-block">
                        <h4>Newsletter</h4>
                        <p>Stay updated with our latest campaigns, projects, and announcements.</p>
                        <NewsletterSignup openPopup={openPopup} />
                    </div>
                </div>

                <div className="footer-column">
                    <h4>Explore</h4>
                    <ul>
                        {company.navigation.map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    onClick={(event) => {
                                        if (location.pathname === item.path) {
                                            event.preventDefault()
                                            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
                                        }
                                    }}
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="footer-column">
                    <h4>Contact</h4>
                    <p><strong>Email:</strong> {company.email}</p>
                    <p><strong>Phone:</strong> {company.phone}</p>
                    <p><strong>Alt:</strong> {company.alternatePhone}</p>
                </div>

                <div className="footer-column footer-map-column">
                    <div className="footer-map-header">
                        <h4>Our Locations</h4>
                    </div>

                    {locations.length > 1 && (
                        <div className="footer-map-nav" aria-label="Location selector">
                            <button type="button" onClick={goToPrevious} aria-label="Show previous location">‹</button>
                            <span className="footer-map-location-name" aria-live="polite">
                                <span className="footer-map-city">{activeLocation?.city}</span>
                                <span className="footer-map-title">{activeLocation?.title}</span>
                            </span>
                            <button type="button" onClick={goToNext} aria-label="Show next location">›</button>
                        </div>
                    )}

                    {activeLocation && (
                        <>
                            <iframe
                                title="Jyoti Advertisement locations"
                                className="footer-map"
                                src={`https://www.google.com/maps?q=${activeLocation.coordinates.lat},${activeLocation.coordinates.lng}&z=14&output=embed`}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </>
                    )}
                </div>
            </div>

            <div className="footer-office-layout">
                <div className="footer-office-list">
                    {company.offices.map((office) => (
                        <div key={office.city} className="footer-office-item">
                            <span className="footer-office-text">
                                <strong>{office.title}</strong> - {office.address}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="footer-contact-side">
                    <div className="footer-contact-block">
                        <h4>Contact Details</h4>
                        <p><strong>Email:</strong> {company.email}</p>
                        <p><strong>Phone:</strong> {company.phone}</p>
                        <p><strong>Alt:</strong> {company.alternatePhone}</p>
                    </div>

                    <div className="footer-socials">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                            <img src="/asset/footer/icons8-facebook-50.svg" alt="Facebook" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                            <img src="/asset/footer/icons8-instagram-50.svg" alt="Instagram" />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
                            <img src="/asset/footer/icons8-youtube-50.svg" alt="YouTube" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

function ContactForm({ openPopup }) {
    const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '' })
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
            openPopup?.('Inquiry Received', 'Thank you — your message is on its way. We will contact you soon.')
            setForm({ name: '', email: '', phone: '', company: '', message: '' })
        } catch (err) {
            console.error(err)
            openPopup?.('Submission Failed', 'We could not send your inquiry. Please try again later.')
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
                <textarea name="message" rows="3" placeholder="Describe Your Requirement" value={form.message} onChange={handleChange} required />
            </label>
            <button type="submit" className="btn btn-primary" disabled={sending}>{sending ? 'Sending...' : 'Send Message'}</button>
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

function ContactDetailsCard({ showLimitedHighlights = false }) {
    const highlights = showLimitedHighlights ? company.contactHighlights.slice(0, 3) : company.contactHighlights

    return (
        <div className="contact-card">
            <h3>Reach Us</h3>
            <p className="contact-intro">{company.contactSummary}</p>
            <div className="contact-detail-block">
                <span className="contact-label">Email</span>
                <a href={`mailto:${company.email}`} className="contact-link">{company.email}</a>
            </div>
            <div className="contact-detail-block">
                <span className="contact-label">Phone</span>
                <a href={`tel:${company.phone}`} className="contact-link">{company.phone}</a>
            </div>
            <div className="contact-detail-block">
                <span className="contact-label">Coverage</span>
                <p>{company.coverage}</p>
            </div>
            <ul className="contact-highlights">
                {highlights.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </div>
    )
}

function WorkCarousel({ works, onViewAll }) {
    const [activeIndex, setActiveIndex] = useState(0)
    const [activeImageIndex, setActiveImageIndex] = useState(0)

    const activeWork = works[activeIndex] || works[0]
    const activeImages = Array.isArray(activeWork?.images) ? activeWork.images.filter(Boolean) : []
    const currentImage = activeImages[activeImageIndex] || activeImages[0]

    useEffect(() => {
        setActiveIndex(0)
        setActiveImageIndex(0)
    }, [works.length])

    const goToPrev = () => {
        const nextIndex = activeIndex === 0 ? works.length - 1 : activeIndex - 1
        setActiveIndex(nextIndex)
        setActiveImageIndex(0)
    }

    const goToNext = () => {
        const nextIndex = (activeIndex + 1) % works.length
        setActiveIndex(nextIndex)
        setActiveImageIndex(0)
    }

    if (!works.length) return null

    return (
        <div className="work-carousel-shell">
            <div className="work-carousel-card">
                <div className="work-carousel-media">
                    {currentImage ? (
                        <img src={currentImage} alt={activeWork.title} className="work-carousel-image" />
                    ) : (
                        <div className="work-carousel-image empty-work-image">Project visuals coming soon</div>
                    )}

                    {activeImages.length > 1 && (
                        <div className="work-thumbnail-row">
                            {activeImages.map((image, index) => (
                                <button
                                    key={`${activeWork.title}-${index}`}
                                    type="button"
                                    className={`work-thumbnail-btn ${index === activeImageIndex ? 'active' : ''}`}
                                    onClick={() => setActiveImageIndex(index)}
                                    aria-label={`Show project image ${index + 1}`}
                                >
                                    <img src={image} alt={`${activeWork.title} view ${index + 1}`} className="work-thumbnail" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="work-carousel-copy">
                    <div className="work-carousel-header">
                        <div className="work-carousel-nav work-carousel-nav-inline">
                            <button type="button" className="carousel-btn" onClick={goToPrev} aria-label="Previous work">
                                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="arrow-icon">
                                    <path d="M15 6 L9 12 L15 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                </svg>
                            </button>

                            <div className="work-carousel-label-group">
                                <p className="eyebrow">Featured Work</p>
                                <div className="carousel-progress" aria-label={`Work ${activeIndex + 1} of ${works.length}`}>
                                    {works.map((_, index) => (
                                        <span key={index} className={index === activeIndex ? 'progress-dot active' : 'progress-dot'} />
                                    ))}
                                </div>
                            </div>

                            <button type="button" className="carousel-btn" onClick={goToNext} aria-label="Next work">
                                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="arrow-icon">
                                    <path d="M9 6 L15 12 L9 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="work-carousel-details">
                        <h3>{activeWork.title}</h3>
                        <p className="work-carousel-description">{activeWork.description}</p>
                        <div className="work-meta">
                            <span>{activeWork.client}</span>
                            <span>{activeWork.location}</span>
                            <span>{activeWork.year}</span>
                        </div>
                        <button type="button" className="btn btn-accent" onClick={onViewAll}>Explore our portfolio</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function HomePage({ openPopup }) {
    const [showPromo, setShowPromo] = useState(false)
    const [selectedClientImage, setSelectedClientImage] = useState(null)
    const [activeHeroIndex, setActiveHeroIndex] = useState(0)
    const navigate = useNavigate()

    const heroSlides = company.heroCarousel || []

    useEffect(() => {
        const hasSeenPromo = sessionStorage.getItem('jyoti-promo-seen')
        if (!hasSeenPromo) {
            const timer = window.setTimeout(() => {
                setShowPromo(true)
            }, 800)
            return () => window.clearTimeout(timer)
        }
    }, [])

    useEffect(() => {
        if (!heroSlides.length) return

        const timer = window.setInterval(() => {
            setActiveHeroIndex((current) => (current + 1) % heroSlides.length)
        }, 3000)

        return () => window.clearInterval(timer)
    }, [heroSlides.length])

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
                <div className="hero-carousel" aria-hidden="true">
                    {heroSlides.map((slide, index) => (
                        <div key={`${slide.image}-${index}`} className={`hero-slide ${index === activeHeroIndex ? 'active' : ''}`}>
                            <img src={slide.image} alt={slide.alt || ''} />
                        </div>
                    ))}
                </div>
                <div className="hero-overlay" />
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

                <section id="featured-work" className="section alt-section">
                    <div className="section-heading">
                        <Link to="/portfolio" className="eyebrow section-eyebrow-link">Featured Projects</Link>
                        <h2>Selected campaigns, public events, and brand activations delivered with precision.</h2>
                    </div>
                    <WorkCarousel works={(company.workShowcase || []).slice(0, 4)} onViewAll={() => navigate('/portfolio')} />
                </section>

                <section id="about" className="section">
                    <div className="section-heading">
                        <Link to="/about" className="eyebrow section-eyebrow-link">About Us</Link>
                        <h2>
                            Trusted advertising partner with manufacturing strength, premium execution, and<br />
                            pan-India reach for ambitious brands.
                        </h2>
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

                <section className="section client-showcase-section">
                    <div className="section-heading">
                        <Link to="/portfolio" className="eyebrow section-eyebrow-link">Client Partnerships</Link>
                        <h2>Trusted by a wide range of brands, institutions, and organizers across the region.</h2>
                    </div>
                    <div className="client-logos-grid">
                        {Array.from({ length: 20 }, (_, index) => {
                            const imageSrc = `/asset/client-${index + 1}.webp`
                            return (
                                <button
                                    key={`client-${index + 1}`}
                                    type="button"
                                    className="client-logo-card"
                                    onClick={() => setSelectedClientImage(imageSrc)}
                                    aria-label={`Open client image ${index + 1}`}
                                >
                                    <img src={imageSrc} alt={`Client ${index + 1}`} />
                                </button>
                            )
                        })}
                    </div>
                </section>

                {selectedClientImage && (
                    <div className="client-lightbox-overlay" onClick={() => setSelectedClientImage(null)}>
                        <div className="client-lightbox" onClick={(event) => event.stopPropagation()}>
                            <button
                                type="button"
                                className="client-lightbox-close"
                                onClick={() => setSelectedClientImage(null)}
                                aria-label="Close client image"
                            >
                                ×
                            </button>
                            <img src={selectedClientImage} alt="Selected client" />
                        </div>
                    </div>
                )}

                <section id="services" className="section alt-section">
                    <div className="section-heading">
                        <Link to="/services" className="eyebrow section-eyebrow-link">Services</Link>
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
                        <Link to="/contact" className="eyebrow section-eyebrow-link">Contact</Link>
                        <h2>Start a conversation with our team.</h2>
                    </div>
                    <div className="contact-grid">
                        <ContactDetailsCard showLimitedHighlights />
                        <ContactForm openPopup={openPopup} />
                    </div>
                </section>

                <section className="page-quote-strip">
                    <p className="page-quote-text">“<span className="quote-accent">TRUST</span> is built through precision, teamwork, and delivery.”</p>
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

            <section className="page-quote-strip">
                <p className="page-quote-text">“A strong <span className="quote-accent">BRAND</span> grows when vision, craft, and consistency come together.”</p>
            </section>
        </main>
    )
}

function ServicesPage() {
    const [previewService, setPreviewService] = useState(null)

    return (
        <main className="page-content">
            <section className="section">
                <p className="eyebrow">Our Services</p>
                <h2>Advertising, Branding, Printing, and Promotional solutions.</h2>
                <div className="service-list services-grid">
                    {company.services.map((service) => {
                        const serviceContent = company.serviceShowcase?.[service] || {}
                        const images = Array.isArray(serviceContent.images) ? serviceContent.images.filter(Boolean) : []
                        const description = serviceContent.description || 'Tailored campaign solutions designed to strengthen brand presence and customer engagement.'

                        return (
                            <article key={service} className="card service-card">
                                <div className="service-carousel">
                                    <ServiceImageCarousel
                                        images={images}
                                        alt={service}
                                        title={service}
                                        description={description}
                                        onOpenPreview={(index) => setPreviewService({ title: service, description, images, index })}
                                    />
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

            {previewService && (
                <ServicePreviewModal
                    title={previewService.title}
                    description={previewService.description}
                    images={previewService.images}
                    startIndex={previewService.index || 0}
                    onClose={() => setPreviewService(null)}
                />
            )}

            <section className="page-quote-strip">
                <p className="page-quote-text">“Every <span className="quote-accent">SOLUTION</span> is stronger when strategy, craft, and execution align.”</p>
            </section>
        </main>
    )
}

function ServiceImageCarousel({ images, alt, onOpenPreview }) {
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
            <img
                src={safeImages[currentIndex]}
                alt={`${alt} view ${currentIndex + 1}`}
                className="service-image"
                onClick={() => onOpenPreview?.(currentIndex)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        onOpenPreview?.(currentIndex)
                    }
                }}
            />
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

function ServicePreviewModal({ title, description, images, startIndex, onClose }) {
    const safeImages = Array.isArray(images) ? images.filter(Boolean) : []
    const [currentIndex, setCurrentIndex] = useState(startIndex || 0)

    useEffect(() => {
        setCurrentIndex(startIndex || 0)
    }, [startIndex])

    const goToPrev = () => {
        setCurrentIndex((index) => (index > 0 ? index - 1 : safeImages.length - 1))
    }

    const goToNext = () => {
        setCurrentIndex((index) => (index < safeImages.length - 1 ? index + 1 : 0))
    }

    if (!safeImages.length) return null

    return (
        <div className="service-preview-overlay" onClick={onClose}>
            <div className="service-preview-modal" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label={`${title} gallery`}>
                <button type="button" className="service-preview-close" onClick={onClose} aria-label="Close preview">×</button>

                <div className="service-preview-media">
                    <img src={safeImages[currentIndex]} alt={`${title} view ${currentIndex + 1}`} className="service-preview-image" />
                    <div className="service-preview-controls">
                        <button type="button" className="carousel-btn prev" onClick={goToPrev} aria-label="Previous image">
                            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="arrow-icon">
                                <path d="M15 6 L9 12 L15 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                            </svg>
                        </button>
                        <button type="button" className="carousel-btn next" onClick={goToNext} aria-label="Next image">
                            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="arrow-icon">
                                <path d="M9 6 L15 12 L9 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                            </svg>
                        </button>
                    </div>
                    <div className="service-preview-dots" aria-label={`Image ${currentIndex + 1} of ${safeImages.length}`}>
                        {safeImages.map((_, index) => (
                            <span key={index} className={index === currentIndex ? 'progress-dot active' : 'progress-dot'} />
                        ))}
                    </div>
                </div>

                <div className="service-preview-copy">
                    <p className="eyebrow">Service Gallery</p>
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>

                <div className="service-preview-copy">
                </div>
            </div>
        </div>
    )
}

function InfrastructurePage() {
    const locations = (company.offices || []).filter((office) => office.coordinates)
    const [activeLocationIndex, setActiveLocationIndex] = useState(0)
    const activeLocation = locations[activeLocationIndex] || locations[0]

    useEffect(() => {
        if (locations.length <= 1) return

        const timer = window.setInterval(() => {
            setActiveLocationIndex((current) => (current + 1) % locations.length)
        }, 5000)

        return () => window.clearInterval(timer)
    }, [locations.length])

    return (
        <main className="page-content">
            <section className="section">
                <div className="infrastructure-banner">
                    <img
                        src="/asset/infrastructure/in_the_provided_production_house_image_data_image_image_4_replace_all.png"
                        alt="Jyoti Advertisement production house interior"
                        className="infrastructure-banner-image"
                    />
                    <div className="infrastructure-banner-overlay">
                        <p className="eyebrow">Built for Precision</p>
                        <h2>Premium production infrastructure designed to elevate every campaign.</h2>
                    </div>
                </div>

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

                <div className="location-map-section">
                    <div className="location-card-list">
                        {locations.map((office, index) => (
                            <button
                                key={office.city}
                                type="button"
                                className={`location-choice-card ${index === activeLocationIndex ? 'active' : ''}`}
                                onClick={() => setActiveLocationIndex(index)}
                            >
                                <span className="location-pill">{office.city}</span>
                                <strong>{office.title}</strong>
                                <p>{office.address}</p>
                            </button>
                        ))}
                    </div>

                    {activeLocation && (
                        <div className="location-map-shell">
                            <div className="location-map-header">
                                <div>
                                    <p className="eyebrow">Live Location</p>

                                </div>
                                <span className="map-auto-badge">{activeLocation.city} • {activeLocation.title}</span>
                            </div>
                            <iframe
                                title={`${activeLocation.city} location map`}
                                className="location-map-iframe"
                                src={`https://www.google.com/maps?q=${activeLocation.coordinates.lat},${activeLocation.coordinates.lng}&z=13&output=embed`}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    )}
                </div>
            </section>

            <section className="page-quote-strip">
                <p className="page-quote-text">“Every <span className="quote-accent">CAMPAIGN</span> is shaped by clarity, creativity, and commitment.”</p>
            </section>
        </main>
    )
}

function WorkPortfolioCard({ work, index }) {
    const images = Array.isArray(work.images) ? work.images.filter(Boolean) : []
    const [activeImage, setActiveImage] = useState(images[0] || '')

    useEffect(() => {
        setActiveImage(images[0] || '')
    }, [images[0]])

    return (
        <article className={`work-card ${index % 2 === 1 ? 'reverse' : ''}`}>
            <div className="work-card-media">
                {activeImage ? (
                    <img src={activeImage} alt={work.title} className="work-card-image" />
                ) : (
                    <div className="work-card-image empty-work-image">Project visuals coming soon</div>
                )}
                {images.length > 1 && (
                    <div className="work-card-thumbs">
                        {images.map((image, imageIndex) => (
                            <button
                                key={`${work.title}-${imageIndex}`}
                                type="button"
                                className={`work-card-thumb ${image === activeImage ? 'active' : ''}`}
                                onClick={() => setActiveImage(image)}
                                aria-label={`View image ${imageIndex + 1} for ${work.title}`}
                            >
                                <img src={image} alt={`${work.title} thumbnail ${imageIndex + 1}`} />
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <div className="work-card-content">
                <div className="work-meta">
                    <span>{work.client}</span>
                    <span>{work.year}</span>
                </div>
                <h3>{work.title}</h3>
                <p>{work.description}</p>
                <div className="work-card-footer">
                    <span>{work.location}</span>
                </div>
            </div>
        </article>
    )
}

function WorkPage() {
    const [currentPage, setCurrentPage] = useState(1)
    const worksPerPage = 5
    const totalPages = Math.max(1, Math.ceil((company.workShowcase?.length || 0) / worksPerPage))
    const startIndex = (currentPage - 1) * worksPerPage
    const visibleWorks = company.workShowcase.slice(startIndex, startIndex + worksPerPage)

    useEffect(() => {
        setCurrentPage(1)
    }, [])

    const goToPage = (page) => {
        const nextPage = Math.min(Math.max(1, page), totalPages)
        setCurrentPage(nextPage)
    }

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }, [currentPage])

    return (
        <main className="page-content">
            <section className="section">
                <div className="portfolio-banner-shell" aria-label="Portfolio showcase banner">
                    <div className="portfolio-banner-track">
                        <img
                            src="/asset/portfolio/a_professional_high_fidelity_panoramic_portfolio_showcase_banner_for_jyoti.png"
                            alt="Jyoti Advertisement portfolio showcase banner"
                            className="portfolio-banner-image"
                        />
                        <img
                            src="/asset/portfolio/a_professional_high_fidelity_panoramic_portfolio_showcase_banner_for_jyoti.png"
                            alt="Jyoti Advertisement portfolio showcase banner"
                            className="portfolio-banner-image"
                        />
                    </div>
                </div>

                <div className="section-heading work-page-heading">
                    <p className="eyebrow">Our Work</p>
                    <h2>Campaigns that turned visibility into impact for brands, institutions, and high-profile public events.</h2>
                    <p className="page-copy">Each project reflects our commitment to premium execution, on-ground coordination, and striking visual communication across outdoor, transit, and public-facing environments.</p>
                </div>

                <div className="work-grid">
                    {visibleWorks.map((work, index) => (
                        <WorkPortfolioCard key={work.title} work={work} index={startIndex + index} />
                    ))}
                </div>

                {totalPages > 1 && (
                    <div className="work-pagination" role="navigation" aria-label="Portfolio pagination">
                        <button type="button" className="work-pagination-btn" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                            Previous
                        </button>
                        <div className="work-pagination-numbers">
                            {Array.from({ length: totalPages }, (_, index) => {
                                const pageNumber = index + 1
                                return (
                                    <button
                                        key={pageNumber}
                                        type="button"
                                        className={`work-pagination-number ${pageNumber === currentPage ? 'active' : ''}`}
                                        onClick={() => goToPage(pageNumber)}
                                    >
                                        {pageNumber}
                                    </button>
                                )
                            })}
                        </div>
                        <button type="button" className="work-pagination-btn" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
                            Next
                        </button>
                    </div>
                )}
            </section>

            <section className="page-quote-strip">
                <p className="page-quote-text">“The best <span className="quote-accent">RESULTS</span> come from a team that believes in excellence.”</p>
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
                    <Link to="/contact" className="career-link">
                        Apply by contacting us here
                    </Link>
                </p>
            </section>

            <section className="page-quote-strip">
                <p className="page-quote-text">“Great <span className="quote-accent">CAREERS</span> are built when talent, purpose, and teamwork meet.”</p>
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
                    <ContactDetailsCard />
                    <ContactForm openPopup={openPopup} />
                </div>
            </section>

            <section className="page-quote-strip">
                <p className="page-quote-text">“Every <span className="quote-accent">CONVERSATION</span> is the beginning of a trusted partnership.”</p>
            </section>
        </main>
    )
}

function FloatingAssistant({ openPopup }) {
    const [assistantOpen, setAssistantOpen] = useState(false)
    const [assistantStep, setAssistantStep] = useState('intro')
    const [assistantForm, setAssistantForm] = useState({ email: '', phone: '', message: '' })
    const [assistantSubmitting, setAssistantSubmitting] = useState(false)
    const location = useLocation()

    const assistantCopy = {
        '/': {
            title: 'Let’s connect',
            message: 'Share your email or phone and we will reach out with the right solution for your brand.'
        },
        '/about': {
            title: 'Interested in our story?',
            message: 'Leave your contact details and we will guide you through our approach, expertise, and execution strength.'
        },
        '/services': {
            title: 'Need a tailored service?',
            message: 'Tell us how to reach you and we will help you choose the right advertising and branding support.'
        },
        '/infrastructure': {
            title: 'Curious about our setup?',
            message: 'Share a number or email and we will connect you with the team behind our production capabilities.'
        },
        '/portfolio': {
            title: 'Looking for inspiration?',
            message: 'Leave your contact details and we will share the right project examples for your next campaign.'
        },
        '/career': {
            title: 'Explore opportunities',
            message: 'Send your email or phone and we will be in touch about roles that match your experience.'
        },
        '/contact': {
            title: 'Start the conversation',
            message: 'Leave either your phone or email and we will get back to you with the right next step.'
        }
    }

    const currentAssistantCopy = assistantCopy[location.pathname] || assistantCopy['/']

    const handleAssistantChange = (event) => {
        const { name, value } = event.target
        setAssistantForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleAssistantSubmit = async (event) => {
        event.preventDefault()

        if (!assistantForm.email.trim() && !assistantForm.phone.trim()) {
            openPopup?.('Need a contact detail', 'Please enter either your phone number or email address so we can reach you.')
            return
        }

        setAssistantSubmitting(true)

        try {
            await emailjs.send(
                'service_rertjnw',
                'template_pcanpoi',
                {
                    name: 'Quick Contact',
                    email: assistantForm.email,
                    phone: assistantForm.phone,
                    message: assistantForm.message || 'Quick contact request from the floating assistant.'
                },
                'NBSW8n_wWmCawGZmx'
            )

            openPopup?.('Thanks for reaching out', 'We will get back to you shortly with the right guidance.')
            setAssistantForm({ email: '', phone: '', message: '' })
            setAssistantOpen(false)
            setAssistantStep('intro')
        } catch (error) {
            console.error(error)
            openPopup?.('Connection issue', 'We could not send your details right now. Please try again shortly.')
        } finally {
            setAssistantSubmitting(false)
        }
    }

    const openAssistantIntro = () => {
        setAssistantStep('intro')
        setAssistantOpen(true)
    }

    const closeAssistant = () => {
        setAssistantOpen(false)
        setAssistantStep('intro')
    }

    return (
        <div className={`floating-assistant ${assistantOpen ? 'is-open' : 'is-minimized'}`}>
            {!assistantOpen && (
                <button
                    type="button"
                    className="assistant-toggle"
                    onClick={openAssistantIntro}
                    aria-expanded={assistantOpen}
                    aria-label="Open quick contact panel"
                >
                    Need help?
                </button>
            )}

            {assistantOpen && (
                <div className="assistant-panel">
                    <button type="button" className="assistant-close" onClick={closeAssistant} aria-label="Close assistant">
                        ×
                    </button>
                    <div className="assistant-header">
                        <h4>{currentAssistantCopy.title}</h4>
                    </div>
                    <p className="assistant-message">{currentAssistantCopy.message}</p>

                    {assistantStep === 'intro' ? (
                        <div className="assistant-actions">
                            <button type="button" className="assistant-submit" onClick={() => setAssistantStep('form')}>
                                Contact us
                            </button>
                        </div>
                    ) : (
                        <form className="assistant-form" onSubmit={handleAssistantSubmit}>
                            <input
                                type="email"
                                name="email"
                                className="assistant-input"
                                placeholder="Email address"
                                value={assistantForm.email}
                                onChange={handleAssistantChange}
                            />
                            <input
                                type="tel"
                                name="phone"
                                className="assistant-input"
                                placeholder="Phone number"
                                value={assistantForm.phone}
                                onChange={handleAssistantChange}
                            />
                            <textarea
                                name="message"
                                className="assistant-textarea"
                                rows="3"
                                placeholder="Describe Your Requirement"
                                value={assistantForm.message}
                                onChange={handleAssistantChange}
                            />
                            <button type="submit" className="assistant-submit" disabled={assistantSubmitting}>
                                {assistantSubmitting ? 'Sending...' : 'Send details'}
                            </button>
                        </form>
                    )}
                </div>
            )}
        </div>
    )
}

function WhatsAppFloat() {
    return (
        <div className="whatsapp-float" aria-label="WhatsApp contact">
            <a
                className="whatsapp-btn"
                href="https://wa.me/919466963931?text=Hello%2C%20How%20can%20I%20get%20help%3F"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp"
            >
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M16.002 2C8.28 2 2 8.28 2 16.002c0 2.478.666 4.797 1.822 6.797L2 30l7.397-1.795A13.94 13.94 0 0016.002 30C23.72 30 30 23.72 30 16.002 30 8.28 23.72 2 16.002 2zm0 25.455a11.41 11.41 0 01-5.826-1.6l-.418-.247-4.392 1.065 1.1-4.277-.272-.44a11.39 11.39 0 01-1.747-6.954C4.78 9.15 9.87 4.545 16.002 4.545c3.02 0 5.857 1.177 7.99 3.314a11.23 11.23 0 013.463 7.99c0 6.233-5.09 11.606-11.453 11.606zm6.29-8.684c-.344-.172-2.035-1.004-2.35-1.119-.315-.115-.545-.172-.773.172-.23.344-.886 1.119-1.087 1.348-.2.23-.4.258-.744.086-.344-.172-1.452-.535-2.766-1.707-1.022-.912-1.712-2.038-1.912-2.383-.2-.344-.021-.53.15-.701.155-.154.344-.4.516-.6.172-.2.23-.344.344-.573.115-.23.058-.43-.029-.602-.086-.172-.773-1.863-1.059-2.551-.279-.67-.562-.579-.773-.59l-.659-.011c-.23 0-.6.086-.916.43-.315.344-1.2 1.177-1.2 2.868s1.229 3.328 1.4 3.557c.172.23 2.42 3.696 5.863 5.184.82.354 1.46.565 1.958.723.823.261 1.572.224 2.164.136.66-.099 2.035-.832 2.322-1.635.287-.803.287-1.491.2-1.635-.086-.143-.315-.23-.659-.4z" />
                </svg>
            </a>
        </div>
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
                    <Route path="/portfolio" element={<WorkPage />} />
                    <Route path="/career" element={<CareerPage />} />
                    <Route path="/contact" element={<ContactPage openPopup={openPopup} />} />
                </Routes>
                <Footer openPopup={openPopup} />
                <WhatsAppFloat />
                <FloatingAssistant openPopup={openPopup} />
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
