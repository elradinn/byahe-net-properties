// import countries from "world-countries";

// const formattedCountries = countries.map(c => ({
//     value: c.cca2,
//     label: c.name.common,
//     flag: c.flag,
//     latlng: c.latlng,
//     region: c.region
// }));

// const useCountries = () => {
//     const getAll = () => formattedCountries;
//     const getByValue = (val: string) => formattedCountries.find(country => country.value === val);

//     return {
//         getAll,
//         getByValue
//     }
// }

// export default useCountries;

import countries from "world-countries";
import { philippines } from "@/app/data/philippines";

const formattedCountries = countries.map((c) => ({
    value: c.cca2,
    label: c.name.common,
    flag: c.flag,
    latlng: c.latlng,
    region: c.region,
}));

const formattedPhilippines = philippines.map((p) => {
    let latlng = [0, 0]; // Default values if p.LatLng is undefined
    if (p.LatLng) {
        const [latStr, lngStr] = p.LatLng.split(";").map((coord) =>
            coord.trim()
        );
        const lat = parseFloat(latStr);
        const lng = parseFloat(lngStr);
        latlng = [Number.isNaN(lat) ? 0 : lat, Number.isNaN(lng) ? 0 : lng];
    }
    return {
        value: p.Province,
        label: p.Province,
        flag: "", // Default string value for flag
        latlng,
        region: p.City || "", // Default string value for region if it's undefined
    };
});

const useCountries = () => {
    const getAll = () => formattedPhilippines;
    const getByValue = (val: string) =>
        formattedPhilippines.find((country) => country.value === val);

    return {
        getAll,
        getByValue,
    };
};

export default useCountries;
