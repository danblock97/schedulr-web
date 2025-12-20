'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Version {
    version: string;
    displayDate: string;
    title: string;
    summary: string;
    improvements?: string[];
    fixes?: string[];
    patches?: string[];
}

function CategoryAccordion({ title, items }: { title: string; items?: string[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const count = items?.length || 0;

    return (
        <div className="border-t border-gray-100">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-4 px-6 hover:bg-gray-50/50 transition-colors group text-left"
            >
                <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 capitalize">
                    {title} ({count})
                </span>
                {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                )}
            </button>
            {isOpen && count > 0 && (
                <div className="px-6 pb-4">
                    <ul className="space-y-2">
                        {items?.map((item, idx) => (
                            <li key={idx} className="text-sm text-gray-500 flex items-start gap-3">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export function ChangelogList({ versions }: { versions: Version[] }) {
    return (
        <div className="space-y-12">
            {versions.map((version) => (
                <div key={version.version} className="flex flex-col md:flex-row gap-8 md:gap-16">
                    {/* Left Column: Meta */}
                    <div className="md:w-48 flex-shrink-0 pt-2">
                        <div className="sticky top-32">
                            <div className="text-sm font-bold text-gray-900 mb-1">
                                {version.version}
                            </div>
                            <div className="text-sm text-gray-500 font-medium">
                                {version.displayDate}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Content Card */}
                    <div className="flex-grow">
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-md">
                            <div className="p-8 md:p-10 flex flex-col lg:flex-row gap-8">
                                {/* Title Section */}
                                <div className="lg:w-1/2">
                                    <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                                        {version.title}
                                    </h2>
                                </div>

                                {/* Summary Section */}
                                <div className="lg:w-1/2">
                                    <p className="text-gray-500 leading-relaxed text-[15px]">
                                        {version.summary}
                                    </p>
                                </div>
                            </div>

                            {/* Expandable Categories */}
                            <div className="bg-white">
                                <CategoryAccordion title="Improvements" items={version.improvements} />
                                <CategoryAccordion title="Fixes" items={version.fixes} />
                                <CategoryAccordion title="Patches" items={version.patches} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
