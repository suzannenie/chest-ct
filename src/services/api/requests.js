import ApiSecure from "@/services/api/api-secure";
import {checkDeleted} from "@/services/helpers";
import ApiDoc from "@/services/api/api-doc";

export async function getProfileSelf() {
    return await ApiSecure.get('profile/self/')
}
//
// DOCUMENTS
export async function getDocuments(params) {
    params = checkDeleted(params)
    return await ApiSecure.get("documents/", {params})
}
export async function postDocuments(data) {
    return await ApiSecure.post("documents/", data)
}
export async function getDocument(documentId, params) {
    params = checkDeleted(params)
    return await ApiSecure.get(`documents/${documentId}/`, {params})
}
export async function putDocument(documentId, data) {
    return await ApiSecure.put(`documents/${documentId}/`, data)
}
export async function downloadDocument(documentId) {
    return await ApiDoc.get(`documents/${documentId}/download/`)
}
export async function inlineDocument(documentId, config) {
    return await ApiSecure.get(`documents/${documentId}/inline/`, config)
}
//
// USERS
export async function getUsers(params) {
    params = checkDeleted(params)
    return await ApiSecure.get("users/", {params})
}
export async function getUser(userId) {
    return await ApiSecure.get(`users/${userId}`)
}
export async function putUser(userId, user) {
    return await ApiSecure.put(`users/${userId}/`, user)
}
export async function postUser(user) {
    return await ApiSecure.post(`users/`, user)
}
export async function batchUpdateUsers(file) {
    const formData = new FormData();
    formData.append("file", file);
    return await ApiSecure.post(`users/batch_update/`, formData)
}
//
// USER GROUPS
export async function getUserGroups(params) {
    params = checkDeleted(params)
    return await ApiSecure.get("user_groups/", {params})
}
export async function getUserGroup(userGroupId) {
    return await ApiSecure.get(`user_groups/${userGroupId}`)
}
export async function putUserGroup(userGroupId, userGroup) {
    return await ApiSecure.put(`user_groups/${userGroupId}/`, userGroup)
}
export async function postUserGroup(userGroup) {
    return await ApiSecure.post(`user_groups/`, userGroup)
}
//
// PERMISSIONS
export async function getPermissions() {
    return await ApiSecure.get("permissions/")
}
export async function deleteUserPermission(userId, permissionId) {
    return await ApiSecure.delete(`users/${userId}/permissions/${permissionId}/`)
}
export async function postUserPermission(userId, permissionId) {
    return await ApiSecure.post(`users/${userId}/permissions/${permissionId}/`)
}
export async function deleteUserGroupPermission(userId, permissionId) {
    return await ApiSecure.delete(`user_groups/${userId}/permissions/${permissionId}/`)
}
export async function postUserGroupPermission(userId, permissionId) {
    return await ApiSecure.post(`user_groups/${userId}/permissions/${permissionId}/`)
}
//
// FACILITIES
export async function getFacilities(params) {
    params = checkDeleted(params)
    return await ApiSecure.get("facilities/", {params})
}
export async function putFacility(facilityId, facility) {
    return await ApiSecure.put(`facilities/${facilityId}/`, facility)
}
export async function postFacility(facility) {
    return await ApiSecure.post(`facilities/`, facility)
}
export async function batchUpdateFacilities(file) {
    const formData = new FormData();
    formData.append("file", file);
    return await ApiSecure.post(`facilities/batch_update/`, formData)
}
//
// SUB FACILITIES
export async function getSubFacilities(params) {
    params = checkDeleted(params)
    return await ApiSecure.get("sub_facilities/", {params})
}
export async function putSubFacility(subFacilityId, subFacility) {
    return await ApiSecure.put(`sub_facilities/${subFacilityId}/`, subFacility)
}
export async function postSubFacility(subFacility) {
    return await ApiSecure.post(`sub_facilities/`, subFacility)
}
export async function deleteUserSubFacilities(userId, subFacilityId) {
    return await ApiSecure.delete(`users/${userId}/sub_facilities/${subFacilityId}/`)
}
export async function postUserSubFacilities(userId, subFacilityId) {
    return await ApiSecure.post(`users/${userId}/sub_facilities/${subFacilityId}/`)
}
//
// EQUIPMENT
export async function getEquipment(params) {
    params = checkDeleted(params)
    return await ApiSecure.get("equipments/", {params})
}
export async function putEquipment(equipmentId, equipment) {
    return await ApiSecure.put(`equipments/${equipmentId}/`, equipment)
}
export async function postEquipment(equipment) {
    return await ApiSecure.post(`equipments/`, equipment)
}
export async function batchUpdateEquipment(file) {
    const formData = new FormData();
    formData.append("file", file);
    return await ApiSecure.post(`equipments/batch_update/`, formData)
}
export async function getEquipmentById(equipmentId) {
    return await ApiSecure.get(`equipments/${equipmentId}/`)
}
export async function getEquipmentDocuments(equipmentId) {
    return await ApiDoc.get(`equipments/${equipmentId}/documents/`)
}
//
// MAINTENANCE
export async function getMaintenance(params) {
    params = checkDeleted(params)
    return await ApiSecure.get("maintenance/", {params})
}
export async function postMaintenance(maintenance) {
    return await ApiSecure.post("maintenance/", maintenance)
}
export async function getMaintenanceById(maintenanceId) {
    return await ApiSecure.get(`maintenance/${maintenanceId}`)
}
export async function putMaintenance(maintenanceId, maintenance) {
    return await ApiSecure.put(`maintenance/${maintenanceId}/`, maintenance)
}
export async function batchUpdateMaintenance(file) {
    const formData = new FormData();
    formData.append("file", file);
    return await ApiSecure.post(`maintenance/batch_update/`, formData)
}
export async function downloadReport(documentId) {
    return await ApiDoc.get(`documents/${documentId}/download/`)
}
//
// MAINTENANCE OPERATIONS
export async function getMaintenanceOperations(params) {
    params = checkDeleted(params)
    return await ApiSecure.get("maintenance_operations/", {params})
}
export async function getMaintenanceOperation(maintenanceOperationId) {
    return await ApiSecure.get(`maintenance_operations/${maintenanceOperationId}`)
}
export async function postMaintenanceOperation(maintenanceOperation) {
    return await ApiSecure.post(`maintenance_operations/`, maintenanceOperation)
}
export async function putMaintenanceOperation(maintenanceOperationId, maintenanceOperation) {
    return await ApiSecure.put(`maintenance_operations/${maintenanceOperationId}/`, maintenanceOperation)
}
//
// MAINTENANCE OPERATIONS SCHEDULE
export async function getScheduledMaintenanceOperations(params) {
    params = checkDeleted(params)
    return await ApiSecure.get("maintenance_operations_schedule/", {params})
}
export async function getScheduledMaintenanceOperationsById(maintenanceOperationsScheduleId) {
    return await ApiSecure.get(`maintenance_operations_schedule/${maintenanceOperationsScheduleId}/`)
}
export async function putScheduledMaintenanceOperations(
    maintenanceOperationsScheduleId,
    maintenanceOperationsSchedule
) {
    return await ApiSecure.put(
        `maintenance_operations_schedule/${maintenanceOperationsScheduleId}/`,
        maintenanceOperationsSchedule
    )
}
export async function assignScheduledMaintenanceOperation(maintenanceOperationId, userId, workMode) {
    return await ApiSecure.post(`maintenance_operations_schedule/${maintenanceOperationId}/assignee/${userId}/`, {
        work_mode: workMode,
    })
}
export async function unAssignScheduledMaintenanceOperation(maintenanceOperationId, userId) {
    return await ApiSecure.delete(`maintenance_operations_schedule/${maintenanceOperationId}/assignee/${userId}/`)
}
export async function doneScheduledMaintenanceOperation(maintenanceOperationId, data) {
    return await ApiSecure.post(`maintenance_operations_schedule/${maintenanceOperationId}/done/`, data)
}
export async function cancelScheduledMaintenanceOperation(maintenanceOperationId, data) {
    return await ApiSecure.post(`maintenance_operations_schedule/${maintenanceOperationId}/cancel/`, data)
}
export async function acceptScheduledMaintenanceOperation(maintenanceOperationId, data) {
    return await ApiSecure.post(`maintenance_operations_schedule/${maintenanceOperationId}/accept/`, data)
}
export async function startScheduledMaintenanceOperation(maintenanceOperationId) {
    return await ApiSecure.post(`maintenance_operations_schedule/${maintenanceOperationId}/take_in_work/`)
}
export async function impossibleToFinishScheduledMaintenanceOperation(maintenanceOperationId, data) {
    return await ApiSecure.post(`maintenance_operations_schedule/${maintenanceOperationId}/impossible_to_complete/`, data)
}
export async function lackOfTimeScheduledMaintenanceOperation(maintenanceOperationId, data) {
    return await ApiSecure.post(`maintenance_operations_schedule/${maintenanceOperationId}/lack_of_time/`, data)
}
//
// MAINTENANCE SCHEDULE
export async function getScheduledMaintenance(params) {
    params = checkDeleted(params)
    return await ApiSecure.get("maintenance_schedule/", {params})
}
export async function getAssignedScheduledMaintenance(params) {
    params = checkDeleted(params)
    return await ApiSecure.get("maintenance_schedule/assigned/", {params})
}
export async function downloadReportScheduledMaintenance(startDate, subFacility) {
    return await ApiDoc.post("maintenance_schedule/download_report/", {
        start_date: startDate
    }, {
        params: {
            sub_facility_id_exact: subFacility,
            planning_date_gte: startDate,
            planning_date_lte: startDate,
            start_date: startDate
        }
    })
}
export async function getScheduledMaintenanceById(maintenanceId) {
    return await ApiSecure.get(`maintenance_schedule/${maintenanceId}/`)
}
export async function assignScheduledMaintenanceById(maintenanceId, userId, workMode) {
    return await ApiSecure.post(`maintenance_schedule/${maintenanceId}/batch_assign/`, {
        user_id: userId,
        work_mode: workMode,
    })
}
export async function putScheduledMaintenance(maintenanceId, scheduledMaintenance) {
    return await ApiSecure.put(`maintenance_schedule/${maintenanceId}/`, scheduledMaintenance)
}
export async function getCalendarView() {
    return await ApiSecure.get("maintenance_schedule/calendar_view/", )
}
export async function batchUpdateScheduledMaintenance(file) {
    const formData = new FormData()
    formData.append("file", file)
    return await ApiSecure.post("maintenance_schedule/batch_update/", formData)
}
export async function lackOfTimeScheduledMaintenanceById(maintenanceId, data) {
    return await ApiSecure.post(`maintenance_schedule/${maintenanceId}/lack_of_time/`, data)
}
export async function impossibleToCompleteScheduledMaintenanceById(maintenanceId, data) {
    return await ApiSecure.post(`maintenance_schedule/${maintenanceId}/impossible_to_complete/`, data)
}
export async function postponeScheduledMaintenanceById(maintenanceId, newDate) {
    return await ApiSecure.post(`maintenance_schedule/${maintenanceId}/postpone/`, {
        new_date: newDate,
    })
}
//
// UNSCHEDULED MAINTENANCE
export async function getUnscheduledMaintenance(params) {
    params = checkDeleted(params)
    return await ApiSecure.get("unscheduled_maintenance/", {params})
}
export async function getUnscheduledMaintenancePieChart(params) {
    params = checkDeleted(params)
    return await ApiSecure.get("unscheduled_maintenance/pie_chart/", {params})
}
export async function postUnscheduledMaintenance(unscheduledMaintenance) {
    return await ApiSecure.post("unscheduled_maintenance/", unscheduledMaintenance)
}
export async function putUnscheduledMaintenance(unscheduledMaintenanceId, unscheduledMaintenance) {
    return await ApiSecure.put(`unscheduled_maintenance/${unscheduledMaintenanceId}/`, unscheduledMaintenance)
}
export async function getUnscheduledMaintenanceById(unscheduledMaintenanceId) {
    return await ApiSecure.get(`unscheduled_maintenance/${unscheduledMaintenanceId}/`)
}
export async function assignUnscheduledMaintenance(unscheduledMaintenanceId, data) {
    return await ApiSecure.post(`unscheduled_maintenance/${unscheduledMaintenanceId}/assign/`, data)
}
export async function closeUnscheduledMaintenance(unscheduledMaintenanceId, data) {
    return await ApiSecure.post(`unscheduled_maintenance/${unscheduledMaintenanceId}/close/`, data)
}
export async function postponeUnscheduledMaintenance(unscheduledMaintenanceId, data) {
    return await ApiSecure.post(`unscheduled_maintenance/${unscheduledMaintenanceId}/postpone/`, data)
}
export async function doneUnscheduledMaintenance(unscheduledMaintenanceId, data) {
    return await ApiSecure.post(`unscheduled_maintenance/${unscheduledMaintenanceId}/done/`, data)
}
//
// WEB PUSH
export async function getWebPushNotifications() {
    return await ApiSecure.get("web_push_notifications/")
}
export async function postWebPushNotifications(data) {
    return await ApiSecure.post("web_push_notifications/", data)
}
export async function getWebPushNotificationsId(webPushNotificationId, SILENT=false) {
    return await ApiSecure.get(`web_push_notifications/${webPushNotificationId}/`, {
        SILENT
    })
}
export async function putWebPushNotificationsId(webPushNotificationId, data) {
    return await ApiSecure.put(`web_push_notifications/${webPushNotificationId}/`, data)
}
export async function patchWebPushNotificationsId(webPushNotificationId, data) {
    return await ApiSecure.patch(`web_push_notifications/${webPushNotificationId}/`, data)
}
export async function deleteWebPushNotificationsId(webPushNotificationId) {
    return await ApiSecure.delete(`web_push_notifications/${webPushNotificationId}/`)
}
//
// NOTIFICATION SETTINGS
export async function getNotificationSettings(params) {
    return await ApiSecure.get("notification_settings_notification/", {params})
}
export async function getNotificationSettingsById(id) {
    return await ApiSecure.get(`notification_settings_notification/${id}/`)
}
export async function putNotificationSettingsById(id, data) {
    return await ApiSecure.put(`notification_settings_notification/${id}/`, data)
}
//
// EQUIPMENT NOTIFICATION SETTINGS
export async function getEquipmentNotificationSettings(params) {
    return await ApiSecure.get("equipment_notification_settings_notification/", {params})
}
export async function getEquipmentNotificationSettingsById(id) {
    return await ApiSecure.get(`equipment_notification_settings_notification/${id}/`)
}
export async function putEquipmentNotificationSettingsById(id, data) {
    return await ApiSecure.put(`equipment_notification_settings_notification/${id}/`, data)
}
//
// LOGS
export async function getApplicationLogs(params) {
    params = checkDeleted(params)
    return await ApiSecure.get("application_logs/", {params})
}