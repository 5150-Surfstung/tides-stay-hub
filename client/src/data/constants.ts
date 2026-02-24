import {
  ConciergeBell,
  Compass,
  Heart,
  Users,
  Waves,
  Car,
  Map as MapIcon,
  Shell,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface WeddingPackage {
  name: string;
  tagline: string;
  guests: string;
  priceRange: string;
  venue: string;
  popular?: boolean;
  perfectFor: string[];
  includes: string[];
}

export const weddingPackages: WeddingPackage[] = [
  {
    name: "Intimate Beach Ceremony",
    tagline: 'Say "I do" with your toes in the sand',
    guests: "Up to 50 guests",
    priceRange: "Contact for pricing",
    venue: "Beach Front Ceremony site",
    perfectFor: ["Elopements", "Micro-weddings", "Vow renewals"],
    includes: [
      "Dedicated sales & catering manager",
      "Beach ceremony facilitation by hotel staff",
      "In-house catering & full bar service",
      "Inclement weather backup space included",
      "Hotel room available as bridal suite (reservable)",
      "Rehearsal available day prior (subject to availability)",
    ],
  },
  {
    name: "Classic Oceanfront Reception",
    tagline: "The Knot Best of Weddings award-winning venue",
    guests: "50 – 180 guests",
    priceRange: "Contact for pricing",
    venue: "Pavilion Ballroom (2,883 ft²) + Beach Ceremony",
    popular: true,
    perfectFor: [
      "Full wedding day",
      "Reception + ceremony",
      "Rehearsal weekends",
    ],
    includes: [
      "Everything in Intimate package",
      "Pavilion Ballroom reception with sweeping ocean views",
      "Custom floor plan designed to your vision",
      "Pre-function area with waterfront views",
      "Juliet balcony access for photos & champagne toasts",
      "In-house catering — from Lowcountry boil to plated dinners",
      "Full bar service (all alcohol served by Tides)",
      "Venue setup & breakdown handled by our team",
    ],
  },
  {
    name: "Grand Celebration",
    tagline: "The ultimate Folly Beach destination wedding",
    guests: "100 – 200 guests",
    priceRange: "Contact for pricing",
    venue: "Multiple venues — Pavilion, Shipwatch, Pergola & Beach",
    perfectFor: [
      "Destination weddings",
      "Full wedding weekends",
      "Multi-day celebrations",
    ],
    includes: [
      "Everything in Classic package",
      "Multiple venue spaces for ceremony, cocktails & reception",
      "Shipwatch Ballroom (960 ft²) for intimate gatherings",
      "Pinky's Pergola (1,647 ft²) — floral archway & oceanfront views",
      "Overnight guest room block at group rates",
      "Executive chef-curated multi-course menu tasting",
      "Premium bar packages available",
      "Beach Bar & Deck access for after-party",
      "Priority date selection",
    ],
  },
];

export interface WeddingAddOn {
  id: string;
  label: string;
  price: string;
}

export const weddingAddOns: WeddingAddOn[] = [
  { id: "roomblock", label: "Overnight Guest Room Block", price: "Group rates" },
  { id: "rehearsal", label: "Rehearsal Dinner at Pinky's or Shipwatch", price: "Ask us" },
  { id: "brunch", label: "Morning-After Farewell Brunch", price: "Ask us" },
  { id: "dessert", label: "Specialty Wedding Dessert (outside baker)", price: "Cake-cutting fee" },
  { id: "cocktailhr", label: "Pierview Cocktail Hour (up to 80 guests)", price: "Ask us" },
  { id: "pergola", label: "Pinky's Pergola Welcome Party", price: "Ask us" },
  { id: "beachbar", label: "Beach Bar & Deck After-Party", price: "Ask us" },
  { id: "bridalroom", label: "Bridal Suite Room Reservation", price: "Room rate" },
  { id: "extended", label: "Extended Reception Hours", price: "Ask us" },
  { id: "barpackage", label: "Premium Top-Shelf Bar Upgrade", price: "Ask us" },
];

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { id: "frontdesk", label: "Front Desk", icon: ConciergeBell },
  { id: "thingstodo", label: "Things to Do", icon: Compass },
  { id: "weddings", label: "Weddings", icon: Heart },
  { id: "meetings", label: "Meetings", icon: Users },
  { id: "amenities", label: "Amenities", icon: Waves },
  { id: "parking", label: "Parking", icon: Car },
  { id: "folly", label: "Explore Folly", icon: MapIcon },
  { id: "kids", label: "Kids & Teens", icon: Shell },
];

export interface AvocetProperty {
  property: string;
  loc: string;
  sell: string;
  offersUrl: string;
  siteUrl: string;
}

export const avocetProperties: AvocetProperty[] = [
  {
    property: "Tides Folly Beach",
    loc: "Folly Beach, SC",
    sell: "Oceanfront boutique hotel on Folly Beach — surf, sand, and sunsets steps from your door.",
    offersUrl: "https://www.tidesfollybeach.com/offers/",
    siteUrl: "https://www.tidesfollybeach.com/",
  },
  {
    property: "The Vendue",
    loc: "Charleston, SC",
    sell: "Charleston's only art hotel — rooftop bar, gallery tours, and downtown charm.",
    offersUrl: "https://www.thevendue.com/offers/",
    siteUrl: "https://www.thevendue.com/",
  },
  {
    property: "The Read House",
    loc: "Chattanooga, TN",
    sell: "Historic landmark hotel in Chattanooga — Lookout Mountain, Ruby Falls, and Southern elegance.",
    offersUrl: "https://www.thereadhousehotel.com/offers/",
    siteUrl: "https://www.thereadhousehotel.com/",
  },
  {
    property: "The Admiral Hotel",
    loc: "Mobile, AL",
    sell: "Boutique luxury in downtown Mobile — Gulf Coast hospitality meets modern style.",
    offersUrl: "https://www.theadmiralhotel.com/offers/",
    siteUrl: "https://www.theadmiralhotel.com/",
  },
];
