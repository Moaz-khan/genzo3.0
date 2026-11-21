const photo = (id: string, w = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;
export const images = [
  photo('photo-1617038260897-41a1f14a8ca0', 2400),
  photo('photo-1605100804763-247f67b3557e'),
  photo('photo-1599643477877-530eb83abc8e'),
  photo('photo-1630019852942-f89202989a4d'),
  photo('photo-1611591437281-460bfbe1220a'),
  photo('photo-1611652022419-a9419f74343d'),
  photo('photo-1617038220319-276d3cfab638'),
];
export const accessoryImages = {
  editorial: '/images/editorial.webp',
  styleEdit: '/images/style-edit.webp',
  caps: '/images/cap.webp',
  sunglasses: '/images/sunglasses.webp',
  scarves: '/images/scarf.webp',
};
export const settings = {
  // Replace these sample settings and products before launch; WhatsApp uses country code and digits only.
  whatsapp: '', sampleCatalogue: true,
  announcement: 'Everyday accessories, thoughtfully chosen • Order easily on WhatsApp',
  heroImages: [accessoryImages.editorial, images[6], images[2]],
  heading: 'Style that feels like you.',
  subheading: 'The little details make it yours. Discover jewellery, caps, sunglasses and accessories for every kind of day.',
  newsletterEndpoint: '', // optional: paste a Formspree/Mailchimp-style POST URL to receive subscriber emails
  address: '', timings: '', map: '', instagram: '', facebook: '', email: '',
};
export const categories = ['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Pendants', 'Sets', 'Caps', 'Sunglasses', 'Hair Accessories'];
export const categoryImages = [...images.slice(1), accessoryImages.caps, accessoryImages.sunglasses, accessoryImages.scarves];
export type Product = { name: string; slug: string; code: string; category: string; images: string[]; price: number; salePrice?: number; priceOnRequest?: boolean; material: string; weight?: string; description: string; inStock: boolean; featured: boolean; newArrival: boolean };
const make = (name: string, category: string, image: string, price: number, i: number, extra: Partial<Product> = {}): Product => ({
  name, slug: name.toLowerCase().split(' ').join('-'), code: `GZ-${String(i).padStart(3, '0')}`,
  category, images: [image], price, material: '925 Sterling Silver', weight: `${(2.1 + i * .4).toFixed(1)} g`,
  description: 'A little detail. A lasting feeling. Thoughtfully crafted in hallmarked 925 sterling silver, this timeless piece brings an understated glow to everyday moments and special occasions alike.',
  inStock: true, featured: i <= 2, newArrival: i === 1 || i === 3, ...extra,
});
export const products = [
  make('The Luna Ring', 'Rings', images[1], 3800, 1),
  make('Dewdrop Necklace', 'Necklaces', images[2], 6500, 2, { salePrice: 5800 }),
  make('Everyday Hoops', 'Earrings', images[3], 4200, 3),
  make('Serene Chain Bracelet', 'Bracelets', images[4], 4900, 4),
  make('The Sol Pendant', 'Pendants', images[5], 3200, 5),
  make('Moonlight Set', 'Sets', images[6], 12500, 6, { priceOnRequest: true }),
  make('Aurora Ring', 'Rings', images[1], 4500, 7, { inStock: false }),
  make('Pearl Whisper Earrings', 'Earrings', images[3], 5600, 8),
  make('Silver Thread Necklace', 'Necklaces', images[2], 6200, 9),
  make('The Olive Bracelet', 'Bracelets', images[4], 5200, 10, { salePrice: 4600 }),
  make('The Everyday Cap', 'Caps', accessoryImages.caps, 2200, 11, { images: [accessoryImages.caps], material: 'Cotton', weight: undefined, featured: true, newArrival: true, description: 'A relaxed finishing touch for days on the go. This ivory cotton cap brings an effortlessly put-together feel to your everyday wardrobe.' }),
  make('The Muse Sunglasses', 'Sunglasses', accessoryImages.sunglasses, 2800, 12, { images: [accessoryImages.sunglasses], material: 'Tortoiseshell-look frame', weight: undefined, featured: true, newArrival: true, description: 'A timeless tortoiseshell-inspired frame with an easy, flattering shape. The pair you will reach for on every sunny day.' }),
  make('Champagne Bow Scarf', 'Hair Accessories', accessoryImages.scarves, 1600, 13, { images: [accessoryImages.scarves], material: 'Satin-look fabric', weight: undefined, description: 'A soft champagne-toned bow scarf that adds a graceful touch to your hair, handbag or favourite outfit.' }),
];
export const faqs = [
  { question: 'How do I place an order?', answer: 'Choose a piece you love and tap “Order on WhatsApp”. Your message will include the product name and code so we can help you with the next steps.' },
  { question: 'How do I find out about delivery and payment?', answer: 'We’ll confirm delivery options, charges and available payment methods with you on WhatsApp before you place your order.' },
  { question: 'Can I ask about a product before ordering?', answer: 'Of course. Message us with the product name or code and ask us about sizing, materials, availability or anything else you need to know.' },
  { question: 'How should I care for sterling silver?', answer: 'Keep it dry, store it separately and polish it gently with a soft silver cloth. You can find more tips in our silver care guide.' },
  { question: 'Can I order something as a gift?', answer: 'Tell us it’s a gift when you message us and ask about the available packaging options.' },
];
export const money = (value: number) => `Rs. ${value.toLocaleString('en-PK')}`;
export function whatsapp(p?: Product) {
  if (settings.sampleCatalogue || !/^[1-9]\d{7,14}$/.test(settings.whatsapp)) return undefined;
  const message = p ? `Assalam o Alaikum, mujhe *Genzo Official* se ye order karna hai: *${p.name}* (Code: ${p.code}) - ${p.priceOnRequest ? 'Price on request' : money(p.salePrice ?? p.price)}\n${window.location.origin}${window.location.pathname}#/product/${p.slug}` : 'Assalam o Alaikum, I would like to know more about Genzo Official accessories.';
  return `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(message)}`;
}
