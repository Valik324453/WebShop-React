import React, { useState, createContext } from "react";

export const ctx = createContext();

export default function Context({ children }) {
  const [countCartItems, setCountCartItems] = useState(0);
  const [cart, setCart] = useState([]);
  const [items, setItems] = useState([
    {
      id: "bike-1",
      title: "Cobalt 3",
      description:
        "The Pinnacle Cobalt is the bicycle equivalent of a 4x4. With its upright and comfortable riding position, versatile and grippy 40mm wide tyres, adjustable suspension forks and pannier rack mounts on all models, the Pinnacle Cobalt is a master of covering ground in comfort and control. Whether you’re riding on roads, towpaths or woodland short-cuts, the Pinnacle Cobalt handles it all with ease. If a mountain bike seems too over-built or heavy and a road bike too limiting, the do-it-all Cobalt could be what you're looking for. Due to stock availability, some components may change without notice.",
      price: 459, //sort
      stock: 5,
      manufacturer: "Giant", //filter
      img: "https://www.evanscycles.com/images/products/93917718_l.jpg",
    },
    {
      id: "bike-2",
      title: "Laterite 1",
      description:
        "The Pinnacle Laterite is the perfect introduction to drop bar bikes. Now with an updated unisex design that looks to build on the success of the first generation of bike with smoother lines, improved braking performance and even better value for money. The Pinnacle Laterite is an excellent first road bike or an upgrade from your old bike. A balanced riding position and comfortable geometry inspired by our award-winning Dolomite combined with thick bar tape and a carbon bladed fork make this an ideal bike for training miles, sportives or leisure riding.",
      price: 349,
      stock: 2,
      manufacturer: "Redline",
      img: "https://www.evanscycles.com/images/products/93435002_l.jpg",
    },
    {
      id: "bike-3",
      title: "Laterite 2",
      description:
        "The Pinnacle Laterite is the perfect introduction to drop bar bikes. Now with an updated unisex design that looks to build on the success of the first generation of bike with smoother lines, improved braking performance and even better value for money. The Pinnacle Laterite is an excellent first road bike or an upgrade from your old bike. A balanced riding position and comfortable geometry inspired by our award-winning Dolomite combined with thick bar tape and a carbon bladed fork make this an ideal bike for training miles, sportives or leisure riding.",
      price: 575,
      stock: 7,
      manufacturer: "Redline",
      img: "https://www.evanscycles.com/images/products/93435140_l.jpg",
    },
    {
      id: "bike-4",
      title: "Neon 1",
      description:
        "Arriving at work in style and bringing a little swagger to your fitness goals, the Pinnacle Neon 1 2021 Hybrid Bike is all about being efficient and effortless in your ride. Lots of style but also plenty of substance, the lightweight and durable 6061 heat treated aluminium frame will stand strong to support your daily routines while smooth gear shifting is assured through the durable 18 speed Shimano Sora R3000 drivetrain. With control at your fingers, the Rapidfire trigger shifters keep shifting easy and accurate for any hills that stand in your way.",
      price: 459,
      stock: 1,
      manufacturer: "Bicyclette",
      img: "https://www.evanscycles.com/images/products/93435440_l.jpg",
    },
    {
      id: "bike-5",
      title: "Lithium 1",
      description:
        "If you’re enjoying the adventures of different terrains then you need an adaptable bike which is why the Lithium’s alloy frame is stiff enough to feel responsive while light enough not to hold you back. The robust alloy feel continues through the light and responsive Hi-Ten fork with the added compatibility for mudguards. Keeping you smoothly moving is the Shimano Tourney 3x7 Speed Drivetrain, offering up fast, reliable and accurate shifting with enough range to tackle any gradient.",
      price: 300,
      stock: 5,
      manufacturer: "Giant",
      img: "https://www.evanscycles.com/images/products/93917103_l.jpg",
    },
    {
      id: "bike-6",
      title: "Arkose 2",
      description:
        "A real drop-bar legend on the dirt, the Pinnacle Arkose prides itself on versatility. It’s been conquering the trails and kicking up a dust storm long before you were told you were needed a gravel bike for any off-piste cycling. The Arkose 2 comes kitted out with Shimano’s reliable Sora R3000 drivetrain, with a compact 46-30T FSA chainset, and paired with a 11-34T 9-speed cassette. With clearance for 700 x 47c or 650B x 50 tyres, it’s also future proofed with internal cable routing that are compatible with electric groupsets.",
      price: 950,
      stock: 0,
      manufacturer: "Giant",
      img: "https://www.evanscycles.com/images/products/91576018_l.jpg",
    },
    {
      id: "bike-7",
      title: "Marlin 5",
      description:
        "Marlin 5 is a trail-worthy daily rider that's perfectly suited for everyday adventures, on and off the trail. A suspension fork, 2x8 drivetrain, and mounts for a rack and kickstand make it an ideal choice for new trail riders or anyone looking for a comfortable, stable commuter with the ruggedness of a real mountain bike. A lightweight aluminium frame with internal routing to protect your cables and add to the bike's sleek look, 2x8 drivetrain, a wide range of gearing so you always have the right gear for your terrain, powerful hydraulic disc brakes and a terrain-smoothing suspension fork with a lockout.",
      price: 580,
      stock: 0,
      manufacturer: "Bicyclette",
      img: "https://www.evanscycles.com/images/products/91667402_l.jpg",
    },
    {
      id: "bike-8",
      title: "Domane AL 2",
      description:
        "Domane AL 2 is the perfect gateway to comfortable road biking. It's stable, light, easy to accessorise and fun to ride – all of which makes it the ideal choice for anyone looking for a great first experience with a real road bike. You're a value-minded rider testing the waters of road cycling and want a drop-bar bike that's an upgrade in feel, speed and efficiency over a flat-bar hybrid or mountain bike. Domane AL 2 is a great choice if you're new to the road and want a quality road bike that you won't immediately outgrow.",
      price: 800,
      stock: 1,
      manufacturer: "Redline",
      img: "https://www.evanscycles.com/images/products/93435703_l.jpg",
    },
    {
      id: "bike-9",
      title: "Remedy 7",
      description:
        "The Remedy 7 is a mountain bike built for mountain towns. Our best-value Remedy has all the performance features you could want for a ridiculously fun time on the most technical trails. Long travel suspension, a dropper post and an 12-speed drive train tick all the all-mountain boxes. Every ride is break time. You've graduated Mountain Biking Basics, and now want a real trail bike that you can throw around – one that's not shy about trying new lines, leaving the ground and blasting through anything on the trail.",
      price: 2750,
      stock: 8,
      manufacturer: "Giant",
      img: "https://www.evanscycles.com/images/products/91784108_l.jpg",
    },
    {
      id: "bike-10",
      title: "Adventure Neo 4",
      description:
        "An electric-bike built for the city streets, the town pathways, and the great open roads. You are just one ride away from a good mood. Easy to get on and off. A confident, upright riding position. Suspension fork and seatpost. Big, bump-absorbing tires and hill-erasing power. Everything in life should feel this good. Simple to use, a breeze to ride – the trustworthy Bosch drive system delivers impressive power in an effortlessly natural way. There’s a reason Bosch is the leading name in e-bike systems.",
      price: 2079,
      stock: 2,
      manufacturer: "Giant",
      img: "https://www.evanscycles.com/images/products/71162318_l.jpg",
    },
    {
      id: "bike-11",
      title: "Tesoro Neo X",
      description:
        "Free Yourself: Inside this sporty commuting e-bike lies the wild and rugged heart of an explorer. With huge range, robust components, and grippy mixed-surface tires, the Tesoro Neo X is built to get you to it all week, and away from it all on the weekend. Where it thrives: City streets and adventurous backroads What it’s built for: Commuting, touring, exploring",
      price: 5000,
      stock: 2,
      manufacturer: "Giant",
      img: "https://www.evanscycles.com/images/products/73150503_l.jpg",
    },
    {
      id: "bike-12",
      title: "Quick Disc 4",
      description:
        "Quick As You Like: A swift, sporty bike that’s perfect for getting a workout, city cruising or just getting out and feeling good. Where it thrives: In town, leisurely rides, on crowded streets What it’s built for: Agility, visibility, comfort",
      price: 750,
      stock: 12,
      manufacturer: "Bicyclette",
      img: "https://www.evanscycles.com/images/products/93038915_l.jpg",
    },
    {
      id: "bike-14",
      title: "System Six Hi-MOD Ultegra Di2",
      description:
        "The fastest UCI-legal bike in the world. More speed with less effort. Simple as that. KEY FEATURES: Ultra low drag Hi-MOD BallisTec carbon frameset / Integrated Cannondale App connectivity Ultegra Di2 electronic shifting / HollowGram crank HollowGram 64 SL KNOT carbon wheelset / KNOT SystemBar",
      price: 8500,
      stock: 1,
      manufacturer: "Bicyclette",
      img: "https://www.evanscycles.com/images/products/93060602_l.jpg",
    },
    {
      id: "bike-15",
      title: "Turbo Levo Comp Alloy",
      description:
        "The all-new Levo delivers the unbelievable power to ride more trails through an unequalled combination of ride quality, usable power, and ride anywhere range. It’s the distillation, application, and amplification of a 40-year obsession with creating the world’s best riding mountain bikes. Since its introduction, Levo has set the bar every other e-MTB aims for, and the new Levo raises that bar again.",
      price: 6750,
      stock: 0,
      manufacturer: "Redline",
      img: "https://www.evanscycles.com/images/products/71815108_l.jpg",
    },
  ]);

  return (
    <ctx.Provider
      value={{
        countCartItems,
        setCountCartItems,
        items,
        setItems,
        cart,
        setCart,
      }}
    >
      {children}
    </ctx.Provider>
  );
}
