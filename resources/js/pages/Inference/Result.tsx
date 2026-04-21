import { Head, Link } from '@inertiajs/react';

export default function Result({ triggered_rules, selected_facts }: { triggered_rules: any[], selected_facts: any[] }) {
    const hasMatch = triggered_rules && triggered_rules.length > 0;

    return (
        <>
            <Head title="Inference Result" />
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
                <div className="max-w-4xl w-full">
                    
                    {/* Selected Facts Counter */}
                    <div className="mb-4 flex items-center justify-end">
                        <span className="text-gray-500 font-medium bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm transition-all drop-shadow-sm">
                            Fakta terpilih: {selected_facts?.length || 0}
                        </span>
                    </div>

                    <div className={`rounded-2xl shadow-xl overflow-hidden border ${hasMatch ? 'border-red-200' : 'border-green-200'}`}>
                        {/* Header */}
                        <div className={`px-6 py-8 sm:p-10 text-center ${hasMatch ? 'bg-gradient-to-b from-red-600 to-red-700' : 'bg-gradient-to-b from-green-500 to-green-600'}`}>
                            <div className="mx-auto w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6">
                                {hasMatch ? (
                                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                ) : (
                                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                )}
                            </div>
                            <h2 className="text-3xl font-extrabold text-white mb-2">
                                {hasMatch ? `Pelanggaran teridentifikasi (${triggered_rules.length})` : 'Tidak Ada Pelanggaran (No Violation)'}
                            </h2>
                            <p className="text-white/80 text-lg">
                                {hasMatch ? 'Sistem pakar mengkalkulasi kumpulan aturan yang dilanggar melalui multi-match data pipeline:' : 'The provided facts do not map to any known fouls.'}
                            </p>
                        </div>

                        {/* Body - Triggered Rules Multi-Match Area */}
                        <div className="bg-white px-6 py-8 sm:p-10">
                            {hasMatch && (
                                <div className="space-y-6">
                                    {triggered_rules.map((rule, idx) => {
                                        // Dynamically determine AND / OR logic badge
                                        const logicType = rule.rule_conditions && rule.rule_conditions.length > 1 ? 'AND' : 'OR';
                                        
                                        return (
                                            <div key={idx} className="border border-red-100 bg-white shadow-sm rounded-xl overflow-hidden flex flex-col hover:border-red-300 transition-colors">
                                                {/* Card Header Flexbox */}
                                                <div className="p-4 bg-gray-50 border-b border-gray-100 flex flex-wrap items-center">
                                                    <h3 className="text-xl font-bold text-gray-900">
                                                        {rule.goal_name}
                                                    </h3>
                                                </div>
                                                
                                                {/* Card Body */}
                                                <div className="p-5 text-gray-700 leading-relaxed md:text-lg">
                                                    <p>{rule.output_description}</p>
                                                </div>
                                                
                                                {/* Card Footer */}
                                                <div className="p-4 bg-gray-50 border-t border-gray-100 text-sm flex flex-col gap-2">
                                                    <span className="font-bold text-gray-600">Fakta pemicu:</span>
                                                    <ul className="list-disc pl-5 mt-1 space-y-1 text-gray-700">
                                                        {rule.triggering_facts?.map((f: any) => (
                                                            <li key={f.id}>{f.description}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Fallback View (No Match) */}
                            {!hasMatch && (
                                <div>
                                    <h3 className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-4 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                                        Facts Evaluated
                                    </h3>
                                    {selected_facts && selected_facts.length > 0 ? (
                                        <ul className="space-y-3">
                                            {selected_facts.map((fact) => (
                                                <li key={fact.id} className="flex gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100">
                                                    <div className="mt-0.5 text-indigo-500">
                                                        <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                                    </div>
                                                    <div>
                                                        <span className="font-medium text-gray-800">{fact.description}</span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div className="p-4 bg-gray-50 text-gray-500 italic rounded-lg border border-gray-100">
                                            No facts were provided for this evaluation.
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        
                        {/* Footer Options */}
                        <div className="bg-gray-50 px-6 py-6 border-t border-gray-100 flex justify-center">
                            <Link
                                href="/inference"
                                className="inline-flex items-center gap-2 py-3 px-8 text-base font-semibold rounded-full text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transition-colors focus:ring-4 focus:ring-indigo-100 focus:outline-none"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                                Analisis Kasus Lain
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
