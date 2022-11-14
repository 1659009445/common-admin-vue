<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="name" placeholder="名称" clearable @clear="getUserList"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getUserList">搜索</el-button>
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
      <el-form-item>
        <el-popconfirm title="将退出登录以更新角色信息,是否继续?"
                       confirm-button-text="确认" cancel-button-text="取消"
                       @confirm="handleUpdate(null,null)" @cancel="cancelEvent">
          <template #reference>
            <el-button type="danger" slot="reference">更新</el-button>
          </template>
        </el-popconfirm>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;"
              row-key="id" border stripe ref="multipleTable"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40" />
      <el-table-column prop="username" label="用户名" sortable show-overflow-tooltip width="140"></el-table-column>
      <el-table-column prop="name" label="名称" sortable show-overflow-tooltip width="140"></el-table-column>
      <el-table-column prop="role" label="角色" sortable show-overflow-tooltip width="120">
        <template v-slot="scope">
          <el-tag size="small" type="info" v-for="item in scope.row.roleList">{{item.name}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱" sortable width="180"></el-table-column>
      <el-table-column prop="phone" label="电话" sortable width="140"></el-table-column>
      <el-table-column prop="avatar" label="头像" sortable show-overflow-tooltip width="80"></el-table-column>
      <el-table-column prop="sexual" label="性别" sortable show-overflow-tooltip width="60">
        <template v-slot="scope">
          <el-row  v-if="scope.row.sexual === 0" type="success">男</el-row>
          <el-row  v-else-if="scope.row.sexual === 1" type="danger">女</el-row>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建日期" sortable show-overflow-tooltip width="170"></el-table-column>
      <el-table-column prop="lastLoginTime" label="登陆时间" sortable show-overflow-tooltip width="170"></el-table-column>
      <el-table-column prop="lastLoginIp" label="登录IP" sortable show-overflow-tooltip width="140"></el-table-column>
      <el-table-column prop="isBanned" label="状态" sortable show-overflow-tooltip width="80">
        <template v-slot="scope">
          <el-tag size="small" v-if="scope.row.isBanned === 0" type="success">启用</el-tag>
          <el-tag size="small" v-else-if="scope.row.isBanned === 1" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" sortable width="300">
        <template v-slot="scope">
          <el-button size="small" @click="handleRole(scope.$index, scope.row)">角色</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-popconfirm title="确认删除?"
                         confirm-button-text="确认"
                         cancel-button-text="取消"
                         @confirm="handleDelete(scope.$index, scope.row)"
                         @cancel="cancelEvent">
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
          <el-divider direction="vertical"></el-divider>
          <el-popconfirm title="确认重置密码?"
                         confirm-button-text="确认"
                         cancel-button-text="取消"
                         @confirm="handlePass(scope.$index, scope.row)"
                         @cancel="cancelEvent">
            <template #reference>
              <el-button size="small" type="danger">重置</el-button>
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

    <el-dialog :visible.sync="dialogVisible" title="用户管理" width="600px" :before-close="handleClose">
      <el-form :model="this.form" :rules="formRules" ref="form" label-width="600px" class="demo-editForm">
        <el-form-item label="用户名" prop="username" label-width="80px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="名字" prop="name" label-width="80px">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" label-width="80px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone" label-width="80px">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sexual" label-width="80px">
          <el-radio-group v-model="form.sexual">
            <el-radio :label=0>男</el-radio>
            <el-radio :label=1>女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态" prop="isBanned" label-width="80px">
          <el-radio-group v-model="form.isBanned">
            <el-radio :label=0>启用</el-radio>
            <el-radio :label=1>禁用</el-radio>
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

    <el-dialog :visible.sync="roleVisible" title="角色管理" width="600px" :before-close="handleClose">
      <el-form :model="roleForm">
        <el-tree
            :data="roleData"
            node-key="id"
            ref="roleData"
            show-checkbox
            :check-strictly=true
            :default-expand-all=true
            :props="defaultProps">
        </el-tree>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetRoleForm">重置</el-button>
        <el-button type="primary" @click="submitRoleForm">提交</el-button>
      </span>
      </template>
    </el-dialog>

  </div>
</template>

<script>
import {
  deleteUser,
  getRoleList,
  getUserInfo,
  getUserList,
  insertUser,
  updatePasswordByAdmin,
  updateUser, updateUserRole
} from "@/api/sys";
import {logout} from "@/api/authentication";

export default {
  name: "SysUser",
  data() {
    return {
      tableData: [],
      roleData: [],
      dialogVisible: false,
      roleVisible: false,
      isEdit: false,
      isBatchDelete: true,
      total: 0,
      size: 10,
      current: 1,
      name: '',
      t_size: 10,
      t_current: 1,
      t_name: '',
      form: {},
      formRules: {},
      roleForm: {},
      defaultProps: {
        children: 'children',
        label: 'name'
      },
    }
  },
  methods: {
    getUserList() {
      getUserList(this.current,this.size,this.name).then(res => {
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
      deleteUser(ids).then(res => {
        this.$message.success(res.data.message)
        this.getUserList()
      })
    },
    handlePass(index,row) {
      //管理员重置密码
      let id = row.id
      updatePasswordByAdmin(id).then(res => {
        this.$message.success(res.data.message)
      })
    },
    handleRole(index,row) {
      //用户分配角色
      this.roleVisible = true
      let id =row.id
      this.roleForm.id = id
      //必须要这样传才能请求到数据?
      getRoleList(this.t_current,this.t_size,this.t_name).then(res => {
        this.roleData = res.data.data.data
      })
      getUserInfo(id).then(res => {
        this.roleForm = res.data.data
        let ids = []
        this.roleForm.roleList.forEach(i => {
          ids.push(i.id)
        })
        this.$refs.roleData.setCheckedKeys(ids)
      })
    },
    cancelEvent() {
      //取消
      this.$message.success("已取消操作")
    },
    handleSizeChange(val) {
      this.size = val
      this.getUserList()
    },
    handleCurrentChange(val) {
      this.current = val
      this.getUserList()
    },
    handleSelectionChange(item) {
      //获取选择的元素
      this.multipleSelection = item
      this.isBatchDelete = item.length === 0
    },
    handleEdit(index,row) {
      //处理编辑对话框
      getUserInfo(row.id).then(res => {
        this.form = res.data.data
        this.dialogVisible = true
        this.isEdit = true
      })
    },
    handleClose() {
      //关闭对话框
      this.dialogVisible = false
      this.roleVisible = false
      this.isEdit =false
    },
    handleUpdate() {
      logout().then(res => {
          if(res.data.code === '200'){
              this.$store.commit('clearIndexStore')
              this.$router.push('/login').then(r => {})
          }
      })
    },
    resetForm() {
      //重置表单
      this.form = {}
    },
    resetRoleForm() {
      this.roleForm = {}
    },
    submitForm() {
      this.$refs['form'].validate(valid => {
        if(valid){
          if(this.isEdit){
            //处理更新表单
            updateUser(this.form).then(res => {
              this.isEdit = false
              this.dialogVisible = false
              this.getUserList()
              this.$message.success(res.data.message)
            })
          } else {
            //处理新增表单
            insertUser(this.form).then(res => {
              this.dialogVisible = false
              this.getUserList()
              this.$message.success(res.data.message)
            })
          }
        } else {
          return false
        }
      })
    },
    submitRoleForm() {
      console.log("submit")
      let ids = this.$refs.roleData.getCheckedKeys()
      let id = this.roleForm.id
      updateUserRole(id,ids).then(res => {
        this.roleVisible = false
        this.$message.success(res.data.message)
      })
    }
  },
  created() {
    this.getUserList()
  }
}
</script>

<style scoped>
.el-pagination {
  float: right;
  margin-top: 25px;
}
</style>
