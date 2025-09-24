'use client'
import dynamic from 'next/dynamic'
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false })

export function Histogram() {
    const ranges = ["64–65.9", "66–67.9", "68–69.9", "70–71.9", "72–73.9"];
    const frequencies = [2, 7, 5, 16, 5];
    
    return (
        <Plot
            data={[
                {
                    type: "bar", // Use "bar" for pre-binned data
                    x: ranges,   // Ranges on x-axis
                    y: frequencies, // Frequencies on y-axis
                    marker: { 
                        color: "#10b981",
                        line: { color: "#065f46", width: 1 }
                    },
                    hovertemplate: "<b>%{x}</b><br>Frequency: %{y}<extra></extra>",
                },
            ]}
            layout={{
                title: "Life Expectancy Frequency Distribution",
                xaxis: { 
                    title: "Life Expectancy Range (years)",
                    tickangle: -45
                },
                yaxis: { 
                    title: "Frequency"
                },
                bargap: 0.1, // Small gap between bars to make it look like a histogram
            }}
            style={{ width: "100%", height: "400px" }}
        />
    )
}
