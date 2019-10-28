# 分治策略对数组进行排序（二分排序算法）

今天我来熟悉巩固一下分治算法对数组进行排序，分治问题就是把复杂的大问题拆解成简单的小问题，再将小问题依次解决，假设我们要对下面这个数组进行排序输出：

```java
[ 32, 11, 22, 17, 222, 42, 162, 82, 1, 1231, 12, 2 ]
```

如果使用分治策略的话，我们需要先将大问题分解成小问题，我们可以先将长度 12 的数组分解为两个长度为 6 的数组，分解后如下

```java
[ 32, 11, 22, 17, 222, 42 ]
[ 162, 82, 1, 1231, 12, 2 ]
```

分解过后是否可以直接进行排序了呢？好像还是不太行，那么我们可以继续分解，分解到可以直接进行比较为止

```java
// 第二次分解
[ 32, 11, 22 ] 
[ 17, 222, 42 ] 

[ 162, 82, 1 ] 
[ 1231, 12, 2 ]

// 第三次分解

[ 32, 11 ]
[ 22 ]

[ 17, 222 ]
[ 42 ]

[ 162, 82 ]
[ 1 ]

[ 1231, 12 ]
[ 2 ]

// 第四次分解

[ 32 ]
[ 11 ]

[ 22 ]

[ 17 ]
[ 222 ]

[ 42 ]

[ 162 ]
[ 82 ]

[ 1 ]

[ 1231 ]
[ 12 ]

[ 2 ]
```

我们的最终目标是将复杂数组分解成为长度为 1 的小数组，这样我们就可以直接对两个数组进行比较，比如 `[32]` 与 `[11]` 比较，此时应该进入一个循环，比较两个数组的首个元素，比较完成后将其合并得到 `[ 11, 32 ]`，再使用 `[ 11, 32 ]` 与 `[ 22 ]` 比较数组的首个元素大小，比较完成后进行合并得到 `[ 11, 22, 32 ]`，以此类推，最后得到的将会是一个排序完成的。

我们将上面的分析进行步骤划分，我们应该需要实现两个功能：
- 将复杂数组划分为原子级别的简单数组；
- 将原子级别的数组进行比对后依次合并，重新组成排序好的复杂数组；

我们现在来进行代码的实现，首先我们创建一个接口来形容这个排序算法类
```java
public interface Sort {
    public int[] sort(int[] arr);
}
```

然后我们来编辑这个类的实现，最后的调用效果应该是这样的：
```java
import java.util.Arrays;

public class DivisionSort implements Sort {
  @Override
  public int[] sort(int[] arr) {
      //...
      return arr;
  }
  public static void main(String[] args) {
    int[] arr = new int[] { 32, 11, 22, 17, 222, 42, 162, 82, 1, 1231, 12, 2 };
    Sort divisionSort = new DivisionSort();
    int[] sortedArr = divisionSort.sort(arr);
    System.out.println(Arrays.toString(sortedArr));
  }
}
```

我们现在先进行第一步，将复杂数组分解为简单数组：
```java
private void splitArr(int[] arr, int start, int end) {
  // 当数组开始位置等于结束位置才停止分割（此时数组长度为 1）
  if (end != start) {
    // 取中点位置，递归调用将数组分为两份
    int mid = (end + start) / 2;
    splitArr(arr, start, mid);
    splitArr(arr, mid + 1, end);
  }
}
```

分解的函数就是一个递归调用，递归将数组分割为原子级别，而合并的函数，我们可以好好想一下，如何对比 `[ 11, 32 ]` 和 `[ 22 ]`，应该依次取出两个数组的第一个元素，比对完成后将较小的一个推入合并后的数组。

所以这里应该是先比较 11 和 22 的大小，然后将 11 推入合并后的数组，比较完成后再比较 32 和 22，然后将 22 推入合并后的数组，最后的比较将会判断到某个数组已经无元素可对比，那么另一个数组剩余的数字均是大数，直接推入合并后的数组即可，那么实现出来以后就是：

```java
private void mergeArr(int[] arr, int start, int end) {
  // 将数组分为左右两边进行对比
  // 比如 { 11 32 22 } 将被分为 { 11 32 } 和 { 22 } 两个数组
  int mid = (start + end) / 2;
  int[] leftArr = Arrays.copyOfRange(arr, start, mid + 1);
  int[] rightArr = Arrays.copyOfRange(arr, mid + 1, end + 1);
  int i = 0, j = 0;
  for (int k = start; k <= end; k++) {
      // 判断数组是否已经没有多余元素
      if (i == leftArr.length) {
          arr[k] = rightArr[j];
          j++;
          continue;
      }

      if (j == rightArr.length) {
          arr[k] = leftArr[i];
          i++;
          continue;
      }

      if (leftArr[i] < rightArr[j]) {
          arr[k] = leftArr[i];
          i++;
      } else {
          arr[k] = rightArr[j];
          j++;
      }
  }
}
```

最后组成后的 `DivisionSort` 类就是这个样子的：

```java
import java.util.Arrays;

public class DivisionSort implements Sort {
    @Override
    public int[] sort(int[] arr) {
        this.splitArr(arr, 0, arr.length - 1);
        return arr;
    }

    private void splitArr(int[] arr, int start, int end) {
        if (end != start) {
            int mid = (end + start) / 2;
            splitArr(arr, start, mid);
            splitArr(arr, mid + 1, end);
            mergeArr(arr, start, end);
        }
    }

    private void mergeArr(int[] arr, int start, int end) {
        int mid = (start + end) / 2;
        int[] leftArr = Arrays.copyOfRange(arr, start, mid + 1);
        int[] rightArr = Arrays.copyOfRange(arr, mid + 1, end + 1);
        int i = 0, j = 0;
        for (int k = start; k <= end; k++) {
            if (i == leftArr.length) {
                arr[k] = rightArr[j];
                j++;
                continue;
            }

            if (j == rightArr.length) {
                arr[k] = leftArr[i];
                i++;
                continue;
            }

            if (leftArr[i] < rightArr[j]) {
                arr[k] = leftArr[i];
                i++;
            } else {
                arr[k] = rightArr[j];
                j++;
            }
        }
    }

    public static void main(String[] args) {
        int[] arr = new int[] { 32, 11, 22, 17, 222, 42, 162, 82, 1, 1231, 12, 2 };
        Sort divisionSort = new DivisionSort();
        int[] sortedArr = divisionSort.sort(arr);
        System.out.println(Arrays.toString(sortedArr));
    }
}
```

最后输出的结果为 `[1, 2, 11, 12, 17, 22, 32, 42, 82, 162, 222, 1231]`，排序完成。