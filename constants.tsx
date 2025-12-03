import React from 'react';

// Color Palette - Grayscale + Pink
export const COLORS = {
  bg: '#000000',
  cardBg: '#050505',
  primary: '#ff0099', // Hot pink
  secondary: '#ffffff', // White
  accent: '#262626', // Dark Gray
  textMuted: '#525252',
  border: '#171717',
};

// Icons
export const Icons = {
  Donut: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="9" className="text-gray-700" stroke="currentColor" />
      <circle cx="12" cy="12" r="3" className="text-pink-500" stroke="currentColor" />
      <path d="M12 3c0 3-3 3-3 6" className="text-pink-500" />
    </svg>
  ),
  Fire: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176A7.547 7.547 0 0 1 6.648 6.61a.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.546 3.75 3.75 0 0 1 3.255 3.718Z" clipRule="evenodd" />
    </svg>
  ),
  Info: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  ),
  Globe: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  User: ({ className }: { className?: string }) => (
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
     </svg>
  ),
  AI: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
       <path d="M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10 10 10 0 0 1-10 10 10 10 0 0 1 10-10z" />
       <path d="M8 12h8" />
       <path d="M12 8v8" />
       <circle cx="12" cy="12" r="3" fill="currentColor" className="text-pink-500 opacity-50"/>
    </svg>
 )
};

// Risk-like Territories Mapping
// ISO 3166-1 numeric codes (Decimal integers)
// NOTE: Negative numbers like -99, -98 are often used in Natural Earth data for disputed territories (Somaliland, Kosovo, N.Cyprus)
export const REGION_MAPPING: Record<string, number[]> = {
  // --- North America ---
  'NA_NORTH': [124, 304], // Canada, Greenland
  'NA_UNION': [840], // USA
  'NA_CENTRAL': [484, 320, 192, 214, 332, 340, 388, 558, 591, 222, 188, 84, 212, 52, 308, 44, 136, 192, 533, 28, 780], // Mexico, Central Am, Caribbean + Trinidad(780), Antigua(28)

  // --- South America ---
  'SA_AMAZON': [76], // Brazil
  'SA_SOUTH': [32, 152, 858, 600, 68], // Argentina, Chile, Uruguay, Paraguay, Bolivia
  'SA_ANDES': [604, 218, 170], // Peru, Ecuador, Colombia
  'SA_NORTH': [862, 328, 740, 254], // Venezuela, Guyana, Suriname, French Guiana

  // --- Europe ---
  'EU_WEST': [250, 724, 620, 20, 492], // France, Spain, Portugal, Andorra, Monaco(492)
  'EU_CENTRAL': [276, 528, 56, 756, 40, 203, 703, 705, 442, 348, 438, 442], // Germany, Neth, Belg, Switz, Austria, Czech, Slovakia, Slovenia, Hungary, Liech, Lux
  'EU_BRITAIN': [826, 372, 830], // UK, Ireland, Channel Islands
  'EU_NORDIC': [352, 578, 752, 246, 208, 233, 428, 440], // Nordic + Baltics
  'EU_SOUTH': [380, 300, 8, 70, 191, 498, 642, 100, 807, 499, 688, 470, 196, 70, 383, -98, 674, 336], // Italy, Greece, Balkans, Malta, Cyprus, Kosovo, N.Cyprus, San Marino(674), Vatican(336)
  'EU_EAST': [804, 616, 112, 498, 642], // Ukraine, Poland, Belarus, Moldova, Romania

  // --- Africa ---
  'AF_NORTH': [
    12, 434, 504, 788, 732, // Algeria, Libya, Morocco, Tunisia, W.Sahara
    478, 466, 562, 148, // Mauritania, Mali, Niger, Chad (Sahel)
    686, 270, 324, 384, 566, 288, 854, 694, 430, 204, 132, 624, 768, 174 // West Africa (Senegal, Gambia, Guinea, Cote d'Ivoire, Nigeria, Ghana, Burkina, Sierra Leone, Liberia, Benin, CV, Guinea-Bissau, Togo)
  ],
  'AF_EGYPT': [818], // Egypt
  'AF_EAST': [
    729, 728, 736, 231, 232, 262, 706, -99, // Sudan, S.Sudan, Ethiopia, Eritrea, Djibouti(262), Somalia, Somaliland(-99)
    404, 800, 834, 646, 108 // Kenya, Uganda, Tanzania, Rwanda, Burundi
  ],
  'AF_CONGO': [
    180, 178, 266, 226, 24, 120, 140, 678 // DRC, Congo, Gabon, Eq.Guinea, Angola, Cameroon, CAR, Sao Tome
  ],
  'AF_SOUTH': [
    710, 516, 72, 716, 508, 894, 454, 748, 426 // South Africa, Namibia, Botswana, Zim, Moz, Zambia, Malawi, Eswatini(748), Lesotho(426)
  ],
  'AF_MADAGASCAR': [450, 174, 480, 690], // Madagascar, Comoros, Mauritius, Seychelles

  // --- Asia ---
  'AS_RUSSIA': [643], // Russia
  'AS_MIDDLE': [682, 364, 368, 760, 376, 400, 887, 512, 784, 792, 422, 414, 48, 634, 275, 512], // Middle East (Saudi, Iran, Iraq, Israel, Jordan, Yemen(887), Bahrain(48), Qatar(634))
  'AS_STEPPE': [4, 586, 398, 860, 795, 417, 762, 31, 268], // Stans (Afghanistan, Kaz, Uzb, etc)
  'AS_INDIA': [356, 50, 144, 524, 64], // India, Bangla, Sri Lanka, Nepal, Bhutan
  'AS_CHINA': [156, 496, 158, 344, 446], // China, Mongolia, Taiwan, HK, Macao
  'AS_JAPAN': [392, 410, 408], // Japan, Koreas
  'AS_SE': [764, 704, 116, 418, 104, 458, 608, 626, 702, 96], // SE Asia (Thai, Viet, Camb, Laos, Myan, Malay, Phil, Timor, Singapore(702), Brunei(96))

  // --- Oceania ---
  'OC_ARCH': [360, 598], // Indonesia, PNG
  'OC_AUS': [36, 554, 90, 242, 548, 540, 54, 598, 296, 90, 583, 584, 585, 598], // Australia, NZ, Pacific Islands
};

export const MOCK_TERRITORY_DATA: Record<string, { name: string, multiplier: number, rate: number, owner?: string }> = {
  // NA
  'NA_NORTH': { name: "NORTHWEST TERRITORY", multiplier: 1.5, rate: 0.3, owner: "Heeshilio Frost" },
  'NA_UNION': { name: "EASTERN UNITED STATES", multiplier: 6.0, rate: 1.2, owner: "Heeshilio Frost" },
  'NA_CENTRAL': { name: "CENTRAL AMERICA", multiplier: 2.8, rate: 0.5 },
  // SA
  'SA_AMAZON': { name: "BRAZIL", multiplier: 3.5, rate: 0.7 },
  'SA_SOUTH': { name: "ARGENTINA", multiplier: 2.2, rate: 0.4 },
  'SA_ANDES': { name: "PERU", multiplier: 2.5, rate: 0.45 },
  'SA_NORTH': { name: "VENEZUELA", multiplier: 2.0, rate: 0.35 },
  // EU
  'EU_WEST': { name: "WESTERN EUROPE", multiplier: 4.5, rate: 0.8, owner: "Heeshilio Frost" },
  'EU_CENTRAL': { name: "NORTHERN EUROPE", multiplier: 5.0, rate: 0.9 },
  'EU_BRITAIN': { name: "GREAT BRITAIN", multiplier: 3.8, rate: 0.65 },
  'EU_NORDIC': { name: "SCANDINAVIA", multiplier: 3.2, rate: 0.6 },
  'EU_SOUTH': { name: "SOUTHERN EUROPE", multiplier: 3.5, rate: 0.62 },
  'EU_EAST': { name: "UKRAINE", multiplier: 2.9, rate: 0.5 },
  // AF
  'AF_NORTH': { name: "NORTH AFRICA", multiplier: 2.6, rate: 0.45 },
  'AF_EGYPT': { name: "EGYPT", multiplier: 3.2, rate: 0.55 },
  'AF_EAST': { name: "EAST AFRICA", multiplier: 2.3, rate: 0.42 },
  'AF_CONGO': { name: "CONGO", multiplier: 1.8, rate: 0.3 },
  'AF_SOUTH': { name: "SOUTH AFRICA", multiplier: 3.0, rate: 0.55 },
  'AF_MADAGASCAR': { name: "MADAGASCAR", multiplier: 1.5, rate: 0.2 },
  // AS
  'AS_RUSSIA': { name: "RUSSIA", multiplier: 5.5, rate: 0.95 },
  'AS_MIDDLE': { name: "MIDDLE EAST", multiplier: 4.2, rate: 0.75, owner: "Sahara Corps" },
  'AS_STEPPE': { name: "AFGHANISTAN", multiplier: 2.0, rate: 0.3 },
  'AS_INDIA': { name: "INDIA", multiplier: 4.8, rate: 0.85 },
  'AS_CHINA': { name: "CHINA", multiplier: 5.8, rate: 1.1 },
  'AS_JAPAN': { name: "JAPAN", multiplier: 5.2, rate: 0.92, owner: "Heeshilio Frost" },
  'AS_SE': { name: "SIAM", multiplier: 3.6, rate: 0.68 },
  // OC
  'OC_ARCH': { name: "INDONESIA", multiplier: 2.7, rate: 0.48 },
  'OC_AUS': { name: "EASTERN AUSTRALIA", multiplier: 3.3, rate: 0.6 },
};

export const INITIAL_USER_STATS = {
  balance: 3468,
  glazeRate: 4,
  pnl: 0.07705,
  glazeCount: 124,
};