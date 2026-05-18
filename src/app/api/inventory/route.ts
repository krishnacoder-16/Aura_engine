import { NextRequest, NextResponse } from "next/server";
import { MOCK_INVENTORY } from "@/mock/inventory";
import { InventoryItem } from "@/features/inventory/types";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  // Parse query params
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "50", 10);
  const search = searchParams.get("search")?.toLowerCase() || "";
  const category = searchParams.get("category") || "";
  const status = searchParams.get("status") || "";
  const warehouse = searchParams.get("warehouse") || "";
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const maxStock = searchParams.get("maxStock");
  
  const sortId = searchParams.get("sortId") || "name";
  const sortDesc = searchParams.get("sortDesc") === "true";

  // Simulate network delay for enterprise realism
  await new Promise((resolve) => setTimeout(resolve, 600));

  let filteredData = [...MOCK_INVENTORY];

  // 1. Filtering
  if (search) {
    filteredData = filteredData.filter(
      (item) =>
        item.name.toLowerCase().includes(search) ||
        item.sku.toLowerCase().includes(search) ||
        item.category.toLowerCase().includes(search) ||
        item.supplier.toLowerCase().includes(search)
    );
  }

  if (category && category !== "all") {
    filteredData = filteredData.filter((item) => item.category === category);
  }

  if (status && status !== "all") {
    filteredData = filteredData.filter((item) => item.status === status);
  }

  if (warehouse && warehouse !== "All Warehouses") {
    filteredData = filteredData.filter((item) => item.warehouse === warehouse);
  }

  if (minPrice) {
    const min = parseFloat(minPrice);
    if (!isNaN(min)) filteredData = filteredData.filter((item) => item.price >= min);
  }

  if (maxPrice) {
    const max = parseFloat(maxPrice);
    if (!isNaN(max)) filteredData = filteredData.filter((item) => item.price <= max);
  }

  if (maxStock) {
    const max = parseInt(maxStock, 10);
    if (!isNaN(max)) filteredData = filteredData.filter((item) => item.stock <= max);
  }

  // 2. Sorting
  filteredData.sort((a, b) => {
    const aVal = a[sortId as keyof InventoryItem];
    const bVal = b[sortId as keyof InventoryItem];

    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortDesc ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
    }
    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortDesc ? bVal - aVal : aVal - bVal;
    }
    return 0;
  });

  // 3. Pagination
  const total = filteredData.length;
  const totalPages = Math.ceil(total / limit);
  
  // Ensure valid page
  const validPage = Math.max(1, Math.min(page, totalPages || 1));
  
  const skip = (validPage - 1) * limit;
  const paginatedData = filteredData.slice(skip, skip + limit);

  return NextResponse.json({
    data: paginatedData,
    total,
    page: validPage,
    totalPages,
    limit,
  });
}
