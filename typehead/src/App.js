import { ListBox } from "./searchBox/ListBox";
import { Search } from "./searchBox/Search";
import "./App.css";

const maxItems = 5;
export default function App() {
  const transformData = (data) => data.results.slice(0, maxItems);
  const dataPromise = async (query, signal) =>
    await fetch(`https://swapi.dev/api/people/?search=${query}`, { signal });
  return (
    <div className="wrapper">
      <Search
        id="personName"
        name="personName"
        label="Enter Person Name"
        placeholder="Enter Your Favourite Star war Character"
        autoComplete={true}
        maxItems={5}
        styles={{
          label: "label",
          input: "input"
        }}
        debounceWait={400}
        listBox={(items, activeIndex) => (
          <ListBox items={items} activeIndex={activeIndex} />
        )}
        noItemMessage={() => <div> Sorry no person found</div>}
        errorMessage={() => <div>Something went wrong</div>}
        transformData={transformData}
        promise={dataPromise}
      />
    </div>
  );
}
