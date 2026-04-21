import { Head, Link } from '@inertiajs/react';
import { Database, Gavel, ArrowRight } from 'lucide-react';
import { dashboard } from '@/routes';

export default function Dashboard({ factCount, ruleCount }: { factCount: number, ruleCount: number }) {
    return (
        <>
            <Head title="Live Monitoring" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                
                <div className="mb-2">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h2>
                    <p className="text-gray-500 dark:text-gray-400">Knowledge Base dari Sistem Pakar</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    
                    {/* Card 1: Fakta */}
                    <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-xs flex flex-col justify-between transition-all hover:shadow-md">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Total Fakta</h3>
                                <div className="mt-2 flex items-baseline gap-2">
                                    <span className="text-5xl font-extrabold text-gray-900 dark:text-white">{factCount || 0}</span>
                                </div>
                            </div>
                            <div className="rounded-full bg-indigo-50 dark:bg-indigo-900/30 p-4 border border-indigo-100 dark:border-indigo-800">
                                <Database className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
                            </div>
                        </div>
                        <div className="mt-8 border-t border-gray-100 dark:border-neutral-800 pt-5">
                            <Link 
                                href="/admin/facts" 
                                className="inline-flex items-center text-sm font-bold text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors group"
                            >
                                Kelola Fakta
                                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>

                    {/* Card 2: Aturan */}
                    <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-xs flex flex-col justify-between transition-all hover:shadow-md">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Total Aturan</h3>
                                <div className="mt-2 flex items-baseline gap-2">
                                    <span className="text-5xl font-extrabold text-gray-900 dark:text-white">{ruleCount || 0}</span>
                                </div>
                            </div>
                            <div className="rounded-full bg-emerald-50 dark:bg-emerald-900/30 p-4 border border-emerald-100 dark:border-emerald-800">
                                <Gavel className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
                            </div>
                        </div>
                        <div className="mt-8 border-t border-gray-100 dark:border-neutral-800 pt-5">
                            <Link 
                                href="/admin/rules" 
                                className="inline-flex items-center text-sm font-bold text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors group"
                            >
                                Kelola Aturan
                                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>

                </div>
                
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
