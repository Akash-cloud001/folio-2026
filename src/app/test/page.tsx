import Script from "next/script";

// MyForexFirms card widget — keep this <a> intact; it is the backlink.
const MFF_WIDGET_HTML = `<!-- MyForexFirms badge widget — keep this <a> intact; it is the backlink. -->
<a href="https://mff-dev.vercel.app/firms/ftmo?utm_source=widget&amp;utm_medium=firm-site&amp;utm_campaign=widget-v1.5ocvhWh0R1i7-3ikVOCU7RY1renNd9ao.0-UVTb_7"
   data-mff-widget="badge"
   data-mff-token="v1.5ocvhWh0R1i7-3ikVOCU7RY1renNd9ao.0-UVTb_7"
   rel="noopener"
   aria-label="Rated by MyForexFirms — FTMO"
   style="display:inline-block;position:relative;color:inherit;text-decoration:none">
  <style>@keyframes mff-sk-fb{0%,100%{opacity:.4}50%{opacity:.9}}</style><span style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0">Rated by MyForexFirms — FTMO</span><span style="display:inline-flex;box-sizing:border-box;background:oklch(0.2097 0.0080 274.5332);border:1px solid rgba(255, 255, 255, 0.06);border-radius:8px;padding:10px 12px;box-shadow:0 0 24px rgba(246, 100, 53, 0.15);text-decoration:none;color:inherit;width:fit-content;align-items:center;height:48px;" aria-hidden="true"><span style="display:flex;align-items:center;padding-right:12px"><span style="display:block;width:24px;height:24px;border-radius:6px;background:rgba(255,255,255,0.1);animation:mff-sk-fb 1.35s ease-in-out infinite"></span></span><span style="width:1px;align-self:stretch;background:rgba(255, 255, 255, 0.06)"></span><span style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:0 12px"><span style="display:block;width:22px;height:16px;border-radius:4px;background:rgba(255,255,255,0.1);animation:mff-sk-fb 1.35s ease-in-out infinite"></span><span style="display:block;width:44px;height:10px;border-radius:3px;background:rgba(255,255,255,0.1);animation:mff-sk-fb 1.35s ease-in-out infinite"></span></span><span style="width:1px;align-self:stretch;background:rgba(255, 255, 255, 0.06)"></span><span style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:0 12px;padding-right:0"><span style="display:block;width:16px;height:16px;border-radius:4px;background:rgba(255,255,255,0.1);animation:mff-sk-fb 1.35s ease-in-out infinite"></span><span style="display:block;width:52px;height:10px;border-radius:3px;background:rgba(255,255,255,0.1);animation:mff-sk-fb 1.35s ease-in-out infinite"></span></span></span>
</a>
<script async src="https://mff-dev.vercel.app/widget.js"></script>`;

const MFF_WIDGET_CARD = `
<!-- MyForexFirms card widget — keep this <a> intact; it is the backlink. -->
<a href="https://mff-dev.vercel.app/firms/ftmo?utm_source=widget&amp;utm_medium=firm-site&amp;utm_campaign=widget-v1.ahiwMakLZvkj9MlVOOJaUUKg8a-7bT3K.nwi5FIKb"
   data-mff-widget="card"
   data-mff-token="v1.ahiwMakLZvkj9MlVOOJaUUKg8a-7bT3K.nwi5FIKb"
   rel="noopener"
   aria-label="Rated by MyForexFirms — FTMO"
   style="display:inline-block;position:relative;color:inherit;text-decoration:none">
  <style>@keyframes mff-sk-fb{0%,100%{opacity:.4}50%{opacity:.9}}</style><span style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0">Rated by MyForexFirms — FTMO</span><span style="display:inline-flex;box-sizing:border-box;background:oklch(0.2097 0.0080 274.5332);border:1px solid rgba(255, 255, 255, 0.06);border-radius:8px;padding:10px 12px;box-shadow:0 0 24px rgba(246, 100, 53, 0.15);text-decoration:none;color:inherit;flex-direction:column;width:fit-content;min-width:180px" aria-hidden="true"><span style="display:flex;align-items:center;justify-content:space-between;gap:12px"><span style="display:flex;align-items:center;gap:12px"><span style="display:block;width:28px;height:16px;border-radius:4px;background:rgba(255,255,255,0.1);animation:mff-sk-fb 1.35s ease-in-out infinite"></span><span style="display:block;width:56px;height:10px;border-radius:3px;background:rgba(255,255,255,0.1);animation:mff-sk-fb 1.35s ease-in-out infinite"></span></span><span style="display:block;width:24px;height:24px;border-radius:6px;background:rgba(255,255,255,0.1);animation:mff-sk-fb 1.35s ease-in-out infinite"></span></span><span style="display:block;height:1px;background:rgba(255, 255, 255, 0.06);margin:8px 0 6px 0"></span><span style="display:flex;align-items:stretch"><span style="flex:1;display:flex;flex-direction:column;align-items:flex-start;gap:2px;padding:0 8px;padding-left:0"><span style="display:block;width:40px;height:10px;border-radius:3px;background:rgba(255,255,255,0.1);animation:mff-sk-fb 1.35s ease-in-out infinite"></span><span style="display:block;width:18px;height:14px;border-radius:4px;background:rgba(255,255,255,0.1);animation:mff-sk-fb 1.35s ease-in-out infinite"></span></span><span style="width:1px;background:rgba(255, 255, 255, 0.06);align-self:stretch"></span><span style="flex:1;display:flex;flex-direction:column;align-items:flex-start;gap:2px;padding:0 8px"><span style="display:block;width:36px;height:10px;border-radius:3px;background:rgba(255,255,255,0.1);animation:mff-sk-fb 1.35s ease-in-out infinite"></span><span style="display:block;width:18px;height:14px;border-radius:4px;background:rgba(255,255,255,0.1);animation:mff-sk-fb 1.35s ease-in-out infinite"></span></span><span style="width:1px;background:rgba(255, 255, 255, 0.06);align-self:stretch"></span><span style="flex:1;display:flex;flex-direction:column;align-items:flex-start;gap:2px;padding:0 8px;padding-right:0"><span style="display:block;width:48px;height:10px;border-radius:3px;background:rgba(255,255,255,0.1);animation:mff-sk-fb 1.35s ease-in-out infinite"></span><span style="display:block;width:18px;height:14px;border-radius:4px;background:rgba(255,255,255,0.1);animation:mff-sk-fb 1.35s ease-in-out infinite"></span></span></span></span>
</a>
<script async src="https://mff-dev.vercel.app/widget.js"></script>
`;
export default function TestPage() {
  return (
    <main className="flex flex-col gap-12 min-h-screen items-center justify-center p-8 ">
      <div dangerouslySetInnerHTML={{ __html: MFF_WIDGET_CARD }} />
      <div dangerouslySetInnerHTML={{ __html: MFF_WIDGET_HTML }} />
      <Script async src="https://mff-dev.vercel.app/widget.js" strategy="afterInteractive" />
    </main>
  );
}
