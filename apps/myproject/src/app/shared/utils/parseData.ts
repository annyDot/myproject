export function parseData(data: any): any[] {
  try {
    const parsedData = typeof data === 'string' ? JSON.parse(data) : data;

    return Array.isArray(parsedData) ? parsedData : [parsedData];
  } catch (error) {
    console.error('Error parsing data:', error);
    return [];
  }
}
