export type Room = {
  name: string;
  price: string;
  img: string;
  desc: string;
  size: string;
  beds: string;
  capacity: string;
  view: string;
  long: string;
  features: string[];
  services: string[];
  gallery: string[];
};

const sharedServices = [
  "Complimentary bottle of South Tyrolean sparkling wine upon arrival.",
  "Reserved parking space in our underground garage.",
  'Daily "Gourmet Breakfast" served in the suite upon request.',
];

export const rooms: Room[] = [
  {
    name: "Garden Suite",
    price: "€420",
    img: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1000",
    desc: "A serene retreat overlooking lemon groves with a private patio.",
    size: "42 m²",
    beds: "1 King bed",
    capacity: "2 guests",
    view: "Lemon grove",
    long: "Set on the lower terrace, the Garden Suite opens onto a private patio shaded by centuries-old lemon trees. The interior pairs lime-washed walls with handmade Vietri tile and a deep soaking tub.",
    features: ["Bathtub", "Wifi", "Mini Bar"],
    services: sharedServices,
    gallery: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200",
    ],
  },
  {
    name: "Sea View Suite",
    price: "€680",
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1000",
    desc: "Floor-to-ceiling windows framing the endless Tyrrhenian blue.",
    size: "55 m²",
    beds: "1 King bed",
    capacity: "2 guests",
    view: "Tyrrhenian Sea",
    long: "Perched on the cliff edge, the Sea View Suite is wrapped in floor-to-ceiling glass. Step out to a generous balcony with a daybed and dine al fresco as the sun melts into the horizon.",
    features: ["Bathtub", "Wifi", "Mini Bar"],
    services: sharedServices,
    gallery: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
    ],
  },
  {
    name: "Cliffside Villa",
    price: "€1,250",
    img: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1000",
    desc: "A two-bedroom villa with private plunge pool and butler service.",
    size: "120 m²",
    beds: "2 King beds",
    capacity: "4 guests",
    view: "Panoramic coast",
    long: "Our flagship residence: two suites, a living room with a stone fireplace, and a wraparound terrace with a heated plunge pool. A dedicated butler curates every detail of your stay.",
    features: ["Bathtub", "Wifi", "Mini Bar"],
    services: sharedServices,
    gallery: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200",
      "https://images.unsplash.com/photo-1551776235-dde6d482980b?w=1200",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200",
    ],
  },
];
