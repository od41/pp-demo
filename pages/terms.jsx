import React from 'react';

const TermsOfService = () => {
  return (
    <div className='bg-black_200 text-white'>
      <div className="py-20 !max-w-3xl mx-auto container flex flex-col justify-center">
        <div className='mb-10'>
          <img src="/images/pngs/paul_logo.png" alt="PaulPlays Logo" className='mb-1'/>
          <h1 className="text-3xl font-bold mb-4 text-heading_xl_bold">PaulPlays Inc. - Terms of Service</h1>
        </div>
        <p className="mb-4">Welcome to PaulPlays!</p>
        <p className="mb-4">We're excited to have you on board. This is a simpler version of our Terms of Service (ToS). By using PaulPlays, you're agreeing to these terms, so please read carefully.</p>

        <h2 className="text-xl font-bold mb-2">1. About Us</h2>
        <p className="mb-4">PaulPlays is an AI-powered platform for sports experiences and gaming. We incorporated in USA and operate globally.</p>

        <h2 className="text-xl font-bold mb-2">2. Age Requirement</h2>
        <p className="mb-4">You must be at least 18 years old to use PaulPlays. Some features, like the hyper-casual gaming, might have higher age limits depending on your location.</p>

        <h2 className="text-xl font-bold mb-2">3. Your Account</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>Keep your account info accurate and up to date.</li>
          <li>Don't share your password or let others use your account.</li>
          <li>You're responsible for everything that happens on your account.</li>
        </ul>

        <h2 className="text-xl font-bold mb-2">4. Sports Ticketing</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>We connect you with ticket sellers but don't control ticket prices or availability.</li>
          <li>Generally, all sales are final. Refunds depend on the event organizer's policy.</li>
        </ul>

        <h2 className="text-xl font-bold mb-2">5. Hyper Casual Gaming</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>Check if it's legal in your area before playing.</li>
          <li>Follow the rules for each game.</li>
        </ul>

        <h2 className="text-xl font-bold mb-2">6. Our AI Chat</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>It's here to help, but it might not always be perfect.</li>
          <li>Don't use it for critical decisions without double-checking.</li>
        </ul>

        <h2 className="text-xl font-bold mb-2">7. Be Nice</h2>
        <p className="mb-4">Don't:</p>
        <ul className="list-disc ml-6 mb-4">
          <li>Break the law</li>
          <li>Cheat or create fake accounts</li>
          <li>Try to hack or damage our system</li>
          <li>Harass others or share harmful content</li>
        </ul>

        <h2 className="text-xl font-bold mb-2">8. Payments</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>We use secure payment methods.</li>
          <li>Refunds for tickets depend on the event organizer.</li>
        </ul>

        <h2 className="text-xl font-bold mb-2">9. Your Privacy</h2>
        <p className="mb-4">We take your privacy seriously. Check out our Privacy Policy to learn how we handle your data.</p>

        <h2 className="text-xl font-bold mb-2">10. Intellectual Property</h2>
        <p className="mb-4">Our content and technology belong to us. You can use it for personal use, but don't copy or distribute it.</p>

        <h2 className="text-xl font-bold mb-2">11. Liability</h2>
        <p className="mb-4">We do our best, but we can't guarantee everything will always work perfectly. We're not responsible for indirect damages or losses.</p>

        <h2 className="text-xl font-bold mb-2">12. Disputes</h2>
        <p className="mb-4">If there's a problem, let's try to work it out together. If we can't, disputes will be resolved through arbitration.</p>

        <h2 className="text-xl font-bold mb-2">13. Cancellation</h2>
        <p className="mb-4">You can cancel your account anytime. We can also suspend or close accounts that violate our terms.</p>

        <h2 className="text-xl font-bold mb-2">14. Changes to Terms</h2>
        <p className="mb-4">We might update these terms. We'll let you know about big changes.</p>

        <h2 className="text-xl font-bold mb-2">15. Contact Us</h2>
        <p className="mb-4">Questions? Reach out to us at <a href="mailto:contact@paulplays.ai">contact@paulplays.ai</a>.</p>

        <p className="mb-4">Remember, this is a simplified version. For full legal details, please refer to our complete 
        <a href="/full-terms" className="underline hover:text-dark_orange"> Terms of Service.</a></p>
          
        <p className="mb-4">By using PaulPlays, you're agreeing to these terms. Happy gaming and enjoy the events!</p>
      </div>
    </div>
  );
}

export default TermsOfService;
