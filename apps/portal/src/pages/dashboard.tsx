import React from 'react';

// Devopstrio AVD Network Isolation
// Infrastructure Operations & Security Topology Command Center

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30">
            {/* Global Infrastructure Header */}
            <header className="border-b border-white/5 bg-black/40 backdrop-blur-3xl sticky top-0 z-50">
                <div className="max-w-screen-2xl mx-auto px-10 h-24 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center font-black text-white shadow-[0_0_25px_rgba(37,99,235,0.4)] border border-white/10 group relative">
                            NI
                            <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-white tracking-widest leading-none">NETWORK ISOLATION</h1>
                            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em] mt-2">Zero-Trust Backbone</p>
                        </div>
                    </div>
                    <nav className="flex gap-12 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                        <a href="#" className="text-blue-400 border-b-2 border-blue-500 pb-10 pt-10">Global Topology</a>
                        <a href="#" className="hover:text-white transition-all pt-10 pb-10">Secure Segments</a>
                        <a href="#" className="hover:text-white transition-all pt-10 pb-10">Firewall Policies</a>
                        <a href="#" className="hover:text-white transition-all pt-10 pb-10">DNS Resolver</a>
                        <a href="#" className="hover:text-white transition-all pt-10 pb-10">Connectivity</a>
                    </nav>
                </div>
            </header>

            <main className="max-w-screen-2xl mx-auto px-10 py-12">

                {/* Infrastructure Performance Scorecards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
                    {[
                        { label: 'Active Segments', value: '142', status: 'Fully Isolated', color: 'blue' },
                        { label: 'Firewall Throughput', value: '4.2GB/s', status: 'Load Balanced', color: 'cyan' },
                        { label: 'Global Latency (P99)', value: '12.4ms', status: 'Optimized', color: 'emerald' },
                        { label: 'Threats Blocked (24h)', value: '1,420', status: 'Active IDPS', color: 'rose' }
                    ].map((kpi, idx) => (
                        <div key={idx} className="bg-slate-900/40 p-10 rounded-[2.5rem] border border-white/5 hover:border-blue-500/40 transition-all shadow-2xl relative group overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/10 transition-all"></div>
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-4">{kpi.label}</span>
                            <div className="text-4xl font-black text-white tracking-tighter mb-4 font-mono">{kpi.value}</div>
                            <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full bg-${kpi.color}-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]`}></div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{kpi.status}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Regional Topology Intelligence */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">

                    {/* Visual Topology Map Placeholder */}
                    <div className="xl:col-span-2 bg-slate-900 p-12 rounded-[3.5rem] border border-white/5 shadow-2xl relative overflow-hidden flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-12">
                            <div>
                                <h2 className="text-3xl font-black text-white tracking-tight">Multi-Region Hub-Spoke Grid</h2>
                                <p className="text-slate-400 text-sm mt-2 max-w-md">Detailed view of regional VNET peerings and transit routes through central firewall clusters.</p>
                            </div>
                            <div className="flex gap-4">
                                <button className="bg-black hover:bg-slate-800 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border border-white/5">
                                    Export BGP Map
                                </button>
                                <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-900/40">
                                    New Isolated Segment
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 flex items-center justify-center py-20 bg-black/20 rounded-[2.5rem] border border-dashed border-white/10 group relative">
                            {/* Abstract Topology Representation */}
                            <div className="w-24 h-24 bg-blue-600 rounded-2xl flex items-center justify-center font-black text-white shadow-2xl z-10 border border-white/20">HUB</div>
                            <div className="absolute w-[400px] h-[400px] border border-white/5 rounded-full animate-spin-slow"></div>

                            {[0, 90, 180, 270].map((deg, i) => (
                                <div key={i} className="absolute flex flex-col items-center gap-4" style={{ transform: `rotate(${deg}deg) translateY(-180px) rotate(-${deg}deg)` }}>
                                    <div className="w-16 h-16 bg-slate-800 rounded-xl border border-white/10 flex items-center justify-center text-[10px] font-black text-slate-400">SPOKE</div>
                                    <div className="w-0.5 h-12 bg-gradient-to-b from-blue-500 to-transparent"></div>
                                </div>
                            ))}

                            <div className="absolute inset-0 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>
                        </div>

                        <div className="mt-12 grid grid-cols-4 gap-8">
                            {[
                                { region: 'UK South', spokes: 22, health: 'Optimized' },
                                { region: 'US East 2', spokes: 14, health: 'Scaling' },
                                { region: 'West Europe', spokes: 42, health: 'Optimized' },
                                { region: 'Japan East', spokes: 4, health: 'Standby' }
                            ].map((reg, idx) => (
                                <div key={idx} className="p-4 bg-black/40 rounded-2xl border border-white/5">
                                    <div className="text-[9px] font-black text-slate-500 uppercase mb-2">{reg.region}</div>
                                    <div className="text-xl font-black text-white font-mono">{reg.spokes}</div>
                                    <div className="text-[8px] font-bold text-blue-400 mt-1 uppercase italic">{reg.health}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Security Policy Stack */}
                    <div className="flex flex-col gap-10">
                        <div className="bg-slate-900 p-10 rounded-[3rem] border border-white/5 shadow-2xl flex-1 flex flex-col">
                            <h3 className="text-xl font-black text-white uppercase tracking-wider mb-8 border-b border-blue-500/20 pb-6 flex items-center justify-between">
                                Security Enforcements
                                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">AUTO-REVERT ON</span>
                            </h3>
                            <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                {[
                                    { label: 'Deny Public IP Assignment', status: 'Enforced', color: 'emerald' },
                                    { label: 'Mandatory UDR Hijack (Hub FW)', status: 'Enforced', color: 'emerald' },
                                    { label: 'Private Link Mandate (Storage)', status: 'Enforced', color: 'emerald' },
                                    { label: 'BGP Propagation Cut-off', status: 'Warning', color: 'amber' },
                                    { label: 'Lateral Movement Block (East-West)', status: 'Enforced', color: 'emerald' }
                                ].map((policy, idx) => (
                                    <div key={idx} className="flex justify-between items-center py-2 group cursor-pointer border-b border-white/5">
                                        <span className="text-xs font-bold text-slate-300 group-hover:text-blue-400 transition-colors">{policy.label}</span>
                                        <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest bg-${policy.color}-500/10 text-${policy.color}-400`}>{policy.status}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 p-6 bg-blue-600/5 rounded-2xl border border-blue-500/20">
                                <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                                    <span className="text-blue-400 font-black uppercase block mb-1">Architectural Hint</span>
                                    "Your US East isolation zone is nearing address space saturation. 88% allocated."
                                </p>
                            </div>
                        </div>

                        <div className="bg-slate-900 p-8 rounded-[3rem] border border-white/5 shadow-2xl">
                            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">DNS Resolver Health</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
                                    <div className="text-[9px] font-black text-slate-500 uppercase mb-1">Latency</div>
                                    <div className="text-2xl font-black text-white font-mono tracking-tighter">0.4ms</div>
                                </div>
                                <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
                                    <div className="text-[9px] font-black text-slate-500 uppercase mb-1">Success</div>
                                    <div className="text-2xl font-black text-emerald-400 font-mono tracking-tighter">100%</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Sub-Internal Diagnostics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
                    <div className="bg-slate-900 p-10 rounded-[3.5rem] border border-white/5 shadow-xl">
                        <div className="flex justify-between items-center mb-10">
                            <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Connectivity Path Trace</h5>
                            <span className="text-[9px] font-bold text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full">Active Probe</span>
                        </div>
                        <div className="space-y-4">
                            {[
                                { node: 'VDI Session Host', status: 'Success', dur: '0.1ms' },
                                { node: 'Spoke VNET - Gateway Subnet', status: 'Success', dur: '0.4ms' },
                                { node: 'Azure Firewall (L7 Inspection)', status: 'Success', dur: '4.2ms' },
                                { node: 'Corporate MPLS Gateway', status: 'Success', dur: '12.1ms' },
                                { node: 'On-Prem Database Cluster', status: 'Success', dur: '28.4ms' }
                            ].map((hop, i) => (
                                <div key={i} className="flex items-center gap-6">
                                    <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center text-[10px] font-bold text-blue-400 border border-blue-500/20">{i + 1}</div>
                                    <div className="flex-1 flex justify-between items-center border-b border-white/5 pb-2">
                                        <span className="text-xs font-bold text-slate-300">{hop.node}</span>
                                        <span className="text-[10px] font-black text-slate-500 font-mono">{hop.dur}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-900 p-10 rounded-[3.5rem] border border-white/5 shadow-xl flex flex-col justify-between group">
                        <div>
                            <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 leading-none">Security Posture Trend</h5>
                            <div className="text-4xl font-black text-white tracking-tighter mb-4 font-mono group-hover:text-blue-400 transition-colors">98.2%</div>
                            <p className="text-xs font-medium text-slate-500 leading-relaxed">System-wide isolation score based on NSG coverage, Private Link density, and Firewall hit validation.</p>
                        </div>
                        <div className="mt-8 flex gap-2 h-16 items-end px-2">
                            {[12, 45, 67, 34, 89, 92, 94, 98, 92, 88, 96, 98, 99].map((v, i) => (
                                <div key={i} className="flex-1 bg-blue-500/30 rounded-t-sm hover:bg-blue-500 transition-all cursor-pointer" style={{ height: `${v}%` }}></div>
                            ))}
                        </div>
                        <button className="w-full mt-10 bg-white hover:bg-slate-200 text-black text-[11px] font-black py-4 rounded-2xl uppercase tracking-widest transition-all">
                            Initialize Global Hardening Sync
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
