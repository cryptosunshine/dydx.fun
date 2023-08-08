// __tests__/example.test.ts

// 引入被测试的模块或组件
import { add, subtract } from '@/utils/math';

// 测试 add 函数
describe('add function', () => {
  it('should add two numbers correctly', () => {
    expect(add(1, 2)).toBe(3);
    expect(add(0, 0)).toBe(0);
    expect(add(-1, 1)).toBe(0);
  });
});

// 测试 subtract 函数
describe('subtract function', () => {
  it('should subtract two numbers correctly', () => {
    expect(subtract(3, 2)).toBe(1);
    expect(subtract(0, 0)).toBe(0);
    expect(subtract(-1, -1)).toBe(0);
  });
});
