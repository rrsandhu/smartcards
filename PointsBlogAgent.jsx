import { useState } from "react";

const BLOG_TOPICS = [
  { id: "flying-points", label: "✈️ Flying on points", desc: "How to book flights using credit card points" },
  { id: "points-value", label: "💎 Points valuations", desc: "CPP values, transfer partners, sweet spots" },
  { id: "card-benefits", label: "🎁 Card benefits", desc: "Lounge access, travel credits, protections" },
  { id: "card-changes", label: "🔔 Card changes & news", desc: "Recent benefit updates, annual fee changes" },
  { id: "transfer-partners", label: "🔄 Transfer partners", desc: "Best airline & hotel transfer strategies" },
  { id: "beginners", label: "🌱 Beginner guides", desc: "Getting started with points & miles" },
];

const POPULAR_CARDS = [
  "Chase Sapphire Preferred", "Chase Sapphire Reserve", "Amex Platinum",
  "Amex Gold", "Capital One Venture X", "Citi Premier", "Bilt Mastercard",
  "Chase Freedom Unlimited", "Amex Green", "Wells Fargo Autograph"
];

const SYSTEM_PROMPT = `You are an expert points & miles travel blogger. You write authoritative, enthusiastic, and deeply practical content about maximizing credit card rewards for travel — specifically flying in premium cabins using points, understanding points valuations, card benefits, and recent changes to travel rewards programs.

Your audience: points hobbyists and aspirational travelers who want to fly business/first class using points without paying cash.

Respond ONLY with a valid JSON object — no preamble, no explanation, no markdown code fences. Just the raw JSON.

Required format:
{
  "title": "Engaging, SEO-friendly title with numbers or specifics when possible",
  "slug": "url-friendly-slug-here",
  "metaDescription": "150-160 character meta description",
  "tldr": ["bullet 1", "bullet 2", "bullet 3", "bullet 4"],
  "intro": "2-3 sentence hook paragraph",
  "sections": [
    {
      "heading": "Section heading",
      "body": "Section content in markdown. Be specific — mention actual redemption rates, CPP values, transfer ratios, lounge names, partner airlines. Use real examples."
    }
  ],
  "proTip": "One advanced insider tip most readers won't know",
  "affiliateCards": [
    { "card": "Card name", "placeholder": "{{AFFILIATE_CARD_NAME}}", "pitch": "One sentence why this card is relevant" }
  ],
  "tags": ["points", "travel", "relevant-tag"],
  "readTime": "X min read",
  "category": "one of: flying-points | points-value | card-benefits | card-changes | transfer-partners | beginners"
}`;

function buildUserPrompt(topic, cards, customPrompt, newsContext) {
  const parts = [];
  if (topic) parts.push(`Post category: ${topic}`);
  if (cards.length) parts.push(`Feature these cards: ${cards.join(", ")}`);
  if (customPrompt) parts.push(`Specific angle: ${customPrompt}`);
  if (newsContext) parts.push(`\nRecent news context to weave in naturally:\n${newsContext}`);
  if (!parts.length) parts.push("Write a general post about the best ways to fly business class on points in 2025.");
  return parts.join("\n");
}

export default function PointsBlogAgent() {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedCards, setSelectedCards] = useState([]);
  const [customPrompt, setCustomPrompt] = useState("");
  const [fetchNews, setFetchNews] = useState(true);
  const [status, setStatus] = useState("idle");
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("preview");
  const [copied, setCopied] = useState("");

  function toggleCard(card) {
    setSelectedCards(prev =>
      prev.includes(card) ? prev.filter(c => c !== card) : [...prev, card]
    );
  }

  async function callClaude(messages, useWebSearch = false) {
    const body = {
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages,
    };
    if (useWebSearch) {
      body.tools = [{ type: "web_search_20250305", name: "web_search" }];
    }
    const resp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      throw new Error(err.error?.message || `API error ${resp.status}`);
    }
    return resp.json();
  }

  async function generate() {
    setError("");
    setPost(null);

    if (!selectedTopic && !selectedCards.length && !customPrompt.trim()) {
      setError("Pick a topic, select some cards, or describe what you want.");
      return;
    }

    let newsContext = "";

    // Step 1: optional news fetch
    if (fetchNews) {
      setStatus("searching");
      const searchTerm = selectedCards.length
        ? `${selectedCards[0]} ${selectedTopic || "credit card news changes 2025"}`
        : `${selectedTopic || "travel rewards points miles"} news 2025`;

      try {
        const searchData = await callClaude([
          {
            role: "user",
            content: `Search for the very latest news about: "${searchTerm}". Summarize the 3 most relevant recent developments in 2-3 sentences each. Focus on: benefit changes, new offers, devaluations, new transfer partners, or expert analysis from the past 60 days.`,
          },
        ], true);

        const textBlocks = (searchData.content || []).filter(b => b.type === "text");
        newsContext = textBlocks.map(b => b.text).join("\n").trim();
      } catch {
        // silently continue without news
        newsContext = "";
      }
    }

    // Step 2: generate post
    setStatus("generating");

    const topicLabel = BLOG_TOPICS.find(t => t.id === selectedTopic)?.label || selectedTopic;
    const userMsg = buildUserPrompt(topicLabel, selectedCards, customPrompt.trim(), newsContext);

    try {
      const genData = await callClaude([
        { role: "user", content: `${SYSTEM_PROMPT}\n\n---\n\n${userMsg}` },
      ]);

      const raw = (genData.content || []).find(b => b.type === "text")?.text || "";
      const clean = raw.replace(/^```(?:json)?|```$/gm, "").trim();
      const parsed = JSON.parse(clean);
      setPost(parsed);
      setStatus("done");
    } catch (e) {
      setError(`Generation failed: ${e.message}. Please try again.`);
      setStatus("error");
    }
  }

  function copy(text, key) {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(""), 2000);
  }

  function buildMarkdown() {
    if (!post) return "";
    return [
      `# ${post.title}`,
      ``,
      `> **TL;DR:** ${post.tldr?.join(" | ")}`,
      ``,
      post.intro,
      ``,
      ...(post.sections || []).flatMap(s => [`## ${s.heading}`, ``, s.body, ``]),
      `---`,
      `> **Pro tip:** ${post.proTip}`,
    ].join("\n");
  }

  function buildJSON() {
    if (!post) return "";
    return JSON.stringify({
      title: post.title,
      slug: post.slug,
      metaDescription: post.metaDescription,
      category: post.category,
      tags: post.tags,
      readTime: post.readTime,
      tldr: post.tldr,
      intro: post.intro,
      sections: post.sections,
      proTip: post.proTip,
      affiliateCards: post.affiliateCards,
      publishedAt: new Date().toISOString(),
    }, null, 2);
  }

  const isLoading = status === "searching" || status === "generating";

  const inp = {
    width: "100%", padding: "9px 12px", borderRadius: 8,
    border: "1px solid var(--color-border-secondary)",
    background: "var(--color-background-primary)",
    color: "var(--color-text-primary)", fontSize: 14,
    boxSizing: "border-box", outline: "none", fontFamily: "var(--font-sans)",
  };

  const chip = (active) => ({
    padding: "5px 12px", borderRadius: 20, fontSize: 12, cursor: "pointer",
    border: `1px solid ${active ? "var(--color-text-primary)" : "var(--color-border-secondary)"}`,
    background: active ? "var(--color-text-primary)" : "var(--color-background-secondary)",
    color: active ? "var(--color-background-primary)" : "var(--color-text-secondary)",
    transition: "all .15s", userSelect: "none",
  });

  return (
    <div style={{ fontFamily: "var(--font-sans)", maxWidth: 820, margin: "0 auto", padding: "24px 20px" }}>

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 500, margin: 0, color: "var(--color-text-primary)" }}>
          ✈️ Points & miles blog generator
        </h1>
        <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: "6px 0 0", lineHeight: 1.5 }}>
          AI-written posts on flying on points, card benefits, valuations & news — ready to ship to your site.
        </p>
      </div>

      {/* Config panel */}
      <div style={{ border: "1px solid var(--color-border-tertiary)", borderRadius: 12, overflow: "hidden", marginBottom: 20 }}>

        {/* Topic picker */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-border-tertiary)" }}>
          <p style={{ fontSize: 12, fontWeight: 500, color: "var(--color-text-secondary)", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: ".05em" }}>Post type</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {BLOG_TOPICS.map(t => (
              <button key={t.id} onClick={() => setSelectedTopic(prev => prev === t.id ? "" : t.id)} style={chip(selectedTopic === t.id)} title={t.desc}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Card picker */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-border-tertiary)" }}>
          <p style={{ fontSize: 12, fontWeight: 500, color: "var(--color-text-secondary)", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: ".05em" }}>Feature cards <span style={{ fontWeight: 400 }}>(pick any)</span></p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {POPULAR_CARDS.map(c => (
              <button key={c} onClick={() => toggleCard(c)} style={chip(selectedCards.includes(c))}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Custom angle */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-border-tertiary)" }}>
          <p style={{ fontSize: 12, fontWeight: 500, color: "var(--color-text-secondary)", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: ".05em" }}>Custom angle <span style={{ fontWeight: 400 }}>(optional)</span></p>
          <input
            value={customPrompt}
            onChange={e => setCustomPrompt(e.target.value)}
            placeholder='e.g. "Best ways to fly ANA business class on points" or "Amex Platinum 2025 benefit changes"'
            style={inp}
          />
        </div>

        {/* Footer row */}
        <div style={{ padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--color-background-secondary)" }}>
          <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, color: "var(--color-text-secondary)", userSelect: "none" }}>
            <input type="checkbox" checked={fetchNews} onChange={e => setFetchNews(e.target.checked)} style={{ accentColor: "var(--color-text-primary)", width: 14, height: 14 }} />
            Pull latest card news via web search
          </label>
          <button
            onClick={generate}
            disabled={isLoading}
            style={{
              padding: "10px 24px", borderRadius: 8, border: "none", cursor: isLoading ? "not-allowed" : "pointer",
              background: isLoading ? "var(--color-border-secondary)" : "var(--color-text-primary)",
              color: isLoading ? "var(--color-text-tertiary)" : "var(--color-background-primary)",
              fontSize: 14, fontWeight: 500, transition: "opacity .15s",
            }}
          >
            {status === "searching" ? "🔍 Searching news…" : status === "generating" ? "✍️ Writing post…" : "Generate post"}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div style={{ padding: "10px 14px", background: "var(--color-background-danger)", border: "1px solid var(--color-border-danger)", borderRadius: 8, fontSize: 13, color: "var(--color-text-danger)", marginBottom: 16 }}>
          {error}
        </div>
      )}

      {/* Result */}
      {post && (
        <div style={{ border: "1px solid var(--color-border-tertiary)", borderRadius: 12, overflow: "hidden" }}>

          {/* Tab bar */}
          <div style={{ display: "flex", borderBottom: "1px solid var(--color-border-tertiary)", background: "var(--color-background-secondary)" }}>
            {[
              { id: "preview", label: "Preview" },
              { id: "markdown", label: "Markdown" },
              { id: "json", label: "Next.js JSON" },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                padding: "10px 18px", border: "none", background: "none", cursor: "pointer",
                fontSize: 13, fontWeight: activeTab === tab.id ? 500 : 400,
                color: activeTab === tab.id ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                borderBottom: activeTab === tab.id ? "2px solid var(--color-text-primary)" : "2px solid transparent",
                marginBottom: -1,
              }}>
                {tab.label}
              </button>
            ))}
            <div style={{ flex: 1 }} />
            <span style={{ padding: "10px 16px", fontSize: 12, color: "var(--color-text-tertiary)", alignSelf: "center" }}>{post.readTime}</span>
          </div>

          <div style={{ padding: 22 }}>

            {/* PREVIEW */}
            {activeTab === "preview" && (
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 500, margin: "0 0 8px", color: "var(--color-text-primary)", lineHeight: 1.35 }}>{post.title}</h2>

                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                  {post.tags?.map(t => (
                    <span key={t} style={{ fontSize: 11, padding: "2px 9px", borderRadius: 20, background: "var(--color-background-tertiary)", color: "var(--color-text-secondary)" }}>{t}</span>
                  ))}
                </div>

                <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: "0 0 14px", fontStyle: "italic" }}>
                  /blog/{post.slug} · {post.metaDescription}
                </p>

                {/* TL;DR */}
                <div style={{ background: "var(--color-background-secondary)", border: "1px solid var(--color-border-tertiary)", borderRadius: 10, padding: "12px 16px", marginBottom: 16 }}>
                  <p style={{ fontSize: 12, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".05em", color: "var(--color-text-secondary)", margin: "0 0 8px" }}>TL;DR</p>
                  {post.tldr?.map((b, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 4, fontSize: 13, color: "var(--color-text-primary)", lineHeight: 1.5 }}>
                      <span style={{ color: "var(--color-text-tertiary)", flexShrink: 0 }}>→</span> {b}
                    </div>
                  ))}
                </div>

                {/* Intro */}
                <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--color-text-primary)", margin: "0 0 16px" }}>{post.intro}</p>

                {/* Sections */}
                {post.sections?.map((s, i) => (
                  <div key={i} style={{ marginBottom: 16 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 500, margin: "0 0 6px", color: "var(--color-text-primary)" }}>{s.heading}</h3>
                    <p style={{ fontSize: 13, lineHeight: 1.7, color: "var(--color-text-secondary)", margin: 0, whiteSpace: "pre-wrap" }}>{s.body}</p>
                  </div>
                ))}

                {/* Pro tip */}
                {post.proTip && (
                  <div style={{ borderLeft: "3px solid var(--color-text-primary)", paddingLeft: 14, margin: "16px 0" }}>
                    <p style={{ fontSize: 12, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".05em", color: "var(--color-text-secondary)", margin: "0 0 4px" }}>Pro tip</p>
                    <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--color-text-primary)", margin: 0 }}>{post.proTip}</p>
                  </div>
                )}

                {/* Affiliate cards */}
                {post.affiliateCards?.length > 0 && (
                  <div style={{ marginTop: 16 }}>
                    <p style={{ fontSize: 12, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".05em", color: "var(--color-text-secondary)", margin: "0 0 10px" }}>Affiliate link slots</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                      {post.affiliateCards.map((a, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 14px", background: "var(--color-background-secondary)", borderRadius: 8, border: "1px solid var(--color-border-tertiary)" }}>
                          <code style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-text-info)", flexShrink: 0, paddingTop: 1 }}>{a.placeholder}</code>
                          <div>
                            <p style={{ fontSize: 13, fontWeight: 500, margin: "0 0 2px", color: "var(--color-text-primary)" }}>{a.card}</p>
                            <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: 0 }}>{a.pitch}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* MARKDOWN */}
            {activeTab === "markdown" && (
              <div>
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
                  <button onClick={() => copy(buildMarkdown(), "md")} style={{ fontSize: 12, padding: "5px 12px", borderRadius: 6, border: "1px solid var(--color-border-secondary)", background: "none", color: "var(--color-text-secondary)", cursor: "pointer" }}>
                    {copied === "md" ? "✓ Copied!" : "Copy markdown"}
                  </button>
                </div>
                <pre style={{ fontFamily: "var(--font-mono)", fontSize: 12, lineHeight: 1.7, whiteSpace: "pre-wrap", wordBreak: "break-word", margin: 0, color: "var(--color-text-primary)", background: "var(--color-background-tertiary)", padding: 14, borderRadius: 8, maxHeight: 460, overflow: "auto" }}>
                  {buildMarkdown()}
                </pre>
              </div>
            )}

            {/* NEXT.JS JSON */}
            {activeTab === "json" && (
              <div>
                <div style={{ padding: "10px 14px", background: "var(--color-background-secondary)", borderRadius: 8, border: "1px solid var(--color-border-tertiary)", marginBottom: 14, fontSize: 12 }}>
                  <p style={{ margin: "0 0 6px", fontWeight: 500, color: "var(--color-text-primary)" }}>POST to your Next.js API route</p>
                  <code style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-secondary)" }}>
                    fetch('/api/blog/create', {"{"} method: 'POST', body: JSON.stringify(payload) {"}"})
                  </code>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
                  <button onClick={() => copy(buildJSON(), "json")} style={{ fontSize: 12, padding: "5px 12px", borderRadius: 6, border: "1px solid var(--color-border-secondary)", background: "none", color: "var(--color-text-secondary)", cursor: "pointer" }}>
                    {copied === "json" ? "✓ Copied!" : "Copy JSON"}
                  </button>
                </div>
                <pre style={{ fontFamily: "var(--font-mono)", fontSize: 12, lineHeight: 1.6, whiteSpace: "pre-wrap", wordBreak: "break-word", margin: 0, color: "var(--color-text-primary)", background: "var(--color-background-tertiary)", padding: 14, borderRadius: 8, maxHeight: 420, overflow: "auto" }}>
                  {buildJSON()}
                </pre>

                <div style={{ marginTop: 16, padding: "12px 14px", background: "var(--color-background-secondary)", borderRadius: 8, border: "1px solid var(--color-border-tertiary)" }}>
                  <p style={{ fontSize: 12, fontWeight: 500, margin: "0 0 8px", color: "var(--color-text-primary)" }}>Starter API route — app/api/blog/create/route.js</p>
                  <pre style={{ fontFamily: "var(--font-mono)", fontSize: 11, lineHeight: 1.6, margin: 0, color: "var(--color-text-secondary)", whiteSpace: "pre-wrap" }}>{`import { NextResponse } from 'next/server'
// import { createClient } from '@supabase/supabase-js'

export async function POST(req) {
  const post = await req.json()
  // Option 1: Save to Supabase
  // const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
  // await supabase.from('posts').insert(post)

  // Option 2: Write MDX file
  // await fs.writeFile(\`content/blog/\${post.slug}.mdx\`, buildMdx(post))

  return NextResponse.json({ ok: true, slug: post.slug })
}`}</pre>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
