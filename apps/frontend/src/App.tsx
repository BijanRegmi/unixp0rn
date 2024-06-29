import { Entries } from './components/entry';
import { Filters } from './components/filters';
import { TitleBar } from './components/titleBar';
import { useEntries } from './lib/useEntries';
import useOnIntersection from './lib/useOnIntersection';

function App() {
  const { nextPage, refetch } = useEntries();

  const observerRef = useOnIntersection<HTMLDivElement>(nextPage);

  return (
    <div className="w-screen h-screen overflow-scroll">
      <TitleBar>
        <Filters refetch={refetch} />
      </TitleBar>
      <Entries />
      <div className="h-1 w-full mt-24" ref={observerRef} />
    </div>
  );
}

export default App;
