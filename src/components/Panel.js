export default function Panel({title, description, process, callback, appear}) {
    return (
        <>
        {
            (appear) ?
                <div className="flex flex-col fixed top-0 left-0 w-screen h-screen bg-slate-50/30 z-1 duration-200">
                    <button onClick={callback} className="text-slate-50">x</button>
                    <div className="flex flex-col bg-slate-900/70">
                        <span className="text-slate-50">{title}</span>
                        <span className="text-slate-50">{description}</span>
                        <span className="text-slate-50">{process}</span>
                    </div>
                </div>
                : null
        }
        </>
    )
}