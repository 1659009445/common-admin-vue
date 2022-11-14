<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-button type="primary" @click="dialogVisible = true">新增</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData"
              style="width: 100%; margin-bottom: 20px;"
              row-key="id" border stripe default-expand-all
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="name" label="名称" sortable width="180"></el-table-column>
      <el-table-column prop="inform" label="描述" sortable width="130"></el-table-column>
      <el-table-column prop="code" label="编码" sortable width="130"></el-table-column>
      <el-table-column prop="component" label="组件" sortable width="150"></el-table-column>
      <el-table-column prop="url" label="路径" sortable width="150"></el-table-column>
      <el-table-column prop="icon" label="图标" sortable width="150"></el-table-column>
      <el-table-column prop="perms" label="权限" sortable width="150"></el-table-column>
      <el-table-column prop="created" label="创建时间" sortable width="170"></el-table-column>
      <el-table-column prop="updated" label="更新时间" sortable width="170"></el-table-column>
      <el-table-column prop="orderNum" label="排序" sortable width="80"></el-table-column>
      <el-table-column prop="status" label="状态" sortable width="80">
        <template v-slot="scope">
          <el-tag size="small" v-if="scope.row.status === 1" type="success">启用</el-tag>
          <el-tag size="small" v-else-if="scope.row.status === 0" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="isTitle" label="标题" sortable width="80">
        <template v-slot="scope">
          <el-tag size="small" v-if="scope.row.isTitle === 1" type="success">启用</el-tag>
          <el-tag size="small" v-if="scope.row.isTitle === 0" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template v-slot="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-popconfirm title="确认删除"
                         confirm-button-text="确认"
                         cancel-button-text="取消"
                         @confirm="handleDelete(scope.$index, scope.row)"
                         @cancel="cancelEvent"
          >
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog :visible.sync="dialogVisible" title="菜单管理" width="600px" :before-close="handleClose">
      <el-form :model="this.form" :rules="formRules" ref="form" label-width="600px" class="demo-editForm">
        <el-form-item label="上级菜单" prop="pid" label-width="80px">
          <el-select v-model="form.pid" placeholder="请选择上级菜单">
            <template v-for="item in navData">
              <el-option :label="item.name" :value="item.id"></el-option>
              <template v-for="child in item.children">
                <el-option :label="child.name" :value="child.id">
                  <span>{{ "- " + child.name }}</span>
                </el-option>
              </template>
            </template>
            <el-option label="新父级菜单" value=0 ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="name" label-width="80px">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="编码" prop="code" label-width="80px">
          <el-input v-model="form.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="inform" label-width="80px">
          <el-input v-model="form.inform" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="组件" prop="component" label-width="80px">
          <el-input v-model="form.component" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="路径" prop="url" label-width="80px">
          <el-input v-model="form.url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon" label-width="80px">
          <el-input v-model="form.icon" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限" prop="perms" label-width="80px">
          <el-input v-model="form.perms" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="orderNum" label-width="80px">
          <el-input v-model="form.orderNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status" label-width="80px">
          <el-radio-group v-model="form.status">
            <el-radio :label=1>启用</el-radio>
            <el-radio :label=0>禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="标题" prop="isTitle" label-width="80px">
          <el-radio-group v-model="form.isTitle">
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

  </div>
</template>

<script>
import {deleteMenu, getHoleNav, getMenuInfo, getMenuList, insertMenu, updateMenu} from "@/api/sys";
import {getNav} from "@/api/authentication";

export default {
  name: "SysMenu",
  data() {
    return {
      dialogVisible: false,
      isEdit: false,
      tableData: [],
      navData: [],
      form: {
        id: '',
        pid: null,
        name: '',
        code: '',
        inform: '',
        component: '',
        url: '',
        icon: '',
        perms: '',
        orderNum: '',
        status: '',
        isTitle: ''
      },
      formRules: {
        pid: [
          {required: true, message: '请选择上级菜单', trigger: 'blur'}
        ],
        name: [
          {required: true, message: '请输入名称', trigger: 'blur'}
        ],
        perms: [
          {required: true, message: '请输入权限', trigger: 'blur'}
        ],
        status: [
          {required: true, message: '是否禁用', trigger: 'blur'}
        ],
        isTitle: [
          {required: true, message: '是否用于菜单栏', trigger: 'blur'}
        ],
        orderNum: [
          {required: true, message: '展示顺序(从1到高)', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    getList() {
      getMenuList().then(res => {
        this.tableData = res.data.data
      })
    },
    getNav() {
      getHoleNav().then(res => {
        this.navData = res.data.data
      })
    },
    submitForm() {
      this.$refs['form'].validate(valid => {
        if(valid){
          if(this.isEdit) {
            //处理更新表单
            updateMenu(this.form).then(res => {
              this.isEdit = false
              this.dialogVisible = false
              this.getList()
              this.$message.success(res.data.message)
            })
          }else {
            //处理新增表单
            insertMenu(this.form).then(res => {
              this.$message.success(res.data.message)
              this.dialogVisible = false
              this.getList()
            })
          }
        }else {
          return false
        }
      })
    },
    resetForm() {
      //重置表单
      this.form = {}
    },
    handleEdit(index,row) {
      //处理编辑对话框
      getMenuInfo(row.id).then(res => {
        this.form = res.data.data
        this.dialogVisible = true
        this.isEdit = true
      })
    },
    handleDelete(index,row) {
      //处理删除对话框
      deleteMenu(row.id).then(res => {
        this.$message.success(res.data.message)
        this.getList()
      })
    },
    handleClose() {
      //关闭对话框
      this.dialogVisible = false
      this.isEdit =false
    },
    cancelEvent() {
      //取消
      this.$message.success("已取消操作")
    }
  },
  created() {
    this.getNav()
    this.getList()
  }
}
</script>

<style scoped>

</style>
