// ##############################
// // // Tasks for TasksCard - see Dashboard view
// #############################

let bugs = [
  'Thông tin hợp lệ nhưng không lưu được khi điền biểu mẫu',
  'Pop-up thông tin không chứa văn bản',
  'Người dùng quay về trang chủ trong khi muốn truy cập trang khác',
  'Trang không phản hồi khi dùng trên di động hay máy tính bảng'
];
let website = ['Website tải quá lâu', 'Website không thân thiện với di động'];
let server = [
  '403 Forbidden/Access Denied',
  '404 File Not Found',
  '408 Request Timeout',
];

module.exports = {
  // these 3 are used to create the tasks lists in TasksCard - Dashboard view
  bugs,
  website,
  server,
};
