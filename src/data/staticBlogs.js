export const staticBlogs = [
  {
    _id: "static-blog-1",
    title: "Building an AI SaaS with React and Node",
    category: "Full Stack AI",
    readTime: "6 min",
    copy: "A brief look at how I structured the ColdMailForge platform to integrate OpenAI and Razorpay smoothly.",
    content: `### The Challenge of AI SaaS Development

When building **ColdMailForge**, a platform designed to generate high-converting cold email sequences, the technical hurdles extended far beyond simply sending a prompt to the OpenAI API. The real challenge lay in state management across three distinct layers:
1. **Frontend UI (React):** Providing users with a sleek, responsive workspace to construct campaigns, monitor token usage, and manage credits.
2. **Backend API Proxy (Node.js/Express):** Handling authentication, verifying credit limits, communicating with the LLM securely, and logging token metrics.
3. **Third-Party Gateways (Razorpay):** Syncing payment states asynchronously and updating credit balances atomically.

In this article, I'll walk through the architectural decisions, database modeling, and code patterns that made this system both secure and responsive.

---

### The Architecture

To prevent API key exposure and manage subscription limits, we implemented a secure proxy architecture:

\`\`\`
[ React Client ] ---> [ Express Auth Middleware ] ---> [ Credit Validator ] ---> [ OpenAI API ]
                                                                                   |
                                                                                   v
[ Razorpay Webhook ] ---> [ Express Webhook Parser ] ------------------------> [ MongoDB ($inc) ]
\`\`\`

#### 1. Frontend Architecture
The frontend is built with React and Vite. It utilizes the React Context API to manage user authentication state, current campaign workspace details, and live credit balances. When a user initiates a text generation request, we display a skeleton loader with dynamic micro-animations to improve perceived performance.

#### 2. Backend Proxy & Security
We use Express as a middleware wrapper. All routes under \`/api/generate\` are protected by JWT authentication. Before any request is sent to OpenAI, the server queries the database to confirm the user has at least one credit.

Here is an example of the credit validation and generation handler:

\`\`\`javascript
import { OpenAI } from "openai";
import { User } from "../models/User.js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateSequence = async (req, res) => {
  const { prompt, campaignId } = req.body;
  const userId = req.user.id;

  try {
    // 1. Fetch user and verify credit count
    const user = await User.findById(userId);
    if (!user || user.credits < 1) {
      return res.status(402).json({ 
        ok: false, 
        error: "Insufficient credits. Please top up your account." 
      });
    }

    // 2. Call OpenAI API securely
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an expert cold copywriter. Generate three outreach emails." },
        { role: "user", content: prompt }
      ],
      max_tokens: 800,
      temperature: 0.7
    });

    const generatedText = response.choices[0].message.content;

    // 3. Decrement credit atomically
    await User.findByIdAndUpdate(userId, { $inc: { credits: -1 } });

    res.json({ ok: true, content: generatedText });
  } catch (error) {
    console.error("AI Generation Error:", error);
    res.status(500).json({ ok: false, error: "AI service failed. Try again." });
  }
};
\`\`\`

---

### Integrating Razorpay Webhooks Securely

Payment processing cannot rely solely on frontend redirects. If a user closes the browser during checkout, their credits must still be updated. To solve this, we set up an Express route specifically to handle Razorpay Webhooks.

We verify the signature of the webhook using a shared secret to ensure the request is actually from Razorpay:

\`\`\`javascript
import crypto from "crypto";

export const handleRazorpayWebhook = async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers["x-razorpay-signature"];

  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (digest !== signature) {
    return res.status(400).send("Invalid signature");
  }

  // Handle the payload
  const event = req.body.event;
  if (event === "payment.captured") {
    const payment = req.body.payload.payment.entity;
    const userId = payment.notes.userId;
    const creditAmount = parseInt(payment.notes.credits, 10);

    // Increment user credits atomically in MongoDB
    await User.findByIdAndUpdate(userId, { $inc: { credits: creditAmount } });
  }

  res.json({ status: "ok" });
};
\`\`\`

---

### Key Takeaways for Developers

1. **Atomic Increments:** Always use MongoDB's \`$inc\` operator rather than fetching, modifying, and saving the document. Atomic operations prevent race conditions when users click buttons repeatedly.
2. **Error Backoff:** When working with LLM APIs, implement token bucket rate limiters on your server, and include exponential backoff retries on the client to handle peak periods gracefully.
3. **Decoupled Billing:** Webhooks are the source of truth. Never credit a user account solely based on a successful frontend redirect callback.`,
    createdAt: "2026-06-05T10:00:00.000Z"
  },
  {
    _id: "static-blog-2",
    title: "How SpendLens became a product-style AI audit tool",
    category: "AI Product",
    readTime: "5 min",
    copy: "A build note on turning AI tool pricing, prompts, and metrics into a useful product workflow.",
    content: `### Demystifying AI Operations Cost

In the current ecosystem of AI development, teams often build amazing features only to find themselves blindsided by the API invoice at the end of the month. When building **SpendLens**, my goal was to construct a real-time analytics dashboard that provides developers with granularity on where every token goes.

The system monitors usage, logs prompt configurations, tracks latency, and maps cumulative spend across multiple LLM providers (including OpenAI, Anthropic, and Gemini).

---

### Mapping Token Metrics Across Providers

Different LLM providers structure their response metadata uniquely. To consolidate spend, we built an API proxy layer that parses incoming request bodies and outgoing response bodies, normalizing metadata into a single schema.

Here is the database schema used in MongoDB to store audit records:

\`\`\`javascript
import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  provider: { type: String, enum: ["openai", "anthropic", "google"], required: true },
  model: { type: String, required: true },
  promptTokens: { type: Number, required: true },
  completionTokens: { type: Number, required: true },
  costUSD: { type: Number, required: true },
  latencyMS: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

export const AuditLog = mongoose.model("AuditLog", auditLogSchema);
\`\`\`

To calculate costs in real-time, the backend maintains a model tariff map. For instance:
- **gpt-4o:** $5.00 / 1M input tokens, $15.00 / 1M output tokens.
- **claude-3-5-sonnet:** $3.00 / 1M input tokens, $15.00 / 1M output tokens.

---

### Designing the Live Dashboard

A primary requirement for SpendLens was immediate visual utility. I chose React combined with **Recharts** to design responsive charts displaying daily token distributions and cost categories:

- **Cost-by-Feature Graph:** Shows which workflow is consuming the most resources.
- **Latency vs. Cost Scatter Plot:** Identifies queries that are slow and expensive, signaling opportunities to optimize system prompts.
- **Cost Alert Thresholds:** Users can set maximum daily budgets. When the limit is approached, the backend triggers notifications via Slack webhooks and temporarily suspends non-essential queries.

\`\`\`javascript
// Example Slack Alert Trigger
const checkBudget = async (userId, currentCost) => {
  const limit = await User.findById(userId).select("dailyBudgetLimit");
  const dailySpend = await getDailySpend(userId);

  if (dailySpend + currentCost >= limit.dailyBudgetLimit) {
    await sendSlackAlert(userId, \`Warning: You have reached 100% of your daily AI budget!\`);
  }
};
\`\`\`

---

### Engineering Lessons Learned

1. **Proxy Latency:** Intercepting request payloads and computing costs adds network overhead. We optimized this by logging audit entries asynchronously. We resolve the client's API request first and pass the log calculations to a background worker queue (using Redis/BullMQ in production).
2. **Streaming Parser:** Calculating token usage for streaming responses requires parsing Server-Sent Events (SSE). We buffer the chunks in memory, reconstruct the text stream on-the-fly, and estimate token counts using the \`tiktoken\` library.
3. **Prompt Optimization:** By monitoring token usage per request, we discovered that 40% of our API costs were driven by overly wordy system prompts. Shortening our prompt instructions reduced cost immediately without impacting generation quality.`,
    createdAt: "2026-06-01T14:30:00.000Z"
  },
  {
    _id: "static-blog-3",
    title: "Designing RESTROPro as a SaaS POS system",
    category: "Full Stack",
    readTime: "6 min",
    copy: "What makes a restaurant POS more than a CRUD app: roles, billing, menu control, and database thinking.",
    content: `### Moving Beyond Simple CRUD

When developers think of point-of-sale (POS) software, they often imagine a basic collection of forms for submitting food orders. However, real-world restaurant environments present severe challenges: high network concurrency, multi-role actions (waiters, kitchen staff, cashiers, admins), offline operations, and strict billing audit trails.

During the architecture phase of **RESTROPro**, my goal was to construct a robust SaaS POS system capable of managing these edge cases while delivering a lightning-fast checkout flow.

---

### The Order Lifecycle & State Machine

In a busy restaurant, orders are constantly updated, merged, split, or canceled. To maintain sanity, we model orders using a strict state machine:

\`\`\`
[ Draft ] ---> [ Sent to Kitchen ] ---> [ Prepared ] ---> [ Served ] ---> [ Paid ]
                   |
                   v
               [ Canceled ]
\`\`\`

If a cashier attempts to mark an order as **Paid** before it has been marked as **Sent to Kitchen**, the server must block the operation. We implement this state validation in the database schema:

\`\`\`javascript
const orderSchema = new mongoose.Schema({
  tableId: { type: String, required: true },
  waiterId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [{
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" },
    quantity: { type: Number, required: true },
    priceAtOrder: { type: Number, required: true } // Captured at purchase time
  }],
  status: {
    type: String,
    enum: ["draft", "kitchen", "prepared", "served", "paid", "canceled"],
    default: "draft"
  },
  totalAmount: { type: Number, required: true }
}, { timestamps: true });
\`\`\`

> [!IMPORTANT]
> Notice the **\`priceAtOrder\`** property inside the items array. This is a critical database design rule: you must store the historical price of the item at the exact moment of order. If a restaurant manager updates the menu price of a burger tomorrow, it must not alter the transaction history of past sales.

---

### Role-Based Access Control (RBAC)

RESTROPro enforces security controls directly in the Express route handlers:
- **Waiters:** Can create orders, add items, and update tables.
- **Kitchen Staff:** Can only view the Kitchen Display System (KDS) and mark orders as "Prepared".
- **Cashiers:** Can generate bills, print receipts, and record payments.
- **Admins:** Can modify menu items, edit pricing, and view daily sales reports.

We verify these permissions in a custom middleware:

\`\`\`javascript
export const requireRole = (roles) => {
  return (req, res, next) => {
    const userRole = req.user.role; // Set by verifyToken middleware

    if (!roles.includes(userRole)) {
      return res.status(403).json({ 
        ok: false, 
        error: "Forbidden: You do not have permission to perform this action." 
      });
    }
    next();
  };
};

// Route usage
router.put("/menu/:id", verifyToken, requireRole(["admin"]), updateMenuItem);
\`\`\`

---

### Concurrency and Offline Resilience

#### 1. Optimistic UI Updates
Waiters taking orders at tables need immediate feedback. When they tap an item, the React client updates the UI instantly, rendering the updated table totals before the server returns success. If the network fails, the app uses a retry queue to resubmit the action.

#### 2. Syncing Menu Data
Menu structures can be deeply nested (Categories > Subcategories > Modifiers). Rather than querying MongoDB every time a user expands a category, the client fetches the menu once on initial load, stores it in IndexedDB, and updates it only when receiving a "menu-updated" signal via WebSockets. This minimizes database queries and makes page navigation instant.`,
    createdAt: "2026-05-28T09:15:00.000Z"
  },
  {
    _id: "static-blog-4",
    title: "My NEURA '25 AI Hackathon experience",
    category: "Hackathon",
    readTime: "4 min",
    copy: "How I scoped, built, and presented an AI automation idea that won first prize.",
    content: `### Scoping an MVP in 24 Hours

Participating in the **NEURA '25 AI Hackathon** was an exercise in extreme prioritization. With over 40 teams competing and a strict 24-hour time limit, we knew that winning would require building a tool that solves a genuine pain point with a highly functional demo.

Our project, **ContextFlow**, was designed to address a common developer bottleneck: onboarding to a legacy codebase. New developers waste hours trying to map dependency graphs and trace function definitions. We set out to build an automated workspace analyzer that constructs a vector dependency graph and answers natural language questions about files in real-time.

---

### The Tech Stack Decisions

Under time pressure, we chose familiar, rapid-prototyping technologies:
- **Backend:** Python FastAPI. Fast assembly of REST routes and built-in support for Abstract Syntax Tree (AST) parsing.
- **Frontend:** React + Tailwind CSS. Using **react-flow** to create interactive graph canvas visualizations.
- **LLM Engine:** Google Gemini 2.0 API. Chosen for its massive context window, enabling us to feed entire code files into prompts for explanation.

---

### Abstract Syntax Trees (AST) & Code Mapping

To map codebase files, we didn't just read directories recursively; we parsed the source code. The Python backend reads code files, parses them into an AST, extracts imports, class declarations, and function signatures, and builds an adjacency list (graph).

Here is a simplified example of the python script parsing imports:

\`\`\`python
import ast

def parse_dependencies(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        node = ast.parse(f.read())
        
    dependencies = []
    for child in ast.walk(node):
        if isinstance(child, ast.Import):
            for name in child.names:
                dependencies.append(name.name)
        elif isinstance(child, ast.ImportFrom):
            dependencies.append(child.module)
            
    return dependencies
\`\`\`

This dependency list is then sent to the React frontend, which constructs nodes and edges inside the \`react-flow\` canvas, visually rendering the codebase structure.

---

### Integrating the Gemini Assistant

Once the codebase is mapped, developers can click on any node (file) and ask questions. We send the selected file content, its dependencies, and the developer's question to the Gemini API, which generates an explanation:

\`\`\`javascript
// Backend endpoint to explain a file in context
app.post("/api/explain", async (req, res) => {
  const { fileName, fileCode, imports, question } = req.body;

  const systemInstructions = \`You are a DevOps assistant. Explain the following file in context of imports: \${imports.join(", ")}.\`;
  
  const response = await gemini.generate({
    prompt: \`\${systemInstructions}\\n\\nFile Name: \${fileName}\\nCode:\\n\${fileCode}\\n\\nQuestion: \${question}\`
  });

  res.json({ explanation: response.text });
});
\`\`\`

---

### Presentation and the Win

When presenting to the judges, we bypassed slideshows and jumped directly into a live demonstration:
1. We dragged-and-dropped a live Express repository into the browser.
2. Within 5 seconds, **ContextFlow** generated an interactive visual graph of the backend.
3. We clicked a database connection module, asked why connection pools were failing, and the Gemini assistant highlighted the exact missing environment variable.

The judges loved the immediate practical utility, sleek visual UI, and functional integration of code analysis. We secured **1st place**, validating our belief that AI tools should focus on reducing developer overhead with smooth, interactive interfaces.`,
    createdAt: "2026-05-24T18:00:00.000Z"
  }
];
