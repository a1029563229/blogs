const { Size, convertToUTC0 } = require('./batch_replace.js');

describe('Size and checkSize tests', () => {
  // Mock console.log to track calls
  let consoleOutput = [];
  const mockConsoleLog = output => consoleOutput.push(output);
  const originalConsoleLog = console.log;

  beforeEach(() => {
    // Clear the consoleOutput array before each test
    consoleOutput = [];
    console.log = mockConsoleLog;
  });

  afterEach(() => {
    // Restore original console.log after each test
    console.log = originalConsoleLog;
  });

  test('should correctly identify small size', () => {
    const small = new Size('small');
    small.width = 100;
    small.height = 100;
    
    checkSize(small);
    expect(consoleOutput).toEqual(['small']);
  });

  test('should correctly identify medium size', () => {
    const medium = new Size('medium');
    medium.width = 200;
    medium.height = 200;
    
    checkSize(medium);
    expect(consoleOutput).toEqual(['medium']);
  });

  test('should correctly identify large size', () => {
    const large = new Size('large');
    large.width = 300;
    large.height = 300;
    
    checkSize(large);
    expect(consoleOutput).toEqual(['large']);
  });

  test('should not log anything for unknown size', () => {
    const unknown = new Size('unknown');
    unknown.width = 150;
    unknown.height = 150;
    
    checkSize(unknown);
    expect(consoleOutput).toEqual([]);
  });
}); 