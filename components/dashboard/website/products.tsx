"use client";
import CustomTable from "@/components/dashboard/tables/CustomTable";
import { useRouter } from "next/navigation";

export default function Products() {
  const router = useRouter();

  const columns = [
    { field: "ProductName", header: "Product Name" },
    { field: "Image", header: "Image" },
    { field: "Warranty", header: "Warranty" },
    { field: "Hardness", header: "Hardness" },
    { field: "Elements", header: "Elements" },
    { field: "CountryOfManufacture", header: "Country of Manufacture" },
    { field: "Price", header: "Price" },
    { field: "Date", header: "Date" },
  ];

  const data = [
    {
      id: 1,
      ProductName: "Daimond Hypred",
      Image: "image_url_1",
      Warranty: "5 Years",
      Hardness: "9H",
      Elements: "Daimond",
      CountryOfManufacture: "Use",
      Price: "10,000 LE",
      Date: "Dec. 3, 2024",
    },
    {
      id: 2,
      ProductName: "Daimond Hypred",
      Image: "image_url_2",
      Warranty: "5 Years",
      Hardness: "9H",
      Elements: "Daimond",
      CountryOfManufacture: "Use",
      Price: "10,000 LE",
      Date: "Dec. 3, 2024",
    },
    // Add more product entries as needed
  ];
  const cardsData = [
    { title: "New requests", num: 145 },
    { title: "Complete", num: 87 },
    { title: "Pending", num: 3200 },
    { title: "Failed", num: 48 },
    { title: "Paid", num: 48 },
  ];
  const handleClick = () => {
    router.push("/dashboard/website/products/create");
  };

  return (
    <div className="px-6 pb-25">
      <CustomTable
                      emptyMessage="no products data found"

        editRoute="/dashboard/website/products/edit/"
        data={data}
        rows={10}
        columns={columns}
        cardData={cardsData}
        buttonText="Add Product"
        ButtonEvent={handleClick}
      />
    </div>
  );
}
