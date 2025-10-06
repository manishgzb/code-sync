import { Link } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
const HomePage = () => {
    return (
        <>
            <>
            <Header/>
                <main className="flex-1">
                    <section className="flex min-h-[60vh] items-center justify-center bg-white py-20 text-center">
                        <div className="container mx-auto px-4">
                            <div className="mx-auto max-w-3xl">
                                <h1 className="text-5xl font-bold leading-tight tracking-tighter text-gray-900 sm:text-6xl md:text-7xl">
                                    Let's Code Together with{" "}
                                    <span className="text-primary">Code-Sync</span>.
                                </h1>
                                <p className="mt-4 text-base text-gray-600 md:text-lg">
                                    A real-time code editor.
                                </p>
                                <div className="mt-8 flex flex-wrap justify-center gap-4">
                                    <Link to={'/editor'} className="rounded-md bg-primary px-8 py-3 text-lg font-bold text-white transition-transform hover:scale-105">
                                        Start Coding Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="py-16 sm:py-24 bg-gray-50">
                        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
                                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                    Key Features
                                </h2>
                                <p className="mt-4 text-base text-gray-600">
                                    Designed for seamless collaboration.
                                </p>
                            </div>
                            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
                                <div className="flex flex-col gap-4 rounded-lg border-2 dotted-border border-gray-300 p-6 text-center">
                                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                        <span className="material-symbols-outlined text-4xl"><img className="h-10 w-10" src="https://img.icons8.com/?size=100&id=50173&format=png&color=000000"></img></span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <h3 className="text-xl font-bold text-gray-900">
                                            Live Code Editing
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            See changes from your teammates in an instant.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4 rounded-lg border-2 dotted-border border-gray-300 p-6 text-center">
                                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                                        <span className="material-symbols-outlined text-4xl">
                                           <img className="h-10 w-10" src="https://img.icons8.com/?size=100&id=SVQoxUtWRhn2&format=png&color=#256452"></img>
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <h3 className="text-xl font-bold text-gray-900">
                                            Multiple Room Options
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Create public or private rooms for your projects.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4 rounded-lg border-2 dotted-border border-gray-300 p-6 text-center">
                                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
                                        <span className="material-symbols-outlined text-4xl">
                                           <img className="h-10 w-10" src="https://img.icons8.com/?size=100&id=52144&format=png&color=000000"/>
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <h3 className="text-xl font-bold text-gray-900">
                                            Conflict-Free Editing
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Our system handles simultaneous edits gracefully.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                <Footer/>
            </>

        </>
    )
}
export default HomePage