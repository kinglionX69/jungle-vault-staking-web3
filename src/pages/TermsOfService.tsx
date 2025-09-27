import React from 'react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-jungle-950 py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="jungle-card bg-jungle-900/50 border-jungle-400/30 p-6 sm:p-8 lg:p-12">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-jungle-100 mb-4">Terms of Service</h1>
            <p className="text-jungle-300 text-lg">Last updated: December 2024</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-jungle-200 mb-4">1. Agreement to Terms</h2>
              <p className="text-jungle-300 mb-4">
                These Terms of Service ("Terms") constitute a legally binding agreement between you and Proud Lion Studios, 
                a company registered in the United Arab Emirates, regarding your use of Jungle Vault, a decentralized 
                staking platform built on the Aptos blockchain.
              </p>
              <p className="text-jungle-300">
                By accessing or using Jungle Vault, you agree to be bound by these Terms. If you do not agree to these Terms, 
                you may not access or use the platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-jungle-200 mb-4">2. Eligibility and Age Requirements</h2>
              <ul className="text-jungle-300 space-y-2 list-disc list-inside">
                <li>You must be at least 18 years old to use Jungle Vault</li>
                <li>You must have the legal capacity to enter into binding agreements</li>
                <li>You must not be restricted from using the platform under applicable laws</li>
                <li>You must comply with all local laws and regulations regarding cryptocurrency usage</li>
                <li>Use may be restricted or prohibited in certain jurisdictions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-jungle-200 mb-4">3. Platform Description</h2>
              <p className="text-jungle-300 mb-4">
                Jungle Vault is a decentralized finance (DeFi) platform that enables users to:
              </p>
              <ul className="text-jungle-300 space-y-2 list-disc list-inside">
                <li>Stake cryptocurrencies and earn rewards</li>
                <li>Create and manage staking pools</li>
                <li>Participate in milestone-based rewards systems</li>
                <li>Use NFT boosts to enhance staking rewards</li>
                <li>Track performance on leaderboards</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-jungle-200 mb-4">4. Cryptocurrency and DeFi Risks</h2>
              <div className="jungle-card bg-red-900/20 border-red-400/30 p-6 mb-4">
                <h3 className="text-xl font-medium text-red-200 mb-3">⚠️ Important Risk Disclosure</h3>
                <p className="text-red-200 mb-4">
                  Cryptocurrency and DeFi activities involve substantial risk. You acknowledge and accept these risks:
                </p>
                <ul className="text-red-200 space-y-2 list-disc list-inside">
                  <li><strong>Volatility:</strong> Cryptocurrency values can fluctuate dramatically</li>
                  <li><strong>Loss of Funds:</strong> You may lose some or all of your staked assets</li>
                  <li><strong>Technology Risks:</strong> Smart contracts and blockchain technology may have bugs or vulnerabilities</li>
                  <li><strong>Regulatory Risk:</strong> Cryptocurrency regulations may change and affect platform operations</li>
                  <li><strong>Liquidity Risk:</strong> You may not be able to unstake or withdraw funds immediately</li>
                  <li><strong>No Guarantees:</strong> Staking rewards are not guaranteed and may vary</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-jungle-200 mb-4">5. User Responsibilities</h2>
              <h3 className="text-xl font-medium text-jungle-200 mb-3">5.1 Wallet Security</h3>
              <ul className="text-jungle-300 mb-4 space-y-2 list-disc list-inside">
                <li>You are solely responsible for securing your wallet and private keys</li>
                <li>Never share your private keys or seed phrases with anyone</li>
                <li>We cannot recover lost wallets or reverse unauthorized transactions</li>
                <li>Enable appropriate security measures on your devices</li>
              </ul>

              <h3 className="text-xl font-medium text-jungle-200 mb-3">5.2 Prohibited Activities</h3>
              <p className="text-jungle-300 mb-4">You agree not to:</p>
              <ul className="text-jungle-300 space-y-2 list-disc list-inside">
                <li>Use the platform for illegal activities or money laundering</li>
                <li>Attempt to manipulate or exploit the platform's mechanisms</li>
                <li>Interfere with the platform's operation or security</li>
                <li>Create fake accounts or impersonate others</li>
                <li>Use automated tools or bots without permission</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-jungle-200 mb-4">6. Staking Terms</h2>
              <h3 className="text-xl font-medium text-jungle-200 mb-3">6.1 Staking Mechanism</h3>
              <ul className="text-jungle-300 mb-4 space-y-2 list-disc list-inside">
                <li>Staking involves locking your tokens in smart contracts</li>
                <li>Rewards are distributed based on staking algorithms and pool parameters</li>
                <li>Staking periods and withdrawal conditions vary by pool</li>
                <li>Some pools may have minimum staking periods or penalties for early withdrawal</li>
              </ul>

              <h3 className="text-xl font-medium text-jungle-200 mb-3">6.2 Pool Creation</h3>
              <ul className="text-jungle-300 space-y-2 list-disc list-inside">
                <li>Pool creators are responsible for providing accurate information</li>
                <li>Pool creators must fund reward pools as specified</li>
                <li>Pool parameters cannot be changed once created without user consent</li>
                <li>Pool creators may end pools early under specified conditions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-jungle-200 mb-4">7. Platform Availability</h2>
              <p className="text-jungle-300 mb-4">
                We strive to maintain platform availability but cannot guarantee uninterrupted service:
              </p>
              <ul className="text-jungle-300 space-y-2 list-disc list-inside">
                <li>The platform may be unavailable due to maintenance, updates, or technical issues</li>
                <li>Blockchain network congestion may affect transaction processing</li>
                <li>We reserve the right to modify or discontinue features with reasonable notice</li>
                <li>Emergency maintenance may be performed without prior notice</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-jungle-200 mb-4">8. Intellectual Property</h2>
              <p className="text-jungle-300 mb-4">
                All platform content, including but not limited to text, graphics, logos, and software, is owned by 
                Proud Lion Studios or its licensors and protected by intellectual property laws.
              </p>
              <ul className="text-jungle-300 space-y-2 list-disc list-inside">
                <li>You may not copy, modify, or distribute platform content without permission</li>
                <li>The Jungle Vault name and logo are trademarks of Proud Lion Studios</li>
                <li>You retain ownership of content you create, but grant us a license to display it</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-jungle-200 mb-4">9. Disclaimers and Limitation of Liability</h2>
              <div className="jungle-card bg-yellow-900/20 border-yellow-400/30 p-6">
                <h3 className="text-xl font-medium text-yellow-200 mb-3">Important Legal Disclaimers</h3>
                
                <h4 className="text-lg font-medium text-yellow-200 mb-2">9.1 No Warranties</h4>
                <p className="text-yellow-200 mb-4">
                  THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DISCLAIM ALL WARRANTIES, 
                  EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                </p>

                <h4 className="text-lg font-medium text-yellow-200 mb-2">9.2 Limitation of Liability</h4>
                <p className="text-yellow-200 mb-4">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, PROUD LION STUDIOS SHALL NOT BE LIABLE FOR ANY INDIRECT, 
                  INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR USE.
                </p>

                <h4 className="text-lg font-medium text-yellow-200 mb-2">9.3 Maximum Liability</h4>
                <p className="text-yellow-200">
                  OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT OF FEES YOU PAID TO US IN THE 12 MONTHS 
                  PRECEDING THE CLAIM.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-jungle-200 mb-4">10. Indemnification</h2>
              <p className="text-jungle-300">
                You agree to defend, indemnify, and hold harmless Proud Lion Studios, its officers, directors, employees, 
                and agents from any claims, damages, costs, and expenses (including reasonable attorneys' fees) arising 
                from your use of the platform or violation of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-jungle-200 mb-4">11. Force Majeure</h2>
              <p className="text-jungle-300">
                We shall not be liable for any failure to perform our obligations under these Terms due to circumstances 
                beyond our reasonable control, including but not limited to acts of God, war, terrorism, pandemic, 
                government actions, or blockchain network failures.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-jungle-200 mb-4">12. Governing Law and Dispute Resolution</h2>
              <p className="text-jungle-300 mb-4">
                These Terms shall be governed by and construed in accordance with the laws of the United Arab Emirates.
              </p>
              <ul className="text-jungle-300 space-y-2 list-disc list-inside">
                <li>Any disputes shall be resolved through binding arbitration in Dubai, UAE</li>
                <li>Arbitration shall be conducted under the Dubai International Arbitration Centre (DIAC) rules</li>
                <li>The arbitration shall be conducted in English</li>
                <li>You waive any right to class action or jury trial</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-jungle-200 mb-4">13. Termination</h2>
              <p className="text-jungle-300 mb-4">
                We may terminate or suspend your access to the platform at any time, with or without cause, with or without notice.
              </p>
              <ul className="text-jungle-300 space-y-2 list-disc list-inside">
                <li>You may stop using the platform at any time</li>
                <li>Termination does not affect pending transactions or staked funds</li>
                <li>Provisions regarding liability, indemnification, and dispute resolution survive termination</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-jungle-200 mb-4">14. Changes to Terms</h2>
              <p className="text-jungle-300">
                We reserve the right to modify these Terms at any time. We will provide reasonable notice of material changes. 
                Your continued use of the platform after changes constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-jungle-200 mb-4">15. Severability</h2>
              <p className="text-jungle-300">
                If any provision of these Terms is found to be unenforceable, the remaining provisions shall remain in full force and effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-jungle-200 mb-4">16. Contact Information</h2>
              <div className="jungle-card bg-jungle-800/30 border-jungle-400/20 p-6">
                <p className="text-jungle-300 mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="text-jungle-300 space-y-2">
                  <p><strong>Proud Lion Studios</strong></p>
                  <p>United Arab Emirates</p>
                  <p>Email: legal@junglevault.com</p>
                  <p>Platform: Jungle Vault</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-jungle-200 mb-4">17. Acknowledgment</h2>
              <p className="text-jungle-300">
                BY USING JUNGLE VAULT, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS OF SERVICE.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;