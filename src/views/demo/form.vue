<template>
  <div class="container">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <!-- 下拉框静态 -->
      <el-form-item label="地区" prop="region">
        <el-select v-model="form.region" placeholder="请选择">
          <el-option label="上海" value="shanghai"/>
          <el-option label="北京" value="beijing"/>
        </el-select>
      </el-form-item>

      <!-- 下拉框动态渲染 -->
      <el-form-item label="地区2">
        <el-select v-model="form.value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    const validatePhoneNo = (rule, value, callback) => {
      if(!validatePhone(value)) {
        callback(new Error('手机号不存在'));
      } else {
        callback()
      }
    }
    return {
      options: [{
          value: '',
          label: '全部'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
      }],
      form: {
        name: 'aaa',
        contactsPhone: '13856321452',
        region: '',
        value: '',
        date1: '',
        date2: '',
        delivery: false,
        radio: '2',
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          {required: true, message: '必填', trigger: 'blur'}
        ],
        contactsPhone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' },
          { validator: validatePhoneNo, trigger: 'blur'}
        ],
        region: [
          {required: true, message: '请选择活动区域', trigger: 'change'}
        ]
      }
    }
  }
}
</script>
