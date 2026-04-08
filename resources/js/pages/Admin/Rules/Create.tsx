import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ factsGrouped }: { factsGrouped: Record<string, any[]> }) {
    const { data, setData, post, processing, errors } = useForm<{
        code: string;
        goal_name: string;
        output_description: string;
        fact_ids: number[];
    }>({
        code: '',
        goal_name: '',
        output_description: '',
        fact_ids: [],
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/rules');
    };

    const handleCheckboxChange = (id: number) => {
        const newIds = [...data.fact_ids];
        if (newIds.includes(id)) {
            setData('fact_ids', newIds.filter(val => val !== id));
        } else {
            setData('fact_ids', [...newIds, id]);
        }
    };

    return (
        <>
            <Head title="Create Rule" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <form onSubmit={submit} className="flex flex-col md:flex-row gap-6">
                    {/* Left side: Form fields */}
                    <div className="w-full md:w-1/3 space-y-6 bg-white dark:bg-neutral-900 shadow rounded-lg border border-gray-200 dark:border-neutral-800 p-6 self-start">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Code</label>
                            <input
                                type="text"
                                value={data.code}
                                onChange={(e) => setData('code', e.target.value)}
                                className="w-full rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="e.g. R01"
                            />
                            {errors.code && <p className="mt-1 text-sm text-red-600">{errors.code}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Goal Name</label>
                            <input
                                type="text"
                                value={data.goal_name}
                                onChange={(e) => setData('goal_name', e.target.value)}
                                className="w-full rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="e.g. Four Hits Foul"
                            />
                            {errors.goal_name && <p className="mt-1 text-sm text-red-600">{errors.goal_name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Output Description</label>
                            <textarea
                                value={data.output_description}
                                onChange={(e) => setData('output_description', e.target.value)}
                                rows={5}
                                className="w-full rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            {errors.output_description && <p className="mt-1 text-sm text-red-600">{errors.output_description}</p>}
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                            >
                                Save Rule
                            </button>
                            <Link href="/admin/rules" className="w-full text-center bg-gray-100 text-gray-800 dark:bg-neutral-800 dark:text-gray-200 px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-neutral-700">
                                Cancel
                            </Link>
                        </div>
                    </div>

                    {/* Right side: Fact Conditions Selection */}
                    <div className="w-full md:w-2/3 bg-white dark:bg-neutral-900 shadow rounded-lg border border-gray-200 dark:border-neutral-800 p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-neutral-800 pb-2">
                            Select Rule Conditions
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                            Check all the facts that MUST be true (AND logic) to trigger this rule.
                        </p>

                        <div className="space-y-8">
                            {Object.entries(factsGrouped).map(([category, facts]) => (
                                <div key={category}>
                                    <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-3">
                                        {category || 'Uncategorized'}
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {facts.map((fact) => (
                                            <label
                                                key={fact.id}
                                                className={`flex items-start p-3 border rounded-lg cursor-pointer transition-colors ${
                                                    data.fact_ids.includes(fact.id)
                                                        ? 'bg-indigo-50 border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800'
                                                        : 'bg-white border-gray-200 hover:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-800 dark:hover:bg-neutral-800/50'
                                                }`}
                                            >
                                                <div className="flex h-5 items-center mt-0.5">
                                                    <input
                                                        type="checkbox"
                                                        value={fact.id}
                                                        checked={data.fact_ids.includes(fact.id)}
                                                        onChange={() => handleCheckboxChange(fact.id)}
                                                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 dark:border-neutral-600 dark:bg-neutral-700"
                                                    />
                                                </div>
                                                <div className="ml-3 text-sm">
                                                    <span className="block font-medium text-gray-900 dark:text-gray-100">{fact.code}</span>
                                                    <span className="block text-gray-500 dark:text-gray-400">{fact.description}</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {errors.fact_ids && <p className="mt-4 text-sm font-semibold text-red-600">{errors.fact_ids}</p>}
                    </div>
                </form>
            </div>
        </>
    );
}

Create.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Rules', href: '/admin/rules' },
        { title: 'Create', href: '/admin/rules/create' },
    ],
};
