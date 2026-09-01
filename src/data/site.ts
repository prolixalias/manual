export type NavId = "home" | "indoors" | "outdoors" | "calendar";
export type GroupId = "indoors" | "outdoors";

export const site = {
  name: "Home Manual",
  short: "HOME",
  address: {
    line1: "2925 Canton Road",
    line2: "Cheboygan, MI 49721",
    intersection: "Canton Road and Black Lane",
  },
  wifi: {
    network: "Access permitted...",
    password: "easy2remember",
    hint: 'It\'s "easy to remember" in lowercase with the number two instead of "to".',
  },
  emergency: {
    call: "911",
    sheriff: "+1 (231) 627-3155",
    msp: "+1 (231) 627-9973",
    fire: "+1 (231) 625-8524",
  },
};

/** Browser tab title: `HOME`, or `HOME - Indoors`, `HOME - Vacation`, etc. */
export function documentTitle(page?: string) {
  if (!page || page === site.short || page === site.name) return site.short;
  return `${site.short} - ${page}`;
}

export const nav = [
  { id: "home" as const, href: "/", label: "Home" },
  { id: "indoors" as const, href: "/indoors/", label: "Indoors" },
  { id: "outdoors" as const, href: "/outdoors/", label: "Outdoors" },
  { id: "calendar" as const, href: "/calendar/", label: "Calendar" },
] as const;

export type Manual = {
  id: string;
  title: string;
  group: GroupId;
  href: string;
  banner: string;
  blurb: string;
};

export const manuals: Manual[] = [
  {
    id: "vacation",
    title: "Vacation",
    group: "indoors",
    href: "/manuals/vacation/",
    banner: "/media/banner-vacation.png",
    blurb: "The leave-the-house checklist — thermostat, locks, trash, plants, boat.",
  },
  {
    id: "thermostat",
    title: "Thermostat",
    group: "indoors",
    href: "/manuals/thermostat/",
    banner: "/media/banner-thermostat.png",
    blurb: "Kitchen-wall heat. Three occupancy sensors. Ask if the slider fights you.",
  },
  {
    id: "fireplace",
    title: "Fireplace",
    group: "indoors",
    href: "/manuals/fireplace/",
    banner: "/media/banner-fireplace.png",
    blurb: "Off in summer. Siri and a laminated cheat sheet in winter.",
  },
  {
    id: "kitchen_appliances",
    title: "Kitchen appliances",
    group: "indoors",
    href: "/manuals/kitchen_appliances/",
    banner: "/media/banner-kitchen.png",
    blurb: "Dishwasher, disposal, both fridges, microwave, and the hot burners.",
  },
  {
    id: "laundry",
    title: "Laundry",
    group: "indoors",
    href: "/manuals/laundry/",
    banner: "/media/banner-laundry.png",
    blurb: "Mudroom washer and dryer. Door open. Lint trap every load.",
  },
  {
    id: "bedroom_upstairs_master",
    title: "Upstairs master bedroom",
    group: "indoors",
    href: "/manuals/bedroom_upstairs_master/",
    banner: "/media/banner-bed-up.png",
    blurb: "Towels, sheets, mouthwash, red cups.",
  },
  {
    id: "bedroom_downstairs",
    title: "Downstairs bedroom and bathroom",
    group: "indoors",
    href: "/manuals/bedroom_downstairs/",
    banner: "/media/banner-bed-down.png",
    blurb: "Desk monitors, extra towels, and the bathroom closet.",
  },
  {
    id: "tesla_charger",
    title: "Tesla charger",
    group: "indoors",
    href: "/manuals/tesla_charger/",
    banner: "/media/banner-tesla_charger.png",
    blurb: "East wall of the garage. Hang the cable when you're done.",
  },
  {
    id: "trash",
    title: "Trash removal",
    group: "indoors",
    href: "/manuals/trash/",
    banner: "/media/banner-trash.png",
    blurb: "GFL Wednesday morning. Put it out Tuesday night.",
  },
  {
    id: "houseplants",
    title: "Houseplants",
    group: "indoors",
    href: "/manuals/houseplants/",
    banner: "/media/banner-houseplants.png",
    blurb: "Don't water unless asked. The plant person has a schedule.",
  },
  {
    id: "security_cameras",
    title: "Security cameras",
    group: "indoors",
    href: "/manuals/security_cameras/",
    banner: "/media/banner-security_cameras.png",
    blurb: "Five outdoor cameras. Off while we're home. Don't move them.",
  },
  {
    id: "dock",
    title: "Dock",
    group: "outdoors",
    href: "/manuals/dock/",
    banner: "/media/banner-dock.png",
    blurb: "Fiber run to the dock — strand colors, loss, and which spare to use.",
  },
  {
    id: "cart",
    title: "Golf cart",
    group: "outdoors",
    href: "/manuals/cart/",
    banner: "/media/banner-cart.png",
    blurb: "E-Z-Go part numbers and 5W-30 synthetic.",
  },
  {
    id: "grill",
    title: "Grill",
    group: "outdoors",
    href: "/manuals/grill/",
    banner: "/media/banner-grill.png",
    blurb: "Clean it hot. Spare tank by the garage doors.",
  },
  {
    id: "fire_pit",
    title: "Fire pit",
    group: "outdoors",
    href: "/manuals/fire_pit/",
    banner: "/media/banner-fire_pit.png",
    blurb: "Restock the wood. Kindling bucket and splitter are in the garage.",
  },
  {
    id: "lawn",
    title: "Lawncare & landscaping",
    group: "outdoors",
    href: "/manuals/lawn/",
    banner: "/media/banner-lawn.png",
    blurb: "Carl on Thursdays. Matt on the beds. S&G on the path lights.",
  },
  {
    id: "orchard",
    title: "Orchard",
    group: "outdoors",
    href: "/manuals/orchard/",
    banner: "/media/banner-orchard.png",
    blurb: "Twelve trees on 40′ × 80′. Map, health watch, harvest, encyclopedia.",
  },
  {
    id: "pontoon",
    title: "Pontoon",
    group: "outdoors",
    href: "/manuals/pontoon/",
    banner: "/media/banner-pontoon.png",
    blurb: "Anchor In Marina if you need a rental. Tie it up. Top the tank.",
  },
];

export const indoors = manuals.filter((m) => m.group === "indoors");
export const outdoors = manuals.filter((m) => m.group === "outdoors");

export function manualById(id: string) {
  return manuals.find((m) => m.id === id);
}

export function relatedManuals(id: string, limit = 2) {
  const current = manualById(id);
  if (!current) return [];
  return manuals.filter((m) => m.group === current.group && m.id !== id).slice(0, limit);
}
