export function TitleBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-24 p-2 sticky top-0 bg-white z-50 border-b-2 border-black font-mono">
      <div className="h-full mx-auto flex flex-col items-center">
        <h1 className="font-bold w-fit p-2 capitalize text-3xl border-black border rounded text-center align-middle">
          U
        </h1>
        <h2 className="tracking-[1rem] font-thin text-xl">UNIX</h2>
      </div>
      {children}
    </div>
  );
}
