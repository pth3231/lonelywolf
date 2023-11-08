function Home() {
    return (
        <div className="Home">
            {/* This is navbar */}
            <header className="flex header top-0 left-0 z-40 w-full items-center bg-transparent absolute justify-center">
                <div className="px-4 container flex justify-between">
                    <div className="p-4 flex">
                        <p className="mx-12 my-4 text-slate-50">Logo</p>
                        
                        <div className="md:mx-6 mx-4 flex items-center text-slate-50">
                            <a className="px-8 text-slate-50" href="/">
                                <span>Home</span>
                            </a>
                            <a className="pl-16 px-8 text-slate-50 hover:decoration-dashed" href="/game">
                                <b>Play</b>
                            </a>
                        </div>
                    </div>

                    <a className="flex items-center" href="/login">
                        <span className="py-4 px-12 text-slate-50 hover:bg-blue-600">Login</span>
                    </a>
                </div>

                <div className=""></div>
            </header>
        </div>
    );
}

export default Home;