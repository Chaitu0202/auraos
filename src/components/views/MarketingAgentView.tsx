import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  BarChart3, 
  MousePointerClick, 
  DollarSign, 
  Users,
  Instagram,
  Youtube,
  Linkedin,
  Facebook,
  Workflow,
  Target,
  Play
} from 'lucide-react';
import { useAura } from '../../context/AuraContext';
import { HEATMAP_POSTING_DATA } from '../../data/mockEnterpriseData';

export const MarketingAgentView: React.FC = () => {
  const { 
    campaigns, 
    setIsWorkflowBuilderOpen, 
    setActiveNav,
    setDemoGuideStep,
    monochromeMode
  } = useAura();

  const isLight = monochromeMode === 'light';

  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'campaigns' | 'audience' | 'insights' | 'workflows'>('overview');
  const [isWhyExpanded, setIsWhyExpanded] = useState(true);
  const [selectedCampaignId, setSelectedCampaignId] = useState('campaign-orion');
  const [creativePlanGenerated, setCreativePlanGenerated] = useState(false);
  const [scheduleWorkflowCreated, setScheduleWorkflowCreated] = useState(false);

  const orionCampaign = campaigns.find((c) => c.id === 'campaign-orion') || campaigns[0];

  const handleReviewAction = () => {
    setDemoGuideStep(4);
    setIsWorkflowBuilderOpen(true);
  };

  const handleCreateScheduleWorkflow = () => {
    setScheduleWorkflowCreated(true);
    setTimeout(() => {
      setIsWorkflowBuilderOpen(true);
    }, 400);
  };

  const handleGeneratePlan = () => {
    setCreativePlanGenerated(true);
  };

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-200">
      {/* Agent Header Banner (Pure Black & White) */}
      <div className={`p-5 rounded-xl border transition-colors ${
        isLight ? 'bg-neutral-50 border-neutral-300 text-neutral-900' : 'bg-neutral-950 border-neutral-800 text-neutral-100'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-mono font-bold text-lg shrink-0 ${
              isLight ? 'bg-black text-white' : 'bg-white text-black'
            }`}>
              MA
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className={`text-xl font-bold tracking-tight ${isLight ? 'text-black' : 'text-white'}`}>
                  Marketing Agent
                </h1>
                <span className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold border ${
                  isLight ? 'bg-neutral-200 text-neutral-800 border-neutral-300' : 'bg-neutral-900 text-neutral-200 border-neutral-700'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isLight ? 'bg-black' : 'bg-white'}`} />
                  Active
                </span>
                <span className={`text-xs font-mono ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
                  · Semi-Autonomous Execution Gate
                </span>
              </div>
              <p className={`text-xs ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
                &ldquo;Your autonomous marketing intelligence layer.&rdquo;
              </p>
            </div>
          </div>

          {/* Connected Systems Icons (Clean Monochrome) */}
          <div className="flex flex-col sm:items-end gap-1.5">
            <div className={`text-[10px] uppercase font-mono tracking-wider ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
              Connected Platforms
            </div>
            <div className="flex items-center gap-1.5">
              <div className={`p-1.5 rounded-md border ${
                isLight ? 'bg-white border-neutral-300 text-black' : 'bg-neutral-900 border-neutral-800 text-white'
              }`} title="Instagram Professional">
                <Instagram className="w-4 h-4" />
              </div>
              <div className={`p-1.5 rounded-md border ${
                isLight ? 'bg-white border-neutral-300 text-black' : 'bg-neutral-900 border-neutral-800 text-white'
              }`} title="YouTube Analytics">
                <Youtube className="w-4 h-4" />
              </div>
              <div className={`p-1.5 rounded-md border ${
                isLight ? 'bg-white border-neutral-300 text-black' : 'bg-neutral-900 border-neutral-800 text-white'
              }`} title="LinkedIn Ads">
                <Linkedin className="w-4 h-4" />
              </div>
              <div className={`p-1.5 rounded-md border ${
                isLight ? 'bg-white border-neutral-300 text-black' : 'bg-neutral-900 border-neutral-800 text-white'
              }`} title="Facebook Page">
                <Facebook className="w-4 h-4" />
              </div>
              <div className={`px-2 py-1 rounded-md border font-mono text-[11px] font-semibold ${
                isLight ? 'bg-black text-white border-black' : 'bg-white text-black border-white'
              }`} title="Meta Ads Manager">
                Meta Ads
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className={`flex items-center gap-1 mt-5 pt-3 border-t overflow-x-auto scrollbar-none ${
          isLight ? 'border-neutral-200' : 'border-neutral-800'
        }`}>
          {(['overview', 'content', 'campaigns', 'audience', 'insights', 'workflows'] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider font-mono transition-all ${
                  isActive
                    ? isLight
                      ? 'bg-black text-white border border-black'
                      : 'bg-white text-black border border-white'
                    : isLight
                    ? 'text-neutral-500 hover:text-black hover:bg-neutral-200/60 border border-transparent'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900 border border-transparent'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* CORE METRICS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className={`p-3.5 rounded-lg border ${
          isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-neutral-950 border-neutral-800'
        }`}>
          <div className={`flex items-center justify-between text-[11px] mb-1 ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
            <span>Reach</span>
            <Users className="w-3.5 h-3.5" />
          </div>
          <div className={`text-xl font-bold font-mono tabular-nums ${isLight ? 'text-black' : 'text-white'}`}>
            1,420,800
          </div>
          <div className={`text-[10px] mt-1 font-mono flex items-center gap-1 font-semibold ${isLight ? 'text-black' : 'text-neutral-300'}`}>
            <TrendingUp className="w-3 h-3" />
            +14.2% MoM
          </div>
        </div>

        <div className={`p-3.5 rounded-lg border ${
          isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-neutral-950 border-neutral-800'
        }`}>
          <div className={`flex items-center justify-between text-[11px] mb-1 ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
            <span>Engagement Rate</span>
            <BarChart3 className="w-3.5 h-3.5" />
          </div>
          <div className={`text-xl font-bold font-mono tabular-nums ${isLight ? 'text-black' : 'text-white'}`}>
            4.8%
          </div>
          <div className={`text-[10px] mt-1 font-mono flex items-center gap-1 font-semibold ${isLight ? 'text-black' : 'text-neutral-300'}`}>
            <TrendingUp className="w-3 h-3" />
            +0.6% vs target
          </div>
        </div>

        <div className={`p-3.5 rounded-lg border ${
          isLight ? 'bg-neutral-100 border-neutral-400 shadow-sm' : 'bg-neutral-900 border-neutral-600'
        }`}>
          <div className={`flex items-center justify-between text-[11px] mb-1 font-semibold ${isLight ? 'text-black' : 'text-white'}`}>
            <span>CTR (Blended)</span>
            <MousePointerClick className="w-3.5 h-3.5" />
          </div>
          <div className={`text-xl font-bold font-mono tabular-nums ${isLight ? 'text-black' : 'text-white'}`}>
            2.8%
          </div>
          <div className={`text-[10px] mt-1 font-mono flex items-center gap-1 ${isLight ? 'text-neutral-700 font-semibold' : 'text-neutral-300 font-semibold'}`}>
            <TrendingDown className="w-3 h-3" />
            -18% in Orion (48h)
          </div>
        </div>

        <div className={`p-3.5 rounded-lg border ${
          isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-neutral-950 border-neutral-800'
        }`}>
          <div className={`flex items-center justify-between text-[11px] mb-1 ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
            <span>Conversions</span>
            <Target className="w-3.5 h-3.5" />
          </div>
          <div className={`text-xl font-bold font-mono tabular-nums ${isLight ? 'text-black' : 'text-white'}`}>
            3,842 MQLs
          </div>
          <div className={`text-[10px] mt-1 font-mono ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
            Qualified inbound
          </div>
        </div>

        <div className={`p-3.5 rounded-lg border ${
          isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-neutral-950 border-neutral-800'
        }`}>
          <div className={`flex items-center justify-between text-[11px] mb-1 ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
            <span>Ad Spend</span>
            <DollarSign className="w-3.5 h-3.5" />
          </div>
          <div className={`text-xl font-bold font-mono tabular-nums ${isLight ? 'text-black' : 'text-white'}`}>
            ₹18,40,000
          </div>
          <div className={`text-[10px] mt-1 font-mono ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
            83.6% of ₹22L budget
          </div>
        </div>

        <div className={`p-3.5 rounded-lg border ${
          isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-neutral-950 border-neutral-800'
        }`}>
          <div className={`flex items-center justify-between text-[11px] mb-1 ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
            <span>ROAS</span>
            <TrendingUp className="w-3.5 h-3.5" />
          </div>
          <div className={`text-xl font-bold font-mono tabular-nums ${isLight ? 'text-black' : 'text-white'}`}>
            3.82x
          </div>
          <div className={`text-[10px] mt-1 font-mono ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
            Target: 4.0x
          </div>
        </div>
      </div>

      {/* AURAOS AI ANALYSIS PANEL (Pure Monochrome) */}
      <div className={`p-5 rounded-xl border space-y-4 ${
        isLight ? 'bg-neutral-50 border-neutral-300 text-neutral-900 shadow-sm' : 'bg-neutral-950 border-neutral-800 text-neutral-100'
      }`}>
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3 ${
          isLight ? 'border-neutral-200' : 'border-neutral-800'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className={`w-7 h-7 rounded flex items-center justify-center font-bold text-xs font-mono ${
              isLight ? 'bg-black text-white' : 'bg-white text-black'
            }`}>
              AI
            </div>
            <div>
              <div className={`text-xs font-mono uppercase tracking-wider font-semibold ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
                AURAOS ANALYSIS
              </div>
              <h2 className={`text-sm font-bold ${isLight ? 'text-black' : 'text-white'}`}>
                Autonomous Diagnostic: Creative Fatigue Detected
              </h2>
            </div>
          </div>
          <span className={`text-[11px] font-mono ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
            Analysis Confidence: <strong className={isLight ? 'text-black' : 'text-white'}>96.4%</strong> · Bayesian Thompson Posterior
          </span>
        </div>

        {/* Lead Executive Statement */}
        <div className={`p-3.5 rounded-lg border text-sm leading-relaxed ${
          isLight ? 'bg-white border-neutral-300 text-neutral-900' : 'bg-black border-neutral-800 text-neutral-100'
        }`}>
          &ldquo;Marketing performance is healthy overall, but <strong className="underline underline-offset-2">Campaign Orion</strong> is showing early signs of creative fatigue with a 38% deficit in qualified clicks.&rdquo;
        </div>

        {/* What's Working vs What's Not Working Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* What's Working */}
          <div className={`p-4 rounded-lg border space-y-2.5 ${
            isLight ? 'bg-white border-neutral-200' : 'bg-neutral-900/60 border-neutral-800'
          }`}>
            <div className={`flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider ${
              isLight ? 'text-black' : 'text-white'
            }`}>
              <CheckCircle2 className="w-4 h-4" />
              <span>WHAT&apos;S WORKING</span>
            </div>
            <ul className={`space-y-2 text-xs ${isLight ? 'text-neutral-700' : 'text-neutral-300'}`}>
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span>Short-form video content is outperforming static content by <strong>+42% CTR</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span>LinkedIn posts published between <strong>9–11 AM</strong> show 2.4x stronger enterprise engagement.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span><strong>Creative B</strong> is generating the highest qualified CTR (<strong>3.4%</strong> vs 1.6% for Creative A).</span>
              </li>
            </ul>
          </div>

          {/* What's Not Working */}
          <div className={`p-4 rounded-lg border space-y-2.5 ${
            isLight ? 'bg-white border-neutral-200' : 'bg-neutral-900/60 border-neutral-800'
          }`}>
            <div className={`flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider ${
              isLight ? 'text-black' : 'text-white'
            }`}>
              <AlertTriangle className="w-4 h-4" />
              <span>WHAT&apos;S NOT WORKING</span>
            </div>
            <ul className={`space-y-2 text-xs ${isLight ? 'text-neutral-700' : 'text-neutral-300'}`}>
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span>Campaign Orion CTR decreased by <strong>18%</strong> over the last 48 hours.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span>Static Creative A has above-average CPC (<strong>₹18.40</strong> vs ₹15.90 account benchmark).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span>Instagram engagement dropped <strong>31%</strong> during evening posting windows (post-7 PM).</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Expandable "WHY?" Reasoning Chain */}
        <div className={`rounded-lg border overflow-hidden ${
          isLight ? 'bg-white border-neutral-200' : 'bg-black border-neutral-800'
        }`}>
          <button
            onClick={() => setIsWhyExpanded(!isWhyExpanded)}
            className={`w-full px-4 py-2.5 flex items-center justify-between text-xs font-mono transition-colors ${
              isLight ? 'hover:bg-neutral-100 text-neutral-900' : 'hover:bg-neutral-900 text-neutral-100'
            }`}
          >
            <span className="flex items-center gap-2 font-bold uppercase tracking-wider">
              <span>WHY?</span>
              <span className={`font-normal ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>AuraOS Causal Reasoning Chain (3 Contributing Factors)</span>
            </span>
            {isWhyExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {isWhyExpanded && (
            <div className={`px-4 pb-4 pt-1 space-y-2.5 text-xs border-t ${
              isLight ? 'border-neutral-200 text-neutral-700' : 'border-neutral-800 text-neutral-300'
            }`}>
              <div className={`p-2.5 rounded border flex items-start gap-3 ${
                isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-neutral-900/60 border-neutral-800'
              }`}>
                <span className={`w-5 h-5 rounded flex items-center justify-center font-mono text-[10px] font-bold shrink-0 ${
                  isLight ? 'bg-black text-white' : 'bg-white text-black'
                }`}>
                  1
                </span>
                <div>
                  <div className={`font-semibold mb-0.5 ${isLight ? 'text-black' : 'text-white'}`}>Frequency Saturation on Static Asset</div>
                  <p className={`text-[11px] leading-relaxed ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
                    Target ICP decision-makers have seen Creative A an average of 4.8 times over the last 14 days. Click-through velocity decayed sharply after the 3rd impression.
                  </p>
                </div>
              </div>

              <div className={`p-2.5 rounded border flex items-start gap-3 ${
                isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-neutral-900/60 border-neutral-800'
              }`}>
                <span className={`w-5 h-5 rounded flex items-center justify-center font-mono text-[10px] font-bold shrink-0 ${
                  isLight ? 'bg-black text-white' : 'bg-white text-black'
                }`}>
                  2
                </span>
                <div>
                  <div className={`font-semibold mb-0.5 ${isLight ? 'text-black' : 'text-white'}`}>Ad Auction Relevance Drag</div>
                  <p className={`text-[11px] leading-relaxed ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
                    Meta Ads algorithm penalized Creative A with higher auction clearing bids due to lower post-click dwell time, driving CPC up to ₹22.10 on that specific asset.
                  </p>
                </div>
              </div>

              <div className={`p-2.5 rounded border flex items-start gap-3 ${
                isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-neutral-900/60 border-neutral-800'
              }`}>
                <span className={`w-5 h-5 rounded flex items-center justify-center font-mono text-[10px] font-bold shrink-0 ${
                  isLight ? 'bg-black text-white' : 'bg-white text-black'
                }`}>
                  3
                </span>
                <div>
                  <div className={`font-semibold mb-0.5 ${isLight ? 'text-black' : 'text-white'}`}>Misaligned Delivery Schedule</div>
                  <p className={`text-[11px] leading-relaxed ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
                    35% of daily budget currently clears during 7 PM–11 PM when corporate buyers are inactive, wasting budget during off-peak windows.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI RECOMMENDATIONS SECTION (Actions that work!) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className={`text-xs font-mono uppercase tracking-wider font-bold ${
            isLight ? 'text-neutral-600' : 'text-neutral-400'
          }`}>
            RECOMMENDED ACTIONS
          </h2>
          <span className={`text-[11px] font-mono font-semibold ${isLight ? 'text-black' : 'text-white'}`}>
            3 High-Impact Recommendations
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Recommendation 01 */}
          <div className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
            isLight ? 'bg-neutral-50 border-neutral-300' : 'bg-neutral-950 border-neutral-800'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded border ${
                  isLight ? 'bg-black text-white border-black' : 'bg-white text-black border-white'
                }`}>
                  Recommendation 01 · Hero Action
                </span>
                <span className="text-[10px] font-mono font-bold">+21% Efficiency</span>
              </div>
              <h3 className={`text-sm font-bold mb-1.5 ${isLight ? 'text-black' : 'text-white'}`}>
                &ldquo;Shift 15% of Campaign Orion budget toward Creative B.&rdquo;
              </h3>
              <p className={`text-xs mb-4 leading-relaxed ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
                Impact: Rebalance daily spend from fatiguing Creative A (1.6% CTR) to high-converting Video B (3.4% CTR). Recover blended CPC to ₹15.90.
              </p>
            </div>
            <button
              onClick={handleReviewAction}
              className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm ${
                isLight
                  ? 'bg-black hover:bg-neutral-800 text-white'
                  : 'bg-white hover:bg-neutral-200 text-black'
              }`}
            >
              <span>REVIEW ACTION</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Recommendation 02 */}
          <div className={`p-4 rounded-xl border flex flex-col justify-between ${
            isLight ? 'bg-white border-neutral-200' : 'bg-neutral-950 border-neutral-800'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-mono uppercase font-semibold px-2 py-0.5 rounded border ${
                  isLight ? 'bg-neutral-100 border-neutral-300 text-neutral-800' : 'bg-neutral-900 border-neutral-800 text-neutral-300'
                }`}>
                  Recommendation 02
                </span>
                <span className={`text-[10px] font-mono ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>Peak Delivery</span>
              </div>
              <h3 className={`text-sm font-bold mb-1.5 ${isLight ? 'text-black' : 'text-white'}`}>
                &ldquo;Move Instagram publishing window to 10:00 AM–12:00 PM.&rdquo;
              </h3>
              <p className={`text-xs mb-4 leading-relaxed ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
                Impact: Concentrates impression delivery when target executive audience engagement index peaks at 98/100.
              </p>
            </div>
            <button
              onClick={handleCreateScheduleWorkflow}
              className={`w-full py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                isLight
                  ? 'bg-neutral-100 hover:bg-neutral-200 text-black border-neutral-300'
                  : 'bg-neutral-900 hover:bg-neutral-800 text-white border-neutral-700'
              }`}
            >
              <span>{scheduleWorkflowCreated ? 'WORKFLOW CONFIGURED' : 'CREATE WORKFLOW'}</span>
              <Workflow className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Recommendation 03 */}
          <div className={`p-4 rounded-xl border flex flex-col justify-between ${
            isLight ? 'bg-white border-neutral-200' : 'bg-neutral-950 border-neutral-800'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-mono uppercase font-semibold px-2 py-0.5 rounded border ${
                  isLight ? 'bg-neutral-100 border-neutral-300 text-neutral-800' : 'bg-neutral-900 border-neutral-800 text-neutral-300'
                }`}>
                  Recommendation 03
                </span>
                <span className={`text-[10px] font-mono ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>Creative Scale</span>
              </div>
              <h3 className={`text-sm font-bold mb-1.5 ${isLight ? 'text-black' : 'text-white'}`}>
                &ldquo;Repurpose the top-performing short-form video format.&rdquo;
              </h3>
              <p className={`text-xs mb-4 leading-relaxed ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
                Impact: Generate 3 variants of the high-converting 32-second product workflow demo for LinkedIn & YouTube Shorts.
              </p>
            </div>
            <button
              onClick={handleGeneratePlan}
              className={`w-full py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                isLight
                  ? 'bg-neutral-100 hover:bg-neutral-200 text-black border-neutral-300'
                  : 'bg-neutral-900 hover:bg-neutral-800 text-white border-neutral-700'
              }`}
            >
              <span>{creativePlanGenerated ? 'PLAN COMPILED (3 VARIANTS)' : 'GENERATE PLAN'}</span>
              <Play className="w-3.5 h-3.5 fill-current" />
            </button>
          </div>
        </div>

        {creativePlanGenerated && (
          <div className={`p-3.5 rounded-lg border text-xs flex items-center justify-between ${
            isLight ? 'bg-neutral-100 border-neutral-300 text-neutral-900' : 'bg-neutral-900 border-neutral-700 text-neutral-200'
          }`}>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Creative Plan compiled: 3 short-form storyboards dispatched to creative queue for LinkedIn & Instagram.</span>
            </div>
            <button
              onClick={() => setActiveNav('workflows')}
              className="text-xs font-semibold underline"
            >
              View in Workflows
            </button>
          </div>
        )}
      </div>

      {/* CHARTS SECTION (Pure High-Contrast Monochrome) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Chart 1: 30-Day Engagement Trend */}
        <div className={`p-4 rounded-xl border space-y-3 ${
          isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-neutral-950 border-neutral-800'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <div className={`text-xs font-mono uppercase ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
                Performance Telemetry
              </div>
              <h3 className={`text-sm font-semibold ${isLight ? 'text-black' : 'text-white'}`}>
                Engagement Trend (Last 30 Days)
              </h3>
            </div>
            <span className={`text-xs font-mono font-semibold ${isLight ? 'text-black' : 'text-white'}`}>
              Avg: 4.8% ER
            </span>
          </div>

          {/* SVG Monochrome Graph */}
          <div className="h-44 w-full pt-4">
            <svg viewBox="0 0 400 120" className="w-full h-full overflow-visible">
              <line x1="0" y1="20" x2="400" y2="20" stroke={isLight ? '#E5E5E5' : '#262626'} strokeDasharray="3,3" />
              <line x1="0" y1="60" x2="400" y2="60" stroke={isLight ? '#E5E5E5' : '#262626'} strokeDasharray="3,3" />
              <line x1="0" y1="100" x2="400" y2="100" stroke={isLight ? '#E5E5E5' : '#262626'} strokeDasharray="3,3" />

              <path
                d="M 10 75 Q 60 55, 120 40 T 200 48 T 280 25 T 350 30 L 390 32"
                fill="none"
                stroke={isLight ? '#000000' : '#FFFFFF'}
                strokeWidth="2.5"
              />

              <circle cx="120" cy="40" r="3.5" fill={isLight ? '#000000' : '#FFFFFF'} />
              <circle cx="280" cy="25" r="3.5" fill={isLight ? '#000000' : '#FFFFFF'} />
              <circle cx="390" cy="32" r="4.5" fill={isLight ? '#000000' : '#FFFFFF'} stroke={isLight ? '#FFFFFF' : '#000000'} strokeWidth="2" />
            </svg>
            <div className={`flex justify-between text-[10px] font-mono mt-1 ${isLight ? 'text-neutral-500' : 'text-neutral-500'}`}>
              <span>Day 1 (3.8%)</span>
              <span>Day 10 (4.4%)</span>
              <span>Day 20 (4.7%)</span>
              <span className={`font-semibold ${isLight ? 'text-black' : 'text-white'}`}>Today (4.8%)</span>
            </div>
          </div>
        </div>

        {/* Chart 2: Campaign Performance Comparison */}
        <div className={`p-4 rounded-xl border space-y-3 ${
          isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-neutral-950 border-neutral-800'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <div className={`text-xs font-mono uppercase ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
                Active Campaigns
              </div>
              <h3 className={`text-sm font-semibold ${isLight ? 'text-black' : 'text-white'}`}>
                Campaign Performance Benchmarks
              </h3>
            </div>
            <span className={`text-[10px] font-mono ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
              Spend vs CTR
            </span>
          </div>

          <div className="space-y-3 pt-1">
            {campaigns.map((camp) => {
              const isOrion = camp.id === 'campaign-orion';
              return (
                <div
                  key={camp.id}
                  onClick={() => setSelectedCampaignId(camp.id)}
                  className={`p-3 rounded-lg border transition-all cursor-pointer ${
                    isOrion
                      ? isLight
                        ? 'bg-neutral-100 border-neutral-400 shadow-sm'
                        : 'bg-neutral-900 border-neutral-600'
                      : isLight
                      ? 'bg-white border-neutral-200 hover:border-neutral-300'
                      : 'bg-black border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold ${isLight ? 'text-black' : 'text-white'}`}>
                        {camp.name}
                      </span>
                      {isOrion && (
                        <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded border font-semibold ${
                          isLight ? 'bg-black text-white border-black' : 'bg-white text-black border-white'
                        }`}>
                          Attention
                        </span>
                      )}
                    </div>
                    <div className={`text-xs font-mono font-semibold ${isLight ? 'text-neutral-800' : 'text-neutral-200'}`}>
                      Spend: {camp.spend}
                    </div>
                  </div>

                  <div className={`grid grid-cols-4 gap-2 text-[11px] font-mono ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
                    <div>
                      <span>Clicks: </span>
                      <strong className={isLight ? 'text-black' : 'text-white'}>{camp.clicks}</strong>
                    </div>
                    <div>
                      <span>CTR: </span>
                      <strong className={isOrion ? 'font-bold underline' : 'font-semibold'}>
                        {camp.ctr}
                      </strong>
                    </div>
                    <div>
                      <span>CPC: </span>
                      <strong className={isLight ? 'text-black' : 'text-white'}>{camp.cpc}</strong>
                    </div>
                    <div>
                      <span>Conv: </span>
                      <strong className={isLight ? 'text-black font-bold' : 'text-white font-bold'}>{camp.conversions}</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CONTENT PERFORMANCE & POSTING HEATMAP (Pure Monochrome) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Content Performance: Top vs Bottom */}
        <div className={`p-4 rounded-xl border space-y-3 ${
          isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-neutral-950 border-neutral-800'
        }`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-semibold ${isLight ? 'text-black' : 'text-white'}`}>
              Content Performance (Top vs. Bottom Assets)
            </h3>
            <span className={`text-[10px] font-mono ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
              Last 14 days
            </span>
          </div>

          <div className="space-y-2">
            <div className={`text-[10px] font-mono uppercase font-bold ${isLight ? 'text-neutral-700' : 'text-neutral-300'}`}>
              High-Performing Assets
            </div>
            <div className={`p-2.5 rounded-lg border space-y-1 ${
              isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-neutral-900 border-neutral-800'
            }`}>
              <div className="flex items-center justify-between text-xs">
                <span className={`font-semibold truncate ${isLight ? 'text-black' : 'text-white'}`}>
                  1. &ldquo;AuraOS Multi-Department Sync Demo&rdquo;
                </span>
                <span className={`font-mono font-bold ${isLight ? 'text-black' : 'text-white'}`}>4.1% CTR</span>
              </div>
              <div className={`flex items-center gap-3 text-[10px] font-mono ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
                <span>Format: Short-form Video (LinkedIn/IG)</span>
                <span>·</span>
                <span>ER: 9.4%</span>
                <span>·</span>
                <span className="font-semibold">High Qualified Intent</span>
              </div>
            </div>

            <div className={`p-2.5 rounded-lg border space-y-1 ${
              isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-neutral-900 border-neutral-800'
            }`}>
              <div className="flex items-center justify-between text-xs">
                <span className={`font-semibold truncate ${isLight ? 'text-black' : 'text-white'}`}>
                  2. &ldquo;Q3 Enterprise AI Benchmark Report&rdquo;
                </span>
                <span className={`font-mono font-bold ${isLight ? 'text-black' : 'text-white'}`}>3.8% CTR</span>
              </div>
              <div className={`flex items-center gap-3 text-[10px] font-mono ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
                <span>Format: PDF Carousel (LinkedIn)</span>
                <span>·</span>
                <span>ER: 7.8%</span>
                <span>·</span>
                <span className="font-semibold">C-Suite Downloads</span>
              </div>
            </div>

            <div className={`text-[10px] font-mono uppercase font-bold pt-2 ${isLight ? 'text-neutral-700' : 'text-neutral-300'}`}>
              Fatiguing / Underperforming Assets
            </div>
            <div className={`p-2.5 rounded-lg border space-y-1 ${
              isLight ? 'bg-neutral-100 border-neutral-300' : 'bg-neutral-900/60 border-neutral-700'
            }`}>
              <div className="flex items-center justify-between text-xs">
                <span className={`font-semibold truncate ${isLight ? 'text-black' : 'text-white'}`}>
                  Static Feature Grid Graphic A (Campaign Orion)
                </span>
                <span className={`font-mono font-bold ${isLight ? 'text-black' : 'text-white'}`}>1.6% CTR</span>
              </div>
              <div className={`flex items-center gap-3 text-[10px] font-mono ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
                <span>Format: Static Image (Meta Ads)</span>
                <span>·</span>
                <span>CPC: ₹22.10</span>
                <span>·</span>
                <span>Frequency: 4.8x (Fatigued)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Posting Time Heatmap (Pure Monochrome Grayscale) */}
        <div className={`p-4 rounded-xl border space-y-3 ${
          isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-neutral-950 border-neutral-800'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <div className={`text-xs font-mono uppercase ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
                Audience Engagement Windows
              </div>
              <h3 className={`text-sm font-semibold ${isLight ? 'text-black' : 'text-white'}`}>
                Posting Time Heatmap
              </h3>
            </div>
            <div className={`text-[11px] font-mono px-2 py-0.5 rounded border font-semibold ${
              isLight ? 'bg-black text-white border-black' : 'bg-white text-black border-white'
            }`}>
              Best Window: 10:00 AM – 12:00 PM
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[340px] space-y-1.5">
              <div className={`grid grid-cols-8 gap-1 text-[10px] font-mono text-center pb-1 ${
                isLight ? 'text-neutral-500' : 'text-neutral-400'
              }`}>
                <span>Day</span>
                <span>8-10A</span>
                <span className="font-bold underline">10-12P</span>
                <span>12-2P</span>
                <span>2-4P</span>
                <span>4-6P</span>
                <span>6-8P</span>
                <span>8-10P</span>
              </div>

              {HEATMAP_POSTING_DATA.map((row) => (
                <div key={row.day} className="grid grid-cols-8 gap-1 items-center text-center font-mono text-[10px]">
                  <span className={`text-left font-semibold ${isLight ? 'text-neutral-700' : 'text-neutral-400'}`}>{row.day}</span>
                  {[
                    row['8-10 AM'],
                    row['10-12 PM'],
                    row['12-2 PM'],
                    row['2-4 PM'],
                    row['4-6 PM'],
                    row['6-8 PM'],
                    row['8-10 PM'],
                  ].map((val, idx) => {
                    const isPeak = idx === 1; // 10-12 PM
                    const intensityDark = val > 90 ? 'bg-white text-black font-bold'
                                        : val > 75 ? 'bg-neutral-300 text-black font-semibold'
                                        : val > 55 ? 'bg-neutral-600 text-white'
                                        : val > 35 ? 'bg-neutral-800 text-neutral-300'
                                        : 'bg-neutral-900 text-neutral-500';

                    const intensityLight = val > 90 ? 'bg-black text-white font-bold'
                                         : val > 75 ? 'bg-neutral-700 text-white font-semibold'
                                         : val > 55 ? 'bg-neutral-400 text-black'
                                         : val > 35 ? 'bg-neutral-200 text-neutral-800'
                                         : 'bg-neutral-100 text-neutral-400';

                    return (
                      <div
                        key={idx}
                        className={`h-6 rounded flex items-center justify-center transition-transform hover:scale-105 ${
                          isLight ? intensityLight : intensityDark
                        } ${isPeak ? 'ring-1 ring-neutral-400' : ''}`}
                        title={`${row.day} window index: ${val}`}
                      >
                        {val}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          <div className={`flex items-center justify-between text-[10px] font-mono pt-1 ${
            isLight ? 'text-neutral-500' : 'text-neutral-400'
          }`}>
            <span>Low engagement (20-40)</span>
            <span className="font-semibold underline">Peak executive response (80-98)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
