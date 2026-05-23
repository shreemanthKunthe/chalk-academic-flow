export type University = {
  id: string;
  name: string;
  shortName: string;
  city: string;
  state: string;
  established: number;
  usnPattern: string; // sample USN format
};

export const mockUniversities: University[] = [
  {
    id: "vtu",
    name: "Visvesvaraya Technological University",
    shortName: "VTU",
    city: "Belagavi",
    state: "Karnataka",
    established: 1998,
    usnPattern: "1XX21CS001",
  },
  {
    id: "bmu",
    name: "Bangalore University",
    shortName: "BU",
    city: "Bengaluru",
    state: "Karnataka",
    established: 1964,
    usnPattern: "BU21CS001",
  },
  {
    id: "anna",
    name: "Anna University",
    shortName: "AU",
    city: "Chennai",
    state: "Tamil Nadu",
    established: 1978,
    usnPattern: "AU21CSE001",
  },
  {
    id: "ipu",
    name: "Guru Gobind Singh Indraprastha University",
    shortName: "GGSIPU",
    city: "New Delhi",
    state: "Delhi",
    established: 1998,
    usnPattern: "IPU21IT001",
  },
  {
    id: "mu",
    name: "University of Mumbai",
    shortName: "MU",
    city: "Mumbai",
    state: "Maharashtra",
    established: 1857,
    usnPattern: "MU21CS001",
  },
  {
    id: "pu",
    name: "Savitribai Phule Pune University",
    shortName: "SPPU",
    city: "Pune",
    state: "Maharashtra",
    established: 1949,
    usnPattern: "PU21CS001",
  },
  {
    id: "ju",
    name: "Jadavpur University",
    shortName: "JU",
    city: "Kolkata",
    state: "West Bengal",
    established: 1955,
    usnPattern: "JU21CSE001",
  },
  {
    id: "ou",
    name: "Osmania University",
    shortName: "OU",
    city: "Hyderabad",
    state: "Telangana",
    established: 1918,
    usnPattern: "OU21CS001",
  },
  {
    id: "cusat",
    name: "Cochin University of Science and Technology",
    shortName: "CUSAT",
    city: "Kochi",
    state: "Kerala",
    established: 1971,
    usnPattern: "CUSAT21CS01",
  },
  {
    id: "du",
    name: "University of Delhi",
    shortName: "DU",
    city: "New Delhi",
    state: "Delhi",
    established: 1922,
    usnPattern: "DU21CS001",
  },
];
