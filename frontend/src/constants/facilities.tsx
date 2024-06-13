import { AiFillCar } from "react-icons/ai";
import {
	BiSolidDryer,
	BiSolidFirstAid,
	BiSolidFridge,
	BiSolidWasher,
	BiWifi
} from "react-icons/bi";
import { BsPersonWorkspace, BsSnow } from "react-icons/bs";
import {
	FaFireExtinguisher,
	FaKey,
	FaPumpSoap,
	FaShower,
	FaUmbrellaBeach
} from "react-icons/fa";
import { FaKitchenSet } from "react-icons/fa6";
import {
	GiBarbecue,
	GiCampfire,
	GiCctvCamera,
	GiHeatHaze,
	GiToaster,
} from "react-icons/gi";
import { MdBalcony, MdMicrowave, MdPets, MdYard } from "react-icons/md";
import {
	PiBathtubFill,
	PiCoatHangerFill,
	PiTelevisionFill,
} from "react-icons/pi";
import { TbIroning3 } from "react-icons/tb";

export const facilities = [
  {
    id: 1,
    name: "Bath tub",
    description: "A large container for holding water in which a person may bathe.",
    icon: <PiBathtubFill size={35} />,
  },
  {
    id: 2,
    name: "Personal care products",
    description: "Items commonly used in personal hygiene and for beautification.",
    icon: <FaPumpSoap size={35} />,
  },
  {
    id: 3,
    name: "Outdoor shower",
    description: "A place to rinse off outdoors, especially in hot weather or after swimming.",
    icon: <FaShower size={35} />,
  },
  {
    id: 4,
    name: "Washer",
    description: "A machine for washing clothes, bed linens, etc.",
    icon: <BiSolidWasher size={35} />,
  },
  {
    id: 5,
    name: "Dryer",
    description: "An appliance that removes moisture by heating or another process.",
    icon: <BiSolidDryer size={35} />,
  },
  {
    id: 6,
    name: "Hangers",
    description: "A shaped piece of wood, plastic, or metal with a hook at the top, typically used for hanging clothes in a wardrobe.",
    icon: <PiCoatHangerFill size={35} />,
  },
  {
    id: 7,
    name: "Iron",
    description: "A handheld device for removing wrinkles from fabric, using heat and weight.",
    icon: <TbIroning3 size={35} />,
  },
  {
    id: 8,
    name: "TV",
    description: "A device for receiving television signals and displaying them in visual form.",
    icon: <PiTelevisionFill size={35} />,
  },
  {
    id: 9,
    name: "Dedicated workspace",
    description: "A designated area with a desk or table for work-related activities.",
    icon: <BsPersonWorkspace size={35} />,
  },
  {
    id: 10,
    name: "Air Conditioning",
    description: "A system for controlling the humidity, ventilation, and temperature in a building or vehicle.",
    icon: <BsSnow size={35} />,
  },
  {
    id: 11,
    name: "Heating",
    description: "Equipment or devices used to provide heat, especially to a building.",
    icon: <GiHeatHaze size={35} />,
  },
  {
    id: 12,
    name: "Security cameras",
    description: "Cameras that provide surveillance for the property, enhancing security.",
    icon: <GiCctvCamera size={35} />,
  },
  {
    id: 13,
    name: "Fire extinguisher",
    description: "A portable device that discharges a jet of water, foam, gas, or other material to extinguish a fire.",
    icon: <FaFireExtinguisher size={35} />,
  },
  {
    id: 14,
    name: "First Aid",
    description: "Supplies and equipment provided for initial medical emergency treatment.",
    icon: <BiSolidFirstAid size={35} />,
  },
  {
    id: 15,
    name: "Wifi",
    description: "Wireless Internet access.",
    icon: <BiWifi size={35} />,
  },
  {
    id: 16,
    name: "Cooking set",
    description: "A complete set of pots, pans, and cooking utensils.",
    icon: <FaKitchenSet size={35} />,
  },
  {
    id: 17,
    name: "Refrigerator",
    description: "An appliance for keeping food and drinks cool.",
    icon: <BiSolidFridge size={35} />,
  },
  {
    id: 18,
    name: "Microwave",
    description: "An electric oven that heats and cooks food by exposing it to electromagnetic radiation.",
    icon: <MdMicrowave size={35} />,
  },
  {
    id: 19,
    name: "Stove",
    description: "An appliance used for cooking food.",
    icon: <GiToaster size={35} />,
  },
  {
    id: 20,
    name: "Barbecue grill",
    description: "A device for cooking food by applying heat directly from below.",
    icon: <GiBarbecue size={35} />,
  },
  {
    id: 21,
    name: "Outdoor dining area",
    description: "A designated outdoor area for eating meals.",
    icon: <FaUmbrellaBeach size={35} />,
  },
  {
    id: 22,
    name: "Private patio or Balcony",
    description: "An outdoor area that is used for dining, relaxing, or entertaining.",
    icon: <MdBalcony size={35} />,
  },
  {
    id: 23,
    name: "Camp fire",
    description: "A designated outdoor area for building fires, often used for cooking or warmth.",
    icon: <GiCampfire size={35} />,
  },
  {
    id: 24,
    name: "Garden",
    description: "A plot of ground where herbs, fruits, flowers, or vegetables are cultivated.",
    icon: <MdYard size={35} />,
  },
  {
    id: 25,
    name: "Free parking",
    description: "A designated area where vehicles can be parked for free.",
    icon: <AiFillCar size={35} />,
  },
  {
    id: 26,
    name: "Self check-in",
    description: "A feature that allows guests to check-in by themselves, often through a lockbox or smartlock.",
    icon: <FaKey size={35} />,
  },
  {
    id: 27,
    name: "Pet allowed",
    description: "The property allows guests to bring pets.",
    icon: <MdPets size={35} />,
  }
];
