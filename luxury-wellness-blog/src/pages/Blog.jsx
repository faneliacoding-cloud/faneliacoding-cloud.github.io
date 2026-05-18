import React, { useEffect } from 'react';
import { Share2, Bookmark, Link as LinkIcon, Heart } from 'lucide-react';

const Blog = () => {
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

  return (
    <div style={{ paddingTop: '100px', backgroundColor: 'var(--color-ivory)' }}>
      {/* Blog Header */}
      <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
        <span className="subtitle">Editorial</span>
        <h1 style={{ marginBottom: '2rem' }}>The Journal</h1>
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
          <span style={{ color: 'var(--color-champagne)', cursor: 'pointer' }}>All Topics</span>
          <span style={{ cursor: 'pointer' }}>Faith & God</span>
          <span style={{ cursor: 'pointer' }}>Love & Relationships</span>
          <span style={{ cursor: 'pointer' }}>Healing</span>
          <span style={{ cursor: 'pointer' }}>Feminine Energy</span>
          <span style={{ cursor: 'pointer' }}>Self-Worth</span>
        </div>
      </div>

      <div className="container" style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap', paddingBottom: '6rem' }}>
        
        {/* Main Content (Article Layout) */}
        <div style={{ flex: '1 1 700px' }}>
          <img 
            src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=1200" 
            alt="Feminine energy journaling" 
            style={{ width: '100%', height: '500px', objectFit: 'cover', borderRadius: '4px', marginBottom: '3rem' }} 
            className="animate-on-scroll"
          />
          
          <article className="animate-on-scroll" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span className="category-tag">Healing After Heartbreak</span>
            <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}>The Art of Letting Go Gracefully</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem', borderBottom: '1px solid var(--color-cream)', paddingBottom: '2rem' }}>
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" alt="Author" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <p style={{ margin: 0, fontWeight: 500, fontFamily: 'var(--font-sans)', fontSize: '0.95rem' }}>Isabella Rossi</p>
                <p style={{ margin: 0, color: 'var(--color-text-light)', fontSize: '0.85rem' }}>May 18, 2026 • 5 min read</p>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              {/* Floating Share Sidebar */}
              <div style={{ position: 'absolute', left: '-80px', top: '0', display: 'flex', flexDirection: 'column', gap: '1.5rem', color: 'var(--color-text-light)' }} className="hide-on-mobile">
                <Share2 size={20} style={{ cursor: 'pointer' }} />
                <Bookmark size={20} style={{ cursor: 'pointer' }} />
                <Heart size={20} style={{ cursor: 'pointer' }} />
                <LinkIcon size={20} style={{ cursor: 'pointer' }} />
              </div>

              <p style={{ fontSize: '1.25rem', lineHeight: '1.8', color: 'var(--color-obsidian)', marginBottom: '2rem' }}>
                There is a profound beauty in the release. When we hold onto things that are meant to leave our lives, we block the blessings that are trying to enter. Healing is not about forgetting; it's about making peace with the memories and allowing yourself to be soft again.
              </p>
              
              <p>
                Many women mistakenly believe that strength means building walls. But true feminine strength is found in our vulnerability, in our capacity to feel deeply, and in our willingness to trust God with our broken pieces.
              </p>

              <blockquote style={{ margin: '4rem 0', padding: '2rem', borderLeft: '2px solid var(--color-champagne)', backgroundColor: 'var(--color-cream)', fontStyle: 'italic', fontSize: '1.5rem', fontFamily: 'var(--font-serif)', color: 'var(--color-obsidian)' }}>
                "He heals the brokenhearted and binds up their wounds."
                <footer style={{ fontSize: '1rem', fontFamily: 'var(--font-sans)', fontStyle: 'normal', marginTop: '1rem', color: 'var(--color-text-light)' }}>— Psalm 147:3</footer>
              </blockquote>

              <h3>Rediscovering Your Softness</h3>
              <p>
                After a season of pain, it is natural to want to protect yourself. But your softness is your superpower. By embracing grace and allowing yourself to be nurtured by your faith and your community, you begin the transformative work of true healing.
              </p>
            </div>
          </article>
        </div>

        {/* Sidebar */}
        <aside style={{ flex: '1 1 300px', position: 'sticky', top: '120px', height: 'fit-content' }} className="animate-on-scroll">
          <div style={{ padding: '2.5rem', backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-blush)', borderRadius: '4px', marginBottom: '3rem', textAlign: 'center' }}>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '1rem' }}>Daily Devotional</h4>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-body)', marginBottom: '1.5rem' }}>Receive a beautifully curated scripture and journal prompt delivered to your inbox every morning.</p>
            <input type="email" placeholder="Your email address" style={{ width: '100%', padding: '0.8rem', marginBottom: '1rem', border: '1px solid var(--color-sage)', background: 'transparent' }} />
            <button className="btn btn-primary" style={{ width: '100%' }}>Subscribe</button>
          </div>

          <div>
            <span className="subtitle">Popular Reads</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1.5rem' }}>
              {[
                "Preparing Your Heart For True Love",
                "The Power of a Praying Woman",
                "Elevating Your Lifestyle: A Guide to Soft Living"
              ].map((title, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--color-champagne-light)', fontWeight: 300 }}>0{i+1}</span>
                  <h5 style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 500, margin: 0, cursor: 'pointer' }}>{title}</h5>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
      
      <style>{`
        @media (max-width: 1024px) {
          .hide-on-mobile { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default Blog;
