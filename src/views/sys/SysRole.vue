<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="name" placeholder="名称" clearable @clear="getRoleList"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getRoleList">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleInsert">新增</el-button>
      </el-form-item>
      <el-form-item>
        <el-popconfirm title="确认删除?"
                       confirm-button-text="确认" cancel-button-text="取消"
                       @confirm="handleDelete(null,null)" @cancel="cancelEvent">
          <template #reference>
            <el-button type="danger" slot="reference" :disabled="isBatchDelete">删除</el-button>
          </template>
        </el-popconfirm>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;"
              row-key="id" border stripe ref="multipleTable"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40" />
      <el-table-column prop="name" label="名称" sortable show-overflow-tooltip width="180"></el-table-column>
      <el-table-column prop="inform" label="描述" sortable show-overflow-tooltip width="180"></el-table-column>
      <el-table-column prop="code" label="编码" sortable show-overflow-tooltip width="160"></el-table-column>
      <el-table-column prop="created" label="创建时间" sortable width="180"></el-table-column>
      <el-table-column prop="updated" label="更新时间" sortable width="180"></el-table-column>
      <el-table-column prop="status" label="状态" sortable show-overflow-tooltip width="80">
        <template  v-slot="scope">
          <el-tag size="small" v-if="scope.row.status === 1" type="success">启用</el-tag>
          <el-tag size="small" v-else-if="scope.row.status === 0" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" sortable width="240">
        <template  v-slot="scope">
          <el-button size="small" @click="handlePerm(scope.$index, scope.row)">权限</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-popconfirm title="确认删除"
                         confirm-button-text="确认"
                         cancel-button-text="取消"
                         @confirm="handleDelete(scope.$index, scope.row)"
                         @cancel="cancelEvent">
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[1, 20, 50, 100]"
        :current-page="current"
        :page-size="size"
        :total="total">
    </el-pagination>

    <el-dialog :visible.sync="dialogVisible" title="角色管理" width="600px" :before-close="handleClose">
      <el-form :model="this.form" :rules="formRules" ref="form" label-width="600px" class="demo-editForm">

        <el-form-item label="名称" prop="name" label-width="80px">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="编码" prop="code" label-width="80px">
          <el-input v-model="form.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="inform" label-width="80px">
          <el-input v-model="form.inform" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="status" label-width="80px">
          <el-radio-group v-model="form.status">
            <el-radio :label=1>启用</el-radio>
            <el-radio :label=0>禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetForm()">重置</el-button>
        <el-button type="primary" @click="submitForm()">提交</el-button>
      </span>
      </template>
    </el-dialog>

    <el-dialog :visible.sync="permVisible" title="权限管理" width="600px" :before-close="handleClose">
      <el-form :model="perm" ref="perm" label-width="600px" class="demo-editForm">
        <el-tree
            :data="permData"
            node-key="id"
            ref="permData"
            show-checkbox
            :default-expand-all=true
            :check-strictly=false
            :props="defaultProps">
        </el-tree>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetPerm">重置</el-button>
        <el-button type="primary" @click="submitPerm">提交</el-button>
      </span>
      </template>
    </el-dialog>

  </div>
</template>

<script>
import {deleteRole, getMenuList, getRoleInfo, getRoleList, insertRole, updateRole, updateRolePerm} from "@/api/sys";

export default {
  name: "SysRole",
  data() {
    return {
      tableData: [],
      permData: [],
      multipleSelection: [],
      dialogVisible: false,
      permVisible: false,
      isEdit: false,
      isBatchDelete: true,
      total: 0,
      size: 10,
      current: 1,
      name: '',
      form: {},
      formRules: {},
      perm: {},
      defaultProps: {
        children: 'children',
        label: 'name'
      },
    }
  },
  methods: {
    getRoleList() {
      getRoleList(this.current,this.size,this.name).then(res => {
        this.total = res.data.data.totalCount
        this.size = res.data.data.pageSize
        this.current = res.data.data.currentPage
        this.tableData = res.data.data.data
      })
    },
    handleInsert() {
      //打开新增对话框
      this.dialogVisible  = true
    },
    handleDelete(index,row) {
      //批量删除
      let ids = []
      if(row !== null){
        ids.push(row.id)
      } else {
        this.multipleSelection.forEach(i => {
          ids.push(i.id)
        })
      }
      deleteRole(ids).then(res => {
        this.$message.success(res.data.message)
        this.getRoleList()
      })
    },
    cancelEvent() {
      //取消
      this.$message.success("已取消操作")
    },
    handleSizeChange(val) {
      this.size = val
      this.getRoleList()
    },
    handleCurrentChange(val) {
      this.current = val
      this.getRoleList()
    },
    handleSelectionChange(item) {
      //获取选择的元素
      this.multipleSelection = item
      this.isBatchDelete = item.length === 0
    },
    handlePerm(index,row) {
      let id =row.id
      this.perm.id = id
      this.permVisible = true
      getMenuList().then(res => {
        this.permData = res.data.data
      })
      getRoleInfo(id).then(res => {
        this.$refs.permData.setCheckedKeys(res.data.data.menuIdList)
      })
    },
    handleEdit(index,row) {
      //处理编辑对话框
      getRoleInfo(row.id).then(res => {
        this.form = res.data.data
        this.dialogVisible = true
        this.isEdit = true
      })
    },
    handleClose() {
      //关闭对话框
      this.dialogVisible = false
      this.permVisible = false
      this.isEdit =false
    },
    resetForm() {
      //重置表单
      this.form = {}
    },
    submitForm() {
      this.$refs['form'].validate(valid => {
        if(valid){
          if(this.isEdit){
            //处理更新表单
            updateRole(this.form).then(res => {
              this.isEdit = false
              this.dialogVisible = false
              this.getRoleList()
              this.$message.success(res.data.message)
            })
          }else {
            //处理新增表单
            insertRole(this.form).then(res => {
              this.dialogVisible = false
              this.getRoleList()
              this.$message.success(res.data.message)
            })
          }
        }else {
          return false
        }
      })
    },
    resetPerm() {

    },
    submitPerm() {
      let ids = this.$refs.permData.getCheckedKeys()
      let id = this.perm.id
      updateRolePerm(id,ids).then(res => {
        this.permVisible = false
        this.$message.success(res.data.message)
      })
    }

  },
  created() {
    this.getRoleList()
  }
}
</script>

<style scoped>
.el-pagination {
  float: right;
  margin-top: 25px;
}
</style>
