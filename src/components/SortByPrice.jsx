export default function SortByPrice({ handleSortByPrice }) {
  return (
    <div>
      <p>Filter by price</p>
      <select onChange={handleSortByPrice}>
        <option value="default">Default</option>
        <option value="lowToHigh">Low to high</option>
        <option value="highToLow">High to low</option>
      </select>
    </div>
  );
}
