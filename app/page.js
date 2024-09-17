
import BusinessList from "./_components/BusinessList";
import CategoryList from "./_components/CategoryList";

export default function Home() {

  return (
    <div className="mt-28">
      <CategoryList></CategoryList>
      <BusinessList></BusinessList>
    </div>
  );
}



