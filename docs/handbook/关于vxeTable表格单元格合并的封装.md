# 关于vxeTable表格单元格合并的封装

在使用表格合并时，大多是对特殊列判断数据是否一致，若列数据一致，则上下合并单元格，所以可以简单封装一个合并方法使用

````js
export default class VxeTableHelper {
  /**
   * 合并单元格方法
   * @param {Object} payload - span-method 绑定函数的参数对象
   * @param {Array<string>} mergeFields - 需要合并的字段数组，其中第一个字段为主字段
   * @returns {{rowspan: number, colspan: number}} - 返回合并信息对象，包含计算出的 `rowspan` 和 `colspan`
   */
  static mergeCells(payload, mergeFields) {
    const { row, column, data, $rowIndex } = payload

    // 初始化合并信息
    let rowspan = 1
    let colspan = 1

    const majorField = mergeFields[0] // 主字段
    for (let i = 0; i < mergeFields.length; i++) {
      const field = mergeFields[i]
      if (column.property === field) {
        const prevRow = data[$rowIndex - 1]
        if (
          prevRow &&
          prevRow[field] === row[field] &&
          prevRow[majorField] === row[majorField]
        ) {
          rowspan--
          return { rowspan, colspan }
        }
        let j = $rowIndex + 1
        while (
          data[j] &&
          data[j][field] === row[field] &&
          data[j][majorField] === row[majorField]
        ) {
          rowspan++
          j++
        }
      }
    }
    return { rowspan, colspan }
  }
}

````

使用方法,在合并单元格的函数spanMethod里，返回静态方法调用结果，传入需要合并的列属性

````js
return VxeTableHelper.mergeCells(payload, ['ruoteName', 'lineDetail'])
````

注意，这里封装后的函数是按照传入的第一个field作为主字段，触发合并的条件是主字段上下数据一致，再是当前字段列数据一致，则向下进行合并