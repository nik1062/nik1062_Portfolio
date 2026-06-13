export const staticBlogs = [
  {
    _id: "static-blog-1",
    title: "Building an AI SaaS with React and Node",
    category: "Full Stack AI",
    readTime: "6 min",
    copy: "A brief look at how I structured the ColdMailForge platform to integrate OpenAI and Razorpay smoothly.",
    content: `### The Challenge
When building **ColdMailForge**, the main hurdle wasn't just calling the OpenAI API—it was managing the state between the frontend (React), the backend (Node), and the payment gateway (Razorpay) seamlessly.

### The Architecture
1. **Frontend:** React 18 with Vite for speed.
2. **Backend:** Node.js/Express acting as a secure proxy to OpenAI to protect API keys.
3. **Database:** MongoDB to store user credits and generated email sequences.

\`\`\`javascript
// Example of how the backend proxies the AI request
app.post('/api/generate', async (req, res) => {
  const user = await getUser(req.user.id);
  if (user.credits < 1) return res.status(402).send("Insufficient credits");
  
  const completion = await openai.createCompletion({
    prompt: req.body.prompt
  });
  
  await decrementCredit(user.id);
  res.json({ email: completion.data.choices[0].text });
});
\`\`\`

*This system allows me to write technical articles naturally while retaining full React support!*`,
    createdAt: "2026-06-05T10:00:00.000Z"
  },
  {
    _id: "static-blog-2",
    title: "How SpendLens became a product-style AI audit tool",
    category: "AI Product",
    readTime: "5 min",
    copy: "A build note on turning AI tool pricing, prompts, and metrics into a useful product workflow.",
    content: `### The Vision
SpendLens was built to answer a simple question: *Where is my AI budget going?*

### Core Features
- **Real-time token tracking:** Monitored usage stats across multiple models.
- **Multi-provider support:** Integrations with OpenAI, Anthropic, and Gemini.
- **Cost alerts:** Set budgets and receive alerts before limits are reached.

### Tech Stack
Built using React, TailwindCSS, Node.js, and MongoDB.`,
    createdAt: "2026-06-01T14:30:00.000Z"
  },
  {
    _id: "static-blog-3",
    title: "Designing RESTROPro as a SaaS POS system",
    category: "Full Stack",
    readTime: "6 min",
    copy: "What makes a restaurant POS more than a CRUD app: roles, billing, menu control, and database thinking.",
    content: `### Scalability in POS
A point-of-sale system isn't just about recording transactions. It's about *concurrency*, *role-based access*, and *offline resilience*.

### Key Learnings
1. **Optimistic UI Updates:** Ensure transactions feel instant even with poor connectivity.
2. **Lightweight Menu Control:** Keep nested restaurant categories fast to query.
3. **Roles and Security:** Secure cashier actions behind strict server validations.`,
    createdAt: "2026-05-28T09:15:00.000Z"
  },
  {
    _id: "static-blog-4",
    title: "My NEURA '25 AI Hackathon experience",
    category: "Hackathon",
    readTime: "4 min",
    copy: "How I scoped, built, and presented an AI automation idea that won first prize.",
    content: `### The Pitch
At NEURA '25, my team built **ContextFlow**—an automated DevOps documentation engine using LLMs to trace codebase contexts dynamically.

### The Result
We secured 1st place among 40+ competing teams. The judges loved the immediate practical utility and clean developer experience.`,
    createdAt: "2026-05-24T18:00:00.000Z"
  }
];
