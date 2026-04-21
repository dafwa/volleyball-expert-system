import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ facts }: { facts: Record<string, any[]> }) {
    const { data, setData, post, processing, errors } = useForm<{ fact_ids: number[] }>({
        fact_ids: [],
    });

    const categories = Object.keys(facts);
    
    // activeCategory: null = grid view | string = fact list view
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const handleCheckboxChange = (id: number) => {
        let newIds = [...data.fact_ids];
        if (newIds.includes(id)) {
            newIds = newIds.filter(val => val !== id);
        } else {
            newIds.push(id);
        }
        setData('fact_ids', newIds);
    };

    const submit = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        post('/inference/result');
    };

    return (
        <>
            <Head title="Inference Engine" />
            {/* Added pb-24 to ensure the floating button never covers content */}
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pb-32">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-6">
                        <Link
                            href="/"
                            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 hover:bg-gray-50"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Kembali ke Halaman Utama
                        </Link>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                        <div className="px-6 py-8 sm:p-10 border-b border-gray-100 bg-gradient-to-r from-blue-600 to-indigo-700">
                            <h2 className="text-3xl font-extrabold text-white">Pilih Fakta</h2>
                            <p className="mt-2 text-indigo-100 text-lg">
                                {activeCategory 
                                    ? `Pilih Fakta yang sesuai dengan kejadian`
                                    : 'Silahkan pilih kategori di bawah untuk melihat dan memilih fakta yang terjadi.'}
                            </p>
                        </div>

                        <div className="p-6 sm:p-8 min-h-[400px]">
                            {activeCategory === null ? (
                                /* View 1 - Stateful Category Grid */
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                    {categories.map((category) => {
                                        const selectedCount = facts[category].filter((f: any) => data.fact_ids.includes(f.id)).length;
                                        return (
                                            <button
                                                key={category}
                                                type="button"
                                                onClick={() => setActiveCategory(category)}
                                                className="relative flex flex-col items-start p-6 bg-white border-2 border-gray-100 rounded-xl hover:border-indigo-500 hover:shadow-lg transition-all duration-200 text-left group"
                                            >
                                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">
                                                    {category || 'Uncategorized'}
                                                </h3>
                                                <span className="mt-2 text-sm text-gray-500">
                                                    {facts[category].length} facts available
                                                </span>
                                                
                                                {/* Badge indicating how many items are already checked inside this category */}
                                                {selectedCount > 0 && (
                                                    <span className="absolute top-4 right-4 bg-indigo-100 text-indigo-800 text-xs px-2.5 py-1 rounded-full font-bold shadow-sm">
                                                        {selectedCount} selected
                                                    </span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            ) : (
                                /* View 2 - Fact Selection List */
                                <div className="flex flex-col animate-in fade-in duration-300">
                                    <button 
                                        type="button"
                                        onClick={() => setActiveCategory(null)}
                                        className="self-start mb-8 text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center transition-colors px-3 py-1.5 rounded-lg hover:bg-indigo-50"
                                    >
                                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                        </svg>
                                        Kembali ke Kategori
                                    </button>
                                    
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6">{activeCategory}</h3>
                                    
                                    <div className="space-y-4">
                                        {facts[activeCategory].map((fact: any) => (
                                            <label
                                                key={fact.id}
                                                className={`relative flex items-start p-5 rounded-2xl cursor-pointer transition-all duration-200 ${
                                                    data.fact_ids.includes(fact.id)
                                                        ? 'bg-indigo-50 border-2 border-indigo-500 shadow-sm'
                                                        : 'bg-white border-2 border-gray-100 hover:border-indigo-300 hover:shadow-md'
                                                }`}
                                            >
                                                <div className="flex items-center h-5 mt-1">
                                                    <input
                                                        type="checkbox"
                                                        className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 transition-colors"
                                                        checked={data.fact_ids.includes(fact.id)}
                                                        onChange={() => handleCheckboxChange(fact.id)}
                                                    />
                                                </div>
                                                <div className="ml-5 flex flex-col justify-center cursor-pointer flex-grow mt-0.5">
                                                    <span className="block text-base font-medium text-gray-900 leading-relaxed">
                                                        {fact.description}
                                                    </span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                    {errors.fact_ids && <div className="text-red-500 text-sm mt-4 font-bold">{errors.fact_ids}</div>}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* View 3 - Floating Action Button */}
            {data.fact_ids.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 p-8 pt-20 bg-gradient-to-t from-white via-white to-transparent flex justify-center z-50 pointer-events-none animate-in slide-in-from-bottom flex justify-center">
                    <button
                        type="button"
                        onClick={submit}
                        disabled={processing}
                        className="pointer-events-auto flex items-center justify-center py-4 px-10 rounded-full shadow-2xl text-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:hover:-translate-y-0 disabled:cursor-not-allowed"
                    >
                        {processing ? 'Processing Engine...' : `Analisis (${data.fact_ids.length}) Fakta Terpilih`}
                    </button>
                </div>
            )}
        </>
    );
}
