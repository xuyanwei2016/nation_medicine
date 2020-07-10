// 因此命名空间不带this 所以引入的时候要用  functionName.apply(this,[arg1,arg2])调用

/*
 ** 用法示例
 ** operationMsg.apply(this,[res.data.code,'修改'])
 */
export function operationMsg(code, msgName, msg) {
    if (code > 0) {
        this.$message.warning(msg)
    } else if (code < 0) {
        this.$message.error(`${msgName}失败`)
    } else {
        this.$message.success(`${msgName}成功`)
        this.getList()
    }
}

export function confirm(msg, title = '提示') {
  return this.$confirm(msg, title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
    // center: true
  })
}
