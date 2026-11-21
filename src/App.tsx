import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { accessoryImages, categories, categoryImages, faqs, images, money, products, settings, whatsapp, type Product } from './data';

function Icon({ name = 'arrow', className = '' }: { name?: string; className?: string }) {
  const paths: Record<string, string> = {
    arrow: 'M4 12h16m-6-6 6 6-6 6', search: 'm21 21-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
    menu: 'M4 7h16M4 12h16M4 17h16', close: 'm6 6 12 12M6 18 18 6',
    sparkle: 'm12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z',
    heart: 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z',
    gift: 'M3 8h18v4H3zM5 12v9h14v-9M12 8v13M12 8H7.5A2.5 2.5 0 1 1 10 5.5L12 8Zm0 0h4.5A2.5 2.5 0 1 0 14 5.5L12 8Z',
    truck: 'M1 4h13v13H1zM14 9h5l4 5v3h-9M8 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0m13 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0',
    whatsapp: 'M21 11.5a9 9 0 0 1-13.3 7.9L3 21l1.5-4.8A9 9 0 1 1 21 11.5ZM8 7c-2 3 3 8 6 8l2-2-3-1-1 1-2-2 1-1-1-3Z',
    instagram: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm9 9a4 4 0 1 1-8 0 4 4 0 0 1 8 0m1-6h.01',
  };
  return <svg className={`h-5 w-5 shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.arrow} /></svg>;
}
function Photo({ src, alt, className = '', eager = false }: { src: string; alt: string; className?: string; eager?: boolean }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  return failed ? <div className={`flex items-center justify-center bg-[#e9ddd3] ${className}`}><svg viewBox="0 0 120 120" className="h-32 w-32" role="img" aria-label={alt}><circle cx="60" cy="66" r="32" stroke="#89909a" strokeWidth="5" fill="none" /><path d="m48 31 12-16 12 16-12 13Z" fill="#c9b79c" /></svg></div> : <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} className={className} onError={() => setFailed(true)} />;
}
function Wordmark() {
  return <a href="#/" aria-label="Genzo Official home" className="inline-flex min-h-11 flex-col items-center"><span className="font-serif text-4xl leading-none tracking-[.22em]">GENZO</span><span className="mt-2 text-xs tracking-[.48em]">OFFICIAL</span></a>;
}
function Sketch({ light = false, flip = false }: { light?: boolean; flip?: boolean }) {
  const ref = useRef<SVGSVGElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.1 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <svg ref={ref} aria-hidden="true" viewBox="0 0 480 480" fill="none" className={`section-sketch ${visible ? 'is-visible' : 'is-waiting'} ${light ? 'section-sketch-light' : ''} ${flip ? 'section-sketch-flip' : ''}`}>
    <path d="M450 60C345 23 262 74 286 157c23 80 143 34 99-28-32-45-133-10-181 57C146 268 173 379 30 429" />
    <path d="M396 68c-78 2-120 43-105 89 17 49 82 42 98 10" />
    <path d="M204 187c-48-34-92-30-113 1 39 19 78 19 113-1Zm-27 45c-48-6-80 11-88 45 39 4 72-11 88-45Zm-18 48c-41 2-65 25-65 55 33-4 58-23 65-55Z" />
    <path d="M339 269v46m-23-23h46m-39-16 32 32m0-32-32 32" />
    <circle cx="343" cy="292" r="38" />
  </svg>;
}
const label = 'text-xs font-medium uppercase tracking-[.22em]';
const button = 'group relative overflow-hidden inline-flex min-h-12 items-center justify-center gap-4 rounded-full px-7 text-sm transition-all hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#c9b79c] after:pointer-events-none after:absolute after:inset-0 after:-translate-x-full after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:transition-transform after:duration-700 hover:after:translate-x-full';
function WhatsApp({ product, children, className = '' }: { product?: Product; children?: React.ReactNode; className?: string }) {
  const url = whatsapp(product);
  if (!url) return <span aria-disabled="true" className={`${button} ${className} opacity-70`}><Icon name="whatsapp" />WhatsApp ordering coming soon</span>;
  return <a href={url} target="_blank" rel="noreferrer" className={`${button} ${className}`}><Icon name="whatsapp" />{children || 'Order on WhatsApp'}</a>;
}
function ProductCard({ product: p }: { product: Product }) {
  return <article className="group min-w-0">
    <a href={`#/product/${p.slug}`} className="relative block aspect-[4/5] overflow-hidden rounded-3xl bg-[#e9e5de] transition-transform duration-500 group-hover:-translate-y-1">
      <Photo src={p.images[0]} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      {p.images[1] && <Photo src={p.images[1]} alt={`${p.name} alternate styling`} className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100" />}
      {(p.newArrival || p.salePrice) && <span className={`absolute left-3 top-3 rounded-full px-3 py-1.5 text-xs ${p.newArrival ? 'bg-[#1e2733] text-white' : 'bg-[#e9ddd3] text-[#1f2328]'}`}>{p.newArrival ? 'New arrival' : 'Sale'}</span>}
      {!p.inStock && <span className="absolute inset-0 flex items-center justify-center bg-[#1e2733]/50 text-white">Sold out</span>}
      <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#faf7f2]"><Icon /></span>
    </a>
    <p className={`${label} mt-5 text-[#64615c]`}>{p.category}</p>
    <a href={`#/product/${p.slug}`} className="mt-1 block font-serif text-2xl">{p.name}</a>
    <p className="mt-2 text-sm">{p.priceOnRequest ? 'Price on request' : money(p.salePrice ?? p.price)} {p.salePrice && <s className="ml-2 text-xs text-slate-600">{money(p.price)}</s>}</p>
    {p.inStock && (whatsapp(p) ? <a target="_blank" rel="noreferrer" href={whatsapp(p)} className="mt-2 inline-flex min-h-11 items-center gap-2 text-sm underline decoration-[#b8bdc6] underline-offset-4">Order on WhatsApp <Icon name="whatsapp" className="!h-4 !w-4" /></a> : <span className="mt-2 inline-flex min-h-11 items-center text-xs text-[#64615c]">Ordering coming soon</span>)}
  </article>;
}
function SectionTitle({ eyebrow, title, link }: { eyebrow: string; title: string; link?: boolean }) {
  return <div className="mb-10 flex flex-wrap items-end justify-between gap-5"><div><p className={`${label} mb-3 text-[#716354]`}>{eyebrow}</p><h2 className="font-serif text-4xl md:text-5xl">{title}</h2></div>{link && <a href="#/shop" className="inline-flex min-h-11 items-center gap-5 border-b border-[#b8bdc6] text-sm">Explore all pieces <Icon /></a>}</div>;
}
function FaqList({ compact = false }: { compact?: boolean }) {
  return <div className="border-t border-[#cfc5b8]">{faqs.slice(0, compact ? 4 : undefined).map(({ question, answer }) => <details key={question} className="faq-item group border-b border-[#cfc5b8]">
    <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 font-serif text-2xl marker:content-none">{question}<span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#b8bdc6] text-xl font-sans transition-transform duration-300 group-open:rotate-45">+</span></summary>
    <p className="max-w-xl pb-6 pr-10 text-sm leading-7 text-[#5f5a54]">{answer}</p>
  </details>)}</div>;
}

const editCards = [
  { title: 'The art of getting ready.', text: 'A few favourite details, and you’re ready for wherever the day takes you.', image: accessoryImages.styleEdit, href: '#/shop', cta: 'Shop the collection', n: '01', tag: 'A moment for you' },
  { title: 'The finishing touch', text: 'Jewellery for the everyday and beyond.', image: images[1], href: '#/shop?category=Rings', cta: 'Shop rings', n: '02', tag: 'The Genzo edit' },
  { title: 'Out the door', text: 'Easy accessories for days in the sun.', image: accessoryImages.sunglasses, href: '#/shop?category=Sunglasses', cta: 'Shop sunglasses', n: '03', tag: 'The Genzo edit' },
  { title: 'The everyday cap', text: 'A relaxed finishing touch for days on the go.', image: accessoryImages.caps, href: '#/shop?category=Caps', cta: 'Shop caps', n: '04', tag: 'The Genzo edit' },
  { title: 'Gift something lovely', text: 'Little joys, thoughtfully chosen for someone special.', image: images[3], href: '#/shop?category=Earrings', cta: 'Shop earrings', n: '05', tag: 'The Genzo edit' },
];
function EditAccordion() {
  const ref = useRef<HTMLDivElement>(null);
  // -1 = everything collapsed; the first card opens once the section scrolls into view
  const [active, setActive] = useState(-1);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    let timer: ReturnType<typeof setTimeout>;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setActive(-1); timer = setTimeout(() => setActive(a => (a === -1 ? 0 : a)), 600); }
      else { clearTimeout(timer); setActive(-1); }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => { io.disconnect(); clearTimeout(timer); };
  }, []);
  return <div ref={ref} data-edit className="flex h-[640px] flex-col gap-3 md:h-[620px] md:flex-row md:gap-4" onMouseLeave={() => setActive(a => (a === -1 ? a : 0))}>
    {editCards.map((c, i) => {
      const open = active === i;
      return <article key={c.n} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)} className={`group relative min-h-0 min-w-0 cursor-pointer overflow-hidden rounded-3xl bg-[#1e2733] transition-[flex-grow] duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] md:basis-0 ${open ? 'grow-[6]' : 'grow-[1]'} basis-0`}>
        <Photo src={c.image} alt="" className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ${open ? 'scale-105' : 'scale-100'}`} />
        <div className={`absolute inset-0 transition-opacity duration-700 ${open ? 'bg-gradient-to-t from-[#121c28]/80 via-[#121c28]/10 to-transparent opacity-100' : 'bg-[#121c28]/45 opacity-100'}`} />
        <span className={`absolute left-5 top-5 font-serif text-2xl text-white transition-opacity duration-500 ${open ? 'opacity-0' : 'opacity-90'}`}>{c.n}</span>
        <div className={`absolute inset-x-0 bottom-0 p-6 text-white transition-all duration-700 md:p-9 ${open ? 'translate-y-0 opacity-100 delay-300' : 'pointer-events-none translate-y-4 opacity-0'}`}>
          <p className={`${label} text-[#e9ddd3]`}>{c.n} / {c.tag}</p>
          <h3 className="mt-3 max-w-sm font-serif text-3xl md:text-5xl">{c.title}</h3>
          <p className="mt-3 max-w-sm text-sm leading-7 text-white/90">{c.text}</p>
          <a href={c.href} tabIndex={open ? 0 : -1} className="mt-5 inline-flex min-h-11 items-center gap-4 border-b border-white/70 text-sm">{c.cta} <Icon /></a>
        </div>
      </article>;
    })}
  </div>;
}
function NewsletterPopup() {
  const KEY = 'genzo_newsletter_seen';
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    let seen = false; try { seen = !!localStorage.getItem(KEY); } catch { /* storage unavailable */ }
    if (seen) return;
    const t = setTimeout(() => { setShow(true); try { localStorage.setItem(KEY, '1'); } catch { /* ignore */ } }, 1800);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    if (!show) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setShow(false); };
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey);
  }, [show]);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setError('Please enter a valid email address.'); return; }
    setError('');
    try {
      const list = JSON.parse(localStorage.getItem('genzo_newsletter_emails') || '[]'); list.push(email.trim()); localStorage.setItem('genzo_newsletter_emails', JSON.stringify(list));
    } catch { /* ignore */ }
    if (settings.newsletterEndpoint) { try { await fetch(settings.newsletterEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ email: email.trim() }) }); } catch { /* ignore */ } }
    setDone(true); setTimeout(() => setShow(false), 2200);
  };
  if (!show) return null;
  return createPortal(<div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#121c28]/60 p-5 backdrop-blur-sm motion-safe:animate-[fadein_.5s_both]" role="dialog" aria-modal="true" aria-labelledby="nl-title" onMouseDown={e => { if (e.target === e.currentTarget) setShow(false); }}>
    <div className="relative grid w-full max-w-3xl overflow-hidden rounded-3xl bg-[#faf7f2] text-[#1e2733] shadow-2xl md:grid-cols-[.9fr_1.1fr]">
      <button onClick={() => setShow(false)} aria-label="Close newsletter popup" className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/80 text-[#1e2733] hover:bg-white"><Icon name="close" /></button>
      <Photo src={accessoryImages.editorial} alt="" className="hidden h-full w-full object-cover md:block" />
      <div className="p-8 md:p-11">
        <p className={`${label} text-[#716354]`}>Join the Genzo list</p>
        <h2 id="nl-title" className="mt-4 font-serif text-4xl leading-tight md:text-5xl">A little something, in your inbox.</h2>
        {done ? <p className="mt-6 text-sm leading-7 text-[#3f5b49]">Thank you! You’re on the list ✧</p> : <>
          <p className="mt-4 text-sm leading-7 text-[#64615c]">Be the first to hear about new pieces, restocks and little surprises.</p>
          <form onSubmit={submit} noValidate className="mt-6">
            <label htmlFor="nl-email" className="sr-only">Email address</label>
            <input id="nl-email" type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" className="min-h-12 w-full rounded-full border border-[#c9b79c] bg-white px-5 text-sm outline-none focus:ring-2 focus:ring-[#c9b79c]" />
            {error && <p role="alert" className="mt-2 px-2 text-xs text-[#a33]">{error}</p>}
            <button type="submit" className={`${button} mt-3 w-full bg-[#1e2733] text-[#faf7f2] hover:bg-[#2c3a4b]`}>Subscribe <Icon /></button>
          </form>
          <button onClick={() => setShow(false)} className="mt-3 min-h-11 w-full text-xs text-[#716354] underline-offset-4 hover:underline">No, thanks</button>
        </>}
      </div>
    </div>
  </div>, document.body);
}
function Home() {
  const [slide, setSlide] = useState(0);
  useEffect(() => { if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; const timer = setInterval(() => setSlide(s => (s + 1) % settings.heroImages.length), 5800); return () => clearInterval(timer); }, []);
  return <>
    <section className="relative flex h-[calc(100svh-36px)] min-h-[740px] max-h-[1100px] items-center overflow-hidden bg-[#1e2733] text-white">
      <NewsletterPopup />
      {settings.heroImages.map((src, i) => <div key={src} className={`absolute inset-0 transition-opacity duration-[1800ms] ${slide === i ? 'opacity-100' : 'opacity-0'}`}><Photo src={src} alt={i === 0 ? 'A cap, sunglasses and accessories styled in warm natural light' : 'Sculptural jewellery in warm natural light'} eager className={`h-full w-full object-cover object-[65%_50%] ${slide === i ? 'motion-safe:animate-[kenburns_7s_ease-out_both]' : ''}`} /></div>)}
      <div className="absolute inset-0 bg-gradient-to-r from-[#121c28]/85 via-[#182331]/55 to-[#182331]/25" />
      <div className="relative mx-auto w-full max-w-[1440px] px-6 pb-10 pt-32 md:px-16 lg:px-24">
        <p className={`${label} mb-7 flex items-center gap-3 text-[#e9ddd3]`}><span className="h-px w-8 bg-[#c9b79c]" />Jewellery &amp; everyday accessories</p>
        <h1 aria-label={settings.heading} className="max-w-[760px] font-serif text-[68px] font-normal leading-[.98] tracking-[-.035em] md:text-[98px] lg:text-[112px]">{settings.heading.split(' ').map((word, i) => <span key={`${word}-${i}`} aria-hidden="true" style={{ animationDelay: `${i * 130}ms` }} className={`inline-block motion-safe:animate-[reveal_1s_both] ${i > 1 ? 'italic text-[#e9ddd3]' : ''}`}>{word}&nbsp;</span>)}</h1>
        <p className="mt-7 max-w-[380px] text-sm leading-7 text-[#f0eae3]">{settings.subheading}</p>
        <div className="mt-9 flex flex-wrap gap-4"><a href="#/shop" className={`${button} bg-[#faf7f2] text-[#1e2733] hover:bg-[#e9ddd3]`}>Shop Collection <Icon /></a><WhatsApp className="border border-white/60 text-white">Chat on WhatsApp</WhatsApp></div>
        <div className="mt-12 flex items-center gap-3 text-xs tracking-wider text-[#e9ddd3]"><Icon name="sparkle" className="text-[#c9b79c]" />Thoughtful details. Your kind of beautiful.</div>
      </div>
      <div className="absolute bottom-7 left-6 flex gap-2 md:left-16 lg:left-24">{settings.heroImages.map((_, i) => <button key={i} aria-label={`Show jewellery image ${i + 1}`} aria-pressed={slide === i} onClick={() => setSlide(i)} className="flex h-11 min-w-8 items-center justify-center"><span className={`h-1 rounded-full transition-all ${slide === i ? 'w-9 bg-white' : 'w-3 bg-[#b8bdc6]'}`} /></button>)}</div>
      <a href="#categories" onClick={e => { e.preventDefault(); document.getElementById('categories')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); }} className="absolute bottom-10 right-6 flex items-center gap-3 text-xs uppercase tracking-[.2em] md:right-16">Discover <span className="motion-safe:animate-bounce">↓</span></a>
      <div className="absolute right-16 top-36 hidden h-24 w-24 items-center justify-center rounded-full border border-white/40 text-center lg:flex"><span className="text-xs tracking-[.18em]">THE<br /><span className="font-serif text-3xl">G</span><br />EDIT</span></div>
    </section>
    <div className="overflow-hidden border-b border-[#dcd6ce] bg-[#eee8e0] py-5"><div className="flex w-max motion-safe:animate-[marquee_45s_linear_infinite]">{[0, 1, 2, 3].map(i => <span key={i} className="whitespace-nowrap px-6 text-xs uppercase tracking-[.22em]">Sterling Silver Jewellery <span className="px-6 text-[#81715c]">✧</span> Everyday Caps <span className="px-6 text-[#81715c]">✧</span> Sunglasses <span className="px-6 text-[#81715c]">✧</span> Finishing Touches <span className="px-6 text-[#81715c]">✧</span> Easy WhatsApp Ordering <span className="px-6 text-[#81715c]">✧</span></span>)}</div></div>
    <section id="categories" className="relative isolate mx-auto max-w-[1440px] scroll-mt-28 overflow-hidden px-6 py-20 md:px-16 md:py-24 lg:px-24">
      <Sketch />
      <SectionTitle eyebrow="A little something for every you" title="Find your kind of style." link />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
        {categories.map((c, i) => <a href={`#/shop?category=${encodeURIComponent(c)}`} key={c} className={`group relative min-h-56 overflow-hidden rounded-3xl ${i === 0 || i === 3 || i === 6 ? 'md:col-span-2' : ''} md:h-72`}><Photo src={categoryImages[i]} alt={`${c} collection`} className="absolute h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#101722]/80 via-transparent to-transparent" /><div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5 text-white md:p-7"><h3 className="font-serif text-3xl">{c}</h3><Icon /></div></a>)}
      </div>
    </section>
    <section className="relative isolate overflow-hidden border-t border-[#e4ded5] bg-[#f2eee8]"><Sketch flip /><div className="mx-auto max-w-[1440px] px-6 py-20 md:px-16 lg:px-24"><SectionTitle eyebrow="The pieces you come back to" title="Everyday, made extraordinary." link /><div className="grid grid-cols-2 gap-x-5 gap-y-9 lg:grid-cols-4">{products.filter(p => p.featured).map(p => <ProductCard key={p.code} product={p} />)}</div></div></section>
    <section className="relative isolate mx-auto max-w-[1440px] overflow-hidden px-6 py-20 md:px-16 md:py-28 lg:px-24">
      <Sketch flip />
      <div className="mb-9 flex flex-wrap items-end justify-between gap-5"><div><p className={`${label} mb-3 text-[#716354]`}>A little inspiration, just for you</p><h2 className="font-serif text-5xl md:text-6xl">The everyday edit<span className="italic text-[#8e7c69]">.</span></h2></div><p className="max-w-xs text-sm leading-7 text-[#64615c]">For the coffee runs, the celebrations, and all the lovely moments in between.</p></div>
      <EditAccordion />
    </section>
    <section className="grid bg-[#e9ddd3] md:min-h-[530px] md:grid-cols-2"><Photo src={accessoryImages.editorial} alt="Caps, sunglasses and jewellery styled together" className="h-80 w-full object-cover md:h-full" /><div className="relative isolate flex flex-col items-start justify-center overflow-hidden px-8 py-16 md:px-16 lg:px-24"><Sketch /><p className={`${label} mb-5 text-[#695b4b]`}>The Genzo point of view</p><h2 className="font-serif text-6xl leading-tight">It’s all in<br /><i>the details.</i></h2><p className="my-6 max-w-md text-sm leading-7 text-[#514b44]">From silver jewellery to the perfect pair of sunglasses, we believe the smallest details can make you feel most like yourself.</p><a href="#/about" className={`${button} border border-[#1e2733]/40`}>Get to know us <Icon /></a></div></section>
    <section className="relative isolate overflow-hidden bg-[#1e2733] px-6 py-20 text-[#faf7f2] md:px-16"><Sketch light flip /><div className="mx-auto max-w-6xl"><div className="text-center"><p className={`${label} text-[#e9ddd3]`}>Why Genzo Official</p><h2 className="mt-4 font-serif text-5xl">The little things that matter.</h2></div><div className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4">{[['sparkle', 'Thoughtfully chosen', 'Little details for your everyday.'], ['heart', 'Made for your style', 'Pieces that feel effortlessly you.'], ['gift', 'Something to gift', 'Find a little joy for someone special.'], ['truck', 'A personal touch', 'Ask us about delivery and your order.']].map(([icon, title, text]) => <div key={title} className="rounded-2xl border border-[#b8bdc6]/25 p-5 md:p-6"><Icon name={icon} className="mb-6 !h-8 !w-8 text-[#c9b79c]" /><h3 className="font-serif text-2xl">{title}</h3><p className="mt-3 text-sm leading-6 text-[#d4d6db]">{text}</p></div>)}</div></div></section>
    <section className="relative isolate mx-auto max-w-[1440px] overflow-hidden px-6 py-20 md:px-16 lg:px-24"><Sketch /><SectionTitle eyebrow="A conversation, not a checkout" title="Your next favourite, four steps away." /><div className="grid gap-8 md:grid-cols-4">{[['Choose your piece', 'Find the detail that speaks to you.'], ['Tap Order on WhatsApp', 'Say hello through your favourite piece.'], ['Confirm the details', 'Confirm your address and payment in chat.'], ['A little doorstep joy', 'We carefully pack and send it your way.']].map(([title, text], i) => <div key={title} className="border-t border-[#b8bdc6] pt-5"><span className="font-serif text-4xl text-[#81715c]">0{i + 1}</span><h3 className="mt-5 font-serif text-2xl">{title}</h3><p className="mt-3 text-sm leading-6 text-[#64615c]">{text}</p></div>)}</div></section>
    <section className="relative isolate overflow-hidden bg-[#f2eee8] px-6 py-20 md:px-16 lg:px-24"><Sketch flip /><div className="mx-auto grid max-w-[1248px] gap-10 md:grid-cols-[.8fr_1.2fr] md:gap-20"><div><p className={`${label} text-[#716354]`}>Here to help</p><h2 className="mt-4 font-serif text-5xl md:text-6xl">Good questions,<br /><i>good answers.</i></h2><p className="mt-5 max-w-xs text-sm leading-7 text-[#64615c]">A little more information, so finding your next favourite feels easy.</p><a href="#/help" className="mt-7 inline-flex min-h-11 items-center gap-5 border-b border-[#b8bdc6] text-sm">Visit the help page <Icon /></a></div><FaqList compact /></div></section>
    <section className="relative isolate overflow-hidden bg-[#e9ddd3] px-6 py-20 text-center md:py-24"><Sketch /><p className={`${label} text-[#716354]`}>We’re here for the little things</p><h2 className="mx-auto mt-4 max-w-2xl font-serif text-5xl leading-tight md:text-6xl">Found something that feels like <i>you?</i></h2><p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#5f5a54]">Explore your favourites or get in touch for a little help choosing.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><a href="#/shop" className={`${button} bg-[#1e2733] text-white`}>Explore the collection <Icon /></a><a href="#/contact" className={`${button} border border-[#1e2733]/40`}>Get in touch</a></div></section>
  </>;
}
function Shop() {
  const [category, setCategory] = useState(new URLSearchParams(window.location.hash.split('?')[1]).get('category') || 'All');
  const [search, setSearch] = useState(''), [sort, setSort] = useState('newest'), [stock, setStock] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  useEffect(() => { if (new URLSearchParams(window.location.hash.split('?')[1]).has('search')) searchRef.current?.focus(); }, []);
  const term = search.trim().toLowerCase();
  const filtered = products.filter(p => (category === 'All' || p.category === category) && [p.name, p.category, p.code].some(value => value.toLowerCase().includes(term)) && (!stock || p.inStock)).sort((a, b) => {
    if (sort === 'newest') return Number(b.newArrival) - Number(a.newArrival);
    if (!!a.priceOnRequest !== !!b.priceOnRequest) return a.priceOnRequest ? 1 : -1;
    return sort === 'low' ? (a.salePrice ?? a.price) - (b.salePrice ?? b.price) : (b.salePrice ?? b.price) - (a.salePrice ?? a.price);
  });
  return <main className="relative isolate mx-auto max-w-[1440px] overflow-hidden px-6 pb-24 pt-16 md:px-16 lg:px-24"><Sketch /><p className={`${label} text-[#716354]`}>Thoughtfully chosen. Forever treasured.</p><h1 className="my-5 font-serif text-6xl md:text-7xl">The Genzo collection.</h1><p className="text-sm text-[#64615c]">Jewellery and everyday accessories for every version of you.</p>
    <div className="my-10 flex flex-wrap gap-2">{['All', ...categories].map(c => <button key={c} onClick={() => setCategory(c)} aria-pressed={category === c} className={`min-h-11 rounded-full border px-5 text-sm ${category === c ? 'border-[#1e2733] bg-[#1e2733] text-white' : 'border-[#d6cfc5] hover:bg-[#e9ddd3]'}`}>{c}</button>)}</div>
    <div className="mb-9 flex flex-wrap items-center gap-5 border-y border-[#d6cfc5] py-5"><div className="flex min-h-11 min-w-48 flex-1 items-center gap-3"><Icon name="search" /><input ref={searchRef} aria-label="Search products by name, category or code" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, category or code..." className="min-h-11 min-w-0 flex-1 bg-transparent text-sm outline-none" />{search && <button aria-label="Clear search" onClick={() => { setSearch(''); searchRef.current?.focus(); }} className="flex h-11 w-11 items-center justify-center"><Icon name="close" /></button>}</div><label className="flex min-h-11 items-center gap-2 text-sm"><input type="checkbox" checked={stock} onChange={e => setStock(e.target.checked)} className="h-4 w-4 accent-[#1e2733]" />In stock only</label><select aria-label="Sort products" value={sort} onChange={e => setSort(e.target.value)} className="min-h-11 bg-transparent text-sm"><option value="newest">Newest</option><option value="low">Price low to high</option><option value="high">Price high to low</option></select></div>
    <div className="mb-6 flex items-center justify-between gap-4"><p aria-live="polite" className="text-sm text-[#64615c]">{filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'} to fall for</p>{(category !== 'All' || search || stock) && <button className="min-h-11 text-sm underline underline-offset-4" onClick={() => { setCategory('All'); setSearch(''); setStock(false); }}>Clear filters</button>}</div><div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">{filtered.map(p => <ProductCard key={p.code} product={p} />)}</div>{!filtered.length && <div className="py-20 text-center"><h2 className="font-serif text-4xl">No favourites here… yet.</h2><p className="mt-4 text-sm">Try another search or category.</p><button className={`${button} mt-6 border`} onClick={() => { setCategory('All'); setSearch(''); setStock(false); }}>Clear filters</button></div>}</main>;
}
function Detail({ product: p }: { product: Product }) {
  const [selected, setSelected] = useState(0);
  useEffect(() => setSelected(0), [p.slug]);
  return <main className="mx-auto max-w-[1440px] px-6 py-12 md:px-16 lg:px-24"><a href="#/shop" className="mb-8 inline-flex min-h-11 items-center gap-3 text-sm">← Back to collection</a><div className="grid gap-10 md:grid-cols-2 lg:gap-20"><div><div className="group aspect-[4/5] overflow-hidden rounded-3xl"><Photo src={p.images[selected]} alt={p.name} eager className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-125" /></div><div className="mt-4 flex gap-3">{p.images.map((src, i) => <button key={src} aria-label={`View image ${i + 1}`} aria-pressed={selected === i} onClick={() => setSelected(i)} className={`h-24 w-20 overflow-hidden rounded-xl border-2 ${selected === i ? 'border-[#1e2733]' : 'border-transparent'}`}><Photo src={src} alt={`${p.name} detail ${i + 1}`} className="h-full w-full object-cover" /></button>)}</div></div>
    <div className="py-5"><p className={`${label} text-[#716354]`}>{p.category} · The Genzo Edit</p><h1 className="my-5 font-serif text-6xl">{p.name}</h1><p className="text-xl">{p.priceOnRequest ? 'Price on request' : money(p.salePrice ?? p.price)} {p.salePrice && <s className="ml-3 text-base text-slate-600">{money(p.price)}</s>}</p><p className="my-8 text-sm leading-8 text-[#64615c]">{p.description}</p><dl className="mb-8">{[['Material', p.material], ...(p.weight ? [['Weight', p.weight]] : []), ['Product code', p.code], ['Availability', p.inStock ? 'In stock' : 'Sold out']].map(([key, value]) => <div key={key} className="flex justify-between border-b border-[#ded6cb] py-4 text-sm"><dt className="text-[#64615c]">{key}</dt><dd>{value}</dd></div>)}</dl>{p.inStock ? <WhatsApp product={p} className="w-full bg-[#246348] text-white hover:bg-[#1b513a]" /> : <p className="rounded-full bg-[#e9ddd3] p-4 text-center text-sm">This piece is currently sold out.</p>}<p className="mt-5 flex items-center justify-center gap-2 text-xs text-[#64615c]"><Icon name="sparkle" />{p.material === '925 Sterling Silver' ? '925 sterling silver · ' : ''}Thoughtfully selected for you</p><p className="mt-7 text-sm leading-7 text-[#64615c]">We’ll confirm availability, delivery charges, and payment details personally on WhatsApp. No online checkout needed.</p></div></div>
    <section className="mt-24"><SectionTitle eyebrow="Better together" title="A little more to love." /><div className="grid grid-cols-2 gap-5 lg:grid-cols-4">{products.filter(other => other.code !== p.code).sort((a, b) => Number(b.category === p.category) - Number(a.category === p.category)).slice(0, 4).map(other => <ProductCard key={other.code} product={other} />)}</div></section></main>;
}
function About() {
  return <main><section className="relative isolate mx-auto grid max-w-7xl items-center gap-12 overflow-hidden px-6 py-16 md:grid-cols-2 md:px-16"><Sketch /><div><p className={`${label} text-[#716354]`}>Our story</p><h1 className="my-6 font-serif text-6xl md:text-7xl">A softer kind<br />of statement.</h1><p className="text-sm leading-8 text-[#64615c]">Genzo Official is a Pakistani accessories brand built on a simple belief: the things you wear should feel genuinely yours. We bring together sterling silver jewellery, caps, sunglasses and finishing touches for ordinary days and unforgettable moments.</p><p className="mt-5 text-sm leading-8 text-[#64615c]">Thoughtfully chosen pieces, effortless style, and a personal conversation whenever you need us. Because the little details are what make your look your own.</p></div><Photo src={accessoryImages.editorial} alt="A curated collection of everyday accessories" className="aspect-[4/5] w-full rounded-3xl object-cover" /></section>
    <section className="bg-[#e9ddd3] px-6 py-16 text-center"><p className={label}>Real silver. Simply explained.</p><h2 className="my-5 font-serif text-5xl">What does 925 mean?</h2><p className="mx-auto max-w-2xl text-sm leading-8">Sterling silver contains 92.5% pure silver and 7.5% strengthening metals. That beautiful balance gives your jewellery its lasting shine and everyday durability. Natural tarnish is normal — a little care brings its glow right back.</p></section>
    <section className="relative isolate mx-auto max-w-7xl overflow-hidden px-6 py-20 md:px-16"><Sketch flip /><SectionTitle eyebrow="Sterling silver care guide" title="A little love goes a long way." /><div className="grid gap-5 md:grid-cols-3">{[['Wear it often', 'Regular wear helps keep your sterling silver looking its best.'], ['Keep it dry', 'Remove before swimming, showering, or working out.'], ['Last on, first off', 'Apply perfume and lotions before putting on your jewellery.'], ['Store separately', 'Keep in a dry, airtight pouch to avoid scratches and moisture.'], ['Polish gently', 'Use a soft silver-polishing cloth. Avoid abrasive cleaners.'], ['Be gentle', 'Protect delicate chains and settings from pulling or impact.']].map(([title, text], i) => <div key={title} className="rounded-3xl border border-[#d6cfc5] p-8"><span className="font-serif text-3xl text-[#81715c]">0{i + 1}</span><h3 className="my-4 font-serif text-3xl">{title}</h3><p className="text-sm leading-7 text-[#64615c]">{text}</p></div>)}</div></section></main>;
}
function Contact() {
  return <main className="relative isolate mx-auto max-w-5xl overflow-hidden px-6 py-20"><Sketch /><p className={`${label} text-center text-[#716354]`}>A personal touch</p><h1 className="my-6 text-center font-serif text-6xl md:text-7xl">Let’s talk style.</h1><p className="text-center text-sm text-[#64615c]">A question, a gift idea, or a piece you can’t stop thinking about?</p><div className="my-12 rounded-3xl bg-[#e9ddd3] p-10 text-center md:p-16"><Icon name="whatsapp" className="mx-auto !h-12 !w-12" /><h2 className="my-5 font-serif text-4xl">A real person. A little guidance.</h2><p className="mb-7 text-sm leading-7">Talk to us about products, sizing, availability, and ordering.</p><WhatsApp className="bg-[#246348] text-white">Start a conversation</WhatsApp>{!whatsapp() && <p className="mt-5 text-xs leading-6 text-[#64615c]">Our WhatsApp contact is being set up. Please check back soon.</p>}</div><div className="grid gap-10 md:grid-cols-3">
    <div><h2 className="mb-4 font-serif text-2xl">Find us</h2><p className="text-sm leading-7">{settings.address || 'Location details coming soon.'}</p>{settings.map && <a href={settings.map} target="_blank" rel="noreferrer" className="mt-3 inline-block min-h-11 text-sm underline">View on Google Maps ↗</a>}</div>
    <div><h2 className="mb-4 font-serif text-2xl">Say hello</h2><p className="text-sm leading-7">{settings.timings || 'Contact details coming soon.'}</p>{settings.email && <a href={`mailto:${settings.email}`} className="mt-3 inline-block min-h-11 text-sm underline">{settings.email}</a>}</div>
    <div><h2 className="mb-4 font-serif text-2xl">Stay a little closer</h2>{settings.instagram && <a href={settings.instagram} target="_blank" rel="noreferrer" className="flex min-h-11 items-center gap-3 text-sm"><Icon name="instagram" />Instagram ↗</a>}{settings.facebook && <a href={settings.facebook} target="_blank" rel="noreferrer" className="flex min-h-11 items-center gap-3 text-sm"><span className="w-5 font-serif text-2xl">f</span>Facebook ↗</a>}{!settings.instagram && !settings.facebook && <p className="text-sm leading-7">Social links coming soon.</p>}</div>
  </div></main>;
}
function Help() {
  return <main className="relative isolate mx-auto max-w-5xl overflow-hidden px-6 py-16 md:py-24"><Sketch /><p className={`${label} text-[#716354]`}>The little details, explained</p><h1 className="mt-5 font-serif text-6xl md:text-7xl">How can we help?</h1><p className="mb-12 mt-5 max-w-lg text-sm leading-7 text-[#64615c]">From finding the right piece to placing an order, here’s what you might like to know.</p><FaqList /><div className="mt-14 grid gap-5 rounded-3xl bg-[#e9ddd3] p-8 md:grid-cols-[1fr_auto] md:items-center md:p-10"><div><p className={`${label} text-[#716354]`}>Still curious?</p><h2 className="mt-3 font-serif text-4xl">We’re happy to help.</h2><p className="mt-3 text-sm leading-7 text-[#5f5a54]">For a question about a piece, get in touch with us directly.</p></div><a href="#/contact" className={`${button} self-start border border-[#1e2733]/40`}>Contact us <Icon /></a></div></main>;
}
function Footer() {
  return <footer className="bg-[#1e2733] px-6 pb-6 pt-16 text-[#faf7f2] md:px-16 lg:px-24"><div className="mx-auto grid max-w-7xl gap-12 pb-14 md:grid-cols-[1.5fr_1fr_1fr_1fr]"><div className="justify-self-start"><Wordmark /><p className="mt-6 max-w-60 text-sm leading-7 text-[#d4d6db]">Thoughtful details. Quiet confidence.<br />A little something for your everyday.</p></div><div><h3 className={`${label} mb-5 text-[#e9ddd3]`}>Explore</h3>{[['Collection', '/shop'], ['Our story', '/about'], ['Silver care', '/about'], ['Help & FAQs', '/help'], ['Contact us', '/contact']].map(([text, url]) => <a key={text} href={`#${url}`} className="block min-h-11 text-sm text-[#d4d6db] hover:text-white">{text}</a>)}</div><div><h3 className={`${label} mb-5 text-[#e9ddd3]`}>Made personal</h3><p className="text-sm leading-7 text-[#d4d6db]">{settings.address || 'Contact details coming soon.'}{settings.timings && <><br />{settings.timings}</>}</p>{whatsapp() && <a href={whatsapp()} target="_blank" rel="noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm"><Icon name="whatsapp" />Chat with us</a>}</div><div><h3 className={`${label} mb-5 text-[#e9ddd3]`}>Stay in the loop</h3><div className="flex gap-3">{settings.instagram && <a href={settings.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#b8bdc6]/40"><Icon name="instagram" /></a>}{settings.facebook && <a href={settings.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#b8bdc6]/40 font-serif text-2xl">f</a>}{!settings.instagram && !settings.facebook && <p className="text-sm leading-7 text-[#d4d6db]">Social links coming soon.</p>}</div></div></div><div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-4 border-t border-[#b8bdc6]/25 pt-6 text-xs text-[#d4d6db]"><p>© {new Date().getFullYear()} Genzo Official. All rights reserved.</p><p>Everyday details. 100% you.</p></div></footer>;
}
export default function App() {
  const [route, setRoute] = useState(window.location.hash.slice(1) || '/'), [scrolled, setScrolled] = useState(false), [menu, setMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const update = () => { setRoute(window.location.hash.slice(1) || '/'); setMenu(false); window.scrollTo({ top: 0, behavior: 'instant' }); };
    const scroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('hashchange', update); window.addEventListener('scroll', scroll);
    const favicon = document.createElement('link'); favicon.rel = 'icon'; favicon.href = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#1e2733"/><text x="32" y="46" text-anchor="middle" font-family="Georgia" font-size="46" fill="#faf7f2">G</text></svg>'); document.head.appendChild(favicon); document.title = 'Genzo Official — Jewellery & Everyday Accessories';
    return () => { window.removeEventListener('hashchange', update); window.removeEventListener('scroll', scroll); favicon.remove(); };
  }, []);
  useEffect(() => {
    if (!menu) return;
    const prior = document.activeElement as HTMLElement; document.body.style.overflow = 'hidden'; menuRef.current?.querySelector<HTMLElement>('button, a')?.focus();
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenu(false); if (e.key === 'Tab') { const nodes = menuRef.current?.querySelectorAll<HTMLElement>('button, a'); if (!nodes?.length) return; const first = nodes[0], last = nodes[nodes.length - 1]; if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); } } };
    document.addEventListener('keydown', key); return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', key); prior?.focus(); };
  }, [menu]);
  const path = route.split('?')[0], home = path === '/', transparent = home && !scrolled;
  const nav = [['Home', '/'], ['Collection', '/shop'], ['Our Story', '/about'], ['Contact', '/contact']];
  const product = path.startsWith('/product/') ? products.find(p => p.slug === path.split('/')[2]) : undefined;
  return <div className="min-h-screen overflow-x-hidden bg-[#faf7f2] font-sans text-[#1f2328] selection:bg-[#e9ddd3] [&_a]:focus-visible:outline-2 [&_a]:focus-visible:outline-offset-4 [&_button]:cursor-pointer [&_button]:focus-visible:outline-2 [&_button]:focus-visible:outline-offset-4 [&_input]:focus-visible:ring-2 [&_select]:focus-visible:ring-2">
    <a href="#main-content" onClick={e => { e.preventDefault(); document.getElementById('main-content')?.focus(); }} className="sr-only z-[60] bg-[#faf7f2] p-4 text-[#1e2733] focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
    <div className="relative z-40 flex h-9 items-center justify-center bg-[#1e2733] px-3 text-center text-[10px] tracking-[.05em] text-[#f2ece5] md:text-xs">{settings.sampleCatalogue ? 'Preview collection • Products and prices are examples' : settings.announcement}</div>
    <header className={`${home ? 'absolute' : 'sticky'} ${scrolled ? '!fixed top-0' : home ? 'top-9' : 'top-0'} inset-x-0 z-40 transition-colors duration-500 ${transparent ? 'border-b border-white/20 text-white' : 'border-b border-[#ded6cb] bg-[#faf7f2]/95 text-[#1e2733] backdrop-blur-xl'}`}>
      <div className="relative mx-auto flex h-24 max-w-[1440px] items-center justify-between px-6 md:px-16 lg:px-24"><nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">{nav.slice(0, 2).map(([title, url]) => <a key={url} href={`#${url}`} className={`flex min-h-11 items-center text-xs uppercase tracking-[.13em] ${path === url ? 'underline underline-offset-8 decoration-[#c9b79c]' : ''}`}>{title}</a>)}</nav><button aria-label="Open navigation" onClick={() => setMenu(true)} className="flex h-11 w-11 items-center md:hidden"><Icon name="menu" /></button><div className="absolute left-1/2 -translate-x-1/2"><Wordmark /></div><nav className="flex items-center gap-5" aria-label="More navigation"><div className="hidden items-center gap-6 md:flex">{nav.slice(2).map(([title, url]) => <a key={url} href={`#${url}`} className="flex min-h-11 items-center text-xs uppercase tracking-[.13em]">{title}</a>)}</div><a href="#/shop?search=1" onClick={() => { if (window.location.hash === '#/shop?search=1') document.querySelector<HTMLInputElement>('[aria-label="Search products by name, category or code"]')?.focus(); }} aria-label="Search the collection" className="flex h-11 w-11 items-center justify-center"><Icon name="search" /></a></nav></div>
    </header>
    {menu && <div ref={menuRef} role="dialog" aria-modal="true" aria-labelledby="menu-title" className="fixed inset-0 z-50 flex flex-col bg-[#1e2733] p-8 text-[#faf7f2]"><div className="flex justify-between"><h2 id="menu-title" className="font-serif text-3xl tracking-widest">GENZO</h2><button onClick={() => setMenu(false)} aria-label="Close navigation" className="flex h-11 w-11 items-center justify-center"><Icon name="close" /></button></div><nav className="flex flex-1 flex-col justify-center gap-7">{nav.map(([title, url]) => <a key={url} href={`#${url}`} onClick={() => setMenu(false)} className="font-serif text-5xl">{title}</a>)}</nav><p className="text-sm text-[#e9ddd3]">Little details. Made for you.</p></div>}
    <div id="main-content" tabIndex={-1} key={route} className="outline-none motion-safe:animate-[reveal_.45s_both]">{home ? <Home /> : path === '/shop' ? <Shop /> : product ? <Detail product={product} /> : path === '/about' ? <About /> : path === '/help' ? <Help /> : path === '/contact' ? <Contact /> : <main className="px-6 py-32 text-center"><p className={label}>404 · A little lost</p><h1 className="my-6 font-serif text-6xl">Let’s find your way back.</h1><a href="#/shop" className={`${button} bg-[#1e2733] text-white`}>Explore the collection <Icon /></a></main>}</div>
    <Footer />{whatsapp() && <a href={whatsapp()} target="_blank" rel="noreferrer" aria-label="Chat with Genzo Official on WhatsApp" className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-[#246348] text-white shadow-xl motion-safe:animate-[pulse-soft_3s_infinite]"><Icon name="whatsapp" className="!h-7 !w-7" /></a>}
  </div>;
}
