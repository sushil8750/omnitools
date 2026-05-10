import LegalLayout from "@/components/shared/legal-layout"

export default function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy">
      <p>Last updated: May 10, 2026</p>
      <h2>1. Information We Collect</h2>
      <p>OmniTools is designed with a privacy-first approach. Most of our tools process your files directly in your browser using WebAssembly and Web Workers. We do not upload your files to our servers unless explicitly required for a specific processing task.</p>
      <h2>2. How We Use Information</h2>
      <p>Any data processed on our servers is deleted immediately after the task is completed. We do not store, share, or sell your personal data or files.</p>
      <h2>3. Security</h2>
      <p>We use industry-standard security measures to protect your data during the brief period it might be on our servers.</p>
    </LegalLayout>
  )
}
