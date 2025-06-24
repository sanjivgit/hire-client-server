const PrivacyPolice = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
            <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>

            <p className="mb-4"><strong>Effective Date:</strong> 24-06-2025</p>

            <p className="mb-4">
                Thank you for choosing to be part of our community. This Privacy Policy applies to your use of our mobile application ("Ridhi Solution") which provides a platform to request or provide various services like electrician, plumber, maid, cooler/fan repair, and more.
            </p>

            <p className="mb-8">
                We are committed to protecting your personal data and your right to privacy. If you have any questions or concerns about this Privacy Policy or our practices regarding your personal information, please contact us at <strong>kumar.sumankumar3g@gmail.com</strong>.
            </p>

            {/* Section 1 */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
                <h3 className="text-lg font-medium mb-2">1.1 Information You Provide to Us:</h3>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Phone Number (for login and verification via OTP)</li>
                    <li>Personal Information (Name, Address, Email, etc.)</li>
                    <li>Profile Picture (for partners)</li>
                    <li>Identity Proofs (Aadhaar, PAN card — for partner verification)</li>
                    <li>Service Request Details (type, location, time)</li>
                    <li>Partner Registration Details (service type, location, documents)</li>
                </ul>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Register and verify user accounts</li>
                    <li>Authenticate login via OTP</li>
                    <li>Allow users to request or provide services</li>
                    <li>Connect service providers with users</li>
                    <li>Send real-time notifications about request status or updates</li>
                    <li>Process partner applications and verify identity documents</li>
                    <li>Improve and personalize user experience</li>
                    <li>Ensure safety and prevent fraud</li>
                </ul>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. Sharing of Information</h2>
                <p className="mb-4">We may share your personal data with:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Verified Partners:</strong> Once a service request is accepted, your contact details will be shared with the partner.</li>
                    <li><strong>Verification Team:</strong> Your ID documents may be shared with our admin panel team for verification purposes.</li>
                    <li><strong>Law Enforcement or Legal Requirements:</strong> When required to comply with legal obligations or protect user safety.</li>
                </ul>
                <p className="mt-2">We do <strong>not sell</strong> or rent your personal information to any third party.</p>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Your Rights and Controls</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Access or update your personal information</li>
                    <li>Delete your account and associated data</li>
                    <li>Withdraw from receiving notifications (where applicable)</li>
                    <li>Request correction or erasure of your data</li>
                </ul>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
                <p>
                    We implement appropriate technical and organizational security measures to protect your data. However, no electronic transmission is 100% secure. We urge you to use strong passwords and maintain confidentiality of your OTPs.
                </p>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Account Deletion</h2>
                <p>
                    You may delete your account at any time through the app. Upon deletion, your personal data will be erased from our systems except where retention is legally required.
                </p>
            </section>

            {/* Section 7 */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">7. Children’s Privacy</h2>
                <p>
                    Our services are <strong>not intended for children under the age of 13</strong>. We do not knowingly collect personal data from children under 13 years of age.
                </p>
            </section>

            {/* Section 8 */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">8. Changes to This Privacy Policy</h2>
                <p>
                    We may update this Privacy Policy from time to time. Any changes will be posted within the app and the updated date will be reflected at the top.
                </p>
            </section>

            {/* Section 9 */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
                <p>If you have any questions or concerns about this Privacy Policy, contact us at:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Email:</strong> kumar.sumankumar3g@gmail.com</li>
                    <li><strong>Address:</strong> Gidhour, Chatra, 825408 </li>
                </ul>
            </section>
        </div>
    )
}

export default PrivacyPolice
