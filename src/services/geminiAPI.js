const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY

export async function getClimateInsights(city, stats) {
  const { avgTemp, maxTemp, minTemp, yearlyRain, trend } = stats

  const prompt = `You are a climate scientist analyzing data for ${city}.

Historical data (2015-2024):
- Average max temperature: ${avgTemp}°C
- Record high: ${maxTemp}°C  
- Record low: ${minTemp}°C
- Average annual rainfall: ${yearlyRain}mm
- Temperature trend: ${trend > 0 ? '+' : ''}${trend}°C change over 10 years

Respond in this EXACT JSON format (no markdown, no backticks, just JSON):
{
  "summary": "2-3 sentence overview of the climate situation",
  "prediction": "What will the climate look like in 10-20 years for this city?",
  "risks": ["risk 1", "risk 2", "risk 3"],
  "recommendations": ["action 1", "action 2", "action 3"],
  "severity": "low" or "moderate" or "high" or "critical"
}`

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.4 }
      })
    }
  )

  if (!res.ok) throw new Error('Gemini API error')

  const data = await res.json()
  const text = data.candidates[0].content.parts[0].text

  const clean = text.replace(/```json|```/g, '').trim()
  return JSON.parse(clean)
}