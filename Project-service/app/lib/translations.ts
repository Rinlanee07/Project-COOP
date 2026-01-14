/**
 * Comprehensive Translation Dictionary
 * Supports parameterized translations and comprehensive key coverage
 */

export type SupportedLanguage = 'th' | 'en';

export interface TranslationParams {
  [key: string]: string | number;
}

export interface TranslationDictionary {
  [language: string]: {
    [key: string]: string;
  };
}

// Comprehensive translation dictionary
export const translations: TranslationDictionary = {
  en: {
    // Navigation
    "dashboard": "Dashboard",
    "tickets": "Tickets",
    "repair": "Repair",
    "borrow": "Borrow & Return",
    "settings": "Settings",
    "logout": "Logout",
    "profile": "Profile",
    "technical": "Technical",
    "create_new": "Create New",
    "view_all": "View All",
    "status_tracking": "Status Tracking",
    "preferences": "Preferences",
    "theme": "Theme",
    "confirm_logout": "Confirm Logout",
    "logout_confirmation_message": "Are you sure you want to logout? You will need to login again to use the repair system.",
    "repair_details": "Repair Details",
    "borrow_return": "Borrow & Return",
    "create_repair": "Create Repair",
    "system": "System",
    "help": "Help",
    
    // Common UI Elements
    "search_placeholder": "Search customers, devices, tickets...",
    "new_ticket": "New Ticket",
    "overview": "Overview",
    "my_tasks": "My Tasks",
    "history": "History",
    "save": "Save",
    "cancel": "Cancel",
    "edit": "Edit",
    "delete": "Delete",
    "add": "Add",
    "remove": "Remove",
    "submit": "Submit",
    "reset": "Reset",
    "confirm": "Confirm",
    "close": "Close",
    "back": "Back",
    "next": "Next",
    "previous": "Previous",
    "loading": "Loading...",
    "error": "Error",
    "success": "Success",
    "warning": "Warning",
    "info": "Information",
    
    // Forms
    "name": "Name",
    "email": "Email",
    "phone": "Phone",
    "address": "Address",
    "description": "Description",
    "status": "Status",
    "priority": "Priority",
    "date": "Date",
    "time": "Time",
    "created_at": "Created At",
    "updated_at": "Updated At",
    "created_by": "Created By",
    "assigned_to": "Assigned To",
    
    // Ticket Management
    "ticket_id": "Ticket ID",
    "customer_name": "Customer Name",
    "device_type": "Device Type",
    "device_model": "Device Model",
    "issue_description": "Issue Description",
    "repair_status": "Repair Status",
    "technician": "Technician",
    "estimated_cost": "Estimated Cost",
    "actual_cost": "Actual Cost",
    "completion_date": "Completion Date",
    
    // Status Values
    "pending": "Pending",
    "in_progress": "In Progress",
    "completed": "Completed",
    "cancelled": "Cancelled",
    "on_hold": "On Hold",
    "waiting_parts": "Waiting for Parts",
    "ready_pickup": "Ready for Pickup",
    
    // Priority Values
    "low": "Low",
    "medium": "Medium",
    "high": "High",
    "urgent": "Urgent",
    
    // Settings
    "general_settings": "General Settings",
    "display_settings": "Display Settings",
    "theme_settings": "Theme Settings",
    "language_settings": "Language Settings",
    "notification_settings": "Notification Settings",
    "user_management": "User Management",
    "company_settings": "Company Settings",
    "customer_management": "Customer Management",
    
    // Theme
    "light_theme": "Light Theme",
    "dark_theme": "Dark Theme",
    "system_theme": "System Theme",
    "theme_toggle": "Toggle Theme",
    "switch_to_dark_mode": "Switch to dark mode",
    "switch_to_light_mode": "Switch to light mode",
    "light": "Light",
    "dark": "Dark",
    
    // Language
    "language": "Language",
    "thai": "Thai",
    "english": "English",
    "language_selector": "Language Selector",
    
    // Error Messages
    "error_loading_data": "Error loading data",
    "error_saving_data": "Error saving data",
    "error_network": "Network error occurred",
    "error_validation": "Validation error",
    "error_permission": "Permission denied",
    "error_not_found": "Not found",
    "error_server": "Server error",
    
    // Success Messages
    "success_saved": "Successfully saved",
    "success_updated": "Successfully updated",
    "success_deleted": "Successfully deleted",
    "success_created": "Successfully created",
    
    // Validation Messages
    "required_field": "This field is required",
    "invalid_email": "Invalid email format",
    "invalid_phone": "Invalid phone number",
    "min_length": "Minimum length is {min} characters",
    "max_length": "Maximum length is {max} characters",
    
    // Confirmation Messages
    "confirm_delete": "Are you sure you want to delete this item?",
    "confirm_cancel": "Are you sure you want to cancel?",
    "unsaved_changes": "You have unsaved changes. Do you want to continue?",
    
    // Date/Time
    "today": "Today",
    "yesterday": "Yesterday",
    "tomorrow": "Tomorrow",
    "this_week": "This Week",
    "last_week": "Last Week",
    "this_month": "This Month",
    "last_month": "Last Month",
    
    // Pagination
    "page": "Page",
    "of": "of",
    "items_per_page": "Items per page",
    "showing": "Showing",
    "to": "to",
    "results": "results",
    
    // File Upload
    "upload_file": "Upload File",
    "choose_file": "Choose File",
    "file_selected": "File selected",
    "no_file_selected": "No file selected",
    "upload_progress": "Upload progress: {progress}%",
    
    // Customer Management
    "add_customer": "Add Customer",
    "edit_customer": "Edit Customer",
    "customer_details": "Customer Details",
    "customer_list": "Customer List",
    "customer_search": "Search customers",
    
    // Device Management
    "device_info": "Device Information",
    "device_brand": "Brand",
    "device_serial": "Serial Number",
    "device_warranty": "Warranty Status",
    "device_condition": "Condition",
    
    // Reports
    "reports": "Reports",
    "generate_report": "Generate Report",
    "export_data": "Export Data",
    "print": "Print",
    
    // Accessibility
    "skip_to_content": "Skip to main content",
    "menu_toggle": "Toggle menu",
    "search_toggle": "Toggle search",
    "close_dialog": "Close dialog",
    "open_menu": "Open menu",
    
    // Parameterized examples
    "welcome_user": "Welcome, {name}!",
    "items_count": "{count} items",
    "last_updated": "Last updated {time} ago",
    "due_in_days": "Due in {days} days"
  },
  
  th: {
    // Navigation
    "dashboard": "แดชบอร์ด",
    "tickets": "แจ้งซ่อม",
    "repair": "งานซ่อม",
    "borrow": "ยืม-คืน",
    "settings": "ตั้งค่า",
    "logout": "ออกจากระบบ",
    "profile": "โปรไฟล์",
    "technical": "ช่างเทคนิค",
    "create_new": "สร้างใหม่",
    "view_all": "ดูทั้งหมด",
    "status_tracking": "ติดตามสถานะ",
    "preferences": "การตั้งค่า",
    "theme": "ธีม",
    "confirm_logout": "ยืนยันการออกจากระบบ",
    "logout_confirmation_message": "คุณแน่ใจหรือไม่ที่จะออกจากระบบ? คุณจะต้องเข้าสู่ระบบใหม่เพื่อใช้งานระบบซ่อม",
    "repair_details": "รายละเอียดการซ่อม",
    "borrow_return": "ยืม-คืน",
    "create_repair": "สร้างใบซ่อม",
    "system": "ระบบ",
    "help": "ช่วยเหลือ",
    
    // Common UI Elements
    "search_placeholder": "ค้นหาลูกค้า, อุปกรณ์, ใบงาน...",
    "new_ticket": "เปิดใบงานใหม่",
    "overview": "ภาพรวม",
    "my_tasks": "งานของฉัน",
    "history": "ประวัติ",
    "save": "บันทึก",
    "cancel": "ยกเลิก",
    "edit": "แก้ไข",
    "delete": "ลบ",
    "add": "เพิ่ม",
    "remove": "ลบออก",
    "submit": "ส่ง",
    "reset": "รีเซ็ต",
    "confirm": "ยืนยัน",
    "close": "ปิด",
    "back": "กลับ",
    "next": "ถัดไป",
    "previous": "ก่อนหน้า",
    "loading": "กำลังโหลด...",
    "error": "ข้อผิดพลาด",
    "success": "สำเร็จ",
    "warning": "คำเตือน",
    "info": "ข้อมูล",
    
    // Forms
    "name": "ชื่อ",
    "email": "อีเมล",
    "phone": "เบอร์โทรศัพท์",
    "address": "ที่อยู่",
    "description": "รายละเอียด",
    "status": "สถานะ",
    "priority": "ความสำคัญ",
    "date": "วันที่",
    "time": "เวลา",
    "created_at": "สร้างเมื่อ",
    "updated_at": "อัปเดตเมื่อ",
    "created_by": "สร้างโดย",
    "assigned_to": "มอบหมายให้",
    
    // Ticket Management
    "ticket_id": "รหัสใบงาน",
    "customer_name": "ชื่อลูกค้า",
    "device_type": "ประเภทอุปกรณ์",
    "device_model": "รุ่นอุปกรณ์",
    "issue_description": "รายละเอียดปัญหา",
    "repair_status": "สถานะการซ่อม",
    "technician": "ช่างเทคนิค",
    "estimated_cost": "ค่าใช้จ่ายประมาณ",
    "actual_cost": "ค่าใช้จ่ายจริง",
    "completion_date": "วันที่เสร็จสิ้น",
    
    // Status Values
    "pending": "รอดำเนินการ",
    "in_progress": "กำลังดำเนินการ",
    "completed": "เสร็จสิ้น",
    "cancelled": "ยกเลิก",
    "on_hold": "พักการดำเนินการ",
    "waiting_parts": "รออะไหล่",
    "ready_pickup": "พร้อมรับ",
    
    // Priority Values
    "low": "ต่ำ",
    "medium": "ปานกลาง",
    "high": "สูง",
    "urgent": "เร่งด่วน",
    
    // Settings
    "general_settings": "การตั้งค่าทั่วไป",
    "display_settings": "การตั้งค่าการแสดงผล",
    "theme_settings": "การตั้งค่าธีม",
    "language_settings": "การตั้งค่าภาษา",
    "notification_settings": "การตั้งค่าการแจ้งเตือน",
    "user_management": "จัดการผู้ใช้",
    "company_settings": "การตั้งค่าบริษัท",
    "customer_management": "จัดการลูกค้า",
    
    // Theme
    "light_theme": "ธีมสว่าง",
    "dark_theme": "ธีมมืด",
    "system_theme": "ธีมระบบ",
    "theme_toggle": "เปลี่ยนธีม",
    "switch_to_dark_mode": "เปลี่ยนเป็นธีมมืด",
    "switch_to_light_mode": "เปลี่ยนเป็นธีมสว่าง",
    "light": "สว่าง",
    "dark": "มืด",
    
    // Language
    "language": "ภาษา",
    "thai": "ไทย",
    "english": "อังกฤษ",
    "language_selector": "เลือกภาษา",
    
    // Error Messages
    "error_loading_data": "เกิดข้อผิดพลาดในการโหลดข้อมูล",
    "error_saving_data": "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
    "error_network": "เกิดข้อผิดพลาดเครือข่าย",
    "error_validation": "ข้อผิดพลาดการตรวจสอบ",
    "error_permission": "ไม่มีสิทธิ์เข้าถึง",
    "error_not_found": "ไม่พบข้อมูล",
    "error_server": "เกิดข้อผิดพลาดเซิร์ฟเวอร์",
    
    // Success Messages
    "success_saved": "บันทึกสำเร็จ",
    "success_updated": "อัปเดตสำเร็จ",
    "success_deleted": "ลบสำเร็จ",
    "success_created": "สร้างสำเร็จ",
    
    // Validation Messages
    "required_field": "ฟิลด์นี้จำเป็นต้องกรอก",
    "invalid_email": "รูปแบบอีเมลไม่ถูกต้อง",
    "invalid_phone": "หมายเลขโทรศัพท์ไม่ถูกต้อง",
    "min_length": "ความยาวขั้นต่ำ {min} ตัวอักษร",
    "max_length": "ความยาวสูงสุด {max} ตัวอักษร",
    
    // Confirmation Messages
    "confirm_delete": "คุณแน่ใจหรือไม่ที่จะลบรายการนี้?",
    "confirm_cancel": "คุณแน่ใจหรือไม่ที่จะยกเลิก?",
    "unsaved_changes": "คุณมีการเปลี่ยนแปลงที่ยังไม่ได้บันทึก ต้องการดำเนินการต่อหรือไม่?",
    
    // Date/Time
    "today": "วันนี้",
    "yesterday": "เมื่อวาน",
    "tomorrow": "พรุ่งนี้",
    "this_week": "สัปดาห์นี้",
    "last_week": "สัปดาห์ที่แล้ว",
    "this_month": "เดือนนี้",
    "last_month": "เดือนที่แล้ว",
    
    // Pagination
    "page": "หน้า",
    "of": "จาก",
    "items_per_page": "รายการต่อหน้า",
    "showing": "แสดง",
    "to": "ถึง",
    "results": "ผลลัพธ์",
    
    // File Upload
    "upload_file": "อัปโหลดไฟล์",
    "choose_file": "เลือกไฟล์",
    "file_selected": "เลือกไฟล์แล้ว",
    "no_file_selected": "ยังไม่ได้เลือกไฟล์",
    "upload_progress": "ความคืบหน้าการอัปโหลด: {progress}%",
    
    // Customer Management
    "add_customer": "เพิ่มลูกค้า",
    "edit_customer": "แก้ไขลูกค้า",
    "customer_details": "รายละเอียดลูกค้า",
    "customer_list": "รายชื่อลูกค้า",
    "customer_search": "ค้นหาลูกค้า",
    
    // Device Management
    "device_info": "ข้อมูลอุปกรณ์",
    "device_brand": "ยี่ห้อ",
    "device_serial": "หมายเลขเครื่อง",
    "device_warranty": "สถานะการรับประกัน",
    "device_condition": "สภาพ",
    
    // Reports
    "reports": "รายงาน",
    "generate_report": "สร้างรายงาน",
    "export_data": "ส่งออกข้อมูล",
    "print": "พิมพ์",
    
    // Accessibility
    "skip_to_content": "ข้ามไปยังเนื้อหาหลัก",
    "menu_toggle": "เปิด/ปิดเมนู",
    "search_toggle": "เปิด/ปิดการค้นหา",
    "close_dialog": "ปิดหน้าต่าง",
    "open_menu": "เปิดเมนู",
    
    // Parameterized examples
    "welcome_user": "ยินดีต้อนรับ, {name}!",
    "items_count": "{count} รายการ",
    "last_updated": "อัปเดตล่าสุด {time} ที่แล้ว",
    "due_in_days": "ครบกำหนดใน {days} วัน"
  }
};

/**
 * Get translation for a key with optional parameters
 */
export function getTranslation(
  language: SupportedLanguage,
  key: string,
  params?: TranslationParams
): string {
  const translation = translations[language]?.[key];
  
  if (!translation) {
    console.warn(`Translation missing for key: ${key} in language: ${language}`);
    return key; // Return the key itself as fallback
  }
  
  // Handle parameterized translations
  if (params && Object.keys(params).length > 0) {
    return translation.replace(/\{(\w+)\}/g, (match, paramKey) => {
      const value = params[paramKey];
      return value !== undefined ? String(value) : match;
    });
  }
  
  return translation;
}

/**
 * Check if a translation key exists
 */
export function hasTranslation(language: SupportedLanguage, key: string): boolean {
  return Boolean(translations[language]?.[key]);
}

/**
 * Get all available translation keys for a language
 */
export function getTranslationKeys(language: SupportedLanguage): string[] {
  return Object.keys(translations[language] || {});
}

/**
 * Get missing translation keys between languages
 */
export function getMissingTranslations(
  sourceLanguage: SupportedLanguage,
  targetLanguage: SupportedLanguage
): string[] {
  const sourceKeys = new Set(getTranslationKeys(sourceLanguage));
  const targetKeys = new Set(getTranslationKeys(targetLanguage));
  
  return Array.from(sourceKeys).filter(key => !targetKeys.has(key));
}