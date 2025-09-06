import Link from "next/link";

export default function SupportPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-[10.875rem] py-10 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl text-charcoal font-bold">Support</h1>
        <p className="text-gray text-sm sm:text-base">
          Get help and learn more about AIChemist
        </p>
      </div>

      <div className="space-y-4">
        {/* Documentation */}
        <div className="border border-gold/30 p-4 sm:p-6 rounded-xl">
          <h2 className="text-lg text-charcoal">Documentation</h2>
          <p className="text-sm text-gray">Comprehensive guides and tutorials</p>
          <Link href="/docs">
            <button className="mt-2 text-charcoal font-semibold rounded-xl border border-gold/30 px-3 sm:px-4 py-2 hover:bg-gold hover:text-ivory w-full sm:w-auto">
              View Docs
            </button>
          </Link>
        </div>

        {/* Contact Support */}
        <div className="border border-gold/30 p-4 sm:p-6 rounded-xl">
          <h2 className="text-lg text-charcoal">Contact Support</h2>
          <p className="text-sm text-gray">Get personalized help from our team</p>
          <Link href="/contact-us">
            <button className="mt-2 text-charcoal font-semibold rounded-xl border border-gold/30 px-3 sm:px-4 py-2 hover:bg-gold hover:text-ivory w-full sm:w-auto">
              Contact Us
            </button>
          </Link>
        </div>

        {/* Community */}
        <div className="border border-gold/30 p-4 sm:p-6 rounded-xl">
          <h2 className="text-lg text-charcoal">Community</h2>
          <p className="text-sm text-gray">Join discussions with other users</p>
          <Link href="/community">
            <button className="mt-2 text-charcoal font-semibold rounded-xl border border-gold/30 px-3 sm:px-4 py-2 hover:bg-gold hover:text-ivory w-full sm:w-auto">
              Join Community
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
