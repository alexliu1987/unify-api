module.exports = {
  code: {
    name: '机构标识',
    type: String,
    length: 20,
    default: '',
    isRequired: true,
    regEx: /^[a-zA-Z0-9]{1,20}$/,
    search: true,
    table: true
  },
  name: {
    name: '机构名称',
    type: String,
    length: 20,
    default: '',
    isRequired: true,
    regEx: /^[a-zA-Z0-9\u4e00-\u9fa5]{1,20}$/,
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
