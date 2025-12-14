import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { listIssues } from '@/lib/linear';
import { FeatureRequestForm } from '@/components/linear/FeatureRequestForm';
import { IssuesList } from '@/components/linear/IssuesList';

export const dynamic = 'force-dynamic';

export default async function FeatureRequestsPage() {
    let issues:
        | Array<{
            identifier: string;
            title: string;
            url: string | null;
            priority: number;
            updatedAt: string;
            state: { name: string; type: string } | null;
        }>
        | null = null;
    let loadError: string | null = null;

    try {
        issues = await listIssues(['Schedulr App', 'Feature'], { first: 50 });
    } catch (err) {
        console.error('Failed to load Linear issues for /feature-requests', err);
        issues = []; // Don't show error for features, just empty list if fails?
        // Actually show error if dev
        if (process.env.NODE_ENV === 'development' && err instanceof Error) {
            loadError = `Issues unavailable (dev): ${err.message}`;
        }
    }

    return (
        <div className="min-h-screen flex flex-col overflow-x-hidden">
            <Navbar />
            <main className="flex-1">
                <section className="relative min-h-screen bg-gradient-to-b from-white via-indigo-50/30 to-white pt-40 pb-20">
                    <div className="container-content max-w-4xl">
                        <div className="text-center mb-10">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-heading">Feature Requests</h1>
                            <p className="text-lg text-gray-600 mt-3 max-w-2xl mx-auto">
                                Have an idea? Let us know! We review all requests and prioritize based on community feedback.
                            </p>
                        </div>

                        {/* Feature Request Form */}
                        <div className="mb-16">
                            <FeatureRequestForm />
                        </div>

                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 font-heading">Community Requests</h2>
                            <p className="text-gray-500 mt-1">See what others are asking for (label: <span className="font-semibold">Feature</span>)</p>
                        </div>

                        <IssuesList
                            issues={issues}
                            loadError={loadError}
                            emptyMessage="No feature requests found yet. Be the first!"
                        />
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
