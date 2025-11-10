"use client";

type Props = { src: string; title?: string; height?: number };

export default function Embed({ src, title = "Report", height = 900 }: Props) {
  return (
    <div style={{ width: "100%", maxWidth: 1400, margin: "0 auto" }}>
      <div style={{ position: "relative", paddingTop: "62.5%" /* ~16:10 */ }}>
        <iframe
          src={src}
          title={title}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
          allowFullScreen
        />
      </div>
    </div>
  );
}
