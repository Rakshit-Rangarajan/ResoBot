'use client'

import { useState } from 'react'
import { ChatbotWidget } from '@/components/chatbot-widget'
import { Code, Copy, Check, Terminal, Palette, Database, Bot, Zap, Shield, Globe } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Home() {
  const [config, setConfig] = useState({
    botName: 'ResoBot',
    primaryColor: '#7c3aed', // Original Purple
    index: 'resollect-brain',
  })
  const [copied, setCopied] = useState(false)

  const snippet = `<script>
  window.ResoBotConfig = {
    botName: "${config.botName}",
    primaryColor: "${config.primaryColor}",
    index: "${config.index}"
  };
</script>

<script src="https://chatbot.rakshit.co.in/chatbot-embed.js" async></script>`.trim()

  const copyToClipboard = () => {
    navigator.clipboard.writeText(snippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-purple-500/30">
      {/* Navigation */}
      <nav className="border-b border-white/5 bg-[#1e293b]/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Bot className="text-white w-6 h-6" />
            </div>
            <span className="font-extrabold text-white tracking-tight text-2xl ml-1">
              Reso<span className="text-purple-500">Bot</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-bold uppercase tracking-widest text-slate-400">
             {/* <span className="hover:text-purple-400 cursor-pointer transition-colors">Documentation</span> */}
             {/* <span className="hover:text-purple-400 cursor-pointer transition-colors">API Keys</span> */}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-24">
          <h1 className="text-6xl sm:text-8xl font-black mb-6 tracking-tighter leading-none text-white">
            Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">AI Memory</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            A simple, secure, and customizable widget for local LLMs. 
            Keep your data private and your UI beautiful.
          </p>
        </div>

        {/* --- CONFIGURATOR SECTION --- */}
        <div className="grid lg:grid-cols-2 gap-12 mb-24 items-start">
          
          {/* Left: Input Controls */}
          <div className="space-y-8 bg-[#1e293b]/40 p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-sm shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Palette className="text-purple-400 w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-white">Widget Stylist</h2>
            </div>

            <div className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="botName" className="text-purple-300 font-bold text-sm uppercase tracking-wider">
                    Assistant Name
                </Label>
                <Input 
                  id="botName" 
                  value={config.botName} 
                  onChange={(e) => setConfig({...config, botName: e.target.value})}
                  className="bg-[#0f172a] border-white/10 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-purple-500/50 h-14 text-lg rounded-xl"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-purple-300 font-bold text-sm uppercase tracking-wider">
                    Primary Branding
                </Label>
                <div className="flex gap-4">
                  <Input 
                    type="color" 
                    className="w-24 h-14 p-1 rounded-xl cursor-pointer bg-[#0f172a] border-white/10"
                    value={config.primaryColor} 
                    onChange={(e) => setConfig({...config, primaryColor: e.target.value})}
                  />
                  <Input 
                    value={config.primaryColor} 
                    onChange={(e) => setConfig({...config, primaryColor: e.target.value})}
                    className="font-mono bg-[#0f172a] border-white/10 text-purple-400 h-14 text-lg rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="index" className="text-purple-300 font-bold text-sm uppercase tracking-wider">
                    Vector Index Name
                </Label>
                <Input 
                  id="index" 
                  value={config.index} 
                  onChange={(e) => setConfig({...config, index: e.target.value})}
                  className="bg-[#0f172a] border-white/10 text-white h-14 text-lg rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Right: Code Generation */}
          <div className="space-y-8">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-cyan-500/20 rounded-lg">
                      <Terminal className="text-cyan-400 w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Embed Script</h2>
                </div>
                <button 
                  onClick={copyToClipboard}
                  className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl font-bold transition-all active:scale-95 shadow-xl shadow-purple-900/20 flex items-center gap-2"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  {copied ? 'COPIED' : 'COPY CODE'}
                </button>
            </div>

            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-[2rem] blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
                <div className="relative bg-[#020617] rounded-[1.8rem] p-8 border border-white/10">
                    <pre className="text-sm md:text-base font-mono leading-relaxed text-cyan-50 overflow-x-auto selection:bg-cyan-500/40">
                        <code>{snippet}</code>
                    </pre>
                </div>
            </div>

            <div className="bg-indigo-500/5 border border-indigo-500/20 p-6 rounded-3xl flex gap-5 items-start">
                <div className="p-3 bg-indigo-500/20 rounded-2xl">
                  <Globe className="text-indigo-400 w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">One-Step Deployment</h4>
                  <p className="text-sm text-slate-400 leading-relaxed font-medium">
                    Paste this snippet into your site's header or footer. No additional libraries required.
                  </p>
                </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {[
            { icon: <Zap className="w-6 h-6 text-yellow-400" />, title: "Instant Response", desc: "Optimized for local inference with Ollama for sub-second latency." },
            { icon: <Shield className="w-6 h-6 text-green-400" />, title: "Private by Design", desc: "Data processed locally. Your documents never touch a third-party server." },
            { icon: <Code className="w-6 h-6 text-blue-400" />, title: "Custom Logic", desc: "Use Modelfiles to define firm-specific mediator personalities." }
          ].map((item, idx) => (
            <div key={idx} className="bg-[#1e293b]/20 border border-white/5 p-8 rounded-[2rem] hover:border-white/10 transition-all">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-white/5">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{item.title}</h3>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* The Actual Live Widget Preview (Bottom Right) */}
      <ChatbotWidget key={config.primaryColor + config.botName} />
    </div>
  )
}