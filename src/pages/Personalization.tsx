import React, { useState } from 'react';
import { TopBar } from '../components/TopBar';
import { ChannelBadge } from '../components/ChannelBadge';
import {
  SparklesIcon,
  RefreshCwIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  CopyIcon,
  SendIcon,
  ChevronDownIcon,
  ZapIcon,
  UserIcon,
  BuildingIcon,
  MessageSquareIcon,
  TrendingUpIcon,
  AlertCircleIcon,
  CheckCircleIcon } from
'lucide-react';
const accounts = [
{
  name: 'Acme Corp',
  persona: 'VP of Sales',
  industry: 'SaaS',
  score: 92
},
{
  name: 'TechFlow Inc.',
  persona: 'CTO',
  industry: 'FinTech',
  score: 87
},
{
  name: 'DataBridge Co.',
  persona: 'Head of RevOps',
  industry: 'Analytics',
  score: 74
},
{
  name: 'Nexus Systems',
  persona: 'CEO',
  industry: 'Enterprise',
  score: 81
}];

const contextSignals = [
{
  type: 'Recent News',
  value: 'Raised $28M Series B — scaling sales team',
  icon: TrendingUpIcon,
  color: 'text-blue-500 bg-blue-50'
},
{
  type: 'Product Usage',
  value: 'Active in reporting module, 3x this week',
  icon: ZapIcon,
  color: 'text-violet-500 bg-violet-50'
},
{
  type: 'Objection History',
  value: 'Previously concerned about implementation time',
  icon: AlertCircleIcon,
  color: 'text-amber-500 bg-amber-50'
},
{
  type: 'Engagement',
  value: 'Opened 6 emails, clicked pricing page twice',
  icon: CheckCircleIcon,
  color: 'text-emerald-500 bg-emerald-50'
}];

const channelVariants = [
{
  channel: 'email' as const,
  subject: 'Congrats on the Series B, [Name] — quick thought',
  body: `Hi Sarah,

Congrats on the $28M raise — that's a huge milestone for TechFlow.

Scaling a sales team from 12 to 40+ reps is exciting, but I've seen a lot of companies hit a wall when their GTM signals don't keep up with headcount.

We help teams like yours surface the right accounts at the right time — automatically. Given your recent growth, I thought it might be worth a 15-min chat.

Worth a quick call this week?

Best,
Ahmed`,
  tone: 'Professional · Congratulatory',
  score: 94
},
{
  channel: 'linkedin' as const,
  subject: 'LinkedIn Message',
  body: `Hi Sarah — saw the Series B news, congrats! 🎉

Quick question: as you scale the sales team, how are you thinking about signal-based prioritization? We've helped 3 similar-stage companies 2x their pipeline quality.

Happy to share what's worked — open to a quick chat?`,
  tone: 'Casual · Direct',
  score: 88
},
{
  channel: 'sms' as const,
  subject: 'SMS',
  body: `Hi Sarah, Ahmed from Kawaf. Congrats on the funding! Saw you're scaling sales — we help teams like TechFlow prioritize the right accounts. Worth 10 mins? Reply YES to book.`,
  tone: 'Brief · Action-oriented',
  score: 71
}];

export function Personalization() {
  const [selectedAccount, setSelectedAccount] = useState(0);
  const [selectedChannel, setSelectedChannel] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 1500);
  };
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const variant = channelVariants[selectedChannel];
  return (
    <div className="flex-1 overflow-y-auto bg-[#F8FAFC]">
      <TopBar
        title="AI Personalization Engine"
        subtitle="Dynamic 1:1 context-aware messaging across all channels" />


      <div className="p-6 space-y-5">
        {/* Engine status */}
        <div className="bg-gradient-to-r from-violet-600 to-blue-600 rounded-xl p-5 text-white">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <SparklesIcon className="w-4 h-4" />
                <span className="text-sm font-semibold">
                  Self-Tuning Engine Active
                </span>
              </div>
              <p className="text-sm text-white/80 max-w-lg">
                AI is continuously refining messaging based on engagement
                signals. Last optimization: 2 hours ago — improved reply rates
                by 8% for SaaS segment.
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-2xl font-bold">+34%</div>
              <div className="text-xs text-white/70">Reply rate lift</div>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4 text-xs text-white/70">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Models trained on 12,400 interactions
            </span>
            <span>·</span>
            <span>3 segments optimized today</span>
            <span>·</span>
            <span>Channel-specific tone adaptation enabled</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Account selector */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-900">
              Select Account
            </h3>
            {accounts.map((acc, i) =>
            <button
              key={i}
              onClick={() => setSelectedAccount(i)}
              className={`w-full text-left bg-white rounded-xl border shadow-sm p-4 transition-all ${selectedAccount === i ? 'border-violet-200 ring-1 ring-violet-100' : 'border-gray-100 hover:border-gray-200'}`}>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-sm font-bold text-slate-600 flex-shrink-0">
                    {acc.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-900">
                        {acc.name}
                      </span>
                      <span
                      className={`text-xs font-bold ${acc.score >= 80 ? 'text-emerald-600' : 'text-amber-600'}`}>

                        {acc.score}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {acc.persona} · {acc.industry}
                    </p>
                  </div>
                </div>
              </button>
            )}

            {/* Context signals */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <h4 className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                Context Signals
              </h4>
              <div className="space-y-2.5">
                {contextSignals.map((sig, i) => {
                  const Icon = sig.icon;
                  return (
                    <div key={i} className="flex items-start gap-2.5">
                      <div
                        className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 ${sig.color.split(' ')[1]}`}>

                        <Icon
                          className={`w-3 h-3 ${sig.color.split(' ')[0]}`} />

                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">
                          {sig.type}
                        </p>
                        <p className="text-xs text-gray-700 leading-snug">
                          {sig.value}
                        </p>
                      </div>
                    </div>);

                })}
              </div>
            </div>
          </div>

          {/* Message composer */}
          <div className="lg:col-span-2 space-y-3">
            {/* Channel tabs */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-900 mr-1">
                Channel:
              </span>
              {channelVariants.map((v, i) =>
              <button
                key={i}
                onClick={() => setSelectedChannel(i)}
                className={`transition-all ${selectedChannel === i ? 'ring-2 ring-offset-1 ring-blue-300 rounded-full' : ''}`}>

                  <ChannelBadge channel={v.channel} size="md" />
                </button>
              )}
            </div>

            {/* Message card */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <SparklesIcon className="w-4 h-4 text-violet-500" />
                    <span className="text-sm font-semibold text-gray-900">
                      AI-Generated Message
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">
                      {variant.tone}
                    </span>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {variant.score}% fit score
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleRegenerate}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-all ${isGenerating ? 'opacity-60' : ''}`}>

                  <RefreshCwIcon
                    className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />

                  {isGenerating ? 'Generating...' : 'Regenerate'}
                </button>
              </div>

              {variant.subject !== 'LinkedIn Message' &&
              variant.subject !== 'SMS' &&
              <div className="mb-3 pb-3 border-b border-gray-100">
                    <span className="text-xs font-medium text-gray-500">
                      Subject:{' '}
                    </span>
                    <span className="text-xs font-semibold text-gray-800">
                      {variant.subject}
                    </span>
                  </div>
              }

              <div
                className={`text-sm text-gray-700 leading-relaxed whitespace-pre-line bg-gray-50 rounded-lg p-4 font-mono text-xs ${isGenerating ? 'opacity-40' : ''}`}>

                {variant.body}
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                    <ThumbsUpIcon className="w-3.5 h-3.5" /> Good
                  </button>
                  <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <ThumbsDownIcon className="w-3.5 h-3.5" /> Improve
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">

                    <CopyIcon className="w-3.5 h-3.5" />
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors">
                    <SendIcon className="w-3.5 h-3.5" /> Send Now
                  </button>
                </div>
              </div>
            </div>

            {/* Tone & format controls */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <h4 className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                Tone & Format Controls
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1.5 block">
                    Tone
                  </label>
                  <div className="flex gap-1.5 flex-wrap">
                    {['Professional', 'Casual', 'Urgent', 'Empathetic'].map(
                      (t) =>
                      <button
                        key={t}
                        className={`px-2.5 py-1 text-xs rounded-lg border transition-all ${t === 'Professional' ? 'bg-blue-50 border-blue-200 text-blue-700 font-medium' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'}`}>

                          {t}
                        </button>

                    )}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1.5 block">
                    Length
                  </label>
                  <div className="flex gap-1.5">
                    {['Short', 'Medium', 'Long'].map((l) =>
                    <button
                      key={l}
                      className={`px-2.5 py-1 text-xs rounded-lg border transition-all ${l === 'Medium' ? 'bg-blue-50 border-blue-200 text-blue-700 font-medium' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'}`}>

                        {l}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}