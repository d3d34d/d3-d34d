import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allPosts } from "@/content/blog/index";
import { MatrixHoverText } from "@/components/MatrixHoverText";
import { BlogActions } from "@/components/BlogActions";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Report Not Found" };

  return {
    title: `d3.d34d | ${post.title}`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const categoryColorMap: Record<string, string> = {
    blue: "border-[#8BBDFF] bg-[#1D2433] text-[#8BBDFF]",
    yellow: "border-[#FFB800] bg-[#332B1D] text-[#FFB800]",
    purple: "border-[#D18BFF] bg-[#2B1D33] text-[#D18BFF]",
    green: "border-primary bg-primary/10 text-primary",
  };

  return (
    <main className="mx-auto w-full max-w-[1440px] px-4 py-16 lg:px-[110px] animate-in fade-in duration-700">
      {/* ── Breadcrumbs ────────────────────────────────────────── */}
      <nav className="mb-12 font-mono text-sm flex items-center gap-2">
        <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
          <span className="text-primary">&gt;</span> index
        </Link>
        <span className="text-muted-foreground/30">/</span>
        <span className="text-primary italic truncate max-w-[200px]">{post.slug}</span>
      </nav>

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
        {/* ── Left Column: Media & Content ──────────────────────── */}
        <div className="lg:col-span-8">
          <div className="relative aspect-video w-full overflow-hidden border border-white/10 bg-black/40 mb-12 rounded-2xl group">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              priority
            />
            {/* Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] opacity-20" />
          </div>

          <div className="mb-8 flex items-center gap-4">
             <span className={`rounded-full border px-4 py-1 font-mono text-[10px] font-bold uppercase tracking-wider ${categoryColorMap[post.categoryColor ?? "green"]}`}>
                {post.category}
              </span>
              <span className="font-mono text-xs text-muted-foreground/50">{post.readTime}</span>
          </div>

          <h1 className="mb-8 font-mono text-4xl md:text-5xl font-bold text-foreground leading-tight">
            <MatrixHoverText text={post.title} />
          </h1>

          <div className="prose prose-invert max-w-none border-t border-white/5 pt-12 space-y-8">
            <p className="font-mono text-xl leading-relaxed text-foreground/90 italic border-l-2 border-primary pl-6 py-2">
              {post.excerpt}
            </p>
            
            <div className="font-mono text-lg leading-relaxed text-foreground/70 space-y-6">
              {/* This is where the full content would go. 
                  For now, we'll generate a professional-grade intelligence analysis block. */}
              <div className="space-y-6">
                <h2 className="text-primary font-bold text-xl uppercase tracking-widest mt-12 mb-4">01. EXECUTIVE_SUMMARY</h2>
                <p>Initial assessment indicates a significant shift in threat actor methodologies. Autonomous agents are increasingly being deployed to handle the noisy phases of reconnaissance and lateral movement, minimizing human error and maximizing the speed of exploitation.</p>
                
                <h2 className="text-primary font-bold text-xl uppercase tracking-widest mt-12 mb-4">02. TECHNICAL_ANALYSIS</h2>
                <p>The transition from static exploit scripts to dynamic, AI-driven agents allows for real-time adaptation to security controls. Traditional EDR (Endpoint Detection and Response) solutions are struggling to identify these low-and-slow patterns that mimic legitimate administrative activity.</p>
                
                <div className="bg-primary/5 border border-primary/20 p-8 rounded-xl my-10">
                   <p className="text-primary font-bold mb-4 uppercase text-xs tracking-widest">// SECURITY_ADVISORY</p>
                   <p className="text-foreground/80 italic">"Organizations must transition to a Continuous Threat Exposure Management (CTEM) framework. Point-in-time audits are effectively obsolete in an era where the attack surface evolves hourly."</p>
                </div>

                <h2 className="text-primary font-bold text-xl uppercase tracking-widest mt-12 mb-4">03. STRATEGIC_MITIGATION</h2>
                <p>Immediate hardening of identity perimeters and the implementation of granular Zero Trust policies are recommended. Prioritizing identity-first security ensures that even if an autonomous agent gains initial access, lateral movement is throttled by strict verification gates.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Column: Metadata & Actions ──────────────────── */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 space-y-8">
            {/* Intel Source Card */}
            <div className="border border-white/10 bg-[#0B0E0E] p-8 rounded-2xl">
              <h3 className="mb-6 font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold">
                {`// report_metadata`}
              </h3>
              <div className="space-y-6">
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground/40 uppercase tracking-widest mb-1">AUTHOR_ID</p>
                  <p className="font-mono text-lg font-bold text-foreground">d3.d34d</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground/40 uppercase tracking-widest mb-1">TIMESTAMP</p>
                  <p className="font-mono text-lg font-bold text-foreground">{post.date}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground/40 uppercase tracking-widest mb-1">CLASSIFICATION</p>
                  <p className="font-mono text-lg font-bold text-primary italic">UNRESTRICTED_ACCESS</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <BlogActions />

            {/* Terminal Decoration */}
            <div className="border border-white/5 p-6 font-mono text-[10px] text-muted-foreground/30 rounded-xl space-y-2">
              <p>REPORT_ID: {post.slug.toUpperCase()}</p>
              <p>ENCRYPTION: AES-256-GCM</p>
              <p>STATUS: VERIFIED_THREAT_INTEL</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}
