/**
 * Reusable utility to generate and download CSV files on the frontend.
 */

export function downloadCSV(data: any[], headers: string[], filename: string) {
  if (data.length === 0) return;

  // 1. Create CSV content
  const csvRows = [];
  
  // Header row
  csvRows.push(headers.join(","));

  // Data rows
  for (const row of data) {
    const values = headers.map(header => {
      // Get value from row (header is the key)
      // Note: In a production app, we'd map pretty headers to object keys
      const val = row[header] || "";
      
      // Escape commas and wrap in quotes if necessary
      const escaped = ("" + val).replace(/"/g, '""');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(","));
  }

  const csvString = csvRows.join("\n");

  // 2. Create Blob and trigger download
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up
  URL.revokeObjectURL(url);
}

/**
 * Formats a date to YYYY-MM-DD
 */
export function getFormattedDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
