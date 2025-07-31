const TermsAndConditions = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
            <h1 className="text-3xl font-bold mb-6 text-center">Terms and Conditions</h1>

            <p className="mb-4"><strong>Effective Date:</strong> 24-06-2025</p>

            <p className="mb-4">
                Welcome to <strong>Ridhi Solution</strong>, a mobile application that connects users with local service providers like electricians, plumbers, maids, cooler/fan repair specialists, and more. Please read these Terms and Conditions ("Terms") carefully before using the app.
            </p>

            <p className="mb-8">
                By accessing or using the app, you agree to be bound by these Terms. If you do not agree with any part of the Terms, you must not use the application.
            </p>

            {/* Section 1 */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Use of the App</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>You must be at least 18 years of age to use this app.</li>
                    <li>You agree to use the app only for lawful purposes.</li>
                    <li>You must not impersonate anyone or provide false information.</li>
                </ul>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. User Accounts</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>You must register with a valid phone number and verify it via OTP.</li>
                    <li>You are responsible for maintaining the confidentiality of your OTP and login credentials.</li>
                    <li>You agree not to share your account or login information with others.</li>
                </ul>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. Partner Responsibilities</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Partners must provide accurate and complete information during registration.</li>
                    <li>Partners are required to submit valid ID and address proofs for verification.</li>
                    <li>Services must be provided professionally, ethically, and legally.</li>
                </ul>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. User Responsibilities</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Provide accurate service request information.</li>
                    <li>Respect and cooperate with service providers.</li>
                    <li>Make timely payments and leave fair feedback when applicable.</li>
                </ul>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Payments</h2>
                <p>
                    Payments for services may be handled outside the app depending on the service. Both users and partners are responsible for agreeing to the payment terms before a service begins. and  Ridhi Solution is not responsible for it.
                </p>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Cancellation & Refund</h2>
                <p>
                    Users may cancel service requests before acceptance. Refund policies, if any, will be communicated at the time of booking.
                </p>
            </section>

            {/* Section 7 */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">7. Limitations of Liability</h2>
                <p>
                    Ridhi Solution serves as a platform to connect users with service providers. We are not liable for any direct or indirect damages resulting from services rendered by partners.
                </p>
            </section>

            {/* Section 8 */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">8. Termination</h2>
                <p>
                    We reserve the right to suspend or terminate your account for violating these Terms or engaging in fraudulent, abusive, or illegal activities.
                </p>
            </section>

            {/* Section 9 */}
            {/* <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">9. Intellectual Property</h2>
                <p>
                    All content, logos, designs, and trademarks in the app are owned by Ridhi Solution. You may not copy or use them without written permission.
                </p>
            </section> */}

            {/* Section 10 */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">10. Changes to Terms</h2>
                <p>
                    We may update these Terms periodically. Changes will be reflected in the app, and continued use indicates acceptance of the updated Terms.
                </p>
            </section>

            {/* Section 11 */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
                <p>If you have any questions about these Terms and Conditions, please contact us:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Email:</strong> kumar.sumankumar3g@gmail.com</li>
                    <li><strong>Address:</strong> Gidhour, Chatra, 825408</li>
                </ul>
            </section>
        </div>
    );
};

export default TermsAndConditions;
