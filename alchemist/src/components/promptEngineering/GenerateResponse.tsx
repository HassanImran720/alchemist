"use client";
import React, { useState } from "react";

interface GenerateResponseProps {
  generatedPrompt: string;
  onResponseGenerated: (response: string) => void;
}

const GenerateResponse: React.FC<GenerateResponseProps> = ({
  generatedPrompt,
  onResponseGenerated,
}) => {
  const [selectedModel, setSelectedModel] = useState("chatgpt");

 const handleGenerate = () => {
  // Manual static response for testing
  const simulatedResponse = `
✈️ Reset in Costa Rica Retreat  

**Channel**: LinkedIn → Discovery Call  
**Bonus**: "Why Breathworkers Love This Trip"  
**Ideal Audience**: Corporate professionals seeking stress relief, wellness coaches, and solo travelers looking for mindful community.  

---

🌿 Zoe Kim (Mindfulness) – Seattle, WA  
- Messaging Hook: "Mindful travel made effortless ✈"  
- CTA: "Let us plan your next intentional escape"  
- Channel: Email → Text reminder → IG carousel post  
- Extra Note: Highlight ease of booking, curated schedules, and wellness inclusivity.  

---

🔥 Key Program Highlights:  
1. **Morning Breathwork Sessions** led by certified instructors.  
2. **Nature Immersions**: guided hikes, waterfall swims, and jungle meditation.  
3. **Nutrition Workshops**: plant-based meals and cooking demonstrations.  
4. **Community Circles**: nightly group reflections to build deeper bonds.  

---

🎯 SALES ENABLEMENT & CLOSING TOOLS  
✅ Live Client Q&A Webinars (Biweekly) – Answer travel and retreat-specific questions in real time.  
✅ 7-Day Decision Window Offer (Incentivize conversion) – Create urgency with limited-time discounts.  
✅ Interactive Proposal Generator – Include visuals, testimonials, add-ons, and upgrade options.  
✅ Post-Trip Guarantee: "Not transformed? Get refund..." – Builds trust and lowers decision barriers.  
✅ VIP Upgrade: One-on-one coaching sessions available post-retreat.  

---

📊 EXPECTED OUTCOMES  
- **Conversion Rate Target**: 18–22% increase from discovery calls.  
- **Retention Goal**: 40% of attendees sign up for follow-up coaching.  
- **Community Growth**: Expand Instagram audience by 25% in 3 months.  

---

📝 NEXT STEPS  
1. Launch paid ad campaign focused on "Reset in Costa Rica" keywords.  
2. Schedule first **webinar series** with live Q&A.  
3. Build automated **follow-up email drip** sequence post-webinar.  
`;

  // Send static response to parent
  onResponseGenerated(simulatedResponse);
};

  return (
    <div className="bg-ivory rounded-lg p-4 sm:p-6 mb-6 border-[0.5px] border-gold/30">
       <div className="flex items-center mb-4">
      <h2 className=" text-xl text-black mb-4"><strong >IX. Generate Response

</strong>
 </h2>
    </div>

      {/* Select Model */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray mb-2">
          Select Model or Paste Manually
        </label>
        <select
          className="w-full px-3 py-2 border border-gold/30 rounded-md bg-gray-50 text-sm focus:outline-none"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
        >
          <option value="chatgpt">ChatGPT</option>
          <option value="claude">Claude</option>
          <option value="perplexity">Perplexity</option>
          <option value="manual">Paste Manually</option>
        </select>
      </div>

      {/* Generate Button */}
      <button
        className="w-full bg-gold text-white py-2 rounded-md text-sm font-medium hover:bg-yellow-600 transition"
        onClick={handleGenerate}
      >
        Generate Response
      </button>
    </div>
  );
};

export default GenerateResponse;
