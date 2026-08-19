// Parsed 105 OSINT dossiers from markdown files
// Generated: 2026-08-19T00:30:42.392Z

export interface ParsedDossier {
  filename: string;
  business_name: string;
  industry: string;
  location: string;
  website: string;
  phone: string;
  owner_name: string;
  owner_title: string;
  contact_email: string;
  technology_stack: string[];
  pain_points: string[];
  opportunities: string[];
  confidence_score: number;
  research_sources: { label: string; url: string }[];
  notes: string;
}

export const PARSED_DOSSIERS: ParsedDossier[] = [
  {
    "business_name": "Palm Springs Home Services",
    "industry": "Home Services / General Contracting / Remodeling",
    "location": "Palm Desert, CA 92211",
    "website": "https://palmspringshomeservices.com",
    "phone": "(760) 620-4198",
    "owner_name": "James Nelson (Owner, Contractor & Project Manager)",
    "owner_title": "",
    "contact_email": "quotes@palmspringshomeservices.com",
    "technology_stack": [
      "Website: Custom-built (appears to be Squarespace or similar CMS)",
      "Social Media: Facebook, Instagram, Google, Yelp",
      "Online Quote System: \"Get A Quote\" CTA",
      "Partners: Ferguson Home, Arizona Tile, Bedrosians Tile & Stone, Blair Heating & Air, Cabinets.com"
    ],
    "pain_points": [
      "Manual Scheduling: Email draft references manual scheduling for home service projects",
      "Limited Online Booking: No online booking system visible on website",
      "Technology Adoption: While they offer home automation services, their own tech stack appears basic"
    ],
    "opportunities": [
      "AI-Powered Scheduling: Automate booking and dispatch systems",
      "Customer Relationship Management: Implement automated follow-ups and project updates",
      "Digital Marketing: Enhance online presence beyond basic social media"
    ],
    "confidence_score": 9,
    "research_sources": [],
    "notes": "Well-established business with clear ownership, proper licensing, and professional website. Strong online presence with active social media. Ready for outreach.",
    "filename": "01_palm_springs_home_services.md"
  },
  {
    "business_name": "Flashlight Marketing (Flashlight Agency)",
    "industry": "Digital Marketing Agency",
    "location": "Palm Desert, CA",
    "website": "https://flashlightagency.com",
    "phone": "1-760-469-9995",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "info@flashlightagency.com",
    "technology_stack": [
      "Website: Custom WordPress",
      "Social Media: Facebook, Twitter/X",
      "AI Focus: Strong emphasis on AI solutions and automation"
    ],
    "pain_points": [
      "Campaign Tracking: Email draft references manual campaign tracking",
      "Reporting Automation: Need for automated reporting across multiple clients",
      "Data Integration: Potential challenges with data plumbing across platforms"
    ],
    "opportunities": [
      "AI Dashboard Automation: Build automated reporting systems",
      "Campaign Analytics: Implement real-time insights across campaigns",
      "Client Management: Streamline multi-client workflow automation"
    ],
    "confidence_score": 8,
    "research_sources": [],
    "notes": "Well-established agency with impressive client portfolio. Already offers AI services but may need help with internal automation. Competitive landscape - may see SOETech as potential partner rather than prospect.",
    "filename": "02_flashlight_marketing.md"
  },
  {
    "business_name": "Blitz Marketing Group",
    "industry": "Digital Marketing Agency",
    "location": "Palm Desert, CA 92260",
    "website": "https://blitzmarketing.org",
    "phone": "+1 (760) 469-9129",
    "owner_name": "Rob Ashton",
    "owner_title": "",
    "contact_email": "Contact@Blitzmarketing.Org",
    "technology_stack": [
      "Website: WordPress with booking calendar integration",
      "Social Media: Active presence",
      "Booking System: Calendly or similar (embedded calendar visible)"
    ],
    "pain_points": [
      "Website Refresh Needed: Email draft mentions website needs modernization",
      "Digital Presence: While they offer services, their own presence may need updating",
      "Competition: Operating in competitive Palm Desert market"
    ],
    "opportunities": [
      "Website Modernization: Help refresh their digital presence",
      "SEO Enhancement: Improve their own search rankings",
      "AI Integration: Add AI-powered tools to service offerings"
    ],
    "confidence_score": 8,
    "research_sources": [],
    "notes": "Google Partner with strong local reputation. Owner-operated business. May benefit from modernizing their own website while offering similar services to clients.",
    "filename": "03_blitz_marketing_group.md"
  },
  {
    "business_name": "Glory Cloud Coffee Roasters",
    "industry": "Coffee Roasting / Retail / E-commerce",
    "location": "Sparks, NV",
    "website": "https://glorycloudcoffee.com",
    "phone": "844-745-6792",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "ronda@glorycloudcoffee.com",
    "technology_stack": [
      "Website: E-commerce platform (BigCommerce or similar)",
      "Online Shopping: Full e-commerce functionality",
      "Wish Lists: Available",
      "User Accounts: Login/Register system",
      "Social Media: Facebook"
    ],
    "pain_points": [
      "Limited Social Media Presence: Email draft mentions limited social media visibility",
      "Community Building: Need to grow online community",
      "Foot Traffic: Limited online presence may impact in-store visits"
    ],
    "opportunities": [
      "Social Media Strategy: Build engaged online communities",
      "Content Creation: Share coffee roasting stories and behind-the-scenes",
      "Community Engagement: Drive foot traffic and loyalty through digital channels"
    ],
    "confidence_score": 8,
    "research_sources": [],
    "notes": "Passionate owner with strong product quality and customer reviews. Has e-commerce but needs social media growth. Mission-driven business with clear values.",
    "filename": "04_glory_cloud_coffee.md"
  },
  {
    "business_name": "Tax Prep & Bookkeeping Services (Sparks CPA)",
    "industry": "Accounting / Tax Preparation",
    "location": "Sparks, NV 89431",
    "website": "https://www.taxprepbooks.com",
    "phone": "775-746-3200",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "support@taxprepbooks.com",
    "technology_stack": [
      "Website: Wix or similar CMS",
      "Client Portal: Secure login system",
      "Contact Forms: Multiple intake forms",
      "Social Media: TikTok",
      "Email: Professional business email"
    ],
    "pain_points": [
      "Manual Client Intake: Email draft references manual intake processes",
      "Tax Season Bottlenecks: Manual processes create delays during peak season",
      "Document Organization: Need for automated document capture and organization"
    ],
    "opportunities": [
      "Automated Intake Systems: Capture client information and documents automatically",
      "Workpaper Preparation: Organize documents before staff begins work",
      "Client Communication: Automated reminders and updates"
    ],
    "confidence_score": 8,
    "research_sources": [],
    "notes": "Well-established practice with 30+ years experience. Professional website with client portal. Clear need for intake automation during tax season. Ready for technology upgrade.",
    "filename": "05_sparks_cpa.md"
  },
  {
    "business_name": "The Mermaid Cafe",
    "industry": "Coffee Shop / Specialty Cafe",
    "location": "San Antonio, TX 78216",
    "website": "https://themermaid.cafe",
    "phone": "210-231-0442",
    "owner_name": "Leah Meyer and family",
    "owner_title": "",
    "contact_email": "hello@themermaid.cafe",
    "technology_stack": [
      "Website: Wix or similar CMS",
      "Email Marketing: Mailing list signup",
      "Social Media: Facebook",
      "Online Menu: Available",
      "Contact Forms: Multiple"
    ],
    "pain_points": [
      "Limited Social Media Visibility: Email draft mentions limited visibility",
      "Community Building: Need to grow online community",
      "Marketing Reach: While media coverage exists, social media presence needs growth"
    ],
    "opportunities": [
      "Social Media Strategy: Build engaged community around mission",
      "Content Marketing: Share employee stories and impact",
      "Community Engagement: Drive foot traffic through authentic storytelling"
    ],
    "confidence_score": 9,
    "research_sources": [],
    "notes": "Mission-driven business with strong media coverage. Clear social impact story. Perfect candidate for community building and social media growth. High potential for authentic content marketing.",
    "filename": "06_the_mermaid_cafe.md"
  },
  {
    "business_name": "Barton & Associates, Attorneys at Law",
    "industry": "Legal Services / Law Firm",
    "location": "San Antonio, TX (also Austin, Corpus Christi)",
    "website": "https://www.bartonlawoffice.com",
    "phone": "210-500-0000",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "Info@BartonLawOffice.com",
    "technology_stack": [
      "Website: Custom legal website",
      "Social Media: Facebook, YouTube, Instagram, LinkedIn, TikTok",
      "Client Communication: Email, phone",
      "Online Presence: Professional legal website with practice area pages"
    ],
    "pain_points": [
      "Manual Client Intake: Email draft references manual intake processes",
      "Case Initiation Delays: Manual processes create bottlenecks",
      "Document Organization: Need for automated case document management"
    ],
    "opportunities": [
      "Automated Intake Systems: Capture client information and schedule consultations",
      "Case Document Organization: Automate document collection and organization",
      "Client Communication: Automated updates and follow-ups"
    ],
    "confidence_score": 8,
    "research_sources": [],
    "notes": "Well-established law firm with 24+ years experience. Board-certified attorneys with multiple practice areas. Professional online presence but needs intake automation. Multi-location firm with growth potential.",
    "filename": "07_barton_associates.md"
  },
  {
    "business_name": "FOG Digital Marketing",
    "industry": "Digital Marketing Agency",
    "location": "San Antonio, TX",
    "website": "https://www.fogdigitalmarketing.com",
    "phone": "(726) 224-4920",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "hello@fogdigitalmarketing.com",
    "technology_stack": [
      "Website: Custom WordPress",
      "SEO Tools: Advanced analytics and reporting",
      "AI Integration: AI search optimization, AI call agents",
      "Client Portal: Available",
      "Photography: Professional business photography services"
    ],
    "pain_points": [
      "Campaign Reporting: Email draft references manual campaign tracking",
      "Multi-Client Management: Need for automated reporting across multiple accounts",
      "Data Infrastructure: Potential challenges with data plumbing across platforms"
    ],
    "opportunities": [
      "AI Dashboard Automation: Build automated reporting systems",
      "Campaign Analytics: Implement real-time insights across campaigns",
      "Client Management: Streamline multi-client workflow automation"
    ],
    "confidence_score": 7,
    "research_sources": [],
    "notes": "Highly established and successful agency with impressive results. Already offers AI services (AI Search Optimization, AI Call Agent). May see SOETech as competitor rather than prospect. Strong case for partnership rather than client relationship.",
    "filename": "08_fog_digital_marketing.md"
  },
  {
    "business_name": "United Homes Contracting",
    "industry": "Home Services / Contracting",
    "location": "San Antonio, TX",
    "website": "https://www.unitedhomescontracting.com (UNREACHABLE)",
    "phone": "",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "sanofficeadmin@unitedhomescontracting.com",
    "technology_stack": [
      "Website: Unknown (site unreachable)",
      "Online Booking: Not available (confirmed by email draft)",
      "Social Media: Unknown"
    ],
    "pain_points": [
      "No Online Booking: Email draft specifically mentions lack of online booking system",
      "Phone-Only Scheduling: Customers must call during business hours",
      "Limited Online Presence: Website unreachable suggests weak digital presence"
    ],
    "opportunities": [
      "Online Booking System: Implement 24/7 appointment capture",
      "Automated Confirmations: Send confirmations and reminders",
      "Website Development: Build professional online presence"
    ],
    "confidence_score": 4,
    "research_sources": [],
    "notes": "Limited information available. Website unreachable. Email marked as \"Found (non-domain)\" requiring verification before send. Needs website development and online booking system. High potential need but lower confidence due to limited information.",
    "filename": "09_united_homes_contracting.md"
  },
  {
    "business_name": "Handy Squad Home Services, Inc",
    "industry": "Home Services / Handyman",
    "location": "San Antonio, TX (also Rockport, TX)",
    "website": "https://handysquadhomeservices.com",
    "phone": "(210) 222-2300 (San Antonio), (361) 339-4263 (Rockport)",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "keiths@handysquadhomeservices.com, autumn@handysquadhomeservices.com",
    "technology_stack": [
      "Website: WordPress with service booking",
      "Reviews: Google Reviews integration (667 reviews)",
      "Social Media: Facebook, Google",
      "Contact Forms: Quote request system",
      "Maps: Google Maps integration for both locations"
    ],
    "pain_points": [
      "Manual Customer Communication: Email draft references manual communication processes",
      "Missed Follow-ups: Manual processes lead to missed follow-ups",
      "Scheduling Gaps: Manual scheduling creates gaps in customer communication",
      "Appointment Reminders: Need for automated reminders and project updates"
    ],
    "opportunities": [
      "Automated Communication Systems: Send appointment reminders, project updates, follow-up requests",
      "Customer Relationship Management: Implement automated follow-ups",
      "Scheduling Optimization: Reduce scheduling gaps and missed appointments"
    ],
    "confidence_score": 9,
    "research_sources": [],
    "notes": "Well-established business with strong reviews (667 reviews, 5-star rating). Multi-location operation with clear need for communication automation. Professional website with booking system but needs improvement. High confidence for outreach - clear pain points and established business.",
    "filename": "10_handy_squad_home_services.md"
  },
  {
    "business_name": "Bochnewich Law Offices",
    "industry": "Law (Estate Planning, Probate & Litigation)",
    "location": "43100 Cook St Unit 203, Palm Desert, CA 92211",
    "website": "https://www.btrustlaw.com/",
    "phone": "(760) 776-1377",
    "owner_name": "Peter M. Bochnewich — President & Owner",
    "owner_title": "",
    "contact_email": "Not publicly listed",
    "technology_stack": [
      "Cms: WordPress (custom theme)",
      "Contact form: Custom form with appointment scheduling",
      "Chat: Live chat integration (Chat Tab iframe)",
      "Accessibility: AccessiBe accessibility widget",
      "Analytics: Google Analytics (likely)"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 8,
    "research_sources": [
      {
        "label": "Website",
        "url": "https://www.btrustlaw.com/"
      }
    ],
    "notes": "",
    "filename": "21_Bochnewich_Law_Offices.md"
  },
  {
    "business_name": "Ahu Kocaballi Real Estate Group",
    "industry": "Real Estate (Luxury)",
    "location": "41995 Boardwalk F3, Palm Desert, CA 92211",
    "website": "https://www.ahukocaballi.com/",
    "phone": "(760) 216-0212",
    "owner_name": "Ahu Kocaballi — Licensed Broker",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Cms: Custom real estate platform",
      "Mls integration: Desert Area MLS (DAMLS)",
      "Search: Property search with filters (location, type, price, beds)",
      "Scheduling: \"Schedule a Call\" booking button",
      "Analytics: Google Analytics (likely)"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 9,
    "research_sources": [
      {
        "label": "Website",
        "url": "https://www.ahukocaballi.com/"
      }
    ],
    "notes": "",
    "filename": "22_Ahu_Kocaballi_Real_Estate_Group.md"
  },
  {
    "business_name": "Desert Properties Realtors",
    "industry": "Real Estate",
    "location": "74000 Country Club Dr Ste. A3, Palm Desert, CA 92260",
    "website": "https://desertpropertiesrealtors.com/",
    "phone": "(760) 574-7662",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Cms: WordPress",
      "Mls integration: Desert Area MLS (DAMLS)",
      "Search: Property search with filters",
      "Idx: Integrated property search"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 7,
    "research_sources": [
      {
        "label": "Website",
        "url": "https://desertpropertiesrealtors.com/"
      }
    ],
    "notes": "",
    "filename": "23_Desert_Properties_Realtors.md"
  },
  {
    "business_name": "C & S Home Service",
    "industry": "Home Services (General Contracting, Water Damage & Mold Remediation)",
    "location": "74054 Alpine Ln, Palm Desert, CA 92211",
    "website": "https://www.cshomeservice.net/",
    "phone": "(760) 567-4713",
    "owner_name": "Not publicly identified on website",
    "owner_title": "",
    "contact_email": "Not publicly listed",
    "technology_stack": [
      "Cms: Wix",
      "Contact: Phone-based, basic contact form",
      "Social: Links to Facebook, Twitter, Instagram"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 6,
    "research_sources": [
      {
        "label": "Website",
        "url": "https://www.cshomeservice.net/"
      }
    ],
    "notes": "",
    "filename": "24_C_S_Home_Service.md"
  },
  {
    "business_name": "Palm Springs Home Services",
    "industry": "Home Services (Remodeling, General Contracting)",
    "location": "77899 Wolf Rd Ste Suite 107, Palm Desert, CA 92211",
    "website": "https://palmspringshomeservices.com/",
    "phone": "(760) 620-4198",
    "owner_name": "Not publicly identified on website",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Cms: Squarespace",
      "Contact: \"Get A Quote\" forms, phone",
      "Social: Facebook, Instagram, Google, Yelp",
      "Partners: Listed partner logos"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 8,
    "research_sources": [
      {
        "label": "Website",
        "url": "https://palmspringshomeservices.com/"
      }
    ],
    "notes": "",
    "filename": "25_Palm_Springs_Home_Services.md"
  },
  {
    "business_name": "Passion Pro Builders",
    "industry": "Construction (Kitchen Remodeling, Home Renovation)",
    "location": "74850 42nd Ave Unit a, Palm Desert, CA 92260",
    "website": "https://www.passionprobuilders.com/",
    "phone": "(442) 241-5544",
    "owner_name": "Not publicly identified on website",
    "owner_title": "",
    "contact_email": "info@passionprobuilders.com",
    "technology_stack": [
      "Cms: WordPress",
      "Contact: Phone, email, website contact form",
      "Social: Facebook, Twitter, Tumblr, Pinterest, Yelp",
      "Design: 3D design services offered"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 7,
    "research_sources": [
      {
        "label": "Website",
        "url": "https://www.passionprobuilders.com/"
      }
    ],
    "notes": "",
    "filename": "26_Passion_Pro_Builders.md"
  },
  {
    "business_name": "Flashlight Marketing (also known as Flashlight Agency)",
    "industry": "Marketing (AI Consulting, Digital Marketing)",
    "location": "47235 Golden Bush Ct, Palm Desert, CA 92260",
    "website": "https://flashlightagency.com/",
    "phone": "(760) 469-9995",
    "owner_name": "Not publicly identified on website",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Cms: WordPress",
      "Ai focus: AI Agent Development, AI Training, Automation Consulting",
      "Services: AI SEO, Chatbots/Messenger Marketing, Website Design, Strategy Consulting",
      "Brands worked with: Major national brands"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 8,
    "research_sources": [
      {
        "label": "Website",
        "url": "https://flashlightagency.com/"
      }
    ],
    "notes": "",
    "filename": "27_Flashlight_Marketing.md"
  },
  {
    "business_name": "Rexpert Marketing",
    "industry": "Marketing (Digital Marketing, Web Design)",
    "location": "73-360 CA-111 Suite 7, Palm Desert, CA 92260",
    "website": "https://rexpertmarketing.com/",
    "phone": "(760) 666-6123",
    "owner_name": "Not publicly identified on website",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Cms: WordPress with Elementor page builder",
      "Services: Web Design, SEO, Social Media, Content Strategy, Listings Management, Print Design, Photo/Video, Branding, Google Ads",
      "Approach: No contracts, in-house work, no AI-generated content"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 8,
    "research_sources": [
      {
        "label": "Website",
        "url": "https://rexpertmarketing.com/"
      }
    ],
    "notes": "",
    "filename": "28_Rexpert_Marketing.md"
  },
  {
    "business_name": "Blitz Marketing Group",
    "industry": "Marketing (Digital Marketing, SEO, PPC)",
    "location": "74894 Lennon Pl d1, Palm Desert, CA 92260",
    "website": "https://blitzmarketing.org/",
    "phone": "+1 (760) 469-9129",
    "owner_name": "Rob Ashton",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Cms: WordPress",
      "Services: SEO, Social Media Marketing, PPC, Web Design, CRO, Local SEO, Analytics, Email Marketing",
      "Booking: Integrated calendar booking system (Calendly-style)",
      "Certifications: Google Partner"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 8,
    "research_sources": [
      {
        "label": "Website",
        "url": "https://blitzmarketing.org/"
      }
    ],
    "notes": "",
    "filename": "29_Blitz_Marketing_Group.md"
  },
  {
    "business_name": "Desert Auto Repair",
    "industry": "Auto Repair",
    "location": "Palm Desert, CA",
    "website": "https://www.mitchell1crm.com/crmutilities/AppointmentRequest.aspx?c=EAAAAMV6n%2BUXGSvpNZ7SWxMIDV83V9CqTmiau7aBsJXbU0a3SU%2BpIxzCaoqlQS3%2BKGrTWQ%3D%3D",
    "phone": "(760) 341-4685",
    "owner_name": "Not publicly identified",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Crm: Mitchell1 CRM",
      "Appointment system: Mitchell1 online booking",
      "Contact: Phone-based"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 5,
    "research_sources": [],
    "notes": "",
    "filename": "30_Desert_Auto_Repair.md"
  },
  {
    "business_name": "Northern Nevada Family Dental",
    "industry": "Dental",
    "location": "5901 Los Altos Pkwy #100, Sparks, NV 89436",
    "website": "https://www.northernnevadafamilydental.com/",
    "phone": "(775) 626-7772",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Cms: Custom dental website platform",
      "Appointment system: \"Request An Appointment\" button",
      "Technology: 3D imaging, advanced diagnostics, data-driven care",
      "Accessibility: Accessibility menu enabled"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 8,
    "research_sources": [
      {
        "label": "Website",
        "url": "https://www.northernnevadafamilydental.com/"
      }
    ],
    "notes": "",
    "filename": "31_Northern_Nevada_Family_Dental.md"
  },
  {
    "business_name": "Silverlake Dental Care",
    "industry": "Dental",
    "location": "4760 Galleria Pkwy Ste 102-104, Sparks, NV 89436",
    "website": "https://dentistsparksnv.com/",
    "phone": "(775) 391-6212",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Cms: Custom dental website platform",
      "Security: CAPTCHA protection",
      "Contact: Phone-based"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 6,
    "research_sources": [
      {
        "label": "Website",
        "url": "https://dentistsparksnv.com/"
      }
    ],
    "notes": "",
    "filename": "32_Silverlake_Dental_Care.md"
  },
  {
    "business_name": "Sparks Family Dentistry",
    "industry": "Dental",
    "location": "340 Pyramid Way, Sparks, NV 89431",
    "website": "http://www.sparksfamilydentistry.com/",
    "phone": "(775) 359-3336",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Cms: Custom dental website platform",
      "Contact: Phone-based",
      "Issues: Website may have loading/accessibility issues"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 5,
    "research_sources": [
      {
        "label": "Website",
        "url": "http://www.sparksfamilydentistry.com/"
      }
    ],
    "notes": "",
    "filename": "33_Sparks_Family_Dentistry.md"
  },
  {
    "business_name": "Atlas Dental Boutique",
    "industry": "Dental (Boutique/ Premium)",
    "location": "4844 Sparks Blvd #102, Sparks, NV 89436",
    "website": "https://atlasdentalboutique.com/",
    "phone": "(775) 451-3591",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "info@atlasdentalboutique.com",
    "technology_stack": [
      "Cms: Custom (Energize Group)",
      "Booking: \"Book Appointment\" and \"Schedule Your Visit\" buttons",
      "Features: Board Certified, Military-Grade Precision, Cutting-Edge Technology, Boutique Atmosphere"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 8,
    "research_sources": [
      {
        "label": "Website",
        "url": "https://atlasdentalboutique.com/"
      }
    ],
    "notes": "",
    "filename": "34_Atlas_Dental_Boutique.md"
  },
  {
    "business_name": "Walton's Funerals & Cremations - Sparks",
    "industry": "Funeral Services",
    "location": "1745 Sullivan Ln, Sparks, NV 89431",
    "website": "https://www.waltonsfuneralhomes.com/",
    "phone": "(775) 359-2210",
    "owner_name": "Walton family (family-owned since 1959)",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Cms: Custom funeral home platform",
      "Obituaries: Online obituary system",
      "Forms: Downloadable forms, Immediate Need Form",
      "Services: Pre-planning, Service Options, Personalization, Event Centers"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 8,
    "research_sources": [
      {
        "label": "Website",
        "url": "https://www.waltonsfuneralhomes.com/"
      }
    ],
    "notes": "",
    "filename": "35_Waltons_Funerals_Cremations_Sparks.md"
  },
  {
    "business_name": "Cremation Society of Nevada",
    "industry": "Funeral Services (Cremation)",
    "location": "644 Pyramid Way, Sparks, NV 89431",
    "website": "https://cremationsocietynevada.com/",
    "phone": "(775) 331-1112",
    "owner_name": "Not publicly identified",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Cms: Custom funeral home platform",
      "Obituaries: Online obituary system",
      "Forms: Downloadable forms",
      "Memory store: Online urn/memorial store",
      "Pre-planning: Online pre-arrangement system available"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 8,
    "research_sources": [
      {
        "label": "Website",
        "url": "https://cremationsocietynevada.com/"
      }
    ],
    "notes": "",
    "filename": "36_Cremation_Society_of_Nevada.md"
  },
  {
    "business_name": "Sparks Senior Care",
    "industry": "Senior Care Services",
    "location": ", Sparks, NV (estimated)",
    "website": "To be verified",
    "phone": "To be verified",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Website platform: Unknown (requires manual verification)",
      "Online booking: Likely phone-based scheduling",
      "Crm/management: Unknown (likely traditional systems)",
      "Payment processing: Standard industry solutions",
      "Social media: Unknown (requires verification)"
    ],
    "pain_points": [
      "Manual Scheduling: Appointment booking likely requires phone calls",
      "Limited Online Presence: Digital footprint may be outdated",
      "Customer Communication: Manual follow-up processes",
      "Technology Gap: Potential for automation improvements",
      "Online Visibility: SEO and digital marketing opportunities"
    ],
    "opportunities": [
      "AI-Powered Booking System: Implement 24/7 online scheduling",
      "Customer Portal: Create self-service portal for clients",
      "Automated Communications: SMS/email reminders and follow-ups",
      "Website Modernization: Update to modern, mobile-responsive design",
      "CRM Integration: Implement customer relationship management",
      "Review Management: System to encourage and manage online reviews"
    ],
    "confidence_score": 5,
    "research_sources": [],
    "notes": "",
    "filename": "41_Sparks_Senior_Care.md"
  },
  {
    "business_name": "Preferred Auto Care",
    "industry": "Automotive Repair",
    "location": "Greg Street, Sparks, NV (estimated)",
    "website": "To be verified",
    "phone": "To be verified",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Website platform: Unknown (requires manual verification)",
      "Online booking: Likely phone-based scheduling",
      "Crm/management: Unknown (likely traditional systems)",
      "Payment processing: Standard industry solutions",
      "Social media: Unknown (requires verification)"
    ],
    "pain_points": [
      "Manual Scheduling: Appointment booking likely requires phone calls",
      "Limited Online Presence: Digital footprint may be outdated",
      "Customer Communication: Manual follow-up processes",
      "Technology Gap: Potential for automation improvements",
      "Online Visibility: SEO and digital marketing opportunities"
    ],
    "opportunities": [
      "AI-Powered Booking System: Implement 24/7 online scheduling",
      "Customer Portal: Create self-service portal for clients",
      "Automated Communications: SMS/email reminders and follow-ups",
      "Website Modernization: Update to modern, mobile-responsive design",
      "CRM Integration: Implement customer relationship management",
      "Review Management: System to encourage and manage online reviews"
    ],
    "confidence_score": 5,
    "research_sources": [],
    "notes": "",
    "filename": "42_Preferred_Auto_Care.md"
  },
  {
    "business_name": "RPM Automotive Inc.",
    "industry": "Automotive Repair",
    "location": "Sparks, NV",
    "website": "Not available (rpmautomotive.com redirects to Pep Boys)",
    "phone": "To be verified",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Website platform: Unknown (website may not exist or use different domain)",
      "Booking system: Likely phone-based scheduling",
      "Crm/management: Unknown (likely traditional auto shop management software)",
      "Payment processing: Standard auto shop billing systems",
      "Diagnostic equipment: Likely professional automotive diagnostic tools",
      "Parts inventory: Unknown"
    ],
    "pain_points": [
      "No Active Website: Domain rpmautomotive.com redirects to national chain",
      "Online Presence: Limited digital presence for a 4.9★ rated shop",
      "Scheduling: Manual scheduling process likely",
      "Customer Communication: Manual service reminders",
      "Online Visibility: SEO and digital marketing opportunities"
    ],
    "opportunities": [
      "Website Development: Create modern, professional auto shop website",
      "Online Booking: Implement 24/7 appointment scheduling",
      "Service Reminders: Automated maintenance reminders via SMS/email",
      "CRM Integration: Modern auto shop management system",
      "Review Management: System to encourage and manage customer reviews",
      "Customer Portal: Online access to service history and records"
    ],
    "confidence_score": 3,
    "research_sources": [],
    "notes": "",
    "filename": "43_RPM_Automotive_Inc.md"
  },
  {
    "business_name": "Roy Foster's Automotive",
    "industry": "Automotive Repair",
    "location": "Victorian Avenue, Sparks, NV (estimated)",
    "website": "To be verified",
    "phone": "To be verified",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Website platform: Unknown (requires manual verification)",
      "Online booking: Likely phone-based scheduling",
      "Crm/management: Unknown (likely traditional systems)",
      "Payment processing: Standard industry solutions",
      "Social media: Unknown (requires verification)"
    ],
    "pain_points": [
      "Manual Scheduling: Appointment booking likely requires phone calls",
      "Limited Online Presence: Digital footprint may be outdated",
      "Customer Communication: Manual follow-up processes",
      "Technology Gap: Potential for automation improvements",
      "Online Visibility: SEO and digital marketing opportunities"
    ],
    "opportunities": [
      "AI-Powered Booking System: Implement 24/7 online scheduling",
      "Customer Portal: Create self-service portal for clients",
      "Automated Communications: SMS/email reminders and follow-ups",
      "Website Modernization: Update to modern, mobile-responsive design",
      "CRM Integration: Implement customer relationship management",
      "Review Management: System to encourage and manage online reviews"
    ],
    "confidence_score": 5,
    "research_sources": [],
    "notes": "",
    "filename": "44_Roy_Fosters_Automotive.md"
  },
  {
    "business_name": "One Stop Automotive LLC",
    "industry": "Automotive Repair",
    "location": "Spice Islands Drive, Sparks, NV (estimated)",
    "website": "To be verified",
    "phone": "To be verified",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Website platform: Unknown (requires manual verification)",
      "Online booking: Likely phone-based scheduling",
      "Crm/management: Unknown (likely traditional systems)",
      "Payment processing: Standard industry solutions",
      "Social media: Unknown (requires verification)"
    ],
    "pain_points": [
      "Manual Scheduling: Appointment booking likely requires phone calls",
      "Limited Online Presence: Digital footprint may be outdated",
      "Customer Communication: Manual follow-up processes",
      "Technology Gap: Potential for automation improvements",
      "Online Visibility: SEO and digital marketing opportunities"
    ],
    "opportunities": [
      "AI-Powered Booking System: Implement 24/7 online scheduling",
      "Customer Portal: Create self-service portal for clients",
      "Automated Communications: SMS/email reminders and follow-ups",
      "Website Modernization: Update to modern, mobile-responsive design",
      "CRM Integration: Implement customer relationship management",
      "Review Management: System to encourage and manage online reviews"
    ],
    "confidence_score": 5,
    "research_sources": [],
    "notes": "",
    "filename": "45_One_Stop_Automotive_LLC.md"
  },
  {
    "business_name": "Sparks Auto Repair",
    "industry": "Automotive Repair",
    "location": ", Sparks, NV (estimated)",
    "website": "To be verified",
    "phone": "To be verified",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Website platform: Unknown (requires manual verification)",
      "Online booking: Likely phone-based scheduling",
      "Crm/management: Unknown (likely traditional systems)",
      "Payment processing: Standard industry solutions",
      "Social media: Unknown (requires verification)"
    ],
    "pain_points": [
      "Manual Scheduling: Appointment booking likely requires phone calls",
      "Limited Online Presence: Digital footprint may be outdated",
      "Customer Communication: Manual follow-up processes",
      "Technology Gap: Potential for automation improvements",
      "Online Visibility: SEO and digital marketing opportunities"
    ],
    "opportunities": [
      "AI-Powered Booking System: Implement 24/7 online scheduling",
      "Customer Portal: Create self-service portal for clients",
      "Automated Communications: SMS/email reminders and follow-ups",
      "Website Modernization: Update to modern, mobile-responsive design",
      "CRM Integration: Implement customer relationship management",
      "Review Management: System to encourage and manage online reviews"
    ],
    "confidence_score": 5,
    "research_sources": [],
    "notes": "",
    "filename": "46_Sparks_Auto_Repair.md"
  },
  {
    "business_name": "Sparks Coffee Roasters",
    "industry": "Coffee Shop/Café",
    "location": ", Sparks, NV (estimated)",
    "website": "To be verified",
    "phone": "To be verified",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Website platform: Unknown (requires manual verification)",
      "Online booking: Likely phone-based scheduling",
      "Crm/management: Unknown (likely traditional systems)",
      "Payment processing: Standard industry solutions",
      "Social media: Unknown (requires verification)"
    ],
    "pain_points": [
      "Manual Scheduling: Appointment booking likely requires phone calls",
      "Limited Online Presence: Digital footprint may be outdated",
      "Customer Communication: Manual follow-up processes",
      "Technology Gap: Potential for automation improvements",
      "Online Visibility: SEO and digital marketing opportunities"
    ],
    "opportunities": [
      "AI-Powered Booking System: Implement 24/7 online scheduling",
      "Customer Portal: Create self-service portal for clients",
      "Automated Communications: SMS/email reminders and follow-ups",
      "Website Modernization: Update to modern, mobile-responsive design",
      "CRM Integration: Implement customer relationship management",
      "Review Management: System to encourage and manage online reviews"
    ],
    "confidence_score": 5,
    "research_sources": [],
    "notes": "",
    "filename": "47_Sparks_Coffee_Roasters.md"
  },
  {
    "business_name": "Lighthouse Coffee",
    "industry": "Coffee Shop/Café",
    "location": "Harbour Cove Drive, Sparks, NV (estimated)",
    "website": "To be verified",
    "phone": "To be verified",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Website platform: Unknown (requires manual verification)",
      "Online booking: Likely phone-based scheduling",
      "Crm/management: Unknown (likely traditional systems)",
      "Payment processing: Standard industry solutions",
      "Social media: Unknown (requires verification)"
    ],
    "pain_points": [
      "Manual Scheduling: Appointment booking likely requires phone calls",
      "Limited Online Presence: Digital footprint may be outdated",
      "Customer Communication: Manual follow-up processes",
      "Technology Gap: Potential for automation improvements",
      "Online Visibility: SEO and digital marketing opportunities"
    ],
    "opportunities": [
      "AI-Powered Booking System: Implement 24/7 online scheduling",
      "Customer Portal: Create self-service portal for clients",
      "Automated Communications: SMS/email reminders and follow-ups",
      "Website Modernization: Update to modern, mobile-responsive design",
      "CRM Integration: Implement customer relationship management",
      "Review Management: System to encourage and manage online reviews"
    ],
    "confidence_score": 5,
    "research_sources": [],
    "notes": "",
    "filename": "48_Lighthouse_Coffee.md"
  },
  {
    "business_name": "Sparks Coffee Shop",
    "industry": "Coffee Shop/Café",
    "location": "Oddie Boulevard, Sparks, NV (estimated)",
    "website": "To be verified",
    "phone": "To be verified",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Website platform: Unknown (requires manual verification)",
      "Online booking: Likely phone-based scheduling",
      "Crm/management: Unknown (likely traditional systems)",
      "Payment processing: Standard industry solutions",
      "Social media: Unknown (requires verification)"
    ],
    "pain_points": [
      "Manual Scheduling: Appointment booking likely requires phone calls",
      "Limited Online Presence: Digital footprint may be outdated",
      "Customer Communication: Manual follow-up processes",
      "Technology Gap: Potential for automation improvements",
      "Online Visibility: SEO and digital marketing opportunities"
    ],
    "opportunities": [
      "AI-Powered Booking System: Implement 24/7 online scheduling",
      "Customer Portal: Create self-service portal for clients",
      "Automated Communications: SMS/email reminders and follow-ups",
      "Website Modernization: Update to modern, mobile-responsive design",
      "CRM Integration: Implement customer relationship management",
      "Review Management: System to encourage and manage online reviews"
    ],
    "confidence_score": 5,
    "research_sources": [],
    "notes": "",
    "filename": "49_Sparks_Coffee_Shop.md"
  },
  {
    "business_name": "Glory Cloud Coffee Roasters",
    "industry": "Specialty Coffee Roastery & Café",
    "location": "Sparks, NV, USA",
    "website": "https://glorycloudcoffee.com",
    "phone": "844-745-6792",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Website platform: Custom e-commerce (likely BigCommerce or similar)",
      "E-commerce: Full online shopping capability",
      "Payment processing: Online payment gateway",
      "Shipping: Free shipping on orders over $67",
      "Subscription: Subscription service available",
      "Social media: Facebook presence",
      "Youtube: Video content (4 subscribers)"
    ],
    "pain_points": [
      "Limited Hours: Open only M-F 8AM-4PM (closed weekends)",
      "Social Media Presence: Only 4 YouTube subscribers suggests limited social media reach",
      "Marketing Reach: Could expand digital marketing to reach more customers",
      "Weekend Traffic: Missing weekend café traffic with current hours",
      "Local Visibility: Could improve local SEO and Google My Business presence"
    ],
    "opportunities": [
      "Social Media Automation: Automate social media posting to increase reach and engagement",
      "SEO Optimization: Improve local SEO to attract more walk-in traffic",
      "Email Marketing: Implement automated email campaigns for customer retention",
      "Mobile App: Create a mobile ordering app for convenience",
      "Loyalty Program: Implement a digital loyalty rewards program",
      "Weekend Promotion: Marketing campaigns to drive weekend traffic"
    ],
    "confidence_score": 9,
    "research_sources": [],
    "notes": "",
    "filename": "50_Glory_Cloud_Coffee_Roasters.md"
  },
  {
    "business_name": "Sparks Law Office",
    "industry": "Legal Services",
    "location": ", Sparks, NV (estimated)",
    "website": "To be verified",
    "phone": "To be verified",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Website platform: Unknown (requires manual verification)",
      "Online booking: Likely phone-based scheduling",
      "Crm/management: Unknown (likely traditional systems)",
      "Payment processing: Standard industry solutions",
      "Social media: Unknown (requires verification)"
    ],
    "pain_points": [
      "Manual Scheduling: Appointment booking likely requires phone calls",
      "Limited Online Presence: Digital footprint may be outdated",
      "Customer Communication: Manual follow-up processes",
      "Technology Gap: Potential for automation improvements",
      "Online Visibility: SEO and digital marketing opportunities"
    ],
    "opportunities": [
      "AI-Powered Booking System: Implement 24/7 online scheduling",
      "Customer Portal: Create self-service portal for clients",
      "Automated Communications: SMS/email reminders and follow-ups",
      "Website Modernization: Update to modern, mobile-responsive design",
      "CRM Integration: Implement customer relationship management",
      "Review Management: System to encourage and manage online reviews"
    ],
    "confidence_score": 5,
    "research_sources": [],
    "notes": "",
    "filename": "51_Sparks_Law_Office.md"
  },
  {
    "business_name": "Mountain Legacy Law, PLLC",
    "industry": "Legal Services (Estate Planning, Business Law, Real Estate Law)",
    "location": "2215 Green Vista Dr, Ste 302, Sparks, NV 89431",
    "website": "https://mountainlegacylaw.com",
    "phone": "(775) 434-8681",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "info@mountainlegacylaw.com",
    "technology_stack": [
      "Website platform: Custom WordPress/Elementor",
      "Booking system: Online consultation scheduling",
      "Crm: Unknown (likely legal practice management software)",
      "Payment processing: Standard legal billing systems",
      "Social media: Facebook presence",
      "Email marketing: Unknown"
    ],
    "pain_points": [
      "Limited Online Reviews: No visible review aggregation on website",
      "Social Media Reach: Limited social media presence beyond Facebook",
      "Client Portal: No visible client portal for document access",
      "Automated Intake: Manual consultation scheduling process",
      "Content Marketing: Blog could be more actively promoted"
    ],
    "opportunities": [
      "Client Portal: Implement secure document sharing and case tracking",
      "Automated Intake: Online intake forms and document upload system",
      "Review Management: System to encourage and manage client reviews",
      "Social Media Automation: Automate content posting across platforms",
      "Email Marketing: Automated nurture campaigns for leads",
      "CRM Integration: Modern legal practice management system"
    ],
    "confidence_score": 9,
    "research_sources": [],
    "notes": "",
    "filename": "52_Mountain_Legacy_Law_PLLC.md"
  },
  {
    "business_name": "Nevada Counsel, LLC",
    "industry": "Legal Services (Estate Planning, General Counsel, Estate Administration)",
    "location": "Sparks, NV (exact address from website)",
    "website": "https://nevadacounsel.com",
    "phone": "(775) 832-3012",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Website platform: Custom website with video background",
      "Booking system: Online consultation scheduling (in-person and remote/Zoom)",
      "Crm: Unknown",
      "Payment processing: Standard legal billing systems",
      "Social media: Facebook, Instagram, LinkedIn, YouTube",
      "Video content: YouTube channel with educational content",
      "Self-service portal: Available for client access"
    ],
    "pain_points": [
      "Client Portal Complexity: Self-service portal may need better user experience",
      "Review Management: No visible review aggregation on website",
      "Content Distribution: Blog content could be better distributed across channels",
      "Lead Capture: Website could improve lead capture mechanisms",
      "Automation: Manual consultation scheduling process"
    ],
    "opportunities": [
      "Client Portal Enhancement: Improve self-service portal for document access and case tracking",
      "Automated Intake: Online intake forms and document upload system",
      "Review Management: System to encourage and manage client reviews",
      "Social Media Automation: Automate content posting across platforms",
      "Email Marketing: Automated nurture campaigns for leads",
      "CRM Integration: Modern legal practice management system"
    ],
    "confidence_score": 8,
    "research_sources": [],
    "notes": "",
    "filename": "53_Nevada_Counsel_LLC.md"
  },
  {
    "business_name": "Eaton Law",
    "industry": "Legal Services",
    "location": "Sparks, NV (based on email draft context)",
    "website": "To be verified (Sparks location)",
    "phone": "To be verified",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Website platform: Unknown (website may be outdated or not accessible)",
      "Booking system: Likely phone-based scheduling",
      "Crm/management: Unknown (likely traditional legal practice software)",
      "Payment processing: Standard legal billing systems",
      "Social media: Unknown"
    ],
    "pain_points": [
      "Outdated Website: Email draft suggests website design feels dated",
      "Online Presence: Limited digital presence for a 4.6★ rated practice",
      "Client Intake: Manual intake process likely",
      "Technology Gap: Potential for automation improvements",
      "Online Visibility: SEO and digital marketing opportunities"
    ],
    "opportunities": [
      "Website Modernization: Update to modern, professional design",
      "Client Portal: Implement secure document sharing and case tracking",
      "Automated Intake: Online intake forms and document upload system",
      "Review Management: System to encourage and manage client reviews",
      "CRM Integration: Modern legal practice management system",
      "Online Scheduling: Implement consultation booking system"
    ],
    "confidence_score": 4,
    "research_sources": [],
    "notes": "",
    "filename": "54_Eaton_Law.md"
  },
  {
    "business_name": "Sparks Home Services",
    "industry": "Home Services",
    "location": ", Sparks, NV (estimated)",
    "website": "To be verified",
    "phone": "To be verified",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Website platform: Unknown (requires manual verification)",
      "Online booking: Likely phone-based scheduling",
      "Crm/management: Unknown (likely traditional systems)",
      "Payment processing: Standard industry solutions",
      "Social media: Unknown (requires verification)"
    ],
    "pain_points": [
      "Manual Scheduling: Appointment booking likely requires phone calls",
      "Limited Online Presence: Digital footprint may be outdated",
      "Customer Communication: Manual follow-up processes",
      "Technology Gap: Potential for automation improvements",
      "Online Visibility: SEO and digital marketing opportunities"
    ],
    "opportunities": [
      "AI-Powered Booking System: Implement 24/7 online scheduling",
      "Customer Portal: Create self-service portal for clients",
      "Automated Communications: SMS/email reminders and follow-ups",
      "Website Modernization: Update to modern, mobile-responsive design",
      "CRM Integration: Implement customer relationship management",
      "Review Management: System to encourage and manage online reviews"
    ],
    "confidence_score": 5,
    "research_sources": [],
    "notes": "",
    "filename": "55_Sparks_Home_Services.md"
  },
  {
    "business_name": "Sparks Florist®",
    "industry": "Floral Services",
    "location": "Reno & Sparks, NV area",
    "website": "https://www.sparksflorist.com",
    "phone": "(775) 358-8500",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "clientservices@sparksflorist.com",
    "technology_stack": [
      "Website platform: Florist-specific e-commerce platform",
      "E-commerce: Full online shopping capability",
      "Delivery system: Integrated delivery scheduling",
      "Payment processing: Online payment gateway",
      "Inventory management: Product catalog with real-time availability",
      "Crm: Customer management system"
    ],
    "pain_points": [
      "Delivery Tracking: No visible real-time delivery tracking system",
      "Social Media Presence: Limited social media integration visible",
      "Customer Communication: Manual order confirmation process",
      "Loyalty Program: No visible loyalty or rewards program",
      "Mobile Experience: Website may need mobile optimization"
    ],
    "opportunities": [
      "Delivery Tracking System: Implement real-time delivery tracking with photo confirmation",
      "Automated Order Updates: SMS/email notifications for order status",
      "Loyalty Program: Digital rewards program for repeat customers",
      "Social Media Integration: Automate social media posting and engagement",
      "CRM Enhancement: Modern customer relationship management",
      "Subscription Service: Floral subscription for regular deliveries"
    ],
    "confidence_score": 9,
    "research_sources": [],
    "notes": "",
    "filename": "56_Sparks_Florist.md"
  },
  {
    "business_name": "Sparks CPA",
    "industry": "Accounting Services",
    "location": "Sparks, NV",
    "website": "Not available (sparkscpa.com is for sale)",
    "phone": "To be verified",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Website platform: Unknown (website may not exist or use different domain)",
      "Booking system: Likely phone-based scheduling",
      "Crm/management: Unknown (likely traditional accounting software)",
      "Payment processing: Standard accounting billing systems",
      "Tax software: Likely professional tax preparation software",
      "Document management: Unknown"
    ],
    "pain_points": [
      "No Active Website: Domain sparkscpa.com is for sale",
      "Online Presence: Limited digital presence for a 4.7★ rated firm",
      "Client Intake: Manual intake process likely",
      "Technology Gap: Potential for automation improvements",
      "Online Visibility: SEO and digital marketing opportunities"
    ],
    "opportunities": [
      "Website Development: Create modern, professional website",
      "Client Portal: Implement secure document sharing and tax document upload",
      "Automated Intake: Online intake forms and document upload system",
      "Review Management: System to encourage and manage client reviews",
      "CRM Integration: Modern accounting practice management system",
      "Online Scheduling: Implement consultation booking system"
    ],
    "confidence_score": 3,
    "research_sources": [],
    "notes": "",
    "filename": "57_Sparks_CPA.md"
  },
  {
    "business_name": "Sparks Marketing",
    "industry": "Marketing Agency",
    "location": ", Sparks, NV (estimated)",
    "website": "To be verified",
    "phone": "To be verified",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Website platform: Unknown (requires manual verification)",
      "Online booking: Likely phone-based scheduling",
      "Crm/management: Unknown (likely traditional systems)",
      "Payment processing: Standard industry solutions",
      "Social media: Unknown (requires verification)"
    ],
    "pain_points": [
      "Manual Scheduling: Appointment booking likely requires phone calls",
      "Limited Online Presence: Digital footprint may be outdated",
      "Customer Communication: Manual follow-up processes",
      "Technology Gap: Potential for automation improvements",
      "Online Visibility: SEO and digital marketing opportunities"
    ],
    "opportunities": [
      "AI-Powered Booking System: Implement 24/7 online scheduling",
      "Customer Portal: Create self-service portal for clients",
      "Automated Communications: SMS/email reminders and follow-ups",
      "Website Modernization: Update to modern, mobile-responsive design",
      "CRM Integration: Implement customer relationship management",
      "Review Management: System to encourage and manage online reviews"
    ],
    "confidence_score": 5,
    "research_sources": [],
    "notes": "",
    "filename": "58_Sparks_Marketing.md"
  },
  {
    "business_name": "Sparks Real Estate",
    "industry": "Real Estate Services",
    "location": "Sparks, NV",
    "website": "Not available (sparksrealestate.com is parked)",
    "phone": "To be verified",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Website platform: Unknown (website may not exist or use different domain)",
      "Booking system: Likely phone-based scheduling",
      "Crm/management: Unknown (likely traditional real estate software)",
      "Mls integration: Likely uses regional MLS",
      "Payment processing: Standard real estate commission structure",
      "Virtual tours: Not mentioned in email draft"
    ],
    "pain_points": [
      "No Active Website: Domain sparksrealestate.com is parked",
      "Online Presence: Limited digital presence for a 4.7★ rated agency",
      "Virtual Tours: No virtual tour capabilities mentioned",
      "Lead Capture: Manual lead capture process",
      "Online Visibility: SEO and digital marketing opportunities"
    ],
    "opportunities": [
      "Website Development: Create modern, professional real estate website",
      "Virtual Tour Integration: Implement 3D virtual tours for properties",
      "Lead Capture System: Online lead forms and automated follow-up",
      "CRM Integration: Modern real estate CRM with pipeline management",
      "Social Media Automation: Automate property listings across platforms",
      "Review Management: System to encourage and manage client reviews"
    ],
    "confidence_score": 3,
    "research_sources": [],
    "notes": "",
    "filename": "59_Sparks_Real_Estate.md"
  },
  {
    "business_name": "Local Dental",
    "industry": "Dental Practice",
    "location": "Evans Road, San Antonio, TX (estimated)",
    "website": "To be verified",
    "phone": "To be verified",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Website platform: Unknown (requires manual verification)",
      "Online booking: Likely phone-based scheduling",
      "Crm/management: Unknown (likely traditional systems)",
      "Payment processing: Standard industry solutions",
      "Social media: Unknown (requires verification)"
    ],
    "pain_points": [
      "Manual Scheduling: Appointment booking likely requires phone calls",
      "Limited Online Presence: Digital footprint may be outdated",
      "Customer Communication: Manual follow-up processes",
      "Technology Gap: Potential for automation improvements",
      "Online Visibility: SEO and digital marketing opportunities"
    ],
    "opportunities": [
      "AI-Powered Booking System: Implement 24/7 online scheduling",
      "Customer Portal: Create self-service portal for clients",
      "Automated Communications: SMS/email reminders and follow-ups",
      "Website Modernization: Update to modern, mobile-responsive design",
      "CRM Integration: Implement customer relationship management",
      "Review Management: System to encourage and manage online reviews"
    ],
    "confidence_score": 5,
    "research_sources": [],
    "notes": "",
    "filename": "60_Local_Dental.md"
  },
  {
    "business_name": "A.G. Auto Care",
    "industry": "Auto Repair",
    "location": "Palm Desert CA",
    "website": "http://www.agautocare.com/",
    "phone": "(760) 346-5949",
    "owner_name": "[RESEARCH NEEDED]",
    "owner_title": "",
    "contact_email": "[RESEARCH NEEDED]",
    "technology_stack": [
      "Cms: [RESEARCH NEEDED]",
      "E-commerce: [RESEARCH NEEDED]",
      "Marketing tools: [RESEARCH NEEDED]",
      "Crm system: [RESEARCH NEEDED]"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 0,
    "research_sources": [],
    "notes": "",
    "filename": "A_G__Auto_Care_DOSSIER.md"
  },
  {
    "business_name": "Always Best Care Senior Services - Home Care in Palm Desert",
    "industry": "Senior Care / Home Health Care",
    "location": "72171 CA-111 Ste 200, Palm Desert, CA 92260",
    "website": "https://alwaysbestcare.com",
    "phone": "(760) 606-4238",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Website platform: Unknown (robot challenge protection active)",
      "Booking system: Online booking link available",
      "Patient portal: Not visible",
      "Franchise systems: Likely uses national franchise technology platform"
    ],
    "pain_points": [
      "No Care Coordination Portal: No visible system for families to track caregiver schedules and activities",
      "Limited Digital Presence: No visible social media integration",
      "Website Accessibility: Robot challenge protection may hinder some users",
      "Manual Scheduling: Care coordination likely involves significant manual processes"
    ],
    "opportunities": [
      "Care Coordination Platform: Automated caregiver scheduling and route optimization",
      "Family Communication Portal: Real-time updates on caregiver activities and patient status",
      "Automated Reminders: Medication and appointment reminders for patients",
      "Care Documentation: Digital care notes and progress tracking",
      "Emergency Response System: Real-time alerts for family members and care team"
    ],
    "confidence_score": 7,
    "research_sources": [],
    "notes": "",
    "filename": "Always_Best_Care_Senior_Services.md"
  },
  {
    "business_name": "Amber House Luxury Senior Living",
    "industry": "Senior Living / Assisted Living",
    "location": "72870 Amber Street, Palm Desert, CA 92260",
    "website": "https://amberhouseseniorliving.com",
    "phone": "(760) 851-4714",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Website platform: Unknown (robot challenge protection active)",
      "Booking system: Online booking link available",
      "Patient portal: Not visible",
      "Security: Robot challenge protection"
    ],
    "pain_points": [
      "No Resident Portal: No visible portal for families to access resident information",
      "Limited Digital Presence: No visible social media integration",
      "Website Accessibility: Robot challenge protection may hinder some users",
      "No Family Communication System: No visible system for real-time family updates"
    ],
    "opportunities": [
      "Resident Portal: Enable families to access daily activities, meals, and care notes",
      "Family Communication Platform: Automated daily updates with photos and activities",
      "Tour Scheduling: Virtual tours for remote families",
      "Care Coordination: Automated care documentation and communication",
      "Emergency Notifications: Real-time alerts for family members"
    ],
    "confidence_score": 6,
    "research_sources": [],
    "notes": "",
    "filename": "Amber_House_Luxury_Senior_Living.md"
  },
  {
    "business_name": "Brake Master Mobile Mechanics",
    "industry": "Auto Repair",
    "location": "Palm Desert CA",
    "website": "http://brakemastermobilemechanics.biz/home",
    "phone": "(442) 666-4151",
    "owner_name": "[RESEARCH NEEDED]",
    "owner_title": "",
    "contact_email": "[RESEARCH NEEDED]",
    "technology_stack": [
      "Cms: [RESEARCH NEEDED]",
      "E-commerce: [RESEARCH NEEDED]",
      "Marketing tools: [RESEARCH NEEDED]",
      "Crm system: [RESEARCH NEEDED]"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 0,
    "research_sources": [],
    "notes": "",
    "filename": "Brake_Master_Mobile_Mechanics_DOSSIER.md"
  },
  {
    "business_name": "Cam Stone's Automotive",
    "industry": "Auto Repair",
    "location": "Palm Desert CA",
    "website": "http://www.camstonesautomotive.com/",
    "phone": "(760) 568-2999",
    "owner_name": "[RESEARCH NEEDED]",
    "owner_title": "",
    "contact_email": "[RESEARCH NEEDED]",
    "technology_stack": [
      "Cms: [RESEARCH NEEDED]",
      "E-commerce: [RESEARCH NEEDED]",
      "Marketing tools: [RESEARCH NEEDED]",
      "Crm system: [RESEARCH NEEDED]"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 0,
    "research_sources": [],
    "notes": "",
    "filename": "Cam_Stone_s_Automotive_DOSSIER.md"
  },
  {
    "business_name": "Desert Car Medics",
    "industry": "Auto Repair",
    "location": "Palm Desert CA",
    "website": "http://desertcarmedics.com/",
    "phone": "(760) 200-9850",
    "owner_name": "[RESEARCH NEEDED]",
    "owner_title": "",
    "contact_email": "[RESEARCH NEEDED]",
    "technology_stack": [
      "Cms: [RESEARCH NEEDED]",
      "E-commerce: [RESEARCH NEEDED]",
      "Marketing tools: [RESEARCH NEEDED]",
      "Crm system: [RESEARCH NEEDED]"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 0,
    "research_sources": [],
    "notes": "",
    "filename": "Desert_Car_Medics_DOSSIER.md"
  },
  {
    "business_name": "Desert Dream Dentistry & Spa",
    "industry": "Dental/Healthcare (Spa Dentistry)",
    "location": "73151 El Paseo Suite C, Palm Desert, CA 92260",
    "website": "https://desertdreamdentistry.com",
    "phone": "(760) 565-0234",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Website platform: Custom modern dental website",
      "Patient portal: Yes (accessible from website)",
      "Ai chatbot: AWDA Helpers (conversational AI for patient inquiries)",
      "Booking system: Online appointment request form + direct booking link",
      "Communication: Text messaging available",
      "Social media integration: Facebook, YouTube, Yelp, Instagram"
    ],
    "pain_points": [
      "Website Design: While functional, the design could better reflect the \"spa dentistry\" luxury positioning",
      "Limited Online Booking: Appointment request form requires follow-up rather than real-time confirmation",
      "Hours Limited: Closes at 4 PM, may miss after-hours booking opportunities",
      "No Virtual Tours: No virtual office tour to showcase spa-like environment"
    ],
    "opportunities": [
      "Premium Website Redesign: Create a luxury-focused website that matches the spa dentistry concept",
      "Real-Time Booking: Implement AI-powered booking that captures after-hours appointments",
      "Virtual Office Tour: 360° virtual tour to showcase the spa-like environment",
      "Patient Experience Portal: Enhanced portal with treatment plan visualization and progress tracking",
      "Automated Follow-ups: Post-treatment care instructions and follow-up reminders"
    ],
    "confidence_score": 9,
    "research_sources": [],
    "notes": "",
    "filename": "Desert_Dream_Dentistry_and_Spa.md"
  },
  {
    "business_name": "Desert Willow Dentistry",
    "industry": "Dental/Healthcare (Cosmetic & Restorative Dentistry)",
    "location": "74000 Country Club Dr B1, Palm Desert, CA 92260",
    "website": "https://desertwillowdentistry.com",
    "phone": "(760) 568-6900",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Website platform: Custom modern website with video integration",
      "Booking system: Online appointment scheduling",
      "Patient portal: Not visible on main page",
      "Video content: Patient testimonial videos (Wistia hosted)"
    ],
    "pain_points": [
      "Limited Online Booking: Appointment booking requires phone call or form submission",
      "No Patient Portal: No visible patient portal for records access",
      "Hours Limited: Closes at 4 PM, may miss after-hours booking opportunities",
      "No Text/Chat Communication: No visible text or chat options"
    ],
    "opportunities": [
      "Real-Time Booking System: Implement AI-powered booking that captures after-hours appointments",
      "Patient Portal: Enable patients to access records, treatment plans, and communicate with providers",
      "Automated Reminders: Reduce no-shows with SMS/email appointment confirmations",
      "Video Testimonial Management: System to collect and showcase more patient testimonials",
      "Online Review Management: Automate review requests and management"
    ],
    "confidence_score": 9,
    "research_sources": [],
    "notes": "",
    "filename": "Desert_Willow_Dentistry.md"
  },
  {
    "business_name": "FitzHenry-Wiefels Palm Desert Mortuary",
    "industry": "Funeral Services (Cremation & Burial)",
    "location": "73700 Dinah Shore Dr Ste 303, Palm Desert, CA 92211",
    "website": "https://fitzhenrywiefels.com",
    "phone": "(760) 568-9481",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Website platform: Tribute Technology (funeral home CMS)",
      "features",
      "Obituary search and publishing",
      "Online urn store",
      "Preplanning portal",
      "Grief support resources",
      "Flower ordering integration",
      "Newsletter subscription",
      "Booking system: Phone-based arrangement process",
      "Patient portal: Not applicable (family portal for obituaries)"
    ],
    "pain_points": [
      "No Online Arrangements: Families cannot begin arrangement process online",
      "Limited Digital Presence: No visible social media integration",
      "Phone-Based Process: All arrangements require phone contact",
      "No Family Communication Portal: No system for real-time family updates during arrangement process"
    ],
    "opportunities": [
      "Online Arrangement Portal: Allow families to begin planning 24/7, at their own pace",
      "Family Communication System: Automated updates to scattered family members",
      "Digital Guest Book: Online tributes and memories sharing",
      "Live Streaming: Virtual attendance for distant family members",
      "Automated Follow-ups: Post-service grief support and anniversary reminders"
    ],
    "confidence_score": 8,
    "research_sources": [],
    "notes": "",
    "filename": "FitzHenry-Wiefels_Palm_Desert_Mortuary.md"
  },
  {
    "business_name": "Fix Auto Palm Desert",
    "industry": "Auto Repair",
    "location": "Palm Desert CA",
    "website": "https://fixautousa.com/locations/ca/palm-desert/fix-auto-palm-desert-24131/",
    "phone": "(760) 345-0099",
    "owner_name": "[RESEARCH NEEDED]",
    "owner_title": "",
    "contact_email": "[RESEARCH NEEDED]",
    "technology_stack": [
      "Cms: [RESEARCH NEEDED]",
      "E-commerce: [RESEARCH NEEDED]",
      "Marketing tools: [RESEARCH NEEDED]",
      "Crm system: [RESEARCH NEEDED]"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 0,
    "research_sources": [],
    "notes": "",
    "filename": "Fix_Auto_Palm_Desert_DOSSIER.md"
  },
  {
    "business_name": "J & E Automotive",
    "industry": "Auto Repair",
    "location": "Palm Desert CA",
    "website": "https://www.jeautomotiverepair.com/",
    "phone": "(760) 346-8329",
    "owner_name": "[RESEARCH NEEDED]",
    "owner_title": "",
    "contact_email": "[RESEARCH NEEDED]",
    "technology_stack": [
      "Cms: [RESEARCH NEEDED]",
      "E-commerce: [RESEARCH NEEDED]",
      "Marketing tools: [RESEARCH NEEDED]",
      "Crm system: [RESEARCH NEEDED]"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 0,
    "research_sources": [],
    "notes": "",
    "filename": "J___E_Automotive_DOSSIER.md"
  },
  {
    "business_name": "Lino's Auto Repair",
    "industry": "Auto Repair",
    "location": "Palm Desert CA",
    "website": "https://www.linosautorepair.com/",
    "phone": "(760) 773-4707",
    "owner_name": "[RESEARCH NEEDED]",
    "owner_title": "",
    "contact_email": "[RESEARCH NEEDED]",
    "technology_stack": [
      "Cms: [RESEARCH NEEDED]",
      "E-commerce: [RESEARCH NEEDED]",
      "Marketing tools: [RESEARCH NEEDED]",
      "Crm system: [RESEARCH NEEDED]"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 0,
    "research_sources": [],
    "notes": "",
    "filename": "Lino_s_Auto_Repair_DOSSIER.md"
  },
  {
    "business_name": "Ozzie's Automotive Inc.",
    "industry": "Auto Repair",
    "location": "Palm Desert CA",
    "website": "https://ozziesautomotive.com/",
    "phone": "(760) 773-5939",
    "owner_name": "[RESEARCH NEEDED]",
    "owner_title": "",
    "contact_email": "[RESEARCH NEEDED]",
    "technology_stack": [
      "Cms: [RESEARCH NEEDED]",
      "E-commerce: [RESEARCH NEEDED]",
      "Marketing tools: [RESEARCH NEEDED]",
      "Crm system: [RESEARCH NEEDED]"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 0,
    "research_sources": [],
    "notes": "",
    "filename": "Ozzie_s_Automotive_Inc__DOSSIER.md"
  },
  {
    "business_name": "PALM DESERT AUTOMOTIVE",
    "industry": "Auto Repair",
    "location": "Palm Desert CA",
    "website": "https://www.mitchell1crm.com/crmutilities/AppointmentRequest.aspx",
    "phone": "(760) 341-4685",
    "owner_name": "[RESEARCH NEEDED]",
    "owner_title": "",
    "contact_email": "[RESEARCH NEEDED]",
    "technology_stack": [
      "Cms: [RESEARCH NEEDED]",
      "E-commerce: [RESEARCH NEEDED]",
      "Marketing tools: [RESEARCH NEEDED]",
      "Crm system: [RESEARCH NEEDED]"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 0,
    "research_sources": [],
    "notes": "",
    "filename": "PALM_DESERT_AUTOMOTIVE_DOSSIER.md"
  },
  {
    "business_name": "Palm Desert Dental Center",
    "industry": "Dental/Healthcare",
    "location": "73585 Fred Waring Dr #101, Palm Desert, CA 92260",
    "website": "https://palmdesertdental.net",
    "phone": "(760) 773-0052",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Website platform: Prosites.com (dental website template)",
      "Booking system: Manual appointment request form (not real-time booking)",
      "Crm/practice management: Unknown (likely traditional dental software)",
      "Payment processing: Accepts most HMO & PPO plans"
    ],
    "pain_points": [
      "No Online Booking: Website has appointment request form but no real-time booking capability",
      "Template-Based Website: Uses Prosites.com template, lacks unique branding",
      "Limited Digital Presence: No visible social media integration or online patient portal",
      "Manual Communication: Appointment requests require phone follow-up"
    ],
    "opportunities": [
      "AI-Powered Booking System: Implement real-time online scheduling to capture after-hours appointments",
      "Patient Portal: Create a modern patient portal for records, treatment plans, and communication",
      "Website Redesign: Move away from template to custom, modern design reflecting \"World Class Smiles\" branding",
      "Automated Reminders: Implement SMS/email appointment confirmations and follow-ups",
      "Online Review Management: System to encourage and manage Google/Yelp reviews"
    ],
    "confidence_score": 8,
    "research_sources": [],
    "notes": "",
    "filename": "Palm_Desert_Dental_Center.md"
  },
  {
    "business_name": "Palm Desert Smiles",
    "industry": "Dental/Healthcare (Advanced Cosmetic & Restorative Dentistry)",
    "location": "44239 Monterey Avenue, Palm Desert, CA 92260",
    "website": "https://palmdesertsmiles.com",
    "phone": "(760) 568-3602",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Website platform: Custom modern website",
      "advanced technology",
      "iCAT 3D X-Ray (cone beam CT scanning)",
      "Cerec Same Day Crowns (CAD/CAM technology)",
      "KöR Bleaching System",
      "Pinhole Gum Rejuvenation technique",
      "Digital X-rays",
      "Booking system: Consultation request form",
      "Patient portal: Not visible on main page"
    ],
    "pain_points": [
      "Unclaimed Google Listing: Business has not claimed their Google Maps listing",
      "No Online Booking: Consultation request form requires follow-up",
      "Limited Digital Presence: Social media links not prominently featured",
      "No Patient Portal: No visible patient portal for records access"
    ],
    "opportunities": [
      "Google Listing Claim: Help claim and optimize Google Business Profile",
      "Real-Time Booking: Implement AI-powered booking system for after-hours appointments",
      "Patient Portal: Enable patients to access records, treatment plans, and 3D imaging",
      "Technology Showcase: Create interactive content explaining advanced technology (iCAT, Cerec)",
      "Online Review Management: System to encourage and manage patient reviews"
    ],
    "confidence_score": 8,
    "research_sources": [],
    "notes": "",
    "filename": "Palm_Desert_Smiles.md"
  },
  {
    "business_name": "Palms To Pines Automotive",
    "industry": "Auto Repair",
    "location": "Palm Desert CA",
    "website": "https://www.palmsautorepair.com/",
    "phone": "(760) 346-3115",
    "owner_name": "[RESEARCH NEEDED]",
    "owner_title": "",
    "contact_email": "[RESEARCH NEEDED]",
    "technology_stack": [
      "Cms: [RESEARCH NEEDED]",
      "E-commerce: [RESEARCH NEEDED]",
      "Marketing tools: [RESEARCH NEEDED]",
      "Crm system: [RESEARCH NEEDED]"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 0,
    "research_sources": [],
    "notes": "",
    "filename": "Palms_To_Pines_Automotive_DOSSIER.md"
  },
  {
    "business_name": "Portola Dental Group",
    "industry": "Dental/Healthcare (Family & Cosmetic Dentistry)",
    "location": "73733 Fred Waring Dr Suite 207, Palm Desert, CA 92260",
    "website": "https://portoladentalgroup.com",
    "phone": "(760) 346-1414",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Website platform: Custom modern website (Studio 8E8 design)",
      "Booking system: Online appointment scheduling",
      "Communication: Phone-based",
      "Patient portal: Not visible on main page"
    ],
    "pain_points": [
      "Limited Online Presence: Minimal social media visibility",
      "No Patient Portal: No visible patient portal for records access",
      "Group Practice Challenges: Multi-provider coordination may need automation",
      "Limited Digital Communication: No text or chat options visible"
    ],
    "opportunities": [
      "Patient Portal Implementation: Enable patients to access records, treatment plans, and communicate with providers",
      "Automated Appointment Reminders: Reduce no-shows with SMS/email confirmations",
      "Multi-Provider Scheduling: AI-powered scheduling to coordinate multiple dentists",
      "Online Review Management: System to encourage and manage patient reviews",
      "Patient Communication Platform: Automated follow-ups and treatment reminders"
    ],
    "confidence_score": 8,
    "research_sources": [],
    "notes": "",
    "filename": "Portola_Dental_Group.md"
  },
  {
    "business_name": "Rose Mortuaries & Cremation",
    "industry": "Funeral Services (Cremation)",
    "location": "71555 CA-111, Rancho Mirage, CA 92270",
    "website": "https://rosemortuaries.com",
    "phone": "(760) 773-6500",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Website platform: Unknown (Cloudflare protected)",
      "Booking system: Phone-based arrangement process",
      "Patient portal: Not applicable",
      "Security: Cloudflare bot protection"
    ],
    "pain_points": [
      "No Online Arrangements: Families cannot begin arrangement process online",
      "Limited Digital Presence: No visible social media integration",
      "Phone-Based Process: All arrangements require phone contact",
      "Website Accessibility: Cloudflare protection may hinder some users"
    ],
    "opportunities": [
      "Online Arrangement Portal: Allow families to begin planning 24/7, at their own pace",
      "Family Communication System: Automated updates to scattered family members",
      "Live Streaming: Virtual attendance for distant family members",
      "Automated Follow-ups: Post-service grief support and anniversary reminders",
      "Digital Guest Book: Online tributes and memories sharing"
    ],
    "confidence_score": 7,
    "research_sources": [],
    "notes": "",
    "filename": "Rose_Mortuaries_and_Cremation.md"
  },
  {
    "business_name": "Visiting Angels Senior Home Care",
    "industry": "Senior Care / Home Health Care",
    "location": "43875 Washington St # H, Palm Desert, CA 92211",
    "website": "https://visitingangels.com",
    "phone": "(760) 404-0220",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Website platform: National franchise website (visitingangels.com)",
      "Booking system: Free consultation scheduling",
      "Patient portal: Not visible (likely uses franchise systems)",
      "Caregiver matching: Customized care plan development"
    ],
    "pain_points": [
      "No Family Communication Portal: No visible system for real-time family updates",
      "Limited Local Digital Presence: National website may not reflect local capabilities",
      "Manual Care Coordination: Scheduling and route optimization likely manual",
      "No Caregiver Tracking: No visible system for families to monitor caregiver activities"
    ],
    "opportunities": [
      "Family Communication Platform: Automated daily updates with photos and activities",
      "Caregiver Coordination: AI-powered scheduling and route optimization",
      "Real-Time Monitoring: GPS tracking and check-in systems for caregivers",
      "Care Documentation: Digital care notes and progress tracking",
      "Emergency Response: Real-time alerts for family members and care team"
    ],
    "confidence_score": 8,
    "research_sources": [],
    "notes": "",
    "filename": "Visiting_Angels_Senior_Home_Care.md"
  },
  {
    "business_name": "The Dental Space",
    "industry": "Dental Practice",
    "location": "Southeast Military Drive, San Antonio, TX",
    "website": "Unknown (domain may be inactive)",
    "phone": "",
    "owner_name": "Unknown",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Cms: Unknown (no active website detected)",
      "E-commerce: N/A",
      "Marketing: Unknown",
      "Crm: Unknown"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 6,
    "research_sources": [],
    "notes": "",
    "filename": "business_61_the_dental_space.md"
  },
  {
    "business_name": "Sonterra Dental",
    "industry": "Dental Practice",
    "location": "Sonterra Boulevard, San Antonio, TX",
    "website": "sonterradental.com (appears inactive/parked)",
    "phone": "",
    "owner_name": "Unknown",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Cms: Unknown (no active website detected)",
      "E-commerce: N/A",
      "Marketing: Unknown",
      "Crm: Unknown"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 6,
    "research_sources": [],
    "notes": "",
    "filename": "business_62_sonterra_dental.md"
  },
  {
    "business_name": "Cosmetic Dentistry of San Antonio",
    "industry": "Cosmetic Dentistry",
    "location": "Huebner Road, San Antonio, TX",
    "website": "Unknown (may need verification)",
    "phone": "",
    "owner_name": "Unknown",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Cms: Unknown (website design appears outdated)",
      "E-commerce: N/A",
      "Marketing: Unknown",
      "Crm: Unknown"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 6,
    "research_sources": [],
    "notes": "",
    "filename": "business_63_cosmetic_dentistry_sa.md"
  },
  {
    "business_name": "San Antonio Dental Plus",
    "industry": "Dental Practice",
    "location": "San Antonio, TX",
    "website": "Unknown",
    "phone": "",
    "owner_name": "Unknown",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Cms: Unknown",
      "E-commerce: N/A",
      "Marketing: Unknown",
      "Crm: Unknown"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 5,
    "research_sources": [],
    "notes": "",
    "filename": "business_64_sa_dental_plus.md"
  },
  {
    "business_name": "Sunset North Funeral Home",
    "industry": "Funeral Services",
    "location": "Loop 1604, San Antonio, TX",
    "website": "Unknown",
    "phone": "",
    "owner_name": "Unknown",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Cms: Unknown",
      "E-commerce: N/A",
      "Marketing: Unknown",
      "Crm: Unknown"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 6,
    "research_sources": [],
    "notes": "",
    "filename": "business_65_sunset_north_funeral.md"
  },
  {
    "business_name": "Puente & Sons Funeral Chapels",
    "industry": "Funeral Services",
    "location": "South Flores Street, San Antonio, TX",
    "website": "Unknown",
    "phone": "",
    "owner_name": "Unknown",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Cms: Unknown",
      "E-commerce: N/A",
      "Marketing: Unknown",
      "Crm: Unknown"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 6,
    "research_sources": [],
    "notes": "",
    "filename": "business_66_puente_sons_funeral.md"
  },
  {
    "business_name": "D W Brooks Funeral Home",
    "industry": "Funeral Services",
    "location": "East Houston Street, San Antonio, TX",
    "website": "Unknown",
    "phone": "",
    "owner_name": "Unknown",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Cms: Unknown",
      "E-commerce: N/A",
      "Marketing: Unknown",
      "Crm: Unknown"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 6,
    "research_sources": [],
    "notes": "",
    "filename": "business_67_dw_brooks_funeral.md"
  },
  {
    "business_name": "San Antonio Funeral Home",
    "industry": "Funeral Services",
    "location": "San Antonio, TX",
    "website": "Unknown",
    "phone": "",
    "owner_name": "Unknown",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Cms: Unknown",
      "E-commerce: N/A",
      "Marketing: Unknown",
      "Crm: Unknown"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 5,
    "research_sources": [],
    "notes": "",
    "filename": "business_68_sa_funeral_home.md"
  },
  {
    "business_name": "Premier Assisted Living",
    "industry": "Senior Living/Assisted Living",
    "location": "Poppy Peak Street, San Antonio, TX",
    "website": "Unknown",
    "phone": "",
    "owner_name": "Unknown",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Cms: Unknown",
      "E-commerce: N/A",
      "Marketing: Unknown",
      "Crm: Unknown"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 6,
    "research_sources": [],
    "notes": "",
    "filename": "business_69_premier_assisted_living.md"
  },
  {
    "business_name": "Adante Assisted Living & Memory Care",
    "industry": "Senior Living/Memory Care",
    "location": "Cembalo Boulevard, San Antonio, TX",
    "website": "Unknown",
    "phone": "",
    "owner_name": "Unknown",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Cms: Unknown",
      "E-commerce: N/A",
      "Marketing: Unknown",
      "Crm: Unknown"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 6,
    "research_sources": [],
    "notes": "",
    "filename": "business_70_adante_assisted_living.md"
  },
  {
    "business_name": "Trinity Care Assisted Living",
    "industry": "Senior Living/Assisted Living",
    "location": "Bryn Mawr Drive, San Antonio, TX",
    "website": "Unknown",
    "phone": "",
    "owner_name": "Unknown",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Cms: Unknown",
      "E-commerce: N/A",
      "Marketing: Unknown",
      "Crm: Unknown"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 6,
    "research_sources": [],
    "notes": "",
    "filename": "business_71_trinity_care_assisted.md"
  },
  {
    "business_name": "San Antonio Senior Living",
    "industry": "Senior Living",
    "location": "San Antonio, TX",
    "website": "Unknown",
    "phone": "",
    "owner_name": "Unknown",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Cms: Unknown",
      "E-commerce: N/A",
      "Marketing: Unknown",
      "Crm: Unknown"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 5,
    "research_sources": [],
    "notes": "",
    "filename": "business_72_sa_senior_living.md"
  },
  {
    "business_name": "Sam's Hybrid Auto Repair",
    "industry": "Auto Repair (Specialty: Hybrid Vehicles)",
    "location": "New Laredo Highway, San Antonio, TX",
    "website": "Unknown",
    "phone": "",
    "owner_name": "Unknown",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Cms: Unknown",
      "E-commerce: N/A",
      "Marketing: Unknown",
      "Crm: Unknown"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 6,
    "research_sources": [],
    "notes": "",
    "filename": "business_73_sams_hybrid_auto.md"
  },
  {
    "business_name": "Kingdom Auto Repair Service",
    "industry": "Auto Repair",
    "location": "Stahl Park, San Antonio, TX",
    "website": "Unknown",
    "phone": "",
    "owner_name": "Unknown",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Cms: Unknown",
      "E-commerce: N/A",
      "Marketing: Unknown",
      "Crm: Unknown"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 6,
    "research_sources": [],
    "notes": "",
    "filename": "business_74_kingdom_auto_repair.md"
  },
  {
    "business_name": "MasterTech Auto Repair Center",
    "industry": "Auto Repair",
    "location": "Mainland Drive, San Antonio, TX",
    "website": "Unknown",
    "phone": "",
    "owner_name": "Unknown",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Cms: Unknown",
      "E-commerce: N/A",
      "Marketing: Unknown",
      "Crm: Unknown"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 6,
    "research_sources": [],
    "notes": "",
    "filename": "business_75_mastertech_auto.md"
  },
  {
    "business_name": "Ewing Automotive",
    "industry": "Auto Repair",
    "location": "Recoleta Road, San Antonio, TX",
    "website": "Unknown",
    "phone": "",
    "owner_name": "Unknown",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Cms: Unknown",
      "E-commerce: N/A",
      "Marketing: Unknown",
      "Crm: Unknown"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 6,
    "research_sources": [],
    "notes": "",
    "filename": "business_76_ewing_automotive.md"
  },
  {
    "business_name": "San Antonio Auto Service",
    "industry": "Auto Repair",
    "location": "San Antonio, TX",
    "website": "Unknown",
    "phone": "",
    "owner_name": "Unknown",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Cms: Unknown",
      "E-commerce: N/A",
      "Marketing: Unknown",
      "Crm: Unknown"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 5,
    "research_sources": [],
    "notes": "",
    "filename": "business_77_sa_auto_service.md"
  },
  {
    "business_name": "San Antonio Florist",
    "industry": "Florist/Floral Design",
    "location": "San Antonio, TX",
    "website": "Unknown",
    "phone": "",
    "owner_name": "Unknown",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Cms: Unknown",
      "E-commerce: None detected",
      "Marketing: Unknown",
      "Crm: Unknown"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 5,
    "research_sources": [],
    "notes": "",
    "filename": "business_78_sa_florist.md"
  },
  {
    "business_name": "San Antonio Florist Plus",
    "industry": "Florist/Floral Design",
    "location": "San Antonio, TX",
    "website": "Unknown",
    "phone": "",
    "owner_name": "Unknown",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Cms: Unknown",
      "E-commerce: None detected",
      "Marketing: Unknown",
      "Crm: Unknown"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 5,
    "research_sources": [],
    "notes": "",
    "filename": "business_79_sa_florist_plus.md"
  },
  {
    "business_name": "San Antonio CPA",
    "industry": "Accounting/CPA Services",
    "location": "Muniz, San Antonio, TX",
    "website": "Unknown",
    "phone": "",
    "owner_name": "Unknown",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Cms: Unknown",
      "E-commerce: N/A",
      "Marketing: Unknown",
      "Crm: Unknown"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 6,
    "research_sources": [],
    "notes": "",
    "filename": "business_80_sa_cpa.md"
  },
  {
    "business_name": "San Antonio Accounting",
    "industry": "Accounting Services",
    "location": "San Antonio, TX",
    "website": "Unknown",
    "phone": "",
    "owner_name": "Unknown",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Cms: Unknown",
      "E-commerce: N/A",
      "Marketing: Unknown",
      "Crm: Unknown"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 5,
    "research_sources": [],
    "notes": "",
    "filename": "business_81_sa_accounting.md"
  },
  {
    "business_name": "San Antonio Coffee (Estate Coffee Company)",
    "industry": "Coffee Shop/Café",
    "location": "San Antonio, TX",
    "website": "Unknown",
    "phone": "",
    "owner_name": "Unknown",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Cms: Unknown",
      "E-commerce: None detected",
      "Marketing: Unknown",
      "Crm: Unknown"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 5,
    "research_sources": [],
    "notes": "",
    "filename": "business_82_sa_coffee.md"
  },
  {
    "business_name": "Early Bird Coffee",
    "industry": "Coffee Shop/Café",
    "location": "I-10, San Antonio, TX",
    "website": "Unknown",
    "phone": "",
    "owner_name": "Unknown",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Cms: Unknown",
      "E-commerce: None detected",
      "Marketing: Unknown",
      "Crm: Unknown"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 6,
    "research_sources": [],
    "notes": "",
    "filename": "business_83_early_bird_coffee.md"
  },
  {
    "business_name": "Qatra Specialty Coffee",
    "industry": "Coffee Shop/Café (Specialty)",
    "location": "Louis Pasteur Drive, San Antonio, TX",
    "website": "Unknown",
    "phone": "",
    "owner_name": "Unknown",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Cms: Unknown",
      "E-commerce: None detected",
      "Marketing: Unknown",
      "Crm: Unknown"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 6,
    "research_sources": [],
    "notes": "",
    "filename": "business_84_qatra_specialty_coffee.md"
  },
  {
    "business_name": "The Mermaid Cafe",
    "industry": "Coffee Shop/Café",
    "location": "Blanco Road, San Antonio, TX",
    "website": "Unknown",
    "phone": "",
    "owner_name": "Unknown",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Cms: Unknown",
      "E-commerce: None detected",
      "Marketing: Limited social media",
      "Crm: Unknown"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 6,
    "research_sources": [],
    "notes": "",
    "filename": "business_85_mermaid_cafe.md"
  },
  {
    "business_name": "San Antonio Law",
    "industry": "Legal Services/Law Firm",
    "location": "San Antonio, TX",
    "website": "Unknown",
    "phone": "",
    "owner_name": "Unknown",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Cms: Unknown",
      "E-commerce: N/A",
      "Marketing: Unknown",
      "Crm: Unknown"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 5,
    "research_sources": [],
    "notes": "",
    "filename": "business_86_sa_law.md"
  },
  {
    "business_name": "Barton & Associates, Attorneys at Law",
    "industry": "Legal Services/Law Firm",
    "location": "Camaron Street, San Antonio, TX",
    "website": "Unknown",
    "phone": "",
    "owner_name": "Unknown",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Cms: Unknown",
      "E-commerce: N/A",
      "Marketing: Unknown",
      "Crm: Unknown"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 6,
    "research_sources": [],
    "notes": "",
    "filename": "business_87_barton_associates.md"
  },
  {
    "business_name": "Law Office of Jesse Hernández",
    "industry": "Legal Services/Law Firm",
    "location": "Broadway, San Antonio, TX",
    "website": "Unknown",
    "phone": "",
    "owner_name": "Jesse Hernández (presumed)",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Cms: Unknown",
      "E-commerce: N/A",
      "Marketing: Unknown",
      "Crm: Unknown"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 6,
    "research_sources": [],
    "notes": "",
    "filename": "business_88_jesse_hernandez_law.md"
  },
  {
    "business_name": "Dunham & Jones",
    "industry": "Legal Services/Law Firm (Criminal Law)",
    "location": "East Pecan Street, San Antonio, TX",
    "website": "Unknown",
    "phone": "",
    "owner_name": "Unknown",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Cms: Unknown (website design may be outdated)",
      "E-commerce: N/A",
      "Marketing: Unknown",
      "Crm: Unknown"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 6,
    "research_sources": [],
    "notes": "",
    "filename": "business_89_dunham_jones.md"
  },
  {
    "business_name": "San Antonio Marketing (AMA Chapter)",
    "industry": "Marketing Organization",
    "location": "San Antonio, TX",
    "website": "Unknown",
    "phone": "",
    "owner_name": "Unknown",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Cms: Unknown",
      "E-commerce: N/A",
      "Marketing: Unknown",
      "Crm: Unknown"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 5,
    "research_sources": [],
    "notes": "",
    "filename": "business_90_sa_marketing_ama.md"
  },
  {
    "business_name": "FOG Digital Marketing",
    "industry": "Digital Marketing Agency",
    "location": "Loop 1604, San Antonio, TX",
    "website": "Unknown",
    "phone": "",
    "owner_name": "Unknown",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Cms: Unknown",
      "E-commerce: N/A",
      "Marketing: Unknown",
      "Crm: Unknown"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 6,
    "research_sources": [],
    "notes": "",
    "filename": "business_91_fog_digital_marketing.md"
  },
  {
    "business_name": "Funnel Boost Media",
    "industry": "Digital Marketing Agency",
    "location": "Cherry Ridge Drive, San Antonio, TX",
    "website": "Unknown",
    "phone": "",
    "owner_name": "Unknown",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Cms: Unknown",
      "E-commerce: N/A",
      "Marketing: Unknown",
      "Crm: Unknown"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 6,
    "research_sources": [],
    "notes": "",
    "filename": "business_92_funnel_boost_media.md"
  },
  {
    "business_name": "Capture That Media",
    "industry": "Media/Digital Marketing Agency",
    "location": "Radium Street, San Antonio, TX",
    "website": "Unknown",
    "phone": "",
    "owner_name": "Unknown",
    "owner_title": "",
    "contact_email": "",
    "technology_stack": [
      "Cms: Unknown (website design may be outdated)",
      "E-commerce: N/A",
      "Marketing: Unknown",
      "Crm: Unknown"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 6,
    "research_sources": [],
    "notes": "",
    "filename": "business_93_capture_that_media.md"
  },
  {
    "business_name": "United Homes Contracting",
    "industry": "General Contractor / Multifamily Construction",
    "location": "435 W Nakoma Dr, San Antonio, TX 78216",
    "website": "https://unitedhomessatx.com/",
    "phone": "(210) 267-5192",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "sanofficeadmin@unitedhomescontracting.com",
    "technology_stack": [
      "Website platform: Wix",
      "Crm: Unknown",
      "Scheduling: Manual (phone/email based)",
      "Booking system: None detected",
      "Project management: Unknown"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 8,
    "research_sources": [],
    "notes": "",
    "filename": "business_94_united_homes_contracting.md"
  },
  {
    "business_name": "South Texas Contractors & Roofing",
    "industry": "General Contractor / Roofing",
    "location": "32306205, San Antonio, TX (exact address from Google Maps)",
    "website": "https://southtxcontractors.com/",
    "phone": "Not found on website",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "info@southtxcontractors.com",
    "technology_stack": [
      "Website platform: Custom (appears to be Squarespace or similar)",
      "Crm: Unknown",
      "Scheduling: Manual (phone/email based)",
      "Booking system: None detected (has \"Book\" button but likely phone-based)",
      "Project management: Unknown",
      "Social media: Facebook, Google"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 7,
    "research_sources": [],
    "notes": "",
    "filename": "business_95_south_texas_contractors.md"
  },
  {
    "business_name": "Handy Squad Home Services, Inc",
    "industry": "Handyman Services / Home Repair",
    "location": "10203 Kotzebue St Suite 103, San Antonio, TX",
    "website": "https://handysquadhomeservices.com/",
    "phone": "(210) 222-2300",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "autumn@handysquadhomeservices.com",
    "technology_stack": [
      "Website platform: Custom (likely Squarespace or similar)",
      "Crm: Unknown",
      "Scheduling: Manual (phone/email based)",
      "Booking system: None detected (has \"GET A QUOTE\" but phone-based)",
      "Project management: Unknown",
      "Social media: Google, Facebook",
      "Reviews: 667 reviews on Google"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 9,
    "research_sources": [],
    "notes": "",
    "filename": "business_96_handy_squad_home_services.md"
  },
  {
    "business_name": "San Antonio Home Services",
    "industry": "Home Services / Home Repair",
    "location": "San Antonio, TX (exact address not found)",
    "website": "Not found (likely limited online presence)",
    "phone": "Not found",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "Not found",
    "technology_stack": [
      "Website platform: Unknown (likely minimal or none)",
      "Crm: Unknown",
      "Scheduling: Manual (phone/email based)",
      "Booking system: None detected",
      "Project management: Unknown",
      "Social media: Unknown"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 4,
    "research_sources": [],
    "notes": "",
    "filename": "business_97_sa_home_services.md"
  },
  {
    "business_name": "Rangel Real Estate Group",
    "industry": "Real Estate / Brokerage",
    "location": "4204 Gardendale Rd Ste 308, San Antonio, TX 78229",
    "website": "https://rangelrealestategroup.com/",
    "phone": "Not found on website",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "Not found",
    "technology_stack": [
      "Website platform: Custom (OpsAny Web Firewall detected - likely protected)",
      "Crm: Unknown",
      "Scheduling: Manual (phone/email based)",
      "Booking system: None detected",
      "Virtual tours: Not found (opportunity)",
      "Social media: Facebook, LinkedIn, Zillow"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 7,
    "research_sources": [],
    "notes": "",
    "filename": "business_98_rangel_real_estate.md"
  },
  {
    "business_name": "San Antonio Realty Group",
    "industry": "Real Estate / Brokerage",
    "location": "San Antonio, TX (exact address not found)",
    "website": "https://sanantoniopropertygroup.lptsearch.com/index.php (listing service)",
    "phone": "Not found",
    "owner_name": "",
    "owner_title": "",
    "contact_email": "Not found",
    "technology_stack": [
      "Website platform: LPT Realty listing service (third-party)",
      "Crm: Unknown",
      "Scheduling: Manual (phone/email based)",
      "Booking system: None detected",
      "Lead capture: Not found (opportunity)",
      "Social media: Unknown"
    ],
    "pain_points": [],
    "opportunities": [],
    "confidence_score": 5,
    "research_sources": [],
    "notes": "",
    "filename": "business_99_sa_realty_group.md"
  }
];
