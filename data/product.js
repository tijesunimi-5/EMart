const product = [
  {
    id: "1",
    image: "/phone.jpg",
    title: "Iphone X",
    description:
      "Iphone X, available in carton, brand new, earpod inclusive with purchase, 2years gurantee, fast charger inclusive, USB cord inclusive",
    price: "500k",
    productType: "phone iphone iphonex",
    rating: 4.5,
    quantity: 1,
  },
  {
    id: "2",
    image: "/phoneii.jpg",
    title: "Phone",
    description:
      "Phone, available in carton, brand new, 2years gurantee, fast charger inclusive, USB cord inclusive",
    price: "300k",
    productType: "phone, Phone",
    rating: 4.5,
    quantity: 1,
  },
  {
    id: "3",
    image: "/phoneiii.jpg",
    title: "Phone",
    description:
      "Phone, available in carton, brand new, 2years gurantee, fast charger inclusive, USB cord inclusive",
    price: "250k",
    productType: "phone Phone",
    rating: 4.5,
    quantity: 1,
  },
  {
    id: "4",
    image: "/ps5.jpg",
    title: "Play station ",
    description:
      "Neat PS5, brand new, Game pad available, game disc available(2 discs)...",
    price: "1.0M",
    productType: "ps5 game gameconsole",
    rating: 4.5,
    quantity: 1,
  },
  {
    id: "5",
    image: "/gamepad.jpg",
    title: "Play station ",
    description:
      "Neat game pad for ps of any type, brand new, wireless, connection smooth, duration - last long...",
    price: "1.0M",
    productType: "ps5 game gameconsole",
    rating: 4.5,
    quantity: 1,
  },
  {
    id: "6",
    image: "/gamepadii.jpg",
    title: "Play station ",
    description:
      "Neat game pad for ps of any type, brand new, wireless, connection smooth, duration - last long...",
    price: "900k",
    productType: "ps5 game console",
    rating: 4.5,
    quantity: 1,
  },
  {
    id: "7",
    image: "/gamepadiii.jpg",
    title: "Play station ",
    description:
      "Neat game pad for ps of any type, brand new, wireless, connection smooth, duration - last long...",
    price: "850kM",
    productType: "ps5 game gameconsole",
    rating: 4.5,
    quantity: 1,
  },
  {
    id: "8",
    image: "/headPhone.jpg",
    title: "headPhone",
    description:
      "Neat head phone, quality sound, good bass, duration - last long...",
    price: "10k",
    productType: "headset earpiece headphone",
    rating: 4.5,
    quantity: 1,
  },
  {
    id: "9",
    image: "/laptop.jpg",
    title: "Laptop",
    description:
      "Neat Acer, 8gb 500gb, webcam available, duration - last long...",
    price: "1.2M",
    productType: "pc laptop acer",
    rating: 4.5,
    quantity: 1,
  },
  {
    id: "10",
    image: "/headPhoneii.jpg",
    title: "headPhone",
    description:
      "Neat headphone, wireless, connection smooth, duration - last long...",
    price: "10k",
    productType: "headset earpiece earphone headphone",
    rating: 4.5,
    quantity: 1,
  },
];

export function getAllProducts() {
  return product;
}

export function searchProductType(searchTerm) {
  const filteredProduct = product.filter((item) => {
    return item.productType
      .split(" ")
      .some((type) => type.toLowerCase().includes(searchTerm.toLowerCase())); //this check if the words match......
  });

  if (filteredProduct.length === 0) {
    throw new Error("Product not available");
  } else {
    return filteredProduct;
  }
}
