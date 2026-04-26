"use client";

import { contactConfig } from "@/content/contact.config";
import { siteConfig } from "@/content/site.config";
import { MatrixHoverText } from "@/components/MatrixHoverText";
import { motion } from "motion/react";
import { Mail, Phone, Share2, Send, ShieldCheck, Terminal as TerminalIcon, Cpu, Wifi } from "lucide-react";

export default function ContactPage() {
  return (
    <main id="contact-page" className="mx-auto w-full max-w-[1200px] px-6 py-12 lg:px-12">
      
      {/* ── Terminal Header ───────────────────────────────────── */}
      <div className="mb-12 flex items-center gap-2 font-mono text-lg md:text-xl animate-in fade-in slide-in-from-left duration-500">
        <span className="text-primary font-bold"><MatrixHoverText text={siteConfig.terminalPath} /></span>
        <span className="text-foreground"><MatrixHoverText text="Contact" /></span>
        <span className="w-2 h-5 bg-primary animate-pulse ml-1" />
      </div>

      <div className="grid grid-cols-1 gap-12 lg:gap-20 lg:grid-cols-12">
        
        {/* ── Left Column: System Status & Info (4 cols) ─────────────────────────── */}
        <div className="lg:col-span-5 space-y-12">
          
          {/* Header Info */}
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-mono uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <MatrixHoverText text="Signal Strength: Optimal" />
            </div>
            <h1 className="text-4xl md:text-5xl font-mono font-bold text-foreground tracking-tighter leading-none">
              <MatrixHoverText text={contactConfig.heading} />
            </h1>
            <p className="font-mono text-muted-foreground leading-relaxed text-sm md:text-base border-l-2 border-primary/20 pl-6">
              <MatrixHoverText text={contactConfig.subheading} />
            </p>
          </div>

          {/* System Diagnostics (Visual Flair) */}
          <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
            {[
              { label: "Status", value: "Encrypted", icon: ShieldCheck },
              { label: "Uptime", value: "99.99%", icon: Cpu },
              { label: "Network", value: "Global", icon: Wifi },
              { label: "Response", value: "Fast", icon: TerminalIcon },
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-xl border border-white/5 bg-white/[0.02] space-y-2 group hover:border-primary/30 transition-colors">
                <div className="flex items-center justify-between">
                  <stat.icon className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors" />
                  <span className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-widest">
                    <MatrixHoverText text={stat.label} />
                  </span>
                </div>
                <div className="text-sm font-mono font-bold text-foreground">
                  <MatrixHoverText text={stat.value} />
                </div>
              </div>
            ))}
          </div>

          {/* Contact Methods */}
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-700 delay-300">
            <div className="space-y-4">
              <h3 className="text-xs font-mono font-bold text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                <Mail className="w-3 h-3" />
                <MatrixHoverText text="Secure Channels" />
              </h3>
              <div className="space-y-3">
                <a href={`mailto:${contactConfig.email}`} className="flex items-center gap-4 group p-3 rounded-lg hover:bg-primary/5 border border-transparent hover:border-primary/10 transition-all">
                  <div className="font-mono text-primary font-bold text-sm">$ email --send</div>
                  <div className="font-mono text-muted-foreground group-hover:text-foreground text-sm transition-colors truncate">
                    <MatrixHoverText text={contactConfig.email} />
                  </div>
                </a>
                <div className="flex items-center gap-4 group p-3 rounded-lg hover:bg-primary/5 border border-transparent hover:border-primary/10 transition-all">
                  <div className="font-mono text-primary font-bold text-sm">$ phone --call</div>
                  <div className="font-mono text-muted-foreground group-hover:text-foreground text-sm transition-colors">
                    <MatrixHoverText text={contactConfig.phone} />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-mono font-bold text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                <Share2 className="w-3 h-3" />
                <MatrixHoverText text="Network Nodes" />
              </h3>
              <div className="flex flex-wrap gap-3">
                {contactConfig.socials.map((social) => (
                  <a 
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] hover:border-primary/50 hover:bg-primary/5 text-xs font-mono text-muted-foreground hover:text-primary transition-all flex items-center gap-2"
                  >
                    <span className="opacity-40">$</span>
                    <MatrixHoverText text={social.platform} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Column: Interactive Terminal Form (7 cols) ────────────────────────── */}
        <div className="lg:col-span-7 animate-in fade-in slide-in-from-bottom duration-700 delay-400">
          <div className="relative group">
            {/* Terminal Decorations */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity" />
            
            <div className="relative flex flex-col h-full rounded-2xl border border-white/10 bg-[#0B0E0E]/80 backdrop-blur-xl overflow-hidden shadow-2xl">
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40" />
                  </div>
                  <div className="h-4 w-[1px] bg-white/10 mx-2" />
                  <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                    <TerminalIcon className="w-3 h-3 text-primary" />
                    <MatrixHoverText text="Secure_Message_Portal.exe" />
                  </span>
                </div>
                <span className="font-mono text-[10px] text-primary/40"><MatrixHoverText text="AES-256" /></span>
              </div>

              {/* Form Content */}
              <form 
                className="p-8 md:p-12 space-y-10" 
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const name = formData.get("name");
                  const email = formData.get("email");
                  const message = formData.get("message");
                  const mailtoUrl = `mailto:${contactConfig.email}?subject=Secure Transmission from ${name}&body=Return Node: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
                  window.location.href = mailtoUrl;
                }}
              >
                
                {/* Input Group: Name */}
                <div className="space-y-4 group/field">
                  <div className="flex items-center justify-between">
                    <label htmlFor="name" className="font-mono text-[10px] text-primary uppercase tracking-[0.2em] font-bold">
                      <MatrixHoverText text="01. Identity_Tag" />
                    </label>
                    <span className="text-[10px] font-mono text-muted-foreground/30"><MatrixHoverText text="[Required]" /></span>
                  </div>
                  <div className="relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 text-primary/40 font-mono text-sm pl-1">&gt;</div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Enter identity..."
                      className="w-full bg-transparent border-b border-white/10 pb-4 pl-6 font-mono text-sm text-foreground outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/20"
                    />
                  </div>
                </div>

                {/* Input Group: Email */}
                <div className="space-y-4 group/field">
                  <div className="flex items-center justify-between">
                    <label htmlFor="email" className="font-mono text-[10px] text-primary uppercase tracking-[0.2em] font-bold">
                      <MatrixHoverText text="02. Return_Node" />
                    </label>
                    <span className="text-[10px] font-mono text-muted-foreground/30"><MatrixHoverText text="[Email]" /></span>
                  </div>
                  <div className="relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 text-primary/40 font-mono text-sm pl-1">&gt;</div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="node@network.com"
                      className="w-full bg-transparent border-b border-white/10 pb-4 pl-6 font-mono text-sm text-foreground outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/20"
                    />
                  </div>
                </div>

                {/* Input Group: Message */}
                <div className="space-y-4 group/field">
                  <div className="flex items-center justify-between">
                    <label htmlFor="message" className="font-mono text-[10px] text-primary uppercase tracking-[0.2em] font-bold">
                      <MatrixHoverText text="03. Data_Payload" />
                    </label>
                    <span className="text-[10px] font-mono text-muted-foreground/30"><MatrixHoverText text="[Raw Text]" /></span>
                  </div>
                  <div className="relative">
                    <div className="absolute left-0 top-4 text-primary/40 font-mono text-sm pl-1">&gt;</div>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      placeholder="Inject message here..."
                      className="w-full bg-transparent border border-white/10 p-6 pl-10 rounded-xl font-mono text-sm text-foreground outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/20 resize-none"
                    />
                  </div>
                </div>

                {/* Action Button */}
                <button
                  type="submit"
                  className="relative w-full py-5 group/btn overflow-hidden rounded-xl border border-primary/50 bg-primary/5 hover:bg-primary transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-primary translate-y-[101%] group-hover/btn:translate-y-0 transition-transform duration-500 ease-out" />
                  <span className="relative z-10 font-mono font-bold text-primary group-hover/btn:text-black flex items-center justify-center gap-3 tracking-[0.2em]">
                    <Send className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    <MatrixHoverText text="EXECUTE_TRANSMISSION" />
                  </span>
                </button>

                <p className="text-center font-mono text-[9px] text-muted-foreground/40 uppercase tracking-widest">
                  <MatrixHoverText text="End-to-end encryption active" />
                </p>
              </form>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
