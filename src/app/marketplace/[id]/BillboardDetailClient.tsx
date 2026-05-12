"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Star, Shield, MapPin, TrendingUp, Users, Calendar, Award, Eye, Zap, BarChart2, Clock, CheckCircle, ChevronRight, Download } from "lucide-react";
import type { Billboard } from "../data";

function ScoreRing({ value, label, color }: { value: number; label: string; color: string }) {
  const r = 28, c = 2 * Math.PI * r;
  const dash = (value / 100) * c;
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="72" height="72" className="-rotate-90">
        <circle cx="36" cy="36" r={r} fill="none" stroke="#e5e7eb" strokeWidth="6" />
        <circle cx="36" cy="36" r={r} fill="none" stroke={color} strokeWidth="6"
          strokeDasharray={`${dash} ${c}`} strokeLinecap="round" className="transition-all duration-1000" />
      </svg>
      <span className="text-lg font-bold -mt-12 relative z-10" style={{ color }}>{value}</span>
      <span className="text-[10px] text-gray-500 mt-1 text-center leading-tight">{label}</span>
    </div>
  );
}

function Bar({ h, label, peak }: { h: number; label: string; peak: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1 flex-1">
      <div className="w-full flex items-end justify-center" style={{ height: 60 }}>
        <div className="w-full rounded-t-sm transition-all duration-700"
          style={{ height: `${Math.max(4, h)}%`, background: peak ? "#6366f1" : "#e0e7ff" }} />
      </div>
      <span className="text-[9px] text-gray-400">{label}</span>
    </div>
  );
}

export default function BillboardDetailClient({ billboard: bb, allBillboards }: { billboard: Billboard; allBillboards: Billboard[] }) {
  const [roiBudget, setRoiBudget] = useState(10000);
  const [roiDays, setRoiDays] = useState(30);
  const [activeTab, setActiveTab] = useState<"overview"|"traffic"|"campaigns"|"market">("overview");

  const totalImpressions = Math.round((bb.impressions * roiDays));
  const reach = Math.round(totalImpressions * 0.35);
  const cpm = ((roiBudget / totalImpressions) * 1000).toFixed(2);
  const brand_recall = Math.min(99, Math.round(40 + roiDays * 0.8 + bb.scores.visibility * 0.3));

  const maxHourly = Math.max(...bb.traffic.hourly);
  const peers = allBillboards.filter(b => b.id !== bb.id && b.type === bb.type).slice(0, 3);

  const avail = bb.availability === "available" ? { label: "Available Now", bg: "bg-emerald-100", text: "text-emerald-700", dot: "bg-emerald-500" }
    : bb.availability === "upcoming" ? { label: "Available Soon", bg: "bg-amber-100", text: "text-amber-700", dot: "bg-amber-500" }
    : { label: "Booked", bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500" };

  const TABS = ["overview","traffic","campaigns","market"] as const;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/60 px-4 py-3 flex items-center gap-3">
        <Link href="/marketplace" className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Marketplace
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-sm text-slate-800 font-semibold truncate">{bb.title}</span>
        <div className="ml-auto flex items-center gap-2">
          <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${avail.bg} ${avail.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${avail.dot} animate-pulse`} />{avail.label}
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Hero */}
        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 rounded-2xl overflow-hidden relative h-72 lg:h-auto shadow-xl">
            <img src={bb.image} alt={bb.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-5 text-white">
              <div className="flex items-center gap-2 text-xs mb-1 opacity-80">
                <MapPin className="w-3 h-3" />{bb.location}
              </div>
              <h1 className="text-2xl font-bold leading-tight">{bb.title}</h1>
              <div className="flex items-center gap-3 mt-2 text-sm">
                <span className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">{bb.size} ft</span>
                <span className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">{bb.type}</span>
                <span className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">{bb.facing} Facing</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            {/* Price card */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-extrabold text-indigo-600">₹{bb.price.toLocaleString()}</span>
                <span className="text-sm text-slate-500 font-medium">/day</span>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-3">
                {[["Weekly", `₹${(bb.price*7*0.9).toLocaleString()}`],["Monthly", `₹${(bb.price*30*0.8).toLocaleString()}`],["CPM", `₹${((bb.price/bb.impressions)*1000).toFixed(1)}`]].map(([l,v])=>(
                  <div key={l} className="bg-slate-50 rounded-xl p-2.5 text-center">
                    <div className="text-xs text-slate-500">{l}</div>
                    <div className="text-sm font-bold text-slate-800">{v}</div>
                  </div>
                ))}
              </div>
              <div className={`mt-3 flex items-center gap-2 text-xs font-medium rounded-xl px-3 py-2 ${bb.market.priceVsAvg < 0 ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                <TrendingUp className="w-3.5 h-3.5" />
                {Math.abs(bb.market.priceVsAvg)}% {bb.market.priceVsAvg < 0 ? "below" : "above"} market average
              </div>
              <button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm shadow-md shadow-indigo-200">
                Book This Billboard
              </button>
            </div>

            {/* Vendor */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg">
                {bb.vendor.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-slate-800 text-sm truncate">{bb.vendor.name}</span>
                  {bb.vendor.verified && <Shield className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                  <div className="flex items-center gap-0.5">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="font-medium">{bb.vendor.rating}</span>
                  </div>
                  <span>·</span><span>{bb.vendor.totalListings} listings</span>
                  <span>·</span><span>Since {bb.vendor.since}</span>
                </div>
              </div>
              <div className="text-right text-xs text-slate-500">
                <Clock className="w-3 h-3 inline mr-1" />{bb.vendor.responseTime}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-2xl p-1.5 shadow-sm border border-slate-100">
          {TABS.map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`flex-1 py-2 px-3 rounded-xl text-sm font-semibold capitalize transition-all ${activeTab===t?"bg-indigo-600 text-white shadow-md":"text-slate-500 hover:text-slate-800"}`}>
              {t}
            </button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-5">
            {/* Scores */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Award className="w-4 h-4 text-indigo-500"/>Visibility & Design Scores</h2>
              <div className="grid grid-cols-5 gap-2">
                {[
                  {l:"Visibility",v:bb.scores.visibility,c:"#6366f1"},
                  {l:"Readability",v:bb.scores.readability,c:"#8b5cf6"},
                  {l:"Dwell Time",v:bb.scores.dwellTime,c:"#06b6d4"},
                  {l:"Illumination",v:bb.scores.illumination,c:"#f59e0b"},
                  {l:"Angle",v:bb.scores.angle,c:"#10b981"},
                ].map(s=><ScoreRing key={s.l} value={s.v} label={s.l} color={s.c}/>)}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="bg-indigo-50 rounded-xl p-3 text-center">
                  <div className="text-2xl font-extrabold text-indigo-600">{Math.round(Object.values(bb.scores).reduce((a,b)=>a+b,0)/5)}</div>
                  <div className="text-xs text-indigo-600 font-medium">Overall Score</div>
                </div>
                <div className="bg-amber-50 rounded-xl p-3 text-center">
                  <div className="text-2xl font-extrabold text-amber-600">{bb.weatherScore}</div>
                  <div className="text-xs text-amber-600 font-medium">Weather Resilience</div>
                </div>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {icon:<Eye className="w-5 h-5 text-indigo-500"/>,label:"Daily Impressions",value:bb.impressions.toLocaleString(),sub:"avg/day"},
                {icon:<TrendingUp className="w-5 h-5 text-emerald-500"/>,label:"Campaigns Run",value:bb.campaigns.totalRuns,sub:"total all-time"},
                {icon:<Users className="w-5 h-5 text-violet-500"/>,label:"Renewal Rate",value:`${bb.campaigns.renewalRate}%`,sub:"advertisers return"},
                {icon:<Zap className="w-5 h-5 text-amber-500"/>,label:"Market Rank",value:`#${bb.market.rank}`,sub:`of ${bb.market.totalInArea} in area`},
              ].map(s=>(
                <div key={s.label} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                  <div className="flex items-center justify-between mb-2">{s.icon}<span className="text-xs text-slate-400">{s.sub}</span></div>
                  <div className="text-2xl font-extrabold text-slate-800">{s.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Demographics */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Users className="w-4 h-4 text-violet-500"/>Audience Demographics</h2>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs bg-violet-100 text-violet-700 font-semibold px-2 py-0.5 rounded-full">Income Zone: {bb.demographics.incomeZone}</span>
              </div>
              <div className="space-y-2">
                {[
                  {l:"Two-Wheeler",v:bb.demographics.twoWheeler,c:"#6366f1"},
                  {l:"Car / SUV",v:bb.demographics.car,c:"#8b5cf6"},
                  {l:"Bus / Transit",v:bb.demographics.bus,c:"#06b6d4"},
                  {l:"Pedestrian",v:bb.demographics.pedestrian,c:"#10b981"},
                ].map(d=>(
                  <div key={d.l} className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 w-24 shrink-0">{d.l}</span>
                    <div className="flex-1 bg-slate-100 rounded-full h-2.5">
                      <div className="h-2.5 rounded-full transition-all duration-700" style={{width:`${d.v}%`,background:d.c}}/>
                    </div>
                    <span className="text-xs font-bold text-slate-700 w-8 text-right">{d.v}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TRAFFIC TAB */}
        {activeTab === "traffic" && (
          <div className="space-y-5">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <h2 className="font-bold text-slate-800 mb-1 flex items-center gap-2"><BarChart2 className="w-4 h-4 text-indigo-500"/>Hourly Traffic Pattern</h2>
              <p className="text-xs text-slate-500 mb-4">Peak: {bb.traffic.peakHour}</p>
              <div className="flex items-end gap-0.5 h-16">
                {bb.traffic.hourly.map((v,i)=>(
                  <Bar key={i} h={(v/maxHourly)*100} label={i%4===0?`${i}h`:""} peak={v===maxHourly}/>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                {l:"Weekday Avg",v:bb.traffic.weekdayAvg.toLocaleString(),icon:"📅"},
                {l:"Weekend Avg",v:bb.traffic.weekendAvg.toLocaleString(),icon:"🏖️"},
              ].map(s=>(
                <div key={s.l} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 text-center">
                  <div className="text-3xl mb-2">{s.icon}</div>
                  <div className="text-2xl font-extrabold text-slate-800">{s.v}</div>
                  <div className="text-xs text-slate-500 mt-1">{s.l} impressions</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CAMPAIGNS TAB */}
        {activeTab === "campaigns" && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {l:"Total Campaigns",v:bb.campaigns.totalRuns},
                {l:"Avg Duration",v:`${bb.campaigns.avgDuration} days`},
                {l:"Renewal Rate",v:`${bb.campaigns.renewalRate}%`},
                {l:"Est. Avg CTR",v:`${bb.campaigns.avgCTR}%`},
              ].map(s=>(
                <div key={s.l} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-center">
                  <div className="text-2xl font-extrabold text-indigo-600">{s.v}</div>
                  <div className="text-xs text-slate-500 mt-1">{s.l}</div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <h2 className="font-bold text-slate-800 mb-4">Past Advertisers</h2>
              <div className="flex flex-wrap gap-2">
                {bb.campaigns.topBrands.map(b=>(
                  <span key={b} className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                    <CheckCircle className="w-3 h-3"/>{b}
                  </span>
                ))}
              </div>
            </div>

            {/* ROI Calculator */}
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-6 text-white shadow-xl">
              <h2 className="font-bold text-lg mb-1 flex items-center gap-2"><Zap className="w-5 h-5"/>AI ROI Calculator</h2>
              <p className="text-indigo-200 text-xs mb-5">Estimate your campaign returns</p>
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="text-xs text-indigo-200 mb-1.5 block">Budget (₹)</label>
                  <input type="number" value={roiBudget} onChange={e=>setRoiBudget(+e.target.value)}
                    className="w-full bg-white/15 border border-white/20 rounded-xl px-3 py-2.5 text-white font-semibold text-sm outline-none focus:ring-2 focus:ring-white/40"/>
                </div>
                <div>
                  <label className="text-xs text-indigo-200 mb-1.5 block">Duration (days)</label>
                  <input type="number" value={roiDays} onChange={e=>setRoiDays(+e.target.value)}
                    className="w-full bg-white/15 border border-white/20 rounded-xl px-3 py-2.5 text-white font-semibold text-sm outline-none focus:ring-2 focus:ring-white/40"/>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  {l:"Total Impressions",v:totalImpressions.toLocaleString()},
                  {l:"Estimated Reach",v:reach.toLocaleString()},
                  {l:"CPM",v:`₹${cpm}`},
                ].map(r=>(
                  <div key={r.l} className="bg-white/15 rounded-xl p-3 text-center">
                    <div className="text-lg font-extrabold">{r.v}</div>
                    <div className="text-[10px] text-indigo-200 mt-0.5">{r.l}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3 bg-white/15 rounded-xl p-3 flex items-center justify-between">
                <span className="text-xs text-indigo-200">Estimated Brand Recall Score</span>
                <span className="text-lg font-extrabold">{brand_recall}/100</span>
              </div>
            </div>
          </div>
        )}

        {/* MARKET TAB */}
        {activeTab === "market" && (
          <div className="space-y-5">
            <div className="grid grid-cols-3 gap-4">
              {[
                {l:"Area Rank",v:`#${bb.market.rank}`,sub:`of ${bb.market.totalInArea}`},
                {l:"Percentile",v:`${bb.market.percentile}th`,sub:"top performers"},
                {l:"vs Market Price",v:`${bb.market.priceVsAvg>0?"+":""}${bb.market.priceVsAvg}%`,sub:"price comparison"},
              ].map(s=>(
                <div key={s.l} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-center">
                  <div className={`text-2xl font-extrabold ${bb.market.priceVsAvg<0&&s.l.includes("vs")?"text-emerald-600":"text-indigo-600"}`}>{s.v}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{s.l}</div>
                  <div className="text-[10px] text-slate-400">{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Peer comparison */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <h2 className="font-bold text-slate-800 mb-4">Similar {bb.type} Billboards Nearby</h2>
              <div className="space-y-3">
                {/* Current */}
                <div className="flex items-center gap-3 bg-indigo-50 rounded-xl p-3 border border-indigo-200">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-bold">★</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-indigo-800 truncate">{bb.title}</div>
                    <div className="text-xs text-indigo-600">{bb.impressions.toLocaleString()} impressions/day</div>
                  </div>
                  <span className="text-sm font-bold text-indigo-700">₹{bb.price}/day</span>
                </div>
                {peers.map((p,i)=>(
                  <Link href={`/marketplace/${p.id}`} key={p.id} className="flex items-center gap-3 rounded-xl p-3 border border-slate-100 hover:bg-slate-50 transition-colors">
                    <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 text-xs flex items-center justify-center font-bold">{i+2}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-700 truncate">{p.title}</div>
                      <div className="text-xs text-slate-400">{p.impressions.toLocaleString()} impressions/day</div>
                    </div>
                    <span className="text-sm font-semibold text-slate-600">₹{p.price}/day</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Media Kit */}
            <button className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-indigo-300 rounded-2xl py-4 text-indigo-600 font-semibold text-sm hover:bg-indigo-50 transition-colors">
              <Download className="w-4 h-4"/>Download Media Kit PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
