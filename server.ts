import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  try {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

// Enterprise AuraOS Context Grounding
const AURAOS_ENTERPRISE_CONTEXT = `
You are AuraOS — the organizational AI operating layer built by Innogenix.
Tagline: "ONE INTELLIGENT LAYER. EVERY DEPARTMENT."
Context:
- Company: Innogenix Demo Organization (Enterprise B2B SaaS + Commerce hardware)
- Departments active: Marketing, Sales, Finance, Operations, HR, Customer Support
- Current Signals & Incident Context:
  * Marketing: Campaign Orion CTR dropped 18% over the last 48 hours (from 2.8% to 2.3%). Creative A suffers creative fatigue with high CPC (₹18.40). Meanwhile Creative B has 3.4% CTR. Static vs short-form: short video outperforming by 42%. Best posting window 10am-12pm.
  * Sales: Lead volume up 22% from Marketing top-of-funnel, but sales follow-up latency increased by 4.2 hours due to SDR team bandwidth constraints. Enterprise conversion flat. 2 high-value deals ($240k total ARR) delayed in stage 3 review.
  * Operations: Order fulfillment cycle time increased by 14% in Region South due to localized carrier capacity constraints.
  * Finance: Software spend tracking +7% above monthly forecast due to duplicate compute instances; cash flow remains healthy with ₹4.2M runway buffer.
  * Department Health: Marketing Healthy, Sales Needs Attention, Finance Healthy, Operations Healthy, HR Healthy, Support Healthy.

Voice and Tone Guidelines:
- Enterprise-grade, analytical, executive, crisp, authoritative, zero conversational fluff.
- NEVER start with "Hi! How can I help you?".
- Always provide structured enterprise analysis:
  1. Executive Summary: What was detected across departments
  2. Contributing Signals: Concrete cross-department factors with specific metrics
  3. Strategic Impact: What this means for the organization
  4. Recommended Next Actions: Specific operational workflows or decisions to execute
`;

app.post('/api/aura-query', async (req, res) => {
  const { query, activeDepartment } = req.body;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Query is required' });
  }

  // Fallback heuristic database for instantaneous, deterministic response in demo / offline mode
  const queryLower = query.toLowerCase();

  // If Gemini API is available, try generating dynamic enterprise response
  if (aiClient) {
    try {
      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `User Query: "${query}"\nCurrent Department Focus: ${activeDepartment || 'Executive Command Center'}`,
        config: {
          systemInstruction: AURAOS_ENTERPRISE_CONTEXT,
          temperature: 0.2,
          maxOutputTokens: 600,
        },
      });

      if (response && response.text) {
        return res.json({
          source: 'gemini-3.8-flash',
          text: response.text,
          signals: [
            { department: 'Marketing', note: 'Campaign Orion creative fatigue (CTR -18%)' },
            { department: 'Sales', note: 'SDR follow-up delay +4.2 hrs on 140+ MQLs' },
            { department: 'Operations', note: 'Region South carrier fulfillment queue bottleneck' },
          ],
          actions: [
            { label: 'Create Optimization Workflow', actionId: 'wf-orion-opt' },
            { label: 'Sync SDR Routing & Marketing Pacing', actionId: 'sync-sales-mkt' },
            { label: 'Open Department Diagnostics', actionId: 'open-diag' },
          ],
        });
      }
    } catch (err) {
      console.warn('Gemini query fallback triggered:', err);
    }
  }

  // High-fidelity domain-grounded response fallback (ensures 100% demo reliability)
  let text = '';
  let signals: Array<{ department: string; note: string }> = [];
  let actions: Array<{ label: string; actionId: string }> = [];

  if (queryLower.includes('revenue') || queryLower.includes('drop') || queryLower.includes('losing')) {
    text = `I detected 3 converging signals across Marketing, Sales, and Operations explaining this week's 8.4% ARR pacing dip:

1. Marketing Top-of-Funnel Disconnect: While raw MQL volume grew 22%, unqualified clicks from Campaign Orion rose due to Creative A fatigue, depressing qualified conversion.
2. Sales Follow-up Latency: Sales team response time increased from 42 mins to 4.8 hours due to high volume, letting 38 qualified mid-market prospects cool down.
3. Deal Stage Delay: Two enterprise opportunities (Acme Logistics ₹1.2M, Apex Retail ₹950k) slipped into legal redline hold.

Recommended Action: Synchronize Campaign Orion budget pacing with active SDR capacity, and re-allocate budget toward Creative B.`;
    signals = [
      { department: 'Marketing', note: 'Campaign Orion qualified click yield down 38%' },
      { department: 'Sales', note: 'SDR response time increased by 4.2 hours' },
      { department: 'Finance', note: 'Contract closing variance: ₹2.15M deferred to next sprint' },
    ];
    actions = [
      { label: 'Rebalance Orion Budget (Shift 15% to B)', actionId: 'wf-orion-opt' },
      { label: 'Route High-Value Leads to Senior AEs', actionId: 'sync-sales-mkt' },
    ];
  } else if (queryLower.includes('attention') || queryLower.includes('today') || queryLower.includes('summarize') || queryLower.includes('health')) {
    text = `AuraOS Daily Organizational Briefing:
• Overall Health: 5 of 6 departments nominal. Sales department requires attention due to lead qualification bottleneck.
• Critical Alerts: 2 active (Campaign Orion creative saturation, Region South fulfillment latency).
• Pending Approvals: 3 high-impact actions awaiting executive sign-off, led by Campaign Orion 15% budget rebalance.
• Autonomous Operations: 28 background workflows active, 47 insights generated in the past 24 hours.`;
    signals = [
      { department: 'Sales', note: 'Status: Needs Attention (Qualification Queue +4.2h)' },
      { department: 'Marketing', note: 'Status: Healthy (1 Alert on Orion Ad Fatigue)' },
      { department: 'Finance', note: 'Status: Healthy (Runway buffer at 18.4 months)' },
    ];
    actions = [
      { label: 'Review Pending Approvals (3)', actionId: 'nav-approvals' },
      { label: 'Inspect Campaign Orion Analysis', actionId: 'nav-marketing' },
    ];
  } else if (queryLower.includes('underperforming') || queryLower.includes('department')) {
    text = `Department Performance Diagnostics:
• Sales Department is currently flagged as "Needs Attention".
• Primary Root Cause: Disproportionate inbound volume without dynamic SDR capacity throttling. Lead triage queue length increased 64% over 72 hours.
• Secondary Contributor: Campaign Orion delivering lower intent clicks before Creative B optimization.
• Marketing, Finance, HR, Operations, and Customer Support remain within healthy operating thresholds.`;
    signals = [
      { department: 'Sales', note: 'Efficiency Index: 71/100 (Below 85 threshold)' },
      { department: 'Marketing', note: 'Efficiency Index: 92/100 (Nominal)' },
    ];
    actions = [
      { label: 'Optimize Marketing-to-Sales Handshake', actionId: 'sync-sales-mkt' },
      { label: 'Open Sales Agent View', actionId: 'open-sales' },
    ];
  } else if (queryLower.includes('blocked') || queryLower.includes('workflow')) {
    text = `Workflow Execution Audit:
• Total Active Workflows: 28
• Blocked / Awaiting Human Approval: 3 workflows
  1. [Marketing Agent] Campaign Orion Ad Budget Rebalance (Risk: Medium)
  2. [Sales Agent] Enterprise SDR Inbound Load-Balancing Rule (Risk: Low)
  3. [Finance Agent] AWS Compute Reserved Instance 1-Yr Commit (Risk: Medium)
• 25 automated background workflows are executing nominally without intervention.`;
    signals = [
      { department: 'Marketing', note: 'Awaiting Admin Approval (Orion budget shift)' },
      { department: 'Sales', note: 'Awaiting Admin Approval (Lead routing rule)' },
    ];
    actions = [
      { label: 'Jump to Approval Center', actionId: 'nav-approvals' },
      { label: 'Inspect Orion Workflow Builder', actionId: 'open-builder' },
    ];
  } else {
    text = `AuraOS Analysis for "${query}":
I analyzed 28 active workflows, 6 departmental agents, and 14 connected enterprise data stores.
Cross-functional synthesis reveals steady performance across Finance and Operations, with high-priority optimization leverage in the Marketing → Sales conversion pipeline.

Key Recommendation: Review Campaign Orion's pending creative rebalance to recover ₹124,000 weekly wasted ad spend and streamline SDR intake.`;
    signals = [
      { department: 'Marketing', note: 'Creative fatigue detected in Campaign Orion' },
      { department: 'Sales', note: 'Enterprise pipeline conversion 18.2%' },
    ];
    actions = [
      { label: 'View Marketing Optimization', actionId: 'nav-marketing' },
      { label: 'Open Workflow Builder', actionId: 'open-builder' },
    ];
  }

  return res.json({
    source: 'auraos-deterministic-engine',
    text,
    signals,
    actions,
  });
});

async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`AuraOS Server running on http://0.0.0.0:${port}`);
  });
}

startServer();
