import { Entry } from './components/entry';
import { TitleBar } from './components/titleBar';
import { useEntries } from './lib/useEntries';
import useOnIntersection from './lib/useOnIntersection';

function App() {
  const { entries, page, filters, sort, setSort, setFilters } = useEntries();

  const observerRef = useOnIntersection<HTMLDivElement>({
    onIntersect: () => {
      console.log('Fetching', page);
      // nextPage(); // Causing infinite render
    },
  });

  return (
    <div>
      <TitleBar
        sort={sort}
        setFilters={setFilters}
        filters={filters}
        setSort={setSort}
      />
      <div>
        {entries.map((entry) => (
          <Entry key={entry.id} entry={entry} />
        ))}
      </div>
      <div className="h-10 w-full mt-24" ref={observerRef} />
    </div>
  );
}

export default App;
