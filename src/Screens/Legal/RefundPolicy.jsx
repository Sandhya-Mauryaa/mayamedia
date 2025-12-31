export default function RefundPolicy() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <div className="mx-auto max-w-4xl space-y-6">
        <h1 className="text-3xl font-bold text-amber-300">Refund Policy</h1>
        <p>
          At <strong>Maya Media Communication</strong>, client satisfaction is our
          priority. However, due to the nature of creative and digital services,
          refunds are limited to specific conditions.
        </p>

        <h2 className="text-xl font-semibold text-sky-400">Eligibility</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>If work has not yet commenced after advance payment</li>
          <li>If services delivered are materially different from what was agreed</li>
        </ul>

        <h2 className="text-xl font-semibold text-sky-400">Non-Refundable</h2>
        <p>
          Payments made for completed milestones, ad spends, or third-party
          services are non-refundable.
        </p>

        <h2 className="text-xl font-semibold text-sky-400">How to Request</h2>
        <p>
          Send your refund request to{" "}
          <a href="mailto:contact@mayamediacommunication.com" className="text-sky-400 underline">
            contact@mayamediacommunication.com
          </a>. Our team will review and respond within 7 business days.
        </p>
      </div>
    </main>
  );
}
