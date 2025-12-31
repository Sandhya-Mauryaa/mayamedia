export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <div className="mx-auto max-w-4xl space-y-6">
        <h1 className="text-3xl font-bold text-amber-300">Privacy Policy</h1>
        <p>
          At <strong>Maya Media Communication</strong>, your privacy is important to us.
          This Privacy Policy explains how we collect, use, and protect your
          information when you interact with our services.
        </p>

        <h2 className="text-xl font-semibold text-sky-400">Information We Collect</h2>
        <p>We may collect personal details such as your name, email, phone number, and project requirements when you contact us.</p>

        <h2 className="text-xl font-semibold text-sky-400">How We Use Information</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>To provide and improve our services</li>
          <li>To communicate with you regarding projects</li>
          <li>To send relevant updates, offers, or newsletters (opt-in)</li>
        </ul>

        <h2 className="text-xl font-semibold text-sky-400">Your Rights</h2>
        <p>
          You may request to update or delete your personal data at any time by
          contacting us at{" "}
          <a href="mailto:contact@mayamediacommunication.com" className="text-sky-400 underline">
            contact@mayamediacommunication.com
          </a>.
        </p>
      </div>
    </main>
  );
}
