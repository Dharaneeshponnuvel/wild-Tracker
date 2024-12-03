import React, { useState } from "react";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";

const animalLocations = [
    { name: "Bengal Tiger", coordinates: { lat: 21.2945, lng: 79.4082 } }, // Tadoba Andhari Tiger Reserve
    { name: "Asian Elephant", coordinates: { lat: 11.5860, lng: 77.8809 } }, // Mudumalai National Park
    { name: "Indian Rhino", coordinates: { lat: 26.0950, lng: 93.3656 } }, // Kaziranga National Park
    { name: "Snow Leopard", coordinates: { lat: 32.6512, lng: 78.7320 } }, // Hemis National Park
    { name: "Great Indian Bustard", coordinates: { lat: 26.0960, lng: 70.7211 } }, // Desert National Park
    { name: "Lion-tailed Macaque", coordinates: { lat: 10.3055, lng: 76.4942 } }, // Silent Valley National Park
    { name: "Indian Pangolin", coordinates: { lat: 20.7605, lng: 79.4661 } }, // Pench National Park
    { name: "Red Panda", coordinates: { lat: 27.0381, lng: 88.2643 } }, // Singalila National Park
    { name: "Ganges River Dolphin", coordinates: { lat: 25.5941, lng: 85.1376 } }, // Vikramshila Dolphin Sanctuary
    { name: "Indian Star Tortoise", coordinates: { lat: 13.0827, lng: 80.2707 } }, // Chennai Region
    { name: "Indian Peafowl", coordinates: { lat: 25.0000, lng: 73.6000 } }, // Kumbhalgarh Wildlife Sanctuary
    { name: "Malabar Giant Squirrel", coordinates: { lat: 11.2752, lng: 76.3545 } }, // Wayanad Wildlife Sanctuary
    { name: "Blackbuck", coordinates: { lat: 21.8835, lng: 70.9070 } }, // Velavadar Blackbuck National Park
    { name: "Olive Ridley Turtle", coordinates: { lat: 19.8157, lng: 85.8310 } }, // Gahirmatha Marine Sanctuary
    { name: "Sarus Crane", coordinates: { lat: 27.2144, lng: 80.5914 } }, // Dudhwa National Park
    { name: "Indian Cobra", coordinates: { lat: 23.3441, lng: 85.3096 } }, // Ranchi Region
    { name: "Indian Wild Dog (Dhole)", coordinates: { lat: 12.3346, lng: 77.3443 } }, // Bandipur National Park
    { name: "Indian Bison (Gaur)", coordinates: { lat: 14.6356, lng: 74.4458 } }, // Dandeli Wildlife Sanctuary
    { name: "One-horned Chameleon", coordinates: { lat: 26.7460, lng: 88.3934 } }, // Mahananda Wildlife Sanctuary
    { name: "King Cobra", coordinates: { lat: 12.8452, lng: 75.2479 } }, // Agumbe Rainforest
    { name: "Nilgiri Tahr", coordinates: { lat: 10.2102, lng: 77.3506 } }, // Eravikulam National Park
    { name: "Himalayan Monal", coordinates: { lat: 31.1050, lng: 77.2674 } }, // Great Himalayan National Park
    { name: "Indian Leopard", coordinates: { lat: 24.4286, lng: 72.5727 } }, // Jawai Leopard Conservation Reserve
    { name: "Indian Rock Python", coordinates: { lat: 22.7536, lng: 86.2029 } }, // Dalma Wildlife Sanctuary
    { name: "Sloth Bear", coordinates: { lat: 20.2996, lng: 85.8182 } }, // Simlipal National Park
    { name: "Saltwater Crocodile", coordinates: { lat: 20.4710, lng: 86.8074 } }, // Bhitarkanika National Park
    { name: "Golden Langur", coordinates: { lat: 26.7126, lng: 91.8306 } }, // Manas National Park
    { name: "Indian Flying Fox", coordinates: { lat: 16.7544, lng: 81.6825 } }, // Godavari River Region
    { name: "Indian Softshell Turtle", coordinates: { lat: 24.2156, lng: 77.0127 } }, // National Chambal Sanctuary
    { name: "Indian Grey Hornbill", coordinates: { lat: 19.0760, lng: 72.8777 } }, // Mumbai Region
    { name: "Black-necked Crane", coordinates: { lat: 27.5700, lng: 91.4892 } }, // Phobjikha Valley
    { name: "Indian Wild Ass", coordinates: { lat: 23.5247, lng: 71.7979 } }, // Little Rann of Kutch
    { name: "Chinkara", coordinates: { lat: 26.8976, lng: 71.8918 } }, // Desert Region
    { name: "Indian Palm Civet", coordinates: { lat: 12.9716, lng: 77.5946 } }, // Bangalore Region
    { name: "Jerdon's Courser", coordinates: { lat: 15.0898, lng: 78.5733 } }, // Sri Lankamalleswara Wildlife Sanctuary
    { name: "Indian Pangolin", coordinates: { lat: 15.2993, lng: 74.1240 } }, // Goa Region
    { name: "Indian Wolf", coordinates: { lat: 18.9107, lng: 76.1303 } }, // Deccan Plateau
    { name: "Red Junglefowl", coordinates: { lat: 22.5726, lng: 88.3639 } }, // Sundarbans
    { name: "Indian Swamp Deer (Barasingha)", coordinates: { lat: 22.4211, lng: 80.6115 } }, // Kanha National Park
    { name: "Indian Hare", coordinates: { lat: 17.3850, lng: 78.4867 } }, // Hyderabad Region
    { name: "Indian Crested Porcupine", coordinates: { lat: 30.0668, lng: 79.0193 } }, // Uttarakhand Region
    { name: "Indian Eagle Owl", coordinates: { lat: 19.9975, lng: 73.7898 } }, // Nashik Region
    { name: "Indian Starling (Myna)", coordinates: { lat: 28.7041, lng: 77.1025 } }, // Delhi Region
    { name: "Hoolock Gibbon", coordinates: { lat: 27.3333, lng: 95.3333 } }, // Dibang Valley
    { name: "Brown Fish Owl", coordinates: { lat: 19.7515, lng: 75.7139 } }, // Maharashtra Region
    { name: "Nicobar Pigeon", coordinates: { lat: 7.1800, lng: 93.6300 } }, // Nicobar Islands
    { name: "Andaman Wild Pig", coordinates: { lat: 12.7400, lng: 92.7436 } }, // Andaman Islands
    { name: "Indian Bluebull (Nilgai)", coordinates: { lat: 28.5849, lng: 77.3158 } }, // Sultanpur National Park
    { name: "Indian Pangolin", coordinates: { lat: 8.5069, lng: 76.9561 } }, // Neyyar Wildlife Sanctuary
    { name: "African Elephant", coordinates: { lat: -2.3333, lng: 34.8333 } }, // Serengeti National Park, Tanzania
    { name: "Siberian Tiger", coordinates: { lat: 46.4850, lng: 134.1628 } }, // Sikhote-Alin Biosphere Reserve, Russia
    { name: "Giant Panda", coordinates: { lat: 30.8938, lng: 102.2652 } }, // Wolong National Nature Reserve, China
    { name: "Polar Bear", coordinates: { lat: 78.2232, lng: 15.6469 } }, // Svalbard, Norway
    { name: "Bald Eagle", coordinates: { lat: 58.3019, lng: -134.4197 } }, // Tongass National Forest, USA
    { name: "Koala", coordinates: { lat: -27.4698, lng: 153.0251 } }, // Brisbane Region, Australia
    { name: "Kangaroo", coordinates: { lat: -25.3444, lng: 131.0369 } }, // Uluru, Australia
    { name: "Platypus", coordinates: { lat: -42.8794, lng: 147.3294 } }, // Tasmania, Australia
    { name: "Emperor Penguin", coordinates: { lat: -75.2500, lng: -0.0714 } }, // Antarctica
    { name: "Lion", coordinates: { lat: -1.9445, lng: 37.0734 } }, // Maasai Mara, Kenya
    { name: "Cheetah", coordinates: { lat: -19.5937, lng: 23.6100 } }, // Okavango Delta, Botswana
    { name: "Mountain Gorilla", coordinates: { lat: -1.4000, lng: 29.6500 } }, // Virunga Mountains, Rwanda
    { name: "Hippopotamus", coordinates: { lat: -14.4521, lng: 34.0169 } }, // Liwonde National Park, Malawi
    { name: "Zebra", coordinates: { lat: -2.3205, lng: 36.8999 } }, // Ngorongoro Crater, Tanzania
    { name: "Blue Whale", coordinates: { lat: 34.0522, lng: -118.2437 } }, // Pacific Ocean, near Los Angeles, USA
    { name: "Orca", coordinates: { lat: 49.2827, lng: -123.1207 } }, // Vancouver Island, Canada
    { name: "Grizzly Bear", coordinates: { lat: 58.3057, lng: -134.4102 } }, // Katmai National Park, USA
    { name: "Brown Bear", coordinates: { lat: 60.1695, lng: 24.9354 } }, // Finnish Lapland, Finland
    { name: "European Bison", coordinates: { lat: 52.7500, lng: 23.5000 } }, // Białowieża Forest, Poland
    { name: "Arctic Fox", coordinates: { lat: 64.1355, lng: -21.8954 } }, // Iceland
    { name: "Snowy Owl", coordinates: { lat: 66.1605, lng: -153.3691 } }, // Arctic Alaska, USA
    { name: "Moose", coordinates: { lat: 61.3025, lng: -149.0976 } }, // Anchorage, Alaska, USA
    { name: "Grey Wolf", coordinates: { lat: 45.8326, lng: -110.7042 } }, // Yellowstone National Park, USA
    { name: "Wolverine", coordinates: { lat: 67.4668, lng: -150.9664 } }, // Brooks Range, Alaska, USA
    { name: "Lynx", coordinates: { lat: 47.5655, lng: 10.6765 } }, // Bavarian Forest National Park, Germany
    { name: "Red Fox", coordinates: { lat: 51.5072, lng: -0.1276 } }, // London, England
    { name: "Golden Eagle", coordinates: { lat: 57.4778, lng: -4.2247 } }, // Scottish Highlands, Scotland
    { name: "Puffin", coordinates: { lat: 64.9631, lng: -19.0208 } }, // Iceland
    { name: "Atlantic Salmon", coordinates: { lat: 63.3333, lng: -20.9000 } }, // Greenland
    { name: "Booby Bird", coordinates: { lat: -0.9538, lng: -90.9656 } }, // Galápagos Islands, Ecuador
    { name: "Marine Iguana", coordinates: { lat: -0.7403, lng: -90.3120 } }, // Galápagos Islands, Ecuador
    { name: "Harpy Eagle", coordinates: { lat: -8.8742, lng: -77.6789 } }, // Peruvian Amazon
    { name: "Jaguar", coordinates: { lat: -3.4653, lng: -62.2159 } }, // Amazon Rainforest, Brazil
    { name: "Anaconda", coordinates: { lat: -4.3816, lng: -61.1305 } }, // Amazon Rainforest, Venezuela
    { name: "Sloth", coordinates: { lat: 9.7489, lng: -83.7534 } }, // Monteverde Cloud Forest, Costa Rica
    { name: "Scarlet Macaw", coordinates: { lat: 16.2326, lng: -89.8988 } }, // Tikal National Park, Guatemala
    { name: "Howler Monkey", coordinates: { lat: 15.7835, lng: -90.2308 } }, // Guatemala
    { name: "Puma", coordinates: { lat: -22.9707, lng: -43.1825 } }, // Atlantic Forest, Brazil
    { name: "Capybara", coordinates: { lat: -15.8015, lng: -47.9138 } }, // Pantanal, Brazil
    { name: "Maned Wolf", coordinates: { lat: -19.9333, lng: -43.9333 } }, // Cerrado, Brazil
    { name: "Giant Anteater", coordinates: { lat: -14.2350, lng: -51.9253 } }, // Brazil
    { name: "Andean Condor", coordinates: { lat: -24.3852, lng: -66.7898 } }, // Andes Mountains, Argentina
    { name: "Magellanic Penguin", coordinates: { lat: -51.7312, lng: -59.0916 } }, // Falkland Islands
    { name: "Llama", coordinates: { lat: -16.4990, lng: -68.1193 } }, // La Paz, Bolivia
    { name: "Alpaca", coordinates: { lat: -13.5320, lng: -71.9675 } }, // Cusco, Peru
    { name: "Komodo Dragon", coordinates: { lat: -8.5500, lng: 119.4416 } }, // Komodo Island, Indonesia
    { name: "Proboscis Monkey", coordinates: { lat: 1.5422, lng: 110.3493 } }, // Borneo, Malaysia
    { name: "Orangutan", coordinates: { lat: 2.3930, lng: 112.8286 } }, // Tanjung Puting National Park, Indonesia
    { name: "Clouded Leopard", coordinates: { lat: 4.2105, lng: 101.9758 } }, // Malaysia
    { name: "Cassowary", coordinates: { lat: -16.9186, lng: 145.7781 } }, // Queensland, Australia
    { name: "Dingo", coordinates: { lat: -23.7002, lng: 133.8807 } }, // Outback, Australia
    { name: "Tasmanian Devil", coordinates: { lat: -41.4545, lng: 145.9707 } }, // Tasmania, Australia
    { name: "Wombat", coordinates: { lat: -37.8136, lng: 144.9631 } }, // Victoria, Australia
    { name: "Echidna", coordinates: { lat: -33.8688, lng: 151.2093 } }, // Sydney Region, Australia
    { name: "Frigatebird", coordinates: { lat: -8.7228, lng: -137.1543 } }, // Easter Island, Chile
    { name: "Beluga Whale", coordinates: { lat: 65.0000, lng: -168.0000 } }, // Arctic Ocean
    { name: "Narwhal", coordinates: { lat: 70.2990, lng: -51.7253 } }, // Greenland Sea
    { name: "Sea Otter", coordinates: { lat: 36.7783, lng: -119.4179 } }, // California Coast, USA
    { name: "Humpback Whale", coordinates: { lat: 19.8968, lng: -155.5828 } }, // Hawaii, USA
    { name: "Lemur", coordinates: { lat: -18.7669, lng: 46.8691 } }, // Madagascar
    { name: "Fossa", coordinates: { lat: -20.0000, lng: 47.0000 } }, // Madagascar
    { name: "Aye-Aye", coordinates: { lat: -14.8972, lng: 48.3317 } }, // Madagascar
    { name: "Ring-tailed Lemur", coordinates: { lat: -22.0000, lng: 44.0000 } }, // Madagascar
    { name: "Galápagos Tortoise", coordinates: { lat: -0.9538, lng: -90.9656 } }, // Galápagos Islands
    { name: "Blue-footed Booby", coordinates: { lat: -1.3833, lng: -91.2833 } }, // Galápagos Islands
    { name: "Red-footed Booby", coordinates: { lat: 0.3167, lng: -89.9500 } }, // Galápagos Islands
    { name: "Yellow-eyed Penguin", coordinates: { lat: -45.8742, lng: 170.5036 } }, // Otago Peninsula, New Zealand
    { name: "Kiwi", coordinates: { lat: -40.9006, lng: 174.8860 } }, // New Zealand
    { name: "African Wild Dog", coordinates: { lat: -19.0000, lng: 23.5000 } }, // Moremi Game Reserve, Botswana
    { name: "Bongo", coordinates: { lat: 0.5587, lng: 35.2836 } }, // Mount Kenya National Park, Kenya
    { name: "Okapi", coordinates: { lat: 1.4197, lng: 28.5134 } }, // Ituri Forest, Congo
    { name: "Serval", coordinates: { lat: -15.9000, lng: 35.5000 } }, // Majete Wildlife Reserve, Malawi
    { name: "Gerenuk", coordinates: { lat: 1.2921, lng: 36.8219 } }, // Nairobi National Park, Kenya
    { name: "Aardvark", coordinates: { lat: -22.5564, lng: 17.0832 } }, // Etosha National Park, Namibia
    { name: "Honey Badger", coordinates: { lat: -24.8138, lng: 26.5481 } }, // Madikwe Game Reserve, South Africa
    { name: "Meerkat", coordinates: { lat: -26.7268, lng: 26.6959 } }, // Kalahari Desert, South Africa
    { name: "Thomson's Gazelle", coordinates: { lat: -1.2921, lng: 36.8219 } }, // Maasai Mara, Kenya
    { name: "Bush Baby", coordinates: { lat: -13.2543, lng: 34.3015 } }, // Nyika National Park, Malawi
    { name: "Mandrill", coordinates: { lat: -1.8477, lng: 11.4404 } }, // Lope National Park, Gabon
    { name: "Kudu", coordinates: { lat: -19.2299, lng: 23.1047 } }, // Chobe National Park, Botswana
    { name: "Impala", coordinates: { lat: -23.7333, lng: 31.5333 } }, // Kruger National Park, South Africa
    { name: "Leopard Seal", coordinates: { lat: -66.3947, lng: 110.5194 } }, // Antarctica
    { name: "Rockhopper Penguin", coordinates: { lat: -52.1500, lng: -59.0000 } }, // Falkland Islands
    { name: "Chinstrap Penguin", coordinates: { lat: -63.0000, lng: -60.0000 } }, // Antarctic Peninsula
    { name: "Walrus", coordinates: { lat: 78.2232, lng: 15.6469 } }, // Svalbard, Norway
    { name: "Arctic Hare", coordinates: { lat: 66.9460, lng: -51.1164 } }, // Greenland
    { name: "Musk Ox", coordinates: { lat: 74.0000, lng: -95.0000 } }, // Canadian Arctic
    { name: "Caribou", coordinates: { lat: 63.4167, lng: -114.0000 } }, // Northwest Territories, Canada
    { name: "Prairie Dog", coordinates: { lat: 38.8339, lng: -104.8214 } }, // Great Plains, USA
    { name: "Mountain Lion", coordinates: { lat: 37.8651, lng: -119.5383 } }, // Yosemite National Park, USA
    { name: "Bobcat", coordinates: { lat: 33.4484, lng: -112.0740 } }, // Arizona, USA
    { name: "Red-tailed Hawk", coordinates: { lat: 39.7392, lng: -104.9903 } }, // Colorado, USA
    { name: "American Bison", coordinates: { lat: 44.4280, lng: -110.5885 } }, // Yellowstone National Park, USA
    { name: "Raccoon", coordinates: { lat: 37.7749, lng: -122.4194 } }, // California, USA
    { name: "Coyote", coordinates: { lat: 35.1983, lng: -111.6513 } }, // Arizona, USA
    { name: "Nine-banded Armadillo", coordinates: { lat: 30.2672, lng: -97.7431 } }, // Texas, USA
    { name: "Ocelot", coordinates: { lat: 26.5629, lng: -98.2370 } }, // Texas, USA
    { name: "Peregrine Falcon", coordinates: { lat: 51.1657, lng: 10.4515 } }, // Germany
    { name: "European Hedgehog", coordinates: { lat: 48.8566, lng: 2.3522 } }, // France
    { name: "Badger", coordinates: { lat: 54.3781, lng: -2.9012 } }, // England
    { name: "Chamois", coordinates: { lat: 46.8182, lng: 8.2275 } }, // Swiss Alps, Switzerland
    { name: "European Otter", coordinates: { lat: 53.3498, lng: -6.2603 } }, // Ireland
    { name: "Bearded Vulture", coordinates: { lat: 41.3851, lng: 2.1734 } }, // Pyrenees, Spain
    { name: "Ibex", coordinates: { lat: 44.5588, lng: 7.4003 } }, // Italian Alps, Italy
    { name: "European Wildcat", coordinates: { lat: 48.2082, lng: 16.3738 } }, // Austria
    { name: "White-tailed Deer", coordinates: { lat: 44.3148, lng: -85.6024 } }, // Michigan, USA
    { name: "Barbary Ape", coordinates: { lat: 36.1408, lng: -5.3536 } }, // Gibraltar
    { name: "Corsican Mouflon", coordinates: { lat: 42.0396, lng: 9.0129 } }, // Corsica, France
    { name: "Galápagos Sea Lion", coordinates: { lat: -0.9538, lng: -90.9656 } }, // Galápagos Islands, Ecuador
    { name: "Pygmy Marmoset", coordinates: { lat: -1.5679, lng: -73.6082 } }, // Amazon Rainforest, Peru
    { name: "Green Anaconda", coordinates: { lat: -4.5812, lng: -60.1446 } }, // Amazon Rainforest, Colombia
    { name: "Macaw", coordinates: { lat: -3.4653, lng: -62.2159 } }, // Amazon Rainforest, Brazil
    { name: "Tamarin Monkey", coordinates: { lat: -2.1600, lng: -54.7333 } }, // Amazon Rainforest, Brazil
    { name: "Capuchin Monkey", coordinates: { lat: 10.4510, lng: -84.0884 } }, // Monteverde, Costa Rica
    { name: "Spectacled Bear", coordinates: { lat: -13.5339, lng: -72.7690 } }, // Machu Picchu, Peru
    { name: "Marbled Cat", coordinates: { lat: 4.6333, lng: 115.7500 } }, // Borneo, Malaysia
    { name: "Tree Kangaroo", coordinates: { lat: -5.4596, lng: 145.7967 } }, // Papua New Guinea
    { name: "Cuscus", coordinates: { lat: -6.1745, lng: 106.8227 } }, // Indonesia
    { name: "Sulphur-crested Cockatoo", coordinates: { lat: -33.8688, lng: 151.2093 } }, // Sydney, Australia
    { name: "Green Sea Turtle", coordinates: { lat: 21.3069, lng: -157.8583 } }, // Hawaii, USA
    { name: "Loggerhead Turtle", coordinates: { lat: 27.6648, lng: -81.5158 } }, // Florida, USA
    { name: "Leatherback Turtle", coordinates: { lat: 13.9094, lng: -60.9789 } }, // Saint Lucia
    { name: "Nile Crocodile", coordinates: { lat: -16.0979, lng: 35.5336 } }, // Shire River, Malawi
    { name: "Gila Monster", coordinates: { lat: 33.4484, lng: -112.0740 } }, // Arizona, USA
    { name: "Tufted Puffin", coordinates: { lat: 58.3019, lng: -134.4197 } }, // Alaska, USA
    { name: "Giant Clam", coordinates: { lat: -9.7796, lng: 160.6982 } }, // Solomon Islands
    { name: "Dugong", coordinates: { lat: -12.4634, lng: 130.8456 } }, // Darwin, Australia
    { name: "Leaf-tailed Gecko", coordinates: { lat: -18.7669, lng: 46.8691 } }, // Madagascar
];


const containerStyle = {
    width: "100vw",
    height: "100vh",
};

const center = {
    lat: 20.5937, // Center of India
    lng: 78.9629,
};

const App = () => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyDxQvBDqOWE0wLyB8Ml4T0ii3Z9b49CttY", // Replace with your actual API key
    });

    const [selectedAnimal, setSelectedAnimal] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [mapCenter, setMapCenter] = useState(center);

    const handleSearch = () => {
        const foundAnimal = animalLocations.find(
            (animal) => animal.name.toLowerCase() === searchQuery.toLowerCase()
        );

        if (foundAnimal) {
            setMapCenter(foundAnimal.coordinates);
            setSelectedAnimal(foundAnimal);
        } else {
            alert("Animal not found. Try a different name.");
        }
    };

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div className="app">
            <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={6}>
                {animalLocations.map((animal, index) => (
                    <Marker
                        key={index}
                        position={animal.coordinates}
                        onClick={() => setSelectedAnimal(animal)}
                    />
                ))}
                {selectedAnimal && (
                    <InfoWindow
                        position={selectedAnimal.coordinates}
                        onCloseClick={() => setSelectedAnimal(null)}
                    >
                        <div>
                            <h2>{selectedAnimal.name}</h2>
                            <p>Coordinates: {selectedAnimal.coordinates.lat}, {selectedAnimal.coordinates.lng}</p>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Search for an animal..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
        </div>
    );
};

export default App;
