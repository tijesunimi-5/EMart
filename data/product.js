const product = [
  {
    id: 1,
    image: "gadgets.jpg",
    title: "gadgets",
    description: "",
    productType: "bg",
    rating: 4.5,
  },
  {
    id: 2,
    image: "/gad.jpg",
    title: "gad",
    description: "",
    productType: "bg",
    rating: 4.5,
  },
  {
    id: 3,
    image: "/phone.jpg",
    title: "Iphone X",
    description:
      "Iphone X, available in carton, brand new, earpod inclusive with purchase, 2years gurantee, fast charger inclusive, USB cord inclusive",
    price: "N500k",
    productType: "phone IPhone",
    rating: 4.5,
  },
  {
    id: 4,
    image: "/phoneii.jpg",
    title: "Phone",
    description:
      "Phone, available in carton, brand new, 2years gurantee, fast charger inclusive, USB cord inclusive",
    price: "N300k",
    productType: "phone Phone",
    rating: 4.5,
  },
  {
    id: 5,
    image: "/phoneiii.jpg",
    title: "Phone",
    description:
      "Phone, available in carton, brand new, 2years gurantee, fast charger inclusive, USB cord inclusive",
    price: "N250k",
    productType: "phone Phone",
    rating: 4.5,
  },
  {
    id: 6,
    image: "/ps5.jpg",
    title: "Play station game console",
    description:
      "Neat PS5, brand new, Game pad available, game disc available(2 discs)...",
    price: "N1.0M",
    productType: "ps5 game gameconsole",
    rating: 4.5,
  },
  {
    id: 7,
    image: "/gamepad.jpg",
    title: "Play station game console",
    description:
      "Neat game pad for ps of any type, brand new, wireless, connection smooth, duration - last long...",
    price: "N1.0M",
    productType: "ps5 game gameconsole",
    rating: 4.5,
  },
];


export function GetAllProduct() {
  return product;
}