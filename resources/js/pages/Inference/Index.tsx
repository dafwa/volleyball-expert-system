import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ facts }: { facts: Record<string, any[]> }) {
    const { data, setData, post, processing, errors } = useForm<{ fact_ids: number[] }>({
        fact_ids: [],
    });

    const categories = Object.keys(facts);
    const [activeTab, setActiveTab] = useState(categories[0] || null);

    const handleCheckboxChange = (id: number) => {
        let newIds = [...data.fact_ids];
        if (newIds.includes(id)) {
            newIds = newIds.filter(val => val !== id);
        } else {
            newIds.push(id);
        }
        setData('fact_ids', newIds);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/inference/result');
    };

    return (
        <>
            <Head title="Inference Engine" />
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-6">
                        <Link
                            href="/"
                            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 hover:bg-gray-50"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Home
                        </Link>
                    </div>
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                        <div className="px-6 py-8 sm:p-10 border-b border-gray-100 bg-gradient-to-r from-blue-600 to-indigo-700">
                            <h2 className="text-3xl font-extrabold text-white">Select Facts</h2>
                            <p className="mt-2 text-indigo-100 text-lg">
                                Please check all the facts that apply to the situation to let the expert system infer the corresponding foul.
                            </p>
                        </div>

                        <form onSubmit={submit} className="flex flex-col md:flex-row min-h-[400px]">
                            {/* Sidebar / Tabs */}
                            <div className="w-full md:w-1/3 bg-gray-50 border-r border-gray-200 p-4">
                                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-3">Categories</h3>
                                <nav className="space-y-1">
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            type="button"
                                            onClick={() => setActiveTab(category)}
                                            className={`${
                                                activeTab === category
                                                    ? 'bg-blue-100 text-blue-700 font-medium border-blue-600'
                                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 border-transparent hover:border-gray-300'
                                            } flex items-center justify-between w-full px-3 py-3 text-sm rounded-lg transition-colors border-l-4 text-left`}
                                        >
                                            <span>{category}</span>
                                            <span className="bg-white text-gray-500 text-xs py-0.5 px-2 rounded-full border border-gray-200">
                                                {facts[category].length}
                                            </span>
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            {/* Content */}
                            <div className="w-full md:w-2/3 p-6 sm:p-8 flex flex-col">
                                <div className="flex-grow">
                                    {categories.map((category) => (
                                        <div
                                            key={category}
                                            className={activeTab === category ? 'block' : 'hidden'}
                                            role="tabpanel"
                                        >
                                            <h3 className="text-2xl font-bold text-gray-900 mb-6">{category}</h3>
                                            <div className="space-y-4">
                                                {facts[category].map((fact: any) => (
                                                    <label
                                                        key={fact.id}
                                                        className={`relative flex items-start p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                                                            data.fact_ids.includes(fact.id)
                                                                ? 'bg-blue-50 border-2 border-blue-500'
                                                                : 'bg-white border-2 border-gray-100 hover:border-gray-300 hover:bg-gray-50'
                                                        }`}
                                                    >
                                                        <div className="flex items-center h-5 mt-1">
                                                            <input
                                                                type="checkbox"
                                                                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition-colors"
                                                                checked={data.fact_ids.includes(fact.id)}
                                                                onChange={() => handleCheckboxChange(fact.id)}
                                                            />
                                                        </div>
                                                        <div className="ml-4 flex flex-col cursor-pointer flex-grow">
                                                            <span className="block text-sm font-medium text-gray-900">
                                                                Fact {fact.code}
                                                            </span>
                                                            <span className="block text-sm text-gray-500 mt-1">
                                                                {fact.description}
                                                            </span>
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                {errors.fact_ids && <div className="text-red-500 text-sm mt-4 font-medium">{errors.fact_ids}</div>}

                                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-500">
                                        {data.fact_ids.length} fact(s) selected
                                    </span>
                                    <button
                                        type="submit"
                                        disabled={processing || data.fact_ids.length === 0}
                                        className="inline-flex justify-center flex-shrink-0 py-3 px-6 border border-transparent shadow-sm text-base font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {processing ? 'Processing...' : 'Identify Foul'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
