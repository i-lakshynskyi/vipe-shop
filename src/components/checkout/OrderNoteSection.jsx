import { MessageSquare } from 'lucide-react';

export default function OrderNoteSection({ orderNote, setOrderNote }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-linear-to-b from-[#202020]/15 to-[#141414]/5 p-5 sm:p-6">
      <div className="mb-4 flex items-center gap-3">
        <MessageSquare size={23} strokeWidth={1.8} />

        <h2 className="text-xl font-semibold text-[#F5F5F5]">Order Note</h2>
      </div>

      <textarea
        id="order-note"
        name="orderNote"
        value={orderNote}
        onChange={(event) => setOrderNote(event.target.value)}
        placeholder="Any additional information (optional)"
        rows={3}
        className="min-h-20 w-full resize-y rounded-lg border border-white/20 bg-[#1A1A1A] p-3 text-sm text-[#F5F5F5] outline-none placeholder:text-[#777777] transition-colors focus:border-white/40"
      />
    </section>
  );
}
