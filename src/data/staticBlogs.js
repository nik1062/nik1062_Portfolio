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
  },
  {
    _id: "static-blog-5",
    title: "Building an n8n email assistant with Gemini",
    category: "Automation",
    readTime: "4 min",
    copy: "A practical workflow for transforming prompts into professional email drafts and Gmail actions.",
    content: `### The Power of Automated Context

For busy developers and business owners, email triage is a constant drain on focus. Traditional auto-replies look mechanical, while fully automated AI responses risk making embarrassing errors. The sweet spot is an automated assistant that **drafts** contextual email replies for you to review before hitting send.

Using **n8n** (a node-based workflow automation platform) and **Google Gemini**, I built an assistant that monitors incoming emails, classifies their intent, references context files, and writes high-quality drafts directly into my Gmail account.

---

### The n8n Workflow Design

The workflow consists of four main functional sections:

\`\`\`
[ Gmail Trigger ] ---> [ Filter (Unread/Category) ] ---> [ Gemini Node (Draft reply) ] ---> [ Gmail Create Draft ]
\`\`\`

1. **Gmail Trigger Node:** Polls Gmail every 5 minutes looking for unread emails in the primary inbox.
2. **Filter Node:** Restricts triage to professional categories, ignoring promotional newsletters and spam.
3. **Gemini Node:** Takes the sender's name, email subject, and body, and prompts the LLM to draft a reply using system context.
4. **Gmail Create Draft Node:** Creates a new draft reply threaded to the original conversation.

---

### Prompt Engineering for Email Classification

The core value of the assistant lies in the instructions given to Gemini. Rather than letting the LLM write arbitrary text, we enforce strict copywriting rules:

\`\`\`
System Instructions:
You are an AI assistant acting on behalf of Nikunj Kumar. 
Review the incoming email and draft a reply that is:
1. Professional, polite, and concise.
2. Formatted with appropriate spacing (no massive blocks of text).
3. Classified based on intent:
   - If it is a recruiter inquiry: Express interest and reference the resume PDF URL.
   - If it is a collaboration request: Suggest scheduling a call via my Calendly link.
   - If it is spam or a cold sales pitch: Output "SKIP_DRAFT".

Incoming Email:
From: {{ $json.from.email }}
Subject: {{ $json.subject }}
Body: {{ $json.text }}
\`\`\`

We configure the n8n flow to evaluate the Gemini response. If the output contains \`SKIP_DRAFT\`, we terminate the execution chain, keeping the drafts folder clutter-free.

---

### Security and Implementation Details

- **OAuth 2.0 Authentication:** Connecting n8n to Gmail requires setting up a Google Cloud Project and creating OAuth credentials. This ensures the assistant access remains restricted to your custom scopes.
- **Self-Hosting n8n:** To keep costs low and secure absolute privacy over email payloads, the n8n instance is self-hosted on a local server using a lightweight Docker container.`,
    createdAt: "2026-05-20T12:00:00.000Z"
  },
  {
    _id: "static-blog-6",
    title: "Power BI and finance dashboards as portfolio proof",
    category: "Data",
    readTime: "5 min",
    copy: "Why dashboards should tell a story, not just show charts.",
    content: `### Constructing a Visual Narrative

Many developers believe that data analytics is simply a matter of loading a database table into Power BI, dragging columns onto a canvas, and rendering standard pie charts. In reality, data visualization is an exercise in communication. A dashboard should lead the viewer through a visual story, helping them identify trends and anomalies at a glance.

When building my financial analytics dashboards, I wanted to showcase that BI is not just about writing queries—it is about mapping raw numbers to key business insights.

---

### Core Principles of BI Layout Design

To minimize cognitive load, I follow a strict visual hierarchy:

| Element | Placement | Purpose |
| :--- | :--- | :--- |
| **Global Filters** | Top Left / Sidebar | Allows users to slice data by Year, Category, or Region |
| **Headline Cards** | Top Header | Displays vital KPIs (Total Revenue, YoY Growth, Gross Margin) |
| **Trend Lines** | Center Body | Shows temporal changes (Monthly sales vs. Target budgets) |
| **Breakdown Tables** | Bottom Area | Provides detailed transactional audit trails |

#### Color Systems
Avoid using default browser colors. I use a unified HSL color scheme tailored to the client's brand. For example, a dark mode charcoal background with golden/amber accents for highlight values. Only use vibrant colors (like coral red or emerald green) to signal alerts or success metrics.

---

### Writing Custom DAX Formulas

To display time-comparative analytics (such as Year-to-Date totals and Year-over-Year growth), standard drag-and-drop metrics are insufficient. We must write customized **DAX (Data Analysis Expressions)** formulas:

\`\`\`dax
// Cumulative Year-To-Date (YTD) Revenue
YTD_Revenue = CALCULATE(
    SUM(Sales[Amount]),
    DATESYTD('Calendar'[Date])
)

// Year-over-Year (YoY) Growth Percentage
YoY_Revenue_Growth = 
VAR PriorYearRevenue = CALCULATE(
    [YTD_Revenue],
    SAMEPERIODLASTYEAR('Calendar'[Date])
)
RETURN
    DIVIDE([YTD_Revenue] - PriorYearRevenue, PriorYearRevenue, 0)
\`\`\`

---

### Why Analytics Matters for Developers

For software engineers, understanding business metrics is a superpower. Whether you are building a SaaS platform, a mobile application, or a POS system, you are ultimately generating data. Knowing how to consume that data using SQL, transform it with Power Query, and visualize it with Power BI shows that you can connect code to business value.`,
    createdAt: "2026-05-15T15:00:00.000Z"
  },
  {
    _id: "static-blog-7",
    title: "Dockerizing a MERN-style project for deployment",
    category: "DevOps",
    readTime: "5 min",
    copy: "Notes on environment variables, build steps, image size, and deployment confidence.",
    content: `### Eliminating 'It Works on My Machine'

One of the most frustrating bottlenecks in software development occurs when an application runs perfectly on your local machine but crashes immediately upon cloud deployment. This is caused by environmental differences: node versions, missing global modules, local database configurations, and OS differences.

Containerization with **Docker** solves this by bundling your application code, node runtime, database dependencies, and configurations into a portable image that runs identically anywhere.

---

### Multi-Stage Dockerfile for Frontend (React/Vite)

To keep production images small and secure, we use a **multi-stage build**. We build the React production assets in a heavy Node container and copy the minified assets into a lightweight Nginx web server container:

\`\`\`dockerfile
# Stage 1: Build the production bundle
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve using Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
\`\`\`

By splitting the build, our final production image contains only the static HTML/CSS/JS and Nginx, reducing the final image footprint from over **800MB** to under **25MB**!

---

### Dockerfile for Backend (Node/Express)

For the Express backend, we also use a lightweight Alpine image, copy package dependencies, install only production modules, and expose the port:

\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5050
ENV NODE_ENV=production
CMD ["node", "server/index.js"]
\`\`\`

---

### Local Orchestration with Docker-Compose

To orchestrate the frontend client, backend api, and a local MongoDB instance concurrently, we define a \`docker-compose.yml\` file:

\`\`\`yaml
version: '3.8'

services:
  database:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

  backend:
    build:
      context: .
      dockerfile: Dockerfile.backend
    ports:
      - "5050:5050"
    environment:
      - MONGODB_URI=mongodb://database:27017/portfolio
      - JWT_SECRET=local_dev_secret
    depends_on:
      - database

  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mongo-data:
\`\`\`

---

### Key Takeaways

1. **Caching Layers:** Place your \`COPY package*.json\` and \`RUN npm install\` statements *before* copying the rest of your code. This allows Docker to cache the dependencies layer, making subsequent builds compile in seconds.
2. **Environment Isolation:** Never hardcode secrets in your Dockerfiles. Use the \`environment\` fields in your orchestration file or inject them at runtime through container orchestration tools (like ECS or Kubernetes).`,
    createdAt: "2026-05-10T10:00:00.000Z"
  }
];
