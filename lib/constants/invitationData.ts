export interface EventItem {
  id: string;
  name: string;
  time?: string;
  note?: string;
  location?: string;
}

export interface EventDay {
  date: string;
  dayOfWeek: string;
  formattedDate: string;
  title: string;
  events: EventItem[];
  highlight?: string;
}

export interface VenueInfo {
  name: string;
  location: string;
  description: string;
  mapsUrl: string;
  event: string;
}

export interface ContactInfo {
  display: string;
  number: string;
  label?: string;
}

export const invitationData = {
  host: {
    family: "Mr. & Mrs. Late Haji Mohammad Shahzade Khan",
    requestText: "request the pleasure of your gracious presence and blessings on the joyous occasion of the",
    occasion: "DAWAT-E-WALIMA",
    relation: "of their grandson",
    withBlessings: "WITH THE BLESSINGS OF ALLAH ALMIGHTY",
    primaryDate: "Saturday, 12th December 2026",
    primaryTime: "8:00 PM",
    primaryVenue: "Shivam Palace",
    primaryVenueCity: "Keshavpuram, Kanpur",
  },

  couple: {
    bride: "Arshiya Anees",
    brideShort: "Arshiya",
    brideTitle: "DAUGHTER OF MR. MOHD ANEES",
    groom: "Mohammad Farhan Khan",
    groomShort: "Farhan",
    groomTitle: "SON OF LATE MOHAMMAD NAYEEM KHAN",
    tagline: "AS THEY BEGIN THEIR FOREVER",
    openingQuote: "Join us for the union of two souls.",
    quranVerse: {
      arabic: "وَخَلَقْنَاكُمْ أَزْوَاجًا",
      translation: "And we created you in pairs",
      surah: "Quran 78:8",
    },
    bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    bismillahShort: "بِسْمِ الله",
    blessingText: "With the blessings of Allah Almighty, the family of Mohammed Azaz Khan request your gracious presence and prayers on their sacred union.",
  },
  
  datesOverview: "8 — 12 DECEMBER 2026",

  days: [
    {
      date: "8 DECEMBER 2026",
      dayOfWeek: "Tuesday",
      formattedDate: "December 8, 2026",
      title: "Milad & Manjha",
      events: [
        {
          id: "milad",
          name: "MILAD",
          time: "4:00 PM",
          note: "Seeking divine blessings and prayers for the sacred union",
        },
        {
          id: "manjha",
          name: "MANJHA",
          time: "6:00 PM",
          note: "Traditional festivities and joyful celebration with family",
        },
      ],
    },
    {
      date: "10 DECEMBER 2026",
      dayOfWeek: "Thursday",
      formattedDate: "December 10, 2026",
      title: "The Barat",
      events: [
        {
          id: "barat",
          name: "BARAT",
          time: "6:00 PM",
          note: "LEAVING FOR THE WEDDING",
          location: "Shanti Upvan, Rura Road, Akbarpur",
        },
      ],
    },
    {
      date: "12 DECEMBER 2026",
      dayOfWeek: "Saturday",
      formattedDate: "December 12, 2026",
      title: "Reception & Walima",
      events: [
        {
          id: "walima",
          name: "RECEPTION / WALIMA",
          time: "8:00 PM",
          location: "Shivam Palace, Keshavpuram, Kanpur",
          note: "An evening of celebration, banquet & prayers",
        },
      ],
    },
  ] as EventDay[],

  venues: [
    {
      name: "Shivam Palace",
      location: "Keshavpuram, Kanpur",
      description: "Grand banquet hall hosting the Reception & Walima dinner.",
      mapsUrl: "https://maps.google.com/?q=Shivam+Palace+Keshavpuram+Kanpur",
      event: "Reception / Walima — Dec 12, 8:00 PM",
    },
    {
      name: "Shanti Upvan",
      location: "Rura Road, Akbarpur, Kanpur Dehat",
      description: "Celebration venue & departure point on Rura Road, Akbarpur.",
      mapsUrl: "https://maps.app.goo.gl/5ULWDV2d87xTsgWz9?g_st=iw",
      event: "Barat Departure — Dec 10, 6:00 PM",
    },
  ] as VenueInfo[],

  contacts: [
    {
      display: "+91 70075 18696",
      number: "+917007518696",
      label: "Contact",
    },
    {
      display: "+91 88081 86786",
      number: "+918808186786",
      label: "Contact",
    },
    {
      display: "+91 80818 03909",
      number: "+918081803909",
      label: "Contact",
    },
  ] as ContactInfo[],

  dressCode: {
    title: "DRESS CODE",
    theme: "Pastels & Jewel Tones",
    note: "Traditional Attire & Festive Elegance",
  },

  closing: {
    title: "WITH ALL OUR HEARTS",
    heading: "Your presence is our present",
    message: "Your love, prayers and presence are the greatest gifts as we embark on this sacred journey together.",
    subheading: "We can't wait to celebrate with you",
  },

  welcome: {
    badge: "WELCOME FROM",
    family: "Khan Family",
    message: "Awaiting your gracious presence, prayers and warm blessings.",
    compliments: "With Best Compliments From All Relatives & Friends",
  },
};
