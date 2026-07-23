export const mockPenguins = [
  {
    id: 1,
    name: "Tux",
    gender: "MALE",
    species: "Emperor",
    habitat_zone: "Zone A - Antarctic Ice",
    status: "HEALTHY",
    image_url: "https://images.unsplash.com/photo-1598439210625-5067c578f3f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    colors: ["Black", "White", "Yellow"],
    ages: ["Adult"]
  },
  {
    id: 2,
    name: "Pingu",
    gender: "MALE",
    species: "Adélie",
    habitat_zone: "Zone B - Rocky Shores",
    status: "HEALTHY",
    image_url: "https://images.unsplash.com/photo-1551986782-d0169b3f8fa7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    colors: ["Black", "White"],
    ages: ["Juvenile"]
  },
  {
    id: 3,
    name: "Mumble",
    gender: "MALE",
    species: "Emperor",
    habitat_zone: "Zone A - Antarctic Ice",
    status: "UNDER_CARE",
    image_url: "https://images.unsplash.com/photo-1588667635607-b67f62e60058?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    colors: ["Black", "White", "Yellow"],
    ages: ["Adult"]
  },
  {
    id: 4,
    name: "Penny",
    gender: "FEMALE",
    species: "Gentoo",
    habitat_zone: "Zone C - Pebbles Beach",
    status: "HEALTHY",
    image_url: "https://images.unsplash.com/photo-1610486001099-2a912bbbc5df?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    colors: ["Black", "White", "Orange"],
    ages: ["Adult"]
  },
  {
    id: 5,
    name: "Skipper",
    gender: "MALE",
    species: "Chinstrap",
    habitat_zone: "Zone B - Rocky Shores",
    status: "HEALTHY",
    image_url: "https://images.unsplash.com/photo-1522867018306-039c09c914b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    colors: ["Black", "White"],
    ages: ["Adult"]
  },
  {
    id: 6,
    name: "Baby Fluff",
    gender: "UNKNOWN",
    species: "Emperor",
    habitat_zone: "Nursery",
    status: "HEALTHY",
    image_url: "https://images.unsplash.com/photo-1563720760453-e380eaf7bf1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    colors: ["Grey", "White"],
    ages: ["Chick"]
  }
];

export const filterOptions = {
  genders: ["MALE", "FEMALE", "UNKNOWN"],
  species: ["Emperor", "King", "Adélie", "Chinstrap", "Gentoo", "Magellanic", "African", "Fairy/Little Blue"],
  statuses: ["HEALTHY", "SICK", "UNDER_CARE", "DECEASED", "RELEASED", "TRANSFERRED"],
  ages: ["Chick", "Juvenile", "Adult"]
};
