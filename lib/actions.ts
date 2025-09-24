import Papa from "papaparse";
import fs from "fs";

export function getStats() {

    const file = fs.readFileSync("public/statsdatacountries.csv", "utf8");
    
    const results = Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.toLowerCase().replace(/\s+/g, '_'),
    });

    return results.data;
}