import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className='bg-black_200 text-white'>
      <div className="py-20 !max-w-3xl mx-auto container flex flex-col justify-center">
        <div className='mb-10'>
          <img src="/images/pngs/paul_logo.png" alt="PaulPlays Logo" className='mb-1'/>
          <h1 className="text-3xl font-bold mb-4 text-heading_xl_bold">PaulPlays Inc. - User-Friendly Privacy Policy</h1>
        </div>
        <p className="mb-4">Hello PaulPlays User!</p>
        <p className="mb-4">We care about your privacy. This policy explains how we collect, use, and protect your personal information. By using PaulPlays, you agree to this policy.</p>

        <h2 className="text-xl font-bold mb-2">1. Information We Collect</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>Account info: Name, email, date of birth, etc.</li>
          <li>Payment details: Credit card info, transaction history</li>
          <li>Usage data: How you use our app, game preferences</li>
          <li>Device info: IP address, device type, operating system</li>
        </ul>

        <h2 className="text-xl font-bold mb-2">2. How We Use Your Information</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>To provide and improve our services</li>
          <li>To process payments and prevent fraud</li>
          <li>To personalize your experience</li>
          <li>To communicate with you about our services</li>
        </ul>

        <h2 className="text-xl font-bold mb-2">3. Sharing Your Information</h2>
        <p className="mb-4">We may share your info with:</p>
        <ul className="list-disc ml-6 mb-4">
          <li>Service providers who help us operate PaulPlays</li>
          <li>Partners for marketing purposes (if you agree)</li>
          <li>Legal authorities if required by law</li>
        </ul>

        <h2 className="text-xl font-bold mb-2">4. Your Choices</h2>
        <p className="mb-4">You can:</p>
        <ul className="list-disc ml-6 mb-4">
          <li>Access and update your personal information</li>
          <li>Opt-out of marketing communications</li>
          <li>Request deletion of your account</li>
        </ul>

        <h2 className="text-xl font-bold mb-2">5. Data Security</h2>
        <p className="mb-4">We use industry-standard measures to protect your data, but no method is 100% secure.</p>

        <h2 className="text-xl font-bold mb-2">6. International Data Transfers</h2>
        <p className="mb-4">Your data may be transferred to and processed in countries outside your own.</p>

        <h2 className="text-xl font-bold mb-2">7. Children's Privacy</h2>
        <p className="mb-4">PaulPlays is not intended for children under 18. We don't knowingly collect data from children.</p>

        <h2 className="text-xl font-bold mb-2">8. Changes to This Policy</h2>
        <p className="mb-4">We may update this policy. We'll notify you of significant changes.</p>

        <h2 className="text-xl font-bold mb-2">9. Contact Us</h2>
        <p className="mb-4">Questions about your privacy? </p>

        <p className="mb-4">Remember, this is a simplified version. For full legal details, please refer to our complete 
        <a href="/full-privacy" className="underline hover:text-dark_orange"> Privacy Policy</a> </p>
        <p className="mb-4">Contact us at <a href="mailto:privacy@paulplays.ai">privacy@paulplays.ai</a>.</p>
        </div>
        </div>    
  );
}

export default PrivacyPolicy;
