import { getStats } from "@/lib/actions";
import { focusCountriesData } from "@/lib/data";
import Image from "next/image";
import { ChartSection } from "@/components/chart-section";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function Home() {
  const stats = getStats();

  // Fix the data mapping to match what the chart expects
  // const hale60mfData = stats.map((stat: any) => {
  //   return {
  //     country: stat.country,
  //     value: Number(stat.hale60mf) // Change from 'hale60mf' to 'value'
  //   }
  // });

  // const owmfData = stats.map((stat: any) => {
  //   return {
  //     country: stat.country,
  //     value: Number(stat.owmf) // Change from 'owmf' to 'value'
  //   }
  // });

  // const alcmfData = stats.map((stat: any) => {
  //   return {
  //     country: stat.country,
  //     value: Number(stat.alcmf)
  //   }
  // });

  // const csectData = stats.map((stat: any) => {
  //   return {
  //     country: stat.country,
  //     value: Number(stat.csect)
  //   }
  // });

  // const trdeathData = stats.map((stat: any) => {
  //   return {
  //     country: stat.country,
  //     value: Number(stat.trdeath)
  //   }
  // });

  // const tobmfData = stats.map((stat: any) => {
  //   return {
  //     country: stat.country,
  //     value: Number(stat.tobmf)
  //   }
  // });

  // let labels=["Hale 60MF", "OWMF", "HALEMF", "ALCMF", "CSECT", "TRDeath", "TOBMF"];
  // Apply same pattern to all other data mappings...
  const halemfData = stats.map((stat: any) => {
    return {
      country: stat.country,
      value: Number(stat.halemf),
    };
  });

  const halemfTotal = halemfData.reduce((acc, data) => acc + data.value, 0);

  const halemfDataWithCumulative = halemfData.map((data, index) => {
    const cumulative = halemfData.slice(0, index + 1).reduce((sum, item) => sum + item.value, 0);
    return {
      ...data,
      relativeFreq: ((data.value / halemfTotal) * 100).toFixed(1),
      cumulativeFreq: ((cumulative / halemfTotal) * 100).toFixed(1),
      cumulativeValue: cumulative
    };
  });

  let allChartsData = [{ label: "HALEMF (years)", data: halemfData }];

  return (
    <main className="min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 py-16 space-y-24">
        
        {/* Header */}
        <header className="text-center space-y-4">
          <h1 className="text-5xl font-light tracking-tight text-gray-700">
            Data Analysis 1 Project
          </h1>
          <p className="text-lg text-gray-600">By Charles Acosta</p>
        </header>

        {/* Introduction Section */}
        <section className="space-y-16">    
          <h2 className="text-4xl font-light text-gray-900 text-center">Introduction</h2>
          
          <div className="space-y-6">
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-100">
              <Image 
                src={`/gapminder-chart.png`} 
                alt="GapMinder Chart" 
                width={1000} 
                height={600} 
                className="w-full h-auto rounded-xl"
              />
              <p className="text-sm text-gray-500 text-center mt-4 font-medium">
                Figure 1: GapMinder Chart showing income vs life expectancy trends (2023)
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-2xl font-light text-gray-900 text-center">Focus Countries (Income Level 4)</h3>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
              {focusCountriesData.map((country) => (
                <div key={country.id} className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 relative">
                  <div className="w-4 h-4 rounded-full mb-4 absolute -top-1.5 -left-1.5" style={{ backgroundColor: country.color }}></div>
                  <h4 className="text-xl font-semibold mb-2" style={{ color: country.color }}>{country.country}</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Category: {country.category}</p>
                    <p>Life Expectancy: {country.lifeExpectancy} years</p>
                    <p>Average GDP: ${country.avgGDP}k</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-100">
            <h3 className="text-2xl font-medium text-gray-900 mb-6">GapMinder Chart Analysis (2023)</h3>
            <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed">
              <p className="mb-4">
                <strong>I selected Income Level 4, which includes high-income countries such as the United States, Japan, Canada, and the United Kingdom.</strong> Their life expectancies in 2023 are as follows: the United States (79.5 years), Japan (85.3 years), Canada (82.8 years), and the United Kingdom (81.7 years).
              </p>
              
              <p className="mb-4">
                Looking at the historical data, I noticed how major global events shaped both income and life expectancy. During the 1800s, the Industrial Revolution positioned countries like the USA and UK at the forefront, while Canada and Japan lagged behind.
              </p>

              <p className="mb-4">
                Moving into the 1900s, Canada gradually caught up, while Japan trailed until after World War II. Both the First World War and the Spanish Flu epidemic caused drastic declines in European life expectancy, while the Great Depression in the 1930s drastically reduced income. Similarly, World War II caused another downturn, particularly in Japan.
              </p>

              <p className="mb-4">
                After 1945, global recovery and advancements in medicine, technology, and economic development allowed life expectancy and income to rise steadily. From the 1960s to 1980s, countries in Income Level 4 became healthier and wealthier. By recent decades, these nations began to "bunch up" together, showing that while their growth paths were uneven in the past, high-income countries now share both longer life expectancies and higher GDPs.
              </p>

              <p><strong>Thus, rich countries produce higher life expectancies.</strong></p>
            </div>
          </div>
        </section>
        
        {/* Variable Focus Section */}
        <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-100 text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-4">Variable Focus: 🍁 Canada</h2>
          <p className="text-lg text-gray-700">The average healthy life expectancy of someone born in Canada is <span className="font-semibold">71.3 years</span>.</p>
        </section>

        <section className="space-y-12">
          <h2 className="text-4xl font-light text-gray-900 text-center">Graphical Analysis</h2>
          
          <ChartSection allChartsData={allChartsData} />
          
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 overflow-hidden">
              <Table>
                <TableCaption className="p-4 text-sm text-gray-600">
                  Table 1: Frequency Distribution (Using 5 classes) - Range of 7.8 | 7.8/5 = 1.56 (rounded to 2)
                </TableCaption>
                <TableHeader>
                  <TableRow className="bg-gray-50/80">
                    <TableHead className="font-medium text-gray-900">Range</TableHead>
                    <TableHead className="font-medium text-gray-900">Frequency</TableHead>
                    <TableHead className="font-medium text-gray-900">Relative Frequency</TableHead>
                    <TableHead className="font-medium text-gray-900">Cumulative Frequency</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  <TableRow className="hover:bg-gray-50/50">
                    <TableCell className="font-medium">64-65.9</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>5.7%</TableCell>
                    <TableCell>5.7%</TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-gray-50/50">
                    <TableCell className="font-medium">66-67.9</TableCell>
                    <TableCell>7</TableCell>
                    <TableCell>20%</TableCell>
                    <TableCell>25.7%</TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-gray-50/50">
                    <TableCell className="font-medium">68-69.9</TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>14.3%</TableCell>
                    <TableCell>40%</TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-gray-50/50">
                    <TableCell className="font-medium">70-71.9</TableCell>
                    <TableCell>16</TableCell>
                    <TableCell>45.7%</TableCell>
                    <TableCell>85.7%</TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-gray-50/50">
                    <TableCell className="font-medium">72-73.9</TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>14.3%</TableCell>
                    <TableCell>100%</TableCell>
                  </TableRow>
                  <TableRow className="bg-gray-100/80 font-medium">
                    <TableCell>Total</TableCell>
                    <TableCell>35</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
              <Image 
                src={`/histogram-canada.png`} 
                alt="Histogram showing life expectancy distribution for Canada" 
                width={1000} 
                height={600} 
                className="w-full h-auto rounded-xl"
              />
              <p className="text-sm text-gray-500 text-center mt-4 font-medium">
                Figure 2: Histogram showing frequency distribution of healthy life expectancy across countries
              </p>
            </div>
          </div>
        </section>

        {/* Descriptive and Range Calculations */}
        <section className="space-y-12">
          <h2 className="text-4xl font-light text-gray-900 text-center">Descriptive and Range Calculations</h2>
          
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
            <div className="bg-white/80 rounded-2xl p-6 border border-gray-100">
              <Image 
                src={`/q5.png`} 
                alt="Descriptive statistics calculations" 
                width={600} 
                height={400} 
                className="w-full h-auto rounded-xl"
              />
              <p className="text-sm text-gray-500 text-center mt-4 font-medium">
                Figure 3: Descriptive statistics including mean, standard deviation, and five-number summary
              </p>
            </div>
            
            <div className="bg-white/80 rounded-2xl p-6 border border-gray-100">
              <Image 
                src={`/q6.png`} 
                alt="Range of usual values calculation" 
                width={600} 
                height={400} 
                className="w-full h-auto rounded-xl"
              />
              <p className="text-sm text-gray-500 text-center mt-4 font-medium">
                Figure 4: Range of usual values (RUV) calculation using the rule of thumb (x̄ ± 2s)
              </p>
            </div>
            
            <div className="lg:col-span-2 bg-white/80 rounded-2xl p-6 border border-gray-100">
              <Image 
                src={`/q7.png`} 
                alt="Additional statistical analysis" 
                width={800} 
                height={500} 
                className="w-full h-auto rounded-xl mx-auto"
              />
              <p className="text-sm text-gray-500 text-center mt-4 font-medium">
                Figure 5: Boxplot showing the distribution of life expectancy for Canada
              </p>
            </div>
          </div>
        </section>

        {/* Analytical Summary */}
        <section className="space-y-8">
          <h2 className="text-4xl font-light text-gray-900 text-center">Analytical Summary</h2>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-100 space-y-6">
            <div className="text-gray-700 space-y-4">
              <p className="font-medium text-lg">
                Consider your histogram, the Gapminder World Health Chart, and what you know about the world to make some conclusions about what you see in your frequency distribution and histogram.
              </p>
              
              <p>This analysis should be at least 200 words and show some thought specifically about the data you explored.</p>
              
              <p>Remember that the data set only included high income countries. Some questions you could consider:</p>
              
              <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                <li>What is one thing that you learned from looking at your variable?</li>
                <li>Were you surprised by any of the numbers/graphs?</li>
                <li>Imagine the world 10 – 20 years from now. How might you expect the data to shift?</li>
                <li>What differences might you expect to see if lower income countries were also included?</li>
              </ul>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100">
              <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed space-y-4">
                <p>
                  I learned that my chosen variable, Canada, has consistently shown a high average life expectancy. Looking at the boxplot, I noticed that most of the population falls within 70–72 years of life expectancy, which makes sense given Canada's relatively high GDP and income levels. This suggests that economic strength plays a big role in supporting longer lifespans.
                </p>

                <p>
                  Regarding all of the countries in the scatterplot, what surprised me was how much historical and environmental factors have influenced life expectancy over time. For example, lower incomes and shorter lifespans in the 1800s gradually shifted upward with major events like the Industrial Revolution, which helped countries grow wealthier. Similarly, after World War II, global economic recovery pushed many nations toward higher incomes and better living conditions, which in turn improved health outcomes. It goes to show that events show how strongly external factors shape life expectancy trends.
                </p>

                <p>
                  Looking ahead 10–20 years, I expect most countries will continue to improve in both GDP and life expectancy. Advances in healthcare, technology, and global cooperation could help narrow the gaps between countries, though differences will likely remain depending on income levels and access to resources.
                </p>

                <p>
                  If lower-income countries were to be included in the dataset, I would expect to see much wider variation in the data. Life expectancy would likely be lower on average compared to high-income countries, and the spread of the data would be greater, showing less consistency.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <div className="text-sm font-medium">
          <p className="text-gray-500">Work by Charles Acosta</p>
          <p>Data from <a href="https://www.gapminder.org/fw/world-health-chart/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 hover:underline">Gapminder World Health Chart (2023)</a></p>
        </div>
      </div>
    </main>
  );
}
