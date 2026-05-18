import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart } from 'lucide-react';

const Home = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const featuredPosts = [
    {
      id: 1,
      title: "The Art of Softness in a Hard World",
      category: "Feminine Energy",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 2,
      title: "Healing After Heartbreak: A Spiritual Guide",
      category: "Healing",
      image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 3,
      title: "Walking Closer With God Daily",
      category: "Faith & God",
      image: "https://images.unsplash.com/photo-1507675953041-39656ba13a35?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="home-wrapper">
      {/* Hero Section */}
      <section className="hero">
        <img 
          src="https://images.unsplash.com/photo-1522008342704-6b2f0521e8e2?auto=format&fit=crop&q=80&w=2000" 
          alt="Women finding peace and healing" 
          className="hero-bg"
        />
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <span className="subtitle">Welcome to Sanctuary</span>
            <h1>Softness. Strength. Faith. Feminine Growth.</h1>
            <p>Helping women heal, grow, love, and walk closer with God in an elegant space designed just for you.</p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <Link to="/blog" className="btn btn-primary">Start Your Healing Journey</Link>
              <Link to="#community" className="btn btn-outline">Grow With Us</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className="section container">
        <div className="text-center animate-on-scroll">
          <span className="subtitle">The Journal</span>
          <h2>Curated For Your Soul</h2>
        </div>
        <div className="editorial-grid animate-on-scroll">
          {featuredPosts.map(post => (
            <div key={post.id} className="editorial-card">
              <div className="card-img-wrapper">
                <img src={post.image} alt={post.title} className="card-img" />
              </div>
              <div className="card-content">
                <span className="category-tag">{post.category}</span>
                <h3 className="card-title">{post.title}</h3>
                <Link to="/blog" style={{ color: 'var(--color-obsidian)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 500, marginTop: '1.5rem' }}>
                  Read Article <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Daily Encouragement */}
      <section className="section" style={{ backgroundColor: 'var(--color-cream)', textAlign: 'center' }}>
        <div className="container animate-on-scroll">
          <Heart size={40} color="var(--color-champagne)" style={{ marginBottom: '2rem' }} />
          <h2 style={{ maxWidth: '800px', margin: '0 auto', fontStyle: 'italic', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            "Perhaps this is the moment for which you have been created."
          </h2>
          <p style={{ marginTop: '1.5rem', color: 'var(--color-text-light)' }}>Esther 4:14</p>
        </div>
      </section>

      {/* About Founder */}
      <section className="section container">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
          <div style={{ flex: '1 1 400px' }} className="animate-on-scroll">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800" 
              alt="Founder" 
              style={{ width: '100%', height: '600px', objectFit: 'cover', borderRadius: '4px' }}
            />
          </div>
          <div style={{ flex: '1 1 400px' }} className="animate-on-scroll">
            <span className="subtitle">The Vision</span>
            <h2>A Safe Space for Women</h2>
            <p>I created this platform because I know what it feels like to search for healing in a world that asks us to be hard. A Better You is a sanctuary designed to remind you of your inherent worth, your soft power, and God's unwavering love.</p>
            <p>Whether you are healing from heartbreak, searching for purpose, or simply elevating your lifestyle, you belong here.</p>
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/f4/Signature_of_Pamela_Anderson.svg" alt="Signature" style={{ height: '60px', opacity: 0.6, marginTop: '2rem' }} />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonial-section">
        <div className="container animate-on-scroll">
          <div className="quote-icon">"</div>
          <p className="testimonial-text">
            This space has completely transformed how I view myself. The articles on healing after heartbreak felt like they were written directly to my soul. I finally feel at peace.
          </p>
          <span className="subtitle" style={{ marginBottom: 0 }}>— Sarah M., Rediscovering Herself</span>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section newsletter-section">
        <div className="glow-circle"></div>
        <div className="container">
          <div className="newsletter-content animate-on-scroll">
            <h2>Join Our Community</h2>
            <p>Join thousands of women growing spiritually, emotionally, and personally. Receive weekly devotionals, journal prompts, and exclusive content.</p>
            <form className="form-group">
              <input type="email" placeholder="Enter your beautiful email" className="input-field" required />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
