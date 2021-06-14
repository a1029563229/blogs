function acquireCityAreaCodeData(input, country) {
  const lines = input.split('\n');
  let firstLine = true;
  const result = [];
  for (const line of lines) {
    if (firstLine) {
      firstLine = false;
      continue;
    }
    if (line.trim() === '') continue;
    const record = line.split(',');
    if (record[1].trim() === country) {
      result.push({ city: record[0].trim(), phone: record[2].trim() });
    }
  }
  return result;
}