module.exports = {
  orgCode: {
    name: '所属机构',
    type: String,
    length: 20,
    default: '',
    isRequired: true,
    regEx: /^[a-zA-Z0-9]{1,20}$/,
    search: true,
    table: true
  },
  code: {
    name: '团队标识',
    type: String,
    length: 20,
    default: '',
    isRequired: true,
    regEx: /^[a-zA-Z0-9]{1,20}$/,
    search: true,
    table: true
  },
  name: {
    name: '团队名称',
    type: String,
    length: 20,
    default: '',
    isRequired: true,
    regEx: /^[a-zA-Z0-9\u4e00-\u9fa5]{1,20}$/,
    search: true,
    table: true
  },
  level: {
    name: '团队层级',
    type: Number,
    default: 1,
    isRequired: true,
    table: true
  },
  parentCode: {
    name: '上级团队',
    type: String,
    length: 20,
    default: '',
    isRequired: true,
    regEx: /^[a-zA-Z0-9]{1,20}$/,
    search: true,
    table: true
  },
  enabled: {
    name: '状态',
    type: Boolean,
    default: true,
    isRequired: true,
    search: true,
    table: true
  }
}
