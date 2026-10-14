import { useState, type FormEvent } from 'react';
import {
  ArrowRight,
  Check,
  ChevronDown,
  Factory,
  Globe2,
  Instagram,   // 👈 新增
  Linkedin,    // 👈 新新增
  Mail,
  Menu,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Users,
  Video,       // 👈 新新增
  X,
} from 'lucide-react';

type PathCard = {
  title: string;
  description: string;
  action: string;
  tone: 'green' | 'blue' | 'orange';
  icon: typeof ShoppingCart;
};

const paths: PathCard[] = [
  {
    title: 'I want to source\nfrom China.',
    description: 'Find the right suppliers, verify factories, manage quality and procurement.',
    action: 'Explore Sourcing',
    tone: 'green',
    icon: ShoppingCart,
  },
  {
    title: 'I need someone\non the ground\nin China.',
    description: 'Get reliable local support for factories, suppliers, production and business operations.',
    action: 'Explore Local Support',
    tone: 'blue',
    icon: Users,
  },
  {
    title: 'I am considering\nmanufacturing\nin China.',
    description: 'Evaluate the opportunity, build the supply chain and establish the right manufacturing setup.',
    action: 'Explore Manufacturing',
    tone: 'orange',
    icon: Factory,
  },
];

const proofPoints = [
  { icon: Users, title: '26 Years on the Ground', text: 'Hands-on experience in foreign-invested manufacturing and operations across China.' },
  { icon: ShieldCheck, title: 'On-the-Ground Execution', text: 'We represent your eyes, ears and feet in China—resolving issues and driving results.' },
  { icon: Globe2, title: 'Internationally Minded', text: 'Fluent in cross-cultural business communication. English, 中文, 日本語.' },
  { icon: Check, title: 'Practical & Transparent', text: 'Clear communication, honest advice, and practical solutions you can rely on.' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handlePathClick = (action: string) => {
    setSelectedServices([action]);
    setSubmissionStatus('idle');
    setIsModalOpen(true);
  };

  const handleServiceToggle = (service: string) => {
    setSelectedServices((currentServices) => currentServices.includes(service)
      ? currentServices.filter((currentService) => currentService !== service)
      : [...currentServices, service]);
  };

  const handleConsultationSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmissionStatus('submitting');

    const formData = new FormData(event.currentTarget);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '0f79f0ca-c0a7-4601-bc41-192bfef3cb72',
          subject: 'New Inquiry from RoscoreX Website',
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('requirements'),
          services: selectedServices.join(', '),
        }),
      });

      if (!response.ok) {
        setSubmissionStatus('error');
        return;
      }

      setSubmissionStatus('success');
      window.setTimeout(() => {
        setIsModalOpen(false);
        setSubmissionStatus('idle');
        setMessage('Thanks for reaching out. Our team will be in touch shortly.');
        window.setTimeout(() => setMessage(''), 4500);
      }, 1800);
    } catch {
      setSubmissionStatus('error');
    }
  };

  return (
    <div className="site-shell">
             <header className="site-header">
        <a className="brand" href="#top" aria-label="RoscoreX home">
          <img className="brand-image" src="/roscorex-logo.svg" alt="RoscoreX — Your China Partner on the Ground" />
        </a>
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={menuOpen ? 'main-nav open' : 'main-nav'}>
          <a className="contact-button" href="mailto:info@roscorex.com" onClick={() => setMenuOpen(false)}><Mail size={14} /> Contact Us</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">ROSCOREX · YOUR CHINA PARTNER</p>
            <h1 style={{ wordSpacing: '0.15em' }}>Your China Partner<br /><em>on the Ground</em></h1>
            <p className="hero-subtitle">Your business in China without<br className="desktop-break" /> building a team in China</p>
          </div>
          <div className="hero-city" aria-hidden="true" />
        </section>

        <section className="path-grid" id="paths">
          {paths.map(({ title, description, action, tone, icon: Icon }, index) => (
            <article className={`path-card ${tone}`} key={title} id={index === 0 ? 'sourcing' : index === 1 ? 'support' : 'manufacturing'}>
              <div className="card-bg" aria-hidden="true" />
              <div className="card-header">
                <div className="path-icon"><Icon size={30} strokeWidth={2} /></div>
                <h2 className="path-title" style={{ wordSpacing: '0.2em' }}>{title.split('\n').map((line) => <span style={{ display: 'block' }}>{line}</span>)}</h2>
              </div>
              <div className="card-body">
                <p>{description}</p>
                <button onClick={() => handlePathClick(action)}>{action} <ArrowRight size={16} /></button>
              </div>
            </article>
          ))}
        </section>

        {message && <div className="toast" role="status"><Sparkles size={16} /> {message}</div>}

        <section className="py-8 px-4 max-w-5xl mx-auto">
  <div style={{
    background: '#FAF7F2',
    border: '1px solid #EFECE6',
    borderRadius: '16px',
    padding: '40px 30px',
    textAlign: 'center',
    boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
  }}>
    <p style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '1.5px', color: '#D97706', marginBottom: '8px', textTransform: 'uppercase' }}>
      MEET OUR GROUND TEAM: YOUR ON-SITE PARTNERS
    </p>
    
    <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#111', marginBottom: '24px' }}>
      REAL EXPERIENCE. REAL EXECUTION. REAL RESULTS.
    </h2>

    {/* 3人头像行 */}
    <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '16px' }}>
      {/* 头像1 */}
      <img src="/team-1.jpg" alt="Rosalie" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />
      {/* 头像2 */}
      <img src="/team-2.jpg" alt="Team Member" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />
      {/* 头像3 */}
      <img src="/team-3.jpg" alt="Team Member" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />
    </div>

    <p style={{ fontSize: '15px', color: '#444', fontWeight: '500', marginBottom: '24px' }}>
      Your Trusted Partners | On the Ground to Ensure Your Success.
    </p>

    <p style={{ fontSize: '13px', color: '#666', marginBottom: '20px', letterSpacing: '0.5px' }}>
      REAL SINCERITY, OPEN COMMUNICATION, AND A HAPPY TEAM READY TO SUPPORT YOU.
    </p>

    {/* 社交媒体入口 */}
  {/* 完美统一风格的官方原色社媒图标入口 */}
<div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '28px', alignItems: 'center' }}>
  
  {/* YouTube (红底白标圆角方块) - 保持不变 */}
  <a 
    href="https://www.youtube.com/@RoscoreX_Industrial" 
    target="_blank" 
    rel="noopener noreferrer" 
    title="YouTube"
    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', backgroundColor: '#FF0000', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  </a>

  {/* LinkedIn (蓝底白标圆角方块) - 🔥 已为您更新为干净的纯色 SVG 代码🔥 */}
  <a 
    href="https://www.linkedin.com/company/roscorex" 
    target="_blank" 
    rel="noopener noreferrer" 
    title="LinkedIn"
    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', backgroundColor: '#0077b5', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}
  >
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.989v-10.131c0-7.88-8.922-7.593-11.019-3.714v-2.155z"/>
    </svg>
  </a>

  {/* Instagram (渐变色圆角方块) - 保持不变 */}
  <a 
    href="https://www.instagram.com/roscorex9" 
    target="_blank" 
    rel="noopener noreferrer" 
    title="Instagram"
    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}
  >
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  </a>

  {/* TikTok (黑底白标圆角方块) - 保持不变 */}
  <a 
    href="https://www.tiktok.com/@roscorex" 
    target="_blank" 
    rel="noopener noreferrer" 
    title="TikTok"
    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', backgroundColor: '#000000', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}
  >
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  </a>

</div>

    <div>
      <span style={{
        display: 'inline-block',
        background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
        color: '#fff',
        padding: '12px 32px',
        borderRadius: '8px',
        fontWeight: 'bold',
        fontSize: '15px',
        letterSpacing: '0.5px',
        boxShadow: '0 4px 12px rgba(234, 88, 12, 0.3)'
      }}>
        POWERED BY REAL SINCERITY &amp; POSITIVE ENERGY
      </span>
    </div>
  </div>
</section>

        <section className="process-section" id="resources">
          <p className="section-kicker">HOW WE WORK</p>
          <h2>A Simple, Proven Process</h2>
          <div className="process-grid">
            {[['01', Search, 'Understand', 'We learn about your needs, products, and markets.'], ['02', Users, 'Source & Evaluate', 'We find the right suppliers and verify their capability.'], ['03', ShieldCheck, 'Verify & Inspect', 'We conduct audits and quality checks to reduce risk.'], ['04', Factory, 'Manage & Deliver', 'We handle production follow-up, coordination and logistics.'], ['05', Users, 'Support & Grow', 'We support ongoing operations and help you scale.']].map(([number, Icon, title, text]) => {
              const ProcessIcon = Icon as typeof Search;
               return <div className="process-step" key={number as string}><span className="step-number">{number}</span><div className="step-icon"><ProcessIcon size={25} /></div><h3 style={{ fontSize: '18px', fontWeight: '700' }}>{title}</h3><p style={{ fontSize: '14px', lineHeight: '1.5' }}>{text}</p></div>;
})}
          </div>
        </section>

        <section className="contact-strip" id="contact">
  <div>
    <p className="section-kicker">READY TO MOVE FORWARD?</p>
    {/* 1. 通过 letterSpacing 扩大标题字母间距 */}
    <h2 style={{ wordSpacing: '0.1em' }}>Let’s make China work for your business.</h2>
  </div>

  {/* 2. 修改按钮样式：横向弹性布局、增长宽度、调整背景颜色 */}
  <a 
    href="mailto:info@roscorex.com" 
    className="contact-button large"
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justify: 'center',
      gap: '15px',                /* 图标与文字之间的间隔 */
      padding: '14px 28px',       /* 上下 14px，左右 28px（让按钮变长） */
      backgroundColor: '#f28c28', /* 按钮底色，可在此处更换 HEX 颜色 */
      whiteSpace: 'nowrap'
    }}
  >
    <Mail size={17} /> Talk to our team <ArrowRight size={16} />
  </a>
</section>

        {isModalOpen && (
          <div className="consultation-modal-backdrop" role="presentation" onMouseDown={() => setIsModalOpen(false)}>
            <section className="consultation-modal" role="dialog" aria-modal="true" aria-labelledby="consultation-title" onMouseDown={(event) => event.stopPropagation()}>
              <button className="modal-close" type="button" onClick={() => setIsModalOpen(false)} aria-label="Close consultation form">
                <X size={20} />
              </button>
              <p className="section-kicker">LET’S TALK</p>
              <h2 id="consultation-title">Tell us how we can help.</h2>
              <p className="modal-intro">Share a few details and our China-based team will get back to you with a practical next step.</p>

              {submissionStatus === 'success' ? (
                <div className="modal-success" role="status">
                  <Check size={28} />
                  <h3>Request sent successfully.</h3>
                  <p>Thank you. Our team will be in touch shortly.</p>
                </div>
              ) : (
                <form className="consultation-form" onSubmit={handleConsultationSubmit}>
                <fieldset className="service-options">
                  <legend>What can we help with?</legend>
                  <div className="service-option-list">
                    {paths.map(({ action }) => (
                      <label className="service-option" key={action}>
                        <input
                          type="checkbox"
                          checked={selectedServices.includes(action)}
                          onChange={() => handleServiceToggle(action)}
                        />
                        <span>{action}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="form-field-grid">
                  <label className="form-field">
                    <span>Name</span>
                    <input type="text" name="name" placeholder="Your name" required />
                  </label>
                  <label className="form-field">
                    <span>Work Email</span>
                    <input type="email" name="email" placeholder="you@company.com" required />
                  </label>
                </div>
                <label className="form-field">
                  <span>Project Requirements</span>
                  <textarea name="requirements" rows={4} placeholder="Tell us what you are planning or where you need support..." required />
                </label>
                {submissionStatus === 'error' && <p className="modal-error" role="alert">We couldn’t send your request right now. Please try again.</p>}
                <button className="modal-submit" type="submit" disabled={submissionStatus === 'submitting'}>
                  {submissionStatus === 'submitting' ? 'Sending request...' : 'Send my request'}
                  {submissionStatus !== 'submitting' && <ArrowRight size={16} />}
                </button>
              </form>
              )}
            </section>
          </div>
        )}
      </main>
      <footer>
        <div className="footer-left">
          <span className="footer-copy">© 2026 RoscoreX</span>
          <span className="footer-address">Room 1006, Block A, Eigao Digital Plaza, Jiaxing, Zhejiang Province, China</span>
        </div>
        <div className="footer-right">
          <span className="footer-tagline">Your China Partner on the Ground</span>
          <a className="footer-email" href="mailto:info@roscorex.com">info@roscorex.com</a>
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <a href="https://www.youtube.com/@RoscoreX_Industrial" target="_blank" rel="noopener noreferrer" title="YouTube" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', backgroundColor: '#FF0000', borderRadius: '7px', transition: 'transform .2s ease' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/roscorex" target="_blank" rel="noopener noreferrer" title="LinkedIn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', backgroundColor: '#0077b5', borderRadius: '7px', transition: 'transform .2s ease' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.989v-10.131c0-7.88-8.922-7.593-11.019-3.714v-2.155z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/roscorex9" target="_blank" rel="noopener noreferrer" title="Instagram" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)', borderRadius: '7px', transition: 'transform .2s ease' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@roscorex" target="_blank" rel="noopener noreferrer" title="TikTok" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', backgroundColor: '#000000', borderRadius: '7px', transition: 'transform .2s ease' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
