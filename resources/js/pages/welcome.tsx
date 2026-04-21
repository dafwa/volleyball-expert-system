import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome({ canRegister }: { canRegister?: boolean }) {
    const { auth } = usePage<any>().props;
    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                    <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-600 rounded-full blur-[120px] opacity-20"></div>
                    <div className="absolute top-[60%] -right-[10%] w-[40%] h-[60%] bg-indigo-600 rounded-full blur-[120px] opacity-20"></div>
                </div>

                {/* Auth Navigation */}
                <div className="absolute top-0 right-0 p-6 z-20 flex items-center gap-4">
                    {auth?.user ? (
                        <Link
                            href="/dashboard"
                            className="font-semibold text-gray-300 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md px-3 py-2"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="font-semibold text-gray-300 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md px-3 py-2"
                            >
                                Log in
                            </Link>
                            {canRegister && (
                                <Link
                                    href="/register"
                                    className="font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md px-4 py-2"
                                >
                                    Register
                                </Link>
                            )}
                        </>
                    )}
                </div>

                <div className="relative z-10 flex flex-col items-center max-w-3xl text-center space-y-8">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
                        Volleyball <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Foul Expert System</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300">
                        Deteksi pelanggaran dalam Bola Voli menggunakan Sistem Inferensi Forward Chaining.
                    </p>
                    
                    <div className="mt-8">
                        <Link
                            href="/inference"
                            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-indigo-600 rounded-full overflow-hidden transition-all duration-300 hover:bg-indigo-700 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 shadow-lg shadow-indigo-600/30"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Mulai Analisis
                                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
